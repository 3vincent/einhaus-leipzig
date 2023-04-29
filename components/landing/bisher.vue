<template>
  <div id="bisher" class="landing-container background">
    <div class="landing-contentBox">
      <h2>Was bisher geschah.</h2>
      <p>
        Stell dir vor, jemand klingelt an deiner Wohnungstür und fragt
        freundlich, ob man sich das Haus ansehen könne … du weißt nicht genau,
        worum es geht, hast aber ein ziemlich ungutes Gefühl. Das passiert nicht
        nur einmal, sondern mehrmals, wochenlang.
      </p>
      <p>
        Auf diese Art erfuhren wir, die Bewohner:innen der Reichpietschstraße
        13, Anfang 2018 vom geplanten Verkauf unseres Wohnhauses. Was uns
        drohte, geschieht in Leipzig gerade mit vielen Häusern: Wir alle kennen
        Geschichten von Häusern, die von Investor:innen gekauft, luxussaniert
        und dann für vielfach höhere Mieten angeboten werden, die sich die
        ursprünglichen Bewohner:innen häufig nicht mehr leisten können. Wir
        wollen verhindern, dass uns und unserem Haus Gleiches passiert. Daher
        haben wir beschlossen, unser Haus zu kaufen und es in
        Gemeinschaftseigentum zu überführen.
      </p>

      <p>
        Im August 2018 haben wir unsere Genossenschaft, die Einhaus
        Reichpietschstraße 13 eG gegründet und im November 2018 konnten wir den
        Kaufvertrag unterschreiben.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.background {
  background-image: url(/images/einhaus-landing-photo-02-small.jpg);
}

.background.visible {
  background-image: url(/images/einhaus-landing-photo-02.jpg);
}

@media screen and (min-width: $_md) {
  .landing-container {
    /**
    // TODO
    // subtracts spaces for top and bottom, so that the one-scroll-menu is in the vertical center
    */
    margin-top: calc((-50vh + 250px / 2) - 50vh - 250px / 2);
  }
}
</style>
