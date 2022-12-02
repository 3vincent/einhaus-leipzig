<script setup lang="ts">
const expires = new Date()
// expires after one year
expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000)

const cookieConsent = useCookie('cookieConsent', { sameSite: true })
cookieConsent.value = cookieConsent.value || 'initial'

const acceptCookie = () => {
  // @ts-ignore
  cookieConsent.value = null
  const acceptCookie = useCookie('cookieConsent', { expires, sameSite: true })
  acceptCookie.value = 'accepted'
}

const denyCookie = () => {
  // @ts-ignore
  cookieConsent.value = null

  const shortLivedCookie = useCookie('cookieConsent', { sameSite: true })
  shortLivedCookie.value = 'denied'

  /* Or use cookie for one sessions
   * This way the user does not see the banner after clicking deny - even when
   * changing pages - until they close the browser (session cookie).
   * This can be achieved like this:

   * useCookie('cookieConsent', { sameSite: true })
   * const shortLivedCookie = useCookie('cookieConsent', { sameSite: true })
   * shortLivedCookie.value = 'denied'
   */
}
</script>

<template>
  <!-- <div class="container" v-if="cookieConsent === 'denied' || !cookieConsent"> -->
  <div class="cookie-container" v-if="cookieConsent === 'initial'">
    <div class="content">
      <div class="inner-content">
        <div class="text-container">
          <p>
            Auf dieser Seite verwenden wir Cookies. In der
            <NuxtLink to="/datenschutz"> Datenschutzerklärung</NuxtLink> kannst
            du nachlesen, was wir mit den Daten anstellen.
          </p>
        </div>
        <div class="button-container">
          <a href="#" rel="nofollow" v-on:click.prevent="acceptCookie">
            <button class="link primary small"> Akzeptieren </button>
          </a>
          <a href="#" rel="nofollow" v-on:click.prevent="denyCookie">
            <button class="link secondary small"> Verweigern </button>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.cookie-container {
  position: fixed;
  z-index: 1400;
  bottom: 1rem;

  background: var(--pretty-green);
  border-radius: 0.2rem;
  min-height: max-content;
  height: max-content;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100vw - 0.5rem - 0.5rem);
  width: max-content;

  @media screen and (min-width: $_md) {
    max-width: calc(100vw - 1rem - 1rem);
  }
}

.content {
  padding: 0.5rem;

  @media screen and (min-width: $_md) {
    padding: 0rem 1rem;
  }
}

.inner-content {
  display: flex;
  flex-direction: column;

  flex-wrap: wrap;
  justify-content: space-between;
  align-items: left;

  &::after {
    content: '';
    flex: auto;
  }

  p {
    color: white;
    font-weight: 500;
    font-size: 0.9rem;
    display: inline-block;
    padding: 1rem 0 0 0;
  }

  p a {
    color: white;
    border-bottom-color: white;
    border-bottom-width: 1px;
  }

  a.link {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  a.link:last-child {
    margin-right: 0;
  }

  .link.primary {
    background-color: white;
    color: var(--main-text-color-dark) !important;
    border: 2px solid var(--main-text-color-semidark) !important;
    border: 2px solid white !important;

    &:hover,
    :focus {
      // border-color: var(--main-text-color-semidark-light) !important;
      // border-color: var(--main-text-color-semidark-light) !important;
      box-shadow: 0px 0px 0.4rem rgba(46, 46, 46, 0.8) !important;
    }
  }

  .link.secondary {
    color: var(--main-text-color-dark) !important;

    &:hover {
      color: var(--main-text-color-semidark) !important;
    }
  }
}
</style>
