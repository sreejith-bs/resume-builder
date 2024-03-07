<script>
	import { onDestroy, onMount } from 'svelte';
	import { appConfigData } from '../../store/store';
	import ThemeDublin from './ThemeDublin.svelte';
	import ThemeMadrid from './ThemeMadrid.svelte';
	import ThemeSydney from './ThemeSydney.svelte';
	import { form } from '../../store/store';
	import { goto } from '$app/navigation';

	export let edit;
	export let theme;
	export let id;

	let html2pdf;
	let resume_details = $form;
	let fullName = `${resume_details.first_name} ${resume_details.last_name}`;

	const unsubscribe = appConfigData.subscribe((data) => {
		edit = data.edit;
		theme = data.theme;
		id = data.id;
	});

	onMount(async () => {
		unsubscribe;
		try {
			const module = await import('html2pdf.js');
			html2pdf = module.default;
		} catch (error) {
			console.log('error-html2pdf	', error);
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
			let opt = {
				margin: 0.2,
				filename: `${fullName}.pdf`,
				image: { type: 'jpeg', quality: 0.98 },
				html2canvas: { scale: 2 },
				jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait', floatPrecision: 'smart' },
				pagebreak: theme === 'theme2' ? { mode: ['avoid-all', 'css', 'legacy'] } : {}
				// pagebreak: { mode: 'avoid-all', avoid: 'span' }
			};
			// html2pdf(element);
			html2pdf().set(opt).from(element).save();
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
		<div class="button-container flex gap-5">
			<button class="variant-filled btn my-6 w-[100px] py-3" on:click={closePreview}>Close</button>
			<button class="variant-filled btn my-6 px-4 py-3" on:click={downloadResume}
				>Download PDF</button
			>
		</div>
	</div>
</div>

<style>
	@media print {
		/* body * {
			display: none !important;
		} */
		.no-print {
			display: none;
		}
	}
	.button-container {
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
