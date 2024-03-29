module.exports = exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'eslint:recommended', // <- add this line
    // ""plugin":prettier/recommended", <- remove this line
  ],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    ecmaVersion: 'latest',
  },
  rules: {
    'comma-dangle': 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',
  },
  plugins: ['prettier'],
  'eslint.validate': ['javascript', 'javascriptreact', 'vue'],
}
