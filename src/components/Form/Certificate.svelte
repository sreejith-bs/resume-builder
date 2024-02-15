<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Title from '../../components/Form/Title.svelte';

	export let certificate = {
		certificate_heading: '',
		data: [
			{
				label: '',
				url: '',
				is_active: true
			}
		]
	};
	function add() {
		certificate.data = certificate.data.concat({
			label: '',
			url: '',
			is_active: true
		});
	}
	function remove(index = 0) {
		certificate.data = certificate.data.filter((cert, deleteIndex) => index !== deleteIndex);
	}

	let defaultTitle = 'Certificate';
	let title = certificate.certificate_heading ? certificate.certificate_heading : defaultTitle;
	$: {
		certificate.certificate_heading = title;
	}
</script>

<div id="certificate">
	<div class="pt-4">
		<Title bind:title/>
		<!-- <h3 class="h3">Certificate</h3> -->
	</div>
	{#each certificate.data as cert, index}
		<Accordion rounded="rounded-none">
			<AccordionItem open>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">
					<div class="flex flex-row">
						<div class="basis-1/6">
							<h4 class="font-bold tracking-wider">
								{cert.label ? cert.label : '(Not Specified)'}
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
							<h5 class="text-sm tracking-wider">Course</h5>
							<input
								name="label"
								id="label"
								bind:value={cert.label}
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
								bind:value={cert.url}
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
			>+ Add one more certificate</button
		>
	</div>
</div>
