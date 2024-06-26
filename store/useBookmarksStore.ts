import { addBookmark, deleteBookmark, getBookmarks, updateBookmark, upsertBookmark } from "@/actions/supabase/bookmarks";
import { Bookmark } from "@/models/novel/bookmark";
import { create } from "zustand";

interface BookmarkStoreState {
	bookmarks: Array<Bookmark>;
  setBookmarks: (bookmarks: Array<Bookmark>) => void;
  fetchBookmarks: (novelId: string) => Promise<void>;
	addBookmark: (bookmark: Bookmark) => Promise<void>;
	updateBookmark: (bookmark: Bookmark) => Promise<void>;
  deleteBookmark: (bookmark: Bookmark) => Promise<void>;
  autosaveBookmark: (bookmark: Bookmark) => Promise<void>;
  mostRecentBookmark: () => Bookmark | null;
  mostProgressedBookmark: () => Bookmark | null;
  loading: boolean;
}

const useBookmarkStore = create<BookmarkStoreState>((set, get) => ({
  bookmarks: [],
  loading: true,

  setBookmarks: (bookmarks: Array<Bookmark>) => set({bookmarks}),

  fetchBookmarks: async (novelId: string) => {
    set({ loading: true });
    try {
			const response = await getBookmarks(novelId);
			set({ bookmarks: response, loading: false });
      console.log("Bookmarks updated to: ", response);
		} catch (error) {
			console.error('Error refreshing novels: ', error);
			set({ loading: false });
		}
  },

  addBookmark: async (bookmark: Bookmark) => {
    try {
      // Returns bookmark with the generated ID
			const result = await addBookmark(bookmark);

      const { bookmarks } = get();
			set({ bookmarks: [...bookmarks, result] });
		} 
    catch (error) {
			console.error('Error refreshing novels: ', error);
      return Promise.reject(error);
		}
  },

  updateBookmark: async (bookmark: Bookmark) => {
    try {
			const result = await updateBookmark(bookmark);

      const { bookmarks } = get();
      const updatedBookmarks = bookmarks.map(b => 
        b.id === result.id ? result : b
      );
			set({ bookmarks: [ ...updatedBookmarks ] });
		} 
    catch (error) {
			console.error('Error refreshing novels: ', error);
		}
  },

  deleteBookmark: async (bookmark: Bookmark) => {
    try {
			await deleteBookmark(bookmark);

      const { bookmarks } = get();
      const updatedBookmarks = bookmarks.filter(b => 
        b.id !== bookmark.id
      );
			set({ bookmarks: [...updatedBookmarks] });
		} 
    catch (error) {
			console.error('Error refreshing novels: ', error);
		}
  },

  autosaveBookmark: async (bookmark: Bookmark) => {
    try {
      const upsertedBookmark = await upsertBookmark(bookmark);

      const { bookmarks } = get();
      const updatedBookmarks = bookmarks.map(b => 
        b.id === upsertedBookmark.id ? upsertedBookmark : b
      );
      
			set({ bookmarks: [ ...updatedBookmarks ] });
    } catch (error) {
      console.error('Error generating autosave...');
    }
  },

  mostRecentBookmark: () => {
    const { bookmarks } = get();

    if (bookmarks.length > 0) {
      const mostRecentBookmark = bookmarks.reduce((latest, current) => {
        return latest.timestamp > current.timestamp ? latest : current;
      });

      return mostRecentBookmark;
    }
    else {
      return null;
    }
  },

  mostProgressedBookmark: () => {
    const { bookmarks } = get();

    if (bookmarks.length > 0) {
      const mostProgressedBookmark = bookmarks.reduce((latest, current) => {
        return latest.progress > current.progress ? latest : current;
      });

      return mostProgressedBookmark;
    }
    else {
      return null;
    }
  }
}));

export default useBookmarkStore;