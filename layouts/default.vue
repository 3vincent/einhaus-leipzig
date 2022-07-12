<template>
  <div class="siteContainer">
    <TopMenu :is-relative="true" :logo-white="false" />
    <slot />
    <Footer />
  </div>
</template>
