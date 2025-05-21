# Google Analytics

The `nextjs` app is configured to automatically add a Google Analytics tag with the `@next/third-parties` library if an ID is provided with the `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` environment variable. To enable it, simply add a `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID` environment variable to your project.

If you need to modify this tag it is in the root `layout.tsx` file.
