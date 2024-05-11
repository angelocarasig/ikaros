import { useEffect } from "react";
import { useUser } from "./useUser";

import useBookmarkStore from "@/store/useBookmarksStore";
import { Novel } from "@/models/novel/novel";

export function useBookmarks(novel: Novel) {
  const { user } = useUser();
  const { setBookmarks, fetchBookmarks, autosaveBookmark } = useBookmarkStore();

  // On init, if an autosaveBookmark was set in storage apply it
  useEffect(() => {
    const storageBookmark = localStorage.getItem(novel.id);
    if (storageBookmark == null) return;

    const newAutosaveBookmark = JSON.parse(storageBookmark);
    autosaveBookmark(newAutosaveBookmark);
    localStorage.removeItem(novel.id);
  }, []);

  useEffect(() => {
    if (user == null) {
      setBookmarks([]);
      return;
    }

    fetchBookmarks(novel.id);
  }, [novel, user]);
}