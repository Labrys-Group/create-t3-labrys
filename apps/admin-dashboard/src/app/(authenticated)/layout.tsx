import { SidebarProvider, SidebarTrigger } from "@acme/ui/sidebar";

import { AppSidebar } from "./_components/app-sidebar";

export default function AuthenticatedLayout(props: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1">
        <SidebarTrigger />
        {props.children}
      </main>
    </SidebarProvider>
  );
}
