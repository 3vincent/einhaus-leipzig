<script setup lang="ts">
import type { PayloadData } from '../server/api/send-mail.post'
import { sanitizer } from '~/util/sanitizer'

const payload = ref<PayloadData>({
  name: '',
  age: 0,
  email: '',
  message: '',
  gdpr: false,
})

const sendResponse = ref(0)
const clickedOnce = ref(false)
const envVar = useRuntimeConfig()
let redirectTimeout: ReturnType<typeof setTimeout> | undefined = undefined
const isTextAreaFocused = ref(false)
const showTooltipInElement = ref<'name' | 'email' | 'message' | 'gdpr' | null>(
  null
)

function onFocus() {
  if (showTooltipInElement.value !== null) showTooltipInElement.value = null
}

function onTextareaFocus() {
  onFocus()

  isTextAreaFocused.value = true
}

function onTextareaBlur() {
  isTextAreaFocused.value = false
}

async function handleSubmit() {
  if (!allFieldsValidated.value) {
    checkFormValidations()

    return
  }

  try {
    clickedOnce.value = true

    const sanitizedPayload = await sanitizer(payload.value)

    moveLoadingAnimationToCenter()

    const response: any = await $fetch('/api/send-mail', {
      method: 'POST',
      body: JSON.stringify(sanitizedPayload),
    })

    console.log(response)

    sendResponse.value =
      response.statusCode ?? response.error.value?.statusCode ?? 0

    if (sendResponse.value == 200) {
      payload.value = {
        name: '',
        age: 0,
        email: '',
        message: '',
        gdpr: false,
      }

      const router = useRouter()

      redirectTimeout = setTimeout(() => {
        router.push('/')
      }, 8000)
    }
  } catch (error) {
    console.log(error)
    sendResponse.value = 535
  }
}

function resetAutoRedirectTimer() {
  if (redirectTimeout) {
    clearTimeout(redirectTimeout)
  }
}

function copyToClipboard() {
  navigator.clipboard.writeText(payload.value.message)
}

function moveLoadingAnimationToCenter() {
  const loadingAnimationDiv = document.querySelector('#top-of-the-page')

  loadingAnimationDiv?.scrollIntoView({
    block: 'start',
  })
}

const checkFormValidations = () => {
  const formContainer = document.querySelector('.contact-container')

  formContainer?.scrollIntoView({
    block: 'start',
  })

  Object.keys(payload.value).forEach(item => {
    if (showTooltipInElement.value !== null) return

    if (item === 'name' && !isNameValidated.value) {
      showTooltipInElement.value = item
    }

    if (item === 'email' && !isEmailValidated.value) {
      showTooltipInElement.value = item
    }

    if (item === 'message' && !isMessageValidated.value) {
      showTooltipInElement.value = item
    }

    if (item === 'gdpr' && !payload.value.gdpr) {
      showTooltipInElement.value = item
    }
  })
}

const isNameValidated = computed(() => {
  if (payload.value.name.length >= 2) return true

  return false
})

const isMessageValidated = computed(() => {
  if (
    payload.value.message.length > 2 &&
    payload.value.message.length <= 4000
  ) {
    return true
  }

  return false
})

const isEmailValidated = computed(() => {
  if (
    [...payload.value.email.toLowerCase()].every(char =>
      'abcdefghijklmnopqrstuvwxyz0123456789.@+-_~'.includes(char)
    ) &&
    payload.value.email.length >= 5 &&
    payload.value.email.includes('@') &&
    payload.value.email.split('@')[1].split('.')[0] &&
    payload.value.email.split('@').length == 2 &&
    payload.value.email.split('@')[0].length > 0 &&
    payload.value.email.split('@')[1].includes('.') &&
    payload.value.email.slice(payload.value.email.lastIndexOf('.') + 1).length >
      0 &&
    !payload.value.email.split('@')[1].includes('_') &&
    !payload.value.email.split('@')[1].includes('~') &&
    payload.value.email.indexOf('..') == -1
  ) {
    return true
  }

  return false
})

const allFieldsValidated = computed(() => {
  if (
    isEmailValidated.value &&
    isNameValidated.value &&
    isMessageValidated.value &&
    payload.value.gdpr
  ) {
    return true
  }

  return false
})

onBeforeUnmount(() => {
  resetAutoRedirectTimer()
})
</script>

