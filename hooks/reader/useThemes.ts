import { Rendition } from 'epubjs';
import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export default function useThemes(rendition: Rendition | null) {
	const { resolvedTheme } = useTheme();

	const updateRenditionTheme = () => {
    switch (resolvedTheme) {
      case 'dark': {
        rendition!.themes.override('color', '#FAFAFA')
        rendition!.themes.override('background', '#09090B')
        break
      }
      case 'light': {
        rendition!.themes.override('color', '#18181B')
        rendition!.themes.override('background', '#FFFFFF')
        break
      }
    }
	};

	useEffect(() => {
		if (rendition == null) return;
		console.log('Updating rendition themes... (rendition)');
		updateRenditionTheme();
	}, [rendition, resolvedTheme]);
}
