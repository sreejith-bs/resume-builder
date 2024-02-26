<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { educationData } from '../../store/store.js';
	import Title from '../../components/Form/Title.svelte';
	import DatePicker from '../DatePicker.svelte';
	import { errors } from '../../store/store.js';
	import { validateForm } from '$lib/validation/validation.js';
	import { formatDate } from '$lib/utils.js';

	let education = $educationData;
	let eduStartDate = new Date();
	let eduEndDate = new Date();
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
			data: [...data.data, {}] // Add a new empty object to the array
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
			education_heading: title,
			start_date: eduStartDate,
			end_date: eduEndDate
		}));
		education = $educationData;
		fieldError = $errors.education;
	}

	const updateEducationDetails = (field, value, index = 0) => {
		console.log('value', value);
		educationData.update((data) => {
			data.data[index][field] = value;
			return data;
		});
	};
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
								{formatDate(eduStartDate)} - {formatDate(eduEndDate)}
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
							<h5 class="text-sm tracking-wider">Course</h5>
							<input
								name="course"
								id={`course-${index}`}
								bind:value={edu.course}
								on:input={() => updateEducationDetails('course', edu.course, index)}
								on:blur={validateForm('course', edu.course, 'education', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.course}<p class="error">{fieldError?.[index]?.course}</p>{/if}
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Institution</h5>
							<input
								name="institution"
								id={`institution-${index}`}
								bind:value={edu.institution}
								on:input={() => updateEducationDetails('institution', edu.institution, index)}
								on:blur={validateForm('institution', edu.institution, 'education', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.institution}<p class="error">{fieldError?.[index]?.institution}</p>{/if}
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">Start Date</h5>
							<DatePicker
								bind:date={eduStartDate}
								id={`eduStartDate-${index}`}
								on:dateChange={updateEducationDetails('start_date', eduStartDate, index)}
							/>
							{#if fieldError?.[index]?.start_date}<p class="error">{fieldError?.[index]?.start_date}</p>{/if}
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">End Date</h5>
							<DatePicker
								bind:date={eduEndDate}
								id={`eduEndDate-${index}`}
								on:dateChange={updateEducationDetails('end_date', eduEndDate, index)}
							/>
							{#if fieldError?.[index]?.end_date}<p class="error">{fieldError?.[index]?.end_date}</p>{/if}
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">City</h5>
							<input
								name="city"
								id={`city-${index}`}
								bind:value={edu.city}
								on:input={() => updateEducationDetails('city', edu.city, index)}
								on:blur={validateForm('city', edu.city, 'education', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.city}<p class="error">{fieldError?.[index]?.city}</p>{/if}
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Country</h5>
							<input
								name="country"
								id={`country-${index}`}
								bind:value={edu.country}
								on:input={() => updateEducationDetails('country', edu.country, index)}
								on:blur={validateForm('country', edu.country, 'education', 'array', index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
							{#if fieldError?.[index]?.country}<p class="error">{fieldError?.[index]?.country}</p>{/if}
						</label>
					</div>
					<label class="label">
						<span class="text-sm tracking-wider">Description</span>
						<textarea
							name="description"
							id={`description-${index}`}
							bind:value={edu.description}
							on:input={() => updateEducationDetails('description', edu.description, index)}
							on:blur={validateForm('description', edu.description, 'education', 'array', index)}
							class="textarea rounded-sm border-0 border-s-4 tracking-wider"
							rows="4"
							placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
						/>
						{#if fieldError?.[index]?.description}<p class="error">{fieldError?.[index]?.description}</p>{/if}
					</label>
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
