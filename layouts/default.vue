<template>
  <div class="siteContainer">
    <CookieBanner />
    <TopMenuBar :is-relative="true" :logo-white="false" />
    <slot />
    <Footer />
  </div>
</template>
