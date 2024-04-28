import { create } from 'zustand';
import { Novel } from '@/models/novel';
import { getAllNovels } from '@/actions/supabase/novel';

interface NovelStoreState {
	novels: Array<Novel>;
	fetchNovels: () => Promise<void>;
	refreshNovels: () => Promise<void>;
}

export const useNovelStore = create<NovelStoreState>((set) => ({
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

export default useNovelStore;
