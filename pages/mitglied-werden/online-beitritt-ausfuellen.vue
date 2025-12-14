<template>
  <div class="default-container">
    <div class="content">
      <BreadcrumbNav />

      <div class="intro">
        <h1>Online-Beitritt als investierendes Mitglied</h1>
        <p>
          Mit diesem Formular kannst du deinen Beitrittswunsch online
          einreichen. Deine Angaben helfen uns, den Antrag vorzubereiten. Die
          Mitgliedschaft wird erst wirksam, wenn wir deinen Antrag geprüft und
          bestätigt haben.
        </p>
        <p class="hint">
          Die Daten dienen zunächst als Interessensbekundung. Wir melden uns
          zeitnah bei dir, um die nächsten Schritte zu klären.
        </p>
      </div>

      <div v-if="successMessage" class="alert success" role="status">
        {{ successMessage }}
      </div>

      <div v-if="formError" class="alert error" role="alert">
        {{ formError }}
      </div>

      <form class="form" novalidate @submit.prevent="onSubmit">
        <section class="form-section">
          <h2>Persönliche Daten</h2>

          <div class="form-grid">
            <label class="form-field">
              <span>Anrede</span>
              <select
                id="salutation"
                v-model="form.salutation"
                name="salutation"
              >
                <option value="">Keine Angabe</option>
                <option value="frau">Frau</option>
                <option value="herr">Herr</option>
                <option value="divers">Divers</option>
              </select>
            </label>

            <label class="form-field" :class="{ error: errors.firstName }">
              <span>Vorname *</span>
              <input
                id="firstName"
                v-model="form.firstName"
                type="text"
                name="firstName"
                autocomplete="given-name"
                :aria-invalid="!!errors.firstName"
                :aria-describedby="
                  errors.firstName ? 'error-firstName' : undefined
                "
              />
              <small v-if="errors.firstName" :id="'error-firstName'">
                {{ errors.firstName }}
              </small>
            </label>

            <label class="form-field" :class="{ error: errors.lastName }">
              <span>Nachname *</span>
              <input
                id="lastName"
                v-model="form.lastName"
                type="text"
                name="lastName"
                autocomplete="family-name"
                :aria-invalid="!!errors.lastName"
                :aria-describedby="
                  errors.lastName ? 'error-lastName' : undefined
                "
              />
              <small v-if="errors.lastName" :id="'error-lastName'">
                {{ errors.lastName }}
              </small>
            </label>

            <label class="form-field" :class="{ error: errors.email }">
              <span>E-Mail-Adresse *</span>
              <input
                id="email"
                v-model="form.email"
                type="email"
                name="email"
                autocomplete="email"
                :aria-invalid="!!errors.email"
                :aria-describedby="errors.email ? 'error-email' : undefined"
              />
              <small v-if="errors.email" :id="'error-email'">
                {{ errors.email }}
              </small>
            </label>

            <label class="form-field">
              <span>Telefonnummer (optional)</span>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                name="phone"
                autocomplete="tel"
              />
            </label>

            <label
              class="form-field address-span"
              :class="{ error: errors.street }"
            >
              <span>Straße / Hausnummer *</span>
              <input
                id="street"
                v-model="form.street"
                type="text"
                name="street"
                autocomplete="street-address"
                :aria-invalid="!!errors.street"
                :aria-describedby="errors.street ? 'error-street' : undefined"
              />
              <small v-if="errors.street" :id="'error-street'">
                {{ errors.street }}
              </small>
            </label>

            <label class="form-field" :class="{ error: errors.postalCode }">
              <span>PLZ *</span>
              <input
                id="postalCode"
                v-model="form.postalCode"
                type="text"
                name="postalCode"
                inputmode="numeric"
                autocomplete="postal-code"
                :aria-invalid="!!errors.postalCode"
                :aria-describedby="
                  errors.postalCode ? 'error-postalCode' : undefined
                "
              />
              <small v-if="errors.postalCode" :id="'error-postalCode'">
                {{ errors.postalCode }}
              </small>
            </label>

            <label class="form-field" :class="{ error: errors.city }">
              <span>Ort *</span>
              <input
                id="city"
                v-model="form.city"
                type="text"
                name="city"
                autocomplete="address-level2"
                :aria-invalid="!!errors.city"
                :aria-describedby="errors.city ? 'error-city' : undefined"
              />
              <small v-if="errors.city" :id="'error-city'">
                {{ errors.city }}
              </small>
            </label>

            <label class="form-field">
              <span>Land *</span>
              <input
                id="country"
                v-model="form.country"
                type="text"
                name="country"
                autocomplete="country-name"
              />
            </label>
          </div>
        </section>

        <section class="form-section">
          <h2>Mitgliedschaft / Anteile</h2>
          <p class="muted"> Ich möchte investierendes Mitglied werden. </p>

          <label class="form-field inline" :class="{ error: errors.shares }">
            <span>Anzahl der gewünschten Genossenschaftsanteile *</span>
            <input
              id="shares"
              v-model.number="form.shares"
              type="number"
              name="shares"
              min="1"
              step="1"
              inputmode="numeric"
              :aria-invalid="!!errors.shares"
              :aria-describedby="errors.shares ? 'error-shares' : undefined"
            />
            <small v-if="errors.shares" :id="'error-shares'">
              {{ errors.shares }}
            </small>
            <p class="muted hint-inline"
              >Ein Anteil kostet 100 €. Mehr Anteile sind möglich.</p
            >
          </label>
        </section>

        <section class="form-section">
          <h2>Rechtliche Hinweise</h2>
          <div class="checkbox-group">
            <label class="checkbox" :class="{ error: errors.confirmInfo }">
              <input
                id="confirmInfo"
                v-model="form.confirmInfo"
                type="checkbox"
                name="confirmInfo"
                :aria-invalid="!!errors.confirmInfo"
              />
              <span>
                Ich bestätige, dass ich die Informationen zur investierenden
                Mitgliedschaft gelesen habe und dass es sich nicht um ein
                Renditeprodukt handelt. *
              </span>
            </label>
            <small v-if="errors.confirmInfo" class="checkbox-error">
              {{ errors.confirmInfo }}
            </small>

            <label class="checkbox" :class="{ error: errors.dataConsent }">
              <input
                id="dataConsent"
                v-model="form.dataConsent"
                type="checkbox"
                name="dataConsent"
                :aria-invalid="!!errors.dataConsent"
              />
              <span>
                Ich bin damit einverstanden, dass meine Daten zum Zweck der
                Bearbeitung meines Mitgliedschaftsantrags gespeichert und
                verarbeitet werden. *
              </span>
            </label>
            <small v-if="errors.dataConsent" class="checkbox-error">
              {{ errors.dataConsent }}
            </small>

            <label class="checkbox">
              <input
                id="newsletter"
                v-model="form.newsletter"
                type="checkbox"
                name="newsletter"
              />
              <span>
                Ich möchte per E-Mail über den weiteren Projektfortschritt
                informiert werden. (optional)
              </span>
            </label>
          </div>
        </section>

        <div class="actions">
          <NuxtLink class="link secondary" to="/mitglied-werden">
            Zurück zur Übersicht
          </NuxtLink>

          <button class="link primary" type="submit" :disabled="submitting">
            {{ submitting ? 'Wird gesendet…' : 'Antrag absenden' }}
          </button>
        </div>
      </form>

      <small class="asterisk-note">* Pflichtfelder</small>
      <p class="secure-note"
        >🔒 Ihre Angaben werden sicher übertragen (SSL-verschlüsselt).</p
      >

      <FullModal v-if="submitting" :show="true">
        <div class="submit-modal">
          <div class="inner-content">
            <h1>Dein Antrag wird gesendet …</h1>
            <LoadingAnimation />
          </div>
        </div>
      </FullModal>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useToast } from '~/composables/useToast'
