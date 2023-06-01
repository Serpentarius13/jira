import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "url";

import svgLoader from "vite-svg-loader";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({ script: { propsDestructure: true, defineModel: true } }),
    svgLoader(),
  ],

  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
      {
        find: "@assets",
        replacement: fileURLToPath(
          new URL("./src/shared/assets", import.meta.url)
        ),
      },
    ],
  },
});
