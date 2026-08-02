<template>
  <nav ref="userMenu" class="user-menu-container" aria-label="Hauptnavigation">
    <div class="user-menu-icon-container">
      <MenuButton :is-active="menuVisible" @toggle="toggleMenu" />
    </div>

    <div
      class="user-menu-list-container"
      :class="{ 'is-visible': menuVisible, 'hide-on-load': hideOnLoad }"
    >
      <ul id="primary-navigation" class="user-menu-list">
        <li v-for="(link, index) in navigationLinks" :key="link.to">
          <NuxtLink
            :ref="element => setFirstLink(element, index)"
            :to="link.to"
            :aria-current="route.path === link.to ? 'page' : undefined"
            @click="closeMenu"
          >
            <span>{{ link.label }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { PRIMARY_NAVIGATION_LINKS } from '~~/util/navigation-links'

const menuVisible = ref(false)
const hideOnLoad = ref(true)
const userMenu = ref<HTMLElement | null>(null)
const firstLink = ref<HTMLElement | null>(null)
const route = useRoute()
type NavLink = (typeof PRIMARY_NAVIGATION_LINKS)[number]
const navigationLinks = computed(() =>
  PRIMARY_NAVIGATION_LINKS.filter((link: NavLink) => {
    const slug = link.to.toLowerCase()
    return !slug.includes('datenschutz') && !slug.includes('impressum')
  })
)

onMounted(() => {
  document.addEventListener('click', detectOutsideClickToClose)
  document.addEventListener('keydown', handleKeydown)

  setTimeout(() => {
    hideOnLoad.value = false
  }, 150)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', detectOutsideClickToClose)
  document.removeEventListener('keydown', handleKeydown)
})

function setFirstLink(element: unknown, index: number) {
  if (index !== 0) return

  const component = element as { $el?: HTMLElement } | null
  firstLink.value = component?.$el || null
}

async function toggleMenu() {
  menuVisible.value = !menuVisible.value

  if (menuVisible.value) {
    await nextTick()
    firstLink.value?.focus()
  }
}

function closeMenu() {
  menuVisible.value = false
}

function detectOutsideClickToClose(event: MouseEvent) {
  const isClickInside =
    event.target instanceof Node && userMenu.value?.contains(event.target)

  if (!isClickInside) closeMenu()
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') closeMenu()
}
</script>

<style lang="scss" scoped>
.user-menu {
  &-list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: block;
      margin-top: 00px;
      margin-bottom: 00px;

      // a.router-link-active {
      //   font-weight: 600;
      // }

      // a.nuxt-link-exact-active {
      //   background-color: red !important;
      //   color: red !important;
      // }

      a,
      a:visited {
        background-color: transparent;
        display: block;
        border: 0px solid transparent;
        padding: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-decoration: none;
        color: inherit;
        font-size: 16px;
        font-weight: 500;
        border-radius: 6px;
      }

      a:hover {
        background-color: var(--color-menu-highlight);
      }

      a[aria-current='page'] {
        color: var(--color-brand-hover);
        background-color: var(--color-menu-highlight);
        font-weight: 700;
      }

      a:focus-visible {
        outline: 3px solid var(--color-brand);
        outline-offset: 2px;
      }
    }

    &-container {
      position: absolute;
      z-index: 1900;
      width: 210px;
      top: 60px;
      right: 0;
      padding: 10px;

      background-color: white;
      border-radius: 10px;
      border: 1px solid var(--color-border);

      opacity: 0;
      transform: translateX(50px) perspective(200px) rotateY(-40deg);
      animation-name: hide-animation;
      animation-duration: 150ms;
      animation-fill-mode: forwards;

      @keyframes hide-animation {
        0% {
          opacity: 1;
          transform: translateX(0) perspective(200px) rotateY(0);
        }

        100% {
          opacity: 0;
          transform: translateX(50px) perspective(200px) rotateY(-40deg);
          visibility: hidden;
        }
      }

      &.hide-on-load {
        opacity: 0;
        transform: translateX(50px) perspective(200px) rotateY(-40deg);
        visibility: hidden;
      }
    }
  }
}

.is-visible {
  will-change: transform, opacity;
  transform: translateX(0) perspective(200px) rotateY(0deg);
  opacity: 1;
  visibility: visible;
  animation-name: show-animation;
  animation-duration: 150ms;
  animation-fill-mode: forwards;

  @keyframes show-animation {
    0% {
      opacity: 0;
      transform: translateX(50px) perspective(200px) rotateY(-40deg);
    }

    100% {
      opacity: 1;
      transform: translateX(0) perspective(200px) rotateY(0);
      visibility: visible;
    }
  }
}
</style>
