<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { educationData } from '../../store/store.js';
	import Title from '../../components/Form/Title.svelte';
	import DatePicker from '../DatePicker.svelte';

	let education = $educationData;
	let startDate = new Date();
	let endDate = new Date();

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
			education_heading: title
		}));
		education = $educationData;
	}

	const updateEducationDetails = (field, value, index = 0) => {
		console.log('value', value);
		educationData.update((data) => {
			data.data[index][field] = value;
			return data;
		});
	};

	function formatDate(date) {
		return new Date(date).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		});
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
								{formatDate(startDate)} - {formatDate(endDate)}
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
								id="course"
								bind:value={edu.course}
								on:input={() => updateEducationDetails('course', edu.course, index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Institution</h5>
							<input
								name="institution"
								id="institution"
								bind:value={edu.institution}
								on:input={() => updateEducationDetails('institution', edu.institution, index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">Start Date</h5>
							<DatePicker
								bind:date={startDate}
								id="eduStartDate"
								on:dateChange={updateEducationDetails('start_date', startDate, index)}
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">End Date</h5>
							<DatePicker
								bind:date={endDate}
								id="eduEndDate"
								on:dateChange={updateEducationDetails('end_date', endDate, index)}
							/>
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">City</h5>
							<input
								name="city"
								id="city"
								bind:value={edu.city}
								on:input={() => updateEducationDetails('city', edu.city, index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Country</h5>
							<input
								name="country"
								id="country"
								bind:value={edu.country}
								on:input={() => updateEducationDetails('country', edu.country, index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
					<label class="label">
						<span class="text-sm tracking-wider">Description</span>
						<textarea
							name="description"
							id="description"
							bind:value={edu.description}
							on:input={() => updateEducationDetails('description', edu.description, index)}
							class="textarea rounded-sm border-0 border-s-4 tracking-wider"
							rows="4"
							placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
						/>
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
