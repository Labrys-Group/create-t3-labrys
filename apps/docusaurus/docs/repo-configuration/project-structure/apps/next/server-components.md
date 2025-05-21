# Server Components with tRPC

Next.js 15 with the App Router makes heavy use of React Server Components (RSC), which can be powerful but require specific patterns when working with tRPC. This guide explains how to effectively use Server Components with the tRPC setup in this monorepo.

## Understanding Server vs. Client Components

First, let's clarify the fundamental differences:

- **Server Components** (default in the App Router): Run only on the server, can access server resources directly, and don't increase client JavaScript bundle size
- **Client Components** (marked with `"use client"`): Run on both server and client, can use hooks and event handlers, but increase the JavaScript bundle sent to the client

## tRPC Configuration for Server Components

This monorepo includes a special setup that allows you to use tRPC in both Server and Client Components:

### Server-Side tRPC (`~/trpc/server.tsx`)

For Server Components, the monorepo provides:

```tsx
// Import in Server Components
import { trpc, prefetch, HydrateClient } from "~/trpc/server";
```

Key utilities:
- `trpc`: A server-side tRPC instance that lets you call procedures directly in Server Components
- `prefetch`: A function to prefetch queries on the server
- `HydrateClient`: A component that hydrates tRPC queries for client components

### Client-Side tRPC (`~/trpc/react.tsx`) 

For Client Components, the setup provides:

```tsx
// Import in Client Components
import { useTRPC } from "~/trpc/react";
```

Key utilities:
- `useTRPC`: A hook that returns a client-side tRPC instance

## Using tRPC in Server Components

Server Components can directly call tRPC procedures without hooks:

```tsx
// This is a Server Component (no "use client" directive)
import { trpc } from "~/trpc/server";

export default async function PostDetails({ params }: { params: { id: string } }) {
  // Direct procedure call from a server component
  const post = await trpc.post.byId.query(params.id);
  
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}
```

### Prefetching Data for Client Components

To optimize performance, you can prefetch data in Server Components that will be needed by Client Components:

```tsx
// Server Component
import { prefetch, HydrateClient, trpc } from "~/trpc/server";
import { PostList } from "./_components/posts"; // Client Component

export default function PostsPage() {
  // Prefetch the data on the server
  prefetch(trpc.post.all.queryOptions());
  
  return (
    <HydrateClient>
      {/* Client component will receive hydrated data */}
      <PostList />
    </HydrateClient>
  );
}
```

## Using tRPC in Client Components

Client Components need to use hooks to access tRPC:

```tsx
"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";

export function PostList() {
  const trpc = useTRPC();
  // Use TanStack Query hooks with tRPC
  const { data: posts } = useSuspenseQuery(trpc.post.all.queryOptions());
  
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
```

## Best Practices and Patterns

### 1. Data Fetching in Server Components

Whenever possible, fetch data in Server Components:

```tsx
// Server Component
import { trpc } from "~/trpc/server";

export default async function Dashboard() {
  // These queries run on the server, never sent to the client
  const [stats, recentPosts, userCount] = await Promise.all([
    trpc.stats.summary.query(),
    trpc.post.recent.query({ limit: 5 }),
    trpc.user.count.query()
  ]);
  
  return (
    <div>
      <StatsDisplay stats={stats} />
      <RecentPostsSection posts={recentPosts} />
      <UserCountBadge count={userCount} />
    </div>
  );
}
```

### 2. Progressive Enhancement with Client Components

Use Client Components for interactive parts, while keeping as much as possible in Server Components:

```tsx
// Server Component
import { trpc } from "~/trpc/server";
import { CreatePostButton } from "./client-components";

export default async function PostsPage() {
  // Server-side data fetching
  const posts = await trpc.post.all.query();
  
  return (
    <div>
      {/* Static rendering of posts from server */}
      <div className="posts-grid">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      
      {/* Interactive client component */}
      <CreatePostButton />
    </div>
  );
}
```

### 3. Route Handlers for Mutations

For best performance, keep mutations in Client Components only:

```tsx
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";
import { toast } from "@acme/ui/toast";

export function CreatePostForm() {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  
  const createPost = useMutation(
    trpc.post.create.mutationOptions({
      onSuccess: async () => {
        // Reset form and invalidate queries
        await queryClient.invalidateQueries(trpc.post.pathFilter());
        toast.success("Post created!");
      },
      onError: (err) => {
        toast.error("Failed to create post");
      },
    }),
  );
  
  // Form submission handling...
}
```

### 4. Dynamic Routes with Suspense

