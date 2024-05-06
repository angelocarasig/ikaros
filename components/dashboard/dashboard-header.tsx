import { useRouter } from 'next/navigation';
import { BookOpen, Library } from 'lucide-react';

import { Button } from '../ui/button';
import { Novel } from '@/models/novel/novel';


function DashboardHeader({ currentNovel }: { currentNovel: Novel }) {
  const router = useRouter();

	return (
		<div className="relative w-full h-[35vh] md:h-[60vh] select-none">
			<div
				id="background"
				className="absolute w-full h-full object-cover select-none bg-cover bg-center blur-[2px] brightness-50"
				style={{ backgroundImage: `url('${currentNovel.cover_url}')` }}
			/>
			<div
				id="backgroundFilter"
				className="absolute w-full h-[101%] bg-gradient-to-b from-zinc-800/25 to-zinc-950/95">
				<div className="absolute bottom-8 left-8 flex items-end gap-2 w-[90%] h-min">
					<div
						id="novelCover"
						className="rounded aspect-[11/16] h-[12rem] md:h-[18rem] lg:h-[20rem] transition ease-in-out z-10 bg-cover bg-center"
						style={{ backgroundImage: `url('${currentNovel.cover_url}')` }}
					/>
					<div className="flex flex-col self-stretch md:p-4 text-white">
						<h1 className="text-2xl font-bold lg:text-4xl md:text-3xl line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
							{currentNovel?.title}
						</h1>
						<small className="text-sm font-medium leading-none my-2">{currentNovel.author}</small>
						<p className="leading-7 mt-4 hidden md:webkit-box md:line-clamp-4 lg:line-clamp-5">
							{currentNovel?.description || "No Description Available."}
						</p>
						<div className="flex flex-col sm:flex-row gap-4 mt-auto">
							<Button onClick={() => router.push(`/reader/${currentNovel.id}`)}>
								<BookOpen className="mr-2 h-4 w-4" /> Read Now
							</Button>
							<Button onClick={() => router.push(`/library/${currentNovel.id}`)} variant="secondary">
								<Library className="mr-2 h-4 w-4" /> View In Library
							</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default DashboardHeader;
