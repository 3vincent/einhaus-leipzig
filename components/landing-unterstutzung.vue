<template>
  <div id="unterstuetzung" class="landing-container background lastContainer">
    <div class="landing-contentBox">
      <h2>Unterstütze unser Projekt.</h2>
      <p>
        Den Kauf realisieren wir mit unserem eigenen Kapital und einem
        Bankkredit. Darlehen und Investitionen von Privatpersonen helfen uns,
        den Bankkredit möglichst gering zu halten. Und hier kommst Du ins Spiel.
        Werde investierendes Mitglied unserer Genossenschaft! Das ist bereits
        mit einem Betrag von 100 Euro möglich. Es gibt zwei Möglichkeiten, wie
        Du uns finanziell unterstützen kannst: indem Du Genossenschaftsanteile
        erwirbst oder indem Du der Genossenschaft einen Direktkredit* gewährst.
      </p>

      <p>
        Für dich ist diese Art der Investition attraktiv, wenn du dein Geld
        lieber in einem Projekt anlegst, das man anfassen kann: Dein Geld kannst
        du bei uns nachhaltig anlegen. Mehr Informationen geben wir Dir gerne
        persönlich. Wir freuen uns über eine E-Mail an info@einhaus-leipzig.de
      </p>

      <NuxtLink to="/kontakt" class="link primary"> Kontaktformular </NuxtLink>
      <a :href="envVar.OFFICIAL_CONTACT_ADDRESS" class="link secondary">
        Email schreiben
      </a>

      <p>
        <small
          >*) Bei den Direktkrediten handelt es sich um Nachrangdarlehen, für
          die keine Prospektpflicht besteht.</small
        >
      </p>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'LandingUnterstutzung',
  data() {
    return {
      envVar: useRuntimeConfig(),
    }
  },

  mounted() {
    this.fixBackgroundImage()
    window.addEventListener('scroll', this.fixBackgroundImage)
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.fixBackgroundImage)
  },

  methods: {
    fixBackgroundImage() {
      if (window.innerWidth < 1280) return

      const element = document.querySelector('.lastContainer') as HTMLDivElement

      if (!element) return

      const scrollPositionOfElement = element.getBoundingClientRect().y

      if (scrollPositionOfElement <= 0) {
        element.classList.add('stickyBackground')
        return
      }

      if (
        scrollPositionOfElement > 0 &&
        element.classList.contains('stickyBackground')
      ) {
        element.classList.remove('stickyBackground')
        return
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url(/images/einhaus-landing-photo-06.jpg);
}

.stickyBackground {
  background-attachment: scroll;
}

.landing-container {
  border: none;
}

small {
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.8;
  line-height: 0.1rem;
}
</style>
