<script setup>
/* global definePageMeta:readonly */
/* eslint no-undef: "error" */
definePageMeta({
  layout: 'landing',
})
</script>

<script>
export default {
  beforeMount() {
    const root = document.querySelector('html')
    root.style.scrollBehavior = 'auto'

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    })
  },

  mounted() {
    const root = document.querySelector('html')
    root.style.scrollBehavior = 'smooth'
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

<style lang="scss">
html {
  scroll-behavior: smooth;
}
</style>
