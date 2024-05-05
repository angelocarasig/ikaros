import { useState, useEffect } from "react";
import { Book, NavItem } from "epubjs";

export default function useTableOfContents(book: Book) {
  const [tableOfContents, setTableOfContents] = useState<Array<NavItem>>([]);
  
  useEffect(() => {
		let isActive = true;

		const setupTableOfContents = async () => {
			try {
				await book.ready;
				if (!isActive) return;

        const currentToC = book.navigation.toc.map(value => {
          return {...value, href: value.href.replace('../', '')}
        })

				setTableOfContents(currentToC);
			} catch (error) {
				console.error('Failed to setup the book rendition:', error);
			}
		};

		setupTableOfContents();

		return () => {
			isActive = false;
		};
	}, [book]);

  return { tableOfContents };
}