<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import { experienceData } from '../../store/store.js';
	import Title from '../../components/Form/Title.svelte';
	import DatePicker from '../DatePicker.svelte';

	let experience = $experienceData;
	let startDate = new Date();
	let endDate = new Date();

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
			data: [...data.data, {}] // Add a new empty object to the array
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
		}));
		experience = $experienceData;
	}

	const updateExperienceDetails = (field, value, index = 0) => {
		experienceData.update((data) => {
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
							<h5 class="text-sm tracking-wider">Job Title</h5>
							<input
								name="job_title"
								id="job_title"
								bind:value={exp.job_title}
								on:input={() => updateExperienceDetails('job_title', exp.job_title, index)}
								class="input rounded-sm border-0 border-s-4 tracking-wider"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Employer</h5>
							<input
								name="employer"
								id="employer"
								bind:value={exp.employer}
								on:input={() => updateExperienceDetails('employer', exp.employer, index)}
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
								id="expStartDate"
								on:dateChange={updateExperienceDetails('start_date', startDate, index)}
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">End Date</h5>
							<DatePicker
								bind:date={endDate}
								id="expEndDate"
								on:dateChange={updateExperienceDetails('end_date', endDate, index)}
							/>
						</label>
					</div>
					<div class="grid gap-4 pt-3 md:grid-cols-2 md:gap-10">
						<label class="label">
							<h5 class="text-sm tracking-wider">City</h5>
							<input
								name="city"
								id="city"
								bind:value={exp.city}
								on:input={() => updateExperienceDetails('city', exp.city, index)}
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
								bind:value={exp.country}
								on:input={() => updateExperienceDetails('country', exp.country, index)}
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
							bind:value={exp.description}
							on:input={() => updateExperienceDetails('description', exp.description, index)}
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
			>+ Add one more experience</button
		>
	</div>
</div>
