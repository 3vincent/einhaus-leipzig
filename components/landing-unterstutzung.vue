<template>
  <div id="unterstutzung" class="landing-container background lastContainer">
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

      <div>
        <a href="mailto:someone@yoursite.com">
          <button type="button"> Email schreiben </button>
        </a>
        <button>Kontaktformular</button>
      </div>

      <p>
        <small
          >*) Bei den Direktkrediten handelt es sich um Nachrangdarlehen, für
          die keine Prospektpflicht besteht.</small
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LandingUnterstutzung',
  mounted() {
    this.scrollThing()
  },
  beforeUnmount() {
    // console.log('deSTROy')
    window.removeEventListener('scroll', this.scrollThing)
  },
  beforeMount() {
    window.addEventListener('scroll', this.scrollThing)
  },
  methods: {
    scrollThing() {
      function getPosition(element) {
        const rect = element.getBoundingClientRect()
        return {
          x: rect.left,
          y: rect.top,
        }
      }

      // console.log('Scrolled!  🎉', window.scrollY)

      const element = document.querySelector('.lastContainer')
      const scrollPositionOfElement = getPosition(element).y

      // console.log('ScrollPos: ', scrollPositionOfElement)
      // console.log(element.classList.contains('stickyBackground'))

      if (window.innerWidth < 1280) return

      if (
        scrollPositionOfElement <= 0 &&
        !element.classList.contains('stickyBackground')
      ) {
        element.classList.add('stickyBackground')
      } else if (
        scrollPositionOfElement > 0 &&
        element.classList.contains('stickyBackground')
      ) {
        element.classList.remove('stickyBackground')
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
