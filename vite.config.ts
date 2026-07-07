import { fileURLToPath } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite-plus";
import ssrPlugin from "vite-ssr-components/plugin";

export default defineConfig({
  plugins: [tailwindcss(), ssrPlugin(), cloudflare()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./worker", import.meta.url)),
    },
  },
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
});
