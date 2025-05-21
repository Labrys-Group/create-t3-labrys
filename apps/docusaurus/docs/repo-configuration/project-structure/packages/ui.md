# UI Package

The `@acme/ui` package is a shared component library built with [shadcn/ui](https://ui.shadcn.com/), providing a set of reusable, accessible, and customizable UI components for the web applications in the monorepo. **All shadcn/ui components should be placed in this package** to maintain a consistent component library across the project.

## Overview

This package implements a collection of UI components following the shadcn/ui methodology:

- Components are copied and customized directly in your codebase (not installed from npm)
- Built on top of Radix UI primitives for accessibility and functionality
- Styled with Tailwind CSS for consistent design
- Fully customizable and adaptable to project requirements
- Type-safe with TypeScript

## Package Structure

```
packages/ui/
├── components.json     # shadcn/ui configuration
├── package.json        # Package dependencies and exports
└── src/
    ├── button.tsx      # Button component
    ├── dropdown-menu.tsx # Dropdown menu components
    ├── form.tsx        # Form components with react-hook-form
    ├── index.ts        # Exports the cn utility
    ├── input.tsx       # Input component
    ├── label.tsx       # Label component
    ├── theme.tsx       # Theme toggle and provider
    └── toast.tsx       # Toast notifications using sonner
```

## Available Components

The UI package currently includes the following components:

### Button

A versatile button component with various styles and sizes:

```tsx
import { Button } from "@acme/ui/button";

// Default button
<Button>Click me</Button>

// Button variants
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>

// Button sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button> // Default
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### Dropdown Menu

A dropdown menu component based on Radix UI:

```tsx
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@acme/ui/dropdown-menu";

<DropdownMenu>
  <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Item 1</DropdownMenuItem>
    <DropdownMenuItem>Item 2</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

### Form Components

Form components integrated with `react-hook-form` and `zod` validation:

```tsx
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@acme/ui/form";
import { Input } from "@acme/ui/input";
import { Button } from "@acme/ui/button";

// Define schema
const formSchema = z.object({
  email: z.string().email(),
});

// Create form
const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
});

// Use in component
<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Email</FormLabel>
          <FormControl>
            <Input {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
    <Button type="submit">Submit</Button>
  </form>
</Form>
```

### Input

A simple input component:

```tsx
import { Input } from "@acme/ui/input";

<Input placeholder="Enter text..." />
<Input type="email" disabled />
```

### Label

A label component for form elements:

```tsx
import { Label } from "@acme/ui/label";

<Label htmlFor="email">Email</Label>
```

### Theme

Theme toggling and provider components:

```tsx
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";

// In your root layout
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  {children}
  <ThemeToggle />
</ThemeProvider>
```

### Toast

Toast notifications using sonner:

```tsx
import { Toaster, toast } from "@acme/ui/toast";

// In your layout component
<Toaster />

// Trigger toasts elsewhere
toast("Default toast");
toast.success("Success!");
toast.error("Something went wrong");
toast.warning("Warning message");
```

## Theming

The UI package uses `next-themes` to handle theme switching with the following features:

- Light and dark mode support
- System preference detection
- User preference persistence
- CSS variables for theme colors

Theme configuration is managed through:

1. **ThemeProvider**: Wraps your application to provide theme context
2. **ThemeToggle**: A dropdown component to switch between themes
3. **Tailwind CSS**: Theme styles defined in the Tailwind configuration

```tsx
// How theming is applied in the root layout
<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
  <html lang="en" suppressHydrationWarning>
    <body className="min-h-screen bg-background font-sans antialiased">
      {children}
      <ThemeToggle />
    </body>
  </html>
</ThemeProvider>
```

## Utilities

### `cn` Function

The UI package exports a `cn` utility for merging Tailwind CSS classes with proper precedence:

```tsx
import { cn } from "@acme/ui";

// Merge Tailwind classes
<div className={cn(
  "base-styles", 
  isActive && "active-styles",
  className
)}>
  Content
</div>
```

This function combines [class-variance-authority](https://github.com/joe-bell/cva) with [tailwind-merge](https://github.com/dcastil/tailwind-merge) to handle class conflicts and composition.

## Adding New Components

New UI components can be added to the package using the shadcn CLI:

```bash
# From the repository root
pnpm ui-add

# Or specifying a component
pnpm dlx shadcn@latest add [component-name]
```

:::caution Important
All shadcn/ui components must be added to this package, rather than directly in individual apps. This ensures consistency across the monorepo and prevents duplication of UI code.
:::

The CLI will:
1. Add the component to `src/`
2. Automatically update `package.json` exports
3. Format the new component file

### Manual Component Creation

To create a component manually:

1. Create a new file in `packages/ui/src/` (e.g., `card.tsx`)
2. Implement the component using Radix UI primitives as needed
3. Run `pnpm update-exports` to automatically update the exports in `package.json`, or manually add it to the exports field

Example of a manually created component:

```tsx
// packages/ui/src/card.tsx
import * as React from "react";
import { cn } from "@acme/ui";

export function Card({ 
  className, 
  ...props 
}: React.ComponentProps<"div">) {
  return (
    <div 
      className={cn(
        "rounded-lg border bg-card p-4 shadow-sm", 
        className
      )} 
      {...props} 
    />
  );
}
```

## Using Components in Next.js

To use the UI components in a Next.js app:

```tsx
// Import directly from the package path
import { Button } from "@acme/ui/button";
import { Input } from "@acme/ui/input";
import { ThemeProvider, ThemeToggle } from "@acme/ui/theme";

// Use in your components
export default function MyComponent() {
  return (
    <div>
      <h1>My Form</h1>
      <Input placeholder="Enter value" />
      <Button>Submit</Button>
    </div>
  );
}
```

## Configuration

The UI package is configured through the `components.json` file:

```json
{
  "style": "new-york",  // shadcn/ui style preset
  "rsc": true,          // Support for React Server Components
  "tsx": true,          // Use TypeScript with JSX
  "tailwind": {
    "config": "../../tooling/tailwind/web.ts",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "utils": "@acme/ui",
    "components": "src/",
    "ui": "src/"
  }
}
```

## Dependencies

Key dependencies of the UI package:

- **Radix UI**: Provides accessible primitives
- **class-variance-authority**: For component variants
- **tailwind-merge**: For merging Tailwind classes
- **next-themes**: For theme management
- **react-hook-form**: For form components
- **sonner**: For toast notifications

This architecture provides a flexible and maintainable approach to UI components that can be easily extended and customized as your project grows.