<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { educationData } from '../../store/store.js';
	import Title from '../../components/Form/Title.svelte';
	import DatePicker from '../DatePicker.svelte';
	import { errors } from '../../store/store.js';
	import { validateForm, customValidation } from '$lib/validation/validation.js';
	import { formatDate } from '$lib/utils.js';
	import exp from 'constants';

	let education = $educationData;
	let eduStartDate;
	let eduEndDate;
	let fieldError = $errors.education;

	function add() {
		// education.data = education.data.concat({
		// 	course: '',
		// 	institution: '',
		// 	start_date: '',
		// 	end_date: '',
		// 	city: '',
		// 	country: '',
		// 	description: '',
		// 	current_status: false,
		// 	is_active: true
		// });
		educationData.update((data) => ({
			...data,
			data: [
				...data.data,
				{
					course: '',
					institution: '',
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
		// education.data = education.data.filter((edu, deleteIndex) => index !== deleteIndex);
		educationData.update((data) => ({
			...data,
			data: data.data.filter((item, i) => i !== index)
		}));
	}

	let defaultTitle = 'Education';
	let title = education.education_heading ? education.education_heading : defaultTitle;

	$: {
		// education.education_heading = title;
		educationData.update((data) => ({
			...data,
			education_heading: title
			// start_date: eduStartDate,
			// end_date: eduEndDate
		}));
		education = $educationData;
		fieldError = $errors.education;
	}

	const updateEducationDetails = (field, value, index = 0) => {
		educationData.update((data) => {
			data.data[index][field] = value;
			return data;
		});
	};

	function validateInput(event, date = '') {
		const inputElement = event.target;
		const rule = JSON.parse(inputElement.dataset.rule.replace(/'/g, '"'));

		customValidation.validate(inputElement, rule, date);
	}
	function removeDateValidation(index) {
		const endDateElement = document.getElementById(`eduEndDate-${index}`);
		endDateElement.value = '';
		endDateElement.dispatchEvent(new Event('blur'));
	}
</script>

<div id="education">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Education</h3> -->
	</div>
	{#each education.data as edu, index}
		<Accordion rounded="rounded-none">
			<AccordionItem open>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">
					<div class="flex flex-row">
						<div class="basis-1/5">
							<h4 class="font-bold tracking-wider">
								{edu.course ? edu.course : '(Not Specified)'}
							</h4>
							<h5 class="text-sm tracking-wider">
								{edu.start_date || '(Start Date)'} - {edu.current_status
									? 'Present'
									: edu.end_date || '(End Date)'}
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
							<h5 class="text-sm tracking-wider">Course*</h5>
							<input
								name="course"
								id={`course-${index}`}
								bind:value={edu.course}
								on:input={(event) => {
									updateEducationDetails('course', edu.course, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`eCourceError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`eCourceError-${index}`}></span>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Institution/University*</h5>
							<input
								name="institution"
								id={`institution-${index}`}
								bind:value={edu.institution}
								on:input={(event) => {
									updateEducationDetails('institution', edu.institution, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`institutionError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`institutionError-${index}`}></span>
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-4 md:gap-10">
						<label class="label col-span-2">
							<h5 class="text-sm tracking-wider">Start Date*</h5>
							<!-- <DatePicker
								bind:date={eduStartDate}
								id={`eduStartDate-${index}`}
								on:dateChange={(event) => {
									updateEducationDetails('start_date', eduStartDate, index);
									validateInput(event);
								}}
							/> -->
							<input
								name="eduStartDate"
								id={`eduStartDate-${index}`}
								bind:value={edu.start_date}
								on:input={(event) => {
									updateEducationDetails('start_date', edu.start_date, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required', 'date']"
								data-error={`eduStartDateError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="dd-mm-yyyy"
							/>
							<span class="error-msg text-xs" id={`eduStartDateError-${index}`}></span>
						</label>
						<label class="label" class:disabled={edu.current_status}>
							<h5 class="text-sm tracking-wider">End Date*</h5>
							<!-- <DatePicker
								bind:date={eduEndDate}
								id={`eduEndDate-${index}`}
								on:dateChange={(event) => {
									updateEducationDetails('end_date', eduEndDate, index);
									validateInput(event);
								}}
							/> -->
							<input
								name="eduEndDate"
								id={`eduEndDate-${index}`}
								bind:value={edu.end_date}
								on:input={(event) => {
									updateEducationDetails('end_date', edu.end_date, index);
									validateInput(event, edu.start_date);
								}}
								on:blur={validateInput(event, edu.start_date)}
								data-rule={!edu.current_status ? "['required', 'date', 'compare']" : '[]'}
								data-error={`eduEndDateError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="dd-mm-yyyy"
							/>
							<span class="error-msg text-xs" id={`eduEndDateError-${index}`}></span>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Current Status</h5>
							<select
								name="current_status"
								id={`current_status-${index}`}
								bind:value={edu.current_status}
								class="select rounded-sm border-0 border-s-4 tracking-wider"
								on:change={() => {
									if (edu.current_status) removeDateValidation(index);
								}}
							>
								<option value={false}>Completed</option>
								<option value={true}>On Going</option>
							</select>
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">City*</h5>
							<input
								name="city"
								id={`city-${index}`}
								bind:value={edu.city}
								on:input={(event) => {
									updateEducationDetails('city', edu.city, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`eduCityError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`eduCityError-${index}`}></span>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Country*</h5>
							<input
								name="country"
								id={`country-${index}`}
								bind:value={edu.country}
								on:input={(event) => {
									updateEducationDetails('country', edu.country, index);
									validateInput(event);
								}}
								on:blur={validateInput}
								data-rule="['required']"
								data-error={`eduCountryError-${index}`}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							<span class="error-msg text-xs" id={`eduCountryError-${index}`}></span>
						</label>
					</div>
					<label class="label">
						<span class="text-sm tracking-wider">Description</span>
						<textarea
							name="description"
							id={`description-${index}`}
							bind:value={edu.description}
							on:input={(event) => {
								updateEducationDetails('description', edu.description, index);
							}}
							class="textarea rounded-sm border-0 border-s-4 tracking-wider"
							rows="4"
							placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
						/>
					</label>
					<div class="space-y-2">
						<label class="flex items-center space-x-2">
							<input
								class="checkbox"
								type="checkbox"
								on:change={() => updateEducationDetails('is_active', !edu.is_active, index)}
								checked={edu.is_active}
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
			>+ Add one more education</button
		>
	</div>
</div>

<style>
	.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
