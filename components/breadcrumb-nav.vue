<script lang="ts">
export default {
  name: 'BreadcrumbNav',
  props: {
    targetUrl: {
      type: String,
      default: 'halloTest',
    },
  },
}
</script>

<template>
  <div class="breadcrumbs">
    <span>
      <NuxtLink to="/">
        <span>Home</span>
      </NuxtLink>
    </span>

    <span>></span>

    <span>{{ targetUrl }}</span>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  color: var(--breadcrumb-color);
  font-size: 0.8rem;
  font-weight: 400;
  margin-top: 1rem;
  margin-bottom: 1.2rem;

  > span {
    padding-right: 0.4rem;
  }

  a,
  a:link,
  a:visited {
    color: var(--main-text-color-semidark);
    text-decoration: none;
    border: 0;
  }
}
</style>
