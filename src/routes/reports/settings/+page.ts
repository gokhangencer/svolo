import type { PageLoad } from './$types';

export const load = (() => {
	return {
		protected: true
	};
}) satisfies PageLoad;
