# School Management API

## Overview

This is a Node.js-based REST API that allows users to add schools and list them based on their proximity to a given location. The API uses **Prisma ORM** with **PostgreSQL** as the database and **Zod** for data validation.

## Features

- **Add School**: Adds a school with name, address, latitude, and longitude.
- **List Schools**: Returns a sorted list of schools based on proximity to the user's location.
- **Data Validation**: Ensures valid inputs using Zod.
- **Database Integration**: Uses Prisma ORM with PostgreSQL.

## Tech Stack

- **Backend**: Node.js, Express.js
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (>= v16)
- PostgreSQL
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/school-management-api.git
   cd school-management-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up environment variables:
   Create a `.env` file and configure your PostgreSQL database:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/school_db"
   PORT=4000
   ```
4. Run database migrations:
   ```sh
   npx prisma migrate dev --name init
   ```

### Running the Server

Start the server with:

```sh
npm start
```

The server should now be running on `http://localhost:4000`.

## API Endpoints

### 1. Add School

**Endpoint:** `POST /addSchool`

**Request Body:**

```json
{
  "name": "NIIT Park Street",
  "address": "14, Park Street, Kolkata, West Bengal 700016",
  "latitude": 22.5531,
  "longitude": 88.3516
}
```

**Response:**

```json
{
  "message": "School added successfully",
  "school": { ... }
}
```

### 2. List Schools

**Endpoint:** `GET /listSchools?lat=22.5726&lon=88.3639`

**Response:**

```json
[
  {
    "id": 1,
    "name": "NIIT Park Street",
    "address": "14, Park Street, Kolkata, West Bengal 700016",
    "latitude": 22.5531,
    "longitude": 88.3516,
    "distance": 2.5
  }
]
```

## Testing with Postman

- Import the provided **Postman collection**.
- Test the **Add School** and **List Schools** APIs.
