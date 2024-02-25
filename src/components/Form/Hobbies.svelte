<script>
	import Title from '../../components/Form/Title.svelte';
	import { hobbiesData } from '../../store/store.js';
	import { errors } from '../../store/store.js';
	import { validateForm } from '$lib/validation/validation.js';

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
		console.log('value---', value)
		hobbiesData.update((data) => ({
			...data,
			[field]: value
		}));
	};
</script>

<div id="hobbies">
	<div class="pt-4">
		<Title bind:title />
		<!-- <h3 class="h3">Hobbies</h3> -->
	</div>
	<label class="label">
		<span class="text-sm tracking-wider">What do you like?</span>
		<textarea
			name="hobbies"
			id="hobbies"
			bind:value={hobbies.label}
			on:input={() => updateHobbiesDetails('label', hobbies.label)}
			on:blur={validateForm('label', hobbies.label, 'hobbies', 'nested')}
			class="textarea rounded-sm border-0 border-s-4 tracking-wider"
			rows="4"
			placeholder="e.g. Drawing, Cricket, Reading"
		/>
		{#if fieldError?.label}<p class="error">{fieldError?.label}</p>{/if}
	</label>
</div>
