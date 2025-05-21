import { NextResponse } from "next/server";

import { appRouter } from "@project-name/api";

import { env } from "~/env";

export async function GET() {
  if (env.NODE_ENV !== "development") {
    return new NextResponse("Not Found", { status: 404 });
  }

  const { renderTrpcPanel } = await import("trpc-ui");

  return new NextResponse(
    renderTrpcPanel(appRouter, {
      url: "/api/trpc", // Default trpc route in nextjs
      transformer: "superjson", // Enabled by default with create-t3-app
    }),
    {
      status: 200,
      headers: [["Content-Type", "text/html"] as [string, string]],
    },
  );
}
