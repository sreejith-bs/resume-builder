import { json } from "@sveltejs/kit";
import * as edgedb from "edgedb";
import e from '../../../dbschema/edgeql-js';
import { updateResumeDetails } from "../../store/store";
import { createSuccessResponse, createErrorResponse } from "./apiUtils"
// import { local_datetime } from "../../../dbschema/edgeql-js/modules/cal";

const client = edgedb.createClient();


// export async function GET() {
//     try {
//         let responseBody = await client.query(
//             `select UserDetails{
//                 email
//             }`
//         );
//         console.log('responseBody', responseBody)
//         return json(responseBody);
//     } catch (error) {
//         console.log('GET-error', error)
//     }
// }

export async function GET() {
  let responseBody = await e.select(
    e.UserDetails, () => ({
      id: true,
      theme: true,
      job_title: true,
      first_name: true,
      last_name: true,
      email: true,
      phone: true,
      profile_description: true
    })
  ).run(client)

  // console.log("MMM", responseBody);
  return json(createSuccessResponse({ event: { responseBody } }));
  // console.log('response', responseBody);
  // updateResumeDetails(responseBody)
  // return new Response(JSON.stringify(responseBody))
}

export async function POST(data) {
  try {
    let formData = await data.request.json()
    console.log('FORM-Data+++++', formData);
    const query = e.params({ items: e.json }, (params) => {
      return e.for(e.json_array_unpack(params.items), (item) => {
        return e.insert(e.UserDetails, {
          theme: e.cast(e.str, item.theme),
          email: e.cast(e.str, item.email),
          job_title: e.cast(e.str, item.job_title),
          first_name: e.cast(e.str, item.first_name),
          last_name: e.cast(e.str, item.last_name),
          phone: e.cast(e.str, item.phone),
          date_of_birth: e.cast(e.str, item.date_of_birth),
          profile_description: e.cast(e.str, item.profile_description),
          experience_heading: e.cast(e.str, item.experience_heading),
          user_details_heading: e.cast(e.str, item.user_details_heading),
          profile_heading: e.cast(e.str, item.profile_heading),
          education_heading: e.cast(e.str, item.education_heading),
          certificate_heading: e.cast(e.str, item.certificate_heading),
          social_media_heading: e.cast(e.str, item.social_media_heading),
          skills_heading: e.cast(e.str, item.skills_heading),
          language_heading: e.cast(e.str, item.language_heading),
          hobbies_heading: e.cast(e.str, item.hobbies_heading),
          address: e.insert(e.Address, {
            address: e.cast(e.str, item.address.address),
            postal_code: e.cast(e.str, item.address.postal_code),
            country: e.cast(e.str, item.address.country),
            city: e.cast(e.str, item.address.city),
            driving_license: e.cast(e.str, item.address.driving_license),
            nationality: e.cast(e.str, item.address.nationality),
            place_of_birth: e.cast(e.str, item.address.place_of_birth),
            is_active: e.cast(e.bool, item.address.is_active)
          }),
          hobbies: e.insert(e.Hobbies, {
            label: e.cast(e.str, item.hobbies.label),
            is_active: e.cast(e.bool, item.hobbies.is_active)
          }),
          experience: e.for(e.json_array_unpack(item.experience), (expItem) => {
            return e.insert(e.Experience, {
              job_title: e.cast(e.str, expItem.job_title),
              employer: e.cast(e.str, expItem.employer),
              start_date: e.cast(e.str, expItem.start_date),
              end_date: e.cast(e.str, expItem.end_date),
              city: e.cast(e.str, expItem.city),
              country: e.cast(e.str, expItem.country),
              description: e.cast(e.str, expItem.description),
              current_status: e.cast(e.bool, expItem.current_status),
              is_active: e.cast(e.bool, expItem.is_active)
            });
          }),
          education: e.for(e.json_array_unpack(item.education), (eduItem) => {
            return e.insert(e.Education, {
              course: e.cast(e.str, eduItem.course),
              institution: e.cast(e.str, eduItem.institution),
              start_date: e.cast(e.str, eduItem.start_date),
              end_date: e.cast(e.str, eduItem.end_date),
              city: e.cast(e.str, eduItem.city),
              country: e.cast(e.str, eduItem.country),
              description: e.cast(e.str, eduItem.description),
              current_status: e.cast(e.bool, eduItem.current_status),
              is_active: e.cast(e.bool, eduItem.is_active)
            });
          }),
          certificate: e.for(e.json_array_unpack(item.certificate), (cerItem) => {
            return e.insert(e.Certificate, {
              label: e.cast(e.str, cerItem.label),
              url: e.cast(e.str, cerItem.url),
              is_active: e.cast(e.bool, cerItem.is_active)
            });
          }),
          social_media: e.for(e.json_array_unpack(item.social_media), (socItem) => {
            return e.insert(e.SocialMedia, {
              label: e.cast(e.str, socItem.label),
              url: e.cast(e.str, socItem.url),
              is_active: e.cast(e.bool, socItem.is_active)
            });
          }),
          skills: e.for(e.json_array_unpack(item.skills), (skilItem) => {
            return e.insert(e.Skills, {
              label: e.cast(e.str, skilItem.label),
              rating: e.cast(e.int64, skilItem.rating,),
              is_active: e.cast(e.bool, skilItem.is_active)
            });
          }),
          language: e.for(e.json_array_unpack(item.language), (langItem) => {
            return e.insert(e.Language, {
              label: e.cast(e.str, langItem.label),
              rating: e.cast(e.int64, langItem.rating),
              is_active: e.cast(e.bool, langItem.is_active)
            });
          })
        });
      });
    });
    console.log('query*************', query);
    const responseBody = await query.run(client, {
      items: [formData]
    });
    // console.log('result************', responseBody)
    // let x = json(createSuccessResponse({ event: { responseBody } }));
    // return x; 
    return new Response(JSON.stringify(responseBody))
    // return json(createSuccessResponse({ event: { responseBody } }));

  } catch (error) {
    console.log('error', error)
  }
}
// console.log('typeOff*****************', typeof data);

