"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { RouterOutputs } from "@acme/api";

export const columns: ColumnDef<
  RouterOutputs["content"]["getByType"][number]
>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "content",
    header: "Content",
  },
];
