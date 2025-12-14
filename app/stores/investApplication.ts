import { defineStore } from 'pinia'
import type { InvestApplicationPayload } from '~~/util/types'

const STORAGE_KEY = 'investApplicationDraft'
type Salutation = InvestApplicationPayload['salutation']

const defaultPayload = (): InvestApplicationPayload => ({
  salutation: '' as Salutation,
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: '',
  taxId: '',
  comment: '',
  street: '',
  postalCode: '',
  city: '',
  country: 'Deutschland',
  shares: 1,
  confirmInfo: false,
  dataConsent: false,
  newsletter: false,
  iban: '',
  accountHolder: '',
  bic: '',
})

const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const ibanRegex = /^[A-Z]{2}\d{2}[A-Z0-9]{1,30}$/
const bicRegex = /^[A-Z0-9]{8}([A-Z0-9]{3})?$/

function sanitizeIban(value: string) {
  return value.replace(/\s+/g, '').toUpperCase()
}

export const useInvestApplicationStore = defineStore(
  'investApplication',
  () => {
    const payload = ref<InvestApplicationPayload>(defaultPayload())
    const currentStep = ref(0)
    const loadedFromSession = ref(false)

    function loadFromSession(force = false) {
      if (!import.meta.client) return
      if (loadedFromSession.value && !force) return
      const saved = sessionStorage.getItem(STORAGE_KEY)
      if (saved) {
        try {
          payload.value = {
            ...payload.value,
            ...(JSON.parse(saved) as InvestApplicationPayload),
          }
        } catch (error) {
          console.warn('Konnte gespeicherten Antrag nicht laden', error)
        }
      }
      loadedFromSession.value = true
    }

    const saveToSession = () => {
      if (!import.meta.client) return
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload.value))
      } catch (error) {
        console.warn('Konnte Antrag nicht in sessionStorage speichern', error)
      }
    }

    watch(
      () => payload.value,
      () => saveToSession(),
      { deep: true }
    )

    function update(data: Partial<InvestApplicationPayload>) {
      const next = { ...payload.value, ...data }
      if (next.iban) next.iban = sanitizeIban(next.iban)
      payload.value = next
    }

    function reset() {
      payload.value = defaultPayload()
      currentStep.value = 0
      if (import.meta.client) sessionStorage.removeItem(STORAGE_KEY)
    }

    const isStep1Valid = computed(() => {
      const p = payload.value
      return (
        !!p.firstName.trim() &&
        !!p.lastName.trim() &&
        !!p.email.trim() &&
        emailRegex.test(p.email.trim()) &&
        !!p.street.trim() &&
        !!p.postalCode.trim() &&
        !!p.city.trim() &&
        !!p.country.trim() &&
        Number.isInteger(p.shares) &&
        p.shares >= 1
      )
    })

    const isStep2Valid = computed(() => {
      const p = payload.value
      const iban = sanitizeIban(p.iban || '')
      const bicOk = !p.bic || bicRegex.test(p.bic.trim().toUpperCase())
      return (
        !!p.accountHolder.trim() &&
        ibanRegex.test(iban) &&
        checkIbanChecksum(iban) &&
        bicOk
      )
    })

    const isStep3Valid = computed(() => {
      const p = payload.value
      return p.confirmInfo && p.dataConsent
    })

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

    return {
      payload,
      currentStep,
      update,
      reset,
      isStep1Valid,
      isStep2Valid,
      isStep3Valid,
      loadFromSession,
    }
  }
)
