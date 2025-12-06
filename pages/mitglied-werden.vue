<template>
  <div class="default-container">
    <div class="content">
      <BreadcrumbNav />

      <div class="mitglied-werden">
        <h1>Gemeinsam Zukunft bauen</h1>
        <p>Hallo</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title:
    'Mitglied werden - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  description: 'Mitglied werden',
  ogTitle:
    'Mitglied werden - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogSiteName:
    'Mitglied werden - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogImage:
    'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
  ogDescription: 'Mitglied werden',
  ogUrl: 'https://www.einhaus-leipzig.de/mitglied-werden',
  ogType: 'website',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de/mitglied-werden',
    },
  ],
})

definePageMeta({
  layout: 'default',
})

const isMobile = ref(false)

const calculateMobile = () => {
  isMobile.value = window.innerWidth < 992
}

onMounted(() => {
  addEventListener('resize', calculateMobile)
  calculateMobile()
})

onUnmounted(() => {
  removeEventListener('resize', calculateMobile)
})
</script>

<style lang="scss" scoped>
@media screen and (min-width: $lg) {
  .default-container::before {
    background-image: url(/images/einhaus-landing-photo-06.jpg);
  }
}

.default-container {
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: clamp(1.5rem, 7vw, 3.5rem);
    line-height: 1;
  }
}

.custom-paddings {
  margin-top: -80px;
}
</style>
