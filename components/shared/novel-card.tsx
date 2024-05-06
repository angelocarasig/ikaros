import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { cn } from '@/lib/utils';
import { Novel } from '@/models/novel/novel';
import { Skeleton } from '../ui/skeleton';

function NovelCard({ novel, imageProps, captionProps }: { novel: Novel, imageProps?: string, captionProps?: string }) {
	const router = useRouter();

	return (
		<motion.figure
			className="mb-2"
			layout
			initial={{ opacity: 0, scale: 0.8 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.5 }}
			transition={{ duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] }}
		>
			<>
				{novel.cover_url != null ? (
					<Image
					src={novel.cover_url}
					alt="novel cover"
					className={cn(
						"aspect-[11/16] w-min object-cover rounded data-[loaded=false]:animate-pulse data-[loaded=false]:bg-gray-100/10 hover:scale-[1.02] transition duration-150 ease-in-out cursor-pointer",
						imageProps
					)}
					width={300}
					height={400}
					loading="eager"
					data-loaded="false"
					onLoad={event => {
						event.currentTarget.setAttribute('data-loaded', 'true');
					}}
					onClick={() => router.push(`/library/${novel.id}`)}
					priority
				/>
				) : (
					<Skeleton 
					onClick={() => router.push(`/library/${novel.id}`)}
					className={cn(
						"aspect-[11/16] w-min object-cover rounded cursor-pointer flex items-center justify-center text-center",
						imageProps
					)}>
						<p>No Cover Available.</p>
					</Skeleton>
				)}
			</>
			<figcaption
				className={cn("pt-2 text-xs text-muted-foreground flex flex-col", captionProps)}>
				<span className="w-full block font-semibold text-foreground line-clamp-2">{novel.title}</span>
				<span className="line-clamp-1">{novel.author}</span>
			</figcaption>
		</motion.figure>
	);
}

export default NovelCard;
