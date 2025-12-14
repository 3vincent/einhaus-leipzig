<template>
  <div v-if="hydrated" class="content">
    <h1>Online-Beitritt – Schritt 3 von 3</h1>
    <p>Prüfe deine Angaben und sende den Antrag ab.</p>

    <div v-if="errorMessage" class="alert error" role="alert">
      {{ errorMessage }}
    </div>

    <div v-if="success" class="alert success" role="status">
      <h3>Vielen Dank!</h3>
      <p>Wir haben deinen Antrag erhalten und melden uns nach der Prüfung.</p>
      <div class="actions">
        <NuxtLink class="link primary" to="/mitglied-werden">
          Zurück zur Mitglied-werden-Seite
        </NuxtLink>
      </div>
    </div>

    <div v-else class="review-grid">
      <section class="review-card">
        <div class="card-header">
          <h3>Persönliche Daten</h3>
          <button
            class="link secondary small icon-btn"
            type="button"
            aria-label="Persönliche Daten bearbeiten"
            @click="editStep(0)"
          >
            <Icon name="uil:edit" style="color: black" />
          </button>
        </div>
        <div class="review-row">
          <div class="col label">Anrede</div>
          <div class="col value">{{ payload.salutation || '—' }}</div>
        </div>
        <div class="review-row">
          <div class="col label">Vorname</div>
          <div class="col value">{{ payload.firstName }}</div>
        </div>
        <div class="review-row">
          <div class="col label">Nachname</div>
          <div class="col value">{{ payload.lastName }}</div>
        </div>
        <div class="review-row">
          <div class="col label">E-Mail</div>
          <div class="col value">{{ payload.email }}</div>
        </div>
        <div class="review-row">
          <div class="col label">Telefon</div>
          <div class="col value">{{ payload.phone || '—' }}</div>
        </div>
        <div class="review-row">
          <div class="col label">Geburtsdatum</div>
          <div class="col value">{{ payload.birthDate || '—' }}</div>
        </div>
        <div class="review-row">
          <div class="col label">Steuer-ID</div>
          <div class="col value">{{ payload.taxId || '—' }}</div>
        </div>
        <div class="review-row">
          <div class="col label">Anzahl Geschäftsanteile</div>
          <div class="col value">{{ payload.shares }}</div>
        </div>
      </section>

      <section class="review-card">
        <div class="card-header">
          <h3>Adresse</h3>
          <button
            class="link secondary small icon-btn"
            type="button"
            aria-label="Adresse & Anteile bearbeiten"
            @click="editStep(0)"
          >
            <Icon name="uil:edit" style="color: black" />
          </button>
        </div>
        <div class="review-row">
          <div class="col label">Straße</div>
          <div class="col value">{{ payload.street }}</div>
        </div>
        <div class="review-row">
          <div class="col label">PLZ / Ort</div>
          <div class="col value"
            >{{ payload.postalCode }} {{ payload.city }}</div
          >
        </div>
        <div class="review-row">
          <div class="col label">Land</div>
          <div class="col value">{{ payload.country }}</div>
        </div>
      </section>

      <section class="review-card">
        <div class="card-header">
          <h3>Bankverbindung</h3>
          <button
            class="link secondary small icon-btn"
            type="button"
            aria-label="Bankverbindung bearbeiten"
            @click="editStep(1)"
          >
            <Icon name="uil:edit" style="color: black" />
          </button>
        </div>
        <div class="review-row">
          <div class="col label">Kontoinhaber:in</div>
          <div class="col value">{{ payload.accountHolder }}</div>
        </div>
        <div class="review-row">
          <div class="col label">IBAN</div>
          <div class="col value">{{ payload.iban }}</div>
        </div>
        <div class="review-row">
          <div class="col label">BIC</div>
          <div class="col value">{{ payload.bic || '—' }}</div>
        </div>
      </section>

      <section class="review-card text-area-card">
        <div class="card-header">
          <div>
            <h3>Kommentar / Nachricht</h3>
            <div class="col label">(Optional)</div>
          </div>
        </div>
        <div class="review-row">
          <div class="col value full-width">
            <textarea
              v-model="payload.comment"
              rows="4"
              maxlength="2500"
              placeholder="Deine Nachricht an uns (max. 2500 Zeichen)"
            ></textarea>
            <div class="char-counter muted">
              Noch {{ remainingCommentChars }} Zeichen
            </div>
          </div>
        </div>
      </section>
    </div>
    <div v-if="!success" class="consent-block">
      <label class="checkbox" :class="{ error: errors.confirmInfo }">
        <input
          id="confirmInfo"
          v-model="payload.confirmInfo"
          type="checkbox"
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
          v-model="payload.dataConsent"
          type="checkbox"
          :aria-invalid="!!errors.dataConsent"
        />
        <span>
          Ich bin damit einverstanden, dass meine Daten zum Zweck der
          Bearbeitung meines Mitgliedschaftsantrags gespeichert und verarbeitet
          werden. *
        </span>
      </label>
      <small v-if="errors.dataConsent" class="checkbox-error">
        {{ errors.dataConsent }}
      </small>

      <label class="checkbox">
        <input id="newsletter" v-model="payload.newsletter" type="checkbox" />
        <span>
          Ich möchte per E-Mail über den weiteren Projektfortschritt informiert
          werden. (optional)
        </span>
      </label>
    </div>

    <div v-if="!success" class="actions">
      <NuxtLink
        class="link secondary"
        to="/mitglied-werden/online-formular/bankverbindung"
      >
        Zurück
      </NuxtLink>
      <button
        class="link primary"
        type="button"
        :disabled="submitting"
        @click="onSubmit"
      >
        {{ submitting ? 'Wird gesendet…' : 'Antrag absenden' }}
      </button>
    </div>

    <p v-if="!success" class="secure-note">
      <Icon name="uil:lock" style="color: black" />
      Ihre Angaben werden sicher übertragen (SSL-verschlüsselt).
    </p>
  </div>
