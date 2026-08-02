<script setup lang="ts">
import { useToast } from '../composables/useToast'
import type { ToastPosition, ToastStyle } from '../composables/useToast'

const { toasts, dismissToast } = useToast()

const styleClass = (style: ToastStyle) => {
  if (style === 'success') return 'toast--success'
  if (style === 'error') return 'toast--error'
  return 'toast--info'
}

const positionClass = (position: ToastPosition) => {
  return `pos-${position}`
}
</script>

<template>
  <div
    class="toast-stack"
    :class="
      toasts[0]?.position ? positionClass(toasts[0].position) : 'pos-top-right'
    "
    aria-live="polite"
    aria-atomic="true"
  >
    <transition-group name="toast" tag="div">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="toast"
        :class="styleClass(toast.style || 'info')"
      >
        <span class="toast__message">{{ toast.message }}</span>
        <button
          type="button"
          class="toast__close"
          aria-label="Schließen"
          @click="toast.id && dismissToast(toast.id)"
        >
          ×
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.toast-stack {
  position: fixed;
  z-index: 9500;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.5rem;
}

.pos-top-right {
  top: 1rem;
  right: 1rem;
  align-items: flex-end;

  @media screen and (max-width: 600px) {
    left: 0.75rem;
    right: 0.75rem;
    align-items: center;
  }
}

.pos-top-left {
  top: 1rem;
  left: 1rem;
  align-items: flex-start;

  @media screen and (max-width: 600px) {
    left: 0.75rem;
    right: 0.75rem;
    align-items: center;
  }
}

.pos-bottom-right {
  bottom: 1rem;
  right: 1rem;
  align-items: flex-end;

  @media screen and (max-width: 600px) {
    left: 0.75rem;
    right: 0.75rem;
    align-items: center;
  }
}

.pos-bottom-left {
  bottom: 1rem;
  left: 1rem;
  align-items: flex-start;

  @media screen and (max-width: 600px) {
    left: 0.75rem;
    right: 0.75rem;
    align-items: center;
  }
}

.pos-center {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  align-items: center;
}

.toast {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 12px;
  box-shadow: 0 12px 24px -16px rgba(0, 0, 0, 0.35);
  color: var(--color-text);
  background: var(--color-surface-soft);
  border: 1px solid var(--color-border);
}

.toast--success {
  background: var(--color-success-surface);
  border-color: var(--color-success-border);
  color: var(--color-success-strong);
}

.toast--error {
  background: var(--color-danger-surface);
  border-color: var(--color-danger-border);
  color: var(--color-danger-strong);
}

.toast--info {
  background: var(--color-brand-surface);
  border-color: var(--color-brand-soft);
  color: var(--color-brand-active);
}

.toast__message {
  line-height: 1.4;
  font-weight: 600;
}

.toast__close {
  background: transparent;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 200ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
