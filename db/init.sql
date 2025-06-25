CREATE TABLE IF NOT EXISTS apartments (
  id           BIGSERIAL PRIMARY KEY,
  unit_name    VARCHAR(64)  NOT NULL,
  unit_number  VARCHAR(32)  NOT NULL,
  project_name VARCHAR(128) NOT NULL,
  price        BIGINT       NOT NULL CHECK (price > 0),
  area         INT          CHECK (area > 0),
  bedrooms     SMALLINT     CHECK (bedrooms >= 0),
  bathrooms    SMALLINT     CHECK (bathrooms >= 0),
  comm_number  VARCHAR(15)  NOT NULL CHECK (comm_number ~ '^[0-9]{9,15}$'),
  created_at   TIMESTAMPTZ  DEFAULT now(),
  UNIQUE (project_name, unit_number)
);