For dynamic routes, use Suspense boundaries to provide a better loading experience:

```tsx
// app/post/[id]/page.tsx
import { Suspense } from "react";
import { prefetch, HydrateClient, trpc } from "~/trpc/server";
import { PostSkeleton } from "~/components/skeletons";

export default function PostPage({ params }: { params: { id: string } }) {
  prefetch(trpc.post.byId.queryOptions(params.id));
  
  return (
    <HydrateClient>
      <main className="container py-8">
        <Suspense fallback={<PostSkeleton />}>
          <PostContent id={params.id} />
        </Suspense>
      </main>
    </HydrateClient>
  );
}

// In client component file:
"use client";

function PostContent({ id }: { id: string }) {
  const trpc = useTRPC();
  const { data: post } = useSuspenseQuery(trpc.post.byId.queryOptions(id));
  
  // Render post content...
}
```

## Common Pitfalls and Solutions

### 1. Hydration Errors

If you see hydration mismatch errors, ensure that:
- You wrap client components that use tRPC with `HydrateClient`
- You prefetch the exact same data with the same parameters on the server
- Component rendering on the server matches initial client rendering

### 2. "useState" in Server Components

Error: `useState` can only be used in Client Components:

```tsx
// WRONG: This will cause an error
import { useState } from "react";
import { trpc } from "~/trpc/server";

export default function PostsPage() {
  const [filter, setFilter] = useState("all"); // ERROR!
  const posts = await trpc.post.all.query({ filter });
  
  // ...
}
```

Solution: Move state to a Client Component:

```tsx
// Server Component
import { PostFilterControls } from "./client-components";

export default function PostsPage() {
  // Pass a server action to handle filtering
  return <PostFilterControls />;
}

// In client-components.tsx
"use client";

import { useState } from "react";
import { useTRPC } from "~/trpc/react";

export function PostFilterControls() {
  const [filter, setFilter] = useState("all");
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.post.all.queryOptions({ filter }));
  
  // Render filter controls and filtered data
}
```

### 3. Mutations in Server Components

Error: Cannot use mutations directly in Server Components:

```tsx
// WRONG: This will cause an error
import { trpc } from "~/trpc/server";

export default function AdminPage() {
  // This won't work as expected
  async function handleDeleteUser(id: string) {
    await trpc.user.delete.mutation(id);
  }
  
  // ...
}
```

Solution: Use server actions or move mutations to Client Components:

```tsx
"use client";

import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";

export function DeleteUserButton({ userId }: { userId: string }) {
  const trpc = useTRPC();
  const deleteUser = useMutation(trpc.user.delete.mutationOptions());
  
  return (
    <button onClick={() => deleteUser.mutate(userId)}>
      Delete User
    </button>
  );
}
```

## Advanced Patterns

### 1. Prefetching with Refetch Intervals

A common requirement for real-time data is to initially load it on the server for SEO and fast initial page loads, then poll for updates on the client. This pattern combines the benefits of server rendering with real-time updates:

```tsx
// app/dashboard/page.tsx - Server Component
import { prefetch, HydrateClient, trpc } from "~/trpc/server";
import { DashboardMetrics } from "./_components/dashboard-metrics"; // Client Component

export default function DashboardPage() {
  // Prefetch on the server for initial load
  prefetch(trpc.metrics.current.queryOptions());
  
  return (
    <main className="container py-8">
      <h1>Dashboard</h1>
      
      <HydrateClient>
        {/* Client component will use the prefetched data and then poll */}
        <DashboardMetrics />
      </HydrateClient>
    </main>
  );
}
```

Then in your client component, you can use the prefetched data and set up polling:

```tsx
// app/dashboard/_components/dashboard-metrics.tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";

export function DashboardMetrics() {
  const trpc = useTRPC();
  
  // This will:
  // 1. Use prefetched data for initial render (fast!)
  // 2. Start polling every 30 seconds for updates
  const { data: metrics } = useQuery({
    ...trpc.metrics.current.queryOptions(),
    refetchInterval: 30 * 1000, // 30 seconds
  });
  
  return (
    <div className="grid grid-cols-3 gap-4">
      <MetricCard 
        title="Active Users" 
        value={metrics.activeUsers} 
      />
      <MetricCard 
        title="Revenue Today" 
        value={`$${metrics.revenueToday.toFixed(2)}`} 
      />
      <MetricCard 
        title="New Signups" 
        value={metrics.newSignups} 
      />
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
    </div>
  );
}
```

This pattern gives you the best of both worlds:
- Server-side rendering for fast initial page loads and SEO
- Client-side polling for real-time updates
- No loading states needed for the initial render
- Smooth updates as new data arrives

