<template>
  <div class="content">
    <h1>Online-Beitritt – Schritt 1 von 3</h1>
    <h2>Persönliche Daten</h2>
    <p>
      Bitte gib deine persönlichen Daten an. Felder mit * sind Pflichtfelder.
    </p>

    <div v-if="formError" class="alert error" role="alert">
      {{ formError }}
    </div>

    <form class="form-grid" novalidate @submit.prevent="onNext">
      <label class="form-field">
        <span>Anrede</span>
        <select v-model="localForm.salutation" name="salutation">
          <option value="">Keine Angabe</option>
          <option value="frau">Frau</option>
          <option value="herr">Herr</option>
          <option value="divers">Divers</option>
        </select>
      </label>

      <label class="form-field" :class="{ error: errors.firstName }">
        <span>Vorname *</span>
        <input
          v-model="localForm.firstName"
          type="text"
          name="firstName"
          autocomplete="given-name"
          :aria-invalid="!!errors.firstName"
          :aria-describedby="errors.firstName ? 'error-firstName' : undefined"
        />
        <small v-if="errors.firstName" id="error-firstName">
          {{ errors.firstName }}
        </small>
      </label>

      <label class="form-field" :class="{ error: errors.lastName }">
        <span>Nachname *</span>
        <input
          v-model="localForm.lastName"
          type="text"
          name="lastName"
          autocomplete="family-name"
          :aria-invalid="!!errors.lastName"
          :aria-describedby="errors.lastName ? 'error-lastName' : undefined"
        />
        <small v-if="errors.lastName" id="error-lastName">
          {{ errors.lastName }}
        </small>
      </label>

      <label class="form-field" :class="{ error: errors.email }">
        <span>E-Mail-Adresse *</span>
        <input
          v-model="localForm.email"
          type="email"
          name="email"
          autocomplete="email"
          :aria-invalid="!!errors.email"
          :aria-describedby="errors.email ? 'error-email' : undefined"
        />
        <small v-if="errors.email" id="error-email">
          {{ errors.email }}
        </small>
      </label>

      <label class="form-field">
        <span>Telefon (optional)</span>
        <input
          v-model="localForm.phone"
          type="tel"
          name="phone"
          autocomplete="tel"
        />
      </label>

      <label class="form-field" :class="{ error: errors.birthDate }">
        <span>Geburtsdatum *</span>
        <input
          v-model="localForm.birthDate"
          type="date"
          name="birthDate"
          :aria-invalid="!!errors.birthDate"
          :aria-describedby="errors.birthDate ? 'error-birthDate' : undefined"
        />
        <small v-if="errors.birthDate" id="error-birthDate">
          {{ errors.birthDate }}
        </small>
      </label>

      <h2>Anschrift</h2>
      <label class="form-field full-row-span" :class="{ error: errors.street }">
        <span>Straße / Hausnummer *</span>
        <input
          v-model="localForm.street"
          type="text"
          name="street"
          autocomplete="street-address"
          :aria-invalid="!!errors.street"
          :aria-describedby="errors.street ? 'error-street' : undefined"
        />
        <small v-if="errors.street" id="error-street">
          {{ errors.street }}
        </small>
      </label>

      <label class="form-field" :class="{ error: errors.postalCode }">
        <span>PLZ *</span>
        <input
          v-model="localForm.postalCode"
          type="text"
          name="postalCode"
          inputmode="numeric"
          autocomplete="postal-code"
          :aria-invalid="!!errors.postalCode"
          :aria-describedby="errors.postalCode ? 'error-postalCode' : undefined"
        />
        <small v-if="errors.postalCode" id="error-postalCode">
          {{ errors.postalCode }}
        </small>
      </label>

      <label class="form-field" :class="{ error: errors.city }">
        <span>Ort *</span>
        <input
          v-model="localForm.city"
          type="text"
          name="city"
          autocomplete="address-level2"
          :aria-invalid="!!errors.city"
          :aria-describedby="errors.city ? 'error-city' : undefined"
        />
        <small v-if="errors.city" id="error-city">
          {{ errors.city }}
        </small>
      </label>

      <label class="form-field">
        <span>Land *</span>
        <input
          v-model="localForm.country"
          type="text"
          name="country"
          autocomplete="country-name"
        />
      </label>

      <div class="form-field full-row-span info-block">
        <h2 class="info-title">Steueridentifikationsnummer</h2>
      </div>

      <label class="form-field full-row-span" :class="{ error: errors.taxId }">
        <span>Steueridentifikationsnummer *</span>
        <input
          v-model="localForm.taxId"
          type="text"
          name="taxId"
          inputmode="numeric"
          autocomplete="off"
          :aria-invalid="!!errors.taxId"
          :aria-describedby="errors.taxId ? 'error-taxId' : undefined"
        />
        <small v-if="errors.taxId" id="error-taxId">
          {{ errors.taxId }}
        </small>
        <p class="muted">
          Die Steueridentifikationsnummer und das Geburtsdatum werden benötigt,
          um im Falle einer Gewinnausschüttung die Abgeltungssteuer abführen zu
          können und die gesetzlich vorgesehenen Abfragen zum
          Kirchensteuermerkmal durchführen zu können.
        </p>
      </label>

      <label class="form-field full-row-span" :class="{ error: errors.shares }">
        <h2>Genossenschaftsanteile</h2>
        <span>Anzahl der gewünschten Genossenschaftsanteile *</span>
        <input
          v-model.number="localForm.shares"
          type="number"
          min="1"
          step="1"
          inputmode="numeric"
          name="shares"
          :aria-invalid="!!errors.shares"
          :aria-describedby="errors.shares ? 'error-shares' : undefined"
        />
        <small v-if="errors.shares" id="error-shares">
          {{ errors.shares }}
        </small>
        <p class="muted">Ein Anteil kostet 100 €. Mehr Anteile sind möglich.</p>
      </label>

      <div class="actions">
        <button class="link primary" type="submit"> Weiter </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useInvestApplicationStore } from '~/stores/investApplication'

