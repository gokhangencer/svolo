module.exports = {
	/** @type {import('tailwindcss').Config} */
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {}
		}
	},
	plugins: [require('daisyui')]
};
