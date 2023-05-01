<script setup lang="ts">
defineProps({
  error: Object,
})
</script>

<template>
  <div class="siteContainer">
    <TopMenuBar :is-relative="true" :logo-white="false" />

    <div class="default-container">
      <div class="content">
        <h1>{{ error?.message }}</h1>
        <NuxtLink to="/">
          <button class="link secondary"> Back to Homepage </button>
        </NuxtLink>
        <h6>Error {{ error?.statusCode }}</h6>
      </div>
    </div>

    <Footer />

    <CookieBanner />
  </div>
</template>

<style lang="scss" scoped>
.default-container {
  min-height: 50vh;
}

h1,
h2 {
  overflow-wrap: break-word;
}

a {
  border-bottom: 0px !important;
}

@media screen and (min-width: $_lg) {
  .default-container::before {
    background-image: url(/images/einhaus-landing-photo-06.jpg);
  }
}
</style>
