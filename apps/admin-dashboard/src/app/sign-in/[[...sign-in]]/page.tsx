import { redirect } from "next/navigation";
import { SignIn, SignOutButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { Button } from "@acme/ui/button";

import { checkRole } from "~/utils/roles";

export default async function Page() {
  const { userId } = await auth();

  if (await checkRole("admin")) {
    return redirect("/");
  }

  if (userId) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <div>You are not authorized to access this page</div>

        <SignOutButton>
          <Button variant="outline">Sign Out</Button>
        </SignOutButton>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
