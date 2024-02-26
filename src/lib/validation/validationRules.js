export const validationRules = {
    user_details_heading: {
        required: true,
        message: 'User details heading is required'
    },
    profile_heading: {
        required: true,
        message: 'Profile heading is required'
    },
    profile_description: {
        required: true,
        message: 'Profile description is required'
    },
    experience_heading: {
        required: true,
        message: 'Experience heading is required'
    },
    education_heading: {
        required: true,
        message: 'Education heading is required'
    },
    certificate_heading: {
        required: true,
        message: 'Certificate heading is required'
    },
    social_media_heading: {
        required: true,
        message: 'Social media heading is required'
    },
    skills_heading: {
        required: true,
        message: 'Skills heading is required'
    },
    language_heading: {
        required: true,
        message: 'Language heading is required'
    },
    hobbies_heading: {
        required: true,
        message: 'Hobbies heading is required'
    },
    job_title: {
        required: true,
        message: 'Job title is required'
    },
    first_name: {
        required: true,
        message: 'First name is required'
    },
    last_name: {
        required: true,
        pattern: /^[a-zA-Z]+$/,
        message: 'Last name should not contain numeric values'
    },
    email: {
        required: true,
        pattern: /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
        message: 'Enter a valid email address'
    },
    phone: {
        required: true,
        pattern: /^\d{10}$/,
        message: 'Enter a 10-digit phone number'
    },
    date_of_birth: {
        required: true,
        message: 'Date of birth is required'
    },
    'address.address': {
        required: true,
        message: 'Address is required'
    },
    'address.postal_code': {
        required: true,
        pattern: /^\d{6}$/,
        message: 'Enter a valid postal code'
    },
    'address.driving_license': {
        required: true,
        message: 'Driving license is required'
    },
    'address.nationality': {
        required: true,
        message: 'Nationality is required'
    },
    'address.place_of_birth': {
        required: true,
        message: 'Place of birth is required'
    },
    'address.country': {
        required: true,
        pattern: /^[a-zA-Z\s]*$/,
        message: 'Country should not contain numeric values'
    },
    'address.city': {
        required: true,
        message: 'City is required'
    },
    'experience.*.job_title': {
        required: true,
        message: 'Job title is required'
    },
    'experience.*.employer': {
        required: true,
        message: 'Employer is required'
    },
    'experience.*.start_date': {
        required: true,
        message: 'Start date is required'
    },
    'experience.*.end_date': {
        required: true,
        message: 'End date is required'
    },
    'experience.*.city': {
        required: true,
        message: 'City is required'
    },
    'experience.*.country': {
        required: true,
        message: 'Country is required'
    },
    'experience.*.description': {
        required: true,
        message: 'Description is required'
    },
    'education.*.course': {
        required: true,
        message: 'Course is required'
    },
    'education.*.institution': {
        required: true,
        message: 'Institution is required'
    },
    'education.*.start_date': {
        required: true,
        message: 'Start date is required'
    },
    'education.*.end_date': {
        required: true,
        message: 'End date is required'
    },
    'education.*.city': {
        required: true,
        message: 'City is required'
    },
    'education.*.country': {
        required: true,
        message: 'Country is required'
    },
    'education.*.description': {
        required: true,
        message: 'Description is required'
    },
    'certificate.*.label': {
        required: true,
        message: 'Label is required'
    },
    'certificate.*.url': {
        required: true,
        pattern: /^(http|https):\/\/[^ "]+$/,
        message: 'Enter a valid URL'
    },
    'social_media.*.label': {
        required: true,
        message: 'Label is required'
    },
    'social_media.*.url': {
        required: true,
        pattern: /^(http|https):\/\/[^ "]+$/,
        message: 'Enter a valid URL'
    },
    'skills.*.label': {
        required: true,
        message: 'Label is required'
    },
    'skills.*.rating': {
        required: true,
        message: 'Skills rating is required'
    },
    'language.*.label': {
        required: true,
        message: 'Language is required'
    },
    'language.*.rating': {
        required: true,
        message: 'Language rating is required'
    },
    'hobbies.label': {
        required: true,
        message: 'Hobbies are required'
    }
};
