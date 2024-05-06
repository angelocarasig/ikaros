'use client';

import React, { useState } from 'react'

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Bookmark as BookmarkIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../ui/dialog';

import { Form, FormControl, FormField, FormLabel, FormItem, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Bookmark } from '@/models/novel/bookmark';
import { useUser } from '@/hooks/useUser';
import { Location } from 'epubjs';
import { toast } from 'sonner';
import useBookmarkStore from '@/store/useBookmarksStore';
import useReaderStore from '@/store/useReaderStore';


function ReaderMenuBookmark({ currentLocation, novelId }: { currentLocation: Location | null, novelId: string }) {
  const { user } = useUser();
  const { addBookmark } = useBookmarkStore();
  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    label: z.string()
      .min(3, { message: "Label must be at least 3 characters long." })
      .max(20, { message: "Label must be no more than 20 characters long." })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
			label: '',
		}
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (currentLocation == null) return;

    console.log("Current Location: ", currentLocation);
    console.log("Data: ", data);

    const bookmark: Bookmark = {
      novel_id: novelId,
      owner_id: user!.id,
      label: data.label,
      epubcfi: currentLocation.end.cfi,
      progress: currentLocation.end.percentage,
      location: currentLocation.end.location,
      timestamp: new Date()
    }

    toast.promise(addBookmark(bookmark), {
      loading: `Adding Bookmark ${data.label}...`,
      success: () => {
        return `Added Bookmark ${data.label}!`;
      },
      error: () => {
        return `Failed to add Bookmark ${data.label}!`;
      }
    })

    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className="bg-muted rounded-xl w-full h-full p-2 flex items-center justify-center hover:cursor-pointer hover:bg-zinc-700 transition-colors">
          <BookmarkIcon />
        </div>
      </DialogTrigger>
      {open && (
        <DialogContent className="sm:max-w-[425px]" hideX>
          <DialogHeader>
            <DialogTitle>New Bookmark</DialogTitle>
            <DialogDescription>
              Create a new bookmark.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              className='flex flex-col gap-4'
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input
                          className="disabled:cursor-not-allowed"
                          type="text"
                          placeholder='Label'
                          { ...field }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  )
}

export default ReaderMenuBookmark;