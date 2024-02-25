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