<script>
	import Title from '../../components/Form/Title.svelte';
	import { profileData } from '../../store/store.js';
	import { errors } from '../../store/store.js';
	import { validateForm, customValidation } from '$lib/validation/validation.js';

	let profile = $profileData;
	let fieldError = $errors;

	let defaultTitle = 'My Profile';
	let title = profile.profile_heading ? profile.profile_heading : defaultTitle;
	$: {
		// profile.profile_heading = title;
		profileData.update((data) => ({
			...data,
			profile_heading: title
		}));
		fieldError = $errors;
		profile = $profileData;
	}
	const updateProfileDetails = (field, value) => {
		profileData.update((data) => ({
			...data,
			[field]: value
		}));
	};
	function validateInput(event) {
		const inputElement = event.target;
		const rule = JSON.parse(inputElement.dataset.rule.replace(/'/g, '"'));

		customValidation.validate(inputElement, rule);
	}
</script>

<div id="profile">
	<div class="py-4">
		<Title bind:title />
		<!-- <h3 class="h3">My Profile</h3> -->
	</div>
	<label class="label">
		<span class="text-sm tracking-wider"
			>Write 2-4 short & energetic sentences to interest the reader! Mention your role, experience &
			most importantly - your biggest achievements, best qualities and skills.*</span
		>
		<textarea
			name="profile_description"
			id="profile_description"
			bind:value={profile.profile_description}
			on:input={(event) => {
				updateProfileDetails('profile_description', profile.profile_description);
				validateInput(event)
			}}
			on:blur={validateInput}
			data-rule="['required']"
			data-error="profileDescriptionError"
			class="textarea rounded-sm border-0 border-s-4 tracking-wider"
			rows="4"
			placeholder="e.g. Driven Front-End Developer with diverse skills seeking opportunity to..."
		/>
		<span class="error-msg text-xs" id="profileDescriptionError"></span>
	</label>
</div>
