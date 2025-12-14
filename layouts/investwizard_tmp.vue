<script setup lang="ts">
import { useInvestApplicationStore } from '~/stores/investApplication'

const store = useInvestApplicationStore()
const showCloseConfirm = ref(false)
const hydrated = ref(false)

onMounted(() => {
  hydrated.value = true
})

function handleCloseConfirm() {
  store.reset()
  navigateTo('/mitglied-werden')
}
</script>

<template>
  <div class="wizard-shell">
    <header v-if="hydrated" class="wizard-header">
      <InvestWizardStepper />
      <button
        class="close-button"
        type="button"
        aria-label="Formular schließen"
        @click="showCloseConfirm = true"
      >
        ✕
      </button>
    </header>

    <main v-if="hydrated" class="wizard-content">
      <NuxtPage />
    </main>

    <InvestWizardConfirmClose
      v-if="showCloseConfirm"
      @close="showCloseConfirm = false"
      @confirm="handleCloseConfirm"
    />
    <ClientOnly>
      <ToastStack />
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.wizard-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.wizard-shell::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;

  display: block;
  background-image: url('/images/einhaus-landing-photo-05.jpg');
  background-size: cover;
  width: 100%;
  height: 100%;

  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
}

.wizard-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem clamp(1rem, 4vw, 2rem);

  @media screen and (max-width: 640px) {
    position: static;
  }
}

.close-button {
  background: transparent;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 150ms ease;
}

.close-button:hover {
  background: rgba(0, 0, 0, 0.04);
}

.wizard-content {
  flex: 1;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  padding: clamp(1rem, 3vw, 2rem);
}
</style>
