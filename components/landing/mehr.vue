<template>
  <div id="wohnhaus" class="landing-container background">
    <div class="landing-contentBox">
      <h2>EinHaus: Mehr als ein Wohnhaus.</h2>
      <p>
        In der Reichpietschstraße 13 gibt es noch viel mehr als bloßes Wohnen.
        Um uns kennenzulernen, kannst du zum Beispiel zur
        <a
          href="http://www.kellerausstellung.de/"
          class="text-link"
          target="_blank"
        >
          Kellerausstellung
        </a>
        kommen, die bereits seit 2010 in unserem Haus stattfindet.
        Künstler:innen aus der ganzen Welt stellen ihre Bilder, Skulpturen,
        Objekte und Fotografien aus. Die Kellerausstellung ist in ein
        musikalisches und literarisches Programm eingebettet und hat sich zu
        einer unabhängigen künstlerischen und kulturellen Plattform entwickelt.
      </p>
      <p>
        Wir leisten einen kulturellen Beitrag im Quartier auch mit der Teilnahme
        an der
        <a
          href="https://notenspur-leipzig.de/"
          class="text-link"
          target="_blank"
        >
          Notenspur - Nacht der Hausmusik </a
        >, sowie am Programm
        <a
          href="http://offene-ateliers-leipzig.blogspot.com/"
          class="text-link"
          target="_blank"
        >
          Offene Ateliers Leipzig </a
        >, zu denen ebenso alle eingeladen sind. Weiterhin sitzt der
        <a href="http://www.klubpolski.de/" class="text-link" target="_blank">
          Klub Polski e.V.</a
        >
        in unserem Haus, der die populäre Veranstaltungsreihe
        <a
          href="http://www.slawische-nacht.de/"
          class="text-link"
          target="_blank"
          >Slawische Nacht</a
        >
        organisiert und als Teil des Arbeitsladen Ost als Multiplikator mit
        vielen Vereinen und Institutionen im Leipziger Osten eng
        zusammenarbeitet.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LandingMehr',
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url(/images/einhaus-landing-photo-05-small.jpg);
}

.background.visible {
  background-image: url(/images/einhaus-landing-photo-05.jpg);
}
</style>
