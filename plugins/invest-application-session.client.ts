import { useInvestApplicationStore } from '~/stores/investApplication'

// Ensure session data wins over SSR hydration on the client
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.hook('app:mounted', () => {
    const store = useInvestApplicationStore()
    store.loadFromSession(true)
  })
})
