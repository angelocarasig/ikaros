// Utility functions
import { DateFilter } from '@/models/library-settings';
import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Combine class values into one string
export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// Convert a date into 'weekday month year' format
export const getDate = (date: any) => {
	const res = new Date(date);
	const options: Intl.DateTimeFormatOptions = {
		weekday: 'long',
		month: 'long',
		year: 'numeric',
		day: 'numeric'
	};

	return res.toLocaleDateString(undefined, options);
};

// Convert a date into dd/mm/yyyy format
export const getDateShort = (date: any) =>
	`${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
		.toString()
		.padStart(2, '0')}/${date.getFullYear()}`;

// Convert a string to title case
export const toTitleCase = (str: string) =>
	str.toLowerCase().replace(/(^|\s)\S/g, (letter) => letter.toUpperCase());

// Check if a DateFilter object is empty
export const isDateFilterEmpty = (object?: DateFilter) => {
	if (typeof object !== 'object' || object == null) {
		return true;
	}

	return [object.beforeDate, object.afterDate, object.betweenDate].every(
		(value) => value === null || value === undefined
	);
};

// Sanitize a filename for S3
export const sanitizeFilename = (key: string) => {
	const regex = /[^0-9a-zA-Z!\-_.*'()]/g;

	// Replace non-safe characters with underscores
	const sanitizedKey = key.replace(regex, '_');

	return sanitizedKey;
};

// Get a specified number of random items from an array
export const getRandomItemsFromArray = <T>(array: T[], count: number): T[] => {
	return array
		.slice()
		.sort(() => Math.random() - 0.5)
		.slice(0, count);
};

export function zip(...arrays: any[][]): any[][] {
	let maxLength = Math.min(...arrays.map((arr) => arr.length));
	return Array(maxLength)
		.fill(null)
		.map((_, i) => arrays.map((array) => array[i]));
}


export function alphaNumericSortObjects<T>(arr: T[], sortBy: keyof T): T[] {
	return arr.sort((a, b) => {
		// Initialize values to compare as empty strings
		let [keyA, keyB] = ['', ''];

		try {
			// Convert properties to strings, if they exist, or keep them as empty strings otherwise
			keyA = a[sortBy]?.toString() || '';
			keyB = b[sortBy]?.toString() || '';
		} catch (e) {
			throw `Can't sort by property: ${String(sortBy)}!`
		}

		// Use a single regular expression to extract the alphabetical and numerical parts of the property strings
		// This regex expression assumes that the property strings start with one or more alphabetical characters followed by zero or more digits
		const [alphaA, numA] = keyA.match(/^([a-z]+)(\d*)/i) || [];
		const [alphaB, numB] = keyB.match(/^([a-z]+)(\d*)/i) || [];

		// Use localeCompare for the alphabetical comparison,
		// and make the numerical comparison only when the alphabetical parts are equal
		return alphaA!.localeCompare(alphaB!) || Number(numA) - Number(numB);
	});
}
