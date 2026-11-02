import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cpSync } from "node:fs";
import { fileURLToPath } from "node:url";

const outDir = fileURLToPath(new URL("../whiteboard", import.meta.url));

// Self-host Excalidraw's fonts next to the page instead of pulling them from a CDN.
const copyExcalidrawFonts = {
  name: "copy-excalidraw-fonts",
  closeBundle() {
    cpSync(
      fileURLToPath(new URL("node_modules/@excalidraw/excalidraw/dist/prod/fonts", import.meta.url)),
      `${outDir}/fonts`,
      { recursive: true },
    );
  },
};

export default defineConfig({
  base: "./",
  plugins: [react(), copyExcalidrawFonts],
  define: { "process.env.IS_PREACT": JSON.stringify("false") },
  build: { outDir, emptyOutDir: true },
});
