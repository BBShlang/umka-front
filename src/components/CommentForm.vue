
<template>
  <div class="comment-form card">
    <template v-if="isGuest">
      <p class="guest-hint">
        Чтобы оставить комментарий, сначала зарегистрируйтесь или войдите в аккаунт.
      </p>
    </template>

    <template v-else>
      <textarea
        v-model="text"
        class="textarea"
        rows="4"
        placeholder="Поделитесь впечатлением о мероприятии"
      />
      <div class="comment-form__actions">
        <button class="btn btn-primary" @click="submitForm">
          Отправить комментарий
        </button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const emit = defineEmits(['submit'])
const auth = useAuthStore()
const router = useRouter()
const text = ref('')

const isGuest = computed(() => !auth.isAuthenticated)

function submitForm() {
  if (isGuest.value || !text.value.trim()) return
  emit('submit', text.value.trim())
  text.value = ''
}

function goToRegister() {
  router.push('/register')
}

function goToLogin() {
  router.push('/login')
}
</script>
