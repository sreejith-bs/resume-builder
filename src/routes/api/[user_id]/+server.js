import { json } from "@sveltejs/kit";
import { createClient } from "edgedb";
import e from "../../../../dbschema/edgeql-js";
import { createSuccessResponse, createErrorResponse } from "../apiUtils"

const client = createClient();


/**
 * @param {any} event
 */

export async function GET(event) {
    let user_id = event?.params?.user_id
    let responseBody = await e.select(e.UserDetails, details => ({
        ...e.UserDetails['*'],
        address: {
            ...e.Address['*']
        },
        certificate: {
            ...e.Certificate['*']
        },
        experience: {
            ...e.Experience['*']
        },
        education: {
            ...e.Education['*']
        },
        social_media: {
            ...e.SocialMedia['*']
        },
        skills: {
            ...e.Skills['*']
        },
        language: {
            ...e.Language['*']
        },
        hobbies: {
            ...e.Hobbies['*']
        },

        filter_single: { id: user_id }
    })).run(client)
    return json(createSuccessResponse({ event: { responseBody } }));
}

export async function DELETE(userId) {
    console.log('userId', userId);
    let { params } = userId
    console.log('params', params);
    let query = e.delete(e.UserDetails, () => ({
        filter_single: { id: params.user_id }
    }))
    const result = await query.run(client)
    return json(createSuccessResponse({ event: { result } }));
    // return new Response(JSON.stringify(result))
}

export async function PUT(data) {
    let { params } = data
    let resumeId = params.user_id
    try {
        let formData = await data.request.json()
        console.log('id*********', resumeId);
        console.log('FORM-Data-----', formData);
        const query = e.update(e.UserDetails, () => ({
            filter_single: { id: resumeId },
            set: {
                theme: formData.theme || '',
                email: formData.email,
                job_title: formData.job_title,
                first_name: formData.first_name,
                last_name: formData.last_name,
                phone: formData.phone,
                date_of_birth: formData.date_of_birth || '',
                profile_description: formData.profile_description,
                experience_heading: formData.experience_heading,
                user_details_heading: formData.user_details_heading,
                profile_heading: formData.profile_heading,
                education_heading: formData.education_heading,
                certificate_heading: formData.certificate_heading,
                social_media_heading: formData.social_media_heading,
                skills_heading: formData.skills_heading,
                language_heading: formData.language_heading,
                hobbies_heading: formData.hobbies_heading,
                address: e.update(e.Address, () => ({
                    filter_single: { id: formData.address.id },
                    set: {
                        address: formData.address.address,
                        postal_code: formData.address.postal_code,
                        country: formData.address.country,
                        city: formData.address.city,
                        driving_license: formData.address.driving_license,
                        nationality: formData.address.nationality,
                        place_of_birth: formData.address.place_of_birth,
                        is_active: formData.address.is_active
                    }

                })),
                hobbies: e.update(e.Hobbies, () => ({
                    filter_single: { id: formData.hobbies.id },
                    set: {
                        label: formData.hobbies.label,
                        is_active: formData.hobbies.is_active
                    }
                })),
                experience: e.assert_distinct(e.set(...formData.experience.map((expItem) => {
                    if (expItem.id)
                        return e.update(e.Experience, () => ({
                            filter_single: { id: expItem.id },
                            set: {
                                job_title: expItem.job_title,
                                employer: expItem.employer,
                                start_date: expItem.start_date || '',
                                end_date: expItem.end_date || '',
                                city: expItem.city,
                                country: expItem.country,
                                description: expItem.description,
                                current_status: expItem.current_status,
                                is_active: expItem.is_active
                            }
                        }));
                    else
                        return e.insert(e.Experience, {
                            job_title: expItem.job_title,
                            employer: expItem.employer,
                            start_date: expItem.start_date || '',
                            end_date: expItem.end_date || '',
                            city: expItem.city,
                            country: expItem.country,
                            description: expItem.description,
                            current_status: expItem.current_status,
                            is_active: expItem.is_active
                        })
                }))),
                education: e.assert_distinct(e.set(...formData.education.map((eduItem) => {
                    if (eduItem.id)
                        return e.update(e.Education, () => ({
                            filter_single: { id: eduItem.id },
                            set: {
                                course: eduItem.course,
                                institution: eduItem.institution,
                                start_date: eduItem.start_date || '',
                                end_date: eduItem.end_date || '',
                                city: eduItem.city,
                                country: eduItem.country,
                                description: eduItem.description,
                                current_status: eduItem.current_status,
                                is_active: eduItem.is_active
                            }
                        }));
                    else
                        return e.insert(e.Education, {
                            course: eduItem.course,
                            institution: eduItem.institution,
                            start_date: eduItem.start_date || '',
                            end_date: eduItem.end_date || '',
                            city: eduItem.city,
                            country: eduItem.country,
                            description: eduItem.description,
                            current_status: eduItem.current_status,
                            is_active: eduItem.is_active
                        })
                }))),
                certificate: e.assert_distinct(e.set(...formData.certificate.map((cerItem) => {
                    if (cerItem.id)
                        return e.update(e.Certificate, () => ({
                            filter_single: { id: cerItem.id },
                            set: {
                                label: cerItem.label,
                                url: cerItem.url,
                                is_active: cerItem.is_active
                            }
                        }));
                    else
                        return e.insert(e.Certificate, {
                            label: cerItem.label,
                            url: cerItem.url,
                            is_active: cerItem.is_active
                        })
                }))),
                social_media: e.assert_distinct(e.set(...formData.social_media.map((socItem) => {
                    if (socItem.id)
                        return e.update(e.SocialMedia, () => ({
                            filter_single: { id: socItem.id },
                            set: {
                                label: e.cast(e.str, socItem.label),
                                url: e.cast(e.str, socItem.url),
                                is_active: e.cast(e.bool, socItem.is_active)
                            }
                        }));
                    else
                        return e.insert(e.SocialMedia, {
                            label: e.cast(e.str, socItem.label),
                            url: e.cast(e.str, socItem.url),
                            is_active: e.cast(e.bool, socItem.is_active)
                        })
                }))),
                skills: e.assert_distinct(e.set(...formData.skills.map((skilItem) => {
                    if (skilItem.id)
                        return e.update(e.Skills, () => ({
                            filter_single: { id: skilItem.id },
                            set: {
                                label: skilItem.label,
                                rating: skilItem.rating,
                                is_active: skilItem.is_active
                            }
                        }));
                    else
                        return e.insert(e.Skills, {
                            label: skilItem.label,
                            rating: skilItem.rating,
                            is_active: skilItem.is_active
                        })
                }))),
                language: e.assert_distinct(e.set(...formData.language.map((langItem) => {
                    if (langItem.id)
                        return e.update(e.Language, () => ({
                            filter_single: { id: langItem.id },
                            set: {
                                label: e.cast(e.str, langItem.label),
                                rating: e.cast(e.int64, langItem.rating),
                                is_active: e.cast(e.bool, langItem.is_active)
                            }
                        }));
                    else
                        return e.insert(e.Language, {
                            label: e.cast(e.str, langItem.label),
                            rating: e.cast(e.int64, langItem.rating),
                            is_active: e.cast(e.bool, langItem.is_active)
                        })
                }))),
            }
        }));
        console.log('query', query);
        const responseBody = await query.run(client);
        return json(createSuccessResponse({ event: { responseBody } }));
        // return new Response(JSON.stringify(responseBody))

    } catch (error) {
        console.log('error', error)
    }
}