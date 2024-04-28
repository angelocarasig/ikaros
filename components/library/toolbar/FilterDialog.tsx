import { X } from 'lucide-react';

import { getDateShort, isDateFilterEmpty, toTitleCase } from '@/lib/utils';
import { DateFilterOption } from '@/models/library-settings';
import { NovelStatus } from '@/models/novel';
import useLibrarySettingsStore from '@/store/useLibraryStore';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import DateFilterPicker from './DateFilterPicker';
import Tag from '../../shared/tag';

export default function FilterDialog() {
	const librarySettings = useLibrarySettingsStore((state) => state.settings);

	const updateTitle = useLibrarySettingsStore((state) => state.updateTitle);
	const updateAuthor = useLibrarySettingsStore((state) => state.updateAuthor);
	const updateDateFilter = useLibrarySettingsStore((state) => state.updateDateFilter);

	return (
		<>
			<DialogHeader>
				<DialogTitle>Filter Options</DialogTitle>
				<DialogDescription className="flex flex-col">
					<span>Configure your current filters.</span>
					<span className="mt-2 flex gap-1">
						{Object.entries(librarySettings)
							.filter(([key, value]) => !key.includes('sort') && value !== '' && value != null) // Exclude sort settings from tags
							.map(([key, value]) => {
								if (key.includes('date')) {
									return Object.entries(value).map(([dateKey, dateValue]) => { // dateValue: beforeDate | afterDate | betweenDate
										return Object.entries(dateValue!).map(([dateOption, dateOptionValue]) => {
											if (dateOption === 'betweenDate' && isDateFilterEmpty(dateOptionValue)) return;
											return (dateOptionValue != null && <Tag key={dateKey} title={`${toTitleCase(dateKey)} is ${dateOption.replaceAll('Date', '')} ${getDateShort(dateOptionValue)}`} />);
										})
									})
								} else {
									return <Tag key={key} title={`${toTitleCase(key)} is ${value}`} />;
								}
							})}
					</span>
				</DialogDescription>
			</DialogHeader>

			<Accordion type="single" collapsible className="w-full">
				<AccordionItem value="Title">
					<AccordionTrigger>
						<div className="flex w-full h-full items-center justify-between">
							<span>Title</span>
							<ClearFilter librarySettingProp={librarySettings.title} onClick={() => updateTitle('')} />
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<Input
							type="string"
							placeholder="Title"
							value={librarySettings.title}
							onChange={(newTitle) => updateTitle(newTitle.target.value)}
							className="w-full"
						/>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="Author">
					<AccordionTrigger>
						<div className="flex w-full h-full items-center justify-between">
							<span>Author</span>
							<ClearFilter librarySettingProp={librarySettings.author} onClick={() => updateAuthor('')} />
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<Input
							type="string"
							placeholder="Author"
							value={librarySettings.author}
							onChange={(newAuthor) => updateAuthor(newAuthor.target.value)}
							className="w-full"
						/>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem disabled value={DateFilterOption.LAST_READ}>
					<AccordionTrigger>
						<div className="disabled:bg-white flex w-full h-full items-center justify-between">
							<span>{DateFilterOption.LAST_READ}</span>
							<ClearFilter
								onClick={() => updateDateFilter(DateFilterOption.LAST_READ, {})}
								librarySettingProp={!isDateFilterEmpty(librarySettings.dateFilters[DateFilterOption.LAST_READ])}
							/>
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex gap-2 p-4 pt-2 w-full flex-wrap">
						<DateFilterPicker dateFilterOption={DateFilterOption.LAST_READ} />
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value={DateFilterOption.RECENTLY_UPDATED}>
					<AccordionTrigger>
						<div className="flex w-full h-full items-center justify-between">
							<span>{DateFilterOption.RECENTLY_UPDATED}</span>
							<ClearFilter
								onClick={() => updateDateFilter(DateFilterOption.RECENTLY_UPDATED, {})}
								librarySettingProp={!isDateFilterEmpty(librarySettings.dateFilters[DateFilterOption.RECENTLY_UPDATED])}
							/>
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex gap-2 p-4 pt-2 w-full flex-wrap">
						<DateFilterPicker dateFilterOption={DateFilterOption.RECENTLY_UPDATED} />
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value={DateFilterOption.DATE_ADDED}>
					<AccordionTrigger>
						<div className="flex w-full h-full items-center justify-between">
							<span>{DateFilterOption.DATE_ADDED}</span>
							<ClearFilter
								onClick={() => updateDateFilter(DateFilterOption.DATE_ADDED, {})}
								librarySettingProp={!isDateFilterEmpty(librarySettings.dateFilters[DateFilterOption.DATE_ADDED])}
							/>
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex gap-2 p-4 pt-2 w-full flex-wrap">
						<DateFilterPicker dateFilterOption={DateFilterOption.DATE_ADDED} />
					</AccordionContent>
				</AccordionItem>

				<AccordionItem disabled value={DateFilterOption.PUBLICATION_DATE}>
					<AccordionTrigger>
						<div className="flex w-full h-full items-center justify-between">
							<span>{DateFilterOption.PUBLICATION_DATE}</span>
							<ClearFilter
								onClick={() => updateDateFilter(DateFilterOption.PUBLICATION_DATE, {})}
								librarySettingProp={!isDateFilterEmpty(librarySettings.dateFilters[DateFilterOption.PUBLICATION_DATE])}
							/>
						</div>
					</AccordionTrigger>
					<AccordionContent className="flex gap-2 p-4 pt-2 w-full flex-wrap">
						<DateFilterPicker dateFilterOption={DateFilterOption.PUBLICATION_DATE} />
					</AccordionContent>
				</AccordionItem>

				{/* TODO: Add Status Filter (Combobox)*/}
				<AccordionItem disabled value="Status">
					<AccordionTrigger>
						<div className="flex w-full h-full items-center justify-between">
							<span>Status</span>
							{librarySettings.title == null && <X className="mr-4" color="#EF4444" />}
						</div>
					</AccordionTrigger>
					<AccordionContent>
						<Select onValueChange={(novelStatus: NovelStatus) => console.log(novelStatus)}>
							<SelectTrigger>
								<SelectValue placeholder="Status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value={NovelStatus.PLANTOREAD}>{NovelStatus.PLANTOREAD}</SelectItem>
								<SelectItem value={NovelStatus.ONGOING}>{NovelStatus.ONGOING}</SelectItem>
								<SelectItem value={NovelStatus.COMPLETED}>{NovelStatus.COMPLETED}</SelectItem>
								<SelectItem value={NovelStatus.STALLED}>{NovelStatus.STALLED}</SelectItem>
								<SelectItem value={NovelStatus.DROPPED}>{NovelStatus.DROPPED}</SelectItem>
							</SelectContent>
						</Select>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
}

const ClearFilter = ({ librarySettingProp, onClick }: { librarySettingProp: any, onClick: () => void }) => {
	if (librarySettingProp && librarySettingProp !== '' && librarySettingProp != null) {
		return (
			<X className="mr-4" color="#EF4444" onClick={onClick} />
		)
	}
}
