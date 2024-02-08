CREATE MIGRATION m1sbqw7db4wcqs2ny2s6gsqir577txsypfsdavotsb5573mtl2o6cq
    ONTO initial
{
  CREATE TYPE default::Address {
      CREATE PROPERTY address: std::str;
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY country: std::str;
      CREATE PROPERTY driving_license: std::str;
      CREATE REQUIRED PROPERTY is_active: std::bool;
      CREATE PROPERTY nationality: std::str;
      CREATE PROPERTY place_of_birth: std::str;
      CREATE PROPERTY postal_code: std::str;
  };
  CREATE TYPE default::Certificate {
      CREATE PROPERTY label: std::str;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::Education {
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY country: std::str;
      CREATE PROPERTY course: std::str;
      CREATE PROPERTY current_status: std::bool;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY end_date: cal::local_datetime;
      CREATE PROPERTY institution: std::str;
      CREATE REQUIRED PROPERTY is_active: std::bool;
      CREATE PROPERTY start_date: cal::local_datetime;
  };
  CREATE TYPE default::Experience {
      CREATE PROPERTY city: std::str;
      CREATE PROPERTY country: std::str;
      CREATE PROPERTY current_status: std::bool;
      CREATE PROPERTY description: std::str;
      CREATE PROPERTY employer: std::str;
      CREATE PROPERTY end_date: cal::local_datetime;
      CREATE REQUIRED PROPERTY is_active: std::bool;
      CREATE PROPERTY job_title: std::str;
      CREATE PROPERTY start_date: cal::local_datetime;
  };
  CREATE TYPE default::Hobbies {
      CREATE PROPERTY hobbies: std::str;
      CREATE REQUIRED PROPERTY is_active: std::bool;
  };
  CREATE TYPE default::Language {
      CREATE REQUIRED PROPERTY is_active: std::bool;
      CREATE PROPERTY language: std::str;
      CREATE PROPERTY rating: std::int64;
  };
  CREATE TYPE default::Skills {
      CREATE REQUIRED PROPERTY is_active: std::bool;
      CREATE PROPERTY label: std::str;
      CREATE PROPERTY rating: std::int64;
  };
  CREATE TYPE default::SocialMedia {
      CREATE REQUIRED PROPERTY is_active: std::bool;
      CREATE PROPERTY label: std::str;
      CREATE PROPERTY url: std::str;
  };
  CREATE TYPE default::UserDetails {
      CREATE LINK address: default::Address;
      CREATE MULTI LINK certificate: default::Certificate;
      CREATE MULTI LINK education: default::Education;
      CREATE MULTI LINK experience: default::Experience;
      CREATE MULTI LINK hobbies: default::Hobbies;
      CREATE MULTI LINK language: default::Language;
      CREATE MULTI LINK skills: default::Skills;
      CREATE MULTI LINK social_media: default::SocialMedia;
      CREATE PROPERTY certificate_heading: std::str;
      CREATE PROPERTY dob: cal::local_datetime;
      CREATE PROPERTY education_heading: std::str;
      CREATE PROPERTY email: std::str;
      CREATE PROPERTY experience_heading: std::str;
      CREATE PROPERTY first_name: std::str;
      CREATE PROPERTY hobbies_heading: std::str;
      CREATE PROPERTY job_title: std::str;
      CREATE PROPERTY language_heading: std::str;
      CREATE PROPERTY last_name: std::str;
      CREATE PROPERTY phone: std::str;
      CREATE PROPERTY profile_description: std::str;
      CREATE PROPERTY reference_heading: std::str;
      CREATE PROPERTY skills_heading: std::str;
      CREATE PROPERTY social_media_heading: std::str;
  };
};
