"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";

import type { RouterOutputs } from "@acme/api";
import { Button } from "@acme/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@acme/ui/dropdown-menu";

import { useTRPC } from "~/trpc/react";

const Actions = ({
  content,
}: {
  content: RouterOutputs["content"]["getByType"][number];
}) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const { mutate: deleteContent } = useMutation(
    trpc.content.delete.mutationOptions({
      onSuccess: () => {
        void queryClient.invalidateQueries({
          queryKey: trpc.content.getByType.queryKey(),
        });
      },
    }),
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 px-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(content.name)}
        >
          Copy name
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => deleteContent({ id: content._id.toString() })}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const content = row.original;

      return <Actions content={content} />;
    },
  },
];
