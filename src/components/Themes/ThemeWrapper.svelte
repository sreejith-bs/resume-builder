<script>
	import { onDestroy, onMount } from 'svelte';
	import { appConfigData } from '../../store/store';
	import ThemeDublin from './ThemeDublin.svelte';
	import ThemeMadrid from './ThemeMadrid.svelte';
	import ThemeSydney from './ThemeSydney.svelte';
	import { goto } from '$app/navigation';

	export let edit;
	export let theme;
	export let id;

	let htmlToPdf;

	const unsubscribe = appConfigData.subscribe((data) => {
		edit = data.edit;
		theme = data.theme;
		id = data.id;
	});

	onMount(async () => {
		unsubscribe;
		try {
			const module = await import('html2pdf.js');
			htmlToPdf = module.default;
		} catch (error) {
			console.log('error-htmlToPdf', error);
		}

		if (!theme) {
			goto('/landing-page');
		}
	});

	onDestroy(unsubscribe);

	function closePreview() {
		goto('/landing-page/form');
	}
	function downloadResume() {
		try {
			let element = document.getElementById('section-to-print');
			htmlToPdf(element);
		} catch (error) {
			console.log('download-error', error);
		}
	}
</script>

<div>
	{#if theme === 'theme1'}
		<ThemeDublin {theme} {id} {edit} />
	{:else if theme === 'theme2'}
		<ThemeMadrid {theme} {id} {edit} />
	{:else}
		<ThemeSydney {theme} {id} {edit} />
	{/if}
	<div class="no-print">
		<div class="close-button flex flex-col items-center">
			<button class="variant-filled btn btn-sm my-6 w-[100px] py-3" on:click={closePreview}
				>Close</button
			>
			<button class="variant-filled btn btn-sm my-6 w-[100px] py-3" on:click={downloadResume}
				>Download PDF</button
			>
		</div>
	</div>
</div>

<style>
	@media print {
		body * {
			display: none !important;
		}
		.no-print {
			display: none;
		}
	}
	.close-button {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		background-color: rgba(135, 174, 237, 0.7);
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
	}
</style>
