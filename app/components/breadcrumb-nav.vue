<script setup lang="ts">
const route = useRoute()

const formatSegment = (segment: string) => {
  const umlautMap: Record<string, string> = {
    ae: 'ä',
    oe: 'ö',
    ue: 'ü',
  }

  let text = segment.replace(/-/g, ' ')

  Object.entries(umlautMap).forEach(([ascii, umlaut]) => {
    const regex = new RegExp(ascii, 'gi')
    text = text.replace(regex, match =>
      match === match.toUpperCase() ? umlaut.toUpperCase() : umlaut
    )
  })

  return text.charAt(0).toUpperCase() + text.slice(1)
}

const breadcrumbs = computed(() => {
  const segments = route.path.split('/').filter(Boolean)

  let pathAccumulator = ''
  const items = segments.map((segment, index) => {
    pathAccumulator += `/${segment}`
    const isLast = index === segments.length - 1
    return {
      label:
        isLast && route.meta?.breadcrumb
          ? (route.meta.breadcrumb as string)
          : formatSegment(segment),
      to: isLast ? null : pathAccumulator,
    }
  })

  return [{ label: 'Startseite', to: '/' }, ...items]
})
</script>

<template>
  <nav class="breadcrumbs" aria-label="Brotkrumen">
    <template
      v-for="(crumb, index) in breadcrumbs"
      :key="crumb.to || crumb.label"
    >
      <span v-if="crumb.to">
        <NuxtLink :to="crumb.to">
          <span class="w-bold underline">{{ crumb.label }}</span>
        </NuxtLink>
      </span>
      <span v-else class="w-light">
        {{ crumb.label }}
      </span>

      <div
        v-if="index < breadcrumbs.length - 1"
        class="arrow"
        aria-hidden="true"
      ></div>
    </template>
  </nav>
</template>

<style lang="scss" scoped>
.breadcrumbs {
  display: flex;
  align-items: center;
  color: var(--color-text-muted);
  font-size: 0.8rem;
  font-weight: 400;
  margin-top: 1rem;
  margin-bottom: 3.33rem;

  > span {
    padding-right: 0.4rem;
  }

  a,
  a:link,
  a:visited {
    color: var(--color-text-muted);
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
  border: solid var(--color-text);
  border-width: 0 1px 1px 0;
  transform: rotate(-45deg);
}

.w-bold {
  font-weight: 500;
}

.w-light {
  font-weight: 300;
}

.underline {
  border-bottom: 1px solid var(--color-border);
}
</style>
