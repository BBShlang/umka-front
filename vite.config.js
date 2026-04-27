import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://26.219.89.12:9090',
        changeOrigin: true,
        secure: false
      },
      '/image': {
        target: 'http://26.219.89.12:9090',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
