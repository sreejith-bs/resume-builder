import { derived, writable } from 'svelte/store';

const userDetailsData = writable({
    user_details_heading: '',
    job_title: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: '',
    city: ''
});
const addressData = writable({
    address: '',
    postal_code: '',
    driving_license: '',
    nationality: '',
    place_of_birth: '',
    dob: '',
    is_active: true
});
const profileData = writable({
    profile_heading: '',
    profile_description: ''
});
const experienceData = writable({
    experience_heading: '',
    data: [{}]
});
const educationData = writable({
    education_heading: '',
    data: [{}]
});
const certificateData = writable({
    certificate_heading: '',
    data: [{}]
});
const socialMediaData = writable({
    social_media_heading: '',
    data: [{}]
});
const skillsData = writable({
    skills_heading: '',
    data: [{}]
});
const languageData = writable({
    language_heading: '',
    data: [{}]
});
const hobbiesData = writable({
    hobbies_heading: '',
    hobbies: '',
    is_active: true
});

const unsubscribe = educationData.subscribe(newValue => {
    console.log('Store updated:', newValue);
});

export { userDetailsData, addressData, profileData, experienceData, educationData, certificateData, socialMediaData, skillsData, languageData, hobbiesData }