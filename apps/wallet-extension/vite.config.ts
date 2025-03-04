import {crx, defineManifest} from "@crxjs/vite-plugin";
import {defineConfig} from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Trust Stack Wallet Extension",
  version: "1.0.0",
  action: {default_popup: "index.html"},
  content_scripts: [{js: ["src/main.tsx"], matches: ["https://*/*"]}],
  host_permissions: ["<all_urls>"],
  icons: {
    "16": "src/assets/icons/icon16.png",
    "48": "src/assets/icons/icon48.png",
    "128": "src/assets/icons/icon128.png",
  },
});

export default defineConfig({
  resolve: {
    alias: {
      "*.svg": "*.svg?react",
      "react-native": "react-native-web",
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: [
        ".web.js",
        ".web.jsx",
        ".web.ts",
        ".web.tsx",
        ".mjs",
        ".js",
        ".mts",
        ".ts",
        ".jsx",
        ".tsx",
        ".json",
      ],
      loader: {
        ".js": "jsx",
      },
    },
  },
  define: {
    "process.env": {},
  },
  plugins: [crx({manifest}) as any, tsconfigPaths()],
  legacy: {
    skipWebSocketTokenCheck: true,
  },
});
