# API Package

The `packages/api` package implements the type-safe API layer based on tRPC that serves as the communication bridge between the front-end applications and the database. This package contains **all API-related code** for the entire monorepo.

:::caution Important
All API-related code (tRPC routers, procedures, and API utilities) must be placed in this package only. Do not implement API endpoints or tRPC procedures directly in app directories. This ensures proper separation of concerns and enables code reuse across applications.
:::

## Structure

```
packages/api/
├── src/
│   ├── router/           # Domain-specific routers
│   │   ├── post.ts       # Post-related procedures
│   │   └── post.test.ts  # Tests for post router
│   ├── tests/
│   │   └── test-caller.ts # Test utilities
│   ├── index.ts          # Public exports
│   ├── root.ts           # Root router definition
│   └── trpc.ts           # tRPC configuration
└── vitest.setup.ts       # Test environment setup
```

## Key Components

### Root Router

The `root.ts` file defines the main router that aggregates all sub-routers:

```typescript
export const appRouter = createTRPCRouter({
  post: postRouter,
  // Add additional domain routers here
});
```

### tRPC Configuration

The `trpc.ts` file contains essential tRPC setup:

1. **Context Creation**: Sets up the request context with authentication information and database connection
2. **Transformer**: Uses SuperJSON for serializing data, including dates and complex objects
3. **Error Handling**: Custom formatter for Zod validation errors
4. **Middleware**: Timing middleware for monitoring procedure execution time

### Procedure Types

The API package defines two types of procedures:

1. **publicProcedure**: Accessible without authentication

   ```typescript
   // Example: Get all posts
   all: publicProcedure.query(async () => {
     const posts = await Post.find().limit(10);
     return posts.map(/* ... */);
   });
   ```

2. **protectedProcedure**: Requires authentication with Clerk
   ```typescript
   // Example: Create a new post (requires auth)
   create: protectedProcedure
     .input(CreatePostSchema)
     .mutation(async ({ input }) => {
       await Post.create(input);
     });
   ```

### Domain-Specific Routers

Each domain area has its own router file in the `router/` directory:

- `post.ts`: Handles CRUD operations for posts with procedures like:
  - `all`: Get all posts (public)
  - `byId`: Get post by ID (public)
  - `create`: Create a new post (protected)
  - `delete`: Delete a post (protected)

### Server-Side Caller

The API package provides a server-side caller for making API calls directly from server code:

```typescript
// Create a server-side caller
const createCaller = createCallerFactory(appRouter);

// Example usage
const trpc = createCaller(createContext);
const posts = await trpc.post.all();
```

### Testing Utilities

The `tests/test-caller.ts` file provides utilities for testing tRPC procedures:

- `makeTestCaller`: Creates a test caller without authentication
- `makeTestCallerWithSession`: Creates a test caller with mock authentication

## Integration with Other Packages

- **@project-name/db**: Uses MongoDB models for database operations
- **@project-name/validators**: Imports Zod schemas for input validation

## Type Inference Helpers

The package exports type helpers for inferring input and output types from procedures:

```typescript
// Type inference helpers for inputs
type RouterInputs = inferRouterInputs<AppRouter>;
// Example: type PostByIdInput = RouterInputs['post']['byId']

// Type inference helpers for outputs
type RouterOutputs = inferRouterOutputs<AppRouter>;
// Example: type AllPostsOutput = RouterOutputs['post']['all']
```

## Adding New API Features

To add a new feature to the API:

1. Create a new router file in `src/router/` or extend an existing one
2. Define your procedures using `publicProcedure` or `protectedProcedure`
3. Add your router to the root router in `src/root.ts`
4. Write tests to verify functionality

## Authentication Flow

The API uses Clerk for authentication:

1. The `createTRPCContext` function receives auth information from the request
2. The `protectedProcedure` middleware verifies that `auth.userId` exists
3. If a user is not authenticated, a `TRPCError` with code `UNAUTHORIZED` is thrown

This architecture ensures that API endpoints have consistent authentication, error handling, and type safety throughout the entire application.
