<template>
  <div class="siteContainer">
    <slot />
    <Footer :is-landing="true" />
    <TopMenuBar :is-relative="false" :logo-white="true" />
    <CookieBanner />
  </div>
</template>
