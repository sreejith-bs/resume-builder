<script>
    import AddressBlock from "../ThemeBlocks/AddressBlock.svelte";
    import UserDetailsBlock from "../ThemeBlocks/UserDetailsBlock.svelte";
    import SkillsBlock from "../ThemeBlocks/SkillsBlock.svelte";
    import SocialMediaBlock from "../ThemeBlocks/SocialMediaBlock.svelte";
    import HobbiesBlock from "../ThemeBlocks/HobbiesBlock.svelte";
    import LanguageBlock from "../ThemeBlocks/LanguageBlock.svelte";

    export let details;

    let addressDetails = details.address
    let userDetails = {
        phone: details.phone,
        email: details.email,
        theme: details?.theme
    }
    let skillsDetails = {
        skills_heading: details.skills_heading,
        skills: details.skills
    }
    let languageDetails = {
        language_heading: details.language_heading,
        language: details.language
    }
    let socialMediaDetails = {
        social_media_heading: details.social_media_heading,
        social_media: details.social_media
    }
    let hobbiesDetails = {
        hobbies_heading: details.hobbies_heading,
        hobbies: details.hobbies
    }
</script>
<div>
    <AddressBlock details={addressDetails}/>
    <UserDetailsBlock details={userDetails}/>
    <SkillsBlock details={skillsDetails}/>
    <LanguageBlock details={languageDetails}/>
    <SocialMediaBlock details={socialMediaDetails}/>
    <HobbiesBlock details={hobbiesDetails}/>
</div>