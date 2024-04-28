import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<section>
				<div className="absolute top-4 left-4">
					<Button variant="ghost">
						<Link href="/" className="flex items-center gap-2">
							<ChevronLeft />
							Back
						</Link>
					</Button>
				</div>
				{children}
			</section>
		</>
	);
}
