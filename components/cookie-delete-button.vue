<script setup lang="ts">
const cookieConsent = useCookie('cookieConsent')
const showCheck = ref(false)

const deleteCookie = () => {
  try {
    // @ts-ignore
    showCheck.value = true
    setTimeout(() => {
      showCheck.value = false
      cookieConsent.value = 'initial'
    }, 1000)
    console.log('Cookie deleted..')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <a
    href="#"
    rel="nofollow"
    class="link secondary"
    v-on:click.prevent="deleteCookie"
    v-if="cookieConsent !== 'initial'"
  >
    Cookie löschen
    <Transition>
      <div v-if="showCheck"></div>
    </Transition>
  </a>
</template>

<style scoped lang="scss">
a.link.secondary {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  div {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    backdrop-filter: blur(3px);
    display: flex;
    align-items: center;
    justify-content: center;

    &::before {
      content: '';
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: var(--pretty-green);
      border: 2px solid white;
    }

    &::after {
      content: '';
      position: absolute;
      height: 20px;
      width: 10px;
      transform: rotate(35deg);
      border: 2px solid white;
      border-left-width: 0;
      border-top-width: 0;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
