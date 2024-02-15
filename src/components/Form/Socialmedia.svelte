<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Title from '../../components/Form/Title.svelte';

	export let social_media = {
		social_media_heading: '',
		data: [
		{
			label: '',
			url: '',
			is_active: true
		}
	]}
	function add() {
		social_media.data = social_media.data.concat({
			label: '',
			url: '',
			is_active: true
		});
	}
	function remove(index = 0) {
		social_media.data = social_media.data.filter((soc, deleteIndex) => index !== deleteIndex);
	}
	let defaultTitle = 'Website & Social Links';
	let title = social_media.social_media_heading ? social_media.social_media_heading : defaultTitle;
	$: {
		social_media.social_media_heading = title;
	}
</script>

<div id="socialMedia">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Website & Social Links</h3> -->
	</div>
	{#each social_media.data as soc, index}
		<Accordion rounded="rounded-none">
			<AccordionItem open>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">
					<div class="flex flex-row">
						<div class="basis-1/6">
							<h4 class="font-bold tracking-wider">
								{soc.label ? soc.label : '(Not Specified)'}
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
							<h5 class="text-sm tracking-wider">Label</h5>
							<input
								name="label"
								id="label"
								bind:value={soc.label}
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Url</h5>
							<input
								name="url"
								id="url"
								bind:value={soc.url}
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
			>+ Add one more socialmedia</button
		>
	</div>
</div>
