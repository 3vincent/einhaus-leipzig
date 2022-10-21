<template>
  <div id="start" class="landing-container">
    <div class="landing-contentBox">
      <h1>EinHaus Reichpiet<wbr />sch<wbr />straße 13 eG</h1>
      <h2 class="seo-text"></h2>
      <h3>Ein genossenschaftliches Hausprojekt in Leipzig Reudnitz</h3>
    </div>

    <div class="arrow-container">
      <div class="inner-arrow-content">
        <NuxtLink
          :to="{ hash: '#bisher' }"
          :external="true"
          aria-label="Scroll down"
        >
          <div class="scrollTeacher">
            <i class="arrow down" />
            <span class="seo-text">Scroll down</span>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landing-container::before {
  background-image: url(/images/einhaus-landing-photo-01.jpg);
}

.landing-container {
  box-shadow: none;
  background-position: 50% 0;
  background-size: cover;
  padding-top: 0;
  min-height: 100vh;
}

.arrow-container {
  position: absolute;
  width: 100vw;
  bottom: 15vh;

  @media screen and (min-width: $_md) {
    bottom: 3rem;
  }

  .inner-arrow-content {
    position: relative;
    display: flex;
    justify-content: center;

    .scrollTeacher {
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
        transform: translateY(0px) rotate(45deg);
      }

      25% {
        transform: translateY(20px) rotate(45deg);
      }
    }
  }
}
</style>
