import type { RouterConfig } from '@nuxt/schema'

export default <RouterConfig>{
  scrollBehavior(_to, _from, savedPosition) {
    if (_to.name === 'index') {
      const root = document.querySelector('html')
      if (root) root.style.scrollBehavior = 'smooth'
    } else {
      const root = document.querySelector('html')
      if (root) root.style.scrollBehavior = 'auto'
    }

    if (_from.name === _to.name) return

    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
}
