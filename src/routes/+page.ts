import type { PageLoad } from './$types';

export const prerender = false;

export const load = (() => {
	return {
		protected: false,
		test: 'main page'
	};
}) satisfies PageLoad;
