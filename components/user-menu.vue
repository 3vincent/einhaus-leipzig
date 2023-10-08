<template>
  <nav class="user-menu-container">
    <div class="user-menu-icon-container">
      <MenuButton :is-active="menuVisible" aria-controls="primary-navigation" />
    </div>

    <div
      class="user-menu-list-container"
      :class="{ 'is-visible': menuVisible, 'hide-on-load': hideOnLoad }"
    >
      <ul id="primary-navigation" class="user-menu-list">
        <li>
          <NuxtLink to="/">
            <span>Home</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/kontakt">
            <span>Kontakt</span>
          </NuxtLink>
        </li>

        <li>
          <NuxtLink to="/impressum">
            <span>Impressum</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
const menuVisible = ref(false)
const hideOnLoad = ref(true)

onBeforeUnmount(() => {
  userMenu.value?.removeEventListener('click', toggleMenuModal, false)

  document.removeEventListener('click', detectOutsideClickToClose, false)
})

onMounted(() => {
  userMenu.value?.addEventListener('click', toggleMenuModal, false)

  document.addEventListener('click', detectOutsideClickToClose, false)

  setTimeout(() => {
    hideOnLoad.value = false
  }, 150)
})

const menuModal = computed(() => {
  return document.querySelector('.user-menu-list-container')
})

const userMenu = computed(() => {
  return document.querySelector('.user-menu-container')
})

function toggleMenuModal() {
  menuModal.value?.classList.toggle('is-visible')

  toggleClickState()
}
function toggleClickState() {
  if (menuModal.value?.classList.contains('is-visible'))
    return (menuVisible.value = true)

  return (menuVisible.value = false)
}
function detectOutsideClickToClose(event: any) {
  const isClickInside = userMenu.value?.contains(event.target)

  if (!isClickInside) menuModal.value?.classList.remove('is-visible')
  toggleClickState()
}
</script>

<style lang="scss" scoped>
.user-menu {
  &-list {
    list-style-type: none;
    padding: 0;
    margin: 0;

    li {
      display: block;
      margin-top: 00px;
      margin-bottom: 00px;

      // a.router-link-active {
      //   font-weight: 600;
      // }

      // a.nuxt-link-exact-active {
      //   background-color: red !important;
      //   color: red !important;
      // }

      a,
      a:visited {
        background-color: transparent;
        display: block;
        border: 0px solid transparent;
        padding: 10px;
        padding-top: 10px;
        padding-bottom: 10px;
        text-decoration: none;
        color: inherit;
        font-size: 16px;
        font-weight: 500;
        border-radius: 6px;
      }

      a:hover {
        background-color: var(--background-menu-highlighting);
      }
    }

    &-container {
      position: absolute;
      z-index: 1900;
      width: 210px;
      top: 60px;
      right: 0;
      padding: 10px;

      background-color: white;
      border-radius: 10px;
      border: 0.5px solid var(--background-menu-highlighting);

      opacity: 0;
      transform: translateX(50px) perspective(200px) rotateY(-40deg);
      animation-name: hide-animation;
      animation-duration: 150ms;
      animation-fill-mode: forwards;

      @keyframes hide-animation {
        0% {
          opacity: 1;
          transform: translateX(0) perspective(200px) rotateY(0);
        }

        100% {
          opacity: 0;
          transform: translateX(50px) perspective(200px) rotateY(-40deg);
          visibility: hidden;
        }
      }

      &.hide-on-load {
        opacity: 0;
        transform: translateX(50px) perspective(200px) rotateY(-40deg);
        visibility: hidden;
      }
    }
  }
}

.is-visible {
  will-change: transform, opacity;
  transform: translateX(0) perspective(200px) rotateY(0deg);
  opacity: 1;
  visibility: visible;
  animation-name: show-animation;
  animation-duration: 150ms;
  animation-fill-mode: forwards;

  @keyframes show-animation {
    0% {
      opacity: 0;
      transform: translateX(50px) perspective(200px) rotateY(-40deg);
    }

    100% {
      opacity: 1;
      transform: translateX(0) perspective(200px) rotateY(0);
      visibility: visible;
    }
  }
}
</style>
