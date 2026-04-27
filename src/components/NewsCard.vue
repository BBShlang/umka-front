<template>
  <article class="news-card card">
    <div v-if="item.image" class="news-card__image-wrap">
      <img :src="item.image" :alt="item.title" class="news-card__image" />
      <div class="news-card__gradient"></div>
    </div>

    <div class="news-card__body">
      <div v-if="item.createdAt" class="news-card__date">● {{ item.createdAt }}</div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.text }}</p>

      <div class="news-card__actions">
        <button
          v-if="item.backendId"
          class="btn btn-secondary"
          @click="toggleComments"
        >
          {{ commentsOpen ? 'Скрыть комментарии' : 'Комментарии' }}
        </button>

        <button
          v-if="showDelete"
          class="btn btn-danger"
          :disabled="!item.backendId"
          @click="emit('delete', item.id)"
        >
          Удалить новость
        </button>
      </div>

      <div v-if="commentsOpen && item.backendId" class="news-card__comments">
        <p v-if="commentsStore.error" class="error-text">{{ commentsStore.error }}</p>
        <CommentForm @submit="addComment" />
        <CommentList
          :comments="comments"
          :can-delete="showDelete"
          @delete="deleteComment"
        />
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useCommentsStore } from '../stores/comments'
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'

const props = defineProps({
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
const auth = useAuthStore()
const commentsStore = useCommentsStore()
const commentsOpen = ref(false)

const comments = computed(() => commentsStore.getByPost(props.item.backendId))

async function toggleComments() {
  commentsOpen.value = !commentsOpen.value
  if (commentsOpen.value && props.item.backendId) {
    await commentsStore.fetchComments(props.item.backendId)
  }
}

async function addComment(text) {
  if (!auth.user || !props.item.backendId) return

  await commentsStore.addComment({
    postId: props.item.backendId,
    authorName: auth.user.fullName,
    text
  })
}

async function deleteComment(id) {
  if (!props.item.backendId) return
  await commentsStore.deleteComment(id, props.item.backendId)
}
</script>
