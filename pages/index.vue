<script>
definePageMeta({
  layout: 'landing',
})

export default {
  name: 'Landing',
  beforeMount() {
    const root = document.querySelector('html')
    root.style.scrollBehavior = 'auto'
  },

  beforeUnmount() {
    const root = document.querySelector('html')
    root.style.scrollBehavior = 'auto'
  },

  mounted() {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })

    const root = document.querySelector('html')

    if (window.scrollY == 0) {
      root.style.scrollBehavior = 'smooth'
    }
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
