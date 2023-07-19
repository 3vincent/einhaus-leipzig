<template>
  <div
    class="top-menu-container"
    v-bind:class="{
      'default-sites-menubar': isDefault,
      'landing-site-menubar': isLanding,
    }"
  >
    <div class="logo-container"><Logo :isWhite="logoWhite" /></div>

    <div class="menu-container">
      <UserMenu />
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'TopMenuBar',
  props: {
    isDefault: {
      type: Boolean,
      default: false,
    },
    isLanding: {
      type: Boolean,
      default: false,
    },
    logoWhite: {
      type: Boolean,
      default: false,
    },
  },

  mounted() {
    this.onFixedTopMenu()
    window.addEventListener('scroll', this.onFixedTopMenu, false)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onFixedTopMenu, false)
  },

  methods: {
    onFixedTopMenu() {
      const element = document.querySelector(
        '.top-menu-container'
      ) as HTMLElement

      if (element) {
        const style = window.getComputedStyle(element)
        const position = style.getPropertyValue('position')

        if (position != 'sticky') return

        if (document.documentElement.scrollTop > element.offsetHeight - 5) {
          element.classList.add('smaller-after-scroll')
        } else {
          element.classList.remove('smaller-after-scroll')
        }
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.top-menu-container {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  top: 0;
  left: 0;
  z-index: 1000;
  padding: 1rem;
  background-color: transparent;

  @media screen and (min-width: $_lg) {
    height: 120px;
    background-color: transparent;
  }
}

.smaller-after-scroll {
  height: 60px;
}

.default-sites-menubar {
  position: relative; //fallback
  position: sticky;
  transition: all 0.4s;
  padding-left: 2rem;
}

.landing-site-menubar {
  position: relative; //fallback
  position: sticky;
  transition: all 0.4s;
  background-color: transparent;
  padding-left: 1.6rem;
}

.smaller-after-scroll.default-sites-menubar {
  background-color: rgba(255, 255, 255, 0.4);
  border-bottom: 1px solid rgba(106, 106, 106, 0.2);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
.smaller-after-scroll.landing-site-menubar {
  background-color: transparent;
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);

  @media (min-width: $_md) {
    -webkit-backdrop-filter: unset;
    backdrop-filter: unset;
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

  @media screen and (min-width: $_lg) {
    top: 40px;
    right: 20px;
  }
}

.top-menu-container.smaller-after-scroll .menu-container {
  top: 18px;
}
</style>
