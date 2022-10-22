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
export default {
  name: 'LandingOneScrollMenu',

  methods: {
    highlighMenuItem() {
      const pageSections = [].slice.call(document.querySelectorAll('h1, h2'))

      if ('IntersectionObserver' in window) {
        let menuHighlightObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              const menuItemToHighlight = document.querySelector(
                `#${entry.target.closest('.landing-container')!.id}-nav`
              )

              if (entry.isIntersecting) {
                menuItemToHighlight?.classList.add('is-active')

                const activeMenuItems = Array.from(
                  document.querySelectorAll('.is-active')
                ).forEach(activeMenuItem => {
                  if (activeMenuItem?.id != menuItemToHighlight?.id)
                    activeMenuItem.classList.remove('is-active')
                })
                this.$router.push(
                  `/#${entry.target.parentElement?.parentElement?.id}`
                )
              }
            })
          }
        )

        pageSections.forEach(pageSections => {
          menuHighlightObserver.observe(pageSections)
        })
      }
    },
  },

  mounted() {
    this.highlighMenuItem()
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
