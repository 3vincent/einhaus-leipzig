<template>
  <div class="tooltip-container" :style="`top: ${topOffset}px`">
    {{ text }}

    <i></i>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    text?: string
  }>(),
  {
    text: 'Pflichtfeld. Bitte ausfüllen.',
  }
)

const topOffset = ref(0)

const calculateTopOffset = () => {
  const tooltipContainer = document.querySelector('.tooltip-container')

  if (tooltipContainer) {
    const height = tooltipContainer.getBoundingClientRect().height
    topOffset.value = -height - 8
  }
}

onMounted(() => {
  calculateTopOffset()
})
</script>

<style scoped lang="scss">
.tooltip-container {
  position: absolute;
  max-width: 50%;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.3rem;
  z-index: 100;
  background-color: white;
  border: 2px solid var(--main-text-color-semidark);
  border-radius: 0.4rem;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);

  font-size: 0.8rem;
}

i {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -12px;
  width: 24px;
  height: 12px;
  overflow: hidden;
}

i::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background-color: #ffffff;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  border-bottom: 2px solid var(--main-text-color-semidark);
  border-right: 2px solid var(--main-text-color-semidark);
}
</style>
