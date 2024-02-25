CREATE MIGRATION m1zelduxlvklphfworc4mml66fv5udqjtyjqohdostphadmqz62p5q
    ONTO m1b2vwlgwnpqha4gpungywphrb4un5gkgcyojrihjkf65euj6y57ea
{
  ALTER TYPE default::Education {
      ALTER PROPERTY end_date {
          SET TYPE std::str USING (<std::str>.end_date);
      };
      ALTER PROPERTY start_date {
          SET TYPE std::str USING (<std::str>.start_date);
      };
  };
  ALTER TYPE default::Experience {
      ALTER PROPERTY end_date {
          SET TYPE std::str USING (<std::str>.end_date);
      };
      ALTER PROPERTY start_date {
          SET TYPE std::str USING (<std::str>.start_date);
      };
  };
  ALTER TYPE default::UserDetails {
      ALTER PROPERTY dob {
          SET TYPE std::str USING (<std::str>.dob);
      };
  };
};
