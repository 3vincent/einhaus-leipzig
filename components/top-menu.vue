<template>
  <div
    class="top-menu-container"
    v-bind:class="{ 'conditional-class': isRelative }"
  >
    <div class="logo-container"><Logo :isWhite="logoWhite" /></div>

    <div class="menu-container">
      <ul>
        <li>
          <!-- <NuxtLink to="/"> -->
          <NuxtLink to="/">
            <span>Home</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/impressum">
            <span>Impressum</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopMenu',
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
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onFixedTopMenu, false)
  },

  beforeMount() {
    window.addEventListener('scroll', this.onFixedTopMenu, false)
  },

  methods: {
    onFixedTopMenu() {
      const element = document.querySelector('.top-menu-container')
      const style = window.getComputedStyle(element)
      const position = style.getPropertyValue('position')

      // console.log(element.offsetHeight)

      if (position != 'sticky') return

      if (
        // position == 'sticky' &&
        document.documentElement.scrollTop > element.offsetHeight
      ) {
        element.classList.add('smaller-after-scroll')
      } else {
        element.classList.remove('smaller-after-scroll')
      }

      // console.log(document.documentElement.scrollTop)
      // if (
      //   document.documentElement.scrollTop > window.innerHeight &&
      //   !element.classList.contains('fixedMobileMenu')
      // ) {
      //   element.classList.add('fixedMobileMenu')
      // } else if (
      //   document.documentElement.scrollTop < window.innerHeight &&
      //   element.classList.contains('fixedMobileMenu')
      // ) {
      //   element.classList.remove('fixedMobileMenu')
      // }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/general/variables.scss';

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

  @media screen and (min-width: $_md) {
    height: 120px;
  }
}

.smaller-after-scroll {
  height: 60px;
}

.conditional-class {
  position: relative;
  position: sticky;
  background-color: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
  transition: height 0.1s;
}

.logo-container {
  height: 100%;
}

.menu-container {
  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  ul li {
    float: left;
  }
}

.fixedMobileMenu {
  position: fixed;
  height: 40px;
  width: 100vw;
  padding: 0.1rem;
  left: 0;
  top: -40px;
  right: 0;
  margin: 0;

  background-color: white;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.1), 0 0 4px rgba(0, 0, 0, 0.1);
  // animation: scrollInTop 400ms;
  -webkit-transform: translateY(100%);
  transform: translateY(100%);
  transition: transform 300ms linear;
  will-change: transform;
}

// @keyframes scrollInTop {
//   from {
//     // transform: translate(0, -100%);
//     transform: translateY(-100%);
//     will-change: transform;
//   }
//   to {
//     transform: none;
//   }
// }

a.router-link-active {
  border: 0px solid transparent;
  font-weight: 600;
}

a.nuxt-link-exact-active {
  background-color: red;
}

a,
a:visited {
  border: 0px solid transparent;
  padding: 1rem;
  text-decoration: none;
  color: inherit;
}

a:hover {
  color: #00c58e;
}
</style>
