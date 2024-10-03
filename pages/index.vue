<script setup lang="ts">
import { LANDING_PAGE_SLUGS } from '@/util/enums'
import type { LandingPageContent } from '~/util/types'

const envVar = useRuntimeConfig()

useSeoMeta({
  title: 'EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  description:
    'Wir, die Mieter haben uns zusammengeschlossen und unser Haus selbst gekauft: Ein genossenschaftliches Hausprojekt in Leipzig Reudnitz.',
  ogTitle: 'EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogSiteName: 'EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogImage:
    'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
  ogDescription:
    'Wir, die Mieter haben uns zusammengeschlossen und unser Haus selbst gekauft: Ein genossenschaftliches Hausprojekt in Leipzig Reudnitz.',
  ogUrl: 'https://www.einhaus-leipzig.de',
  ogType: 'website',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de',
    },
  ],
})

definePageMeta({
  layout: 'landing',
})

function lazyLoadImages() {
  const lazyBackgrounds = Array.from(document.querySelectorAll('.background'))

  if ('IntersectionObserver' in window) {
    let lazyBackgroundObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            landingPageContents.value[
              landingPageContents.value.indexOf(
                landingPageContents.value.find(
                  item => item.slug === entry.target.id
                )!
              )
            ].visible = true

            lazyBackgroundObserver.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px 200px 0px' }
    )

    lazyBackgrounds.forEach(function (lazyBackground) {
      lazyBackgroundObserver.observe(lazyBackground)
    })
  }
}

onMounted(() => {
  lazyLoadImages()
})

const landingPageContents = ref<LandingPageContent[]>([
  {
    slug: LANDING_PAGE_SLUGS.BISHER,
    firstContainer: true,
    title: 'Was bisher geschah.',
    htmlText: `<p>
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
      </p>`,
    backgroundImageUrl: '/images/einhaus-landing-photo-02.jpg',
  },
  {
    slug: LANDING_PAGE_SLUGS.ZIELE,
    title: 'Unsere Ziele.',
    htmlText: `<p>
        Wir haben uns zum Ziel gesetzt, dass alle Bewohner:innen des Hauses
        wohnen bleiben können, den Charakter des Hauses zu bewahren und die
        individuelle und kreative Atmosphäre im Haus zu erhalten. Hier soll es
        bei sozial verträglichen Mieten bleiben und Gemeinschaftseigentum für
        uns und nachfolgende Mieter:innen geschaffen werden.
      </p>
      <p class="bold">
        Auf diese Art möchten wir das Haus dauerhaft der Immobilienspekulation
        entziehen und so verhindern, dass Profit aus dem Haus und seinem
        Wohnraum geschlagen wird.
      </p>
      <p>
        Nach dem Kauf möchten wir behutsam sanieren und unser Haus nachhaltig
        bewirtschaften. Da das Startkapital unter den Mieter:innen sehr
        verschieden ist, bildet eine Genossenschaft für uns das ideale
        Instrument, um uns gegenseitig zu unterstützen und den Kauf möglich zu
        machen.
      </p>`,
    backgroundImageUrl: '/images/einhaus-landing-photo-03.jpg',
  },
  {
    slug: LANDING_PAGE_SLUGS.GEMEINSCHAFT,
    title: 'EinHaus Gemeinschaft.',
    htmlText: `<p>
        Derzeit wohnen in unserem Haus 24 Menschen in 11 Wohnungen, als WGs,
        einzeln oder als Familien. Als Hausgemeinschaft wollen wir
        zusammenhalten, uns solidarisch unterstützen und gemeinsam die
        Verwaltung des Hauses organisieren. Dabei wollen wir autonom bleiben als
        Gemeinschaft im Haus, aber auch als einzelne Mietparteien.
      </p>
      <p>
        Wir schätzen die Vielfalt und den Gestaltungsspielraum, den das Haus uns
        bietet: Unsere Wohnungen haben wir selbst gestaltet, eine Wohnung hat
        blaue Dielen, eine andere eine rosafarbene Badewanne – das soll gern so
        bleiben.
      </p>`,
    backgroundImageUrl: '/images/einhaus-landing-photo-04.jpg',
  },
  {
    slug: LANDING_PAGE_SLUGS.WOHNHAUS,
    title: 'EinHaus: Mehr als ein Wohnhaus.',
    htmlText: `<p>
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
          Notenspur - Nacht der Hausmusik</a
        >, sowie am Programm
        <a
          href="http://offene-ateliers-leipzig.blogspot.com/"
          class="text-link"
          target="_blank"
        >
          Offene Ateliers Leipzig</a
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
      </p>`,
    backgroundImageUrl: '/images/einhaus-landing-photo-05.jpg',
  },
  {
    slug: LANDING_PAGE_SLUGS.UNTERSTUZUNG,
    title: 'Unterstütze unser Projekt.',
    htmlText: `<p>
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
          ${envVar.public.OFFICIAL_CONTACT_ADDRESS}
        </p>`,
    backgroundImageUrl: '/images/einhaus-landing-photo-06.jpg',
  },
])
</script>

<template>
  <main>
    <LandingStart />

    <!-- <LandingAktuelles /> -->

    <div>
      <LandingOneScrollMenu />

      <LandingContent
        v-for="(content, index) of landingPageContents"
        :key="content.slug"
        :slug="content.slug"
        :visible="content.visible"
        :first-container="index === 0"
        :last-container="index === landingPageContents.length - 1"
        :title="content.title"
        :html-text="content.htmlText"
        :background-image-url="content.backgroundImageUrl"
      >
        <div v-if="content.slug === LANDING_PAGE_SLUGS.UNTERSTUZUNG">
          <NuxtLink to="/kontakt" class="link primary">
            Kontaktformular
          </NuxtLink>

          <a
            :href="`mailto:${envVar.public.OFFICIAL_CONTACT_ADDRESS}`"
            role="button"
            class="link secondary"
            >Email schreiben</a
          >

          <p>
            <small>
              *) Bei den Direktkrediten handelt es sich um Nachrangdarlehen, für
              die keine Prospektpflicht besteht.
            </small>
          </p>
        </div>
      </LandingContent>
    </div>
  </main>
</template>
