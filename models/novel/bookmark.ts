export interface Bookmark {
  id?: string;
	novel_id: string;
  owner_id: string;
  label: string;
  epubcfi: string;
  progress: number;
  location: number;
  timestamp: Date;
}
