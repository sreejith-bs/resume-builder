<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Title from '../../components/Form/Title.svelte';

	export let education = {
		education_heading: '',
		data: [
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
	]};

	function add() {
		education.data = education.data.concat({
			course: '',
			institution: '',
			start_date: '',
			end_date: '',
			city: '',
			country: '',
			description: '',
			current_status: false,
			is_active: true
		});
	}
	function remove(index = 0) {
		education.data = education.data.filter((edu, deleteIndex) => index !== deleteIndex);
	}

	let defaultTitle = 'Education';
	let title = education.education_heading ? education.education_heading : defaultTitle;
	$: {
		education.education_heading = title;
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
							<h5 class="text-sm tracking-wider">{edu.start_date} - {edu.end_date}</h5>
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
								name="course"
								id="course"
								bind:value={edu.course}
								class="input tracking-wider rounded-sm border-0 border-s-4"
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
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
					<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
						<label class="label">
							<h5 class="text-sm tracking-wider">Start Date</h5>
							<input
								name="start_date"
								id="start_date"
								bind:value={edu.start_date}
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">End Date</h5>
							<input
								name="end_date"
								id="end_date"
								bind:value={edu.end_date}
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
					<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-3">
						<label class="label">
							<h5 class="text-sm tracking-wider">City</h5>
							<input
								name="city"
								id="city"
								bind:value={edu.city}
								class="input tracking-wider rounded-sm border-0 border-s-4"
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
								class="input tracking-wider rounded-sm border-0 border-s-4"
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
							class="textarea tracking-wider rounded-sm border-0 border-s-4"
							rows="4"
							placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
						/>
					</label>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{/each}
	<div class="pt-3">
		<button type="button" class="btn btn-sm variant-filled" on:click={add}
			>+ Add one more education</button
		>
	</div>
</div>
