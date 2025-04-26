import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()]
  },
  //@ts-ignore
  solid: {
    babel: {
      plugins: [
        ["@babel/plugin-proposal-decorators", { version: "legacy" }],
        ["@babel/plugin-transform-class-properties"],
      ],
    },
  }
});
