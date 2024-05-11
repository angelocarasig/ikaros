import { ReactNode, useState } from 'react'
import Image from 'next/image';
import { ScrollArea } from '../ui/scroll-area';
import { Button } from '../ui/button';
import useBookmarkStore from '@/store/useBookmarksStore';
import useReaderStore from '@/store/useReaderStore';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import useTabHandler from '@/hooks/useTabHandler';
import ArtworkTab from '../library/[slug]/artwork-tab';
import { Novel } from '@/models/novel/novel';
import { Bookmark as BookmarkIcon, BookText, Flower, ListOrdered, Pencil } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Bookmark } from '@/models/novel/bookmark';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import ReaderMenuBookmark from './reader-menu-bookmark';
import { cn, getDate } from '@/lib/utils';
import { Skeleton } from '../ui/skeleton';

enum SidebarTabItems {
  INFORMATION = 'Information',
  TABLEOFCONTENTS = 'Table Of Contents',
  BOOKMARKS = 'Bookmarks',
  ARTWORK = 'Artwork'
}

const SidebarTabs = Object.values(SidebarTabItems);

function ReaderMenuSidebar({ novel }: { novel: Novel }) {
  const { currentTab, onTabChange } = useTabHandler(SidebarTabItems.INFORMATION, SidebarTabs);

  return (
    <Tabs className="w-full" defaultValue={SidebarTabItems.INFORMATION} onValueChange={onTabChange}>
      <TabsList className="grid w-full h-fit grid-cols-4">
        <TabsTrigger value={SidebarTabItems.INFORMATION}><BookText /></TabsTrigger>
        <TabsTrigger value={SidebarTabItems.TABLEOFCONTENTS}><ListOrdered /></TabsTrigger>
        <TabsTrigger value={SidebarTabItems.BOOKMARKS}><BookmarkIcon /></TabsTrigger>
        <TabsTrigger value={SidebarTabItems.ARTWORK}><Flower /></TabsTrigger>
      </TabsList>

      <TabsContent value={SidebarTabItems.INFORMATION}>
        {currentTab === SidebarTabItems.INFORMATION && <Overview novel={novel} />}
      </TabsContent>

      <TabsContent value={SidebarTabItems.TABLEOFCONTENTS}>
        {currentTab === SidebarTabItems.TABLEOFCONTENTS && (
          <ScrollArea type='always' className='w-full h-[90vh] p-4'>
            <TableOfContents />
          </ScrollArea>
        )}
      </TabsContent>

      <TabsContent value={SidebarTabItems.BOOKMARKS}>
        {currentTab === SidebarTabItems.BOOKMARKS && (
          <ScrollArea type='always' className='w-full h-[90vh] p-4'>
            <Bookmarks novel={novel} />
          </ScrollArea>
        )}
      </TabsContent>

      <TabsContent value={SidebarTabItems.ARTWORK}>
        {/* Just reuse artwork tab */}
        {currentTab === SidebarTabItems.ARTWORK && (
          <ScrollArea type='always' className='w-full h-[90vh] p-4'>
            <ArtworkTab novel={novel} />
          </ScrollArea>
        )}
      </TabsContent>
    </Tabs>

  )
}

function Overview({ novel }: { novel: Novel }) {
  // Reusing values from NovelCard
  const imageProps = "h-[10rem] md:h-[14rem] lg:h-[18rem]";

  return (
    <div className='relative flex flex-col gap-2 w-full h-full justify-center items-center'>
      <>
        {novel.cover_url != null ? (
          <Image
            src={novel.cover_url}
            alt="novel cover"
            className={cn(
              "aspect-[11/16] w-min object-cover rounded data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10 select-none",
              imageProps
            )}
            width={300}
            height={400}
            loading="eager"
            data-loaded="false"
            onLoad={event => {
              event.currentTarget.setAttribute('data-loaded', 'true');
            }}
            priority
          />
        ) : (
          <Skeleton
            className={cn(
              "aspect-[11/16] w-min object-cover rounded cursor-pointer flex items-center justify-center text-center",
              imageProps
            )}>
            <p>No Cover Available.</p>
          </Skeleton>
        )}
      </>
      <div className='w-full mt-4 border-b'>
        <h2 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight first:mt-0">
          {novel.title}
        </h2>
        <p className="leading-7 text-muted-foreground mb-4">
          {novel.author}
        </p>
        <div className='flex flex-col gap-2 mb-4'>
          <p className="leading-7 flex justify-between">
            <span>Published At:</span>
            <span>{getDate(novel.created_at)}</span>
          </p>
          <p className="leading-7 flex justify-between">
            <span>Uploaded At:</span>
            <span>{getDate(novel.created_at)}</span>
          </p>
          <p className="leading-7 flex justify-between">
            <span>Last Updated At:</span>
            <span>{getDate(novel.updated_at)}</span>
          </p>
        </div>
      </div>
      <blockquote className="w-full justify-start mt-4 italic">
        {novel.description || 'No Description Available.'}
      </blockquote>
    </div>
  )
}

