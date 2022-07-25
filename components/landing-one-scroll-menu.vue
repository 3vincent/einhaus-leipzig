<template>
  <div class="on-site-menu">
    <ul>
      <li id="start-nav">
        <NuxtLink :to="{ hash: '#start' }" :external="true">Start</NuxtLink>
      </li>

      <li id="bisher-nav">
        <NuxtLink :to="{ hash: '#bisher' }" :external="true">
          Was bisher geschah
        </NuxtLink>
      </li>

      <li id="ziele-nav">
        <NuxtLink :to="{ hash: '#ziele' }" :external="true">
          Unsere Ziele
        </NuxtLink>
      </li>

      <li id="gemeinschaft-nav">
        <NuxtLink :to="{ hash: '#gemeinschaft' }" :external="true">
          EinHaus Gemeinschaft
        </NuxtLink>
      </li>

      <li id="wohnhaus-nav">
        <NuxtLink :to="{ hash: '#wohnhaus' }" :external="true">
          Mehr als ein Wohnhaus
        </NuxtLink>
      </li>

      <li id="unterstutzung-nav">
        <NuxtLink :to="{ hash: '#unterstutzung' }" :external="true">
          Unterstütze unser Projekt
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LandingOneScrollMenu',
  methods: {
    mapAnchorMenu() {
      /** TODO:
       *    - Store data in data :)
       *    - on mounted and on resize read position of divs and store
       *      in an object
       *    - fix bug with this.$router.push when clicking a nuxt-link (flickering)
       * */

      function isElementInViewport(el) {
        if (window.innerWidth < 768) return

        const element = document.querySelector(el)

        const rect = element.getBoundingClientRect()

        // console.log(`e: ${el} | t: ${rect.top} | b: ${rect.bottom}`)

        return (
          rect.top / 10 <= (window.innerHeight * 0.5) / 10 &&
          rect.top / 10 >= ((window.innerHeight * 0.5) / 10) * -1
        )
      }

      // console.log(this.$route.hash)

      // console.log('start im vue: ', isElementInViewport('#start'))
      // console.log('bisher im vue: ', isElementInViewport('#bisher'))

      const children = [...document.querySelectorAll('.landing-container')].map(
        c => `#${c.id}`
      )

      children.forEach(child => {
        const menuItem = document.querySelector(`${child}-nav`)

        if (isElementInViewport(child) == true) {
          menuItem.classList.add('is-active')

          this.$router.push(`/${child}`)
        } else if (menuItem.classList.contains('is-active')) {
          menuItem.classList.remove('is-active')
        }
      })
    },
  },

  beforeMount() {
    window.addEventListener('scroll', this.mapAnchorMenu, false)
  },

  mounted() {
    this.mapAnchorMenu()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.mapAnchorMenu, false)
  },
}
</script>

<style lang="scss" scoped>
.on-site-menu {
  display: none;
  position: fixed;
  z-index: 1020;
  margin-left: 1rem;

  left: 0;
  top: 50%;
  transform: translateY(-60%);

  @media screen and (min-width: $_md) {
    display: block;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    background-color: rgba(128, 128, 128, 0.7);
    border-radius: 6px;
    height: 50px;
    width: 200px;
    padding: 0;

    margin: 4px 0;

    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;
  }

  ul li a,
  ul li a:visited {
    display: block;
    color: var(--main-text-color-light);

    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
    line-height: 1rem;

    display: flex;
    align-content: center;
    justify-content: left;
    padding-top: 0.9rem;
    padding-right: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 1.4rem;
  }

  // ul li:hover {
  //   background-color: white;
  //   box-shadow: 0px 0px 0.4rem rgba(70, 70, 70, 0.9);
  // }

  // ul li a:hover {
  //   color: var(--main-text-color-dark);
  // }

  .is-active {
    background-color: white;
  }

  // .is-active:hover {
  //   box-shadow: none;
  // }

  li.is-active a,
  li.is-active a:visited {
    color: var(--main-text-color-dark);
  }
}
</style>
