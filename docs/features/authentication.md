# Authentication

This project uses [Clerk](https://clerk.com) for authentication across both web and mobile applications.

## Features

- User sign-up and sign-in
- Social authentication (Google, GitHub, etc.)
- Session management
- User profile management
- Role-based access control

## Setup

See [Clerk Setup Guide](../services/clerk.md) for detailed setup instructions.

## Usage in Next.js

### Components

Clerk provides React components for handling authentication UI:

```tsx
"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export function AuthShowcase() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SignedOut>
        <SignInButton />
        <SignUpButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </div>
  );
}
```

### Server-Side Authentication

In Server Components and API routes, use the `auth()` helper:

```tsx
import { auth } from "@clerk/nextjs/server";

export default async function ProtectedPage() {
  const { userId } = await auth();

  if (!userId) {
    return <div>Not authenticated</div>;
  }

  return <div>Protected content for user: {userId}</div>;
}
```

## Usage with tRPC

tRPC is pre-configured to use Clerk for authentication. The `auth()` function is called in tRPC's `createContext` function and can be accessed in the `ctx` object in any tRPC procedure.

### Protected Procedures

```typescript
// packages/api/src/trpc.ts
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      auth: ctx.auth,
    },
  });
});
```

## Usage in Expo

Authentication in the Expo app uses Clerk's React Native SDK. See the implementation in `apps/expo/src/utils/auth.ts`.

## Environment Variables

Required environment variables for Clerk:

- `CLERK_SECRET_KEY`: Server-side secret key
- `CLERK_PUBLISHABLE_KEY`: Client-side publishable key

See [Environment Variables](../configuration/environment-variables.md) for more details.

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [Clerk Dashboard](https://dashboard.clerk.com/)
