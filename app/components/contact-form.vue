<script setup lang="ts">
import type { ContactFormField } from '~~/shared/types/contact'
import { CONTACT_MESSAGE_MAX_LENGTH } from '~~/shared/validation/contact'
import { useContactForm } from '../composables/useContactForm'

const { isReady, isSubmitting, payload, sendResponse, submit, validation } =
  useContactForm()
const { showToast } = useToast()
const envVar = useRuntimeConfig()
const isTextAreaFocused = ref(false)
const showTooltipInElement = ref<ContactFormField | null>(null)
const contactContainer = ref<HTMLElement | null>(null)
const nameInput = ref<HTMLInputElement | null>(null)
const emailInput = ref<HTMLInputElement | null>(null)
const messageInput = ref<HTMLTextAreaElement | null>(null)
const gdprInput = ref<HTMLInputElement | null>(null)

const fieldElements: Record<
  ContactFormField,
  Ref<HTMLInputElement | HTMLTextAreaElement | null>
> = {
  name: nameInput,
  email: emailInput,
  message: messageInput,
  gdpr: gdprInput,
}

function onTextareaFocus() {
  isTextAreaFocused.value = true
}

function onTextareaBlur() {
  isTextAreaFocused.value = false
}

watch(
  () => validation.value.fields,
  fields => {
    const visibleTooltip = showTooltipInElement.value

    if (visibleTooltip && fields[visibleTooltip]) {
      showTooltipInElement.value = null
    }
  },
  { deep: true }
)

async function handleSubmit() {
  if (!validation.value.valid) {
    checkFormValidations()

    showToast({
      message: 'Bitte Pflichtfelder ausfüllen',
    })

    return
  }

  contactContainer.value?.scrollIntoView({ block: 'start' })
  await submit()
}

async function copyToClipboard() {
  await navigator.clipboard.writeText(payload.value.message)
}

const checkFormValidations = () => {
  const invalidField = validation.value.firstInvalidField

  showTooltipInElement.value = invalidField

  nextTick(() => {
    if (!invalidField) return

    const element = fieldElements[invalidField].value
    element?.focus({ preventScroll: true })
    element?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    })
  })
}
</script>

