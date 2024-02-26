module default {
 type UserDetails {
       theme: str;
       job_title: str;
       first_name: str;
       last_name: str;
       email: str;
       phone: str;
       date_of_birth: str;
       profile_description: str;
       user_details_heading: str;
       profile_heading: str;
       experience_heading: str;
       education_heading: str;
       certificate_heading: str;
       social_media_heading: str;
       skills_heading: str;
       language_heading: str;
       hobbies_heading: str;
       address: Address {
        on source delete delete target
       }
       multi certificate: Certificate {
        on source delete delete target
       }
       multi experience: Experience {
        on source delete delete target
       }
       multi education: Education {
        on source delete delete target
       }
       multi social_media: SocialMedia {
        on source delete delete target
       }
       multi skills: Skills {
        on source delete delete target
       }
       multi language: Language {
        on source delete delete target
       }
       hobbies: Hobbies {
        on source delete delete target
       }
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
       start_date: str;
       end_date: str;
       city: str;
       country: str;
       description: str;
       current_status: bool;
       required is_active: bool;
   }
   type Education {
       course: str;
       institution: str;
       start_date: str;
       end_date: str;
       city: str;
       country: str;
       description: str;
       current_status: bool;
       required is_active: bool;
   }
   type Certificate {
    label: str;
    url: str;
    required is_active: bool;
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
       label: str;
       rating: int64;
       required is_active: bool;
   }
   type Hobbies {
       label: str;
       required is_active: bool;
   }
}