<template>
  <div>
    <div
      v-if="lastContainer"
      class="intersection-observer-alert-element-top"
    ></div>

    <div
      :id="slug"
      class="landing-container background"
      :class="{
        'landing-container-first': firstContainer,
        'landing-container-no-bottom-border': lastContainer,
        'fix-background-image': lastContainer,
      }"
      :style="
        visible
          ? `background-image: url(${backgroundImageUrl});`
          : `background-image: url(${backgroundImageUrlSmall})`
      "
    >
      <div class="landing-contentBox">
        <h2>{{ title }}</h2>

        <div v-html="htmlText"></div>

        <slot />
      </div>
    </div>

    <div
      v-if="lastContainer"
      class="intersection-observer-alert-element-bottom"
    ></div>
  </div>
</template>

<script setup lang="ts">
import type { LandingPageContent } from '@/util/types'

const props = withDefaults(defineProps<LandingPageContent>(), {
  lastContainer: false,
  firstContainer: false,
  visible: false,
})

const backgroundImageUrlSmall = computed(() => {
  return props.backgroundImageUrl.replace('.jpg', '-small.jpg')
})

function fixBackgroundImage() {
  if (window.innerWidth < 1280) return

  const element = document.querySelector(
    '.fix-background-image'
  ) as HTMLDivElement

  const intersectioObserverAlertElementBottom = document.querySelector(
    '.intersection-observer-alert-element-bottom'
  ) as HTMLDivElement

  const intersectioObserverAlertElementTop = document.querySelector(
    '.intersection-observer-alert-element-top'
  ) as HTMLDivElement

  if ('IntersectionObserver' in window) {
    let fixBackgroundImage = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (entry.target === intersectioObserverAlertElementTop) {
            element.classList.remove('sticky-background')
            return
          }

          element.classList.add('sticky-background')
        }
      })
    })

    fixBackgroundImage.observe(intersectioObserverAlertElementBottom)
    fixBackgroundImage.observe(intersectioObserverAlertElementTop)
  }
}

onMounted(() => {
  if (props.lastContainer) fixBackgroundImage()
})
</script>

<style lang="scss" scoped>
.sticky-background {
  background-attachment: scroll;
}

.landing-container-no-bottom-border {
  border: none;
}

:deep(small) {
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.8;
  line-height: 0.1rem;
}

.intersection-observer-alert-element-top,
.intersection-observer-alert-element-bottom {
  position: absolute;
  background-color: transparent;
  height: 1px;
  width: 100%;
}

.intersection-observer-alert-element-top {
  top: -2px;
}

.intersection-observer-alert-element-bottom {
  bottom: -2px;
}

@media screen and (min-width: $_md) {
  .landing-container-first {
    /**
    // TODO
    // subtracts spaces for top and bottom, so that the one-scroll-menu is in the vertical center
    */
    margin-top: calc((-50vh + 250px / 2) - 50vh - 250px / 2);
  }
}
</style>
