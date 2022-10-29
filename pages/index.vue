<script lang="ts">
definePageMeta({
  layout: 'landing',
})

export default {
  name: 'Landing',
  beforeMount() {
    this.setScrollBehavior('auto')
  },

  beforeUnmount() {
    this.setScrollBehavior('auto')
  },

  mounted() {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })

    if (window.scrollY == 0) {
      this.setScrollBehavior('smooth')
    }

    this.lazyLoadImages()
  },

  methods: {
    setScrollBehavior(mode: string) {
      const root = document.querySelector('html')

      if (root) root.style.scrollBehavior = mode
    },

    lazyLoadImages() {
      const lazyBackgrounds = [].slice.call(
        document.querySelectorAll('.background')
      )

      if ('IntersectionObserver' in window) {
        let lazyBackgroundObserver = new IntersectionObserver(function (
          entries,
          observer
        ) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible')
              lazyBackgroundObserver.unobserve(entry.target)
            }
          })
        })

        lazyBackgrounds.forEach(function (lazyBackground) {
          lazyBackgroundObserver.observe(lazyBackground)
        })
      }
    },
  },
}
</script>

<template>
  <main>
    <LandingStart />
    <div>
      <LandingOneScrollMenu />
      <LandingBisher />
      <LandingZiele />
      <LandingGemeinschaft />
      <LandingMehr />
      <LandingUnterstutzung />
    </div>
  </main>
</template>
