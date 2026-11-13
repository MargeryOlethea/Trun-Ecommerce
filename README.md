# Trun Ecommerce

A full-stack ecommerce prototype built with the Next.js App Router, TypeScript, MongoDB, and Tailwind CSS.

**Live demo:** [trun-ch2.vercel.app](https://trun-ch2.vercel.app)

> [!NOTE]
> This is an independent educational project. It is not affiliated with, endorsed by, or operated by Nike. Product names and imagery are used only to demonstrate an ecommerce interface.

## Features

- Product catalogue and product detail pages
- Search and infinite scrolling
- Account registration and login
- JWT-backed route protection
- Per-user wishlist management
- Responsive server- and client-rendered interfaces

## Architecture

Trun keeps the web interface and API in one Next.js application:

- `src/app/`: pages, components, server actions, and route handlers
- `src/db/`: MongoDB connection, models, password hashing, and JWT helpers
- `src/middleware.ts`: authentication for wishlist API routes

Zod validates login and registration input, bcrypt hashes passwords, and signed HTTP-only cookies identify authenticated users.

## Run locally

Requirements:

- Node.js 20+
- npm
- MongoDB

```sh
git clone https://github.com/MargeryOlethea/Trun-Ecommerce.git
cd Trun-Ecommerce
cp env-template.txt .env.local
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

```dotenv
MONGODB_CONNECTION_STRING=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=trun
JWT_SECRET_KEY=replace_with_a_long_random_value
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Never commit real credentials. Use a different JWT secret in every deployed environment.

## Quality checks

```sh
npm run lint
npm run build
```

## Project status

I built Trun on my own, interface and API. It is a prototype: it does not process real orders or payments.
