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
    <TopMenuBar :is-landing="true" :logo-white="true" />
    <NuxtPage />
    <Footer :is-landing="true" />
    <CookieBanner />
    <ToastStack />
  </div>
</template>
