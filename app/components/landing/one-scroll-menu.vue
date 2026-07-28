<template>
  <nav class="on-site-menu" aria-label="Abschnitte auf dieser Seite">
    <button
      type="button"
      class="mobile-section-trigger"
      :aria-expanded="mobileMenuOpen"
      aria-controls="section-navigation"
      @click="mobileMenuOpen = !mobileMenuOpen"
    >
      <span class="current-section">{{ activeSection?.text }}</span>
      <span class="trigger-symbol" aria-hidden="true">
        {{ mobileMenuOpen ? '↑' : '↓' }}
      </span>
    </button>

    <ul
      id="section-navigation"
      class="section-list"
      :class="{ 'is-mobile-open': mobileMenuOpen }"
    >
      <li
        v-for="menuEntry in menuEntries"
        :id="`${menuEntry.hash}-nav`"
        :key="menuEntry.hash"
        :class="{ 'is-active': activeHash === menuEntry.hash }"
      >
        <NuxtLink
          :to="{ hash: `#${menuEntry.hash}` }"
          :external="true"
          :aria-current="activeHash === menuEntry.hash ? 'location' : undefined"
          @click="mobileMenuOpen = false"
        >
          <span class="section-title">{{ menuEntry.text }}</span>
        </NuxtLink>
      </li>

      <li class="section-rule" aria-hidden="true">
        <span
          class="section-progress"
          :style="{
            transform: `translateY(${menuItemIndicatorScrollPosition}px)`,
          }"
        ></span>
      </li>
    </ul>

    <span class="mobile-progress" aria-hidden="true">
      <span :style="{ width: `${activeProgress}%` }"></span>
    </span>
  </nav>
</template>

<script setup lang="ts">
import { LANDING_PAGE_SLUGS } from '~~/util/enums'

const menuItemIndicatorScrollPosition = ref(0)
const activeHash = ref<LANDING_PAGE_SLUGS>(LANDING_PAGE_SLUGS.BISHER)
const mobileMenuOpen = ref(false)
let menuHighlightObserver: IntersectionObserver | undefined

type MenuEntry = {
  hash: LANDING_PAGE_SLUGS
  text: string
}

const menuEntries: MenuEntry[] = [
  { hash: LANDING_PAGE_SLUGS.BISHER, text: 'Was bisher geschah' },
  { hash: LANDING_PAGE_SLUGS.ZIELE, text: 'Unsere Ziele' },
  { hash: LANDING_PAGE_SLUGS.GEMEINSCHAFT, text: 'EinHaus Gemeinschaft' },
  { hash: LANDING_PAGE_SLUGS.WOHNHAUS, text: 'Mehr als ein Wohnhaus' },
  { hash: LANDING_PAGE_SLUGS.UNTERSTUZUNG, text: 'Unterstütze unser Projekt' },
]

const activeSectionIndex = computed(() =>
  Math.max(
    0,
    menuEntries.findIndex(entry => entry.hash === activeHash.value)
  )
)
const activeSection = computed(() => menuEntries[activeSectionIndex.value])
const activeProgress = computed(
  () => ((activeSectionIndex.value + 1) / menuEntries.length) * 100
)

function highlightMenuItem() {
  menuHighlightObserver?.disconnect()

  const pageSections = Array.from(
    document.querySelectorAll<HTMLElement>('.landing-contentBox')
  )

  if (!('IntersectionObserver' in window)) return

  menuHighlightObserver = new IntersectionObserver(
    entries => {
      const visibleSection = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      const sectionId = visibleSection?.target.closest('.landing-container')?.id
      const menuIndex = menuEntries.findIndex(entry => entry.hash === sectionId)

      if (menuIndex < 0) return

      activeHash.value = menuEntries[menuIndex]!.hash
      menuItemIndicatorScrollPosition.value = 50 * menuIndex

      const url = new URL(window.location.href)
      url.hash = activeHash.value
      history.replaceState(history.state, '', url)
    },
    { threshold: 0.75 }
  )

  pageSections.forEach(pageSection =>
    menuHighlightObserver?.observe(pageSection)
  )
}

