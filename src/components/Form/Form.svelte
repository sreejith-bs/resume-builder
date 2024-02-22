<script>
	import UserDetails from './UserDetails.svelte';
	import Address from './Address.svelte';
	import Profile from './Profile.svelte';
	import Experience from './Experience.svelte';
	import Education from './Education.svelte';
	import Certificate from './Certificate.svelte';
	import Socialmedia from './Socialmedia.svelte';
	import Skills from './Skills.svelte';
	import Language from './Language.svelte';
	import Hobbies from './Hobbies.svelte';
	import { form } from '../../store/store.js';
	import { errors } from '../../store/store.js';
	import { validateField } from '$lib/validation/validation.js';
	import { validationRules } from '$lib/validation/validationRules.js';

	export let theme;
	let errorDetails;
	const submitForm = async () => {
		// console.log('$form', JSON.stringify($form));
		const inputFields = document.querySelectorAll('input');
		// console.log('inputFields', inputFields);
		inputFields.forEach((input) => {
			input.dispatchEvent(new Event('blur'));
		});
		// const accordionItems = document.querySelectorAll('.accordion-item');
		// // console.log('accordionItems', accordionItems);
		// accordionItems.forEach((item) => {
		// 	const inputFields = item.querySelectorAll('input');
		// 	// console.log('accordionItems-inputs', inputFields);
		// 	inputFields.forEach((input) => {
		// 		input.blur();
		// 		// input.dispatchEvent(new Event('blur'));
		// 	});
		// });

		errorDetails = validateField($form, validationRules);
		errors.update((data) => {
			// console.log('y-data', data, 'y-errorDetails', errorDetails);
			let y = { ...data, ...errorDetails };
			return y
		});
		if (Object.keys(errors).length === 0) {
			// No errors, submit the form
			console.log('Form submitted successfully!');
		} else {
			// Errors found, do not submit the form
			console.log('Form contains errors. Please correct them before submitting.');
		}
	};
</script>

<div class="container mx-auto w-4/5 justify-center py-20">
	<form on:submit|preventDefault={submitForm}>
		<UserDetails />
		<Address />
		<Profile />
		<Experience />
		<Education />
		<Certificate />
		<Socialmedia />
		<Skills />
		<Language />
		<Hobbies />
		<div class="flex justify-center pt-10">
			<button type="submit" class="variant-filled btn">Submit</button>
		</div>
	</form>
</div>

<style>
	:global(.error) {
		font-size: 14px;
		color: red;
		margin-top: 0px;
	}
</style>
