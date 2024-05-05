import React from 'react';
import { getDate, toTitleCase } from '@/lib/utils';
import { Novel } from '@/models/novel/novel';

function OverviewTab({ novel }: { novel: Novel }) {
	return (
		<div className="flex flex-col p-4 h-full gap-12">
			<OverViewSection title="Description" content={novel.description || 'No Description Provided.'}/>

			<OverViewSection title="Publication">
				{/* {novel.metadata.dates.map((date, index) => (
					<div key={index} className="flex gap-2">
						<span>{toTitleCase(date.event ?? "")} Date: </span>
						<span>{getDate(date.date)}</span>
					</div>
				))} */}
			</OverViewSection>

			<OverViewSection title="History" content='No Content Available. Show Heatmap (?)'/>

			<OverViewSection title="External Links" content='No Content Available.'/>
		</div>
	);
}


interface OverviewSectionProps {
	title: string;
	content?: string;
	children?: React.ReactNode;
}

const OverViewSection: React.FC<OverviewSectionProps> = ({ title, content, children }) => {
	return (
		<div>
			<h3 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">{title}</h3>
			{content != null && <p className="leading-7">{content}</p>}
      {children != null && (children)}
		</div>
	);
};

export default OverviewTab;