<template>
  <div id="top-of-the-page" class="contact-container">
    <h2>Kontaktformular</h2>
    <div class="contact-form-wrapper">
      <div class="form-container">
        <ClientOnly>
          <form
            name="contact"
            method="POST"
            @submit.prevent="handleSubmit"
            novalidate
          >
            <div class="input-container">
              <FormTooltip v-if="showTooltipInElement === 'name'" />

              <input
                required
                v-model="payload.name"
                v-bind:class="
                  isNameValidated
                    ? 'single-field-filled'
                    : payload.name
                      ? 'not-filled-field'
                      : ''
                "
                type="text"
                name="name"
                autocomplete="off"
                class="input-field"
                placeholder=" "
                @focus="onFocus"
              />
              <label for="name" class="input-label">Name</label>
            </div>

            <div class="input-container">
              <FormTooltip v-if="showTooltipInElement === 'email'" />

              <input
                required
                v-model="payload.email"
                v-bind:class="
                  isEmailValidated
                    ? 'single-field-filled'
                    : payload.email
                      ? 'not-filled-field'
                      : ''
                "
                type="email"
                name="email"
                autocomplete="off"
                class="input-field"
                placeholder=" "
                @focus="onFocus"
              />

              <label for="email" class="input-label"> Email Adresse</label>
            </div>

            <div class="input-container age">
              <input v-model="payload.age" name="age-field" tabindex="-1" />
              <label for="age-field" class="input-label"> Age field</label>
            </div>

            <div class="input-container">
              <FormTooltip v-if="showTooltipInElement === 'message'" />

              <textarea
                placeholder=" "
                required
                name="message"
                v-model="payload.message"
                v-bind:class="
                  isMessageValidated
                    ? 'single-field-filled'
                    : payload.message
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
                class="text-counter"
                :class="{
                  'warning-color': payload.message.length > 4000,
                }"
              >
                {{ 4000 - payload.message.length }}
              </span>
            </div>

            <div class="privacy-container">
              <FormTooltip v-if="showTooltipInElement === 'gdpr'" />

              <input
                required
                v-model="payload.gdpr"
                type="checkbox"
                id="privacy-agreement"
                name="scales"
                @focus="onFocus"
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
              <button type="submit" class="link primary">Senden</button>
            </p>
          </form>
        </ClientOnly>
      </div>

      <FullModal
        v-if="
          sendResponse !== 200 &&
          sendResponse !== 400 &&
          sendResponse !== 500 &&
          sendResponse !== 535 &&
          clickedOnce
        "
        :show="true"
      >
        <div class="message-response">
          <div class="inner-content">
            <h1>Deine Nachricht wird verschickt...</h1>

            <LoadingAnimation />
          </div>
        </div>
      </FullModal>

      <FullModal v-if="sendResponse === 200" :show="true">
        <div class="message-response">
          <div class="inner-content">
            <h1>Deine Nachricht wurde gesendet</h1>
            <hr />
            <p>Du wirst gleich zur Startseite weitergeleitet</p>

            <WaitingAnimation />
          </div>
        </div>
      </FullModal>

      <FullModal
        v-if="
          sendResponse === 500 || sendResponse === 400 || sendResponse === 535
        "
        :show="true"
      >
        <div class="message-response">
          <div class="inner-content error">
            <p class="error-color">
              Leider ist beim Versand deiner Nachricht ein Fehler aufgetreten 😓
            </p>
            <p>
              Das tut uns leid. Während wir den Fehler in unserem System
              beheben, schick uns gern eine Email an
              {{ envVar?.public.OFFICIAL_CONTACT_ADDRESS }} oder probiere es
              später erneut.
            </p>
            <div>
              <p>Deine Nachricht kannst du hier einsehen und kopieren:</p>
              <div class="message-copy-field">
                <p>
                  {{ payload.message }}
                </p>
              </div>
              <a
                href="#"
                rel="nofollow"
                v-on:click.prevent="copyToClipboard"
                class="link secondary small"
                >Nachricht in die Zwischenablage kopieren</a
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
        border: 2px solid #d8dcee;
        border-radius: 6px;
        outline: none;
        font-size: 16px;
        // box-shadow: 0px 4px 10px 0px #0000000d inset;
        min-height: 50px;

        &:focus-visible {
          border-color: var(--main-text-color-dark);
        }
      }

      .text-counter {
        position: absolute;
        bottom: 4px;
        right: 4px;
        color: #b8b8b8cc;
      }

      .input-label {
        position: absolute;
        top: 14px;
        left: 10px;
        color: #999;
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
          color: var(--main-text-color-dark);
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
        color: #b9b9b9;
        font-size: 11px;
        padding: 0 3px;
        line-height: 1;
      }

      .input-field:focus + .input-label {
        color: var(--main-text-color-dark);
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
.contact-container {
  padding-top: 3rem;
}

.contact-form-wrapper {
  position: relative;
}

button {
  min-width: 15rem;
  color: var(--main-text-color-dark);
  transition:
    border 0.3s ease,
    background-color 0.3s ease;

  &.all-field-filled {
    background-color: var(--pretty-green);
    color: white;
    transition: background-color 0.3s ease;
  }
}

.message-response {
  .inner-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 3rem;
      color: var(--pretty-green);
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
        color: var(--warning-severe);
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
    border: 2px solid var(--main-text-color-dark);
    border-radius: 0.3rem;
    background-color: rgba(240, 240, 240, 1);
    overflow: scroll;
    overflow-wrap: break-word;
    padding: 0.5rem;

    @media screen and (min-width: $_md) {
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
  border: 2px solid #555555;
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
  top: px;
  left: 6px;
}

.single-field-filled {
  // box-shadow: inset 0 0 0 2px var(--pretty-green) !important;
  border-color: var(--pretty-green) !important;
  border-width: 2px !important;
}

// .all-field-filled {
//   border-color: var(--pretty-green) !important;
//   border-width: 2px;
// }

.not-filled-field {
  // box-shadow: inset 0 0 0 2px var(--warning);
  border-color: var(--warning) !important;
}

// .not-filled-fields {
//   border-color: var(--warning) !important;
//   cursor: not-allowed;
// }

.text-counter {
  color: var(--main-text-color-light-light);
}

.warning-color {
  color: var(--warning) !important;
}

.age,
.age label,
.input-container.age,
.age label input {
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
