CREATE DATABASE products;

USE products;

CREATE TABLE product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan TEXT,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  default_price VARCHAR(10) NOT NULL
);

CREATE TABLE features (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id),
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50),
);

CREATE TABLE styles (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id),
  name VARCHAR(100) NOT NULL,
  sale_price VARCHAR(10),
  original_price VARCHAR(10) NOT NULL,
  'default?' BOOLEAN NOT NULL
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  style_id INT REFERENCES style(id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE skus (
  id SERIAL PRIMARY KEY,
  style_id INT REFERENCES style(id),
  size VARCHAR(5),
  quantity INT
);

CREATE TABLE related (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id),
  related_id INT NOT NULL
);
