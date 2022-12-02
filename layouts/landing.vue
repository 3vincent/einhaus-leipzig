<template>
  <div class="siteContainer">
    <TopMenuBar :is-relative="false" :logo-white="true" />
    <slot />
    <Footer :is-landing="true" />
    <CookieBanner />
  </div>
</template>
