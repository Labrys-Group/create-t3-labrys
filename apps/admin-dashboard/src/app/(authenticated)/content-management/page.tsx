"use client";

import { FormProvider, useForm } from "react-hook-form";

import { Input } from "@acme/ui/input";
import { Label } from "@acme/ui/label";

export default function ContentManagementPage() {
  const form = useForm();
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <FormProvider {...form}>
          <div>
            <Label>Name</Label>
            <Input {...form.register("name")} />
          </div>
        </FormProvider>
      </div>
    </>
  );
}
