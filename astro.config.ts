import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";
import icon from "astro-icon";
import vercel from "@astrojs/vercel";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
    output: "server",
    site: "https://misononoa.cc",
    integrations: [vue(), icon(), mdx()],
    adapter: vercel(),
});