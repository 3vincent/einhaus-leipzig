<script setup lang="ts">
useSeoMeta({
  title:
    'Impressum - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  description: 'Impressum',
  ogTitle:
    'Impressum - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogSiteName:
    'Impressum - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogImage:
    'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
  ogDescription: 'Impressum',
  ogUrl: 'https://www.einhaus-leipzig.de/impressum',
  ogType: 'website',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de/impressum',
    },
  ],
})

definePageMeta({
  layout: 'default',
})

const envVar = useRuntimeConfig()
let isMobile = ref(false)

const calculateMobile = () => {
  isMobile.value = window.innerWidth < 992
}

onMounted(() => {
  addEventListener('resize', calculateMobile)
  calculateMobile()
})

onUnmounted(() => {
  removeEventListener('resize', calculateMobile)
})
</script>

<template>
  <div class="default-container">
    <div class="content">
      <BreadcrumbNav />

      <div class="impressum"
        ><h1>Impressum</h1><p>Angaben gemäß § 5 TMG</p>

        <p
          >EinHaus Reichpietschstraße 13 eG<br />
          Reichpietschstr. 13<br />
          04317 Leipzig <br /> </p
        ><p>
          <strong>Vertreten durch: </strong><br />
          Dr. Claudia Dislich, Sandra Sancelean, Beate Schicketanz<br /> </p
        ><p
          ><strong>Kontakt:</strong> <br />
          E-Mail:
          <a :href="`mailto:${envVar.public.OFFICIAL_CONTACT_ADDRESS}`">{{
            envVar.public.OFFICIAL_CONTACT_ADDRESS
          }}</a>
          <br /></p
        ><p
          ><strong>Registereintrag: </strong><br />
          Eintragung im Registergericht: Amtsgericht Leipzig<br />
          Registernummer: GnR 543<br
        /></p>
        <p>
          Mitglied im Prüfungsverband deutscher Konsum- und
          Dienstleistungsgenossenschaften e.V., Berlin
        </p>

        <hr />

        <h2>Bildrechte</h2>

        <p> Quellenangaben für die verwendeten Bilder und Grafiken: </p>

        <p>
          &copy; Thomas Puschmann –
          <a href="http://www.fruehbeetgrafik.de/" target="_blank"
            >http://www.fruehbeetgrafik.de/</a
          >
          <br />
          &copy; Bartłomiej Kiszka –
          <a href="http://www.kiszka-art.de/" target="_blank"
            >http://www.kiszka-art.de/</a
          >
        </p>

        <hr />

        <p
          ><strong>Haftungsausschluss: </strong><br /><br /><strong
            >Haftung für Inhalte</strong
          ><br /><br />
          Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für
          die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir
          jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7
          Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen
          Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als
          Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
          gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
          forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
          Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
          Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der
          Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden
          von entsprechenden Rechtsverletzungen werden wir diese Inhalte
          umgehend entfernen.<br /><br /><strong>Haftung für Links</strong
          ><br /><br />
          Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
          Inhalte wir keinen Einfluss haben. Deshalb können wir für diese
          fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der
          verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
          Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
          Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige
          Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine
          permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne
          konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei
          Bekanntwerden von Rechtsverletzungen werden wir derartige Links
          umgehend entfernen.<br /><br /><strong>Urheberrecht</strong
          ><br /><br />
          Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
          Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
          Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
          Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
          jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite
          sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
          Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt
          wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden
          Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf
          eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen
          entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen
          werden wir derartige Inhalte umgehend entfernen.<br /><br /><strong
            >Datenschutz</strong
          ><br /><br />
          Die Nutzung unserer Webseite ist in der Regel ohne Angabe
          personenbezogener Daten möglich. Soweit auf unseren Seiten
          personenbezogene Daten (beispielsweise Name, Anschrift oder
          eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets
          auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche
          Zustimmung nicht an Dritte weitergegeben. <br />
          Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei
          der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein
          lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
          möglich. <br />
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
          Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich
          angeforderter Werbung und Informationsmaterialien wird hiermit
          ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich
          ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung
          von Werbeinformationen, etwa durch Spam-Mails, vor.<br /> </p
        ><br />
        <small>
          Impressum vom
          <a href="https://www.impressum-generator.de" target="_blank"
            >Impressum Generator</a
          >
          der
          <a
            href="https://www.kanzlei-hasselbach.de/standorte/frankfurt/"
            rel="nofollow"
            target="_blank"
            >Kanzlei Hasselbach, Frankfurt</a
          >
        </small>
      </div>
    </div>

    <div class="content custom-paddings">
      <hr v-if="isMobile" />

      <small>
        👾 Website proudly created by Ben
        <small
          >(<a href="https://www.github.com/3vincent" target="_blank"
            >https://www.github.com/3vincent</a
          >)</small
        >
      </small>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width: $lg) {
  .default-container::before {
    background-image: url(/images/einhaus-landing-photo-06.jpg);
  }
}

.default-container {
  flex-direction: column;
  align-items: center;
}

.custom-paddings {
  margin-top: -80px;
}
</style>
