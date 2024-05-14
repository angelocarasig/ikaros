import { Novel } from "@/models/novel/novel";
import { useNovels } from "@/store/useNovelStore";
import { useEffect } from "react";

/** Hook that manages novel metadata while in read mode */
export function useSetupNovel(novel: Novel) {
  const { updateNovel } = useNovels();

	// Update last read value to current time
	useEffect(() => {
		console.log("Updating novel...");
    const updatedNovel: Novel = {...novel, last_read: new Date()};
    // No need to await this
    updateNovel(updatedNovel);
	}, [])
}