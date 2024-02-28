<script>
	import ProfileBlock from '../ThemeBlocks/ProfileBlock.svelte';
	import UserDetailsBlock from '../ThemeBlocks/UserDetailsBlock.svelte';
	import CertificateBlock from '../ThemeBlocks/CertificateBlock.svelte';
	import EducationBlock from '../ThemeBlocks/EducationBlock.svelte';
	import ExperienceBlock from '../ThemeBlocks/ExperienceBlock.svelte';
	import SkillsBlock from '../ThemeBlocks/SkillsBlock.svelte';
	import SocialMediaBlock from '../ThemeBlocks/SocialMediaBlock.svelte';
	import HobbiesBlock from '../ThemeBlocks/HobbiesBlock.svelte';
	import LanguageBlock from '../ThemeBlocks/LanguageBlock.svelte';

	export let details;
	let profileDetails = {
		profile_heading: details?.profile_heading,
		profile_description: details?.profile_description,
		job_title: details?.job_title,
		theme: details?.theme
	};
	let userDetails = {
		phone: details?.phone,
		email: details?.email,
		theme: details?.theme
	};
	let experienceDetails = {
		experience_heading: details.experience_heading,
		experience: details.experience,
		theme: details?.theme
	};
	let educationDetails = {
		education_heading: details.education_heading,
		education: details.education,
		theme: details?.theme
	};
	let certificateDetails = {
		certificate_heading: details.certificate_heading,
		certificate: details.certificate,
		theme: details?.theme
	};
	let skillsDetails = {
		skills_heading: details.skills_heading,
		skills: details.skills,
		theme: details?.theme
	};
	let languageDetails = {
		language_heading: details.language_heading,
		language: details.language,
		theme: details?.theme
	};
	let socialMediaDetails = {
		social_media_heading: details.social_media_heading,
		social_media: details.social_media,
		theme: details?.theme
	};
	let hobbiesDetails = {
		hobbies_heading: details.hobbies_heading,
		hobbies: details.hobbies,
		theme: details?.theme
	};
</script>

<div class="body-container pt-14">
	<div class="item1">
		<ProfileBlock details={profileDetails} />
	</div>
	<div class="item2">
		<UserDetailsBlock details={userDetails} />
	</div>
</div>
<div class="body-container pb-14">
	<div class="item1">
		<ExperienceBlock details={experienceDetails} />
		<EducationBlock details={educationDetails} />
        <CertificateBlock details={certificateDetails} />
	</div>
	<div class="item2 w-[200px]">
		<SkillsBlock details={skillsDetails} />
		<LanguageBlock details={languageDetails} />
		<SocialMediaBlock details={socialMediaDetails} />
		<HobbiesBlock details={hobbiesDetails} />
	</div>
</div>

<!-- <div class="item2">
    <EducationBlock details={educationDetails} />
</div> -->

<style>
	.body-container {
		display: grid;
		grid-template-columns: auto auto auto;
		grid-gap: 20px;
	}
	.item1 {
		grid-column: 1 / span 2;
	}
</style>
