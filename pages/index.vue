<script setup lang="ts">
definePageMeta({
  layout: 'landing',
})

function lazyLoadImages() {
  const lazyBackgrounds = Array.from(document.querySelectorAll('.background'))

  if ('IntersectionObserver' in window) {
    let lazyBackgroundObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            lazyBackgroundObserver.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px 200px 0px' }
    )

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground)
    })
  }
}

onMounted(() => {
  lazyLoadImages()
})
</script>

<template>
  <main>
    <LandingStart />
    <!-- <LandingAktuelles /> -->
    <div>
      <LandingOneScrollMenu />
      <LandingBisher />
      <LandingZiele />
      <LandingGemeinschaft />
      <LandingMehr />
      <LandingUnterstutzung />
    </div>
  </main>
</template>