</template>

<script setup lang="ts">
import { useInvestApplicationStore } from '~/stores/investApplication'

definePageMeta({
  layout: 'invest-wizard',
})

useHead({
  title: 'Online-Beitritt – Schritt 3 von 3',
})

const store = useInvestApplicationStore()
const router = useRouter()
const payload = store.payload
const errors = reactive<{ confirmInfo?: string; dataConsent?: string }>({})
const success = ref(false)
const submitting = ref(false)
const errorMessage = ref('')
const { showToast } = useToast()
const hydrated = ref(false)
const maxCommentLength = 2500

// Session-Daten früh laden, damit ein Reload die Eingaben behält
if (import.meta.client) {
  store.loadFromSession()
}

onMounted(() => {
  if (!store.isStep1Valid) {
    router.push('/mitglied-werden/online-formular/persoenliche-daten')
    return
  }
  if (!store.isStep2Valid) {
    router.push('/mitglied-werden/online-formular/bankverbindung')
    return
  }
  store.currentStep = 2
  hydrated.value = true
})

const remainingCommentChars = computed(() => {
  const len = payload.comment ? payload.comment.length : 0
  return Math.max(0, maxCommentLength - len)
})

function editStep(stepIndex: number) {
  if (stepIndex === 0)
    router.push('/mitglied-werden/online-formular/persoenliche-daten')
  if (stepIndex === 1)
    router.push('/mitglied-werden/online-formular/bankverbindung')
  store.currentStep = stepIndex
}

function validateConsents() {
  errors.confirmInfo = undefined
  errors.dataConsent = undefined

  if (!payload.confirmInfo)
    errors.confirmInfo =
      'Bitte bestätige, dass du die Infos zur investierenden Mitgliedschaft gelesen hast.'
  if (!payload.dataConsent)
    errors.dataConsent =
      'Bitte stimme der Verarbeitung deiner Daten zu, damit wir den Antrag bearbeiten können.'

  if (errors.confirmInfo || errors.dataConsent) {
    return false
  }
  return true
}

async function onSubmit() {
  if (!validateConsents()) return
  submitting.value = true
  errorMessage.value = ''
  try {
    const body = {
      ...payload,
      birthDate: normalizeBirthDate(payload.birthDate || ''),
    }

    await $fetch('/api/invest-application', {
      method: 'POST',
      body,
    })
    success.value = true
    store.reset()
    showToast({
      style: 'success',
      message: 'Dein Antrag wurde erfolgreich abgeschickt.',
    })
  } catch (error) {
    errorMessage.value =
      'Dein Antrag konnte nicht gesendet werden. Bitte versuche es später erneut oder kontaktiere uns direkt.'
    console.error(error)
    showToast({
      style: 'error',
      message: 'Senden fehlgeschlagen. Bitte versuche es später erneut.',
    })
  } finally {
    submitting.value = false
  }
}

function normalizeBirthDate(value: string) {
  if (!value) return ''
  const trimmed = value.trim()
  const isoLike = /^\d{4}-\d{2}-\d{2}$/
  if (isoLike.test(trimmed)) return trimmed
  const parsed = new Date(trimmed)
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10)
  return trimmed
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

.alert {
  border-radius: 10px;
  padding: 0.8rem 1rem;
  margin-bottom: 1rem;
}

.alert.error {
  background: #fff4f0;
  border: 1px solid #f3c7b8;
  color: #8c2f07;
}

.alert.success {
  background: #ecf8f0;
  border: 1px solid #c3e7d2;
  color: #1c6b3f;
}

.review-grid {
  display: grid;
  gap: 3rem;
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.review-card {
  display: grid;
  gap: 0.5rem;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.review-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.04);

  &:last-of-type {
    border-bottom: none;
  }
}

.review-row .label {
  font-weight: 700;
  color: #304559;
  flex: 0 0 35%;
  min-width: 140px;
}

.review-row .value {
  color: #0f2635;
  flex: 1 1 240px;
}

.review-row .full-width {
  flex: 1 1 100%;
}

.review-row textarea {
  width: 100%;
  min-height: 240px;
  padding: 0.65rem 0.75rem;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  font-size: 1rem;
  background: #fff;
  resize: vertical;
}

.char-counter {
  margin-top: 0.35rem;
  font-size: 0.95rem;
}

.icon {
  width: 18px;
  height: 18px;
}

.checkbox {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.6rem;
  align-items: flex-start;
  margin: 0.5rem 0;

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

.consent-block {
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  flex-wrap: wrap;
}

.icon-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 0 !important;
  background: none !important;
  font-size: 1.4rem;
  margin: 0;
  min-width: unset;
  transition: transform 150ms ease;

  &:hover {
    box-shadow: none;
    transform: scale(1.1);
  }
}

.secure-note {
  margin-top: 0.8rem;
  color: #304559;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 1rem;
}

.icon-lock {
  width: 18px;
  height: 18px;
  fill: currentColor;
}

.text-area-card {
  padding-bottom: 4rem;

  .card-header {
    div {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  }
}
</style>
