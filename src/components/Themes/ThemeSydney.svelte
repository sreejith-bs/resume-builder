<script>
	import Body from './ThemeBlocks/Body.svelte';
	import ResumeTitleBlock from './ThemeBlocks/ResumeTitleBlock.svelte';
	import SideBar from './ThemeBlocks/SideBar.svelte';
	import Custom from './ThemeBlocks/Custom.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { form } from '../../store/store';

	export let theme;
	export let id;
	export let edit;
	let baseUrl = '/landing-page/form/';
	let backUrl = `${baseUrl}edit/${theme}/${id}`;
	let resume_details = $form;

</script>

{#if resume_details.theme}
	<div class="overflow-none resume-height container mx-auto w-[794px] bg-slate-50 px-6 font-mono">
		<ResumeTitleBlock
			name={`${resume_details.first_name} ${resume_details.last_name}`}
			theme={resume_details.theme}
		/>
		<Custom details={resume_details} />
	</div>
	<div class="flex flex-col items-center">
		<a href={backUrl} class="variant-filled btn btn-sm my-6 w-[100px] py-3">Close</a>
	</div>
{/if}

<style>
	.resume-height {
		min-height: 100%;
		/* scale: 0.8; */
	}
	/* .body-container {
		display: grid;
		grid-template-columns: auto auto;
		grid-gap: 10px;
	} */
	/* .item2 {
		grid-column: 2 / span 2;
	} */
</style>
