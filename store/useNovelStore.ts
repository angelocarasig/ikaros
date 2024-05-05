import { create } from 'zustand';
import { Novel } from '@/models/novel/novel';
import { getAllNovels } from '@/actions/supabase/novel';
import { useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

interface NovelStoreState {
	novels: Array<Novel>;
	refreshNovels: () => Promise<void>;
	setNovels: (newNovels: Array<Novel>) => void;
	clearNovels: () => void;
}

const useNovelStore = create<NovelStoreState>((set) => ({
	novels: [],
	refreshNovels: async () => {
		try {
			const response = await getAllNovels();
			set({ novels: response });
		} catch (error) {
			console.error('Error refreshing novels: ', error);
		}
	},
	setNovels: (newNovels: Array<Novel>) => {
		set({ novels: newNovels });
	},
	clearNovels: () => {
		set({ novels: [] });
	}
}));

export const useNovels = (initialNovels?: Array<Novel>) => {
	const { user } = useUser();
	const { novels, refreshNovels, setNovels, clearNovels } = useNovelStore();

	useEffect(() => {
		if (user == null) {
			clearNovels();
			return;
		}
		if (initialNovels) {
			console.log('Triggered use-effect');
			setNovels(initialNovels);
		}
		else {
			refreshNovels();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user]);

	return { novels, refreshNovels, setNovels, clearNovels };
};
