import { HydrateClient, prefetch, trpc } from "~/trpc/server";
import { AddContentModal } from "./_components/add-content-modal";
import { ContentTypeSelect } from "./_components/content-type-select";

export default function ContentManagementPage() {
  prefetch(trpc.content.getTypes.queryOptions());

  return (
    <HydrateClient>
      <div className="container mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Content Management</h1>

        <div className="flex flex-row items-center gap-4">
          <ContentTypeSelect />
          <AddContentModal />
        </div>
      </div>
    </HydrateClient>
  );
}
