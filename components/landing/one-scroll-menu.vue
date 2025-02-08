<template>
  <div class="on-site-menu">
    <ul>
      <li
        v-for="menuEntry in menuEntries"
        :key="menuEntry.hash"
        :id="`${menuEntry.hash}-nav`"
      >
        <NuxtLink :to="{ hash: `#${menuEntry.hash}` }" :external="true">
          {{ menuEntry.text }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { LANDING_PAGE_SLUGS } from '~/util/enums'

type MenuEntry = {
  hash: LANDING_PAGE_SLUGS
  text: string
}

const menuEntries: MenuEntry[] = [
  {
    hash: LANDING_PAGE_SLUGS.BISHER,
    text: 'Was bisher geschah',
  },
  {
    hash: LANDING_PAGE_SLUGS.ZIELE,
    text: 'Unsere Ziele',
  },
  {
    hash: LANDING_PAGE_SLUGS.GEMEINSCHAFT,
    text: 'EinHaus Gemeinschaft',
  },
  {
    hash: LANDING_PAGE_SLUGS.WOHNHAUS,
    text: 'Mehr als ein Wohnhaus',
  },
  {
    hash: LANDING_PAGE_SLUGS.UNTERSTUZUNG,
    text: 'Unterstütze unser Projekt',
  },
]

async function highlightMenuItem() {
  if (window && window.innerWidth < 768) return

  const pageSections = Array.from(
    document.querySelectorAll('.landing-contentBox')
  )

  if ('IntersectionObserver' in window) {
    const observerOptions = {
      threshold: 0.75,
    }

    const menuHighlightObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(async entry => {
          const menuItems = document.querySelectorAll('.on-site-menu li')

          const menuItemToHighlight = document.querySelector(
            `#${entry.target.closest('.landing-container')?.id}-nav`
          )

          if (entry.isIntersecting) {
            menuItems.forEach(item => {
              item.classList.remove('is-active')
            })

            menuItemToHighlight?.classList.add('is-active')

            if (entry.target.parentElement?.id) {
              await navigateTo({
                hash: `#${entry.target.parentElement?.id}`,
              })

              return
            }

            await navigateTo({ hash: '' })
          }
        })
      },
      observerOptions
    )

    pageSections.forEach(pageSection => {
      menuHighlightObserver.observe(pageSection)
    })
  }
}

onMounted(() => {
  highlightMenuItem()

  window.addEventListener('resize', highlightMenuItem)
})
</script>

<style lang="scss" scoped>
.on-site-menu {
  display: none;
  position: sticky;
  z-index: 1002;
  width: max-content;
  left: 0;
  margin-left: max(1rem, calc((100vw - 800px) / 2 - 200px - 3rem));
  margin-top: 2rem;
  margin-top: calc(50vh - (250px / 2));
  margin-bottom: calc(50vh - (250px / 2));
  top: calc(50% - (250px / 2));

  @media screen and (min-width: $md) {
    display: block;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    background-color: rgba(27, 27, 27, 0.1);
    backdrop-filter: blur(4px);
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
