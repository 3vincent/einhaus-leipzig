<template>
  <div class="user-menu-container">
    <div class="user-menu-icon-container">
      <!-- <MenuIcon :is-clicked="iconClicked" /> -->
      <MenuIcon :is-clicked="false" />
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
    }
  },

  beforeUnmount() {
    document
      .querySelector('.user-menu-icon-container')
      .removeEventListener('mousedown', this.showMenuModal, false)
  },

  mounted() {
    document
      .querySelector('.user-menu-icon-container')
      .addEventListener('mousedown', this.showMenuModal, false)

    document.addEventListener('click', event => {
      const isClickInside = document
        .querySelector('.user-menu-icon-container')
        .contains(event.target)

      if (!isClickInside) {
        document
          .querySelector('.user-menu-list-container')
          .classList.remove('is-visible')

        this.toggleClickState()
      }
    })
  },

  methods: {
    showMenuModal() {
      const hamburgerMenu = document.querySelector('.user-menu-icon-container')
      const menuModal = document.querySelector('.user-menu-list-container')

      // console.log('🎉')
      menuModal.classList.toggle('is-visible')
      this.toggleClickState()
    },

    toggleClickState() {
      if (
        this.iconClicked == false &&
        document
          .querySelector('.user-menu-list-container')
          .classList.contains('is-visible')
      ) {
        this.iconClicked = true
      } else {
        this.iconClicked = false
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
      margin-top: 10px;
      margin-bottom: 10px;

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
        padding: 1rem;
        padding-top: 6px;
        padding-bottom: 6px;
        text-decoration: none;
        color: inherit;
        font-size: 16px;
        font-weight: 500;
        border-radius: 6px;
      }

      a:hover {
        background-color: var(--background-grey);
      }
    }

    &-container {
      position: absolute;
      z-index: 1900;
      width: 210px;
      top: 60px;
      right: 0;
      padding: 0.5rem 1rem;
      margin-right: 1rem;

      background-color: white;
      border-radius: 10px;
      border: 0.5px solid var(--background-grey);

      display: none;
    }
  }
}

.is-visible {
  display: block;
}
</style>
