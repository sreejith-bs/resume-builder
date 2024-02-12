<script>
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';

	let tabSet = 0;
</script>

<div class="container justify-center text-center mx-auto pt-20">
	<h1 class="text-7xl font-bold">Job-winning resume <br /> templates</h1>
	<p class="py-6 font-semibold">
		Each resume template is expertly designed and follows the exact “resume rules” hiring <br /> managers
		look for. Stand out and get hired faster with field-tested resume templates.
	</p>
</div>
<div class="justify-center mx-auto w-4/5">
	<TabGroup justify="justify-center" rounded="rounded-t-md">
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
			<span>Templates</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>List all resumies</Tab>
		<!-- <Tab bind:group={tabSet} name="tab3" value={2}>(label 3)</Tab> -->
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<div class="grid grid-cols-3 gap-5 pt-5">
					<a href="/landing-page/form/{'theme-1'}" class="block card card-hover rounded-md">
                        <!-- <header class="card-header">(header)</header> -->
                        <section class="p-4">Theme 1</section>
                        <footer class="card-footer">Dublin</footer>
                    </a>
					<a href="/landing-page/form/{'theme-2'}" class="card card-hover rounded-md">
                        <section class="p-4">Theme 2</section>
                        <footer class="card-footer">Madrid</footer>
                    </a>
                    <a href="/landing-page/form/{'theme-3'}" class="card card-hover rounded-md">
                        <section class="p-4">Theme 2</section>
                        <footer class="card-footer">Sydney</footer>
                    </a>
				</div>
			{:else if tabSet === 1}
				(tab panel 2 contents)
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
