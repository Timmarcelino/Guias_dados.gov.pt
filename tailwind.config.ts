import type { Config } from "tailwindcss";
import { AgoraTailwindConfig } from "@ama-pt/agora-design-system";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    ...AgoraTailwindConfig.theme,
    extend: { ...AgoraTailwindConfig.theme.extend },
  },
  plugins: AgoraTailwindConfig.plugins,
  safelist: AgoraTailwindConfig.safelist,
  corePlugins: { preflight: false },
};
export default config;