<template>
  <div id="top-of-the-page" ref="contactContainer" class="contact-container">
    <h2>Kontaktformular</h2>
    <div class="contact-form-wrapper">
      <div v-if="isReady" class="form-container">
        <ClientOnly>
          <form
            name="contact"
            method="POST"
            novalidate
            @submit.prevent="handleSubmit"
          >
            <div class="input-container">
              <FormTooltip v-if="showTooltipInElement === 'name'" />

              <input
                id="name"
                ref="nameInput"
                v-model="payload.name"
                required
                :class="
                  payload.name && !validation.fields.name
                    ? 'not-filled-field'
                    : ''
                "
                type="text"
                name="name"
                autocomplete="off"
                class="input-field"
                placeholder=" "
              />
              <label for="name" class="input-label">Name</label>
            </div>

            <div class="input-container">
              <FormTooltip v-if="showTooltipInElement === 'email'" />

              <input
                id="email"
                ref="emailInput"
                v-model="payload.email"
                required
                :class="
                  payload.email && !validation.fields.email
                    ? 'not-filled-field'
                    : ''
                "
                type="email"
                name="email"
                autocomplete="off"
                class="input-field"
                placeholder=" "
              />

              <label for="email" class="input-label"> Email Adresse</label>
            </div>

            <div class="input-container contact-check" aria-hidden="true">
              <input
                v-model="payload.companyWebsite"
                name="company-website"
                tabindex="-1"
                autocomplete="off"
              />
              <label for="company-website" class="input-label">Website</label>
            </div>

            <div class="input-container">
              <FormTooltip v-if="showTooltipInElement === 'message'" />

              <textarea
                id="message"
                ref="messageInput"
                v-model="payload.message"
                placeholder=" "
                required
                name="message"
                :class="
                  payload.message && !validation.fields.message
                    ? 'not-filled-field'
                    : ''
                "
                class="input-field"
                rows="4"
                cols="60"
                @focus="onTextareaFocus"
                @blur="onTextareaBlur"
              >
              </textarea>
              <label
                for="message"
                class="input-label"
                :class="{
                  active: isTextAreaFocused || payload.message.length > 0,
                }"
                >Nachricht</label
              >
              <span
                v-if="payload.message.length >= 3500"
                class="text-counter"
                :class="{
                  'warning-color':
                    payload.message.length > CONTACT_MESSAGE_MAX_LENGTH,
                }"
              >
                {{ CONTACT_MESSAGE_MAX_LENGTH - payload.message.length }}
              </span>
            </div>

            <div class="privacy-container">
              <FormTooltip v-if="showTooltipInElement === 'gdpr'" />

              <input
                id="privacy-agreement"
                ref="gdprInput"
                v-model="payload.gdpr"
                required
                type="checkbox"
                name="scales"
              />
              <label for="privacy-agreement" class="privacy-label">
                <span>
                  Hiermit bestätige ich, dass ich die
                  <a href="/datenschutz" target="_blank"
                    >Datenschutzerklärung</a
                  >
                  gelesen habe und der Verarbeitung meiner Daten zustimme.
                </span>
              </label>
            </div>

            <p>
              <button
                type="submit"
                class="link primary submit-button"
                :disabled="isSubmitting"
              >
                <span
                  v-if="isSubmitting"
                  class="button-spinner"
                  aria-hidden="true"
                ></span>
                {{ isSubmitting ? 'Wird gesendet …' : 'Senden' }}
              </button>
            </p>
          </form>
        </ClientOnly>
      </div>
      <div v-else class="form-container skeleton">
        <div class="input-container">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
        </div>
        <div class="input-container">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
        </div>
        <div class="input-container">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line tall"></div>
        </div>
        <div class="privacy-container">
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
        </div>
        <p>
          <button type="button" class="link primary" disabled>Laden…</button>
        </p>
      </div>

      <FullModal v-if="isSubmitting" :show="true" label="Versandstatus">
        <div class="message-response">
          <div class="inner-content">
            <h1>Deine Nachricht wird verschickt...</h1>

            <LoadingAnimation />
          </div>
        </div>
      </FullModal>

      <FullModal
        v-if="sendResponse === 200"
        :show="true"
        label="Nachricht gesendet"
      >
        <div class="message-response">
          <div class="inner-content">
            <h1>Deine Nachricht wurde gesendet</h1>
            <hr />
            <p>Du kannst jetzt zur Startseite zurückkehren.</p>
            <NuxtLink to="/" class="link primary small"
              >Zur Startseite</NuxtLink
            >
          </div>
        </div>
      </FullModal>

      <FullModal
        v-if="
          sendResponse === 500 || sendResponse === 400 || sendResponse === 535
        "
        :show="true"
        label="Fehler beim Nachrichtenversand"
      >
        <div class="message-response">
          <div class="inner-content error">
            <p class="error-color">
              Leider ist beim Versand deiner Nachricht ein Fehler aufgetreten 😓
            </p>
            <p>
              Das tut uns leid. Während wir den Fehler in unserem System
              beheben, schick uns gern eine Email an
              {{ envVar?.public.DISPLAY_OFFICIAL_CONTACT_ADDRESS }} oder
              probiere es später erneut.
            </p>
            <div>
              <p>Deine Nachricht kannst du hier einsehen und kopieren:</p>
              <div class="message-copy-field">
                <p>
                  {{ payload.message }}
                </p>
              </div>
              <button
                type="button"
                class="link secondary small"
                @click="copyToClipboard"
                >Nachricht in die Zwischenablage kopieren</button
              >

              <NuxtLink to="/" class="link primary small"
                >Zur Startseite</NuxtLink
              >
            </div>
          </div>
        </div>
      </FullModal>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-container {
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 12px;

  form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    div:not(.input-container) {
      display: flex;
      gap: 8px;
      justify-content: space-between;
      align-items: center;
    }

    .input-container {
      position: relative;
      flex: 1 1 100%;
      display: flex;
      justify-content: space-between;
      max-width: 500px;
      min-width: 50%;

      textarea {
        height: 200px;
      }

      &.radio {
        justify-content: flex-start !important;

        > div {
          justify-content: flex-start !important;
          min-width: 120px;
        }
      }

      .input-field {
        width: 100%;
        padding: 10px;
        border: 1px solid var(--color-border);
        border-radius: 6px;
        outline: none;
        font-size: 16px;
        // box-shadow: 0px 4px 10px 0px #0000000d inset;
        min-height: 50px;

        &:focus-visible {
          border-color: var(--color-brand);
          box-shadow: 0 0 0 3px var(--color-focus-ring);
        }
      }

      .text-counter {
        position: absolute;
        bottom: 4px;
        right: 4px;
        color: var(--color-text-subtle);
      }

      .input-label {
        position: absolute;
        top: 14px;
        left: 10px;
        color: var(--color-text-subtle);
        pointer-events: none;
        transition:
          all 0.3s ease,
          font-size 0.3s ease;

        &.active {
          transform: translate(-6px, -20px);
          // background: linear-gradient(
          //   180deg,
          //   #ffffff 16.24%,
          //   #f5f5f5 69.11%,
          //   rgba(255, 255, 255, 0) 100%
          // );
          color: var(--color-text);
          font-size: 11px;
          padding: 0 3px;
          line-height: 1;
        }
      }

      .input-field:focus + .input-label,
      .input-field:not(:placeholder-shown) + .input-label {
        transform: translate(-6px, -20px);
        // background: linear-gradient(
        //   180deg,
        //   #ffffff 16.24%,
        //   #f5f5f5 69.11%,
        //   rgba(255, 255, 255, 0) 100%
        // );
        background-color: white;
        color: var(--color-text-subtle);
        font-size: 11px;
        padding: 0 3px;
        line-height: 1;
      }

      .input-field:focus + .input-label {
        color: var(--color-text);
      }

      input[type='radio'] {
        width: 28px;
        height: 28px;
      }

      .description-text {
        font-weight: 800;
      }
    }
  }
}

