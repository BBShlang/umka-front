
<template>
  <section class="section" id="news">
    <div class="container">
      <div class="section-head">
        <div class="pill">Новости</div>
        <h2 class="section-title">Новости и статьи</h2>
        <p class="section-subtitle">
          Актуальные материалы, статьи и анонсы центра. Для администратора доступно
          управление новостями прямо на этой же странице.
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
          v-model="form.image"
          class="input"
          type="text"
          placeholder="Ссылка на изображение"
        />

        <textarea
          v-model="form.text"
          class="textarea"
          rows="5"
          placeholder="Текст новости"
        ></textarea>

        <button class="btn btn-primary" @click="addNews">
          Добавить новость
        </button>
      </div>

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
import { reactive } from 'vue'
import { useNewsStore } from '../stores/news'
import NewsCard from './NewsCard.vue'

defineProps({
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const newsStore = useNewsStore()

const form = reactive({
  title: '',
  image: '',
  text: ''
})

function addNews() {
  if (!form.title.trim() || !form.image.trim() || !form.text.trim()) return

  newsStore.addNews({
    title: form.title,
    image: form.image,
    text: form.text
  })

  form.title = ''
  form.image = ''
  form.text = ''
}
</script>
