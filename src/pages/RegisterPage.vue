<script setup>
import { reactive, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()

const error = ref('')
const success = ref('')
const step = ref(1)
const confirmationCode = ref('')
const registeredEmail = ref('')

const form = reactive({
  email: '',
  password: ''
})

async function submitRegistration() {
  error.value = ''
  success.value = ''

  try {
    await auth.register({
      email: form.email,
      password: form.password
    })

    registeredEmail.value = form.email
    step.value = 2
    success.value = 'Регистрация отправлена. Введите код подтверждения из письма.'
  } catch (e) {
    error.value = e.message || 'Ошибка регистрации'
  }
}

async function submitConfirmation() {
  error.value = ''
  success.value = ''

  try {
    await auth.confirmRegistration(confirmationCode.value)
    success.value = 'Почта подтверждена. Теперь можно войти.'
    router.push('/login')
  } catch (e) {
    error.value = e.message || 'Ошибка подтверждения'
  }
}
</script>

<template>
  <section class="section section--compact">
    <div class="container auth-shell">
      <div class="auth-container">
        <div class="auth-card card">
          <div class="auth-head">
            <div class="pill">Регистрация</div>
            <h1 class="section-title">Создать аккаунт</h1>
          </div>

          <p v-if="error" class="error-text">{{ error }}</p>
          <p v-if="success" class="success-text">{{ success }}</p>

          <form v-if="step === 1" @submit.prevent="submitRegistration">
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

            <button class="btn btn-primary" type="submit" :disabled="auth.isLoading">
              {{ auth.isLoading ? 'Отправка...' : 'Зарегистрироваться' }}
            </button>
          </form>

          <form v-else @submit.prevent="submitConfirmation">
            <input
              :value="registeredEmail"
              class="input"
              type="email"
              disabled
            />

            <input
              v-model="confirmationCode"
              class="input"
              type="text"
              placeholder="Код подтверждения"
            />

            <button class="btn btn-primary" type="submit" :disabled="auth.isLoading">
              {{ auth.isLoading ? 'Проверка...' : 'Подтвердить почту' }}
            </button>
          </form>

          <p class="auth-bottom">
            Уже есть аккаунт?
            <RouterLink to="/login">Войти</RouterLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>