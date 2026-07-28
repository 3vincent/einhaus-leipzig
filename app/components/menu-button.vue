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
  padding: 0.55rem 0 0.55rem 0.75rem;
  place-items: center end;
  cursor: pointer;
  background-color: transparent;
  border: none;

  &:focus-visible {
    outline: 3px solid var(--button-color);
    outline-offset: 3px;
    border-radius: 6px;
  }
}

#main-menu-button span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: #000000;
  outline: 1px solid var(--main-text-color-light);
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
  height: 30px;
  width: 36px;
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
  top: 11px;
  -webkit-transform-origin: left center;
  -moz-transform-origin: left center;
  -o-transform-origin: left center;
  transform-origin: left center;
}

#main-menu-button span:nth-child(3) {
  top: 22px;
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
  top: -1px;
  left: 8px;
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
  top: 24px;
  left: 8px;
}
</style>
