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
        <div className="flex flex-row items-center justify-center gap-2">
          <UserButton showName />
        </div>
      </SignedIn>
    </div>
  );
}
