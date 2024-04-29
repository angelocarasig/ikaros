'use client';

import ePub from 'epubjs';
import { Loader2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { uploadNovel } from '@/actions/supabase/novel';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { alphaNumericSortObjects, sanitizeFilename, zip } from '@/lib/utils';
import { NovelMetadata } from '@/models/novel-metadata';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNovels } from '@/store/useNovelStore';

export default function UploadDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { refreshNovels } = useNovels();
  const formSchema = z.object({
    files: z.instanceof(FileList).refine((files) => files.length > 0, {
      message: 'At least one file is required.'
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  });

  const filesRef = form.register('files');

  const getNovelMetadata = async (buffer: string | ArrayBuffer) => {
    var book = ePub(buffer);
    const metadata = await book.loaded.metadata
      .then((val) => {
        const novelMetadata: NovelMetadata = {
          title: val.title,
          author: val.creator,
          description: val.description,
          created_at: new Date(),
          updated_at: new Date(),
          published_at: new Date(val.pubdate)
        }

        return novelMetadata;
      })
      .catch(error => {
        console.error("Failed to load: ", error)
        throw error;
      });

    const coverUrl = await book.coverUrl().then(res => res);
    let blobData;
    try {
      const response = await fetch(coverUrl!);
      blobData = await response.blob();
    } catch (error) {
      console.error(error);
    }

    let imageUrls: Array<string> = [];
    await book.ready.then(async () => {
      await book.resources.replacements().then((replacements) => {
        const resourcesFromManifest = Object.values(book.packaging.manifest).filter(item => !item.href.includes('html') || !item.type.includes('html'));
        let replacedImageUrls: Array<{ href: string, replacement: string }> = [];
        for (const [asset, replacement] of zip(resourcesFromManifest, replacements)) {
          if (asset.type.includes("image")) {
            replacedImageUrls.push({ href: asset.href, replacement });
          }
        }

        replacedImageUrls = alphaNumericSortObjects(replacedImageUrls, 'href');
        console.log("Sorted URLS: ", replacedImageUrls);
        const finalImageUrls = replacedImageUrls.map(item => item.replacement);
        imageUrls = finalImageUrls;
      })
    })

    console.log("Image URLs!", imageUrls);
    let imageBlobs: Array<Blob> = [];

    async function fetchImagesAndConvertToBlobs(imageUrls: Array<string>) {
      for (const image of imageUrls) {
        try {
          console.log("Fetching from URL: ", image);
          const response = await fetch(image);
          const blobData = await response.blob();
          console.log("Blob Data!", blobData);
          imageBlobs.push(blobData);
        } catch (error) {
          console.error(error);
        }
      }
      console.log("All blobs have been fetched and stored.");
    }

    await fetchImagesAndConvertToBlobs(imageUrls).then(() => {
      console.log("Finished processing all images.", imageBlobs);
    });

    console.log("Image blobs!", imageBlobs);

    return { metadata, cover: blobData, artwork: imageBlobs };
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const formData = new FormData();
    const coverFormData = new FormData();
    const novelMetadata = new Array<NovelMetadata>();
    const artworkFormData = new Array<FormData>();
    let totalSize = 0;
    const fileReaders = [];

    for (let i = 0; i < data.files.length; i++) {
      const file = data.files.item(i)!;
      totalSize += file.size;

      if (totalSize > 52428800) { // 50 MB in bytes
        toast.error("Files total size exceeds the 50 MB per request limit. Please select fewer and try again.");
        return;
      }

      formData.append('files', file, sanitizeFilename(file.name));

      // Create a promise for each file read operation
      const fileReaderPromise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            try {
              const { metadata, cover, artwork } = await getNovelMetadata(e.target.result);
              console.log("Metadata! ", metadata);
              console.log("Cover! ", cover);
              console.log("Artwork!", artwork);

              // Add covers to form URL
              const coverFile = new File([cover!], `${sanitizeFilename(metadata.title)}_-_cover.png`, { type: 'image/png' });
              const artworkForNovelFormData = new FormData();
              artwork.forEach((art, index) => {
                const artFile = new File([art], `${sanitizeFilename(metadata.title)}_-_artwork-${index}.png`, { type: 'image/png' });
                console.log("New Art File: ", artFile);
                artworkForNovelFormData.append('files', artFile, artFile.name);
              })

              artworkFormData.push(artworkForNovelFormData);
              coverFormData.append('files', coverFile, coverFile.name);
              novelMetadata.push(metadata);
              resolve(metadata);
            } catch (error) {
              reject(error);
            }
          }
        };
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });

      fileReaders.push(fileReaderPromise);
    }

    toast.info("Files have started uploading in the background. Feel free to dismiss the modal.");
    setLoading(true);
    await Promise.all(fileReaders);
    console.log("Sending Artwork Form Data: ");
    artworkFormData.forEach(currFormData => {
      console.log("Current Form Data: ", [...currFormData.entries()]);
    })
    await uploadNovel(formData, novelMetadata, coverFormData, artworkFormData)
      .then((res) => {
        toast.success(res);
        refreshNovels();
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-[6rem]">
          <Upload className="mr-2 h-4 w-4" />
          Import
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Upload Novels</DialogTitle>
          <DialogDescription>
            Import a novel. Only .epub format is accepted.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col w-full h-full items-center justify-center">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col w-full h-full items-center justify-center gap-4 p-10">
              <FormField
                control={form.control}
                name="files"
                render={() => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          className="hover:bg-muted transition-colors hover:cursor-pointer disabled:cursor-not-allowed"
                          type="file"
                          multiple
                          accept="application/epub+zip"
                          disabled={loading}
                          {...filesRef} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <Button className="w-1/2 disabled:cursor-not-allowed" type="submit" disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
