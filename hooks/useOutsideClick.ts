import { RefObject, useEffect } from 'react';

export default function useOutsideClick(ref: RefObject<HTMLElement>, onOutsideClick: () => void): void {
	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (ref.current && !ref.current.contains(event.target as Node)) {
				onOutsideClick();
			}
		}

    // Remove noise
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [ref, onOutsideClick]);
}
