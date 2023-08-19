import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import webExtension from "@samrum/vite-plugin-web-extension";
import pkg from "./package.json";

type v2 = chrome.runtime.ManifestV2;
type v3 = chrome.runtime.ManifestV3;

const target = process.env.VITE_TARGET;
let manifest: v2 | v3 | undefined;
if (target === "v2") {
  manifest = {
    manifest_version: 2,
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
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
    permissions: ["activeTab"],
  } satisfies v2;
} else if (target === "v3") {
  manifest = {
    manifest_version: 3,
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
    chrome_url_overrides: {
      newtab: "./src/newtab/index.html",
    },
    background: {
      service_worker: "./src/background/index.ts",
      type: "module",
    },
    action: {
      default_icon: "./favicon.svg",
      default_title: "add to pouch",
    },
    permissions: ["activeTab"],
  } satisfies v3;
} else {
  throw new Error("manifest version not specified");
}
manifest;
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    webExtension({
      manifest,
    }),
  ],
});
