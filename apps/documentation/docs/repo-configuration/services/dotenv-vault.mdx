---
tags:
  - Repo setup
---

# Dotenv Vault

[Dotenv Vault](https://www.dotenv.org/docs/) allows us to sync secrets between developer's machine and to deployments by storing an encrypted version of the secrets in the repo. This guide will walk you through setting up Dotenv Vault in the repo and deployments.

---

## Prerequisites

Make sure you have access to the Labrys Dotenv account, ask one of the senior devs if you don't and we can invite you.

## Set up in Repo

This repo is configured to use a single `.env` file at the root of the repo. There should already be a `.env.example` and `.env.vault` file. This `.env.vault` file is linked with the template repo deployment, so we want to remove it and set up a new one.

1. Delete the existing `.env.vault`
2. Create a new `.env` file based on `.env.example`
3. Run `npx dotenv-vault@latest new` and press `y` to open the browser
4. Give the project a name (match the Github repo name)
5. Run `npx dotenv-vault@latest login` and press `y` to log in

Now if you make changes to your .env file you can push with:

```bash
npx dotenv-vault@latest push
```

and can pull with:

```bash
npx dotenv-vault@latest push
```

## Managing Multiple Environments

By default the above commands will pull the `local` environment. See the [Dotenv Docs](https://www.dotenv.org/docs/quickstart/environments) about managing multiple environments. Create a `production` and `development` environment before moving on to the next sections.

## Deployment on Vercel

Following the [Dotenv Docs](https://www.dotenv.org/docs/frameworks/nextjs/vercel) about deploying to Vercel has caused issues in the past. Try using the following instead.

The Next.JS app is automatically configured to use the `DOTENV_KEY` provided by Vercel's environment variables, all you need to do is set it.

### Setting the `DOTENV_KEY`s

1. Run `npx dotenv-vault@latest keys` to get your keys
2. Open `Settings` -> `Environment Variables` in your Vercel project
3. Create a new environment variable with `DOTENV_KEY` as the key and the development key from the earlier command as the value. Set the `Environments` dropdown to just select `Preview` then hit save
4. Do the same for the production `DOTENV_KEY` but set the `Environments` dropdown to just `Production`

### Manually Setting the Build Command

If you need to manually set the build command you can use:

```bash
cd ../../ && npx dotenv-vault@latest decrypt $DOTENV_KEY > .env && cd apps/nextjs && cp ../../.env .env && turbo run build
```

This command performs the following:

1. Move to the root of the repo (where the `.env.vault` file is)
2. Decrypt the `.env.vault` file into a `.env` file
3. Move back to the `nextjs` directory
4. Copy the `.env` file from the root to the `nextjs` directory (this allows us to use Next's build in `.env` file support)
5. Run the build

This may need to be modified for your specific use case, e.g. if your `.env.vault` file is already in the `nextjs` directory then you wont need to move around and copy the file, just use the decrypt command:

```bash
npx dotenv-vault@latest decrypt $DOTENV_KEY > .env && turbo run build
```
