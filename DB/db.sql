
CREATE TABLE
  restaurants (
    id integer primary key generated always as identity,
    restaurants_name VARCHAR(75) NOT NULL,
    address_location VARCHAR(75) NOT NULL,
    city VARCHAR(75) NOT NULL,
    zipcode CHAR(5) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT date_trunc('second', now()::timestamp), 
    updated_at timestamp with time zone NOT NULL DEFAULT date_trunc('second', now()::timestamp),
    about TEXT
  );

CREATE TABLE 
  yelp_users (
    id integer  primary key generated always as identity,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    email  VARCHAR(254) UNIQUE NOT NULL,
    passhash VARCHAR(254) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT date_trunc('second', now()::timestamp), 
    updated_at timestamp with time zone NOT NULL DEFAULT date_trunc('second', now()::timestamp)
  );



CREATE TABLE user_sessions(
  sid TEXT NOT NULL, 
  sess json NOT NULL, 
  expire timestamp without time zone NOT NULL;
);

  CREATE TABLE 
  yelp_admin (
    id integer generated always as identity,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    middle_name VARCHAR(60),
    email VARCHAR(254) NOT NULL,
    passhash VARCHAR(254) NOT NULL,
   created_at timestamp with time zone NOT NULL DEFAULT date_trunc('second', now()::timestamp), 
    updated_at timestamp with time zone NOT NULL DEFAULT date_trunc('second', now()::timestamp)
  );



TRANSACTIONAL EXAMPLE
  BEGIN
  
  
  COMMIT

-- price range and rating should be its own tabe
-- restaraunt id user id rating value

CREATE TABLE
  price_range(
    user_id INTEGER REFERENCES yelp_users ON DELETE CASCADE NOT NULL,
    restaurants_id INTEGER REFERENCES restaurants ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id,restaurants_id),
    price INTEGER NOT NULL CHECK (price>=1 and price<=5)
);

CREATE TABLE
  ratings(
    user_id INTEGER REFERENCES yelp_users ON DELETE CASCADE NOT NULL,
    restaurants_id INTEGER REFERENCES restaurants ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id,restaurants_id),
    rating INTEGER NOT NULL CHECK (rating>=1 and rating<=5)
);

CREATE TABLE
  user_favorites(
    user_id INTEGER REFERENCES yelp_users ON DELETE CASCADE NOT NULL,
    restaurants_id INTEGER REFERENCES restaurants ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id,restaurants_id)
  );



-- comment table do not cascade on user maybe on restaurant but lets think of this more




--toy trigger updates updated_at time column
CREATE OR REPLACE FUNCTION log_users_updated_at()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW.first_name IS DISTINCT FROM OLD.first_name
    OR NEW.last_name IS DISTINCT FROM OLD.last_name
    OR NEW.email IS DISTINCT FROM OLD.email
    OR NEW.passhash IS DISTINCT FROM OLD.passhash
  THEN
    NEW.updated_at := date_trunc('second', now()::timestamp);
	END IF;
	RETURN NEW;
END;
$$;


CREATE TRIGGER trigger_log_users_updated_at
  BEFORE UPDATE ON yelp_users
  FOR EACH ROW
  EXECUTE PROCEDURE log_users_updated_at();


CREATE OR REPLACE FUNCTION log_restaurants_updated_at()
  RETURNS TRIGGER 
  LANGUAGE PLPGSQL
  AS
$$
BEGIN 
	IF NEW.restaurants_name IS DISTINCT FROM OLD.restaurants_name
    OR NEW.address_location IS DISTINCT FROM OLD.address_location
    OR NEW.city IS DISTINCT FROM OLD.city
    OR NEW.zipcode IS DISTINCT FROM OLD.zipcode
    OR NEW.about IS DISTINCT FROM OLD.about
  THEN
    NEW.updated_at := date_trunc('second', now()::timestamp);
	END IF;
	RETURN NEW;
END;
$$;

CREATE  TRIGGER trigger_log_restaurants_updated_at
  BEFORE UPDATE ON restaurants
  FOR EACH ROW
  EXECUTE PROCEDURE log_restaurants_updated_at();


insert into yelp_users (first_name, last_name, middle_name, email, passhash) values ('Yvette', 'Mannock', 'Jere', 'sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi', 'sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet');
insert into yelp_users (first_name, last_name, middle_name, email, passhash) values ('Giorgia', 'Bellenie', 'Allix', 'iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo', 'convallis nulla neque libero convallis eget eleifend luctus ultricies eu');
insert into yelp_users (first_name, last_name, middle_name, email, passhash) values ('Leona', 'Signore', 'Barn', 'elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam', 'integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo');


insert into user_favorites (user_id, restaurants_id) values (1,2);

insert into user_favorites (first_name, last_name, middle_name, email, passhash) values ('Giorgia', 'Bellenie', 'Allix', 'iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo', 'convallis nulla neque libero convallis eget eleifend luctus ultricies eu');