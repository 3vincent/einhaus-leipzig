<template>
  <div class="default-container">
    <div class="content">
      <BreadcrumbNav />
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title:
    'Mitglied werden - Online-Beitritt ausfüllen - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  description: 'Mitglied werden',
  ogTitle:
    'Mitglied werden - Online-Beitritt ausfüllen - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogSiteName:
    'Mitglied werden - Online-Beitritt ausfüllen - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogImage:
    'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
  ogDescription: 'Mitglied werden - Online-Beitritt ausfüllen',
  ogUrl:
    'https://www.einhaus-leipzig.de/mitglied-werden/online-beitritt-ausfuellen',
  ogType: 'website',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de/mitglied-werden/online-beitritt-ausfuellen',
    },
  ],
})

definePageMeta({
  layout: 'default',
  breadcrumb: 'Online-Beitritt ausfüllen',
})
</script>
