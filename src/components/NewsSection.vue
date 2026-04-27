<template>
  <section class="section" id="news">
    <div class="container">
      <div class="section-head">
        <div class="pill">Новости</div>
        <h2 class="section-title">Новости и статьи</h2>
        <p class="section-subtitle">
          Актуальные материалы, статьи и анонсы центра. Для администратора доступно управление новостями.
        </p>
      </div>

      <div v-if="isAdmin" class="card admin-form news-admin-form">
        <h3>Добавить новость</h3>

        <input
          v-model="form.title"
          class="input"
          type="text"
          placeholder="Заголовок новости"
        />

        <input
          ref="fileInput"
          class="input"
          type="file"
          accept="image/*"
          multiple
          @change="selectFiles"
        />

        <textarea
          v-model="form.text"
          class="textarea"
          rows="5"
          placeholder="Текст новости"
        ></textarea>

        <button class="btn btn-primary" :disabled="newsStore.isLoading" @click="addNews">
          {{ newsStore.isLoading ? 'Отправка...' : 'Добавить новость' }}
        </button>
      </div>

      <p v-if="newsStore.error" class="error-text">{{ newsStore.error }}</p>

      <div v-if="newsStore.items.length" class="news-grid">
        <NewsCard
          v-for="item in newsStore.items"
          :key="item.id"
          :item="item"
          :show-delete="isAdmin"
          @delete="newsStore.deleteNews"
        />
      </div>

      <div v-else class="empty-state">
        Пока новостей нет.
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useNewsStore } from '../stores/news'
import { useAuthStore } from '../stores/auth'
import NewsCard from './NewsCard.vue'

defineProps({
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const newsStore = useNewsStore()
const auth = useAuthStore()
const fileInput = ref(null)

const form = reactive({
  title: '',
  text: '',
  files: []
})

onMounted(() => {
  newsStore.fetchNews()
})

function selectFiles(event) {
  form.files = Array.from(event.target.files || [])
}

async function addNews() {
  if (!form.title.trim() || !form.text.trim()) return

  try {
    await newsStore.addNews({
      user_id: auth.user?.id ?? null,
      title: form.title,
      text: form.text,
      files: form.files
    })

    form.title = ''
    form.text = ''
    form.files = []
    if (fileInput.value) {
      fileInput.value.value = ''
    }
  } catch (e) {
    newsStore.error = e.message || 'Не удалось добавить новость'
  }
}
</script>
