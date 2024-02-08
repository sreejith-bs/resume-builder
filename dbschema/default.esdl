module default {
 type UserDetails {
       job_title: str;
       first_name: str;
       last_name: str;
       email: str;
       phone: str;
       dob: cal::local_datetime;
       profile_description: str;
       experience_heading: str;
       education_heading: str;
       certificate_heading: str;
       social_media_heading: str;
       skills_heading: str;
       language_heading: str;
       hobbies_heading: str;
       reference_heading: str;
       address: Address;
       multi certificate: Certificate;
       multi experience: Experience;
       multi education: Education;
       multi social_media: SocialMedia;
       multi skills: Skills;
       multi language: Language;
       multi hobbies: Hobbies;
   }
   type Address {
       address: str;
       postal_code: str;
       country: str;
       city: str;
       driving_license: str;
       nationality: str;
       place_of_birth: str;
       required is_active: bool;
   }
   type Experience {
       job_title: str;
       employer: str;
       start_date: cal::local_datetime;
       end_date: cal::local_datetime;
       city: str;
       country: str;
       description: str;
       current_status: bool;
       required is_active: bool;
   }
   type Education {
       course: str;
       institution: str;
       start_date: cal::local_datetime;
       end_date: cal::local_datetime;
       city: str;
       country: str;
       description: str;
       current_status: bool;
       required is_active: bool;
   }
   type Certificate {
    label: str;
    url: str;
   }
   type SocialMedia {
       label: str;
       url: str;
       required is_active: bool;
   }
   type Skills {
       label: str;
       rating: int64;
       required is_active: bool;
   }
   type Language {
       language: str;
       rating: int64;
       required is_active: bool;
   }
   type Hobbies {
       hobbies: str;
       required is_active: bool;
   }
}