onMounted(highlightMenuItem)
onBeforeUnmount(() => menuHighlightObserver?.disconnect())
</script>

<style lang="scss" scoped>
.on-site-menu {
  position: sticky;
  top: 60px;
  z-index: 1002;
  width: 100%;
  background: white;
  border-top: 1px solid var(--main-text-color-dark);
  border-bottom: 1px solid var(--main-text-color-dark);

  @media screen and (min-width: $md) {
    left: 0;
    top: calc(50% - (250px / 2));
    width: 220px;
    margin-top: calc(50vh - (250px / 2));
    margin-bottom: calc(50vh - (250px / 2));
    margin-left: max(1rem, calc((100vw - 800px) / 2 - 220px - 3rem));
    background: transparent;
    border: 0;

    &::before {
      content: '';
      position: absolute;
      z-index: -1;
      top: -0.75rem;
      right: -3rem;
      bottom: -0.75rem;
      left: -1.5rem;
      background: linear-gradient(
        90deg,
        rgba(0, 0, 0, 0.58) 0%,
        rgba(0, 0, 0, 0.34) 68%,
        transparent 100%
      );
      pointer-events: none;
    }
  }
}

.mobile-section-trigger {
  display: grid;
  width: 100%;
  min-height: 52px;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  padding: 0.8rem 1rem;
  align-items: center;
  color: var(--main-text-color-dark);
  background: white;
  border: 0;
  font: inherit;
  text-align: left;
  cursor: pointer;

  @media screen and (min-width: $md) {
    display: none;
  }
}

.current-section {
  overflow: hidden;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-overflow: ellipsis;
  text-transform: uppercase;
  white-space: nowrap;
}

.trigger-symbol {
  font-size: 1rem;
  line-height: 1;
}

.section-list {
  display: none;
  margin: 0;
  padding: 0;
  background: white;
  list-style: none;

  &.is-mobile-open {
    display: block;
    border-top: 1px solid var(--main-text-color-dark);
  }

  @media screen and (min-width: $md) {
    display: block;
    width: 220px;
    background: transparent;
  }
}

.section-list li:not(.section-rule) {
  width: 100%;
  height: 50px;
  margin: 0;
  padding: 0;
}

.section-list a,
.section-list a:visited {
  display: grid;
  width: 100%;
  height: 50px;
  grid-template-columns: 1fr;
  padding: 0 1rem;
  align-items: center;
  color: var(--main-text-color-dark);
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1;
  text-decoration: none;

  @media screen and (min-width: $md) {
    padding: 0 1.1rem 0 0;
    color: var(--main-text-color-light);
    opacity: 0.8;
    text-align: right;
  }
}

.section-title {
  @media screen and (min-width: $md) {
    justify-self: end;
  }
}

.section-list li.is-active a,
.section-list a:hover,
.section-list a:focus-visible {
  opacity: 1;
}

.section-list li.is-active a {
  font-weight: 750;
}

.section-list a:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: -3px;
}

.section-rule {
  display: none;

  @media screen and (min-width: $md) {
    position: absolute;
    display: block;
    right: 0;
    top: 0;
    width: 1px;
    height: 250px;
    background: rgba(255, 255, 255, 0.26);
    list-style: none;
  }
}

.section-progress {
  position: absolute;
  right: -1px;
  top: 0;
  width: 3px;
  height: 50px;
  background: var(--main-text-color-light);
  transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1);
}

.mobile-progress {
  display: block;
  width: 100%;
  height: 2px;
  background: rgba(0, 0, 0, 0.15);

  > span {
    display: block;
    height: 100%;
    background: var(--main-text-color-dark);
    transition: width 200ms cubic-bezier(0.22, 1, 0.36, 1);
  }

  @media screen and (min-width: $md) {
    display: none;
  }
}
</style>
