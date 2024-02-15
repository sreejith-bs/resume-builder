<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Title from '../../components/Form/Title.svelte';

	export let skills = {
        skills_heading: '',
        data: [
		{
			label: '',
			rating: null,
			is_active: true
		}
	]};
	function add() {
		skills.data = skills.data.concat({
			label: '',
			rating: null,
			is_active: true
		});
	}
	function remove(index = 0) {
		skills.data = skills.data.filter((skil, deleteIndex) => index !== deleteIndex);
	}

    let defaultTitle = 'Skills';
	let title = skills.skills_heading ? skills.skills_heading : defaultTitle;
	$: {
		skills.skills_heading = title;
	}
</script>

<div id="skills">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Skills</h3> -->
	</div>
	{#each skills.data as skil, index}
		<Accordion rounded="rounded-none">
			<AccordionItem open>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">
					<div class="flex flex-row">
						<div class="basis-1/6">
							<h4 class="font-bold tracking-wider">
								{skil.label ? skil.label : '(Not Specified)'}
							</h4>
						</div>
						<div>
							{#if index !== 0}
								<button
									type="button"
									class="btn btn-sm variant-filled"
									on:click={() => remove(index)}>Delete</button
								>
							{/if}
						</div>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
						<label class="label">
							<h5 class="text-sm tracking-wider">Skill</h5>
							<input
								name="label"
								id="label"
								bind:value={skil.label}
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Level</h5>
							<input
								name="rating"
								id="rating"
								bind:value={skil.rating}
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{/each}
	<div class="pt-3">
		<button type="button" class="btn btn-sm variant-filled" on:click={add}
			>+ Add one more skills</button
		>
	</div>
</div>
