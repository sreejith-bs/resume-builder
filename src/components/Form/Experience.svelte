<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { experienceData } from '../../store/store.js';
	import Title from '../../components/Form/Title.svelte';
	import DatePicker from '../DatePicker.svelte';
	import { errors } from '../../store/store.js';
	import { validateForm, customValidation } from '$lib/validation/validation.js';
	import { formatDate } from '$lib/utils.js';

	let experience = $experienceData;
	let startDate;
	let endDate;
	let fieldError = $errors.experience;
	let selectedCheckbox = null;

	function add() {
		// experience.data = experience.data.concat({
		// 	job_title: '',
		// 	employer: '',
		// 	start_date: '',
		// 	end_date: '',
		// 	city: '',
		// 	country: '',
		// 	description: '',
		// 	current_status: false,
		// 	is_active: true
		// });
		experienceData.update((data) => ({
			...data,
			data: [
				...data.data,
				{
					job_title: '',
					employer: '',
					start_date: '',
					end_date: '',
					city: '',
					country: '',
					description: '',
					current_status: false,
					is_active: true
				}
			] // Add a new empty object to the array
		}));
	}
	function remove(index = 0) {
		// experience.data = experience.data.filter((exp, deleteIndex) => index !== deleteIndex);
		experienceData.update((data) => ({
			...data,
			data: data.data.filter((item, i) => i !== index)
		}));
	}
	let defaultTitle = 'Employment History';
	let title = experience.experience_heading ? experience.experience_heading : defaultTitle;

	$: {
		// experience.experience_heading = title;
		experienceData.update((data) => ({
			...data,
			experience_heading: title
			// start_date: startDate,
			// end_date: endDate
		}));
		experience = $experienceData;
		fieldError = $errors.experience;
	}

	const updateExperienceDetails = (field, value, index = 0) => {
		experienceData.update((data) => {
			data.data[index][field] = value;
			return data;
		});
	};
	function validateInput(event, date = '') {
		const inputElement = event.target;
		const rule = JSON.parse(inputElement.dataset.rule.replace(/'/g, '"'));

		customValidation.validate(inputElement, rule, date);
	}
	function toggleWorkingStatus(index) {
		experience.data = experience.data.map((e, indexVal) => {
			if (indexVal !== index) e.current_status = false;
			return e;
		});
		const endDateElement = document.getElementById(`expEndDate-${index}`);
		endDateElement.value = '';
		endDateElement.dispatchEvent(new Event('blur'));
	}
</script>

<div id="experience">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Employment History</h3> -->
	</div>
	{#each experience.data as exp, index}
		<Accordion rounded="rounded-none">
			<AccordionItem open>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">
					<div class="flex flex-row">
						<div class="basis-1/5">
							<h4 class="font-bold tracking-wider">
								{exp.job_title ? exp.job_title : '(Not Specified)'}
							</h4>
							<h5 class="text-sm tracking-wider">
								{exp.start_date || '(Start Date)'} - {exp.current_status
									? 'Present'
									: exp.end_date || '(End Date)'}
							</h5>
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
							<h5 class="text-sm tracking-wider">Job Title*</h5>
							<input
								name="job_title"
								id={`job_title-${index}`}
								bind:value={exp.job_title}
								on:input={(event) => {
									updateExperienceDetails('job_title', exp.job_title, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`expJobTitleError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`expJobTitleError-${index}`}></span>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Employer*</h5>
							<input
								name="employer"
								id={`employer-${index}`}
								bind:value={exp.employer}
								on:input={(event) => {
									updateExperienceDetails('employer', exp.employer, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`expEmployerError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`expEmployerError-${index}`}></span>
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-4 md:gap-10">
						<label class="label col-span-2">
							<h5 class="text-sm tracking-wider">Start Date*</h5>
							<!-- <DatePicker
								bind:date={startDate}
								id={`expStartDate-${index}`}
								on:dateChange={updateExperienceDetails('start_date', startDate, index)}
							/> -->
							<input
								name="expStartDate"
								id={`expStartDate-${index}`}
								bind:value={exp.start_date}
								on:input={(event) => {
									updateExperienceDetails('start_date', exp.start_date, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required', 'date']"
								data-error={`expStartDateError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="dd-mm-yyyy"
							/>
							<span class="error-msg text-xs" id={`expStartDateError-${index}`}></span>
						</label>
						<label class="label" class:disabled={exp.current_status}>
							<h5 class="text-sm tracking-wider">End Date*</h5>
							<!-- <DatePicker
								bind:date={endDate}
								id={`expEndDate-${index}`}
								on:dateChange={updateExperienceDetails('end_date', endDate, index)}
							/> -->
							<input
								name="expEndDate"
								id={`expEndDate-${index}`}
								bind:value={exp.end_date}
								on:input={(event) => {
									updateExperienceDetails('end_date', exp.end_date, index);
									validateInput(event, exp.start_date);
								}}
								on:blur={validateInput(event, exp.start_date)}
								data-rule={!exp.current_status ? "['required', 'date', 'compare']" : '[]'}
								data-error={`expEndDateError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="dd-mm-yyyy"
							/>
							<span class="error-msg text-xs" id={`expEndDateError-${index}`}></span>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Working Status</h5>
							<!-- <select
								name="current_status"
								id={`current_status-${index}`}
								bind:value={exp.current_status}
								class="select rounded-sm border-0 border-s-4 tracking-wider"
								on:change={() => {
									if (exp.current_status) removeDateValidation(index);
								}}
							>
								<option value={false}>Select</option>
								<option value={true}>Working</option>
							</select> -->
							<label class="flex items-center space-x-2">
								<input
									class="checkbox mt-2"
									type="checkbox"
									bind:checked={exp.current_status}
									on:change={() => {
										if (exp.current_status) toggleWorkingStatus(index);
									}}
								/>
							</label>
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">City*</h5>
							<input
								name="city"
								id={`city-${index}`}
								bind:value={exp.city}
								on:input={(event) => {
									updateExperienceDetails('city', exp.city, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`expCityError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`expCityError-${index}`}></span>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Country*</h5>
							<input
								name="country"
								id={`country-${index}`}
								bind:value={exp.country}
								on:input={(event) => {
									updateExperienceDetails('country', exp.country, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`expCountryError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`expCountryError-${index}`}></span>
						</label>
					</div>
					<label class="label">
						<span class="text-sm tracking-wider">Description</span>
						<textarea
							name="description"
							id={`description-${index}`}
							bind:value={exp.description}
							on:input={() => {
								updateExperienceDetails('description', exp.description, index);
							}}
							class="textarea rounded-sm border-0 border-s-4 tracking-wider"
							rows="4"
							placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
						/>
						{#if fieldError?.[index]?.description}<p id="errorContainer" class="error">
								{fieldError?.[index]?.description}
							</p>{/if}
					</label>
					<div class="space-y-2">
						<label class="flex items-center space-x-2">
							<input class="checkbox" type="checkbox" bind:checked={exp.is_active} />
							<p>Section Active</p>
						</label>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{/each}
	<div class="pt-3">
		<button type="button" class="variant-filled btn btn-sm" on:click={add}
			>+ Add one more experience</button
		>
	</div>
</div>

<style>
	.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
