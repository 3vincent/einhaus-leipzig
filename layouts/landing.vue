<template>
  <div class="siteContainer">
    <slot />
    <TopMenuBar :is-relative="false" :logo-white="true" />
    <LandingOneScrollMenu />
    <Footer :is-landing="true" />
    <CookieBanner />
  </div>
</template>
