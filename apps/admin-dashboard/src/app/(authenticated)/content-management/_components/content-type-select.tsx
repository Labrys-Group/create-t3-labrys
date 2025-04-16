"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@acme/ui/select";

import { useTRPC } from "~/trpc/react";

export const ContentTypeSelect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trpc = useTRPC();
  const { data: contentTypes } = useSuspenseQuery(
    trpc.content.getTypes.queryOptions(),
  );

  // Get the current content type from URL params
  const currentContentType = searchParams.get("contentType");

  // Set default content type on initial load if none is selected
  useEffect(() => {
    if (!currentContentType && contentTypes.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("contentType", contentTypes[0]?.id ?? "");
      router.push(`?${params.toString()}`);
    }
  }, [currentContentType, contentTypes, router, searchParams]);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("contentType", value);
    router.push(`?${params.toString()}`);
  };

  return (
    <Select
      value={currentContentType ?? contentTypes[0]?.id ?? ""}
      onValueChange={handleValueChange}
    >
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Select a content type" />
      </SelectTrigger>
      <SelectContent>
        {contentTypes.map((contentType) => (
          <SelectItem key={contentType.id} value={contentType.id}>
            {contentType.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
