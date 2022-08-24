<script>
/* global definePageMeta:readonly */
/* eslint no-undef: "error" */
definePageMeta({
  layout: 'default',
})

export default {
  name: 'Kontakt',
  data() {
    return {
      name: this.$options.name,
    }
  },

  mounted() {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })
  },
}
</script>

<template>
  <div class="default-container">
    <div class="content">
      <BreadcrumbNav :target-url="name" />

      <h1>Kontakt</h1>
      <p>
        Wenn Du mit uns in Kontakt treten willst, schreib uns eine Email an
        info@einhaus-leipzig.de oder füll das Kontaktformular aus.
      </p>
      <p> Wir werden uns schnellstmöglich bei Dir melden! </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.default-container {
  &::before {
    background-image: url(/images/einhaus-landing-photo-04.jpg);
  }

  p {
    font-size: 1.1rem;
  }
}
</style>