import type { InvestApplicationPayload } from '~/util/types'

useSeoMeta({
  title:
    'Mitglied werden - Online-Beitritt ausfüllen - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  description: 'Mitglied werden',
  ogTitle:
    'Mitglied werden - Online-Beitritt ausfüllen - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogSiteName:
    'Mitglied werden - Online-Beitritt ausfüllen - EinHaus Reichpietschstraße 13 eG - Genossenschaft Leipzig',
  ogImage:
    'https://www.einhaus-leipzig.de/images/logo-einhaus-genossenschaft-leipzig.png',
  ogDescription: 'Mitglied werden - Online-Beitritt ausfüllen',
  ogUrl:
    'https://www.einhaus-leipzig.de/mitglied-werden/online-beitritt-ausfuellen',
  ogType: 'website',
})

useHead({
  link: [
    {
      rel: 'canonical',
      href: 'https://www.einhaus-leipzig.de/mitglied-werden/online-beitritt-ausfuellen',
    },
  ],
})

definePageMeta({
  layout: 'default',
  breadcrumb: 'Online-Beitritt ausfüllen',
})

const { showToast } = useToast()

type FormData = {
  shares: number | null
} & Pick<
  InvestApplicationPayload,
  | 'salutation'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'street'
  | 'postalCode'
  | 'city'
  | 'country'
  | 'confirmInfo'
  | 'dataConsent'
  | 'newsletter'
>

type FormErrors = Partial<Record<keyof FormData, string>>

const form = reactive<FormData>({
  salutation: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  street: '',
  postalCode: '',
  city: '',
  country: 'Deutschland',
  shares: null,
  confirmInfo: false,
  dataConsent: false,
  newsletter: false,
})

const errors = reactive<FormErrors>({})
const formError = ref('')
const successMessage = ref('')
const submitting = ref(false)

const STORAGE_KEY = 'einhaus-invest-beitritt'
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/

onMounted(() => {
  const saved = sessionStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      const parsed = JSON.parse(saved) as Partial<FormData>
      Object.assign(form, parsed)
    } catch (error) {
      console.warn('Konnte gespeicherte Formulardaten nicht laden', error)
    }
  }
})

