<template>
  <div>
    <AppHeader />
    <main class="page-main">
      <RouterView />
    </main>
    <AppFooter />
    <ProfileModal />
  </div>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import AppFooter from '../components/AppFooter.vue'
import ProfileModal from '../components/ProfileModal.vue'
</script>