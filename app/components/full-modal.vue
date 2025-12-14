<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-show="show" class="modal-overlay">
        <div class="modal">
          <div class="modal-content">
            <slot></slot>
          </div>
          <button
            v-if="showCloseButton"
            class="close-button link secondary small"
            @click="closeModal"
            >Schließen</button
          >
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])

const { show = false, showCloseButton = false } = defineProps<{
  show?: boolean
  showCloseButton?: boolean
}>()

const closeModal = () => {
  emit('close')
}
</script>

<style scoped lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9000;
}

.modal {
  background-color: white;
  padding: 20px 40px;
  // margin-top: -20vh;
  box-shadow: 0 0 10px 10px rgba(103, 103, 103, 0.7);
  max-width: 90vw;
  max-height: 90vh;
  overflow: scroll;
}

.modal-content {
  position: relative;
}

.modal-fade-enter-active {
  transition: opacity 0.5s;
}
.modal-fade-enter {
  opacity: 1;
}
.modal-fade-leave-active {
  transition: opacity 0.3s;
  .modal {
    transition: opacity 0.3s;
    opacity: 0;
  }
}

.modal-fade-leave-to {
  opacity: 0;
}

.close-button {
  margin-top: 30px;
}
</style>
