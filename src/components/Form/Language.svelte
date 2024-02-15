<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Title from '../../components/Form/Title.svelte';

	export let language = {
        language_heading: '',
        data: [
		{
			language: '',
			rating: null,
			is_active: true
		}
	]};
	function add() {
		language.data = language.data.concat({
			language: '',
			rating: null,
			is_active: true
		});
	}
	function remove(index = 0) {
		language.data = language.data.filter((lang, deleteIndex) => index !== deleteIndex);
	}

    let defaultTitle = 'Language';
	let title = language.language_heading ? language.language_heading : defaultTitle;
	$: {
		language.language_heading = title;
	}
</script>

<div id="language">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Languages</h3> -->
	</div>
	{#each language.data as lang, index}
		<Accordion rounded="rounded-none">
			<AccordionItem open>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">
					<div class="flex flex-row">
						<div class="basis-1/6">
							<h4 class="font-bold tracking-wider">
								{lang.language ? lang.language : '(Not Specified)'}
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
							<h5 class="text-sm tracking-wider">Language</h5>
							<input
								name="language"
								id="language"
								bind:value={lang.language}
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
								bind:value={lang.rating}
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
			>+ Add one more language</button
		>
	</div>
</div>
