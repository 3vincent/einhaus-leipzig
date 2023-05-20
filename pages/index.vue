<script lang="ts" setup>
definePageMeta({
  layout: 'landing',
})
</script>

<script lang="ts">
export default {
  name: 'Landing',

  mounted() {
    this.lazyLoadImages()

    this.setScrollBehavior('smooth')
  },

  beforeUnmount() {
    this.setScrollBehavior('auto')
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
        let lazyBackgroundObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(function (entry) {
              if (entry.isIntersecting) {
                entry.target.classList.add('visible')
                lazyBackgroundObserver.unobserve(entry.target)
              }
            })
          },
          { rootMargin: '0px 0px 200px 0px' }
        )

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
    <!-- <LandingAktuelles /> -->
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
