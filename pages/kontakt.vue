<script setup lang="ts">
useSeoMeta({
  title: 'Kontakt - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  description:
    'Wenn Du mit uns in Kontakt treten willst, schreib uns eine Email oder füll das Kontaktformular aus.',
  ogTitle:
    'Kontakt - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogSiteName:
    'Kontakt - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogImage:
    'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
  ogDescription:
    'Wenn Du mit uns in Kontakt treten willst, schreib uns eine Email oder füll das Kontaktformular aus.',
  ogUrl: 'https://www.einhaus-leipzig.de/kontakt',
  ogType: 'website',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de/kontakt',
    },
  ],
})

definePageMeta({
  layout: 'default',
})

const envVar = useRuntimeConfig()
</script>

<template>
  <div class="default-container">
    <div class="content">
      <BreadcrumbNav />

      <h1>Kontakt</h1>
      <p>
        Wenn Du mit uns in Kontakt treten willst, schreib uns eine Email an
        {{ envVar.public.OFFICIAL_CONTACT_ADDRESS }} oder füll das
        Kontaktformular aus.
      </p>
      <p> Wir werden uns schnellstmöglich bei Dir melden! </p>
      <ContactForm />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-container {
  @media screen and (min-width: $lg) {
    &::before {
      background-image: url(/images/einhaus-landing-photo-04.jpg);
    }
  }

  p {
    font-size: 1.1rem;
  }
}
</style>
