import { defineNuxtConfig } from 'nuxt/config'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  // target: 'static', // default is 'server'
  css: ['~/assets/styles/index.scss'],
  nitro: {
    preset: 'vercel',
  },
  publicRuntimeConfig: {
    MAIL_RECEIVER_FALLBACK: process.env.MAIL_RECEIVER_FALLBACK,
    MAIL_RECEIVER_CONTACT_FORM: process.env.MAIL_RECEIVER_CONTACT_FORM,
    SMTP_USER_NAME: process.env.SMTP_USER_NAME,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER_PASSWORD: process.env.SMTP_USER_PASSWORD,
    SMTP_PORT_TLS: process.env.SMTP_PORT_TLS,
  },
  typescript: {
    strict: true,
    typeCheck: true,
  },
  app: {
    head: {
      charset: 'utf-8',
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
          content: `https://www.einhaus-leipzig.de`,
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
      ],
    },
  },
})
