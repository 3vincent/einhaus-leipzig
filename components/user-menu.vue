<template>
  <nav class="user-menu-container">
    <div class="user-menu-icon-container">
      <MenuButton :is-active="menuVisible" aria-controls="primary-navigation" />
    </div>

    <div class="user-menu-list-container">
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

<script lang="ts">
export default {
  name: 'UserMenu',

  data() {
    return {
      menuVisible: false,
    }
  },

  beforeUnmount() {
    this.userMenu?.removeEventListener('click', this.toggleMenuModal, false)

    document.removeEventListener('click', this.detectOutsideClickToClose, false)
  },

  mounted() {
    this.userMenu?.addEventListener('click', this.toggleMenuModal, false)

    document.addEventListener('click', this.detectOutsideClickToClose, false)
  },

  computed: {
    menuModal() {
      return document.querySelector('.user-menu-list-container')
    },

    userMenu() {
      return document.querySelector('.user-menu-container')
    },
  },

  methods: {
    toggleMenuModal() {
      this.menuModal?.classList.toggle('is-visible')

      this.toggleClickState()
    },

    toggleClickState() {
      if (this.menuModal?.classList.contains('is-visible'))
        return (this.menuVisible = true)

      return (this.menuVisible = false)
    },

    detectOutsideClickToClose(event: any) {
      const isClickInside = this.userMenu?.contains(event.target)

      if (!isClickInside) {
        this.menuModal?.classList.remove('is-visible')
        this.toggleClickState()
      }
    },
  },
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
      transform: translateX(50px) perspective(300px) rotateX(-40deg);
      transition: transform 200ms, opacity 100ms;
    }
  }
}

.is-visible {
  transform: translateY(0) perspective(200px) rotateX(0deg);
  opacity: 1;
}
</style>
