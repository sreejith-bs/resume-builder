<script>
	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import { navigateTo } from '$lib/utils';
	import { goto } from '$app/navigation';
	import ResumeList from '../components/ResumeList.svelte';
	import { userDetailsData, appConfigData } from '../store/store';
	import { onMount, onDestroy } from 'svelte';

	// export let selectedTab;
	let tabSet = 0;

	function selectTemplate(template) {
		appConfigData.update((data) => ({
			...data,
			theme: template
		}));

		goto('/landing-page/form');
	}
	const unsubscribe = appConfigData.subscribe((data) => {
		tabSet = data.selectedTab;
		console.log('Store updated:', data.selectedTab);
	});
	onMount(unsubscribe);
	onDestroy(unsubscribe);
</script>

<div class="container mx-auto justify-center pt-20 text-center">
	<h1 class="text-7xl font-bold">Job-winning resume <br /> templates</h1>
	<p class="py-6 font-semibold">
		Each resume template is expertly designed and follows the exact “resume rules” hiring <br /> managers
		look for. Stand out and get hired faster with field-tested resume templates.
	</p>
</div>
<div class="mx-auto w-4/5 justify-center">
	<TabGroup justify="justify-center" rounded="rounded-t-md">
		<Tab bind:group={tabSet} name="tab1" value={0}>
			<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
			<span>Templates</span>
		</Tab>
		<Tab bind:group={tabSet} name="tab2" value={1}>List all resumes</Tab>
		<!-- <Tab bind:group={tabSet} name="tab3" value={2}>(label 3)</Tab> -->
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<div class="grid grid-cols-3 justify-items-center gap-5 pb-16 pt-5">
					<a
						class="theme rounded-md"
						on:click={() => {
							selectTemplate('theme1');
						}}
					>
						<!-- <header class="card-header">(header)</header> -->
						<img src="../ThemeDublin.png" alt="Template image Dublin" class="image" />
						<!-- <section class="p-4">Theme 1</section>
						<footer class="card-footer">Dublin</footer> -->
					</a>
					<a
						class="theme rounded-md"
						on:click={() => {
							selectTemplate('theme2');
						}}
					>
						<img src="../ThemeMadrid.png" alt="Template image ThemeMadrid" class="image" />
						<!-- <section class="p-4">Theme 2</section>
						<footer class="card-footer">Madrid</footer> -->
					</a>
					<a
						class="theme rounded-md"
						on:click={() => {
							selectTemplate('theme3');
						}}
					>
						<img src="../ThemeSydney.png" alt="Template image ThemeSydney" class="image" />
						<!-- <section class="p-4">Theme 3</section>
						<footer class="card-footer">Sydney</footer> -->
					</a>
				</div>
			{:else if tabSet === 1}
				<ResumeList />
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>

<style>
	/* .image {
		height: 620px;
	} */
	/* .container {
		background-image: url('../Resume-Edit-4.png');
		background-size: contain;
		background-repeat: no-repeat;
		background-position: right;
	} */
	/* .background-img1 {
		background-image: url('../ThemeDublin.png');
		background-size: contain;
		background-repeat: no-repeat;
		height: 475px;
	} */
	/* .background-img2 {
		background-image: url('../ThemeMadrid.png');
		background-size: contain;
		background-repeat: no-repeat;
		height: 475px;
	} */
	/* .background-img3 {
		background-image: url('../ThemeSydney.png');
		background-size: contain;
		background-repeat: no-repeat;
		height: 475px;
	} */
	.theme {
		cursor: pointer;
	}
	.image {
		display: inline-block;
		transition: transform 0.3s ease;
		max-height: 475px;
		/* box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); */
	}
	.image:hover {
		transform: scale(1.2);
		box-shadow: 2px 2px 30px 1px rgba(0, 0, 0, 0.2);
	}
</style>
