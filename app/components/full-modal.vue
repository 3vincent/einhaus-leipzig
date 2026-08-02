<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-show="show" class="modal-overlay" @mousedown.self="closeModal">
        <div
          ref="dialog"
          class="modal"
          role="dialog"
          aria-modal="true"
          :aria-label="label"
          tabindex="-1"
          @keydown="handleKeydown"
        >
          <div class="modal-content">
            <slot></slot>
          </div>
          <button
            v-if="showCloseButton"
            class="close-button link secondary small"
            type="button"
            @click="closeModal"
            >Schließen</button
          >
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const emit = defineEmits<{ close: [] }>()

const {
  show = false,
  showCloseButton = false,
  label = 'Dialog',
} = defineProps<{
  show?: boolean
  showCloseButton?: boolean
  label?: string
}>()
const dialog = ref<HTMLElement | null>(null)
let previouslyFocusedElement: HTMLElement | null = null

const focusableSelector =
  'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

watch(
  () => show,
  async isShown => {
    if (!import.meta.client) return

    if (!isShown) {
      restoreFocus()
      return
    }

    previouslyFocusedElement = document.activeElement as HTMLElement | null
    await nextTick()
    const firstFocusable =
      dialog.value?.querySelector<HTMLElement>(focusableSelector)
    ;(firstFocusable ?? dialog.value)?.focus()
  },
  { immediate: true, flush: 'post' }
)

onBeforeUnmount(restoreFocus)

const closeModal = () => {
  emit('close')
}

function restoreFocus() {
  if (!import.meta.client) return

  previouslyFocusedElement?.focus()
  previouslyFocusedElement = null
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    closeModal()
    return
  }

  if (event.key !== 'Tab' || !dialog.value) return

  const focusableElements = Array.from(
    dialog.value.querySelectorAll<HTMLElement>(focusableSelector)
  )

  if (focusableElements.length === 0) {
    event.preventDefault()
    dialog.value.focus()
    return
  }

  const first = focusableElements[0]
  const last = focusableElements.at(-1)

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault()
    last?.focus()
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault()
    first?.focus()
  }
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-overlay);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;
}

.modal {
  background-color: var(--color-surface);
  padding: 20px 40px;
  // margin-top: -20vh;
  box-shadow: 0 0 10px 10px rgba(103, 103, 103, 0.7);
  max-width: 90vw;
  max-height: 90vh;
  overflow: scroll;
}

.modal-content {
  position: relative;
}

.modal-fade-enter-active {
  transition: opacity 0.5s;
}
.modal-fade-enter {
  opacity: 1;
}
.modal-fade-leave-active {
  transition: opacity 0.3s;
  .modal {
    transition: opacity 0.3s;
    opacity: 0;
  }
}

.modal-fade-leave-to {
  opacity: 0;
}

.close-button {
  margin-top: 30px;
}
</style>
