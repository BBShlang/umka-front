
<template>
  <div
    v-if="ui.isProfileOpen && auth.user"
    class="modal-overlay"
    @click.self="ui.closeProfile()"
  >
    <div class="modal-card card">
      <div class="modal-top">
        <div>
          <div class="pill">Профиль</div>
          <h2 class="modal-title">Личный кабинет</h2>
        </div>
        <button class="modal-close" @click="ui.closeProfile()">✕</button>
      </div>

      <div class="profile-data">
        <div class="profile-row">
          <span class="profile-row__label">ФИО</span>
          <span class="profile-row__value">{{ auth.user.fullName }}</span>
        </div>

        <div class="profile-row">
          <span class="profile-row__label">Email</span>
          <span class="profile-row__value">{{ auth.user.email }}</span>
        </div>

        <div class="profile-row">
          <span class="profile-row__label">Роль</span>
          <span class="profile-row__value">{{ auth.user.role }}</span>
        </div>
      </div>

      <div v-if="auth.user.role === 'admin'" class="admin-note card">
        <strong>Режим администратора</strong>
        <p>
          На этой же главной странице вам доступно добавление и удаление новостей,
          а также удаление комментариев пользователей.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUiStore } from '../stores/ui'
import { useAuthStore } from '../stores/auth'

const ui = useUiStore()
const auth = useAuthStore()
</script>
