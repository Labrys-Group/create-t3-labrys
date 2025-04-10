---
sidebar_position: 0
tags:
  - Repo setup
---

# Set up Docusaurus

## Set up the Config

In `apps/documentation/docusaurus.config.ts` you can set the documentation config.

For example you can update the `title`, `tagline` and `favicon` to appropriate values for the project.

Near the bottom of the config you can also set the `themeConfig`'s `title` and `logo` which show in the nav bar in Docusaurus, and update the GitHub link in the `themeConfig.navbar.items` array.

You can also remove the announcement at the top of the page by removing the `themeConfig.announcementBar` field.

:::info

See [How to use Docusaurus](./how-to-use-docusaurus.md) for info on how to create and structure your documentation.

:::
