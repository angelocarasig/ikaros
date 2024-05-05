'use client';

import ePub from 'epubjs';
import { Loader2, Upload } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNovels } from '@/store/useNovelStore';
import { EpubUploadHandler } from '@/lib/upload-novel';
import { createClient } from '@/lib/supabase/client';
import { useUser } from '@/hooks/useUser';
import { getFileUrl, nameWithoutExtension, sanitizeFilename } from '@/lib/utils';
import { BUCKETS } from '@/constants';
import { Novel } from '@/models/novel/novel';

export default function UploadDialog() {
  const { user } = useUser();
  const supabase = createClient();

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

  // Defined as partial since id will be auto-generated
  const insertIntoDb = async (novel: Partial<Novel>) => {
    console.log("Inserting Novel to DB: ", novel);

    const { error } = await supabase.from('novels').insert(novel);

		if (error != null) {
			throw error;
		}
  }

  const uploadMultiple = async (files: Array<File>, bucket: string, baseDirectory: string): Promise<Array<any>> => {
    const uploadPromises = files.map(file => {
      return uploadFile(file, bucket, `${baseDirectory}/${file.name}`);
    });

    const responses = await Promise.all(uploadPromises);
    return responses;
  }

  const uploadFile = async (file: File, bucket: string, directory: string) => {
    const { data, error } = await supabase
      .storage
      .from(bucket)
      .upload(directory, file, { upsert: true });

    if (error) {
      console.error("Error Uploading File: ", error);
      throw new Error(error.message);
    }

    return data as any;
  }

  const getNovelMetadata = async (buffer: string | ArrayBuffer) => {
    const book = ePub(buffer);
    const handler = new EpubUploadHandler(book);
    return {
      metadata: await handler.getNovelMetadata(),
      cover: await handler.getNovelCover(),
      artwork: await handler.getNovelArtwork()
    };
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (data.files.length  > 10) {
      toast.error("Only up to 10 files can be submitted at a time. Please try again.");
      return;
    }
    setLoading(true);
    const fileReaders = [];

    for (let i = 0; i < data.files.length; i++) {
      const currentNovelFile = data.files.item(i)!;

      // Create new promise and append to filereader
      const fileReaderPromise = new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(currentNovelFile);
        reader.onerror = reject;

        // Read file metadata and perform supabase work
        reader.onload = async (e: ProgressEvent<FileReader>) => {
          if (e.target?.result) {
            try {
              const { metadata, cover, artwork } = await getNovelMetadata(e.target.result);
              console.log("Metadata! ", metadata);
              console.log("Cover! ", cover);
              console.log("Artwork! ", artwork);

              const basePath = `${user!.id}/${nameWithoutExtension(sanitizeFilename(currentNovelFile.name))}`;

              const [novelUploadResult, coverUploadResult, artworkUploadResult] = await Promise.all([
                uploadFile(currentNovelFile, BUCKETS.Novels, `${basePath}/${sanitizeFilename(currentNovelFile.name)}`),
                cover != null && uploadFile(cover, BUCKETS.Covers, `${basePath}/${cover.name}`),
                uploadMultiple(artwork, BUCKETS.Artwork, basePath)
              ]);

              console.log("Novel File Upload Result: ", novelUploadResult);
              console.log("Cover Upload Result: ", coverUploadResult);
              console.log("Artwork Upload Result: ", artworkUploadResult);

              await insertIntoDb({
                ...metadata,
                owner_id: user!.id,
                file_url: getFileUrl(novelUploadResult.fullPath),
                cover_url: getFileUrl(coverUploadResult.fullPath),
                artwork: artworkUploadResult.map(art => getFileUrl(art.fullPath))
              });
              resolve('Finished');
            }
            catch (error) {
              reject(error);
            }
          }
        }
      })

      toast.promise(fileReaderPromise, {
        loading: `Uploading ${currentNovelFile.name}...`,
        success: (data) => {
          return `Finished uploading ${currentNovelFile.name}.`;
        },
        error: (error) => {
          return `Couldn't upload ${currentNovelFile.name}.`;
        }
      })
      // Add to promises array
      fileReaders.push(fileReaderPromise);
    }

    // Remove modal
    // When fully uploaded, refresh library
    setOpen(false);
    Promise.all(fileReaders).finally(() => {
      refreshNovels();
      setLoading(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen} >
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
            Import a novel. Only .epub format is accepted. Can upload up to 10 files at once.
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
