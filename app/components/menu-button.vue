<template>
  <button
    type="button"
    aria-label="Hauptnavigation"
    :aria-expanded="isActive"
    aria-controls="primary-navigation"
    @click="$emit('toggle')"
  >
    <div id="main-menu-button" :class="{ open: isActive }">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </button>
</template>

<script setup lang="ts">
const { isActive = false } = defineProps<{
  isActive?: boolean
}>()

defineEmits<{
  toggle: []
}>()
</script>

<style lang="scss" scoped>
button {
  display: grid;
  min-width: 48px;
  min-height: 48px;
  padding: 0;
  place-items: center;
  cursor: pointer;
  background: var(--menu-button-background, rgba(255, 255, 255, 0.78));
  border: 1px solid var(--menu-button-border-color, rgba(48, 70, 73, 0.18));
  border-radius: 14px;
  box-shadow: var(
    --menu-button-shadow,
    0 1px 2px rgba(31, 46, 48, 0.08),
    0 10px 24px -16px rgba(31, 46, 48, 0.7),
    inset 0 1px 0 rgba(255, 255, 255, 0.9)
  );
  backdrop-filter: var(--menu-button-backdrop-filter, blur(12px));
  transition:
    background-color 160ms ease,
    border-color 160ms ease,
    box-shadow 160ms ease,
    transform 160ms ease;

  &:hover {
    background-color: var(
      --menu-button-hover-background,
      rgba(255, 255, 255, 0.94)
    );
    border-color: var(
      --menu-button-hover-border-color,
      rgba(23, 107, 120, 0.34)
    );
    box-shadow: var(
      --menu-button-hover-shadow,
      0 2px 3px rgba(31, 46, 48, 0.1),
      0 13px 26px -16px rgba(31, 46, 48, 0.76),
      inset 0 1px 0 white
    );
    transform: translateY(-1px);
  }

  &:active {
    background-color: var(
      --menu-button-active-background,
      rgba(244, 247, 246, 0.96)
    );
    box-shadow: inset 0 1px 2px rgba(31, 46, 48, 0.12);
    transform: scale(0.96);
  }

  &:focus-visible {
    outline: 3px solid var(--color-focus-ring);
    outline-offset: 3px;
  }
}

#main-menu-button span {
  display: block;
  position: absolute;
  height: 2px;
  width: 100%;
  background: var(--color-text);
  border-radius: 99px;
  -webkit-transform: rotate(0deg);
  -moz-transform: rotate(0deg);
  -o-transform: rotate(0deg);
  transform: rotate(0deg);
  -webkit-transition: 0.25s ease-in-out;
  -moz-transition: 0.25s ease-in-out;
  -o-transition: 0.25s ease-in-out;
  transition: 0.25s ease-in-out;
  will-change: transform;
}

#main-menu-button {
  height: 22px;
  width: 26px;
  pointer-events: none;
}

#main-menu-button span:nth-child(1) {
  top: 0px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#main-menu-button span:nth-child(2) {
  top: 10px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#main-menu-button span:nth-child(3) {
  top: 20px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#main-menu-button.open span:nth-child(1) {
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
  top: 1px;
  left: 4px;
}

#main-menu-button.open span:nth-child(2) {
  width: 0%;
  opacity: 0;
}

#main-menu-button.open span:nth-child(3) {
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
  top: 19px;
  left: 4px;
}

@media (prefers-reduced-motion: reduce) {
  button,
  #main-menu-button span {
    transition: none;
  }
}
</style>
