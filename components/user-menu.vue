<template>
  <div class="user-menu-container">
    <div class="user-menu-icon-container">
      <MenuIcon :is-clicked="iconClicked" />
      <!-- <MenuIcon :is-clicked="false" /> -->
    </div>

    <div class="user-menu-list-container">
      <ul class="user-menu-list">
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
  </div>
</template>

<script>
export default {
  name: 'UserMenu',

  data() {
    return {
      iconClicked: false,
      hamburgerMenu: null,
      menuModal: null,
    }
  },

  beforeUnmount() {
    this.hamburgerMenu.removeEventListener(
      'mousedown',
      this.showMenuModal,
      false
    )

    document.removeEventListener('click', this.detectOutsideClickToClose, false)
  },

  mounted() {
    this.gatherData()

    this.hamburgerMenu.addEventListener('mousedown', this.showMenuModal, false)

    document.addEventListener('click', event =>
      this.detectOutsideClickToClose(event)
    )
  },

  methods: {
    gatherData() {
      this.hamburgerMenu = document.querySelector('.user-menu-icon-container')
      this.menuModal = document.querySelector('.user-menu-list-container')
    },

    showMenuModal() {
      this.menuModal.classList.toggle('is-visible')
      this.toggleClickState()
    },

    toggleClickState() {
      if (
        this.iconClicked == false &&
        this.hamburgerMenu.classList.contains('is-visible')
      ) {
        this.iconClicked = true
      } else {
        this.iconClicked = false
      }
    },

    detectOutsideClickToClose(event) {
      const isClickInside = this.hamburgerMenu.contains(event.target)

      if (!isClickInside) {
        this.menuModal.classList.remove('is-visible')

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
      margin-right: 1rem;

      background-color: white;
      border-radius: 10px;
      border: 0.5px solid var(--background-menu-highlighting);

      display: none;
    }
  }
}

.is-visible {
  display: block;
}
</style>
