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
        Auf diese Art erfuhren wir, die Bewohner*innen der Reichpietschstraße
        13, Anfang des Jahres vom geplanten Verkauf unseres Wohnhauses. Was uns
        droht, geschieht in Leipzig gerade mit vielen Häusern: Wir alle kennen
        Geschichten von Häusern, die von Investor*innen gekauft, luxussaniert
        und dann für vielfach höhere Mieten angeboten werden, die sich die
        ursprünglichen Bewohner*innen häufig nicht mehr leisten können. Wir
        wollen verhindern, dass uns und unserem Haus Gleiches passiert. Daher
        haben wir beschlossen, unser Haus zu kaufen und es in
        Gemeinschaftseigentum zu überführen.
      </p>

      <p>
        Inzwischen sind wichtige Schritte geschafft: die Genossenschaft „EinHaus
        Reichpietschstraße 13 eG“ ist gegründet und der Kaufvertrag wurde Ende
        November unterschrieben.
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
    //TODO
    /**
    * very bad hack to get around the issue that the one-scroll-menu
    * on the left takes up space in the container of the content on the right.
    * position:sticky behaves like position:relative when not scrolled down, this
    * way it pushed the content and background-image to the bottom.
    *
    * possible ways to solve this is to use some div wrapper and a flex/grid
    * the background image needs to be placed in another wrapper, that wills
    * the full width of the page
    */

    // subtracts spaces for top and bottom, so that the menu is in the vertical center
    margin-top: calc((-50vh + 266px / 2) - 50vh - 266px / 2);
  }
}
</style>
