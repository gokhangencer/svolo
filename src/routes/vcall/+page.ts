import type { PageLoad } from './$types';

export const prerender = false;
export const ssr = false;

export const load = (() => {
	return {
		protected: true
	};
}) satisfies PageLoad;
