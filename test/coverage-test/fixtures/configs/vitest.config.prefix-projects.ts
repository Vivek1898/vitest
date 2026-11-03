import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: [resolve(import.meta.dirname, "../../setup.native.ts")],

    projects: [
      {
        extends: true,
        plugins: [
          {
            name: "app-adds-a-function-to-files-it-transforms",
            transform(code, id) {
              if (id.endsWith("/untested.ts")) {
                return `${code}\nexport function addedByAppProject() {\n  return 1\n}\n`;
              }
            },
          },
        ],
        test: {
          name: "app",
          root: "./app",
        },
      },
      {
        extends: true,
        test: {
          name: "app-utils",
          root: "./app-utils",
        },
      },
    ],
  },
});
