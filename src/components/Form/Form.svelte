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
	import { goto } from '$app/navigation';

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
		errors,
		appConfigData
	} from '../../store/store.js';

	const modalStore = getModalStore();
	let theme;
	let id;
	let edit;
	let formData;
	let resume_details = {};
	// let resume_id;
	let errorDetails;
	let buttonText = 'Back';
	let submitButton = 'Submit';
	let baseUrl = '/landing-page/';
	let previewUrl;
	let loading = false;
	let demoData = {
		id: '',
		theme: 'theme1',
		user_details_heading: 'Personal Details',
		profile_heading: 'My Profile',
		experience_heading: 'Employment History',
		education_heading: 'Education',
		certificate_heading: 'Certificate',
		social_media_heading: 'Website & Social Links',
		skills_heading: 'Skills',
		language_heading: 'Language',
		hobbies_heading: 'Hobbies',
		profile_description:
			'Passionate and dedicated HR manager with a keen eye for talent and a commitment to fostering a positive and inclusive workplace culture. Armed with extensive experience in recruitment, employee relations, and organizational development, she excels in aligning HR strategies with business objectives to drive growth and success. Known for her strong communication skills and empathetic approach, she is adept at building meaningful relationships with employees at all levels, ultimately contributing to a motivated and engaged workforce.',
		job_title: 'HR Manager',
		first_name: 'Megha',
		last_name: 'D',
		email: 'megha@gmail.com',
		phone: '1234567890',
		date_of_birth: '1999-01-15T04:51:32.794Z',
		address: {
			id: '',
			address: 'Puthel House, Lane 1, Kacheripadi',
			postal_code: '625232',
			driving_license: '1234567',
			nationality: 'Indian',
			place_of_birth: 'Fort Kochi',
			country: 'India',
			city: 'Eranakulam',
			is_active: true
		},
		hobbies: {
			id: '',
			label: 'Drawing, Reading',
			is_active: true
		},
		experience: [
			{
				job_title: 'Junior HR Manager',
				employer: 'GG Designs Pvt. Ltd.',
				start_date: '01-01-2023',
				end_date: '02-02-2024',
				city: 'Kollam',
				country: 'India',
				description:
					'1. Played a key role in recruitment processes, including candidate sourcing, screening, and onboarding.\n2. Assisted in developing and implementing HR policies and procedures to enhance employee engagement and productivity.\n3. Supported employee relations initiatives and facilitated conflict resolution when necessary.\n4. Contributed to training and development programs aimed at fostering career growth and skill enhancement among staff members.',
				is_active: true
			}
		],
		education: [
			{
				current_status: false,
				course: 'BBA',
				institution: 'Kerala University',
				start_date: '01-02-2020',
				end_date: '03-03-2023',
				city: 'Tvm',
				country: 'India',
				is_active: true
			},
			{
				current_status: false
			}
		],
		certificate: [{}],
		social_media: [
			{
				label: 'Instagram',
				url: 'https://www.instagram.com/justinbieber/'
			}
		],
		skills: [
			{
				label: 'Team Organization',
				rating: 4,
				is_active: true
			}
		],
		language: [
			{
				label: 'Malayalam',
				rating: 5,
				is_active: true
			},
			{
				label: 'English',
				rating: 4,
				is_active: true
			}
		]
	};

	const unsubscribe = appConfigData.subscribe((data) => {
		edit = data.edit;
		theme = data.theme;
		id = data.id;
	});

	onMount(() => {
		console.log('onMount');
		unsubscribe;
		// updateResume(demoData);
		if (!theme) {
			goto('/landing-page');
		}
		if (id) {
			console.log('onMount', id);
			getResume(id, 'onMount');
			submitButton = 'Save';
		}
	});
	onDestroy(unsubscribe);
	$: {
		$errors;
		formData = $form;
	}
	function updateResume(resumeData = {}) {
		console.log('resumeData', resumeData);
		userDetailsData.update((data) => ({
			...data,
			id: resumeData?.id || '',
			theme: resumeData?.theme || '',
			user_details_heading: resumeData?.user_details_heading || '',
			job_title: resumeData?.job_title || '',
			first_name: resumeData?.first_name || '',
			last_name: resumeData?.last_name || '',
			email: resumeData?.email || '',
			phone: resumeData?.phone || '',
			date_of_birth: resumeData?.date_of_birth || ''
		}));
		addressData.update((data) =>
			resumeData.address
				? { ...data, ...resumeData.address }
				: {
						id: '',
						address: '',
						postal_code: '',
						driving_license: '',
						nationality: '',
						place_of_birth: '',
						country: '',
						city: '',
						is_active: true
					}
		);
		profileData.update((data) => ({
			...data,
			profile_heading: resumeData?.profile_heading || '',
			profile_description: resumeData?.profile_description || ''
		}));
		experienceData.update((data) => ({
			...data,
			experience_heading: resumeData?.experience_heading || '',
			data: resumeData?.experience || [
				{
					job_title: '',
					employer: '',
					start_date: '',
					end_date: '',
					city: '',
					country: '',
					description: '',
					current_status: false,
					is_active: true
				}
			]
		}));
		educationData.update((data) => ({
			...data,
			education_heading: resumeData?.education_heading || '',
			data: resumeData?.education || [
				{
					course: '',
					institution: '',
					start_date: '',
					end_date: '',
					city: '',
					country: '',
					description: '',
					current_status: false,
					is_active: true
				}
			]
		}));
		certificateData.update((data) => ({
			...data,
			certificate_heading: resumeData?.certificate_heading || '',
			data: resumeData?.certificate || [
				{
					label: '',
					url: '',
					is_active: true
				}
			]
		}));
		socialMediaData.update((data) => ({
			...data,
			social_media_heading: resumeData?.social_media_heading || '',
			data: resumeData?.social_media || [
				{
					label: '',
					is_active: true
				}
			]
		}));
		skillsData.update((data) => ({
			...data,
			skills_heading: resumeData?.skills_heading || '',
			data: resumeData?.skills || [
				{
					label: '',
					rating: 0,
					is_active: true
				}
			]
		}));
		languageData.update((data) => ({
			...data,
			language_heading: resumeData?.language_heading || '',
			data: resumeData?.language || [
				{
					label: '',
					rating: 0,
					is_active: true
				}
			]
		}));
		hobbiesData.update((data) =>
			resumeData?.hobbies
				? { ...data, ...resumeData.hobbies, hobbies_heading: resumeData.hobbies_heading || '' }
				: {
						hobbies_heading: resumeData?.hobbies_heading || '',
						...{ id: '', hobbies_heading: '', label: '', is_active: true }
					}
		);
	}
	const submitForm = async () => {
		loading = true;
		const inputFields = document.querySelectorAll('input');
		const textAreaFields = document.querySelectorAll('textarea');
		inputFields.forEach((input) => {
			input.dispatchEvent(new Event('blur'));
		});
		textAreaFields.forEach((input) => {
			input.dispatchEvent(new Event('blur'));
		});
		formData.theme = theme;
		console.log('formData', $form);

		errorDetails = document.getElementsByClassName('error');
		console.log('errorDetails', errorDetails.length);
		// errors.update((data) => {
		// 	return { ...data, ...errorDetails };
		// });

		if (errorDetails.length === 0) {
			// No errors, submit the form
			// console.log('form', $form);
			if (!id) {
				try {
					// console.log('formdata-id', formData.id);
					const response = await fetch('/api', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(formData)
					})
						.then((response) => {
							console.log('response', response);
							if (response.ok) {
								buttonText = 'Preview Resume';
								alertMessage('Saved', 'Successfully Saved');
								loading = false;
								return response.json();
							} else {
								loading = false;
								alertMessage('error', 'Oops, something went wrong');
							}
						})
						.then((data) => {
							// console.log('response-Data', data);
							if (data) {
								formData.id = data[0].id;
								id = data[0].id;
								loading = false;
								// updateUserDetails(data[0].id);
								getResume(data[0].id);
								submitButton = 'Save';
							}
						})
						.catch((error) => {
							loading = false;
							console.error('Error', error);
						});
				} catch (error) {
					console.log('error***', error);
				}
			} else {
				// console.log('put is working***********', formData);
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
					.then((data) => {})
					.catch((error) => {
						loading = false;
						console.error('Error', error);
					});
			}
		} else {
			// Errors found, do not submit the form
			loading = false;
			errorDetails[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
			console.log('Form contains errors. Please correct them before submitting.!!');
		}
		console.log('loading', loading);
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
				// goto('/landing-page/preview');
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
	function handleClick(action) {
		if (action === 'new' || action === 'existing') {
			const newData = {
				selectedTab: action === 'new' ? 0 : 1,
				id: '',
				theme: '',
				edit: false
			};
			appConfigData.update((data) => ({ ...data, ...newData }));
			// updateResumeDetails({});
			updateResume();
			// resume_details = {};
			goto('/landing-page');
		} else {
			goto('/landing-page/preview');
		}
	}
</script>

<div class="container mx-auto w-4/5 justify-center py-20">
	<form on:submit|preventDefault={submitForm}>
		<div class="pb-10">
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
		</div>
		<div class="button-container flex gap-4 pt-10">
			<button type="submit" class="variant-filled btn" disabled={loading}>{submitButton}</button>
			<button
				class="variant-filled btn"
				type="button"
				on:click={() => {
					handleClick('existing');
				}}>Edit Existing Resume</button
			>
			<button
				class="variant-filled btn"
				type="button"
				on:click={() => {
					handleClick('new');
				}}>Select New Template</button
			>
			{#if resume_details.id}
				<button
					class="variant-filled btn"
					type="button"
					on:click={() => {
						handleClick('preview');
					}}>Preview Resume</button
				>
			{/if}
		</div>
	</form>
</div>

<style>
	:global(.error-msg) {
		/* font-size: 14px; */
		color: red;
		/* margin-top: 0px; */
	}
	.button-container {
		/*bottom fixed button*/
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		padding: 20px;
		background-color: rgba(135, 174, 237, 0.7);
		box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
		/*Vertically arrange button on left*/
		/* position: fixed;
		top: 0;
		left: 0;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		padding: 20px;
		background-color: rgba(135, 174, 237, 0.7);
		box-shadow: -2px 0 4px rgba(0, 0, 0, 0.1); */
	}
</style>
