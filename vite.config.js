import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from 'autoprefixer'
// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "${process.cwd()}/src/styles/_variables.scss" as *;`,
      },
    },
    postcss: {
      plugins: [autoprefixer()],
    },
  },
  plugins: [react()],
  base: '/OleksandrRoshcuk.github.io/',
})
