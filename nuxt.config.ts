import { defineNuxtConfig } from 'nuxt/config'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: ['~/assets/styles/index.scss'],
  nitro: {
    preset: 'vercel',
  },
  runtimeConfig: {
    public: {
      OFFICIAL_CONTACT_ADDRESS: process.env.OFFICIAL_CONTACT_ADDRESS,
    },
  },
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false,
  },
  app: {
    head: {
      charset: 'utf-8',
      htmlAttrs: {
        lang: 'de',
      },
      viewport: 'width=device-width, initial-scale=1, user-scalable=yes',
      title: 'EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
      meta: [
        {
          name: 'description',
          content:
            'Wir, die Mieter haben uns zusammengeschlossen und unser Haus selbst gekauft: Ein genossenschaftliches Hausprojekt in Leipzig Reudnitz.',
        },
        {
          name: 'robots',
          content:
            'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
          hid: 'og:title',
          name: 'og:title',
          content: 'EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: 'de_DE',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content:
            'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content:
            'Wir, die Mieter haben uns zusammengeschlossen und unser Haus selbst gekauft: Ein genossenschaftliches Hausprojekt in Leipzig Reudnitz.',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://www.einhaus-leipzig.de',
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
      ],
      link: [
        { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' },
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
    },
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./assets/styles/general/variables.scss";',
        },
      },
    },
  },
})
