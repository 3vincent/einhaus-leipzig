<template>
  <div class="waiting-animation">
    <span class="dot"></span>
    <span class="dot"></span>
    <span class="dot"></span>
  </div>
</template>

<style lang="scss" scoped>
.waiting-animation {
  display: flex;
  justify-content: center;
  align-items: center;

  .dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    margin: 0 4px;
    background-color: #000;
    animation: dot-animation 1s infinite;

    @keyframes dot-animation {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.5);
      }
      100% {
        transform: scale(1);
      }
    }
  }

  .dot:nth-child(1) {
    animation-delay: 0s;
  }

  .dot:nth-child(2) {
    animation-delay: 0.2s;
  }

  .dot:nth-child(3) {
    animation-delay: 0.4s;
  }
}
</style>
