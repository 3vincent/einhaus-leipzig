import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {
    return nextTick().then(() => {
      const root = document.querySelector('html')

      if (root) {
        root.style.scrollBehavior = _to.name === 'index' ? 'smooth' : 'auto'
      }

      if (_from.name === _to.name) return

      if (savedPosition) {
        return savedPosition
      }

      return { top: 0 }
    })
  },
}
