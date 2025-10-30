# Environment Variables

This document lists all environment variables used across the monorepo.

## Required Variables

| Variable                 | Description                               | Used In           |
| ------------------------ | ----------------------------------------- | ----------------- |
| `MONGODB_URI`            | MongoDB connection string                 | All apps          |
| `CLERK_SECRET_KEY`       | Clerk authentication secret               | Server-side       |
| `CLERK_PUBLISHABLE_KEY`  | Clerk authentication public key           | Client-side       |

## Optional Variables

| Variable           | Description                     | Default  | Used In |
| ------------------ | ------------------------------- | -------- | ------- |
| `ENABLE_ANALYTICS` | Enable usage analytics          | `false`  | Next.js |
| `LOG_LEVEL`        | Server logging verbosity        | `"info"` | API     |

## Setting Up Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Fill in the required variables with your values

3. Never commit `.env` files to version control

## Environment Variable Validation

The Next.js app uses Zod schemas to validate environment variables at build time. See `apps/nextjs/src/env.ts` for the validation logic.

## Related Documentation

- [Clerk Setup](../services/clerk.md) - Setting up Clerk authentication
- [Database Setup](../../packages/db/README.md) - MongoDB connection configuration
