<script>
	import Title from '../../components/Form/Title.svelte';
	import { hobbiesData } from '../../store/store.js';
	import { errors } from '../../store/store.js';
	import { validateForm, customValidation } from '$lib/validation/validation.js';

	let hobbies = $hobbiesData;

	let defaultTitle = 'Hobbies';
	let title = hobbies.hobbies_heading ? hobbies.hobbies_heading : defaultTitle;
	let fieldError = $errors.hobbies;
	$: {
		// hobbies.hobbies_heading = title;
		hobbiesData.update((data) => ({
			...data,
			hobbies_heading: title
		}));
		fieldError = $errors.hobbies;
		hobbies = $hobbiesData;
	}

	const updateHobbiesDetails = (field, value) => {
		hobbiesData.update((data) => ({
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

<div id="hobbies">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Hobbies</h3> -->
	</div>
	<label class="label">
		<span class="text-sm tracking-wider">What do you like?*</span>
		<textarea
			name="hobbies"
			id="hobbies"
			bind:value={hobbies.label}
			on:input={(event) => {
				updateHobbiesDetails('label', hobbies.label);
				validateInput(event);
			}}
			on:blur={validateInput}
			data-rule="['required']"
			data-error="hobbiesError"
			class="textarea rounded-sm border-0 border-s-4 tracking-wider"
			rows="4"
			placeholder="e.g. Drawing, Cricket, Reading"
		/>
		<span class="error-msg text-xs" id="hobbiesError"></span>
	</label>
	<div class="space-y-2">
		<label class="flex items-center space-x-2">
			<input
				class="checkbox"
				type="checkbox"
				on:change={() => updateHobbiesDetails('is_active', !hobbies.is_active, 'hobbies')}
				checked={hobbies.is_active}
			/>
			<p>Section Active</p>
		</label>
	</div>
</div>
