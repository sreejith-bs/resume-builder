//** @type {import('tailwindcss').Config}*/

import { join } from 'path';
import type { Config } from 'tailwindcss';
// import { forms, typography } from '@tailwindcss';
import { skeleton } from '@skeletonlabs/tw-plugin';

const config = {
	darkMode: 'class',
	content: ['./src/**/*.{html,js,svelte,ts}', join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')],
	theme: {
		extend: {},
	},
	plugins: [
		// forms,
		// typography,
		skeleton({
			themes: {
				// Register each theme within this array:
				preset: [ "skeleton", "modern", "crimson" ] 
			}
		})
	],
} satisfies Config;

export default config;
