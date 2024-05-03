import { Asset } from '@/models/asset';
import { NovelMetadata } from '@/models/novel-metadata';
import { Book } from 'epubjs';
import { zip } from './utils';

export class EpubUploadHandler {
	private novel: Book;

	constructor(novel: Book) {
		this.novel = novel;
	}

	public async getNovelMetadata(): Promise<NovelMetadata> {
		const result = await this.novel.loaded.metadata.then((metadata) => {
			return {
				title: metadata.title,
				author: metadata.creator,
				description: metadata.description,
				created_at: new Date(),
				updated_at: new Date(),
				published_at: new Date(metadata.pubdate)
			};
		});

		return result;
	}

	public async getNovelCover(): Promise<File> {
		const coverUrl = await this.novel.coverUrl();
		const response = await fetch(coverUrl!);
		const coverBlob = await response.blob();
    return new File([coverBlob], `cover.png`, { type: 'image/png' });
	}

  public async getNovelArtwork(): Promise<Array<File>> {
		// Stupid because it returns [key: string]: string
		const resources = await this.novel.loaded.resources as any;
		const assets: Array<Asset> = resources.assets;

    const replacementUrls = await this.novel.resources.replacements();
		const artworkUrls: Array<string> = zip(assets, replacementUrls)
			.filter(value => value[0].type.includes('image'))
			.map(value => value[1]);

    try {
        const files = await Promise.all(artworkUrls.map(async (artworkUrl, index) => {
            const response = await fetch(artworkUrl);
            const artworkBlob = await response.blob();
            return new File([artworkBlob], `artwork-${index}.png`, { type: 'image/png' });
        }));
        return files;
    } catch (error) {
        throw new Error('Error fetching or converting to Blob');
    }
  }
}
