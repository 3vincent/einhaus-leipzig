/**
 * @type {import('vite').UserConfig}
 */
const config = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./assets/styles/general/variables.scss";',
      },
    },
  },
}

export default config
