# Flatfolio 🏙️

Flatfolio is a full‑stack web application for listing, searching and managing apartment units.
It is designed as a learning project to practise **TypeScript**, **Node.js/Express**, **Next.js 14**, **PostgreSQL**, and **Docker Compose** in a single monorepo.

---

## Table of contents

1. [Features](#features)
2. [Architecture](#architecture)
3. [Running with Docker Compose](#running-with-docker-compose)
4. [Environment variables](#environment-variables)
5. [API reference](#api-reference)
6. [Database schema](#database-schema)

---

## Features

| Category             | Details                                                                  |
| -------------------- | ------------------------------------------------------------------------ |
| **Listings**         | Create, read, filter & paginate apartments.                              |
| **Search**           | Live full–text search across `unit_name`, `unit_number`, `project_name`. |
| **Advanced filters** | Price range, bedrooms, area, project, etc. Apply via _Apply Filters_.    |
| **Responsive UI**    | Built with **Next.js 14 App Router** + **Tailwind CSS**.                 |
| **API**              | RESTful JSON API secured with validation middleware.                     |
| **Docker‐first**     | One‑command spin‑up via `docker-compose up --build`.                     |
| **Type‑safe**        | End‑to‑end TypeScript.                                                   |

---

## Architecture

```
flatfolio/
├── backend/              # Node.js + TypeScript service
│   ├── src/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/       # (SQL helpers)
│   │   ├── routes/
│   │   ├── services/
│   │   └── index.ts
│   ├── Dockerfile
│   └── tsconfig.json
├── frontend/             # Next.js 14 + Tailwind UI
│   ├── src/
|   │   ├── components/
|   │   ├── lib/
|   │   ├── pages/ or app/
|   │   ├── public/
│   └── Dockerfile
├── docker-compose.yml
└── README.md             # ← you are here
```

**Ports**

- Front‑end: **3000**
- Back‑end: **4000**
- PostgreSQL: **5432**

---

## Running with Docker Compose

```bash
# From repo root
$ docker compose up --build

# Stop + remove containers
$ docker compose down -v
```

_Configuration is in **docker‑compose.yml**;_

---

## Environment variables

Create a `.env` file (`/flatfolio/.env`) by copying from the ".env.example":

```bash
$ cp .env.example .env
```

### Environment Variables

| Variable                  | Default                     | Description                       |
| ------------------------- | --------------------------- | --------------------------------- |
| `DB_USER`                 | `flatfolio_app`             | PostgreSQL username               |
| `DB_PASSWORD`             | `flatfolio_password`        | PostgreSQL password (dev only)    |
| `DB_NAME`                 | `flatfolio_db`              | Name of the database              |
| `DB_PORT`                 | `5432`                      | PostgreSQL port                   |
| `DB_HOST`                 | `db`                        | Hostname (Docker service name)    |
| `BACKEND_PORT`            | `4000`                      | Port the backend server runs on   |
| `FRONTEND_PORT`           | `3000`                      | Port the frontend dev server uses |
| `NEXT_PUBLIC_BACKEND_URL` | `http://localhost:4000/api` | API base URL used by the frontend |

---

## API reference

> Base URL (dev): **[http://localhost:4000/api/](http://localhost:4000/api/)**

### List apartments

```http
GET /apartments?search=q&project_name=Sky+Gardens&priceMin=1000000&priceMax=2000000&page=1&pageSize=20
```

| Query parameters            | Type   | Description                                       |
| --------------------------- | ------ | ------------------------------------------------- |
| `search`                    | string | Full‑text live search across name/number/project. |
| `project_name`              | string | partial match.                                    |
| `unit_name` / `unit_number` | string | partial match.                                    |
| `priceMin` / `priceMax`     | number | Egyptian Pound (EGP).                             |

**Response 200**

```json
{
  "data": [
    {
      "id": 1,
      "unit_name": "Palm Hills Apartment",
      "unit_number": "PH-204",
      "project_name": "Palm Hills",
      "area": 180,
      "price": 8500000,
      "bedrooms": 3,
      "bathrooms": 2,
      "comm_number": "01234567899",
      "created_at": "2025-06-23T18:51:46.925Z"
    }
  ]
}
```

### Create apartment

```http
POST /apartments
Content-Type: application/json

{
    "unit_name": "Palm Hills Apartment",
    "unit_number": "PH-204",
    "project_name": "Palm Hills",
    "area": 180,
    "price": 8500000,
    "bedrooms": 3,
    "bathrooms": 2,
    "comm_number": "01234567899"
}
```

| Status              | Meaning                                     |
| ------------------- | ------------------------------------------- |
| **201 Created**     | Success – returns the newly created object. |
| **400 Bad Request** | Validation failed (see `error.details`).    |

### Global error schema

All errors follow this shape:

```json
{
  "error": {
    "message": "Validation failed",
    "details": [{ "field": "price", "error": "must be > 0" }]
  }
}
```

## Database schema

```
CREATE TABLE apartments (
  id SERIAL PRIMARY KEY,
  unit_name      VARCHAR(64)  NOT NULL,
  unit_number    VARCHAR(32)  NOT NULL,
  project_name   VARCHAR(128) NOT NULL,
  price          INT          NOT NULL  CHECK (price > 0),
  area           INT,                     -- m²
  bedrooms       INT,
  bathrooms      INT,
  comm_number    VARCHAR(15)  NOT NULL  CHECK (comm_number ~ '^[0-9]{9,15}$')
);
```
