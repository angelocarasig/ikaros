import { create } from 'zustand';
import { isDateFilterEmpty } from '@/lib/utils';
import { DateFilter, DateFilterOption, LibrarySettings, SortDirection, SortOption } from '@/models/library-settings';

const defaultSettings: LibrarySettings = {
	title: '',
	author: '',
	dateFilters: {},
	sortOption: SortOption.TITLE,
	sortDirection: SortDirection.DESCENDING
};

type LibrarySettingsStore = {
	settings: LibrarySettings;
	getSettingCount: () => number;
	updateTitle: (title: string) => void;
  updateAuthor: (author: string) => void;
	flushSettings: () => void;
	updateSetting: <K extends keyof LibrarySettings>(key: K, value: LibrarySettings[K]) => void;
	updateDateFilter: (option: DateFilterOption, filter?: DateFilter) => void;
  updateSortOption: (sortOption: SortOption) => void;
	toggleSortDirection: () => void;
};

export const useLibrarySettingsStore = create<LibrarySettingsStore>((set, get) => ({
	settings: defaultSettings,
	updateTitle: (title: string) => set((state) => ({settings: {...state.settings, title}})),
  updateAuthor: (author: string) => set((state) => ({settings: {...state.settings, author}})),
	getSettingCount: () => {
    	let count = get().settings.title ? 1 : 0;
    	count += get().settings.author ? 1 : 0;
    	Object.values(get().settings.dateFilters).forEach(filter => {
            if (!isDateFilterEmpty(filter)) count++;
        });
    	return count;
  	},
	flushSettings: () => set(() => ({ settings: defaultSettings })),
	updateSetting: (key, value) => set((state) => ({ settings: { ...state.settings, [key]: value } })),
	updateDateFilter: (option, filter) =>
		set((state) => {
			const newDateFilters = { ...state.settings.dateFilters };
			if (!filter) delete newDateFilters[option];
			else newDateFilters[option] = filter;

			return { settings: { ...state.settings, dateFilters: newDateFilters } };
		}),
	updateSortOption: (sortOption) =>
		set((state) => ({settings: {...state.settings, sortOption}})),
	toggleSortDirection: () =>
		set((state) => ({
			settings: {
				...state.settings,
				sortDirection: state.settings.sortDirection === SortDirection.ASCENDING ? SortDirection.DESCENDING : SortDirection.ASCENDING
			}
		}))
}));

export default useLibrarySettingsStore;