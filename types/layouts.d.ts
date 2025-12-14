// Ensure custom layout is always part of the generated LayoutKey union
declare module 'nuxt/schema' {
  interface Layouts {
    investwizard: typeof import('~/layouts/investwizard.vue')['default']
  }
}

// Hard-augment LayoutKey for typecheck tools that might miss our layout
declare module 'nuxt/app' {
  type LayoutKey =
    | 'default'
    | 'landing'
    | 'investwizard'
    | (string & {}) // allow future layouts without failing typecheck
}

export {}
