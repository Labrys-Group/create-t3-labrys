# Authentication

This project uses [Clerk](https://clerk.com/) for authentication across both web and mobile applications. The authentication is fully integrated with the tRPC API layer, ensuring type-safe authentication throughout the application.

## Authentication Implementation

The authentication in this monorepo is implemented differently for each platform:

### Next.js Implementation

The Next.js application uses the official Clerk SDK for Next.js:

```tsx
// apps/nextjs/src/app/layout.tsx
import { ClerkProvider } from "@clerk/nextjs";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        {/* ... */}
      </html>
    </ClerkProvider>
  );
}
```

Key components:

1. **ClerkProvider**: Wraps the entire application to provide authentication context
2. **Middleware**: Protects routes and API endpoints
3. **UI Components**: Ready-to-use sign-in/sign-up buttons and user profile components

```tsx
// apps/nextjs/src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
```

### Expo Implementation

The Expo application uses a custom authentication flow with web browser-based authentication:

```tsx
// apps/expo/src/utils/auth.ts
import * as Linking from "expo-linking";
import * as Browser from "expo-web-browser";

export const signIn = async () => {
  const signInUrl = `${getBaseUrl()}/api/auth/signin`;
  const redirectTo = Linking.createURL("/login");
  const result = await Browser.openAuthSessionAsync(
    `${signInUrl}?expo-redirect=${encodeURIComponent(redirectTo)}`,
    redirectTo,
  );

  if (result.type !== "success") return false;
  const url = Linking.parse(result.url);
  const sessionToken = String(url.queryParams?.session_token);
  if (!sessionToken) throw new Error("No session token found");

  setToken(sessionToken);
  return true;
};
```

Key components:

1. **Web Browser Authentication**: Opens Clerk authentication in a browser
2. **Token Management**: Securely stores session tokens using `expo-secure-store`
3. **React Hooks**: Custom hooks for user state, sign-in, and sign-out

```tsx
// Hooks for authentication
export const useUser = () => {
  const { data: session } = useQuery(trpc.auth.getSession.queryOptions());
  return session?.user ?? null;
};

export const useSignIn = () => {
  // Implementation details
};

export const useSignOut = () => {
  // Implementation details
};
```

## tRPC Integration

The authentication is integrated with tRPC to provide protected API endpoints:

```tsx
// packages/api/src/trpc.ts
export const createTRPCContext = async (opts: {
  headers: Headers;
  auth: Awaited<ReturnType<typeof auth>> | null;
}) => {
  const authInfo = opts.auth ?? (await auth());
  
  await dbConnect();

  return {
    auth: authInfo,
  };
};
```

Protected procedures require authentication:

```tsx
export const protectedProcedure = t.procedure.use(timingMiddleware).use(({ ctx, next }) => {
  if (!ctx.auth.userId) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  return next({
    ctx,
  });
});
```

## Authentication Components

The Next.js application includes pre-built UI components for authentication:

```tsx
// apps/nextjs/src/app/_components/auth-showcase.tsx
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

## Environment Variables

The authentication requires the following environment variables:

```
# Server-side (private)
CLERK_SECRET_KEY=your_clerk_secret_key

# Client-side (public)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

These variables are validated using zod in `apps/nextjs/src/env.ts`.

## Authentication Flow

1. **User Signs In**:
   - Web: Uses Clerk's UI components
   - Mobile: Opens a web browser for authentication, then returns to the app

2. **Authentication Token**:
   - Web: Managed by Clerk through cookies
   - Mobile: Stored securely using `expo-secure-store`

3. **Protected API Access**:
   - The token is included in API requests
   - tRPC middleware verifies the token for protected procedures
   - If authentication fails, a `TRPCError` with code `UNAUTHORIZED` is thrown

4. **User Signs Out**:
   - Tokens are invalidated and removed from storage
   - Client state is reset

## Clerk Dashboard

Most of the authentication configuration is managed through the [Clerk Dashboard](https://dashboard.clerk.com/), including:

- User management
- Authentication methods (email/password, social logins, etc.)
- Security settings
- Branding and customization

This architecture provides a secure, type-safe authentication system that works seamlessly across both web and mobile platforms while leveraging the same API layer.