You can customize the polling behavior with additional options:

```tsx
const { data: metrics } = useQuery({
  ...trpc.metrics.current.queryOptions(),
  refetchInterval: 30 * 1000,
  refetchIntervalInBackground: true, // Continue polling even when tab is in background
  refetchOnWindowFocus: true,        // Also refetch when user focuses the window
  staleTime: 10 * 1000,              // Consider data fresh for 10 seconds
});
```

### 2. Streaming with Suspense

For improved UX with slow data sources:

```tsx
// Dashboard.tsx (Server Component)
import { Suspense } from "react";
import { trpc } from "~/trpc/server";
import { UserStatsSkeleton, RecentActivitySkeleton } from "~/components/skeletons";

export default function Dashboard() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Fast data loads first */}
      <div>
        <h2>Quick Stats</h2>
        <QuickStats />
      </div>
      
      {/* Slow data streams in with Suspense */}
      <div>
        <h2>User Statistics</h2>
        <Suspense fallback={<UserStatsSkeleton />}>
          <UserStats />
        </Suspense>
      </div>
      
      <div>
        <h2>Recent Activity</h2>
        <Suspense fallback={<RecentActivitySkeleton />}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  );
}

// Components implemented as Server Components:
async function QuickStats() {
  const stats = await trpc.stats.quick.query();
  return <StatsDisplay stats={stats} />;
}

async function UserStats() {
  const stats = await trpc.stats.detailedUserStats.query(); // Slow query
  return <UserStatsDisplay stats={stats} />;
}

async function RecentActivity() {
  const activity = await trpc.activity.recent.query(); // Another slow query
  return <ActivityFeed items={activity} />;
}
```

### 2. Optimistic Updates

For responsive UIs:

```tsx
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "~/trpc/react";

export function LikeButton({ postId, initialLikes }: { postId: string, initialLikes: number }) {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  
  const likeMutation = useMutation(
    trpc.post.like.mutationOptions({
      onMutate: async () => {
        // Cancel outgoing refetches
        await queryClient.cancelQueries({ queryKey: trpc.post.byId.queryKey(postId) });
        
        // Snapshot previous value
        const previousPost = queryClient.getQueryData(trpc.post.byId.queryKey(postId));
        
        // Optimistically update
        queryClient.setQueryData(trpc.post.byId.queryKey(postId), (old: any) => ({
          ...old,
          likes: old.likes + 1,
        }));
        
        return { previousPost };
      },
      onError: (_, __, context) => {
        // Rollback on error
        if (context?.previousPost) {
          queryClient.setQueryData(trpc.post.byId.queryKey(postId), context.previousPost);
        }
      },
      onSettled: () => {
        // Always refetch to ensure consistency
        queryClient.invalidateQueries({ queryKey: trpc.post.byId.queryKey(postId) });
      },
    }),
  );
  
  return (
    <button onClick={() => likeMutation.mutate(postId)}>
      Like ({initialLikes + (likeMutation.isSuccess ? 1 : 0)})
    </button>
  );
}
```

## Why Use tRPC Over Server Actions?

> **Important Note:** While Next.js 15 introduces Server Actions as a built-in solution for data mutations, we still recommend using tRPC in this monorepo. tRPC provides superior code organization, better type safety across your entire application, and more flexibility.

Key advantages of using tRPC over Server Actions:

- **Better Code Organization**: tRPC routers provide clear separation of concerns and centralized API definitions.
- **Easier Transition Between Server/Client**: tRPC queries can be easily converted from server to client components when requirements change.
- **Superior for Mutations**: tRPC offers more robust patterns for mutations with optimistic updates and error handling.
- **Consistent Development Experience**: Using tRPC for both queries and mutations creates a more cohesive developer experience.
- **Type Safety Across Boundaries**: End-to-end type safety between your backend, frontend, and even mobile applications.

While Server Actions are a valid approach for simple applications, tRPC provides significant benefits for larger, more complex applications with multiple frontends (web and mobile).

## Conclusion

By following these patterns, you can leverage the full power of React Server Components with tRPC in your Next.js application:

1. Use Server Components for data fetching whenever possible
2. Prefer passing data down as props to child components
3. Use Client Components only for interactive parts that need hooks and event handlers
4. Leverage prefetching and hydration for optimal performance
5. Use Suspense for improved loading experiences and streaming

This approach combines the best of both worlds: the performance and security benefits of Server Components with the rich interactivity of Client Components, all while maintaining full type safety with tRPC.