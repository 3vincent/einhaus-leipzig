<template>
  <div class="siteContainer">
    <CookieBanner />
    <TopMenuBar :is-relative="false" :logo-white="true" />
    <LandingOneScrollMenu />
    <slot />
    <Footer :is-landing="true" />
  </div>
</template>
