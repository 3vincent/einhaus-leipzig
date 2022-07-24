<template>
  <div>
    <svg viewBox="0 0 100 80" width="40" height="40" class="shadow">
      <g stroke="none" stroke-width="1" fill="black" fill-rule="nonzero">
        <rect width="100" height="12"></rect>
        <rect y="30" width="100" height="12"></rect>
        <rect y="60" width="100" height="12"></rect>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
div,
svg {
  line-height: 0;
}

div {
  padding: 0 1rem;
}

.shadow {
  -webkit-filter: drop-shadow(3px 3px 2px rgba(165, 165, 165, 0.7));
  filter: drop-shadow(3px 3px 2px rgba(165, 165, 165, 0.7));
  /* Similar syntax to box-shadow */
}
</style>
