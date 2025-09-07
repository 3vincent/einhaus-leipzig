<template>
  <div class="on-site-menu">
    <ul>
      <li
        v-for="menuEntry in menuEntries"
        :id="`${menuEntry.hash}-nav`"
        :key="menuEntry.hash"
      >
        <NuxtLink :to="{ hash: `#${menuEntry.hash}` }" :external="true">
          {{ menuEntry.text }}
        </NuxtLink>
      </li>

      <div
        class="menuItemIndicator"
        :style="{
          transform: `translateY(${menuItemIndicatorScrollPosition}px)`,
        }"
      ></div>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { LANDING_PAGE_SLUGS } from '~/util/enums'

const menuItemIndicatorScrollPosition = ref(0)

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
      (entries, _observer) => {
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

            const currentHighlightedMenuItemIndex = Array.from(
              menuItems
            ).findIndex(item => item.id === menuItemToHighlight?.id)

            if (currentHighlightedMenuItemIndex >= 0)
              menuItemIndicatorScrollPosition.value =
                50 * currentHighlightedMenuItemIndex
            if (currentHighlightedMenuItemIndex < 0)
              menuItemIndicatorScrollPosition.value = 0

            // update url while scrolling over elements but not clicking in the side menu
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

  // .is-active {
  // }

  .menuItemIndicator {
    position: absolute;
    height: 50px;
    width: 3px;
    right: -1px;
    top: 0px;
    background-color: white;
    transition: transform 0.3s ease-in-out;
    will-change: transform;
  }

  li.is-active a,
  li.is-active a:visited {
    font-weight: bold;
    margin-right: -3px;
  }
}
</style>
