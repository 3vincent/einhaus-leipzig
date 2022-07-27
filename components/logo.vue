<template>
  <NuxtLink to="/">
    <div class="fixedLogoContainer">
      <!-- <img
        src="/images/logo-einhaus-genossenschaft-leipzig.svg"
        style="height: 100%; width: 100%; object-fit: contain"
        v-bind:class="{ 'conditional-class': isWhite }"
      /> -->
      <img
        src="/images/logo-einhaus-genossenschaft-leipzig-2-snaped.svg"
        v-bind:class="{ 'conditional-class': isWhite }"
        style="height: 100%; object-fit: contain"
        alt="EinHaus Reichpietschtrasse 13 eG - Logo"
      />
    </div>
  </NuxtLink>
</template>

<script>
export default {
  name: 'Logo',
  props: {
    isWhite: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
.fixedLogoContainer {
  position: relative;
  height: 100%;
  width: 100%;
}

.conditional-class {
  filter: invert(100%);
}

a,
a:link,
router-link-active,
router-link-exact-active {
  padding: 0;
  margin: 0;
}
</style>
