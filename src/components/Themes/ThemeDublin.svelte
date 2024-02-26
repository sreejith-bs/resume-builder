<script>
	import Body from './ThemeBlocks/Body.svelte';
	import ResumeTitleBlock from './ThemeBlocks/ResumeTitleBlock.svelte';
	import SideBar from './ThemeBlocks/SideBar.svelte';
	import { onMount, onDestroy } from 'svelte';
	import { resumeDetails } from '../../store/store';

	let resume_details;

	const unsubscribe = resumeDetails.subscribe((value) => {
		resume_details = value;
		console.log('resume_details', resume_details);
	});

	onMount(() => {
		unsubscribe;
	});
	onDestroy(unsubscribe);
</script>

{#if resume_details.theme}
	<div class="overflow-none container mx-auto min-h-[1122px] w-[794px] bg-slate-50 px-8 py-6">
		<ResumeTitleBlock
			name={`${resume_details.first_name} ${resume_details.last_name}`}
			jobTitle={resume_details.job_title}
		/>
		<div class="grid grid-flow-col grid-rows-3 gap-10">
			<div class="col-span-3 row-span-3"><Body details={resume_details} /></div>
			<div class="row-span-1"><SideBar details={resume_details} /></div>
		</div>
	</div>
{/if}
