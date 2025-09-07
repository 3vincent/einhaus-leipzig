<template>
  <div
    class="top-menu-container"
    :class="{
      'default-sites-menubar': isDefault,
      'landing-site-menubar': isLanding,
      'smaller-after-scroll': isMenuFixed,
    }"
  >
    <div class="logo-container"><Logo :is-white="logoWhite" /></div>

    <div class="menu-container">
      <UserMenu />
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  isDefault = false,
  isLanding = false,
  logoWhite = false,
} = defineProps<{
  isDefault?: boolean
  isLanding?: boolean
  logoWhite?: boolean
}>()

const isMenuFixed = ref(false)

onMounted(() => {
  makeTopMenuSticky()
  window.addEventListener('scroll', makeTopMenuSticky, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', makeTopMenuSticky, false)
})

function makeTopMenuSticky() {
  const element = document.querySelector('.top-menu-container') as HTMLElement

  if (element && window.getComputedStyle(element).position === 'sticky') {
    isMenuFixed.value =
      document.documentElement.scrollTop > element.offsetHeight - 5
  }
}
</script>

<style lang="scss" scoped>
@keyframes blur-in {
  from {
    -webkit-backdrop-filter: blur(8px) opacity(0);
    backdrop-filter: blur(8px) opacity(0);
  }

  to {
    -webkit-backdrop-filter: blur(8px) opacity(1);
    backdrop-filter: blur(8px) opacity(1);
  }
}

.top-menu-container {
  position: relative; //fallback
  position: sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  z-index: 1000;
  background-color: transparent;
  transition: all 0.2s;

  @media screen and (min-width: $lg) {
    height: 120px;
    background-color: transparent;
  }
}

.landing-site-menubar {
  background-color: transparent;

  .logo-container {
    padding: 1rem;
    margin-left: 0.6rem;
  }
}

.default-sites-menubar {
  .logo-container {
    padding: 1rem;
    margin-left: 1rem;
  }
}

.smaller-after-scroll {
  height: 60px;

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.1);
    animation: blur-in 500ms 0.2s forwards;
  }
}

.smaller-after-scroll.default-sites-menubar {
  background-color: rgba(255, 255, 255, 0.4);

  &::after {
    content: '';
    height: 1px;
    width: 100%;

    position: absolute;
    bottom: 0;

    background-color: rgba(106, 106, 106, 0.2);
  }
}
.smaller-after-scroll.landing-site-menubar {
  background-color: transparent;

  &::before {
    @media (min-width: $md) {
      transition: all 0.4s;
      background-color: transparent;
      backdrop-filter: blur(8px) opacity(0) !important;
      -webkit-backdrop-filter: blur(8px) opacity(0) !important;
      animation: none;
    }
  }
}

.logo-container {
  height: 100%;
}

.menu-container {
  position: fixed;
  right: 14px;
  top: 18px;
  transition: top 0.4s;

  @media screen and (min-width: $lg) {
    top: 40px;
    right: 20px;
  }
}

.top-menu-container.smaller-after-scroll .menu-container {
  top: 18px;
}
</style>
