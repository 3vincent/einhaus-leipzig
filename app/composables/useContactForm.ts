import type {
  ContactFormPayload,
  ContactFormResponse,
} from '~~/shared/types/contact'
import { validateContactForm } from '~~/shared/validation/contact'

const STORAGE_KEY = 'einhaus-contact-form'

function createEmptyPayload(): ContactFormPayload {
  return {
    name: '',
    email: '',
    message: '',
    gdpr: false,
    companyWebsite: '',
    formStartedAt: Date.now(),
  }
}

export function useContactForm() {
  const payload = ref<ContactFormPayload>(createEmptyPayload())
  const sendResponse = ref(0)
  const isSubmitting = ref(false)
  const isReady = ref(false)
  const validation = computed(() => validateContactForm(payload.value))
  const { showToast } = useToast()

  onMounted(() => {
    const saved = sessionStorage.getItem(STORAGE_KEY)

    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Partial<ContactFormPayload>
        payload.value = { ...payload.value, ...parsed }
      } catch {
        sessionStorage.removeItem(STORAGE_KEY)
      }
    }

    payload.value.companyWebsite = ''
    payload.value.formStartedAt = Date.now()
    isReady.value = true
  })

  watch(
    payload,
    value => {
      if (import.meta.client && isReady.value) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      }
    },
    { deep: true }
  )

  async function submit(): Promise<boolean> {
    if (isSubmitting.value || !validation.value.valid) return false

    isSubmitting.value = true
    sendResponse.value = 0

    try {
      const response = await $fetch<ContactFormResponse>('/api/send-mail', {
        method: 'POST',
        body: payload.value,
      })

      sendResponse.value = response.statusCode

      if (response.statusCode === 200) {
        payload.value = createEmptyPayload()
        sessionStorage.removeItem(STORAGE_KEY)
        showToast({
          style: 'success',
          message: 'Deine Nachricht wurde gesendet.',
        })
        return true
      }
    } catch {
      sendResponse.value = 535
      showToast({
        style: 'error',
        message:
          'Deine Nachricht konnte nicht gesendet werden. Bitte versuche es später erneut.',
      })
    } finally {
      isSubmitting.value = false
    }

    return false
  }

  return {
    isReady,
    isSubmitting,
    payload,
    sendResponse,
    submit,
    validation,
  }
}
