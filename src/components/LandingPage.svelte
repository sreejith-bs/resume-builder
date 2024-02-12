<script>
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	let tabSet = 0;
</script>

<div class="container justify-center text-center mx-auto pt-20">
	<h1 class="h1 text-7xl font-bold">Job-winning resume <br /> templates</h1>
	<p class="py-6 font-semibold">
		Each resume template is expertly designed and follows the exact “resume rules” hiring <br /> managers
		look for. Stand out and get hired faster with field-tested resume templates.
	</p>
</div>
<div class="justify-center mx-auto w-4/5">
	<TabGroup justify="justify-center">
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
			<span>Templates</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>List all resumies</Tab>
		<!-- <Tab bind:group={tabSet} name="tab3" value={2}>(label 3)</Tab> -->
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				(tab panel 1 contents)
			{:else if tabSet === 1}
				(tab panel 2 contents)
			{:else if tabSet === 2}
				(tab panel 3 contents)
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
