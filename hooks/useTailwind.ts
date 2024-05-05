import config from '@/tailwind.config';
import { useMemo } from 'react';

import resolveConfig from 'tailwindcss/resolveConfig';

export default function useTailwind() {
	const tailwind = useMemo(() => resolveConfig(config), [config]);

	return tailwind;
}
