import react from "@astrojs/react";
import { defineConfig } from "astro/config";

import icon from "astro-icon";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
    output: "server",
    site: "https://misononoa.cc",
    integrations: [react(), icon()],
    adapter: vercel(),
});
