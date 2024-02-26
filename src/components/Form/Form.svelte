<script>
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount, onDestroy } from 'svelte';
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
	import { updateResumeDetails } from '../../store/store';
	import { validateField } from '$lib/validation/validation.js';
	import { validationRules } from '$lib/validation/validationRules.js';
	import { resumeDetails } from '../../store/store';
	import {
		userDetailsData,
		addressData,
		profileData,
		experienceData,
		educationData,
		certificateData,
		socialMediaData,
		skillsData,
		languageData,
		hobbiesData,
		form,
		errors
	} from '../../store/store.js';

	const modalStore = getModalStore();
	export let theme;
	export let id;

	let resume_details = {};
	// let resume_id;
	let errorDetails;
	let buttonText = 'Back';
	let submitButton = 'Submit';
	let baseUrl = '/landing-page/preview/';
	let previewUrl;

	// const unsubscribe = resumeDetails.subscribe((value) => {
	// 	resume_details = value;
	// 	resume_id = value.id;
	// 	console.log('unsubscribe_resume_details', resume_details);
	// });

	onMount(() => {
		// unsubscribe;
		if (id) {
			getResume(id, 'onMount');
			submitButton = 'save';
		}
	});
	// onDestroy(unsubscribe);
	// $: {
	// 	if (resume_id) {
	// 		// console.log('resume_details');
	// 		submitButton = 'save';
	// 		updateResume(resume_details);
	// 	}
	// }
	function updateResume(resumeData) {
		console.log('updateResume-checking', resumeData);
		userDetailsData.update((data) => ({
			...data,
			theme: resumeData?.theme || '',
			user_details_heading: resumeData.user_details_heading,
			job_title: resumeData.job_title,
			first_name: resumeData.first_name,
			last_name: resumeData.last_name,
			email: resumeData.email,
			phone: resumeData.phone,
			date_of_birth: resumeData.date_of_birth
		}));
		addressData.update((data) => ({
			...data,
			...resumeData.address
		}));
		profileData.update((data) => ({
			...data,
			profile_heading: resumeData.profile_heading,
			profile_description: resumeData.profile_description
		}));
		experienceData.update((data) => ({
			...data,
			experience_heading: resumeData.experience_heading,
			data: resumeData.experience
		}));
		educationData.update((data) => ({
			...data,
			education_heading: resumeData.education_heading,
			data: resumeData.education
		}));
		certificateData.update((data) => ({
			...data,
			certificate_heading: resumeData.certificate_heading,
			data: resumeData.certificate
		}));
		socialMediaData.update((data) => ({
			...data,
			social_media_heading: resumeData.social_media_heading,
			data: resumeData.social_media
		}));
		skillsData.update((data) => ({
			...data,
			skills_heading: resumeData.skills_heading,
			data: resumeData.skills
		}));
		languageData.update((data) => ({
			...data,
			language_heading: resumeData.language_heading,
			data: resumeData.language
		}));
		hobbiesData.update((data) => ({
			...data,
			hobbies_heading: resumeData.hobbies_heading,
			...resumeData.hobbies
		}));
	}
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
		let formData = $form;
		formData.theme = theme;
		errorDetails = validateField($form, validationRules);
		errors.update((data) => {
			return { ...data, ...errorDetails };
		});
		console.log('formData', $form, 'id', !id);
		if (Object.keys($errors).length === 0) {
			// No errors, submit the form
			// console.log('form', $form);
			if (!id) {
				console.log('formdata-id', formData.id);
				const response = await fetch('/api', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(formData)
				})
					.then((response) => {
						if (response.ok) {
							buttonText = 'Preview Resume';
							alertMessage('Saved', 'Successfully Saved');
							return response.json();
						} else {
							alertMessage('error', 'Oops, something went wrong');
						}
					})
					.then((data) => {
						console.log('response-Data', data);
						if (data) {
							formData.id = data[0].id;
							id= data[0].id;
							// updateUserDetails(data[0].id);
							getResume(data[0].id);
							submitButton = 'Save';
						}
					})
					.catch((error) => {
						console.error('Error', error);
					});
			} else {
				console.log('put is working***********');
				const response = await fetch(`/api/${id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},

					body: JSON.stringify(resume_details)
				})
					.then((response) => {
						if (response.ok) {
							submitButton = 'Save';
							alertMessage('Saved', 'Successfully Saved');
							return response.json();
						} else {
							alertMessage('error', 'Oops, something went wrong');
						}
					})
					.then((data) => {
						console.log('response-Data', data);
					})
					.catch((error) => {
						console.error('Error', error);
					});
			}
		} else {
			// Errors found, do not submit the form
			console.log('Form contains errors. Please correct them before submitting.');
		}
	};
	const getResume = async (resumeId, execute = '') => {
		// loading = true;
		const response = await fetch(`/api/${resumeId}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' }
		})
			.then((response) => {
				if (response.ok) {
					// loading = false;
					return response.json();
				} else {
					alertMessage('error', 'Oops, something went wrong');
				}
			})
			.then((data) => {
				resume_details = data.data.event?.responseBody;
				updateResumeDetails(resume_details);
				if (execute === 'onMount') updateResume(resume_details);
				previewUrl = `${baseUrl}${resume_details.theme}`;
				console.log('resume_details', resume_details, 'previewUrl', previewUrl);
			})
			.catch((error) => {
				loading = false;
				console.error('Error', error);
			});
	};
	// const updateUserDetails = (id) => {
	// 	userDetailsData.update((data) => ({
	// 		...data,
	// 		id
	// 	}));
	// };
	function alertMessage(head, message) {
		const modal = {
			type: 'alert',
			title: head,
			body: message
		};
		modalStore.trigger(modal);
	}
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
		<div class="flex gap-4 pt-10">
			<button type="submit" class="variant-filled btn">{submitButton}</button>
			<!-- <a href="/landing-page/list"
				><button type="button" class="variant-filled btn">{buttonText}</button></a
			> -->
			{#if resume_details.id}
				<a href={previewUrl} class="variant-filled btn">Preview Resume</a>
			{/if}
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
