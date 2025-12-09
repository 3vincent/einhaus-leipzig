<template>
  <div class="default-container">
    <div class="content">
      <BreadcrumbNav />

      <div class="mitglied-werden">
        <h1>Gemeinsam Zukunft bauen</h1>

        <h3>
          Unterstütze unsere selbstverwaltete Hausgenossenschaft – werde
          Mitglied und hilf uns, unser Zuhause langfristig zu sichern.
        </h3>
      </div>
    </div>

    <div class="content">
      <h2>Warum wir deine Unterstützung brauchen</h2>

      <h3> Unser Haus braucht dringend Sanierungsarbeiten. </h3>
      <p>
        Fassadensanierung, Strom- und Wasser-Leitungen, energetische Maßnahmen
        und allgemeiner Erhalt – dafür benötigen wir rundum
        <strong>250.000 €</strong>.<br />
        Damit die Mieten stabil bleiben und unser solidarisches Wohnmodell
        bestehen kann, sind wir auf Menschen angewiesen, die unsere Werte
        teilen:
      </p>

      <ul>
        <li>Bezahlbarer Wohnraum</li>
        <li>Selbstverwaltung statt Renditedruck</li>
        <li>Gemeinschaftliches Eigentum </li>
        <li>Langfristiger Erhalt statt kurzfristiger Profit</li>
      </ul>

      <h4 style="padding-top: 1rem">
        Jede Genossenschaftseinlage stärkt unser Projekt nachhaltig.
      </h4>
    </div>

    <div class="content">
      <h2>
        Was bedeutet es, investierendes Genossenschaftsmitglied zu werden?
      </h2>

      <h3>
        Investierende Mitglieder unterstützen die Genossenschaft rein finanziell
        und helfen damit, die notwendigen Baumaßnahmen zu ermöglichen und den
        langfristigen Erhalt des Hauses zu sichern.
      </h3>

      <p>
        Dein Beitrag wirkt genau dort, wo es brennt:
        <strong>bei den Baukosten.</strong>
      </p>

      <h3>Dein Beitrag bewirkt unmittelbar:</h3>

      <ul>
        <li> Er erhöht unser <strong>Eigenkapital</strong>. </li>

        <li>
          Dadurch sinkt der Anteil der Sanierungskosten, den wir über verzinste
          Bankkredite decken müssen.
        </li>

        <li>
          Eine geringere Fremdfinanzierung bedeutet eine
          <strong>sichtbar geringere Mieterhöhung</strong> für die Menschen im
          Haus.
        </li>
      </ul>

      <p> So entsteht ein sehr klarer Hebel: </p>
      <h4>
        Mehr investierende Mitglieder = weniger Fremdkapital = weniger Druck auf
        die Mieten.
      </h4>

      <p></p>
      <p></p>

      <h3>Was bekommst du dafür?</h3>
      <ul class="list-card">
        <li v-for="card in benefitCards" :key="card.title">
          <div class="card-icon">
            <img :src="card.icon" :alt="card.title" loading="lazy" />
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="card.copy" />
        </li>
      </ul>

      <h4>Was du nicht bekommst (klar und fair):</h4>
      <ul style="font-weight: normal !important">
        <li>
          Kein Stimmrecht bei der Generalversammlung – das bleibt bei den
          Menschen, die im Haus leben.
        </li>
        <li> Keine Renditeversprechen. </li>
        <li>
          Kein spekulatives Investment, sondern eine
          <strong>wertebasierte, sozial wirksame Anlage</strong>.
        </li>
      </ul>

      <p></p>
      <p></p>

      <h4>
        Wenn du Geld so anlegen willst, dass es sozial, lokal und
        nachvollziehbar wirkt, ist die investierende Mitgliedschaft genau dafür
        gemacht.
      </h4>
    </div>

    <div class="content">
      <h2>Wohin fließt das Geld konkret?</h2>

      <h3> Die geplanten Maßnahmen: </h3>

      <ul class="list-card">
        <li v-for="item in measureCards" :key="item.title">
          <div class="card-icon">
            <img :src="item.icon" :alt="item.title" loading="lazy" />
          </div>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <p v-html="item.copy" />
        </li>
      </ul>

      <h4 style="padding-top: 1rem">
        Jede investierte Summe wirkt direkt und sichtbar.
      </h4>
    </div>

    <div class="content">
      <h2>So kannst du uns unterstützen</h2>

      <h3> Werde Genossenschaftsmitglied </h3>

      <p>
        <strong>
          Ab einem Betrag von 100 € kannst du investierendes Mitglied werden.
        </strong>
        <br />

        Mehrere Anteile sind möglich. Investierende Mitglieder beteiligen sich
        ohne Wohnrecht – genau dafür suchen wir Unterstützung.
      </p>

      <p></p>
      <p></p>

      <h3>Drei Schritte:</h3>

      <ol class="steps-list">
        <li v-for="(step, index) in steps" :key="step.title">
          <div class="step-number">{{ index + 1 }}</div>
          <div class="step-body">
            <p class="step-title">{{ step.title }}</p>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="step-sub" v-html="step.subtitle" />
          </div>
        </li>
      </ol>

      <h3>Hier geht es los:</h3>

      <div class="action-button-wrapper">
        <div>
          <a
            :href="'/informationsblatt-mitglied-werden.pdf'"
            role="button"
            class="link secondary link-elevation"
            >PDF herunterladen</a
          >
          <span>Informationsblatt als PDF herunterladen</span>
        </div>

        <div>
          <NuxtLink
            to="/mitglied-werden/online-beitritt-ausfuellen"
            class="link primary link-elevation"
          >
            Online-Beitritt ausfüllen
          </NuxtLink>

          <span>Beitrittserklärung online ausfüllen</span>
        </div>
      </div>
    </div>

    <div class="content">
      <h2> Häufige Fragen (FAQ) </h2>

      <div class="faq-accordion">
        <div
          v-for="(faq, index) in faqs"
          :key="faq.question"
          class="faq-item"
          :class="{ 'is-open': openFaq === index }"
        >
          <button
            type="button"
            class="faq-trigger"
            :aria-expanded="openFaq === index"
            @click="toggleFaq(index)"
          >
            <span class="faq-number">{{ index + 1 }}</span>
            <span class="faq-title">{{ faq.question }}</span>
            <span class="faq-icon" aria-hidden="true">
              {{ openFaq === index ? '−' : '+' }}
            </span>
          </button>
          <div class="faq-panel" :class="{ 'is-open': openFaq === index }">
            <!-- eslint-disable-next-line vue/no-v-html -->
            <p class="faq-answer" v-html="faq.answer" />
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <h2> Warum deine Unterstützung zählt </h2>

      <div class="impact-block">
        <p class="impact-eyebrow">Wofür wir stehen</p>
        <h3 class="impact-headline">
          Ein Haus, das den Menschen gehört – nicht dem Markt.
        </h3>
        <p class="impact-body">
          Wir sind eine kleine Genossenschaft mit einem klaren Ziel. Mit deiner
          Hilfe bleibt dieses Modell bestehen, wird zukunftsfähig und entfaltet
          echte Wirkung.
        </p>
        <ul class="impact-points">
          <li>Gemeinsam schaffen wir das.</li>
          <li>Für faire Mieten.</li>
          <li>Für soziale Stadtentwicklung.</li>
          <li>Für ein Zuhause, das bleibt.</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title:
    'Mitglied werden - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  description: 'Mitglied werden',
  ogTitle:
    'Mitglied werden - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogSiteName:
    'Mitglied werden - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogImage:
    'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
  ogDescription: 'Mitglied werden',
  ogUrl: 'https://www.einhaus-leipzig.de/mitglied-werden',
  ogType: 'website',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de/mitglied-werden',
    },
  ],
})

