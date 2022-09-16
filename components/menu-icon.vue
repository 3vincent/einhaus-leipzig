<template>
  <div>
    <svg v-if="isClicked" viewBox="0 0 120 100" width="40" height="40">
      <line
        x1="10"
        y1="10"
        x2="100"
        y2="100"
        stroke="black"
        stroke-width="12"
      />
      <line
        x1="100"
        y1="10"
        x2="10"
        y2="100"
        stroke="black"
        stroke-width="12"
      />
    </svg>

    <svg
      v-else
      viewBox="-2 0 110 80"
      width="40"
      height="40"
      v-bind:class="{ 'is-active': isClicked }"
    >
      <g stroke="white" stroke-width="2" fill="black" fill-rule="nonzero">
        <rect width="102" height="14"></rect>
        <rect y="30" width="102" height="14"></rect>
        <rect y="60" width="102" height="14"></rect>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'MenuIcon',
  props: {
    isClicked: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
div,
svg {
  line-height: 0;
}

div {
  padding: 0 1rem;
  cursor: pointer;
}

.shadow {
  -webkit-filter: drop-shadow(3px 3px 2px rgba(165, 165, 165, 0.7));
  filter: drop-shadow(3px 3px 2px rgba(165, 165, 165, 0.7));
}

.is-active {
  filter: drop-shadow(3px 3px 2px rgba(165, 165, 165, 0.7));
}

.is-active g {
  fill: #666;
}
</style>
