import { defineConfig } from "vite";
import { resolve } from "path";
import { sync as globSync } from "glob";

export default defineConfig({
  build: {
    rollupOptions: {
      input: globSync(["*.html","examples/*/*.html"], { cwd: __dirname }).reduce((entries: Record<string, string>, file: string) => {
        entries[file.split(".")[0]] = resolve(__dirname, file);
        return entries;
      }, {} as Record<string, string>)
    }
  }
});
