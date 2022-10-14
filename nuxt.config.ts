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
})
