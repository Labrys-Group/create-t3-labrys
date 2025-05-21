# Database Package

The `packages/db` package provides type-safe database access using MongoDB and Typegoose. It serves as the central data layer for the entire monorepo, offering strongly-typed models and connection management.

:::caution Important
All database models, schemas, and direct database access code must be placed in this package only. Do not define database models or perform direct database operations in app directories or other packages. This ensures consistent data access patterns and type safety across the entire project.
:::

## Overview

This package implements:

- Type-safe MongoDB models using Typegoose
- Connection management for both direct MongoDB access and Mongoose ODM
- Database schema definitions with validation
- Docker configuration for local MongoDB development

## Package Structure

```
packages/db/
├── src/
│   ├── schema/           # Database model definitions
│   │   ├── post.ts       # Post model definition
│   │   ├── user.ts       # User model definition
│   │   └── index.ts      # Exports all models
│   ├── db.ts             # Direct MongoDB client setup
│   ├── dbConnect.ts      # Mongoose connection management
│   └── index.ts          # Package entry point
└── docker-compose.yml    # Local MongoDB configuration
```

## Connection Management

The package provides two approaches for database connections:

### 1. Direct MongoDB Driver

The `db.ts` file provides access to the raw MongoDB Node.js driver:

```typescript
// Example usage of the MongoDB client
import clientPromise from "@project-name/db/db";

const mongodb = await clientPromise;
const db = mongodb.db();
const posts = await db.collection("posts").find({}).toArray();
```

This approach:

- Uses the MongoDB Node.js driver directly
- Provides more flexibility for complex queries
- Creates a singleton client to avoid connection limits
- Handles connection caching across hot module reloading

### 2. Mongoose ODM with Typegoose

The `dbConnect.ts` file manages connections for Mongoose and Typegoose:

```typescript
// Example of using dbConnect with models
import { Post } from "@project-name/db";
import dbConnect from "@project-name/db/dbConnect";

await dbConnect();
const posts = await Post.find({}).limit(10);
```

This approach:

- Uses Mongoose ODM with Typegoose for object modeling
- Provides a cleaner, more object-oriented interface
- Handles connection caching to avoid duplicate connections

## Database Models

### Post Model

The Post model represents blog posts in the application:

```typescript
@modelOptions({ schemaOptions: { collection: "posts" } })
export class PostClass extends TimeStamps {
  @prop({ required: true })
  public title!: string;

  @prop({ required: true })
  public content!: string;
}
```

Features:

- Collection name: "posts"
- Automatic timestamps (createdAt, updatedAt)
- Required title and content fields

### User Model

The User model stores user information:

```typescript
@modelOptions({ schemaOptions: { collection: "users" } })
export class UserClass {
  @prop()
  public name?: string;

  @prop()
  public email?: string;

  @prop()
  public image?: string;

  @prop()
  public emailVerified?: boolean;
}
```

Features:

- Collection name: "users"
- Compatible with Clerk authentication
- Optional fields for user data

## Typegoose Integration

This package uses [Typegoose](https://typegoose.github.io/typegoose/) to create type-safe MongoDB models:

1. **Class-Based Models**: Models are defined as TypeScript classes
2. **Decorators**:
   - `@modelOptions`: Sets collection name and schema options
   - `@prop`: Defines field properties with validation
3. **Type Safety**: Provides TypeScript types for database operations
4. **Inheritance**: Models can extend base classes like `TimeStamps`

## Local Development with Docker

The package includes a `docker-compose.yml` file for running MongoDB locally:

```yaml
# Start the local MongoDB cluster
docker-compose -f packages/db/docker-compose.yml up -d
```

Features:

- MongoDB 7.0 replica set (3 nodes)
- Persistent data volumes
- Automatic replica set initialization
- Exposed ports: 27017, 27018, 27019

## Environment Variables

| Variable      | Description               | Required |
| ------------- | ------------------------- | -------- |
| `MONGODB_URI` | MongoDB connection string | Yes      |

Example connection string:

```
MONGODB_URI=mongodb://localhost:27017/your-database
```

For replica set:

```
MONGODB_URI=mongodb://localhost:27017,localhost:27018,localhost:27019/your-database?replicaSet=rs0
```

## Database Operations

### Querying Data

```typescript
import { Post } from "@project-name/db";

// Find all posts
const allPosts = await Post.find();

// Find post by ID
const post = await Post.findById("post-id");

// Find posts with filter
const filteredPosts = await Post.find({ title: { $regex: "search" } });
```

### Creating Data

```typescript
import { Post } from "@project-name/db";

// Create a new post
await Post.create({
  title: "New Post",
  content: "Post content here",
});
```

### Updating Data

```typescript
import { Post } from "@project-name/db";

// Update a post
await Post.findByIdAndUpdate("post-id", {
  title: "Updated Title",
});
```

### Deleting Data

```typescript
import { Post } from "@project-name/db";

// Delete a post
await Post.findByIdAndDelete("post-id");
```

## Hot Reloading Limitation

:::warning
Currently during local development, the database package will not hot reload when schema definitions change. You'll need to restart the Next.js server to see schema changes take effect.
:::

## Database Scripts

The package supports the following scripts from the root `package.json`:

- `pnpm db:push`: Push schema changes to the database
- `pnpm db:studio`: Open MongoDB studio for database management

## Adding New Models

To add a new model:

1. Create a new file in `src/schema/` (e.g., `comment.ts`)
2. Define your model class using Typegoose decorators
3. Export your model from the schema index
4. Use your model in the application

Example new model:

```typescript
import {
  getModelForClass,
  modelOptions,
  mongoose,
  prop,
  ReturnModelType,
} from "@typegoose/typegoose";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

@modelOptions({ schemaOptions: { collection: "comments" } })
export class CommentClass extends TimeStamps {
  @prop({ required: true })
  public postId!: string;

  @prop({ required: true })
  public content!: string;

  @prop()
  public authorId?: string;
}

export const Comment =
  (mongoose.models.CommentClass as
    | ReturnModelType<typeof CommentClass>
    | undefined) ?? getModelForClass(CommentClass);
```

Then add to `schema/index.ts`:

```typescript
export * from "./comment";
```
