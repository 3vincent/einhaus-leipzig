// @ts-check
import prettier from 'eslint-config-prettier/flat'
import vue from 'eslint-plugin-vue'
import withNuxt from './.nuxt/eslint.config.mjs'

// Top-level await is fine in .mjs
export default await withNuxt(
  // 1) ignores block
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

  // 2) Vue recommended flat preset
  ...vue.configs['flat/recommended'],

  // 3) Your custom rules
  {
    rules: {
      'comma-dangle': 'off',
      'space-before-function-paren': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',
    },
  },

  // 4) Prettier last (spread because it’s an array)
  prettier
)
