<script setup lang="ts">
const cookieConsent = useCookie('cookieConsent')

const deleteCookie = () => {
  try {
    // @ts-ignore
    cookieConsent.value = null
    console.log('Cookie deleted..')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <a
    class="link secondary"
    v-on:click.prevent="deleteCookie"
    v-if="cookieConsent"
  >
    Cookie löschen
  </a>
</template>
