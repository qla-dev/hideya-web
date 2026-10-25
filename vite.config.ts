import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cpSync, copyFileSync } from "node:fs";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "hideya-static-assets",
      transformIndexHtml: {
        order: "post",
        handler(html) {
          return html.replace(
            /(<link[^>]+rel="manifest"[^>]+href=")[^"]+/,
            "$1./site.webmanifest",
          );
        },
      },
      closeBundle() {
        cpSync(resolve("assets"), resolve("dist/assets"), { recursive: true });
        copyFileSync(
          resolve("site.webmanifest"),
          resolve("dist/site.webmanifest"),
        );
        copyFileSync(resolve("robots.txt"), resolve("dist/robots.txt"));
        copyFileSync(resolve("deploy.htaccess"), resolve("dist/.htaccess"));
      },
    },
  ],
  base: "./",
  publicDir: "public",
  build: { outDir: "dist", emptyOutDir: false },
  server: { host: "127.0.0.1", port: 5173, strictPort: true },
});
