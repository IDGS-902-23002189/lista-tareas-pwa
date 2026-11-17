
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    port: 5173
  },

  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      // Habilitar PWA en desarrollo
      devOptions: {
        enabled: true,
        type: "module"
      },

      includeAssets: [
        "icons/icon.svg",
        "icons/icon-192.png",
        "icons/icon-512.png"
      ],

      manifest: {
        id: "/",
        name: "TaskFlow - Lista de tareas",
        short_name: "TaskFlow",
        description: "Organiza tus tareas fácilmente.",
        theme_color: "#7654d6",
        background_color: "#f5f3ff",
        display: "standalone",
        orientation: "portrait",
        start_url: "/",
        scope: "/",

        icons: [
          {
            src: "/icons/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any"
          },
          {
            src: "/icons/icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any"
          }
        ]
      }
    })
  ]
});