.submit-button {
  display: inline-flex;
  gap: 0.65rem;
  align-items: center;
  justify-content: center;

  &:disabled {
    cursor: wait;
    opacity: 0.72;
  }
}

.button-spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.45);
  border-top-color: white;
  border-radius: 50%;
  animation: button-spin 0.8s linear infinite;
}

@keyframes button-spin {
  to {
    transform: rotate(360deg);
  }
}

.skeleton {
  .skeleton-line {
    width: 100%;
    height: 14px;
    background: linear-gradient(90deg, #f0f2f6 0%, #e8ebf2 50%, #f0f2f6 100%);
    background-size: 200% 100%;
    border-radius: 6px;
    animation: shimmer 1.2s ease-in-out infinite;

    &.short {
      width: 120px;
      margin-bottom: 6px;
    }

    &.tall {
      height: 120px;
    }
  }

  .privacy-container {
    align-items: flex-start;
    gap: 0.5rem;
  }
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
.contact-container {
  padding-top: 3rem;
}

.contact-form-wrapper {
  position: relative;
}

button {
  color: var(--color-text);
}

.message-response {
  .inner-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 3rem;
      color: var(--color-success-strong);
      text-align: center;
      line-height: 1.2;
      font-weight: 400;
    }

    p {
      text-align: center;
    }
  }

  .inner-content.error {
    height: 100%;
    width: 96%;
    align-items: flex-start;

    p {
      font-size: 1.4rem;
      line-height: 1.6;
      font-weight: 400;

      &.error-color {
        color: var(--color-danger-strong);
      }
    }

    p {
      text-align: left;
    }
  }

  .inner-content.error .message-copy-field {
    height: max-content;
    max-height: 100px;
    width: 80vw;
    max-width: 780px;
    border: 1px solid var(--color-border-strong);
    border-radius: 0.3rem;
    background-color: var(--color-surface-soft);
    overflow: scroll;
    overflow-wrap: break-word;
    padding: 0.5rem;

    @media screen and (min-width: $md) {
      height: max-content;
      max-height: 200px;
    }

    p {
      margin: 0;
      padding: 0;
      margin-right: 1rem;
    }
  }
}

input[type='checkbox'] {
  position: relative;
  cursor: pointer;
  margin-right: 1rem;
  float: left;
}

input[type='checkbox']::before {
  content: '';
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: -2px;
  left: 0;
  border: 2px solid var(--color-text-muted);
  border-radius: 3px;
  background-color: white;
}

input[type='checkbox']:checked::after {
  content: '';
  display: block;
  width: 5px;
  height: 10px;
  border: solid black;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  position: absolute;
  top: 0px;
  left: 6px;
}

.not-filled-field {
  border-color: var(--color-warning) !important;
}

.text-counter {
  color: var(--color-text-subtle);
}

.warning-color {
  color: var(--color-warning) !important;
}

.contact-check,
.contact-check label,
.input-container.contact-check,
.contact-check label input {
  clip: rect(0 0 0 0) !important;
  clip-path: inset(50%) !important;
  height: 1px;
  overflow: hidden;
  position: absolute !important;
  white-space: nowrap;
  width: 1px;
  display: block;
  flex: 0 0 0 !important;
}

.privacy-container {
  display: flex;
  gap: 8px;
  justify-content: space-between;
  align-items: center;
  min-width: 50%;
  max-width: 500px;
}
</style>
