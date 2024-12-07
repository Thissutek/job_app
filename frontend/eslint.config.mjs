import globals from "globals";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
    },
    settings: {
      react: {
        version: "detect"
      },
    },
    rules: {
      "indent": ["error", 2],
      "keyword-spacing": ["error", { before: true, after: true }],
      "space-infix-ops": ["error", { int32Hint: false }],
      "no-multi-spaces": "error",
      "linebreak-style": ["error", "unix"],
    },
  },
  pluginReact.configs.flat.recommended,
];
