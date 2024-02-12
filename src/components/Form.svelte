<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	export let theme;
</script>

<div class="container justify-center mx-auto pt-20 w-4/5">
	<div id="personal-details">
		<div class="py-4">
			<h3 class="h3">Personal Details</h3>
		</div>
		<div class="grid grid-cols-2 gap-10">
			<label class="label">
				<h5 class="text-sm tracking-wider">Wanted Job Title</h5>
				<input
					class="input tracking-wider rounded-sm border-0 border-s-4"
					type="text"
					placeholder="e.g. Software Engineer"
				/>
			</label>
			<Avatar
				src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
				width="w-20"
				rounded="rounded-none"
			/>
		</div>
		<div class="grid md:grid-cols-2 gap-4 md:gap-10 md:py-3">
			<label class="label">
				<h5 class="text-sm tracking-wider">First Name</h5>
				<input
					class="input tracking-wider rounded-sm border-0 border-s-4"
					type="text"
					placeholder="..."
				/>
			</label>
			<label class="label">
				<h5 class="text-sm tracking-wider">Last Name</h5>
				<input
					class="input tracking-wider rounded-sm border-0 border-s-4"
					type="text"
					placeholder="..."
				/>
			</label>
		</div>
		<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-5 md:py-3">
			<label class="label">
				<h5 class="text-sm tracking-wider">Email</h5>
				<input
					class="input tracking-wider rounded-sm border-0 border-s-4"
					type="text"
					placeholder="..."
				/>
			</label>
			<label class="label">
				<h5 class="text-sm tracking-wider">Phone</h5>
				<input
					class="input tracking-wider rounded-sm border-0 border-s-4"
					type="text"
					placeholder="..."
				/>
			</label>
		</div>
		<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-5 md:py-3">
			<label class="label">
				<h5 class="text-sm tracking-wider">Country</h5>
				<input
					class="input tracking-wider rounded-sm border-0 border-s-4"
					type="text"
					placeholder="..."
				/>
			</label>
			<label class="label">
				<h5 class="text-sm tracking-wider">City</h5>
				<input
					class="input tracking-wider rounded-sm border-0 border-s-4"
					type="text"
					placeholder="..."
				/>
			</label>
		</div>
	</div>
	<div id="address">
		<Accordion rounded="rounded-none" hover="hover:none" padding="padding-0 pt-3">
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary"
					><h4 class="font-bold tracking-wider">Additional details</h4></svelte:fragment
				>
				<svelte:fragment slot="content">
					<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-5 md:py-3">
						<label class="label">
							<h5 class="text-sm tracking-wider">Address</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Postal Code</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
					<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-5 md:py-3">
						<label class="label">
							<h5 class="text-sm tracking-wider">Driving License</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Nationality</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
					<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-5 md:py-3">
						<label class="label">
							<h5 class="text-sm tracking-wider">Place Of Birth</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Date Of Birth</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
	<div id="profile">
		<div class="py-4">
			<h3 class="h3">My Profile</h3>
		</div>
		<label class="label">
			<span class="text-sm tracking-wider"
				>Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience
				& most importantly - your biggest achievements, best qualities and skills.</span
			>
			<textarea
				class="textarea tracking-wider rounded-sm border-0 border-s-4"
				rows="4"
				placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
			/>
		</label>
	</div>
	<div id="experience">
		<div class="py-4">
			<h3 class="h3">Employment History</h3>
		</div>
		<Accordion rounded="rounded-none">
			<AccordionItem>
				<!-- <svelte:fragment slot="lead">(icon)</svelte:fragment> -->
				<svelte:fragment slot="summary">
					<h4 class="font-bold tracking-wider">Front-End Developer</h4>
					<h5 class="text-sm tracking-wider">Jan 2016-Apr 2019</h5>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-5 md:py-3">
						<label class="label">
							<h5 class="text-sm tracking-wider">Job Title</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">Employer</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
                    <div class="grid md:grid-cols-2 gap-4 md:gap-10 pt-5 md:py-3">
						<label class="label">
							<h5 class="text-sm tracking-wider">Start Date</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
						<label class="label">
							<h5 class="text-sm tracking-wider">End Date</h5>
							<input
								class="input tracking-wider rounded-sm border-0 border-s-4"
								type="text"
								placeholder="..."
							/>
						</label>
					</div>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	</div>
</div>
