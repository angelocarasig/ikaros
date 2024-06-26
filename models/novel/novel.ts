import { NovelMetadata } from "./metadata";

export interface Novel extends NovelMetadata {
	id: string;
	owner_id: string;
	file_url: string;
	cover_url?: string;
	last_read?: Date;

	artwork: Array<string>; // Array of URLs
	metadata: Metadata;
}

export enum NovelStatus {
	COMPLETED = 'Completed',
	ONGOING = 'Ongoing',
	STALLED = 'Stalled',
	DROPPED = 'Dropped',
	PLANTOREAD = 'Plan To Read'
}

//TODO: Expand on this when needed
export type Metadata = {
	dates: Array<MetadataDate>;
};

type MetadataDate = {
	date: Date;
	event: string;
	id?: string;
};
