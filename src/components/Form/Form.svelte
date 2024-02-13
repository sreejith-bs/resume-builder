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
		dob: ''
	};
    let address = {
        address: '',
        postal_code: '',
        country: '',
        city: '',
        driving_license: '',
        nationality: '',
        place_of_birth: '',
        is_active: true
      };

	// $: {
	// 	console.log('userDetails', userDetails);
	// }
</script>

<div class="container justify-center mx-auto py-20 w-4/5">
	<form>
		<UserDetails bind:userDetails />
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
			<button type="button" class="btn variant-filled">Submit</button>
		</div>
	</form>
</div>
