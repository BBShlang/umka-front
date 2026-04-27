<template>
  <div class="comment-list">
    <article
      v-for="comment in comments"
      :key="comment.id"
      class="comment-item card"
    >
      <div class="comment-item__top">
        <div class="comment-item__author">
          <div class="comment-item__avatar">{{ initials(comment.authorName) }}</div>
          <div class="comment-item__meta">
            <span class="comment-item__name">{{ comment.authorName || 'Пользователь' }}</span>
            <span v-if="comment.createdAt" class="comment-item__date">{{ comment.createdAt }}</span>
          </div>
        </div>
      </div>

      <p>{{ comment.text }}</p>

      <button
        v-if="canDelete && comment.backendId"
        class="btn btn-danger"
        @click="emit('delete', comment.id)"
      >
        Удалить комментарий
      </button>
    </article>
  </div>
</template>

<script setup>
defineProps({
  comments: {
    type: Array,
    default: () => []
  },
  canDelete: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete'])

function initials(name) {
  if (!name) return 'U'
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}
</script>
