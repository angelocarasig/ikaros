import { RenditionOptions } from 'epubjs/types/rendition';

/**
 * Extended rendition options with stricter types
 */
export interface RenditionSettings extends RenditionOptions {
	/** The width of the rendition area, either in pixels or a percentage of the container. */
	width?: number | string;

	/** The height of the rendition area, either in pixels or a percentage of the container. */
	height?: number | string;

	/** CSS classes to ignore when parsing the ePub content. */
	ignoreClass?: string;

	/** The manager type used to handle layout; 'default' for normal and 'continuous' for a scrolling layout. */
	manager?: 'default' | 'continuous';

	/** Custom renderer for the content, only includes option 'iframe' currently, otherwise assume its a function */
	view?: 'iframe' | Function;

	/** The flow of the content, either 'paginated', 'scrolled' (and some other scroll types but typically just use scroll), or 'fixed'. */
	flow?: 'paginated' | 'scrolled' | 'scrolled-continuous' | 'scrolled-doc' | 'fixed';

	/** The layout to be used for the content, typically defined by a CSS file. */
	layout?: 'reflowable' | 'pre-paginated';

	/** The behavior of content spreading across pages or screens. */
	spread?: 'none' | 'always' | 'auto';

	/** Minimum width number in pixels before a spread layout is used. */
	minSpreadWidth?: number;

	/** URL to an external CSS stylesheet that should be applied to the content. */
	stylesheet?: string;

	/** Whether the rendition should adjust sizes when the orientation of the display changes. */
	resizeOnOrientationChange?: boolean;

	/** URL to a JavaScript file that should be executed within the rendition context. */
	script?: string;

	/** Whether infinite scrolling is enabled for the rendition. */
	infinite?: boolean;

	/** CSS overflow property applied to the content. */
	overflow?: string;

	/** Whether snapping is enabled when scrolling, can be a boolean or snapping configuration object. */
	snap?: boolean | object;

	/** The default direction of the text ('ltr' for left-to-right, 'rtl' for right-to-left). */
	defaultDirection?: 'ltr' | 'rtl';

	/** Whether scripts within the content are allowed to be executed. */
	allowScriptedContent?: boolean;

	/** If page should be full-sized (scales images, stretches text, etc.) */
	fullsize?: boolean;

	/** Adjust the offset in pixels that it tries to preload a new view. (default at 500) */
	offset?: number;
}

const defaultSettings: RenditionSettings = {
	width: '100%',
	height: '100%',
	view: 'iframe',
	defaultDirection: 'ltr',
	minSpreadWidth: 1000,
	spread: 'auto',
	layout: 'reflowable',
	snap: false,
	allowScriptedContent: false,
	resizeOnOrientationChange: true,
	fullsize: false,
	offset: 0,

	// stylesheet: '@/styles/globals.css', // TODO: inject stylesheet
	// ignoreClass: 'color', // Ignore color if possible ?
};

export const defaultScrollSettings: RenditionSettings = {
	...defaultSettings,
	flow: 'scrolled-doc',
	manager: 'continuous',
	fullsize: true,
	infinite: true
};

export const defaultPaginatedSettings: RenditionSettings = {
	...defaultSettings,
	flow: 'paginated',
	manager: 'default',
};