definePageMeta({
  layout: 'invest-wizard',
})

useHead({
  title: 'Online-Beitritt – Schritt 1 von 3',
})

const store = useInvestApplicationStore()
const router = useRouter()

const formError = ref('')
const errors = reactive<Partial<Record<string, string>>>({})
const localForm = reactive({
  salutation: store.payload.salutation,
  firstName: store.payload.firstName,
  lastName: store.payload.lastName,
  email: store.payload.email,
  phone: store.payload.phone,
  birthDate: store.payload.birthDate || '',
  taxId: store.payload.taxId || '',
  street: store.payload.street,
  postalCode: store.payload.postalCode,
  city: store.payload.city,
  country: store.payload.country,
  shares: store.payload.shares,
})

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

watch(
  () => ({ ...localForm }),
  value => {
    store.update(value)
  },
  { deep: true }
)

// Wenn sessionStorage geladen wurde, Formularfelder befüllen
watch(
  () => ({ ...store.payload }),
  value => {
    Object.assign(localForm, value)
  },
  { deep: true, immediate: true }
)

function validate() {
  formError.value = ''
  ;(Object.keys(errors) as Array<keyof typeof errors>).forEach(k => {
    errors[k] = undefined
  })

  if (!localForm.firstName.trim())
    errors.firstName = 'Bitte gib deinen Vornamen ein.'
  if (!localForm.lastName.trim())
    errors.lastName = 'Bitte gib deinen Nachnamen ein.'
  if (!localForm.email.trim() || !emailRegex.test(localForm.email))
    errors.email = 'Bitte eine gültige E-Mail-Adresse angeben.'
  if (!localForm.birthDate) errors.birthDate = 'Bitte gib dein Geburtsdatum an.'
  if (!/^\d{11}$/.test(localForm.taxId.trim()))
    errors.taxId = 'Bitte eine gültige 11-stellige Steuer-ID angeben.'
  if (!localForm.street.trim())
    errors.street = 'Bitte Straße und Hausnummer angeben.'
  if (!localForm.postalCode.trim())
    errors.postalCode = 'Bitte eine PLZ angeben.'
  if (!localForm.city.trim()) errors.city = 'Bitte einen Ort angeben.'
  if (!localForm.country.trim()) errors.country = 'Bitte ein Land angeben.'
  if (
    !localForm.shares ||
    localForm.shares < 1 ||
    !Number.isInteger(localForm.shares)
  )
    errors.shares = 'Bitte eine positive ganze Zahl angeben.'

  if (Object.keys(errors).length) {
    formError.value =
      'Bitte prüfe die markierten Felder und versuche es erneut.'
    return false
  }
  return true
}

function persistToStore() {
  store.update(localForm)
}

function onNext() {
  if (!validate()) return
  persistToStore()
  store.currentStep = 1
  router.push('/mitglied-werden/online-formular/bankverbindung')
}

onMounted(() => {
  store.loadFromSession()
  store.currentStep = 0
})
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

h2 {
  font-size: clamp(1.2rem, 1rem + 2vw, 2rem);
  padding-top: 4rem;
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

  @media screen and (min-width: 820px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
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

  select {
    -webkit-appearance: none;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5 6 6.5 11 1.5' stroke='%23777' stroke-width='1.4' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 12px;
    padding-right: 2.5rem;
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

.full-row-span {
  grid-column: span 2;

  @media screen and (max-width: 819px) {
    grid-column: span 1;
  }
}

.muted {
  color: #304559;
  font-weight: 500;
  margin: 0.3rem 0 0;
}

.actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}
</style>
