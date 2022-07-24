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

  beforeUnmount() {
    const root = document.querySelector('html')
    root.style.scrollBehavior = 'auto'
  },

  mounted() {
    const root = document.querySelector('html')

    setTimeout(function () {
      root.style.scrollBehavior = 'smooth'
    }, 500)
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
