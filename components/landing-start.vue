<template>
  <div>
    <div id="start" class="landing-container background">
      <div class="landing-contentBox">
        <h1>EinHaus Reichpiet<wbr />sch<wbr />straße 13 eG</h1>
        <h3>Ein genossenschaftliches Hausprojekt in Leipzig Reudnitz</h3>
      </div>
    </div>

    <div class="arrow-container">
      <NuxtLink :to="{ hash: '#bisher' }" :external="true">
        <div class="scrollTeacher">
          <i class="arrow down" />
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landing-container::before {
  background-image: url(/images/einhaus-landing-photo-01.jpg);
}

.landing-container {
  box-shadow: none;
}

.arrow-container {
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;

  .scrollTeacher {
    position: absolute;

    bottom: 3rem;
    padding: 1rem;
  }

  .arrow {
    border: solid rgb(255, 255, 255);
    border-width: 0 0.2rem 0.2rem 0;
    display: inline-block;
    padding: 0.7rem;
    animation: wiggle 3s infinite;
    animation-timing-function: ease;
    will-change: transform;
  }

  .down {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  @keyframes wiggle {
    0%,
    50% {
      top: 0px;
    }

    25% {
      top: 20px;
    }
  }
}
</style>
