<script>
	import CertificateBlock from '../ThemeBlocks/CertificateBlock.svelte';
	import EducationBlock from '../ThemeBlocks/EducationBlock.svelte';
	import ExperienceBlock from '../ThemeBlocks/ExperienceBlock.svelte';
	import ProfileBlock from '../ThemeBlocks/ProfileBlock.svelte';

	export let details;

    let profileDetails = {
        profile_heading: details.profile_heading,
        profile_description: details.profile_description,
        theme: details?.theme
    }
    let experienceDetails = {
        experience_heading: details.experience_heading,
        experience: details.experience
    }
    let educationDetails = {
        education_heading: details.education_heading,
        education: details.education
    }
    let certificateDetails = {
        certificate_heading: details.certificate_heading,
        certificate: details.certificate
    }
</script>

<div id="resumeThemeBodyContainer-1">
	<ProfileBlock details={profileDetails} />
	<ExperienceBlock details={experienceDetails}/>
	<EducationBlock details={educationDetails} />
	<CertificateBlock details={certificateDetails} />
</div>
