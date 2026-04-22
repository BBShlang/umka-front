<template>
  <article class="news-card card">
    <div class="news-card__image-wrap">
      <img :src="item.image" :alt="item.title" class="news-card__image" />
      <div class="news-card__gradient"></div>
    </div>

    <div class="news-card__body">
      <div class="news-card__date">● {{ item.createdAt }}</div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.text }}</p>

      <div v-if="showDelete" class="news-card__actions">
        <button class="btn btn-danger" @click="emit('delete', item.id)">
          Удалить новость
        </button>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  showDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete'])
</script>
