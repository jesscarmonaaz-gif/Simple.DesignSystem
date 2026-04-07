import type { Config } from "tailwindcss";
import { simplePreset } from "./src/tailwind-preset";

const config: Config = {
  presets: [simplePreset as Config],
  content: [
    "./src/**/*.{ts,tsx}",
    "./stories/**/*.{ts,tsx,mdx}",
    "./.storybook/**/*.{ts,tsx}",
  ],
};

export default config;
