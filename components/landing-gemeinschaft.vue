<template>
  <div id="gemeinschaft" class="landing-container background">
    <div class="landing-contentBox">
      <h2>EinHaus Gemeinschaft.</h2>
      <p>
        Derzeit wohnen in der Reichpietschstraße 13 Student*innen,
        Wissenschaftler*innen, Künstler*innen und Designer*innen als junge
        Familien, Singles und WGs.
      </p>
      <p class="bold">
        Wir schätzen diese Vielfalt und wollen sie beibehalten.
      </p>
      <p>
        In der jetzigen Situation wollen wir zusammenhalten und uns solidarisch
        unterstützen – autonom bleiben als Gemeinschaft im Haus, aber auch als
        einzelne Mietpartei. Wir haben unsere Wohnungen selbst gestaltet und
        schätzen den Gestaltungsspielraum, den das Haus uns ermöglicht. Eine
        Wohnung hat blaue Dielen, eine andere eine rosafarbene Badewanne – und
        das soll gern so bleiben.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LandingGemeinschaft',
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url(/images/placeholder.webp);
}

.background.visible {
  background-image: url(/images/einhaus-landing-photo-04.jpg);
}
</style>
