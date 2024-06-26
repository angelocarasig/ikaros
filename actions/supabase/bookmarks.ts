'use server';

import { createClient } from '@/lib/supabase/server';
import { Bookmark } from '@/models/novel/bookmark';

export async function getBookmarks(novelId: string) {
	const supabase = createClient();
	const { data, error } = await supabase.from('bookmarks').select().eq('novel_id', novelId);

	return data as Array<Bookmark>;
}

export async function addBookmark(bookmark: Bookmark): Promise<Bookmark> {
	const supabase = createClient();
	const { data, error } = await supabase.from('bookmarks').insert(bookmark).select();

	if (error && error.message.includes('violates unique constraint "unique_novel_owner_label"')) {
		throw new Error("A bookmark already exists for that name for this novel.");
	}
	else if (error) {
		throw error;
	}

	return data![0] as unknown as Bookmark;
}

export async function updateBookmark(bookmark: Bookmark): Promise<Bookmark> {
	const supabase = createClient();

	const { data, error } = await supabase
		.from('bookmarks')
		.update(bookmark)
		.eq('id', bookmark.id)
		.select();

	if (error) {
		throw error;
	}

	return data[0] as unknown as Bookmark;
}

export async function deleteBookmark(bookmark: Bookmark): Promise<void> {
	const supabase = createClient();

	const { error } = await supabase.from('bookmarks').delete().eq('id', bookmark.id);

	if (error) throw error;
}

export async function upsertBookmark(bookmark: Bookmark): Promise<Bookmark> {
	const supabase = createClient();
	const { data, error } = await supabase.from('bookmarks').upsert(bookmark, { onConflict: "novel_id,owner_id,label" }).select();
	if (error) throw error;

	return data[0] as unknown as Bookmark;
}
