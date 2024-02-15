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
		user_details_heading: 'Personal Details',
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

	$: {
		console.log('certificate', certificate);
	}
</script>

<div class="container justify-center mx-auto py-20 w-4/5">
	<form>
		<UserDetails bind:userDetails />
		<Address bind:address />
		<Profile bind:profile />
		<Experience bind:experience />
		<Education bind:education />
		<Certificate bind:certificate />
		<Socialmedia bind:social_media />
		<Skills bind:skills />
		<Language bind:language />
		<Hobbies bind:hobbies />
		<div class="flex justify-center pt-10">
			<button type="button" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>
