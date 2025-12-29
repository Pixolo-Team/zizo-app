# Zizo App

A modern Next.js application built with TypeScript and Tailwind CSS for managing football tournaments.

## Features

- ⚡ Built with Next.js 16.1.1 and React 19
- 🎨 Styled with Tailwind CSS v4
- 📘 TypeScript for type safety
- ✨ ESLint configured with TypeScript best practices
- 💅 Prettier for consistent code formatting
- 🚀 Ready for Vercel deployment

## Pages

- `/` - Home page
- `/football-tournaments` - List of all football tournaments
- `/football-tournaments/[tournament-id]` - Individual tournament details

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check if code is formatted correctly

## Tech Stack

- **Framework:** Next.js 16.1.1 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Linting:** ESLint 9 with Next.js and TypeScript configs
- **Formatting:** Prettier 3.7
- **Deployment:** Vercel

## Project Structure

```
zizo-app/
├── src/
│   └── app/
│       ├── football-tournaments/
│       │   ├── [tournament-id]/
│       │   │   ├── page.tsx
│       │   │   └── not-found.tsx
│       │   └── page.tsx
│       ├── layout.tsx
│       ├── page.tsx
│       └── globals.css
├── public/
├── .prettierrc
├── eslint.config.mjs
├── next.config.ts
├── tsconfig.json
└── vercel.json
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

This project includes a `vercel.json` configuration file for seamless deployment.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
