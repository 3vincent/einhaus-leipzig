import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {
    if (_from.name === _to.name) return

    if (savedPosition) {
      return savedPosition
    }

    return { top: 0 }
  },
}
