<script setup lang="ts">
const route = useRoute()

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de' + route.path,
    },
  ],
})
</script>

<template>
  <div class="siteContainer">
    <TopMenuBar :is-default="true" :logo-white="false" />
    <NuxtPage />
    <Footer />
    <CookieBanner />
  </div>
</template>
