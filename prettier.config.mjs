import organizeImports from "prettier-plugin-organize-imports";
import * as tailwindcss from "prettier-plugin-tailwindcss";

/** @type {import("prettier").Config} */
const config = {
  plugins: [organizeImports, tailwindcss],
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "es5",
};

export default config;
