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
            <li>info@einhaus-leipzig.de</li>
            <li>Kontaktformular</li>
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
            <li>Kontakt</li>
            <li>
              <NuxtLink to="/impressum">
                <span>Impressum</span>
              </NuxtLink>
            </li>
            <li>Datenschutzerklärung</li>
          </ul>
        </div>

        <div class="something list-container">
          <h3 class="headline"> Links </h3>
          <ul>
            <li>info@einhaus-leipzig.de</li>
            <li>Kontaktformular</li>
          </ul>
        </div>
      </div>

      <div class="copyright-claim">
        <span>&#169; 2022 EinHaus Reichpietschstraße 13 eG</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    isLanding: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/general/variables.scss';

::selection {
  background-color: rgba(255, 255, 255, 0.8);
}

.footer-container {
  min-height: 30vh;
  width: 100%;
  background-color: #333;
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

    font-size: 0.9rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.5);
    margin: 0;
    // margin-top: 1rem;
    // margin-bottom: 1rem;
    align-self: center;

    @media screen and (min-width: $_md) {
      font-size: 0.8rem;
    }
  }
}

.grid-container--conditional {
  max-width: calc(800px + (2 * 2rem));

  @media screen and (min-width: $_xs) {
    margin: 0 auto;
  }

  @media screen and (min-width: $_md) {
    margin-left: calc(200px);
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
    font-weight: 600;
    color: rgba(142, 142, 142, 1);
  }
}

ul {
  font-size: 1rem;
  font-weight: 500;
  list-style-type: none;
  list-style-position: inside;
  padding: 0;

  li {
    padding-bottom: 1rem;
    line-height: 1.4rem;
    color: rgb(230, 230, 230);

    @media screen and (min-width: $_md) {
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
</style>
