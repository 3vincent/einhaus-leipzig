<script setup lang="ts">
const emit = defineEmits(['close', 'confirm'])
</script>

<template>
  <div class="confirm-overlay" role="dialog" aria-modal="true">
    <div class="confirm-card">
      <h3>Formular wirklich schließen?</h3>
      <p>Deine Eingaben gehen verloren.</p>
      <div class="actions">
        <button class="link secondary" type="button" @click="emit('close')">
          Abbrechen
        </button>
        <button class="link primary" type="button" @click="emit('confirm')">
          Ja, schließen
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.confirm-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9100;
  backdrop-filter: blur(4px);
}

.confirm-card {
  background: #fff;
  border-radius: 14px;
  padding: 1.4rem;
  max-width: 420px;
  width: 90%;
  box-shadow: 0 12px 32px -16px rgba(0, 0, 0, 0.35);
  text-align: center;

  h3 {
    margin: 0 0 0.4rem;
    font-size: 1.2rem;
  }

  p {
    margin: 0 0 1rem;
    color: #304559;
  }

  .actions {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
