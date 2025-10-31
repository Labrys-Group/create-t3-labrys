# Clerk Setup

[Clerk](https://clerk.com/docs) is the authentication service used in this project.

## Quickstart

1. Start the web app (see the [Next.js documentation](../../apps/nextjs/docs/README.md))

2. Login to the application and you should see a popup from Clerk to claim the app

3. Click `Claim Application` and follow the instructions to continue setting up Clerk

## tRPC Integration

tRPC is pre-configured to use Clerk for authentication. The `auth()` function is called in tRPC's `createContext` function and can be accessed in the `ctx` object in any tRPC route handler.

Example:

```typescript
// Protected procedure that requires authentication
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

## Components

Clerk provides React components for authentication:

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

The `SignedOut` and `SignedIn` components are used to conditionally render components based on the user's authentication state, and the `UserButton` component displays the user's profile information.

## Configuration

Most Clerk configuration is done from the [Clerk Dashboard](https://dashboard.clerk.com/), including:

- Authentication methods (email, social providers, etc.)
- User profile fields
- Session settings
- Webhooks
- API keys

## Environment Variables

Add these variables to your `.env` file:

```bash
CLERK_SECRET_KEY=your_secret_key
CLERK_PUBLISHABLE_KEY=your_publishable_key
```

Get these keys from your Clerk Dashboard.

## Additional Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Clerk Components](https://clerk.com/docs/components/overview)
- [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [React Native Integration](https://clerk.com/docs/quickstarts/expo)
