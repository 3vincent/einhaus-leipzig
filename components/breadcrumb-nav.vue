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

    <div class="arrow"></div>

    <span>{{ thisRouteName }}</span>
  </div>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
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

.arrow {
  display: inline-block;
  height: 4px;
  width: 4px;
  margin-right: 10px;
  margin-top: 2px;
  border: solid var(--main-text-color-dark);
  border-width: 0 1px 1px 0;
  transform: rotate(-45deg);
}
</style>
