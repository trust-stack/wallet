import {defaultPlugins, defineConfig} from "@hey-api/openapi-ts";

export default defineConfig({
  input: "./../../services/api/openapi.json",
  output: "src/client",
  experimentalParser: true,
  plugins: [
    ...defaultPlugins,
    "@hey-api/client-fetch",
    "@tanstack/react-query",
  ],
});