definePageMeta({
  layout: 'default',
})

const isMobile = ref(false)
const benefitCards = [
  {
    title: 'Bezahlbarer Wohnraum',
    icon: '/icons/home-heart.svg',
    copy: 'Du unterstützt ganz konkret <strong>bezahlbaren Wohnraum</strong> in Leipzig.',
  },
  {
    title: 'Selbstverwaltetes Hausprojekt',
    icon: '/icons/community-hands.svg',
    copy: 'Du stärkst ein <strong>unabhängiges, selbstverwaltetes Hausprojekt</strong> statt anonyme Immobilienfonds.',
  },
  {
    title: 'Regelmäßige Infos',
    icon: '/icons/newsletter-mail.svg',
    copy: 'Du erhältst regelmäßige Informationen zur Entwicklung des Projekts und zur Verwendung der Mittel.',
  },
]

const measureCards = [
  {
    title: 'Gebäudehülle & Leitungen',
    icon: '/icons/building-repair.svg',
    copy: 'Sanierung der Gebäudehülle sowie von <strong>Strom- und Wasserleitungen</strong>.',
  },
  {
    title: 'Energetische Modernisierung',
    icon: '/icons/energy-bolt.svg',
    copy: '<strong>Energetische Modernisierung</strong> für dauerhaft niedrigere Verbräuche.',
  },
  {
    title: 'Substanz erhalten',
    icon: '/icons/structure-shield.svg',
    copy: '<strong>Erhalt der Bausubstanz</strong> für langfristige Stabilität.',
  },
  {
    title: 'Heizung erneuern',
    icon: '/icons/heating-upgrade.svg',
    copy: 'Erneuerung und Umbau der <strong>Heizungsanlage</strong>.',
  },
]

