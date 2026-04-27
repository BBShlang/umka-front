import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/base.css'
import { useAuthStore } from './stores/auth'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

async function bootstrap() {
  const authStore = useAuthStore(pinia)
  await authStore.initAuth()

  app.use(router)
  app.mount('#app')
}

bootstrap()
