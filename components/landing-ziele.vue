<template>
  <div id="ziele" class="landing-container background">
    <div class="landing-contentBox">
      <h2>Unsere Ziele.</h2>
      <p>
        Wir haben uns zum Ziel gesetzt, dass alle Bewohner*innen des Hauses
        wohnen bleiben können, den Charakter des Hauses zu bewahren und die
        individuelle und kreative Atmosphäre im Haus zu erhalten. Hier soll es
        bei sozial verträglichen Mieten bleiben und Gemeinschaftseigentum für
        uns und nachfolgende Mieter*innen geschaffen werden.
      </p>
      <p class="bold">
        Auf diese Art möchten wir das Haus dauerhaft der Immobilienspekulation
        entziehen und so verhindern, dass Profit aus dem Haus und seinem
        Wohnraum geschlagen wird.
      </p>
      <p>
        Nach dem Kauf möchten wir behutsam sanieren und unser Haus nachhaltig
        bewirtschaften. Da das Startkapital unter den Mieter*innen sehr
        verschieden ist, bildet eine Genossenschaft für uns das ideale
        Instrument, um uns gegenseitig zu unterstützen und den Kauf möglich zu
        machen.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LandingZiele',
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url(/images/placeholder.webp);
}

.background.visible {
  background-image: url(/images/einhaus-landing-photo-03.jpg);
}
</style>
