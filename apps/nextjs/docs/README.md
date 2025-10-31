# Next.js Application

This is the main web application of the monorepo, built with Next.js. The folder is named `nextjs` to clearly indicate the framework being used, which helps with identifying the technology at a glance, especially in monorepos with multiple applications.

## Application Structure

The Next.js application is organized as follows:

```
apps/nextjs/
├── public/             # Static assets
├── src/
│   ├── app/            # Next.js App Router structure
│   │   ├── _components/  # App-specific components
│   │   ├── api/        # API routes
│   │   │   ├── panel/    # tRPC UI panel
│   │   │   └── trpc/     # tRPC API endpoints
│   │   ├── layout.tsx  # Root layout
│   │   └── page.tsx    # Home page
│   ├── env.ts         # Environment variable validation
│   ├── middleware.ts  # Next.js middleware (for auth)
│   └── trpc/          # tRPC client configuration
```

## Features

- **Next.js 15** with App Router and [Server Components](./server-components.md)
- **React 19** for UI components
- **Tailwind CSS** for styling
- **tRPC** for end-to-end type-safe API
- **Clerk** for authentication
- Integration with shared packages from the monorepo

## Key Files

- `src/app/layout.tsx`: The root layout that wraps all pages
- `src/app/page.tsx`: The home page component
- `src/trpc/server.tsx`: tRPC server setup with procedure definitions
- `src/env.ts`: Environment variable validation using zod

## Local Development

### 1. Install Dependencies

```bash
# From repository root
pnpm i

# Configure environment variables
cp .env.example .env
```

### 2. Run the Web App

```bash
cd apps/nextjs
pnpm dev
```

## Documentation

- [Server Components with tRPC](./server-components.md) - Learn how to properly use React Server Components with tRPC
- [Vercel Deployment](./vercel-deployment.md) - Guide for deploying to Vercel

## Related Documentation

- [API Package](../../packages/api/README.md) - tRPC API layer
- [Database Package](../../packages/db/README.md) - MongoDB models and connections
- [UI Package](../../packages/ui/README.md) - Shared UI components
