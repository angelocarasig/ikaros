'use server';

import { createClient } from '@/lib/supabase/server';
import { Novel } from '@/models/novel/novel';

export async function uploadNovel() {
	throw "Function needs to be called on client to deal with server payload size restrictions.";
}

export async function getAllNovels(): Promise<Array<Novel>> {
	const supabase = createClient();

	const { data, error } = await supabase.from('novels').select();

	// console.log("Data: ", data);
	// console.log("Error: ", error);

	return data as Array<Novel>;
}

export async function getNovel(novelId: string): Promise<Novel> {
	const supabase = createClient();

	const { data, error } = await supabase.from('novels').select().eq('id', novelId);

	console.log('Data: ', data);
	console.log('Error: ', error);

	const selectedNovel = data != null ? data[0] : null;

	return selectedNovel as Novel;
}

export async function updateNovel(novel: Novel): Promise<Novel> {
	const supabase = createClient();

	console.log("Updating ", novel);
	const { data, error } = await supabase.from('novels').upsert(novel).select();

	console.log('Data: ', data);
	console.log('Error: ', error);

	const selectedNovel = data != null ? data[0] : null;

	return selectedNovel as Novel;
}

export async function getSignedUrl(bucket: string, directory: string) {
	const supabase = createClient();
	return supabase.storage.from(bucket).createSignedUploadUrl(directory);
}