<script>
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import Title from '../../components/Form/Title.svelte';

	export let experience = {
		experience_heading: '',
		data: [
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
	]};

	function add() {
		experience.data = experience.data.concat({
			job_title: '',
			employer: '',
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
		experience.data = experience.data.filter((exp, deleteIndex) => index !== deleteIndex);
	}
	let defaultTitle = 'Employment History';
	let title = experience.experience_heading ? experience.experience_heading : defaultTitle;
	$: {
		experience.experience_heading = title;
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
							<h4 class="font-bold tracking-wider">{exp.job_title ? exp.job_title : '(Not Specified)'}</h4>
							<h5 class="text-sm tracking-wider">{exp.start_date} - {exp.end_date}</h5>
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
							<h5 class="text-sm tracking-wider">Job Title</h5>
							<input
								name="job_title"
								id="job_title"
								bind:value={exp.job_title}
								class="input tracking-wider rounded-sm border-0 border-s-4"
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
								bind:value={exp.start_date}
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
								bind:value={exp.end_date}
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
								bind:value={exp.city}
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
								bind:value={exp.country}
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
					<label class="label">
						<span class="text-sm tracking-wider">Description</span>
						<textarea
							name="country"
							id="country"
							bind:value={exp.country}
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
			>+ Add one more experience</button
		>
	</div>
</div>
