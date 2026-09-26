# Issue Tracker

A full-stack issue tracking application built with Next.js, TypeScript, Prisma and MySQL.

## Live Demo

[View the live application](https://issue-tracker-mu-ten.vercel.app/)

## Features

* Create, edit, and delete issues
* View issue details
* Assign issues to users
* Filter issues by status
* Sort issues by title, status, and creation date
* Browse issues with pagination
* Markdown editor for issue descriptions
* Form validation
* Google authentication
* Responsive UI
* Toast notifications

## Tech Stack

* React 19
* Next.js 16
* TypeScript
* Prisma 7
* MySQL
* NextAuth.js
* Tailwind CSS
* Radix UI
* React Query
* React Hook Form
* Zod
* Axios
* React Markdown
* EasyMDE

## Getting Started

Clone the repository and install dependencies:

```bash
git clone https://github.com/yanakarpovych/nextjs-typescript-prisma-mysql-radix-tailwind.git
cd nextjs-typescript-prisma-mysql-radix-tailwind
npm install
```

Create a `.env` file with the required environment variables:

```env
DATABASE_URL="your-mysql-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

Generate Prisma Client and apply the database migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Deployment

Deployed with Vercel and connected to a MySQL database hosted on Aiven.