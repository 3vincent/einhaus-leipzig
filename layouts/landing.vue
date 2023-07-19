<script setup lang="ts">
const route = useRoute()

useHead({
  link: [
    {
      hid: 'canonical',
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de' + route.path,
    },
  ],
})
</script>

<template>
  <div class="siteContainer">
    <TopMenuBar :is-landing="true" :logo-white="true" />
    <slot />
    <Footer :is-landing="true" />
    <CookieBanner />
  </div>
</template>
