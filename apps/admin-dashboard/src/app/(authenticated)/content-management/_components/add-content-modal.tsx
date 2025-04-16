"use client";

import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { ContentType } from "@acme/db";
import { Button } from "@acme/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";

import { useTRPC } from "~/trpc/react";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  content: z.string(), // JSON string
});

export const AddContentModal = () => {
  const searchParams = useSearchParams();

  // Get the current content type from URL params
  const contentType = searchParams.get("contentType");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      content: "",
    },
  });

  const trpc = useTRPC();

  const { mutate: addContent } = useMutation(
    trpc.content.add.mutationOptions({
      onSuccess: () => {
        form.reset();
      },
    }),
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    addContent({
      name: values.name,
      type: contentType as ContentType,
      content: values.content,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-48" variant={"outline"}>
          Add Content
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Content</DialogTitle>
        </DialogHeader>
        <DialogDescription>Add content to the database.</DialogDescription>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    A unique slug for the content that will be used by the
                    developers to identify the content. `kebab-case` is
                    recommended.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>The data for the content.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
