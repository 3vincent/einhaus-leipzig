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

        this.name = ''
        this.email = ''
        this.message = ''
        this.gdpr = false
        this.age = 0

        console.log(data)
        this.sendResponse = data.statusCode
      } catch (error) {
        console.log(error)
      }
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
          <p class="hidden">
            <label>
              Don't fill this out if you're human:
              <input v-model="age" name="age-field" />
            </label>
          </p>
          <p>
            <label
              >Name:
              <input
                required
                v-model="name"
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
                type="email"
                name="email"
                autocomplete="off"
            /></label>
          </p>
          <p>
            <label
              >Nachricht:
              <textarea required v-model="message" name="message"></textarea>
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
              :disabled="!email || !name || !gdpr || !message"
              v-bind:class="
                !email || !name || !gdpr || !message
                  ? 'not-filled-fields'
                  : 'all-field-filled'
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
        v-if="sendResponse === 500 || sendResponse === 422"
        class="message-response"
      >
        <div class="inner-content error">
          <h1>
            Es ist ein Fehler aufgetreten. Bitte probiere es später erneut oder
            schreib uns eine Email.
          </h1>
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
  width: 100%;
  border: none;
  outline: none;
  margin-left: -5px;
  inset: 0;
  background: rgba(209, 209, 209, 0.4);
  backdrop-filter: blur(2px);
  z-index: 20;
  box-shadow: 0 0 10px 10px rgba(209, 209, 209, 0.4);

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
    h1 {
      color: var(--warning);
    }
  }
}

.hidden {
  display: none;
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
    box-shadow: inset 0 0 0 2px var(--pretty-green);
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

.all-field-filled {
  border-color: var(--pretty-green) !important;
}

.not-filled-fields {
  border-color: var(--warning) !important;
  cursor: not-allowed;
}
</style>
