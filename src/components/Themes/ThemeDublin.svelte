<script>
	import Body from './ThemeBlocks/Body.svelte';
	import ResumeTitleBlock from './ThemeBlocks/ResumeTitleBlock.svelte';
	import SideBar from './ThemeBlocks/SideBar.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { form } from '../../store/store';
	import { goto } from '$app/navigation';
	export let theme;
	export let id;
	export let edit;
	let resume_details = $form;

	// onMount(() => {
	// 	backUrl = edit ? `${baseUrl}edit/${theme}/${id}` : `${baseUrl}${theme}`;
	// });
	// function closePreview() {
	// 	goto('/landing-page/form')
	// }
</script>

{#if resume_details.theme}
	<div
		id="section-to-print"
		class="overflow-none resume-box container mx-auto my-6 w-[794px] bg-slate-50 px-8 py-6"
	>
		<ResumeTitleBlock
			name={`${resume_details.first_name} ${resume_details.last_name}`}
			jobTitle={resume_details.job_title}
			theme={resume_details.theme}
		/>
		<div class="body-container">
			<div class="item1"><Body details={resume_details} /></div>
			<div class="item2 rounded-lg bg-blue-900 px-4 py-4 text-slate-50">
				<SideBar details={resume_details} />
			</div>
		</div>
	</div>
	<!-- <div class="no-print flex flex-col items-center">
		<button class="variant-filled btn btn-sm my-6 w-[100px] py-3" on:click={closePreview}>Close</button>
	</div> -->
{/if}

<style>
	.resume-box {
		min-height: 100%;
		border: 0.5px solid black;
		/* scale: 0.9; */
	}
	.body-container {
		display: grid;
		grid-template-columns: auto auto auto auto;
		grid-gap: 30px;
	}
	.item1 {
		grid-column: 1 / span 3;
	}
	/* @media print {
		body * {
			display: none;
		}

		#section-to-print,
		#section-to-print * {
			display: block;
		}
	} */
</style>
