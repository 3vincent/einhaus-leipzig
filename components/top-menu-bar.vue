<template>
  <div
    class="top-menu-container"
    v-bind:class="{ 'conditional-class': isRelative }"
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
    isRelative: {
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
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
}

.conditional-class {
  position: relative; //fallback
  position: sticky;
  transition: all 0.4s;
  background-color: rgba(255, 255, 255, 1);

  @media screen and (min-width: $_md) {
    background-color: transparent;
  }
}

.smaller-after-scroll.conditional-class {
  background-color: rgba(255, 255, 255, 1);
}

.logo-container {
  height: 100%;
}

.menu-container {
  position: fixed;
  right: 10px;
  top: 10px;
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
