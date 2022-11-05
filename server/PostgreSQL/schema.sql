DROP DATABASE products;

CREATE DATABASE products;

\c products;

CREATE TABLE IF NOT EXISTS product (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slogan TEXT,
  description TEXT,
  category VARCHAR(50) NOT NULL,
  default_price VARCHAR(10) NOT NULL
);

CREATE TABLE IF NOT EXISTS features (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id),
  feature VARCHAR(50) NOT NULL,
  value VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS styles (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id),
  name VARCHAR(100) NOT NULL,
  sale_price VARCHAR(10),
  original_price VARCHAR(10) NOT NULL,
  default_style BOOLEAN NOT NULL
);

CREATE TABLE IF NOT EXISTS photos (
  id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles(id),
  url TEXT,
  thumbnail_url TEXT
);

CREATE TABLE IF NOT EXISTS skus (
  id SERIAL PRIMARY KEY,
  style_id INT REFERENCES styles(id),
  size VARCHAR(10),
  quantity INT
);

CREATE TABLE IF NOT EXISTS related (
  id SERIAL PRIMARY KEY,
  product_id INT REFERENCES product(id),
  related_id INT NOT NULL
);

CREATE INDEX product_index ON product(id);
CREATE INDEX features_index ON features(product_id);
CREATE INDEX styles_index ON styles(product_id);
CREATE INDEX photos_index ON photos(style_id);
CREATE INDEX skus_index ON skus(style_id);
CREATE INDEX related_index ON related(product_id);

\COPY product FROM 'data/product.csv' DELIMITER ',' CSV HEADER;
\COPY features FROM 'data/features.csv' DELIMITER ',' CSV HEADER;
\COPY styles FROM 'data/styles.csv' DELIMITER ',' CSV HEADER;
\COPY photos FROM 'data/photos.csv' DELIMITER ',' CSV HEADER;
\COPY skus FROM 'data/skus.csv' DELIMITER ',' CSV HEADER;
\COPY related FROM 'data/related.csv' DELIMITER ',' CSV HEADER;
