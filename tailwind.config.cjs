module.exports = {
	/** @type {import('tailwindcss').Config} */
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primary: 'var(--primary)',
				secondary: 'var(--secondary)'
			}
		}
	},
	plugins: [require('daisyui')]
};
