<script>
	import { getModalStore } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
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
	import { validateField } from '$lib/validation/validation.js';
	import { validationRules } from '$lib/validation/validationRules.js';
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

	let resumeData = {
		user_details_heading: 'Personal Details',
		profile_heading: 'My Profile',
		experience_heading: 'Employment History',
		education_heading: 'Education',
		certificate_heading: 'Certificate',
		social_media_heading: 'Website & Social Links',
		skills_heading: 'Skills',
		language_heading: 'Language',
		hobbies_heading: 'Hobbies',
		profile_description: 'My Profile',
		job_title: 'Software Engineer',
		first_name: 'Sreejith',
		last_name: 'BS',
		email: 'demo@gmail.com',
		phone: '6252125262',
		dob: '2010-04-18T09:27:00',
		address: {
			address: 'Address',
			postal_code: '625232',
			driving_license: '1234567',
			nationality: 'Indian',
			place_of_birth: 'Kpzha',
			country: 'India',
			city: 'Tvm',
			is_active: true
		},
		hobbies: {
			label: 'Drawing, Reading',
			is_active: true
		},
		experience: [
			{
				job_title: 'Software Engineer',
				employer: 'KritiSoft',
				start_date: '2010-04-18T09:27:00',
				end_date: '2010-04-18T09:27:00',
				city: 'Tvm',
				country: 'India',
				description: 'Description',
				is_active: true,
				current_status: false
			},
			{
				job_title: 'Software Engineer',
				employer: 'Alokin',
				start_date: '2010-04-18T09:27:00',
				end_date: '2010-04-18T09:27:00',
				city: 'Tvm',
				country: 'India',
				description: 'Description',
				is_active: true,
				current_status: true
			}
		],
		education: [
			{
				course: 'SSLC',
				institution: 'BMGHS',
				city: 'Kollam',
				country: 'India',
				description: 'School',
				start_date: '2010-04-18T09:27:00',
				end_date: '2010-04-18T09:27:00',
				is_active: true,
				current_status: false
			}
		],
		certificate: [
			{
				label: 'Web Designing',
				url: 'https://Inet.com',
				is_active: true
			}
		],
		social_media: [
			{
				label: 'Instagram',
				url: 'https://Inet.com',
				is_active: true
			}
		],
		skills: [
			{
				label: 'HTML5',
				rating: 4,
				is_active: true
			}
		],
		language: [
			{
				label: 'Malayalam',
				language: 'Malayalam',
				rating: 5,
				is_active: true
			},
			{
				label: 'English',
				language: 'English',
				rating: 3,
				is_active: true
			}
		]
	};
	export let theme;
	let errorDetails;
	let buttonText = 'Back';
	onMount(() => {
		updateResume();
	});
	const updateResume = () => {
		userDetailsData.update((data) => ({
			...data,
			theme: resumeData?.theme || '',
			user_details_heading: resumeData.user_details_heading,
			job_title: resumeData.job_title,
			first_name: resumeData.first_name,
			last_name: resumeData.last_name,
			email: resumeData.email,
			phone: resumeData.phone,
			dob: resumeData.dob
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
	};
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
		formData.dob = formData.dob.toISOString();
		errorDetails = validateField($form, validationRules);
		errors.update((data) => {
			return { ...data, ...errorDetails };
		});
		// console.log('errors', $errors);
		if (Object.keys($errors).length === 0) {
			// No errors, submit the form
			// console.log('form', $form);
			const response = await fetch('/api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify($form)
			});
			if (response.status === 200) {
				buttonText = 'Preview Resume';
				alertMessage('Saved', 'Successfully Saved');
				console.log('Form submitted successfully!', response);
			} else {
				alertMessage('error', 'Oops, something went wrong');
			}
		} else {
			// Errors found, do not submit the form
			console.log('Form contains errors. Please correct them before submitting.');
		}
	};
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
			<button type="submit" class="variant-filled btn">Submit</button>
			<a href="/landing-page/list"
				><button
					type="button"
					class="variant-filled btn"
					>{buttonText}</button
				></a
			>
			<!-- <button type="button" class="variant-filled btn" on:click={}>{buttonText}</button> -->
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
