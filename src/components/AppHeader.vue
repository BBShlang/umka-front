<template>
  <header class="header">
    <div class="container header__inner">
      <RouterLink class="logo" to="/">
        <img src="/umka-fotor-20260422144013.png" alt="ОП АНО «УМКА»" class="logo__image" />
        <div class="logo__text">
          <strong>ОП АНО «УМКА»</strong>
          <span>г. Ростов-на-Дону · ЦППМСП</span>
        </div>
      </RouterLink>

      <nav class="nav" aria-label="Основная навигация">
        <button class="nav-link-btn" @click="goToSection('hero')">Главная</button>
        <button class="nav-link-btn" @click="goToSection('about')">О нас</button>
        <button class="nav-link-btn" @click="goToSection('programs')">Направления</button>
        <button class="nav-link-btn" @click="goToSection('news')">Новости</button>
        <button class="nav-link-btn" @click="goToSection('contacts')">Контакты</button>
      </nav>

      <div class="header-actions">
        <button class="profile-btn" @click="handleProfileClick">
          <span class="profile-btn__icon">{{ initials }}</span>
          <span class="profile-btn__text">
            {{ auth.isAuthenticated ? auth.user?.fullName || auth.user?.email || 'Профиль' : 'Войти / Регистрация' }}
          </span>
        </button>

        <button
          v-if="auth.isAuthenticated"
          class="btn btn-secondary"
          @click="logout"
        >
          Выйти
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useUiStore } from '../stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()
const route = useRoute()

const initials = computed(() => {
  const name = auth.user?.fullName || auth.user?.email
  if (!name) return 'U'

  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})

function goToSection(sectionId) {
  if (route.path !== '/') {
    router.push({ path: '/', hash: `#${sectionId}` })
    return
  }

  const el = document.getElementById(sectionId)
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 96
    window.scrollTo({ top, behavior: 'smooth' })
  }
}

function handleProfileClick() {
  if (!auth.isAuthenticated) {
    router.push('/login')
    return
  }

  ui.openProfile()
}

function logout() {
  auth.logout()
  ui.closeProfile()
  router.push('/')
}
</script>
