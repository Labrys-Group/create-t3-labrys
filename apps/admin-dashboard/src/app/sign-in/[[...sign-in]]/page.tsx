import { redirect } from "next/navigation";
import { OrganizationSwitcher, SignIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

import { env } from "~/env";

export default async function Page() {
  const { userId, orgSlug } = await auth();

  console.log(orgSlug);

  if (orgSlug === env.CLERK_ADMIN_ORG_SLUG) {
    return redirect("/");
  }

  if (userId) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <UserButton showName />
        <div>You are not authorized to access this page</div>
        <div>
          If you are an admin, please use the organization switcher to switch to
          the admin organization
        </div>
        <OrganizationSwitcher />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <SignIn />
    </div>
  );
}
