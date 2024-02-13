<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import Title from '../../components/Form/Title.svelte';

	export let userDetails = {
		user_details_heading: '',
		job_title: '',
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		dob: ''
	};

	let defaultTitle = 'Personal Details';
	let title = userDetails.user_details_heading ? userDetails.user_details_heading : defaultTitle;
	$: {
		userDetails.user_details_heading = title;
        console.log('userDetails-2', userDetails)
	}
</script>

<div id="personal-details">
	<div class="py-4">
		<!-- <h3 class="h3">Personal Details</h3> -->
		<Title bind:title />
	</div>
	<div class="grid grid-cols-2 gap-10">
		<label for="job_title" class="label">
			<h5 class="text-sm tracking-wider">Wanted Job Title</h5>
			<input
				name="job_title"
				id="job_title"
				bind:value={userDetails.job_title}
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
				name="first_name"
				id="first_name"
				bind:value={userDetails.first_name}
				class="input tracking-wider rounded-sm border-0 border-s-4"
				type="text"
				placeholder="..."
			/>
		</label>
		<label class="label">
			<h5 class="text-sm tracking-wider">Last Name</h5>
			<input
				name="last_name"
				id="last_name"
				bind:value={userDetails.last_name}
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
