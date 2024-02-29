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
    passhash VARCHAR(254) NOT NULL,
    is_admin BOOLEAN DEFAULT false
  );



CREATE TABLE
  user_favorites(
    user_id INTEGER REFERENCES yelp_users ON DELETE CASCADE NOT NULL,
    restaurants_id INTEGER REFERENCES restaurants ON DELETE CASCADE NOT NULL,
    PRIMARY KEY (user_id,restaurants_id)
  );

  CREATE TABLE 
  yelp_admin (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(60) NOT NULL,
    middle_name VARCHAR(60),
    email VARCHAR(254) NOT NULL,
    passhash VARCHAR(254) NOT NULL,
    is_admin BOOLEAN NOT NULL
  );



insert into yelp_users (first_name, last_name, middle_name, email, passhash) values ('Yvette', 'Mannock', 'Jere', 'sit amet lobortis sapien sapien non mi integer ac neque duis bibendum morbi', 'sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet');
insert into yelp_users (first_name, last_name, middle_name, email, passhash) values ('Giorgia', 'Bellenie', 'Allix', 'iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo', 'convallis nulla neque libero convallis eget eleifend luctus ultricies eu');
insert into yelp_users (first_name, last_name, middle_name, email, passhash) values ('Leona', 'Signore', 'Barn', 'elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis diam', 'integer a nibh in quis justo maecenas rhoncus aliquam lacus morbi quis tortor id nulla ultrices aliquet maecenas leo');


insert into user_favorites (user_id, restaurants_id) values (1,2);

insert into user_favorites (first_name, last_name, middle_name, email, passhash) values ('Giorgia', 'Bellenie', 'Allix', 'iaculis diam erat fermentum justo nec condimentum neque sapien placerat ante nulla justo', 'convallis nulla neque libero convallis eget eleifend luctus ultricies eu');