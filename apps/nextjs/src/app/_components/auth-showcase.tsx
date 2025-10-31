"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

import { Button } from "@project-name/ui/button";

import { env } from "~/env";

export function AuthShowcase() {
  // Check if Clerk is configured
  const isClerkConfigured =
    typeof window !== "undefined" && env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!isClerkConfigured) {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-muted-foreground text-sm">
          Authentication not configured. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          to enable auth.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <SignedOut>
        <SignInButton>
          <Button>Sign In</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <div className="flex flex-row items-center justify-center gap-2">
          <UserButton showName />
        </div>
      </SignedIn>
    </div>
  );
}
