import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      jpg: { quality: 82 },
      jpeg: { quality: 82 },
      png: { quality: 85 },
      webp: { lossless: false, quality: 82 },
    }),
  ],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Font files get stable (hash-free) names so index.html can
        // reference them with a reliable <link rel="preload"> hint.
        assetFileNames: (assetInfo) => {
          if (/\.(woff2?|ttf|otf|eot)$/.test(assetInfo.name ?? "")) {
            return "fonts/[name][extname]";
          }
          return "assets/[name]-[hash][extname]";
        },
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;
          if (id.includes("/react/") || id.includes("/react-dom/") || id.includes("/scheduler/")) return "vendor-react";
          // motion intentionally omitted: keeps it out of Rolldown's static entry
          // graph so it loads only when lazy chunks (Experience, HowIBuild…) trigger it.
          // radix kept named to preserve cache efficiency without bloating vendor-react.
          if (id.includes("/@radix-ui/")) return "vendor-radix";
          if (id.includes("/lucide-react/") || id.includes("/react-icons/")) return "vendor-icons";
          if (id.includes("/@fontsource")) return "vendor-fonts";
        },
      },
    },
    chunkSizeWarningLimit: 500,
  },
});
