<template>
  <div class="on-site-menu">
    <ul>
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
      const pageSections = [].slice.call(
        document.querySelectorAll('h1, .landing-contentBox h2')
      )

      if ('IntersectionObserver' in window) {
        let menuHighlightObserver = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              const menuItemToHighlight = document.querySelector(
                `#${entry.target.closest('.landing-container')?.id}-nav`
              )

              if (entry.isIntersecting) {
                menuItemToHighlight?.classList.add('is-active')

                const activeMenuItems = Array.from(
                  document.querySelectorAll('.is-active')
                ).forEach(activeMenuItem => {
                  if (activeMenuItem?.id != menuItemToHighlight?.id)
                    activeMenuItem.classList.remove('is-active')
                })

                if (entry.target.localName == 'h1') {
                  this.$router.push(`/`)
                  return
                }

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
  position: sticky;
  z-index: 1;
  width: max-content;
  left: 0;
  margin-left: max(1rem, calc((100vw - 800px) / 2 - 200px - 3rem));
  margin-top: 2rem;
  margin-top: calc(50vh - (250px / 2));
  margin-bottom: calc(50vh - (250px / 2));
  top: calc(50% - (250px / 2));

  @media screen and (min-width: $_md) {
    display: block;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    height: 50px;
    width: 200px;
    padding: 0;
    margin: 0;

    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: column;

    border-right: 1px solid grey;
  }

  ul li a,
  ul li a:visited {
    display: block;
    color: var(--main-text-color-light);

    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: -0.5px;
    text-decoration: none;
    line-height: 1rem;
    text-align: right;

    display: flex;
    align-content: center;
    justify-content: right;
    padding-top: 0.9rem;
    padding-right: 0.9rem;
    padding-bottom: 0.9rem;
    padding-left: 0.6rem;
  }

  // ul li:hover {
  //   background-color: white;
  //   box-shadow: 0px 0px 0.4rem rgba(70, 70, 70, 0.9);
  // }

  // ul li a:hover {
  //   color: var(--main-text-color-dark);
  // }

  .is-active {
    background-color: var(--onescroll-menu-background-highlighting);
    border-right: 4px solid white;
  }

  // .is-active:hover {
  //   box-shadow: none;
  // }

  li.is-active a,
  li.is-active a:visited {
    font-weight: bold;
    margin-right: -3px;
  }
}
</style>
