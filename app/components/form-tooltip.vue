<template>
  <div
    ref="tooltipContainer"
    class="tooltip-container"
    :style="`top: ${topOffset}px`"
  >
    {{ text }}

    <i></i>
  </div>
</template>

<script setup lang="ts">
const { text = 'Pflichtfeld. Bitte ausfüllen.' } = defineProps<{
  text?: string
}>()

const topOffset = ref(0)
const tooltipContainer = ref<HTMLElement | null>(null)

const calculateTopOffset = () => {
  if (tooltipContainer.value) {
    const height = tooltipContainer.value.getBoundingClientRect().height
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
  color: var(--color-warning);
  background-color: var(--color-warning-surface);
  border: 1px solid var(--color-warning-border);
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
  background-color: var(--color-warning-surface);
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid var(--color-warning-border);
  border-right: 1px solid var(--color-warning-border);
}
</style>
