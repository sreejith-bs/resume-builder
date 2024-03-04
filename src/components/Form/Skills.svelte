<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { skillsData } from '../../store/store.js';
	import Title from '../../components/Form/Title.svelte';
	import { errors } from '../../store/store.js';
	import { validateForm, customValidation } from '$lib/validation/validation.js';

	let skills = $skillsData;
	let fieldError = $errors.skills;

	function add() {
		// skills.data = skills.data.concat({
		// 	label: '',
		// 	rating: null,
		// 	is_active: true
		// });
		skillsData.update((data) => ({
			...data,
			data: [...data.data, { label: '', rating: Boolean, is_active: true }] // Add a new empty object to the array
		}));
	}
	function remove(index = 0) {
		// skills.data = skills.data.filter((skil, deleteIndex) => index !== deleteIndex);
		skillsData.update((data) => ({
			...data,
			data: data.data.filter((item, i) => i !== index) // Filter out the object at the specified index
		}));
	}

	const updateSkillDetails = (field, value, index = 0) => {
		skillsData.update((data) => {
			data.data[index][field] = value;
			return data;
		});
	};

	let defaultTitle = 'Skills';
	let title = skills.skills_heading ? skills.skills_heading : defaultTitle;
	$: {
		// skills.skills_heading = title;
		skillsData.update((data) => ({
			...data,
			skills_heading: title
		}));
		skills = $skillsData;
		fieldError = $errors.skills;
	}
	function validateInput(event) {
		const inputElement = event.target;
		const rule = JSON.parse(inputElement.dataset.rule.replace(/'/g, '"'));

		customValidation.validate(inputElement, rule);
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
									class="variant-filled btn btn-sm"
									on:click={() => remove(index)}>Delete</button
								>
							{/if}
						</div>
					</div>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="grid gap-4 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">Skill</h5>
							<input
								name="label"
								id={`label-${index}`}
								bind:value={skil.label}
								on:input={(event) => {
									updateSkillDetails('label', skil.label, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`skillsError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`skillsError-${index}`}></span>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Level</h5>
							<input
								name="rating"
								id={`rating-${index}`}
								bind:value={skil.rating}
								on:input={() => {
									updateSkillDetails('rating', skil.rating, index);
								}}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="number"
								min="1"
								max="5"
								placeholder="..."
							/>
						</label>
					</div>
					<div class="space-y-2">
						<label class="flex items-center space-x-2">
							<input
								class="checkbox"
								type="checkbox"
								on:change={() => updateSkillDetails('is_active', !skil.is_active, index)}
								checked={skil.is_active}
							/>
							<p>Section Active</p>
						</label>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{/each}
	<div class="pt-3">
		<button type="button" class="variant-filled btn btn-sm" on:click={add}
			>+ Add one more skills</button
		>
	</div>
</div>
