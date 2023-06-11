import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
    registerType: "prompt",
    includeAssets: ["*.png"],
    manifest: {
        name: "Shopily",
        short_name: "Shopily",
        description: "An example/fake digital store app/website.",
        icons: [
            {
                src: "/shopily.png",
                sizes: "512x512",
                type: "image/png",
            },
            {
                src: "/shopily.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "any maskable"
            },
            {
                src: "/shopily.png",
                sizes: "512x512",
                type: "image/png",
                purpose: "apple touch icon"
            }
        ],
        theme_color: "#FFFFFF",
        background_color: "#FFFFFF",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "any"
    }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), VitePWA(manifestForPlugin)],
  base: "/Shopily-Frontend/"
})
