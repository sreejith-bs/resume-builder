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

	export let theme;

	let userDetails = {
		user_details_heading: '',
		job_title: '',
		first_name: '',
		last_name: '',
		email: '',
		phone: '',
		country: '',
		city: ''
	};
	let address = {
		address: '',
		postal_code: '',
		driving_license: '',
		nationality: '',
		place_of_birth: '',
		dob: '',
		is_active: true
	};
	let profile = {
		profile_heading: '',
		profile_description: ''
	};
	let experience = {
		experience_heading: '',
		data: [
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
	};
	let education = {
		education_heading: '',
		data: [
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
	};
	let certificate = {
		certificate_heading: '',
		data: [
			{
				label: '',
				url: '',
				is_active: true
			}
		]
	};
	let social_media = {
		social_media_heading: '',
		data: [
			{
				label: '',
				url: '',
				is_active: true
			}
		]
	};
	let skills = {
		skills_heading: '',
		data: [
			{
				label: '',
				rating: null,
				is_active: true
			}
		]
	};
	let language = {
		language_heading: '',
		data: [
			{
				language: '',
				rating: null,
				is_active: true
			}
		]
	};
	let hobbies = {
		hobbies_heading: '',
		hobbies: '',
		is_active: true
	};
	let form = {
		userDetails: {
			user_details_heading: userDetails.user_details_heading,
			profile_heading: profile.profile_heading,
			experience_heading: experience.experience_heading,
			education_heading: education.education_heading,
			certificate_heading: certificate.certificate_heading,
			social_media_heading: social_media.social_media_heading,
			skills_heading: skills.skills_heading,
			language_heading: language.language_heading,
			hobbies_heading: hobbies.hobbies_heading,
			profile_description: profile.profile_description,
			job_title: userDetails.job_title,
			first_name: userDetails.first_name,
			last_name: userDetails.last_name,
			email: userDetails.email,
			phone: userDetails.phone,
			dob: address.dob
		},
		address: {
			address: address.address,
			postal_code: address.postal_code,
			driving_license: address.driving_license,
			nationality: address.nationality,
			place_of_birth: address.place_of_birth,
			country: userDetails.country,
			city: userDetails.city,
			is_active: address.is_active
		},
		experience: experience.data,
		education: education.data,
		certificate: certificate.data,
		social_media: social_media.data,
		skills: skills.data,
		language: language.data,
		hobbies: {
			hobbies: hobbies.hobbies,
			is_active: hobbies.is_active
		}
	};

	$: {
		console.log('resume', form.userDetails);
	}

    const submitForm = async () => {
        console.log('form', form)
    }
</script>

<div class="container justify-center mx-auto py-20 w-4/5">
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
			<button type="submit" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>
