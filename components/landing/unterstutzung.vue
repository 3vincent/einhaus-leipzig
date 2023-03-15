<template>
  <div>
    <div class="intersection-observer-alert-element-top"></div>

    <div id="unterstuetzung" class="landing-container background lastContainer">
      <div class="landing-contentBox">
        <h2>Unterstütze unser Projekt.</h2>
        <p>
          Den Kauf haben wir mit unserem eigenen Kapital und mit der Hilfe
          zahlreicher Unterstützer:innen, sowie einem Bankkredit von der
          Umweltbank realisiert. Unsere Unterstützer:innen helfen uns den
          Bankkredit möglichst gering zu halten bzw. durch Sondertilgungen
          schneller zurückzahlen zu können. Und hier kommst Du ins Spiel. Werde
          investierendes Mitglied unserer Genossenschaft! Das ist bereits mit
          einem Betrag von 100 Euro möglich. Es gibt zwei Wege, wie Du uns
          finanziell unterstützen kannst: indem Du Genossenschaftsanteile
          erwirbst oder indem Du der Genossenschaft einen Direktkredit*
          gewährst.
        </p>

        <p>
          Für dich ist diese Art der Investition attraktiv, wenn du dein Geld
          gerne in einem Projekt anlegst, das man anfassen kann: Dein Geld
          kannst du bei uns nachhaltig anlegen. Mehr Informationen geben wir Dir
          gerne persönlich. Wir freuen uns über eine E-Mail an
          {{ envVar.public.OFFICIAL_CONTACT_ADDRESS }}
        </p>

        <NuxtLink to="/kontakt">
          <button class="link primary"> Kontaktformular </button>
        </NuxtLink>

        <a :href="`mailto:${envVar.public.OFFICIAL_CONTACT_ADDRESS}`">
          <button class="link secondary"> Email schreiben </button>
        </a>

        <p>
          <small>
            *) Bei den Direktkrediten handelt es sich um Nachrangdarlehen, für
            die keine Prospektpflicht besteht.
          </small>
        </p>
      </div>
    </div>

    <div class="intersection-observer-alert-element-bottom"></div>
  </div>
</template>

<script lang="ts">
import { debounce } from 'lodash-es'

export default {
  name: 'LandingUnterstutzung',
  data() {
    return {
      envVar: useRuntimeConfig(),
    }
  },

  mounted() {
    this.fixBackgroundImage()
  },

  methods: {
    fixBackgroundImage() {
      if (window.innerWidth < 1280) return

      const element = document.querySelector('.lastContainer') as HTMLDivElement

      const intersectioObserverAlertElementBottom = document.querySelector(
        '.intersection-observer-alert-element-bottom'
      ) as HTMLDivElement

      const intersectioObserverAlertElementTop = document.querySelector(
        '.intersection-observer-alert-element-top'
      ) as HTMLDivElement

      if ('IntersectionObserver' in window) {
        let fixBackgroundImage = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                if (entry.target === intersectioObserverAlertElementTop) {
                  element.classList.remove('stickyBackground')
                  return
                }

                element.classList.add('stickyBackground')
              }
            })
          }
        )

        fixBackgroundImage.observe(intersectioObserverAlertElementBottom)
        fixBackgroundImage.observe(intersectioObserverAlertElementTop)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.background {
  background-image: url(/images/einhaus-landing-photo-06-small.jpg);
}

.background.visible {
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
.intersection-observer-alert-element-top,
.intersection-observer-alert-element-bottom {
  position: absolute;
  background-color: transparent;
  height: 1px;
  width: 100vw;
}

.intersection-observer-alert-element-top {
  top: -2px;
}

.intersection-observer-alert-element-bottom {
  bottom: -2px;
}
</style>
