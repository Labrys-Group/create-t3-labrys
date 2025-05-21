# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development

```bash
# Install dependencies
pnpm i

# Copy the example env file and modify as needed
cp .env.example .env

# Start all applications
pnpm dev

# Start only the Next.js app
pnpm dev:next

# Start the documentation site
cd apps/docusaurus
pnpm start

# Start Expo app (iOS)
cd apps/expo
pnpm dev:ios

# Start Expo app (Android)
cd apps/expo
pnpm dev:android
```

### Building

```bash
# Build all applications
pnpm build

# Build a specific app
pnpm -F @acme/nextjs build
pnpm -F @acme/expo build
pnpm -F docusaurus build
```

### Testing

```bash
# Run all tests
pnpm -F @acme/nextjs test

# Run tests in watch mode
pnpm -F @acme/nextjs test -- --watch
```

### Linting & Formatting

```bash
# Run ESLint
pnpm lint

# Fix ESLint issues
pnpm lint:fix

# Check formatting
pnpm format

# Fix formatting issues
pnpm format:fix

# Check types
pnpm typecheck

# Check workspace dependencies
pnpm lint:ws
```

### Database

```bash
# Push schema changes to the database
pnpm db:push

# Open MongoDB studio
pnpm db:studio
```

### UI Components

```bash
# Add a new UI component using shadcn/ui CLI
pnpm ui-add
```

### Package Creation

```bash
# Generate a new package
pnpm turbo gen init
```

## Architecture

### Monorepo Structure

This repository is a T3 stack monorepo built with Turborepo, consisting of:

1. **Apps**:
   - **nextjs**: Main web application (Next.js 14, React 19)
   - **expo**: Mobile application (Expo, React Native) [optional]
   - **docusaurus**: Docusaurus site with project documentation

2. **Packages**:
   - **api**: tRPC router definitions
   - **db**: Database models and connections (MongoDB)
   - **ui**: Shared UI components (shadcn/ui)
   - **validators**: Zod schemas for validation

3. **Tooling**:
   - Shared configurations for ESLint, Prettier, TypeScript, etc.

### Key Technologies

- **Frontend**: Next.js 14, React 19, Tailwind CSS
- **Mobile**: Expo, React Native, NativeWind
- **API**: tRPC v11 for type-safe API calls
- **Database**: MongoDB with mongoose/typegoose
- **Authentication**: Clerk
- **Documentation**: Docusaurus
- **Build System**: Turborepo

### API & Data Flow

1. The application uses tRPC for type-safe API communication between client and server
2. Database models use typegoose for type-safe schema definitions
3. API procedures are divided into:
   - `publicProcedure`: Available to all users
   - `protectedProcedure`: Requires authentication

### Authentication

- Uses Clerk for authentication in both web and mobile apps
- Protected routes and procedures use Clerk auth context
- Mobile app authentication uses expo-web-browser and secure storage

### Environment Variables

Required environment variables (defined in `.env`):
- `MONGODB_URI`: MongoDB connection string
- `CLERK_SECRET_KEY`: Clerk authentication secret
- `CLERK_PUBLISHABLE_KEY`: Clerk authentication public key

## Development Workflow

1. Make changes to shared packages in the `packages/` directory
2. Changes are automatically picked up by apps using those packages
3. Use the integrated tools for linting, formatting, and type checking
4. Add new UI components via the `ui-add` script
5. Create new packages with `turbo gen init`
6. Run tests before submitting changes

## Documentation

The built-in documentation site provides detailed information about the project. Run it locally:

```bash
cd apps/docusaurus
pnpm start
```

Or visit the hosted version: [https://create-t3-turbo-mongo-docusaurus.vercel.app/](https://create-t3-turbo-mongo-docusaurus.vercel.app/)