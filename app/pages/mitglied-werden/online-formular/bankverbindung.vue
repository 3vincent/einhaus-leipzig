<template>
  <div class="content">
    <h1>Online-Beitritt – Schritt 2 von 3</h1>

    <p>
      Bitte gib deine Bankverbindung an. <br />
      Sie wird für mögliche Auszahlungen im Rahmen deiner investierenden
      Mitgliedschaft benötigt.
    </p>
    <p></p>

    <div v-if="formError" class="alert error" role="alert">
      {{ formError }}
    </div>

    <form class="form-grid" novalidate @submit.prevent="onNext">
      <label class="form-field" :class="{ error: errors.accountHolder }">
        <span>Kontoinhaber:in *</span>
        <input
          v-model="localForm.accountHolder"
          type="text"
          name="accountHolder"
          autocomplete="name"
          :aria-invalid="!!errors.accountHolder"
          :aria-describedby="
            errors.accountHolder ? 'error-accountHolder' : undefined
          "
        />
        <small v-if="errors.accountHolder" id="error-accountHolder">
          {{ errors.accountHolder }}
        </small>
      </label>

      <label class="form-field" :class="{ error: errors.iban }">
        <span>IBAN *</span>
        <input
          v-model="localForm.iban"
          type="text"
          name="iban"
          autocomplete="off"
          inputmode="text"
          :aria-invalid="!!errors.iban"
          :aria-describedby="errors.iban ? 'error-iban' : undefined"
        />
        <small v-if="errors.iban" id="error-iban">
          {{ errors.iban }}
        </small>
      </label>

      <label class="form-field" :class="{ error: errors.bic }">
        <span>BIC (optional)</span>
        <input
          v-model="localForm.bic"
          type="text"
          name="bic"
          autocomplete="off"
          inputmode="text"
          :aria-invalid="!!errors.bic"
          :aria-describedby="errors.bic ? 'error-bic' : undefined"
        />
        <small v-if="errors.bic" id="error-bic">
          {{ errors.bic }}
        </small>
      </label>

      <div class="actions">
        <NuxtLink
          class="link secondary"
          to="/mitglied-werden/online-formular/persoenliche-daten"
        >
          Zurück
        </NuxtLink>
        <button class="link primary" type="submit"> Weiter </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useInvestApplicationStore } from '../../../stores/investApplication'

definePageMeta({
  layout: 'investwizard',
})

useHead({
  title: 'Online-Beitritt – Schritt 2 von 3',
})

const store = useInvestApplicationStore()
const router = useRouter()

onMounted(() => {
  if (!store.isStep1Valid) {
    router.push('/mitglied-werden/online-formular/persoenliche-daten')
    return
  }
  store.currentStep = 1
})

const formError = ref('')
const errors = reactive<Partial<Record<string, string>>>({})
const localForm = reactive({
  accountHolder: store.payload.accountHolder,
  iban: store.payload.iban,
  bic: store.payload.bic || '',
})

watch(
  () => ({ ...localForm }),
  value => {
    store.update({
      accountHolder: value.accountHolder,
      iban: value.iban,
      bic: value.bic,
    })
  },
  { deep: true }
)

// Wenn aus sessionStorage geladen wurde, lokale Felder nachziehen
watch(
  () => ({ ...store.payload }),
  value => {
    Object.assign(localForm, {
      accountHolder: value.accountHolder,
      iban: value.iban,
      bic: value.bic || '',
    })
  },
  { deep: true, immediate: true }
)

const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/
const bicRegex = /^[A-Z0-9]{8}([A-Z0-9]{3})?$/

function sanitizeIban(value: string) {
  return value.replace(/\s+/g, '').toUpperCase()
}

function checkIbanChecksum(iban: string) {
  if (!ibanRegex.test(iban)) return false
  const rearranged = iban.slice(4) + iban.slice(0, 4)
  const expanded = rearranged
    .toUpperCase()
    .split('')
    .map(ch =>
      ch.charCodeAt(0) >= 65 && ch.charCodeAt(0) <= 90
        ? ch.charCodeAt(0) - 55
        : ch
    )
    .join('')
  let remainder = ''
  for (let i = 0; i < expanded.length; i += 7) {
    const block = remainder + expanded.slice(i, i + 7)
    remainder = String(BigInt(block) % 97n)
  }
  return Number(remainder) === 1
}

function validate() {
  formError.value = ''
  ;(Object.keys(errors) as Array<keyof typeof errors>).forEach(k => {
    errors[k] = undefined
  })

  const iban = sanitizeIban(localForm.iban || '')

  if (!localForm.accountHolder.trim())
    errors.accountHolder = 'Bitte Kontoinhaber:in angeben.'
  if (!ibanRegex.test(iban) || !checkIbanChecksum(iban))
    errors.iban = 'Bitte eine gültige IBAN angeben.'
  if (localForm.bic && !bicRegex.test(localForm.bic.trim().toUpperCase()))
    errors.bic = 'Bitte eine gültige BIC angeben.'

  if (Object.keys(errors).length) {
    formError.value =
      'Bitte prüfe die markierten Felder und versuche es erneut.'
    return false
  }
  return true
}

function onNext() {
  if (!validate()) return
  store.update({
    accountHolder: localForm.accountHolder.trim(),
    iban: sanitizeIban(localForm.iban),
    bic: localForm.bic.trim(),
  })
  store.currentStep = 2
  router.push('/mitglied-werden/online-formular/antrag-abschicken')
}
</script>

<style scoped lang="scss">
.content {
  background: #fff;
  border-radius: 14px;
  padding: clamp(1.2rem, 4vw, 2rem);
  box-shadow: 0 10px 28px -18px rgba(0, 0, 0, 0.35);
}

h1 {
  font-size: clamp(1.6rem, 4vw, 2.4rem);
  margin-bottom: 0.6rem;
}

.alert.error {
  background: #fff4f0;
  border: 1px solid #f3c7b8;
  color: #8c2f07;
  border-radius: 10px;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
}

.form-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-weight: 600;

  span {
    font-weight: 700;
  }

  input,
  select {
    padding: 0.65rem 0.75rem;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    font-size: 1rem;
    background: #fff;
    height: 45px;
  }

  small {
    color: #8c2f07;
    font-weight: 500;
  }

  &.error input,
  &.error select {
    border-color: #d46a41;
  }
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}
</style>
