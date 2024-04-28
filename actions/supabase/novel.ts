'use server';

import { createClient } from '@/lib/supabase/server';
import { zip } from '@/lib/utils';
import { Novel } from '@/models/novel';
import { NovelMetadata } from '@/models/novel-metadata';

export async function uploadNovel(
	formData: FormData,
	novelData: Array<NovelMetadata>,
	coverFormData: FormData,
	artworkFormData: Array<FormData>
): Promise<string> {
	/**
	 * NOTES:
	 * - Form Data is pre-sanitized in component
	 *
	 * 1. Upload novel file to supabase NOVELS bucket
	 * 2. Upload novel cover to supabase COVERS bucket
	 * 3. Retrieve their URLs and build novel object
	 * 4. add novel object to novels table
	 */

	const supabase = createClient();
	const {
		data: { user }
	} = await supabase.auth.getUser();

	if (user == null) {
		throw 'User is currently not signed in.';
	}

	const uploadFileToBucket = async (file: File, bucketName: string) => {
		const userId = user.id;
		const filePath = `${userId}/${file.name}`;

		const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file);

		console.log('Data: ', data);
		console.log('Error: ', error);

		if (error != null) {
			throw error;
		}

		return `${process.env.NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucketName}/${filePath}`;
	};

	const uploadFilesToBucket = async (data: [string, FormDataEntryValue][]) => {
		console.log('Uploading files to bucket...');
		console.log("Data: ", data);

		const artworkUrls: Array<string> = [];
		for (const dataEntry of data) {
			const file = dataEntry[1];

			if (file instanceof File) {
				console.log("Uploading: ", file);
				const artworkUrl = await uploadFileToBucket(file, 'artwork');
				artworkUrls.push(artworkUrl);
			}
		}

		return artworkUrls;
	};

	const insertNovelEntryToDb = async (novel: Novel) => {
		console.log('Inserting the following to novel table: ', novel);

		const { error } = await supabase.from('novels').insert(novel);

		if (error != null) {
			throw error;
		}
	};

	console.log('Novel Metadata: ', novelData);

	let index = 0;
	for (const [file, novelMetadata, cover] of zip([...formData.values()], novelData, [
		...coverFormData.values()
	])) {
		if (file instanceof File && novelMetadata != null && cover instanceof File) {
			const uploadedItemUrl = await uploadFileToBucket(file, 'novels');
			console.log('Uploaded Item with URL: ', uploadedItemUrl);

			const uploadedCoverUrl = await uploadFileToBucket(cover, 'covers');
			console.log('Uploaded Cover with URL: ', uploadedCoverUrl);

			const currentFormData = artworkFormData[index] as FormData;
			const uploadedArtworkUrls = await uploadFilesToBucket([...currentFormData.entries()]);
			console.log('Uploaded Artwork with URLs: ', uploadedArtworkUrls);

			const novel: Novel = {
			  ...novelMetadata,
			  owner_id: user.id,
			  file_url: uploadedItemUrl,
			  cover_url: uploadedCoverUrl,
				artwork: uploadedArtworkUrls
			}

			await insertNovelEntryToDb(novel);

			index++;
		}
	}

	return 'Success';
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
