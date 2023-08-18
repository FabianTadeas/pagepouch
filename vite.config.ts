import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import webExtension from "@samrum/vite-plugin-web-extension";
import pkg from "./package.json"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(),webExtension({
    manifest: {
      name: pkg.name,
      description: pkg.description,
      version: pkg.version,
      manifest_version: 2,
      chrome_url_overrides: {
        newtab: "./src/newtab/index.html",
      },
      background: {
        scripts: ["./src/background/index.ts"],
      },
      browser_action: {
        default_icon: "./favicon.svg",
        default_title: "add to pouch",
      },
      permissions: ["tabs"],
    },
  })],
})
