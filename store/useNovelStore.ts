import { create } from 'zustand';
import { Novel } from '@/models/novel';
import { getAllNovels } from '@/actions/supabase/novel';
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

interface NovelStoreState {
	novels: Array<Novel>;
	fetchNovels: () => Promise<void>;
	refreshNovels: () => Promise<void>;
}

const useNovelStore = create<NovelStoreState>((set) => ({
	novels: [],
	fetchNovels: async () => {
		try {
			const response = await getAllNovels();
			set({ novels: response });
		} catch (error) {
			console.error('Error fetching novels: ', error);
		}
	},
	refreshNovels: async () => {
		try {
			const response = await getAllNovels();
			set({ novels: response });
		} catch (error) {
			console.error('Error refreshing novels: ', error);
		}
	}
}));

export const useNovels = () => {
	const { user } = useUser();
	const { novels, refreshNovels } = useNovelStore();

	// Anytime the current user changes we should also refresh novels
	useEffect(() => {
		refreshNovels();
	}, [user]);

	return {novels, refreshNovels};
}

export default useNovelStore;
