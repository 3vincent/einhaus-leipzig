<template>
  <div class="landing-container background">
    <div class="landing-contentBox">
      <h2> Aktuelles </h2>
      <p>
        Hallo, hier koennen Ankuendigungen und News rund ums Haus und die
        Genossenschaft stehen.
      </p>
      <p> Platz fuer Flyer oder Bilder gibt es auch </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.landing-container {
  min-height: 70vh;
  box-shadow: none;
  // top: -4px;
}

.landing-contentBox {
  background-color: rgb(255, 255, 255);
  border-radius: 0.7rem;
  box-shadow: 0 0 0 3px var(--main-text-color-dark);
}

.background {
  // background-image: url(/images/einhaus-landing-photo-06-small.jpg);
  // background-attachment: scroll;
}

.background.visible {
  // background-image: url(/images/einhaus-landing-photo-06.jpg);
}
</style>
