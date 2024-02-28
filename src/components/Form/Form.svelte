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
	export let edit;
	let formData;
	let resume_details = {};
	// let resume_id;
	let errorDetails;
	let buttonText = 'Back';
	let submitButton = 'Submit';
	let baseUrl = '/landing-page/';
	let previewUrl;
	let loading = false;
	const emptyData = {
		theme,
		job_title: '',
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		date_of_birth: '',
		profile_description: '',
		address: {
			address: '',
			postal_code: '',
			country: '',
			city: '',
			driving_license: '',
			nationality: '',
			place_of_birth: '',
			is_active: true
		},
		experience: [{}],
		education: [{}],
		certificate: [{}],
		social_media: [{}],
		skills: [{}],
		language: [{}],
		hobbies: {
			hobbies_heading: '',
			hobbies: {}
		}
	};
	let demoData = {
		certificate_heading: 'Certificate',
		date_of_birth: '2024-02-26T19:00:17.101Z',
		education_heading: 'Education',
		email: 'demo@gmail.com',
		experience_heading: 'Employment History',
		first_name: 'Sreejith',
		hobbies_heading: 'Hobbies',
		job_title: 'Software Engineer',
		language_heading: 'Language',
		last_name: 'BS',
		phone: '6252125262',
		profile_description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		profile_heading: 'My Profile',
		skills_heading: 'Skills',
		social_media_heading: 'Website & Social Links',
		theme: 'theme1',
		user_details_heading: 'Personal Details',
		address: {
			address: 'Address',
			city: 'Tvm',
			country: 'India',
			driving_license: '1234567',
			is_active: true,
			nationality: 'Indian',
			place_of_birth: 'Kpzha',
			postal_code: '625232'
		},
		certificate: [
			{
				is_active: true,
				label: 'Web Designing',
				url: 'https://Inet.com'
			},
			{
				is_active: true,
				label: 'Web Designing',
				url: 'https://Inet.com'
			}
		],
		experience: [
			{
				city: 'Tvm',
				country: 'India',
				current_status: false,
				description: 'Description',
				employer: 'KritiSoft',
				end_date: '2010-04-18T09:27:00',
				is_active: true,
				job_title: 'Software Engineer',
				start_date: '2010-04-18T09:27:00'
			},
			{
				city: 'Tvm',
				country: 'India',
				current_status: true,
				description: 'Description',
				employer: 'Alokin',
				end_date: '2010-04-18T09:27:00',
				is_active: true,
				job_title: 'Software Engineer',
				start_date: '2010-04-18T09:27:00'
			},
			{
				city: 'Tvm',
				country: 'India',
				current_status: false,
				description: 'Description',
				employer: 'KritiSoft',
				end_date: '2010-04-18T09:27:00',
				is_active: true,
				job_title: 'Software Engineer',
				start_date: '2010-04-18T09:27:00'
			}
		],
		education: [
			{
				city: 'Kollam',
				country: 'India',
				course: 'SSLC',
				current_status: false,
				description: 'School',
				end_date: '2010-04-18T09:27:00',
				institution: 'BMGHS',
				is_active: true,
				start_date: '2010-04-18T09:27:00'
			},
			{
				city: 'Kollam',
				country: 'India',
				course: 'SSLC',
				current_status: false,
				description: 'School',
				end_date: '2010-04-18T09:27:00',
				institution: 'BMGHS',
				is_active: true,
				start_date: '2010-04-18T09:27:00'
			}
		],
		social_media: [
			{
				is_active: true,
				label: 'Instagram',
				url: 'https://Inet.com'
			},
			{
				is_active: true,
				label: 'Instagram',
				url: 'https://Inet.com'
			}
		],
		skills: [
			{
				is_active: true,
				label: 'HTML5',
				rating: 4
			},
			{
				is_active: true,
				label: 'HTML5',
				rating: 4
			}
		],
		language: [
			{
				is_active: true,
				label: 'Malayalam',
				rating: 5
			},
			{
				is_active: true,
				label: 'Malayalam',
				rating: 5
			},
			{
				is_active: true,
				label: 'English',
				rating: 3
			},
			{
				is_active: true,
				label: 'English',
				rating: 3
			}
		],
		hobbies: {
			is_active: true,
			label: 'Drawing, Reading'
		}
	};
	// const unsubscribe = resumeDetails.subscribe((value) => {
	// 	resume_details = value;
	// 	resume_id = value.id;
	// 	console.log('unsubscribe_resume_details', resume_details);
	// });

	onMount(() => {
		// unsubscribe;
		if (id) {
			// console.log('onMount', id);
			getResume(id, 'onMount');
			submitButton = 'save';
		} else {
			// updateResumeDetails(emptyData);
			updateResume(demoData);
		}
	});
	// onDestroy(unsubscribe);
	$: {
		$errors;
		formData = $form;
		console.log('formdata-watch****', formData);
		// if (resume_id) {
		// 	// console.log('resume_details');
		// 	submitButton = 'save';
		// 	updateResume(resume_details);
		// }
	}
	function updateResume(resumeData = {}) {
		console.log('updateResume-checking', resumeData);
		userDetailsData.update((data) => ({
			...data,
			id: resumeData?.id || '',
			theme: resumeData?.theme || '',
			user_details_heading: resumeData.user_details_heading || '',
			job_title: resumeData.job_title || '',
			first_name: resumeData.first_name || '',
			last_name: resumeData.last_name || '',
			email: resumeData.email || '',
			phone: resumeData.phone || '',
			date_of_birth: resumeData.date_of_birth || ''
		}));
		addressData.update((data) => ({
			...data,
			...(resumeData.address || {})
		}));
		profileData.update((data) => ({
			...data,
			profile_heading: resumeData.profile_heading || '',
			profile_description: resumeData.profile_description || ''
		}));
		experienceData.update((data) => ({
			...data,
			experience_heading: resumeData.experience_heading || '',
			data: resumeData.experience || []
		}));
		educationData.update((data) => ({
			...data,
			education_heading: resumeData.education_heading || '',
			data: resumeData.education || []
		}));
		certificateData.update((data) => ({
			...data,
			certificate_heading: resumeData.certificate_heading || '',
			data: resumeData.certificate || []
		}));
		socialMediaData.update((data) => ({
			...data,
			social_media_heading: resumeData.social_media_heading || '',
			data: resumeData.social_media || []
		}));
		skillsData.update((data) => ({
			...data,
			skills_heading: resumeData.skills_heading || '',
			data: resumeData.skills || []
		}));
		languageData.update((data) => ({
			...data,
			language_heading: resumeData.language_heading || '',
			data: resumeData.language || []
		}));
		hobbiesData.update((data) => ({
			...data,
			hobbies_heading: resumeData.hobbies_heading || '',
			...(resumeData.hobbies || {})
		}));
	}
	const submitForm = async () => {
		loading = true;
		const inputFields = document.querySelectorAll('input');
		inputFields.forEach((input) => {
			input.dispatchEvent(new Event('blur'));
		});
		formData.theme = theme;

		errorDetails = validateField($form, validationRules);
		errors.update((data) => {
			return { ...data, ...errorDetails };
		});

		// console.log('formData', $form, 'id', !id);
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
							loading = false;
							return response.json();
						} else {
							alertMessage('error', 'Oops, something went wrong');
						}
					})
					.then((data) => {
						console.log('response-Data', data);
						if (data) {
							formData.id = data[0].id;
							id = data[0].id;
							// updateUserDetails(data[0].id);
							getResume(data[0].id);
							submitButton = 'Save';
						}
					})
					.catch((error) => {
						loading = false;
						console.error('Error', error);
					});
			} else {
				console.log('put is working***********', formData);
				const response = await fetch(`/api/${edit ? id : resume_details.id}`, {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json'
					},

					body: JSON.stringify(edit ? formData : resume_details)
				})
					.then((response) => {
						if (response.ok) {
							submitButton = 'Save';
							alertMessage('Saved', 'Successfully Saved');
							loading = false;
							return response.json();
						} else {
							loading = false;
							alertMessage('error', 'Oops, something went wrong');
						}
					})
					.then((data) => {
						console.log('response-Data', data);
					})
					.catch((error) => {
						loading = false;
						console.error('Error', error);
					});
			}
		} else {
			// Errors found, do not submit the form
			loading = false;
			console.log('error***', $errors);
			// Get a reference to the error container element
			const errorContainer = document.getElementById('errorContainer');

			// Scroll to the error container if an error occurs
			if (errorContainer) {
				// Scroll the error container into view
				errorContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
			}
			// alertMessage('error', 'Oops, something went wrong');
			console.log('Form contains errors. Please correct them before submitting.!!');
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
				previewUrl = edit
					? `${baseUrl}preview/edit/${resume_details.theme}/${id}`
					: `${baseUrl}preview/${resume_details.theme}/${resume_details.id}`;
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
			<button type="submit" class="variant-filled btn" disabled={loading}>{submitButton}</button>
			<a href="/landing-page/list" class="variant-filled btn">Edit Existing Resume</a>
			<a href="/landing-page/create" class="variant-filled btn">Select new Template</a>
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
