<script setup lang="ts">
const router = useRouter()

const thisRouteName = computed(
  () =>
    (router.currentRoute.value.name as string).toUpperCase()[0] +
    (router.currentRoute.value.name as string).toLowerCase().slice(1)
)
</script>

<template>
  <div class="breadcrumbs">
    <span>
      <NuxtLink to="/">
        <span>Home</span>
      </NuxtLink>
    </span>

    <span>></span>

    <span>{{ thisRouteName }}</span>
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
    color: var(--breadcrumb-color);
    text-decoration: none;
    border: 0;
  }
}
</style>
