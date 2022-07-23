<template>
  <div class="siteContainer">
    <TopMenu :is-relative="false" :logo-white="true" />
    <LandingOneScrollMenu />
    <slot />
    <Footer :is-landing="true" />
  </div>
</template>
