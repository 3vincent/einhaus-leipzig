<template>
  <div class="siteContainer">
    <TopMenuBar :is-relative="true" :logo-white="false" />
    <slot />
    <Footer />
  </div>
</template>
