<script>
	import Body from './ThemeBlocks/Body.svelte';
	import ResumeTitleBlock from './ThemeBlocks/ResumeTitleBlock.svelte';
	import SideBar from './ThemeBlocks/SideBar.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { form } from '../../store/store';

	export let theme;
	export let id;
	export let edit;
	// let baseUrl = '/landing-page/form/';
	// let backUrl = `${baseUrl}edit/${theme}/${id}`;
	let resume_details = $form;
</script>

{#if resume_details.theme}
	<div
		id="section-to-print"
		class="overflow-none resume-box container mx-auto my-6 w-[794px] bg-slate-50"
	>
		<div class="body-container">
			<div class="item1 bg-gray-700 px-8 py-14 text-slate-50">
				<ResumeTitleBlock
					name={`${resume_details.first_name} ${resume_details.last_name}`}
					jobTitle={resume_details.job_title}
					theme={resume_details.theme}
				/>
				<SideBar details={resume_details} />
			</div>
			<div class="item2 py-14 pl-2 pr-8"><Body details={resume_details} /></div>
		</div>
	</div>
	<!-- <div class="no-print flex flex-col items-center">
		<a href={backUrl} class="variant-filled btn btn-sm my-6 w-[100px] py-3">Close</a>
	</div> -->
{/if}

<style>
	.resume-box {
		min-height: 100%;
		/* border: 0.5px solid black; */
		/* scale: 0.9; */
	}
	.body-container {
		display: grid;
		grid-template-columns: auto auto auto;
		grid-gap: 10px;
	}
	.item2 {
		grid-column: 2 / span 2;
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
