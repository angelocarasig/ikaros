import { useState } from 'react';

export default function useTabHandler(initialTab: string, tabValues: string[]) {
	const [currentTab, setCurrentTab] = useState(initialTab);

	const onTabChange = (newTab: string) => {
		if (tabValues.includes(newTab)) {
			setCurrentTab(newTab);
		}
	};

	return { currentTab, onTabChange };
}
