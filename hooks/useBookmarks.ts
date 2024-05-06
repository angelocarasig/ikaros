import { useEffect } from "react";
import { useUser } from "./useUser";

import useBookmarkStore from "@/store/useBookmarksStore";
import { Novel } from "@/models/novel/novel";

export function useBookmarks(novel: Novel) {
  const { user } = useUser();
  const { setBookmarks, fetchBookmarks } = useBookmarkStore();

  useEffect(() => {
    if (user == null) {
      setBookmarks([]);
      return;
    }

    fetchBookmarks(novel.id);
  }, [novel, user]);
}