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

      <li id="unterstuetzung-nav">
        <NuxtLink :to="{ hash: '#unterstuetzung' }" :external="true">
          Unterstütze unser Projekt
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
type DivsToHangOnToChildData = {
  topY: number
  bottomY: number
  menuItem: HTMLLIElement
  divId: string
}

interface DivsToHangOnToData {
  [key: number]: DivsToHangOnToChildData
}

export default {
  name: 'LandingOneScrollMenu',
  data() {
    return {
      divsToHangOnTo: {} as DivsToHangOnToData,
      divSearchIndex: [] as DivsToHangOnToChildData['topY'][],
    }
  },
  methods: {
    mapPositionsOfDivs() {
      this.divSearchIndex.length = 0

      const children = Array.from(
        document.querySelectorAll('.landing-container')
      ).map(c => `#${c.id}`)

      const windowHeight = window.innerHeight

      const scrollPos = window.scrollY

      children.forEach(child => {
        const element = document.querySelector(child)

        if (element) {
          const elementRect = element.getBoundingClientRect()

          const elementTopValue: number =
            elementRect.top + scrollPos - windowHeight / 2

          this.divsToHangOnTo[elementTopValue] = {
            topY: elementTopValue,
            bottomY: elementRect.bottom + scrollPos - windowHeight / 2,
            menuItem: document.querySelector(`${child}-nav`)!,
            divId: child,
          }

          this.divSearchIndex.push(elementTopValue)
        }
      })
    },

    highlightMenuItem() {
      /** TODO:
       *
       *    √ Store data in data :)
       *    √ on mounted and on resize read position of divs and store
       *      in an object
       *    x Maybe add a scroll limiter (-> only execute every x pixels scrolled)
       *    √ fix bug with this.$router.push when clicking a nuxt-link (flickering)
       *
       * */

      const scrollPositionY = window.scrollY

      const inViewportDiv = this.divSearchIndex.find(
        div =>
          scrollPositionY < this.divsToHangOnTo[div].bottomY &&
          scrollPositionY > this.divsToHangOnTo[div].topY
      )

      const activeClassDiv = this.divSearchIndex.find(div =>
        this.divsToHangOnTo[div].menuItem.classList.contains('is-active')
      )

      if (activeClassDiv === inViewportDiv) return

      activeClassDiv
        ? this.divsToHangOnTo[activeClassDiv].menuItem.classList.remove(
            'is-active'
          )
        : false

      if (inViewportDiv) {
        this.divsToHangOnTo[inViewportDiv].menuItem.classList.add('is-active')
        this.$router.push(`/${this.divsToHangOnTo[inViewportDiv].divId}`)
      }
    },
  },

  beforeMount() {
    window.addEventListener('scroll', this.highlightMenuItem, false)
    window.addEventListener('resize', this.mapPositionsOfDivs, false)
  },

  mounted() {
    this.mapPositionsOfDivs()
    this.highlightMenuItem()
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.highlightMenuItem, false)
    window.removeEventListener('resize', this.mapPositionsOfDivs, false)
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
    padding-left: 1.2rem;
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
    font-weight: bold;
    color: var(--main-text-color-dark);
    letter-spacing: -0.5px;
  }
}
</style>
