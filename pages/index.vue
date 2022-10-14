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
  },

  methods: {
    setScrollBehavior(mode: string) {
      const root = document.querySelector('html')

      if (root) root.style.scrollBehavior = mode
    },
  },
}
</script>

<template>
  <main>
    <LandingStart />
    <LandingBisher />
    <LandingZiele />
    <LandingGemeinschaft />
    <LandingMehr />
    <LandingUnterstutzung />
  </main>
</template>