const steps = [
  {
    title: 'Informationsblatt herunterladen',
    subtitle: 'PDF: „Mitglied werden – alle Fakten im Überblick“',
  },
  {
    title: 'Beitrittserklärung ausfüllen',
    subtitle: 'PDF oder Online-Formular',
  },
  {
    title: 'Anteile zeichnen',
    subtitle: 'Du erhältst eine Bestätigung und wirst offiziell Mitglied.',
  },
]

const faqs = [
  {
    question: 'Wie genau wirkt sich mein Anteil aus?',
    answer:
      'Jeder gezeichnete Anteil erhöht unser Eigenkapital und reduziert den Umfang der Finanzierung über verzinste Bankdarlehen. Dadurch fällt die notwendige Mieterhöhung für die Bewohner:innen geringer aus.',
  },
  {
    question: 'Gibt es einen Mindestbetrag?',
    answer:
      'Ja. Ein Anteil kostet 100 €. Du kannst einen oder mehrere Anteile zeichnen – je nach Möglichkeit und Wunsch.',
  },
  {
    question: 'Bekomme ich Mitspracherechte?',
    answer:
      'Nein. Investierende Mitglieder unterstützen das Projekt finanziell, ohne Stimmrecht. Alle Entscheidungen über das Haus treffen die wohnenden Mitglieder.',
  },
  {
    question: 'Wie sicher ist eine Einlage in die Genossenschaft?',
    answer:
      'Genossenschaften gelten als eine der stabilsten Rechtsformen. Die Einlage ist kein Spekulationsprodukt, sondern Teil des gemeinschaftlichen Vermögens.',
  },
  {
    question: 'Wie transparent erfahre ich, was mit dem Geld passiert?',
    answer:
      'Investierende Mitglieder erhalten regelmäßig Informationen über den Fortschritt der Baumaßnahmen, die wirtschaftliche Entwicklung und die Verwendung der Mittel.',
  },
  {
    question: 'Kann ich meine Anteile später wieder kündigen?',
    answer:
      'Ja. Die Kündigung von Genossenschaftsanteilen ist möglich, allerdings mit den in der Satzung festgelegten Fristen (typisch: mehrere Monate bis Jahresende). Die genaue Regelung stellen wir transparent zur Verfügung.',
  },
]

const openFaq = ref<number | null>(0)

function toggleFaq(index: number) {
  openFaq.value = openFaq.value === index ? null : index
}

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

<style lang="scss" scoped>
.default-container::before {
  background-image: url(/images/einhaus-landing-photo-06.jpg);
}

.default-container {
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: clamp(2.7rem, 7vw, 3.5rem);
    line-height: 1;
    padding-bottom: 2rem;
  }

  h2 {
    font-size: 2.3rem;
    line-height: 1.1;
    padding: 2rem 0rem 1.5rem;

    hyphens: auto;
    overflow-wrap: anywhere;

    @media screen and (min-width: $md) {
      hyphens: initial;
      overflow-wrap: initial;
    }
  }
}

