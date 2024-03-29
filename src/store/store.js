import { derived, writable } from 'svelte/store';

const userDetailsData = writable({
    id: '',
    theme: '',
    user_details_heading: '',
    job_title: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    date_of_birth: ''
});
const addressData = writable({
    id: '',
    address: '',
    postal_code: '',
    driving_license: '',
    nationality: '',
    place_of_birth: '',
    country: '',
    city: '',
    is_active: true
});
const profileData = writable({
    profile_heading: '',
    profile_description: ''
});
const experienceData = writable({
    experience_heading: '',
    data: [{
        job_title: '',
        employer: '',
        start_date: '',
        end_date: '',
        city: '',
        country: '',
        description: '',
        current_status: false,
        is_active: true
    }]
});
const educationData = writable({
    education_heading: '',
    data: [{
        course: '',
        institution: '',
        start_date: '',
        end_date: '',
        city: '',
        country: '',
        description: '',
        current_status: false,
        is_active: true
    }]
});
const certificateData = writable({
    certificate_heading: '',
    data: [{
        label: '',
        url: '',
        is_active: true
    }]
});
const socialMediaData = writable({
    social_media_heading: '',
    data: [{
        label: '',
        is_active: true
    }]
});
const skillsData = writable({
    skills_heading: '',
    data: [{
        label: '',
        rating: Boolean,
        is_active: true
    }]
});
const languageData = writable({
    language_heading: '',
    data: [{
        label: '',
        rating: Boolean,
        is_active: true
    }]
});
const hobbiesData = writable({
    id: '',
    hobbies_heading: '',
    label: '',
    is_active: true
});

const appConfigData = writable({
    selectedTab: 0,
    edit: false,
    theme: '',
    id: ''
})

const errors = writable({});

const resumeDetails = writable({});

const imageData = writable({});

const form = derived(
    [userDetailsData,
        addressData,
        profileData,
        experienceData,
        educationData,
        certificateData,
        socialMediaData,
        skillsData,
        languageData,
        hobbiesData],
    ([$userDetailsData,
        $addressData,
        $profileData,
        $experienceData,
        $educationData,
        $certificateData,
        $socialMediaData,
        $skillsData,
        $languageData,
        $hobbiesData]) => ({
            id: $userDetailsData.id,
            theme: $userDetailsData.theme,
            user_details_heading: $userDetailsData.user_details_heading,
            profile_heading: $profileData.profile_heading,
            experience_heading: $experienceData.experience_heading,
            education_heading: $educationData.education_heading,
            certificate_heading: $certificateData.certificate_heading,
            social_media_heading: $socialMediaData.social_media_heading,
            skills_heading: $skillsData.skills_heading,
            language_heading: $languageData.language_heading,
            hobbies_heading: $hobbiesData.hobbies_heading,
            profile_description: $profileData.profile_description,
            job_title: $userDetailsData.job_title,
            first_name: $userDetailsData.first_name,
            last_name: $userDetailsData.last_name,
            email: $userDetailsData.email,
            phone: $userDetailsData.phone,
            date_of_birth: $userDetailsData.date_of_birth,
            address: {
                id: $addressData.id,
                address: $addressData.address,
                postal_code: $addressData.postal_code,
                driving_license: $addressData.driving_license,
                nationality: $addressData.nationality,
                place_of_birth: $addressData.place_of_birth,
                country: $addressData.country,
                city: $addressData.city,
                is_active: $addressData.is_active
            },
            hobbies: {
                id: $hobbiesData.id,
                label: $hobbiesData.label,
                is_active: $hobbiesData.is_active
            },
            experience: $experienceData.data,
            education: $educationData.data,
            certificate: $certificateData.data,
            social_media: $socialMediaData.data,
            skills: $skillsData.data,
            language: $languageData.data
        })
)

function updateResumeDetails(data) {
    resumeDetails.set(data)
}

// const resumeHeadlineDetails = derived(resumeDetails, ($resumeDetails) => ({
//     first_name: $resumeDetails.first_name,
//     last_name: $resumeDetails.last_name,
//     job_title: $resumeDetails.job_title
// }))

// const unsubscribe = form.subscribe(newValue => {
//     console.log('Store updated:', newValue);
// });

export {
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
    errors,
    form,
    resumeDetails,
    imageData,
    appConfigData,
    updateResumeDetails
}
