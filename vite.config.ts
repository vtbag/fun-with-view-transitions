import { defineConfig } from "vite";
import { resolve } from "path";
import { sync as globSync } from "glob";

export default defineConfig({
  server: {
    fs: {
      allow: ['..']
    }
  },
  build: {
    rollupOptions: {
      input: globSync(["*.html", "episode/*/*.html", "solved/*/*.html", "videos/*.mp4"], { cwd: __dirname }).reduce((entries: Record<string, string>, file: string) => {
        entries[file.split(".")[0]] = resolve(__dirname, file);
        return entries;
      }, {} as Record<string, string>),
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.mp4')) {
            return 'videos/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  }
});
