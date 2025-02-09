import react from "@vitejs/plugin-react";
import devServer from "@hono/vite-dev-server";
import { defineConfig } from "vite";
import vike from "vike/plugin";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vike({}),
    tailwindcss(),
    devServer({
      entry: "hono-entry.ts",

      exclude: [
        /^\/@.+$/,
        /.*\.(ts|tsx|vue)($|\?)/,
        /.*\.(s?css|less)($|\?)/,
        /^\/favicon\.ico$/,
        /.*\.(svg|png)($|\?)/,
        /^\/(public|assets|static)\/.+/,
        /^\/node_modules\/.*/,
      ],

      injectClientScript: false,
    }),
    react({}),
  ],

  build: {
    target: "es2022",
  },

  resolve: {
    alias: {
      "@": new URL("./", import.meta.url).pathname,
    },
  },
});
