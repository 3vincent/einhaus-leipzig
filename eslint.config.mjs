// @ts-check
import prettier from 'eslint-config-prettier/flat'
import vue from 'eslint-plugin-vue'
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

const nuxtConfig = await createConfigForNuxt()

export default [
  ...nuxtConfig,
  {
    ignores: [
      '.nuxt',
      '.output',
      'dist',
      'coverage',
      'node_modules',
      '*.log*',
      '.nitro',
      '.cache',
      '.env',
      '.vercel',
    ],
  },
  ...vue.configs['flat/recommended'],
  {
    rules: {
      'comma-dangle': 'off',
      'space-before-function-paren': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
    },
  },
  // prettier is a single config object, not an array
  prettier,
]
