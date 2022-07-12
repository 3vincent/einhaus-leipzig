<template>
  <div class="footer-container">
    <div class="grid-container">
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
      &#169; 2022 EinHaus Reichpietschstraße 13 eG
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/general/variables.scss';

::selection {
  background-color: rgba(255, 255, 255, 0.8);
}

.footer-container {
  display: flex;
  flex-flow: column;
  min-height: 30vh;
  background-color: #333;
}

.grid-container {
  display: grid;
  color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  flex: 1;
  align-items: flex-start;
  justify-content: center;
  justify-items: left;

  grid-template-columns: repeat(auto-fit, minmax(175px, 250px));
  grid-column-gap: 2rem;
  grid-row-gap: 1rem;
}

.list-container {
  display: inline-block;
}

h3.headline {
  margin-bottom: 0;
  padding-bottom: 0;
  text-transform: uppercase;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.6);
}

ul {
  font-size: 1rem;
  font-weight: 500;
  list-style-type: none;
  list-style-position: inside;
  padding: 0;

  @media screen and (min-width: $_md) {
    font-size: 0.9rem;
    line-height: 1.2rem;
  }
}

li {
  padding-bottom: 0.5rem;
}

.copyright-claim {
  bottom: 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  padding: 1rem;

  @media screen and (min-width: $_md) {
    font-size: 0.8rem;
  }
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
</style>
