<template>
  <NuxtLink to="/" @click="scrollUpOnLandingPage()">
    <div class="fixedLogoContainer">
      <!-- <img
        src="/images/logo-einhaus-genossenschaft-leipzig.svg"
        style="height: 100%; width: 100%; object-fit: contain"
        v-bind:class="{ 'conditional-class': isWhite }"
      /> -->
      <img
        src="/images/logo-einhaus-genossenschaft-leipzig-2-snaped.svg"
        v-bind:class="{ 'conditional-class': isWhite }"
        alt="EinHaus Reichpietschtrasse 13 eG - Logo"
      />
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps({
  isWhite: {
    type: Boolean,
    default: false,
  },
})

function scrollUpOnLandingPage() {
  const route = useRoute()

  if (route.name == 'index') window.scrollTo(0, 0)
}
</script>

<style lang="scss" scoped>
.fixedLogoContainer {
  position: relative;
  height: 100%;
  width: 100%;

  img {
    height: 100%;
    object-fit: contain;

    &::selection {
      background-color: transparent;
    }
  }
}

.conditional-class {
  /**
  * Only switch to white logo, when screen size bigger than $_lg
  * */
  @media screen and (min-width: 821px) {
    filter: invert(100%);
  }
}

a,
a:link,
router-link-active,
router-link-exact-active {
  padding: 0;
  margin: 0;
}
</style>
