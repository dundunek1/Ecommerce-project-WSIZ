// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  css: ["bootstrap/dist/css/bootstrap.min.css", "~/assets/css/main.css"],
  app: {
    head: {
      title: "ShopEnter - Portal Ogłoszeniowy",
      meta: [{ charset: "utf-8" }, { name: "viewport", content: "width=device-width, initial-scale=1" }],
      script: [
        {
          src: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js",
          defer: true,
        },
      ],
      link: [
        {
          href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css",
          rel: "stylesheet",
        },
      ],
    },
  },
  modules: ["@nuxt/content", "@nuxt/eslint", "@nuxt/fonts", "@nuxt/icon", "@nuxt/image", "@nuxt/scripts", "@nuxt/ui"],
});
