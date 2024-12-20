import { defineConfig } from 'wxt';
import autoIcons from "@wxt-dev/auto-icons"

// See https://wxt.dev/api/config.html
export default defineConfig({
  srcDir: "src",
  outDir: "dist",
  extensionApi: 'chrome',
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  autoIcons: {
    sizes: [16, 32, 48, 96, 128]
  },
  manifest: {
    name: "LinkedIn extension",
    description: "sends connect request to all suggested people on linkedin"
  }
});
