<template>
  <div class="footer-container">
    <div
      class="grid-container"
      v-bind:class="{ 'grid-container--conditional': isLanding }"
    >
      <div class="grid-container-inner">
        <div class="kontakt list-container">
          <h3 class="headline"> Kontakt </h3>
          <ul>
            <li>
              EinHaus Reichpietschstraße 13 eG <br />
              Reichpietschstraße 13 <br />
              04317 Leipzig
            </li>
            <li>{{ envVar.public.OFFICIAL_CONTACT_ADDRESS }}</li>
            <li>
              <NuxtLink to="/kontakt">
                <span>Kontaktformular</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="navigation list-container">
          <h3 class="headline"> Navigation </h3>
          <ul>
            <li>
              <NuxtLink to="/">
                <span>Home</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/kontakt">
                <span>Kontakt</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/impressum">
                <span>Impressum</span>
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/datenschutz">
                <span>Datenschutzerklärung</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <div class="external-links list-container">
          <h3 class="headline"> Links </h3>
          <ul>
            <li>
              <a
                href="https://www.netzwerk-leipziger-freiheit.de/"
                target="_blank"
              >
                Netzwerk Leipziger Freiheit -
                https://www.netzwerk-leipziger-freiheit.de/
              </a>
            </li>
            <li>
              <a href="https://www.bund-leipzig.de/" target="_blank">
                BUND Leipzig Ortsgruppe Ost - https://www.bund-leipzig.de/
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div class="copyright-claim">
        <span>&#169; {{ currentYear }} EinHaus Reichpietschstraße 13 eG</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { isLanding = false } = defineProps<{
  isLanding?: boolean
}>()

const currentYear = new Date().getFullYear()
const envVar = useRuntimeConfig()
</script>

<style lang="scss" scoped>
::selection {
  background-color: rgba(255, 255, 255, 0.8);
}

.footer-container {
  min-height: 30vh;
  width: 100%;
  background-color: #333;
  padding-top: 1rem;
}

.grid-container {
  max-width: calc(800px + (4 * 2rem));

  margin: 0 auto;
  padding-top: 2rem;
  padding-left: 2rem;
  padding-right: 2rem;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 80px;
  grid-column-gap: 0px;
  grid-row-gap: 0px;

  &-inner {
    grid-area: 1 / 1 / 2 / 2;

    display: grid;

    grid-template-columns: repeat(auto-fit, 250px);
    grid-column-gap: 1rem;
    justify-content: space-between;
  }

  .copyright-claim {
    grid-area: 2 / 1 / 3 / 2;
    margin: 0;
    align-self: center;

    span {
      font-size: 0.7rem;
      font-weight: 700;
      color: rgba(193, 193, 193, 1);

      @media screen and (min-width: $_md) {
        font-size: 0.7rem;
      }
    }
  }
}

.grid-container--conditional {
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  max-width: calc(800px + (2 * 1.6rem));

  @media screen and (min-width: $_xs) {
    margin: 0 auto;
  }

  @media screen and (min-width: $_xl) {
    margin: 0 auto;
  }
}

.list-container {
  display: inline-block;

  h3.headline {
    margin-bottom: 0;
    padding-bottom: 0;
    text-transform: uppercase;
    font-weight: 400;
    color: rgba(156, 157, 156, 1);
  }
}

ul {
  font-size: 1rem;
  font-weight: 500;
  list-style-type: none;
  list-style-position: inside;
  padding: 0;
  margin-top: 2rem;

  li {
    padding-bottom: 1.4rem;
    line-height: 1.4rem;
    color: rgb(230, 230, 230);

    @media screen and (min-width: $_md) {
      padding-bottom: 1.2rem;
      font-size: 0.9rem;
      line-height: 1.2rem;
    }

    a,
    a:visited {
      text-decoration: underline;
      color: inherit;
    }

    a:hover {
      // color: #00c58e;
      opacity: 0.8;
      text-decoration: none;
    }
  }
}

.external-links ul {
  list-style-type: square;
}
</style>
