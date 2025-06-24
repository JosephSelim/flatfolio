CREATE TABLE IF NOT EXISTS apartments (
  id SERIAL PRIMARY KEY,
  unit_name      VARCHAR(64)  NOT NULL,
  unit_number    VARCHAR(32)  NOT NULL,
  project_name   VARCHAR(128) NOT NULL,
  price          INT          NOT NULL  CHECK (price > 0),
  area           INT,                     -- m²
  bedrooms       INT,
  bathrooms      INT,
  comm_number    VARCHAR(15)  NOT NULL  CHECK (comm_number ~ '^[0-9]{9,15}$'),
  created_at     TIMESTAMPTZ DEFAULT now()
);