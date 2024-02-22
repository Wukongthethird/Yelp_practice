-- CREATE TABLE products(
--   id integer UNIQUE NOT NULL,
--   product_name VARCHAR(70),
--   price integer,
--   on_sale BOOLEAN
-- );
-- ALTER TABLE products ADD COLUMN featured BOOLEAN;
-- ALTER TABLE products DROP COLUMN featured;

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

INSERT INTO
  restaurants (
    restaurants_name,
    address_location,
    city,
    zipcode, 
    price_range
  )
values
  (
    'wing lung',
    '2460 san bruno ave',
    'San Francisco',
    '94134',
    1
  );