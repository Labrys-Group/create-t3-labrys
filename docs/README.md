# Documentation

This folder contains project-wide documentation for the monorepo.

## Documentation Structure

- **[Project Structure](./PROJECT-STRUCTURE.md)** - Overview of the monorepo organization
- **Configuration** - Environment variables and project configuration
  - [Environment Variables](./configuration/environment-variables.md)
- **Features** - Documentation for major features
  - [Authentication](./features/authentication.md)
- **Services** - Third-party service integration guides
  - [Clerk](./services/clerk.md)

## App-Specific Documentation

Each application has its own documentation folder:

- **[Next.js App](../apps/nextjs/docs/README.md)** - Web application documentation
- **[Expo App](../apps/expo/docs/README.md)** - Mobile application documentation

## Package Documentation

Each package has a README with detailed documentation:

- **[API Package](../packages/api/README.md)** - tRPC API layer
- **[Database Package](../packages/db/README.md)** - MongoDB models and connections
- **[UI Package](../packages/ui/README.md)** - Shared UI components

## Documentation Standards

For guidelines on how to document code in this project, see the company-wide documentation standards in the Notion workspace (previously available at `notion-import/documentation-standards.md`).
