import baseConfig, {
  restrictEnvAccess,
} from "@project-name/eslint-config/base";
import nextjsConfig from "@project-name/eslint-config/nextjs";
import reactConfig from "@project-name/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