//   const query = `
//     WITH
//         data := <json>$data
//     FOR item IN json_array_unpack(data)
//     UNION (
//         INSERT UserDetails {
//             # Unique constraint on email to detect conflicts
//             email := <str>item['email'],
//             job_title := <str>item['job_title'],
//             first_name := <str>item['first_name'],
//             last_name := <str>item['last_name'],
//             date_of_birth := <cal::local_datetime>item['date_of_birth'],
//             profile_description := <str>item['profile_description'],
//             experience_heading := <str>item['experience_heading'],
//             education_heading := <str>item['education_heading'],
//             certificate_heading := <str>item['certificate_heading'],
//             social_media_heading := <str>item['social_media_heading'],
//             skills_heading := <str>item['skills_heading'],
//             language_heading := <str>item['language_heading'],
//             hobbies_heading := <str>item['hobbies_heading'],
//             reference_heading := <str>item['reference_heading'],
//             address := (
//                 INSERT Address {
//                     address := <str>item['address']['address'],
//                     postal_code := <str>item['address']['postal_code'],
//                     country := <str>item['address']['country'],
//                     city := <str>item['address']['city'],
//                     driving_license := <str>item['address']['driving_license'],
//                     nationality := <str>item['address']['nationality'],
//                     place_of_birth := <str>item['address']['place_of_birth'],
//                     is_active := <bool>item['address']['is_active']
//                 }
//             ),
//             experience := (
//                 FOR exp IN array_unpack(<array<json>>item['experience'])
//                 UNION (
//                     INSERT Experience {
//                         job_title := <str>exp['job_title'],
//                         employer := <str>exp['employer'],
//                         start_date := <cal::local_datetime>exp['start_date'],
//                         end_date := <cal::local_datetime>exp['end_date'],
//                         city := <str>exp['city'],
//                         country := <str>exp['country'],
//                         description := <str>exp['description'],
//                         current_status := <bool>exp['current_status'],
//                         is_active := <bool>exp['is_active']
//                     }
//                 )
//             ),
//             education := (
//               FOR edu IN array_unpack(<array<json>>item['education'])
//               UNION (
//                   INSERT Education {
//                       course := <str>edu['course'],
//                       institution := <str>edu['institution'],
//                       start_date := <cal::local_datetime>edu['start_date'],
//                       end_date := <cal::local_datetime>edu['end_date'],
//                       city := <str>edu['city'],
//                       country := <str>edu['country'],
//                       description := <str>edu['description'],
//                       current_status := <bool>edu['current_status'],
//                       is_active := <bool>edu['is_active']
//                   }
//               )
//           ),
//           certificate := (
//             FOR cert IN array_unpack(<array<json>>item['certificate'])
//             UNION (
//                 INSERT Certificate {
//                     label := <str>cert['label'],
//                     url := <str>cert['url']
//                 }
//             )
//           ),
//           social_media := (
//             FOR soc IN array_unpack(<array<json>>item['social_media'])
//             UNION (
//                 INSERT SocialMedia {
//                     label := <str>soc['label'],
//                     url := <str>soc['url'],
//                     is_active := <bool>soc['is_active']
//                 }
//             )
//           ),
//           skills := (
//             FOR skill IN array_unpack(<array<json>>item['skills'])
//             UNION (
//                 INSERT Skills {
//                     label := <str>skill['label'],
//                     rating := <int64>skill['rating'],
//                     is_active := <bool>skill['is_active']
//                 }
//             )
//           ),
//           language := (
//             FOR lang IN array_unpack(<array<json>>item['language'])
//             UNION (
//                 INSERT Language {
//                     language := <str>lang['language'],
//                     rating := <int64>lang['rating'],
//                     is_active := <bool>lang['is_active']
//                 }
//             )
//           ),
//           hobbies := (
//             FOR hob IN array_unpack(<array<json>>item['hobbies'])
//             UNION (
//                 INSERT Hobbies {
//                     hobbies := <str>hob['hobbies'],
//                     is_active := <bool>hob['is_active']
//                 }
//             )
//           )
//         }
//     )
// `;
//   let result = await client.execute(query, { data });
//   console.log('result////', result);
// const data =
// {
//   "job_title": "Software Engineer",
//   "first_name": "John",
//   "last_name": "Doe",
//   "email": "sree@example.com",
//   "phone": "+1234567890",
//   "date_of_birth": "2018-05-07T15:01:22",
//   "profile_description": "Experienced software engineer with expertise in...",
//   "experience_heading": "Experience",
//   "education_heading": "Education",
//   "certificate_heading": "Certificates",
//   "social_media_heading": "Social Media",
//   "skills_heading": "Skills",
//   "language_heading": "Languages",
//   "hobbies_heading": "Hobbies",
//   "address": {
//     "address": "123 Main St",
//     "postal_code": "12345",
//     "country": "USA",
//     "city": "Anytown",
//     "driving_license": "123456789",
//     "nationality": "American",
//     "place_of_birth": "Anytown",
//     "is_active": true
//   },
//   "experience": [
//     {
//       "job_title": "Software Engineer",
//       "employer": "ABC Inc.",
//       "start_date": "2018-05-07T15:01:22",
//       "end_date": "2018-05-07T15:01:22",
//       "city": "Anytown",
//       "country": "USA",
//       "description": "Worked on various projects...",
//       "current_status": false,
//       "is_active": true
//     },
//     {
//       "job_title": "Senior Software Engineer",
//       "employer": "XYZ Corp.",
//       "start_date": "2018-05-07T15:01:22",
//       "end_date": null,
//       "city": "Anytown",
//       "country": "USA",
//       "description": "Leading a team of developers...",
//       "current_status": true,
//       "is_active": true
//     }
//   ],
//   "education": [
//     {
//       "course": "Computer Science",
//       "institution": "University XYZ",
//       "start_date": "2018-05-07T15:01:22",
//       "end_date": "2018-05-07T15:01:22",
//       "city": "Big City",
//       "country": "USA",
//       "description": "Bachelor's degree in Computer Science...",
//       "current_status": false,
//       "is_active": true
//     }
//   ],
//   "certificate": [
//     {
//       "label": "Certificate 1",
//       "url": "https://example.com/certificate1"
//     },
//     {
//       "label": "Certificate 2",
//       "url": "https://example.com/certificate2"
//     }
//   ],
//   "social_media": [
//     {
//       "label": "LinkedIn",
//       "url": "https://linkedin.com/in/johndoe",
//       "is_active": true
//     },
//     {
//       "label": "GitHub",
//       "url": "https://github.com/johndoe",
//       "is_active": true
//     }
//   ],
//   "skills": [
//     {
//       "label": "Python",
//       "rating": 5,
//       "is_active": true
//     },
//     {
//       "label": "JavaScript",
//       "rating": 4,
//       "is_active": true
//     }
//   ],
//   "language": [
//     {
//       "label": "English",
//       "rating": 5,
//       "is_active": true
//     },
//     {
//       "language": "Spanish",
//       "rating": 3,
//       "is_active": true
//     }
//   ],
//   "hobbies": [
//     {
//       "hobbies": "Reading",
//       "is_active": true
//     },
//     {
//       "hobbies": "Gardening",
//       "is_active": true
//     }
//   ]
// }


