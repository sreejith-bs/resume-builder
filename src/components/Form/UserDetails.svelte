<script>
	import { Avatar } from '@skeletonlabs/skeleton';
	import Title from '../../components/Form/Title.svelte';
	import { userDetailsData, addressData } from '../../store/store.js';
	import { errors, imageData } from '../../store/store.js';
	import { validateForm, customValidation } from '$lib/validation/validation.js';

	let userDetails = $userDetailsData;
	let addressDetails = $addressData;
	let defaultTitle = 'Personal Details';
	let title = userDetails.user_details_heading ? userDetails.user_details_heading : defaultTitle;
	let fieldError = $errors;
	let localImage;
	$: {
		// userDetails.user_details_heading = title;
		userDetailsData.update((data) => ({
			...data,
			user_details_heading: title
		}));
		fieldError = $errors;
		userDetails = $userDetailsData;
		addressDetails = $addressData;
	}
	const updateUserDetails = (field, value, dataType) => {
		if (dataType === 'user')
			userDetailsData.update((data) => ({
				...data,
				[field]: value
			}));
		else
			addressData.update((data) => ({
				...data,
				[field]: value
			}));
	};
	function handleFileInputChange(event) {
		const file = event.target.files[0];

		if (file) {
			const reader = new FileReader();

			// Read the file as a data URL
			reader.readAsDataURL(file);

			// Handle the onload event when reading is complete
			reader.onload = () => {
				// Update the image data store with the data URL
				imageData.set(reader.result);
				localImage = reader.result;
			};
		}
	}
	function validateInput(event) {
		const inputElement = event.target;
		const rule = JSON.parse(inputElement.dataset.rule.replace(/'/g, '"'));

		customValidation.validate(inputElement, rule);
	}
</script>

<div id="personal-details">
	<div class="py-4">
		<!-- <h3 class="h3">Personal Details</h3> -->
		<Title bind:title />
	</div>
	<div class="grid grid-cols-4 gap-10">
		<label for="job_title" class="label col-span-2">
			<h5 class="text-sm tracking-wider">Wanted Job Title*</h5>
			<input
				name="job_title"
				id="job_title"
				bind:value={userDetails.job_title}
				on:input={(event) => {
					updateUserDetails('job_title', userDetails.job_title, 'user');
					validateInput(event);
				}}
				on:blur={validateInput}
				data-rule="['required']"
				data-error="jobTitleError"
				class="input rounded-sm border-0 border-s-4 tracking-wider"
				type="text"
				placeholder="e.g. Software Engineer"
			/>
			<span class="error-msg text-xs" id="jobTitleError"></span>
		</label>
		<label for="profile_image" class="label">
			<h5 class="text-sm tracking-wider">Upload Your Image</h5>
			<div class="flex items-center gap-4">
				<input class="input" type="file" accept="image/*" on:change={handleFileInputChange} />
			</div>
		</label>
		{#if localImage}
			<img src={$imageData} alt="Uploaded Image" class="w-20" />
		{:else}
			<img
				src="../../../../Profile-avatar.png"
				alt="image of resume building peopele"
				class="w-20"
			/>
		{/if}

		<!-- <Avatar
			src="https://images.unsplash.com/photo-1617296538902-887900d9b592?ixid=M3w0Njc5ODF8MHwxfGFsbHx8fHx8fHx8fDE2ODc5NzExMDB8&ixlib=rb-4.0.3&w=128&h=128&auto=format&fit=crop"
			width="w-20"
			rounded="rounded-none"
		/> -->
	</div>
	<div class="grid gap-4 md:grid-cols-2 md:gap-10 md:py-3">
		<label class="label">
			<h5 class="text-sm tracking-wider">First Name*</h5>
			<input
				name="first_name"
				id="first_name"
				bind:value={userDetails.first_name}
				on:input={(event) => {
					updateUserDetails('first_name', userDetails.first_name, 'user');
					validateInput(event);
				}}
				on:blur={validateInput}
				data-rule="['required']"
				data-error="firstNameError"
				class="input rounded-sm border-0 border-s-4 tracking-wider"
				type="text"
				placeholder="..."
			/>
			<span class="error-msg text-xs" id="firstNameError"></span>
		</label>
		<label class="label">
			<h5 class="text-sm tracking-wider">Last Name*</h5>
			<input
				name="last_name"
				id="last_name"
				bind:value={userDetails.last_name}
				on:input={(event) => {
					updateUserDetails('last_name', userDetails.last_name, 'user');
					validateInput(event);
				}}
				on:blur={validateInput}
				data-rule="['required']"
				data-error="lastNameError"
				class="input rounded-sm border-0 border-s-4 tracking-wider"
				type="text"
				placeholder="..."
			/>
			<span class="error-msg text-xs" id="lastNameError"></span>
		</label>
	</div>
	<div class="grid gap-4 pt-5 md:grid-cols-2 md:gap-10 md:py-3">
		<label class="label">
			<h5 class="text-sm tracking-wider">Email*</h5>
			<input
				name="email"
				id="email"
				bind:value={userDetails.email}
				on:input={(event) => {
					updateUserDetails('email', userDetails.email, 'user');
					validateInput(event);
				}}
				on:blur={validateInput}
				data-rule="['required', 'email']"
				data-error="emailError"
				class="input rounded-sm border-0 border-s-4 tracking-wider"
				type="text"
				placeholder="..."
			/>
			<span class="error-msg text-xs" id="emailError"></span>
		</label>
		<label class="label">
			<h5 class="text-sm tracking-wider">Phone*</h5>
			<input
				name="phone"
				id="phone"
				bind:value={userDetails.phone}
				on:input={(event) => {
					updateUserDetails('phone', userDetails.phone, 'user');
					validateInput(event);
				}}
				on:blur={validateInput}
				data-rule="['required', 'phone']"
				data-error="phoneError"
				class="input rounded-sm border-0 border-s-4 tracking-wider"
				type="text"
				placeholder="..."
			/>
			<span class="error-msg text-xs" id="phoneError"></span>
		</label>
	</div>
	<div class="grid gap-4 pt-5 md:grid-cols-2 md:gap-10 md:py-3">
		<label class="label">
			<h5 class="text-sm tracking-wider">Country*</h5>
			<input
				name="country"
				id="country"
				bind:value={addressDetails.country}
				on:input={(event) => {
					updateUserDetails('country', addressDetails.country, 'address');
					validateInput(event);
				}}
				on:blur={validateInput}
				data-rule="['required']"
				data-error="countryError"
				class="input rounded-sm border-0 border-s-4 tracking-wider"
				type="text"
				placeholder="..."
			/>
			<span class="error-msg text-xs" id="countryError"></span>
		</label>
		<label class="label">
			<h5 class="text-sm tracking-wider">City*</h5>
			<input
				name="city"
				id="city"
				bind:value={addressDetails.city}
				on:input={(event) => {
					updateUserDetails('city', addressDetails.city, 'address');
					validateInput(event);
				}}
				on:blur={validateInput}
				data-rule="['required']"
				data-error="cityError"
				class="input rounded-sm border-0 border-s-4 tracking-wider"
				type="text"
				placeholder="..."
			/>
			<span class="error-msg text-xs" id="cityError"></span>
		</label>
	</div>
</div>