watch(
  () => ({ ...form }),
  value => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
  },
  { deep: true }
)

function validate() {
  formError.value = ''
  ;(Object.keys(errors) as Array<keyof FormErrors>).forEach(key => {
    errors[key] = undefined
  })

  if (!form.firstName.trim())
    errors.firstName = 'Bitte gib deinen Vornamen ein.'
  if (!form.lastName.trim()) errors.lastName = 'Bitte gib deinen Nachnamen ein.'
  if (!form.email.trim() || !emailRegex.test(form.email))
    errors.email = 'Bitte eine gültige E-Mail-Adresse angeben.'
  if (!form.street.trim())
    errors.street = 'Bitte Straße und Hausnummer angeben.'
  if (!form.postalCode.trim()) errors.postalCode = 'Bitte eine PLZ angeben.'
  if (!form.city.trim()) errors.city = 'Bitte einen Ort angeben.'
  if (!form.country.trim()) errors.country = 'Bitte ein Land angeben.'
  if (!form.shares || form.shares < 1 || !Number.isInteger(form.shares))
    errors.shares = 'Bitte eine positive ganze Zahl angeben.'

  if (!form.confirmInfo)
    errors.confirmInfo =
      'Bitte bestätige, dass du die Infos zur investierenden Mitgliedschaft gelesen hast.'
  if (!form.dataConsent)
    errors.dataConsent =
      'Bitte stimme der Verarbeitung deiner Daten zu, damit wir den Antrag bearbeiten können.'

  if (Object.keys(errors).length) {
    formError.value =
      'Bitte prüfe die markierten Felder und versuche es erneut.'
    return false
  }

  return true
}

function resetForm() {
  form.salutation = ''
  form.firstName = ''
  form.lastName = ''
  form.email = ''
  form.phone = ''
  form.street = ''
  form.postalCode = ''
  form.city = ''
  form.country = 'Deutschland'
  form.shares = null
  form.confirmInfo = false
  form.dataConsent = false
  form.newsletter = false
}

async function onSubmit() {
  successMessage.value = ''
  if (!validate()) return

  submitting.value = true

  try {
    await $fetch('/api/invest-application', {
      method: 'POST',
      body: form,
    })

    successMessage.value =
      'Vielen Dank für deinen Antrag. Wir melden uns, sobald wir deinen Antrag geprüft haben.'
    sessionStorage.removeItem(STORAGE_KEY)
    resetForm()
    showToast({
      style: 'success',
      message:
        'Dein Antrag wurde erfolgreich abgeschickt. Wir melden uns nach der Prüfung.',
    })
  } catch (error) {
    formError.value =
      'Etwas ist schiefgelaufen. Bitte versuche es später erneut oder kontaktiere uns direkt.'
    console.error(error)
    showToast({
      style: 'error',
      message:
        'Dein Antrag konnte nicht gesendet werden. Bitte versuche es später erneut.',
    })
  } finally {
    submitting.value = false
  }
}
</script>

<style lang="scss" scoped>
.default-container::before {
  background-image: url(/images/einhaus-landing-photo-06.jpg);
}

.intro h1 {
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  margin-bottom: 0.6rem;
}

.intro p {
  margin: 0.4rem 0;
  line-height: 1.6;
}

.hint {
  background: #f5f7fa;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-top: 0.6rem;
}

.alert {
  border-radius: 12px;
  padding: 0.85rem 1rem;
  margin: 1rem 0;
  border: 1px solid transparent;
}

.alert.success {
  background: #ecf8f0;
  border-color: #c3e7d2;
  color: #1c6b3f;
}

.alert.error {
  background: #fff4f0;
  border-color: #f3c7b8;
  color: #8c2f07;
}

.form {
  display: grid;
  gap: 2rem;
  margin-top: 1rem;
}

.form-section h2 {
  margin-bottom: 0.6rem;
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

.address-span {
  grid-column: span 2;

  @media screen and (max-width: 819px) {
    grid-column: span 1;
  }
}

.muted {
  color: #304559;
  font-weight: 500;
  margin: 0.3rem 0 0.6rem;
}

.hint-inline {
  margin: 0.3rem 0 0;
}

.checkbox-group {
  display: grid;
  gap: 0.8rem;
}

.checkbox {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem;
  align-items: flex-start;

  input {
    margin-top: 0.2rem;
  }

  span {
    line-height: 1.5;
  }
}

.checkbox-error {
  color: #8c2f07;
  margin-left: 1.6rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;

  .link.primary {
    opacity: 1;
  }
}

.submit-modal {
  .inner-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h1 {
      font-size: clamp(1.6rem, 4vw, 2.4rem);
      margin: 0;
      text-align: center;
      line-height: 1.3;
    }
  }
}

.asterisk-note {
  display: block;
  margin-top: 0.6rem;
  color: #304559;
}

.secure-note {
  margin: 0.2rem 0 0;
  color: #304559;
  font-weight: 600;
}
</style>
