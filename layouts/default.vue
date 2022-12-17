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
    <TopMenuBar :is-relative="true" :logo-white="false" />
    <slot />
    <Footer />
    <CookieBanner />
  </div>
</template>
