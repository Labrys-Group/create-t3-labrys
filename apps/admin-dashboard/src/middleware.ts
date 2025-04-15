import { NextResponse } from "next/server";
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

import { env } from "./env";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)"]);

// eslint-disable-next-line import/no-default-export
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    const { orgSlug } = await auth();

    if (orgSlug !== env.CLERK_ADMIN_ORG_SLUG) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
