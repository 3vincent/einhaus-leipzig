<script setup lang="ts">
const expires = new Date()
// expires after one year
expires.setTime(expires.getTime() + 365 * 24 * 60 * 60 * 1000)

const cookieConsent = useCookie('cookieConsent', {
  sameSite: 'strict',
  expires,
})
cookieConsent.value = cookieConsent.value || 'initial'

const acceptCookie = () => {
  cookieConsent.value = 'accepted'

  refreshCookie('cookieConsent')
}

const denyCookie = () => {
  const shortLivedCookie = useCookie('cookieConsent', { sameSite: true })
  shortLivedCookie.value = 'denied'

  refreshCookie('cookieConsent')
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
          <a
            @click.prevent="acceptCookie"
            role="button"
            rel="nofollow"
            class="link primary"
            >Akzeptieren</a
          >

          <a
            @click.prevent="denyCookie"
            role="button"
            rel="nofollow"
            class="link secondary"
            >Verweigern</a
          >
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

  &::after {
    content: '';
    flex: auto;
  }

  p {
    color: var(--main-text-color-dark);
    font-weight: 500;
    font-size: 0.9rem;
    display: inline-block;
    padding: 1rem 0 0 0;
  }

  p a {
    color: var(----main-text-color-semidark);
    border-bottom-color: var(----main-text-color-semidark);
    border-bottom-width: 1px;
  }

  a.link {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  a.link:last-child {
    margin-right: 0;
  }

  .button-container {
    display: flex;
    justify-content: space-between;
  }

  .link.primary {
    background-color: white;
    color: var(--main-text-color-dark) !important;
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
