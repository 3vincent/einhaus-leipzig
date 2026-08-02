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
  <div v-if="cookieConsent === 'initial'" class="cookie-container">
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
          <button type="button" class="link primary" @click="acceptCookie"
            >Akzeptieren</button
          >

          <button type="button" class="link secondary" @click="denyCookie"
            >Verweigern</button
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
  background: var(--color-brand-surface);
  border: 1px solid var(--color-border);
  border-radius: 0.2rem;
  min-height: max-content;
  height: max-content;
  left: 50%;
  transform: translateX(-50%);
  max-width: calc(100vw - 0.5rem - 0.5rem);
  width: max-content;

  @media screen and (min-width: $md) {
    max-width: calc(100vw - 1rem - 1rem);
  }
}

.content {
  padding: 0.5rem;

  @media screen and (min-width: $md) {
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
    color: var(--color-text);
    font-weight: 500;
    font-size: 0.9rem;
    display: inline-block;
    padding: 1rem 0 0 0;
  }

  p a {
    color: var(--color-text-muted);
    border-bottom-color: var(--color-border-strong);
    border-bottom-width: 1px;
  }

  .link {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .link:last-child {
    margin-right: 0;
  }

  .button-container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.75rem;
    margin: 0.75rem 0;

    @media screen and (min-width: $md) {
      grid-template-columns: repeat(2, minmax(150px, 1fr));
    }

    .link {
      width: 100%;
      margin: 0;
    }
  }
}
</style>
