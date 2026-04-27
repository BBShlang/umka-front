
<template>
  <section class="section section--compact">
    <div class="container auth-shell">
      <div class="auth-container">
        <div class="auth-card card">
          <div class="auth-head">
            <div class="pill">Вход</div>
            <h1 class="section-title">Войти в аккаунт</h1>
            <p class="section-subtitle">
              После входа вы сможете оставлять комментарии, а администратор — управлять новостями и отзывами.
            </p>
          </div>

          <form @submit.prevent="submit">
            <p class="error-text" v-if="error">{{ error }}</p>

            <input
              v-model="form.email"
              class="input"
              type="email"
              placeholder="Email"
            />

            <input
              v-model="form.password"
              class="input"
              type="password"
              placeholder="Пароль"
            />

            <button class="btn btn-primary" type="submit">
              Войти
            </button>
          </form>

          <p class="auth-bottom">
            Нет аккаунта?
            <RouterLink to="/register">Зарегистрироваться</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const error = ref('')

const form = reactive({
  email: '',
  password: ''
})

async function submit() {
  error.value = ''

  try {
    await auth.login(form.email, form.password)
    router.push('/')
  } catch (e) {
    error.value = e.message
  }
}
</script>
