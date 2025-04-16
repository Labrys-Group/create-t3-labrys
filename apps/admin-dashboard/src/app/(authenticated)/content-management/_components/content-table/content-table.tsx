"use client";

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import type { ContentType } from "@acme/db";

import { useTRPC } from "~/trpc/react";
import { columns } from "./columns";
import { ContentDataTable } from "./content-data-table";

export const ContentTable = () => {
  const searchParams = useSearchParams();

  const contentType = searchParams.get("contentType");
  const trpc = useTRPC();
  const { data: content } = useQuery(
    trpc.content.getByType.queryOptions({ type: contentType as ContentType }),
  );

  return (
    <div>
      <ContentDataTable columns={columns} data={content ?? []} />
    </div>
  );
};
