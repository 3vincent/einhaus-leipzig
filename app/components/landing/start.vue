<template>
  <div class="landing-container">
    <div class="landing-contentBox">
      <h1>EinHaus Reichpietsch&shy;straße 13 eG</h1>
      <h2>Ein genossenschaftliches Hausprojekt in Leipzig Reudnitz</h2>
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
  min-height: calc(100vh - 60px); //Fallback
  min-height: calc(100svh - 60px);

  @media (min-width: $lg) {
    min-height: calc(100vh - 120px); //Fallback
    min-height: calc(100svh - 120px);
  }

  // if aktuelles is present, remove the bottom border:
  // border-bottom: none;
}
.landing-contentBox {
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin: 0 auto;
  top: -30px;

  @media (min-width: $lg) {
    top: -60px;
  }

  h2 {
    display: block;
    font-size: 1.4rem;
    font-weight: 400;
    padding: 0.6rem 0;
    letter-spacing: -0.02em;
    line-height: 1.5;
  }
}

.arrow-container {
  position: absolute;
  width: 100vw;
  bottom: 3rem;

  @media screen and (min-width: $md) {
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
