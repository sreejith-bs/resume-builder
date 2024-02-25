<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { languageData } from '../../store/store.js';
	import Title from '../../components/Form/Title.svelte';
	import { errors } from '../../store/store.js';
	import { validateForm } from '$lib/validation/validation.js';

	let language = $languageData;
	let fieldError = $errors.language;

	function add() {
		// language.data = language.data.concat({
		// 	language: '',
		// 	rating: null,
		// 	is_active: true
		// });
		languageData.update((data) => ({
			...data,
			data: [...data.data, {}] // Add a new empty object to the array
		}));
	}
	function remove(index = 0) {
		// language.data = language.data.filter((lang, deleteIndex) => index !== deleteIndex);
		languageData.update((data) => ({
			...data,
			data: data.data.filter((item, i) => i !== index)
		}));
	}

	let defaultTitle = 'Language';
	let title = language.language_heading ? language.language_heading : defaultTitle;

	$: {
		// language.language_heading = title;
		languageData.update((data) => ({
			...data,
			language_heading: title
		}));
		language = $languageData;
		fieldError = $errors.language;
	}

	const updateLanguageDetails = (field, value, index = 0) => {
		languageData.update((data) => {
			data.data[index][field] = value;
			return data;
		});
	};
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
								{lang.label ? lang.label : '(Not Specified)'}
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
							<h5 class="text-sm tracking-wider">Language</h5>
							<input
								name="language"
								id={`language-${index}`}
								bind:value={lang.label}
								on:input={() => updateLanguageDetails('language', lang.label, index)}
								on:blur={validateForm('label', lang.label, 'language', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.label}<p class="error">{fieldError?.[index]?.label}</p>{/if}
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Level</h5>
							<input
								name="rating"
								id={`rating-${index}`}
								bind:value={lang.rating}
								on:input={() => updateLanguageDetails('rating', lang.rating, index)}
								on:blur={validateForm('rating', lang.rating, 'language', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="number"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.rating}<p class="error">{fieldError?.[index]?.rating}</p>{/if}
						</label>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{/each}
	<div class="pt-3">
		<button type="button" class="variant-filled btn btn-sm" on:click={add}
			>+ Add one more language</button
		>
	</div>
</div>
