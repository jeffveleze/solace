# Advocates Directory

An application for viewing and filtering healthcare advocates.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL or compatible database

### Installation

1. Install dependencies
   ```bash
   npm i
   ```

2. Create a `.env` file at the root of project following the `.env.sample` example

3. Create a `solaceassignment` database using `psql` or your preferred tool

4. Push migration to the database
   ```bash
   npx drizzle-kit push
   ```
   This will set up your database schema

5. Seed the database
   ```bash
   curl -X POST http://localhost:3000/api/seed
   ```
   This will populate your database advocates table with data

6. Run the development server
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Features

- View healthcare advocates
- Filter advocates by name, location, and credentials

## Technologies

- Next.js
- Drizzle ORM
- TypeScript
- Tailwind CSS
