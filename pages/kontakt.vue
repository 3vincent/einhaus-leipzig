<script setup lang="ts">
useHead({
  title: 'Kontakt - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  meta: [
    {
      name: 'description',
      content:
        'Wenn Du mit uns in Kontakt treten willst, schreib uns eine Email oder füll das Kontaktformular aus.',
    },
    {
      hid: 'og:title',
      name: 'og:title',
      content:
        'Kontakt - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
    },
    {
      hid: 'og:site_name',
      property: 'og:site_name',
      content:
        'Kontakt - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
    },
    {
      hid: 'og:image',
      property: 'og:image',
      content:
        'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
    },
    {
      hid: 'og:description',
      property: 'og:description',
      content:
        'Wenn Du mit uns in Kontakt treten willst, schreib uns eine Email oder füll das Kontaktformular aus.',
    },
    {
      hid: 'og:url',
      property: 'og:url',
      content: `https://www.einhaus-leipzig.de/kontakt`,
    },
    {
      hid: 'og:type',
      property: 'og:type',
      content: 'website',
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
  @media screen and (min-width: $_lg) {
    &::before {
      background-image: url(/images/einhaus-landing-photo-04.jpg);
    }
  }

  p {
    font-size: 1.1rem;
  }
}
</style>
