<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import Title from '../../components/Form/Title.svelte';
	import { socialMediaData } from '../../store/store.js';
	import { errors } from '../../store/store.js';
	import { validateForm } from '$lib/validation/validation.js';

	let social_media = $socialMediaData;
	let fieldError = $errors.social_media;
	function add() {
		// social_media.data = social_media.data.concat({
		// 	label: '',
		// 	url: '',
		// 	is_active: true
		// });
		socialMediaData.update((data) => ({
			...data,
			data: [...data.data, {}] // Add a new empty object to the array
		}));
	}
	function remove(index = 0) {
		// social_media.data = social_media.data.filter((soc, deleteIndex) => index !== deleteIndex);
		socialMediaData.update((data) => ({
			...data,
			data: data.data.filter((item, i) => i !== index) // Filter out the object at the specified index
		}));
	}

	let defaultTitle = 'Website & Social Links';
	let title = social_media.social_media_heading ? social_media.social_media_heading : defaultTitle;

	$: {
		// social_media.social_media_heading = title;
		socialMediaData.update((data) => ({
			...data,
			social_media_heading: title
		}));
		social_media = $socialMediaData
		fieldError = $errors.social_media;
	}
	const updateSocialMediaDetails = (field, value, index = 0) => {
		socialMediaData.update((data) => {
			data.data[index][field] = value;
			return data;
		});
	};
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
									class="variant-filled btn btn-sm"
									on:click={() => remove(index)}>Delete</button
								>
							{/if}
						</div>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">Label</h5>
							<input
								name="label"
								id={`label-${index}`}
								bind:value={soc.label}
								on:input={() => updateSocialMediaDetails('label', soc.label, index)}
								on:blur={validateForm('label', soc.label, 'social_media', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.label}<p class="error">{fieldError?.[index]?.label}</p>{/if}
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Url</h5>
							<input
								name="url"
								id={`url-${index}`}
								bind:value={soc.url}
								on:input={() => updateSocialMediaDetails('url', soc.url, index)}
								on:blur={validateForm('url', soc.url, 'social_media', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.url}<p class="error">{fieldError?.[index]?.url}</p>{/if}
						</label>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{/each}
	<div class="pt-3">
		<button type="button" class="variant-filled btn btn-sm" on:click={add}
			>+ Add one more socialmedia</button
		>
	</div>
</div>
