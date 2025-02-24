import {crx, defineManifest} from "@crxjs/vite-plugin";
import react from "@vitejs/plugin-react";
import {defineConfig} from "vite";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Trust Stack Wallet Extension",
  version: "1.0.0",
  action: {default_popup: "index.html"},
  content_scripts: [{js: ["src/main.tsx"], matches: ["https://*/*"]}],
  host_permissions: ["<all_urls>"],
});

export default defineConfig({
  plugins: [react(), crx({manifest})],
  legacy: {
    skipWebSocketTokenCheck: true,
  },
});
