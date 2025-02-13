import eslint from "@eslint/js";

export default [
  {
    files: ["**/*.js"],
    plugins: {
      eslint: eslint, // Using ESLint plugin for JS
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    ignores: ["*/node_modules/*", "*dist/**/*.d.ts", "./.github/*", ".idx", "node_modules", "*.db", "*.json", "*.yaml", "package-lock.json", "pnpm-lock.yaml"],
    rules: {
      semi: "error", // Ensure semicolons are used
      "prefer-const": "error", // Prefer const over let when possible
      "max-len": "off",
      semi: "off",
    },
  },
];
