import {defineConfig} from "astro/config";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: cloudflare({
    imageService: "cloudflare",
  }),
  image: {
    domains: ["store-cs29ogoa.eu.saleor.cloud"],
  },
});
