import { defineConfig, transformWithOxc } from "vite";
import react from "@vitejs/plugin-react";

const transformJsxInJs = () => ({
  name: "transform-jsx-in-js",
  enforce: "pre",
  async transform(code, id) {
    if (!id.match(/.*\.js$/)) {
      return null;
    }

    return await transformWithOxc(code, id, {
      lang: "jsx",
    });
  },
});

export default defineConfig(() => {
  return {
    resolve: {
      jsconfigPaths: true,
    },

    plugins: [
      react(),
      transformJsxInJs(),
    ],
  };
});

//Reference: https://github.com/vitejs/vite/discussions/21505 to force Vite to use JSX in JS files Author: oles