ul {
  margin-top: 0;
  font-weight: 700;
}

ul.list-card {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

  margin: 0;
  padding: 0;
  padding-bottom: 2.4rem;

  @media screen and (min-width: $md) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  li {
    list-style-type: none;
    background: linear-gradient(150deg, #f7f9fb 0%, #eef3f7 100%);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 1.1rem;
    padding: 1.2rem;
    box-shadow: 0 10px 24px -14px rgba(0, 0, 0, 0.35);
    display: grid;
    grid-template-rows: auto 1fr;
    justify-items: center;
    text-align: center;
    row-gap: 0.75rem;
    transition: transform 200ms ease-in;
    will-change: transform;
  }

  li:hover {
    transform: translateY(-4px) scale(1.02);
  }

  .card-icon {
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: #1f3a4d0f;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    img {
      width: 26px;
      height: 26px;
    }
  }

  p {
    margin: 0;
    font-weight: 600;
    line-height: 1.6;
    hyphens: auto;
    overflow-wrap: anywhere;
  }
}

.steps-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0 2rem;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));

  li {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: start;
    gap: 0.75rem;
    padding: 1rem 1.2rem;
    border-radius: 14px;
    background: linear-gradient(140deg, #f6f8fb 0%, #eef2f7 100%);
    border: 1px solid rgba(0, 0, 0, 0.06);
    box-shadow: 0 10px 24px -16px rgba(0, 0, 0, 0.25);
  }

  .step-number {
    width: 42px;
    height: 42px;
    border-radius: 12px;
    background: #1f3a4d;
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.05rem;
  }

  .step-title {
    margin: 0;
    font-weight: 700;
    line-height: 1.4;
  }

  .step-sub {
    margin: 0;
    color: #304559;
    line-height: 1.5;
  }
}

.impact-block {
  padding: 1.6rem;
  border-radius: 18px;
  background: linear-gradient(160deg, #f5f8fb 0%, #eef2f7 100%);
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 16px 38px -22px rgba(0, 0, 0, 0.35);
  display: grid;
  gap: 0.9rem;

  .impact-eyebrow {
    margin: 0;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-size: 0.9rem;
    color: #304559;
    font-weight: 700;
  }

  .impact-headline {
    margin: 0;
    font-size: clamp(1.4rem, 3vw, 1.9rem);
    line-height: 1.2;
    color: #0f2635;
  }

  .impact-body {
    margin: 0;
    font-size: 1rem;
    line-height: 1.7;
    color: #304559;
  }

  .impact-points {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0.6rem;

    @media screen and (min-width: $md) {
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    }

    li {
      background: #1f3a4d0c;
      border: 1px solid rgba(31, 58, 77, 0.08);
      border-radius: 12px;
      padding: 0.8rem 1rem;
      font-weight: 700;
      color: #0f2635;
      text-align: center;
    }
  }
}

.faq-accordion {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;

  .faq-item {
    border-radius: 14px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    background: linear-gradient(140deg, #f6f8fb 0%, #eef2f7 100%);
    box-shadow: 0 10px 24px -16px rgba(0, 0, 0, 0.2);
    overflow: hidden;

    transition: transform 180ms ease;
    will-change: transform;

    &.is-open {
      transform: translateY(-2px);
    }
  }

  .faq-trigger {
    width: 100%;
    background: transparent;
    border: none;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.2rem;
    text-align: left;
    cursor: pointer;
    color: inherit;
  }

  .faq-number {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #1f3a4d;
    color: white;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1rem;
  }

  .faq-title {
    font-weight: 700;
    font-size: 1rem;
  }

  .faq-icon {
    font-size: 1.3rem;
    line-height: 1;
  }

  .faq-panel {
    padding: 0 1.2rem 0 4.5rem;
    color: #304559;
    max-height: 0;
    overflow: hidden;
    transition:
      max-height 320ms ease,
      padding 320ms ease;

    &.is-open {
      padding: 0 1.2rem 1.2rem 4.5rem;
      max-height: 500px;
    }

    .faq-answer {
      margin: 0.4rem 0 0;
      line-height: 1.6;
    }
  }
}

.action-button-wrapper {
  div {
    display: flex;
    align-items: center;
  }
}
</style>