function Bookmarks({ novel }: { novel: Novel }) {
  const { bookmarks } = useBookmarkStore();
  const { currentLocation } = useReaderStore();

  const sortedBookmarks = bookmarks.sort((a, b) => {
    if (a.label === "Autosave") return -1;
    if (b.label === "Autosave") return 1;
    return 0;
  });

  return (
    <div className='flex flex-col gap-2'>
      <div className='w-full h-10 grid grid-cols-3 text-center border-b-2 select-none'>
        <p>Name</p>
        <p>Date</p>
        <p className='justify-self-end pr-2'>Edit</p>
      </div>
      {sortedBookmarks.length > 0 ? (
        <>
          {sortedBookmarks.map((value, index) => (
            <BookmarkItem value={value} key={index} />
          ))}
        </>
      ) : (
        <>
          <h2 className="text-center scroll-m-20 border-b pb-2 text-xl font-semibold tracking-tight transition-colors first:mt-0">
            No bookmarks found! Add a bookmark below?
          </h2>
          <ReaderMenuBookmark currentLocation={currentLocation} novelId={novel.id} />
        </>
      )}
    </div>
  )
}

function TableOfContents() {
  const { tableOfContents } = useReaderStore();
  return (
    <div className='flex flex-col gap-2'>
      {tableOfContents.map((value, index) => (
        <JumpToSection key={index} label={value.label} href={value.href} button={
          <Button
            key={value.href}
            variant="secondary"
            className='pt-2 pb-3 h-auto text-wrap'
          >
            {value.label}
          </Button>
        } />
      ))}
    </div>
  )
}

function JumpToSection({ label, href, button }: { label: string, href: string, button: ReactNode }) {
  const { jumpToSection } = useReaderStore();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {button}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Jump to {label}?</AlertDialogTitle>
          <AlertDialogDescription>
            You will jump to this section and lose track of the previous location you were in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => jumpToSection(href)}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function BookmarkItem({ value }: { value: Bookmark }) {
  const [open, setOpen] = useState(false);
  const { currentLocation } = useReaderStore();
  const { updateBookmark, deleteBookmark } = useBookmarkStore();

  const formSchema = z.object({
    label: z.string()
      .min(3, { message: "Label must be at least 3 characters long." })
      .max(20, { message: "Label must be no more than 20 characters long." })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      label: value.label,
    }
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (currentLocation == null) return;

    console.log("Current Location: ", currentLocation);
    console.log("Data: ", data);

    const bookmark: Bookmark = { ...value, label: data.label };

    toast.promise(updateBookmark(bookmark), {
      loading: `Updating bookmark ${data.label}...`,
      success: () => {
        return `Updated bookmark to ${data.label}!`;
      },
      error: () => {
        return `Failed to update bookmark ${data.label}!`;
      }
    })

    setOpen(false);
  }

  const onDeleteClicked = () => {
    toast.promise(deleteBookmark(value), {
      loading: `deleting bookmark...`,
      success: () => {
        return `Deleted bookmark!`;
      },
      error: () => {
        return `Failed to delete bookmark...`;
      }
    })

    setOpen(false);
  }

  return (
    <div className='flex gap-2 justify-around'>
      <JumpToSection label={value.label} href={value.epubcfi} button={
        <Button
          key={value.id}
          variant="secondary"
          className='pt-2 pb-3 pl-2 grow h-max text-wrap flex items-center gap-4'
        >
          <div className='justify-stretch grow text-start pl-2 overflow-wrap break-words text-pretty line-clamp-2 max-w-24'>{value.label}</div>
          <div className='text-start justify-stretch grow'>{new Date(value.timestamp).toLocaleString()}</div>
        </Button>
      } />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="secondary"
            size="icon"
            className='h-auto'
            disabled={value.label === 'Autosave'}
            onClick={() => { setOpen(true) }}>
            <Pencil />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]" hideX>
          <DialogHeader>
            <DialogTitle>Edit Bookmark</DialogTitle>
            <DialogDescription>
              Update a new bookmark.
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
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <DialogFooter className='flex !justify-between mt-10'>
                {/* TODO: Add dialog */}
                <Button type="button" variant="destructive" className='bg-red-600' onClick={onDeleteClicked}>Delete</Button>
                <div className="flex gap-2">
                  <Button type="button" variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit">Submit</Button>
                </div>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ReaderMenuSidebar;