<script lang="ts">
export default {
  name: 'ContactForm',

  data() {
    return {
      name: '',
      age: 0,
      email: '',
      message: '',
      gdpr: false,
      sendResponse: 0,
    }
  },

  methods: {
    async handleSubmit() {
      try {
        const data = await $fetch('/api/send-mail', {
          method: 'POST',
          body: {
            name: this.name,
            email: this.email,
            message: this.message,
            gdpr: this.gdpr,
            age: this.age,
          },
        })

        console.log(data)
        this.sendResponse = data.statusCode
      } catch (error) {
        console.log(error)
      }

      if (this.sendResponse == 200) {
        this.name = ''
        this.email = ''
        this.message = ''
        this.gdpr = false
        this.age = 0
      }
    },

    copyToClipboard() {
      navigator.clipboard.writeText(this.message)
    },
  },

  computed: {
    validateInputs() {
      if (
        this.name.length >= 2 &&
        this.email.includes('@') &&
        this.email.slice(0, this.email.indexOf('@')).length > 0 &&
        this.email.slice(this.email.indexOf('@')).includes('.') &&
        this.email.length >= 5 &&
        this.message.length > 2 &&
        this.message.length <= 4000 &&
        this.gdpr
      ) {
        return true
      }

      return false
    },
  },
}
</script>

<template>
  <div class="contact-container">
    <h2>Kontaktformular</h2>
    <div class="contact-form-wrapper">
      <div class="form-wrapper">
        <form name="contact" method="POST" @submit.prevent="handleSubmit">
          <p>
            <label
              >Name:
              <input
                required
                v-model="name"
                v-bind:class="
                  name && name.length >= 2 ? 'single-field-filled' : ''
                "
                type="text"
                name="fullname"
                autocomplete="off"
            /></label>
          </p>
          <p>
            <label
              >Email Adresse:
              <input
                required
                v-model="email"
                v-bind:class="
                  email.includes('@') &&
                  email.slice(0, email.indexOf('@')).length > 0 &&
                  email.slice(email.indexOf('@')).includes('.') &&
                  email.length >= 5
                    ? 'single-field-filled'
                    : ''
                "
                type="email"
                name="email"
                autocomplete="off"
            /></label>
          </p>
          <p class="age">
            <label>
              Age field:
              <input v-model="age" name="age-field" tabindex="-1" />
            </label>
          </p>
          <p>
            <label
              >Nachricht:
              <textarea
                required
                v-model="message"
                name="message"
                v-bind:class="
                  message.length > 2 && message.length <= 4000
                    ? 'single-field-filled'
                    : ''
                "
              ></textarea>
            </label>
          </p>
          <p>
            <input
              required
              v-model="gdpr"
              type="checkbox"
              id="privacy-agreement"
              name="scales"
            />
            <label for="privacy-agreement" class="privacy-label"
              ><span
                >Hiermit bestätige ich, dass ich die
                <a href="/datenschutz" target="_blank">Datenschutzerklärung</a>
                gelesen habe und der Verarbeitung meiner Daten zustimme.</span
              ></label
            >
          </p>
          <p>
            <button
              type="submit"
              class="link secondary"
              :disabled="!validateInputs"
              v-bind:class="
                validateInputs ? 'all-field-filled' : 'not-filled-fields'
              "
              >Senden</button
            >
          </p>
        </form>
      </div>

      <div v-if="sendResponse === 200" class="message-response">
        <div class="inner-content">
          <h1>Nachricht wurde gesendet</h1>
        </div>
      </div>

      <div
        v-if="sendResponse === 500 || sendResponse === 400"
        class="message-response"
      >
        <div class="inner-content error">
          <h2>
            Leider ist beim Versand deiner Nachricht ein Fehler aufgetreten. Das
            tut uns leid. Während wir den Fehler in unserem System beheben,
            schick uns gern eine Email an info@einhaus-leipzig.de oder probiere
            es später erneut.
          </h2>
          <div>
            <h2>Deine Nachricht kannst du hier einsehen und kopieren:</h2>
            <div class="message-copy-field"> {{ message }}</div>
            <a v-on:click.prevent="copyToClipboard" class="link primary small"
              >Nachricht in die Zwischenablage kopieren</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contact-container {
  padding-top: 3rem;
}

.contact-form-wrapper {
  position: relative;
}

.form-wrapper {
  z-index: 1;
}

.message-response {
  position: absolute;
  width: 102%;
  border: none;
  outline: none;
  margin-left: -1%;
  inset: 0;
  background: rgba(244, 244, 244, 0.7);
  backdrop-filter: blur(3px);
  z-index: 20;
  box-shadow: 0 0 10px 10px rgba(243, 243, 243, 0.7);

  .inner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    h1 {
      font-size: 3rem;
      color: var(--pretty-green);
      text-align: center;
    }
  }

  .inner-content.error {
    display: flex;
    flex-flow: column;
    height: 100%;
    width: 96%;

    h2 {
      color: var(--warning-severe);
    }
  }

  .inner-content.error .message-copy-field {
    flex: 1 1 auto;
    height: max-content;
    max-height: 100px;
    border: 2px solid var(--main-text-color-dark);
    border-radius: 0.3rem;
    background-color: rgba(240, 240, 240, 1);
    overflow: scroll;
    padding: 0.5rem;

    @media screen and (min-width: $_md) {
      height: max-content;
      max-height: 200px;
    }
  }
}

.age,
.age label,
.age label input {
  height: 1px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  transform: translateX(-10000000px);
}

label input,
label textarea {
  display: block;
  width: 100%;
  max-width: 400px;
  max-height: 250px;
  min-height: 50px;
  padding: 1rem;
  font-size: 1.2rem;
  border-radius: 0.3rem;
  border: none;
  outline: none !important;
  box-shadow: inset 0 0 0 2px var(--main-text-color-light-light);
  -webkit-appearance: none;

  @media screen and (min-width: $_md) {
    min-width: 50%;
    max-width: 500px;
    // min-width: 400px;
  }

  &:focus {
    background-color: var(--background-light-grey);
    box-shadow: inset 0 0 0 2px var(--warning);
  }
}

label.privacy-label {
  line-height: 1.2rem;
}

label textarea {
  min-height: 10rem;
  max-width: 500px;
  font-family: inherit;
}

input[type='checkbox'] {
  position: relative;
  cursor: pointer;
  margin-right: 1rem;
  float: left;
}

input[type='checkbox']:before {
  content: '';
  display: block;
  position: absolute;
  width: 16px;
  height: 16px;
  top: 0;
  left: 0;
  border: 2px solid #555555;
  border-radius: 3px;
  background-color: white;
}

input[type='checkbox']:checked:after {
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
  top: 2px;
  left: 6px;
}

label span {
  display: inline-block;
  max-width: 70%;
}

button {
  min-width: 15rem;
  color: var(--main-text-color-dark);
  transition: border 1s ease;
}

.single-field-filled {
  box-shadow: inset 0 0 0 2px var(--pretty-green) !important;
}

.all-field-filled {
  border-color: var(--pretty-green) !important;
}

.not-filled-fields {
  border-color: var(--warning) !important;
  cursor: not-allowed;
}
</style>
