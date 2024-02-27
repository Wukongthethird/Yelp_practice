-- should be big int for primary key
CREATE TABLE
  restaurants (
    id SERIAL PRIMARY KEY,
    restaurants_name VARCHAR(75) NOT NULL,
    address_location VARCHAR(75) NOT NULL,
    city VARCHAR(75) NOT NULL,
    zipcode CHAR(5) NOT NULL,
    price_range INTEGER NOT NULL check(price_range>=0 and price_range<=5)
  );


-- store password as salt hash bcrypt? do it on server side--
CREATE TABLE 
  yelp_users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    middle_name VARCHAR(60),
    email VARCHAR(254) NOT NULL,
    passhash VARCHAR(254) NOT NULL
  );



CREATE TABLE
  user_favorites(
    user_id INTEGER REFERENCES yelp_users ON DELETE CASCADE NOT NULL,
    restaurants_id INTEGER REFERENCES restaurants ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id,restaurants_id)
  );
