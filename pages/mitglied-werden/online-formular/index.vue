<script setup lang="ts">
definePageMeta({
  layout: 'invest-wizard',
})

if (import.meta.client) {
  navigateTo('/mitglied-werden/online-formular/persoenliche-daten')
}
</script>

<template>
  <div class="default-container">
    <div class="content">
      <p>Weiterleitung...</p>
    </div>
  </div>
</template>
