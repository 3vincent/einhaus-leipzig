<script setup lang="ts">
import { useInvestApplicationStore } from '~/stores/investApplication'

const store = useInvestApplicationStore()

const steps = [
  {
    label: 'Persönliche Daten',
    path: '/mitglied-werden/online-formular/persoenliche-daten',
    index: 0,
  },
  {
    label: 'Bankverbindung',
    path: '/mitglied-werden/online-formular/bankverbindung',
    index: 1,
  },
  {
    label: 'Antrag abschicken',
    path: '/mitglied-werden/online-formular/antrag-abschicken',
    index: 2,
  },
]

function canNavigate(stepIndex: number) {
  if (stepIndex === 0) return true
  if (stepIndex === 1) return store.isStep1Valid
  if (stepIndex === 2) return store.isStep1Valid && store.isStep2Valid
  return false
}

function goTo(stepIndex: number, path: string) {
  if (!canNavigate(stepIndex)) return
  store.currentStep = stepIndex
  navigateTo(path)
}
</script>

<template>
  <div class="stepper">
    <div
      v-for="step in steps"
      :key="step.index"
      class="step"
      :class="{
        active: store.currentStep === step.index,
        done: store.currentStep > step.index,
        locked: !canNavigate(step.index),
      }"
      role="button"
      tabindex="0"
      @click="goTo(step.index, step.path)"
      @keydown.enter.prevent="goTo(step.index, step.path)"
    >
      <div class="badge">{{ step.index + 1 }}</div>
      <div class="label">{{ step.label }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.stepper {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.75rem;
  width: 100%;
}

.step {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  gap: 0.6rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #f7f9fb;
  color: #304559;
  cursor: pointer;
  transition:
    border-color 150ms ease,
    background-color 150ms ease;
}

.step.locked {
  cursor: not-allowed;
  opacity: 0.6;
}

.step.active {
  border-color: #1f3a4d;
  background: #eef3f8;
}

.step.done {
  border-color: #4c7a9e;
}

.badge {
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: #1f3a4d;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.step.active .badge {
  background: #4c7a9e;
}

.label {
  font-weight: 700;
  line-height: 1.3;
}

@media screen and (max-width: 640px) {
  .stepper {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .step {
    min-width: calc(50% - 0.4rem);
    flex: 1 1 calc(50% - 0.4rem);
    padding: 0.6rem 0.7rem;
    gap: 0.4rem;
  }

  .badge {
    width: 26px;
    height: 26px;
    border-radius: 8px;
    font-size: 0.9rem;
  }

  .label {
    font-size: 0.95rem;
  }
}

@media screen and (max-width: 420px) {
  .step {
    min-width: 100%;
    flex: 1 1 100%;
    padding: 0.55rem 0.65rem;
  }

  .label {
    font-size: 0.9rem;
  }
}
</style>
