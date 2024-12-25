import { defineConfig, type Options } from "tsup";

export default defineConfig((options: Options) => ({
  entryPoints: ["./core/app.ts"],
  clean: true,
  format: ["cjs"],
  ...options,
}));
