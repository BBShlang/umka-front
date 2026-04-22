<script setup>
import { computed, ref } from 'vue'
import { useCommentsStore } from '../stores/comments'
import { useAuthStore } from '../stores/auth'
import CommentList from './CommentList.vue'
import CommentForm from './CommentForm.vue'

const props = defineProps({
  event: {
    type: Object,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['delete-event'])

const commentsStore = useCommentsStore()
const auth = useAuthStore()
const showAllComments = ref(false)

const comments = computed(() => commentsStore.getByEvent(props.event.id))

const visibleComments = computed(() => {
  if (showAllComments.value) return comments.value
  return comments.value.slice(0, 1)
})

const hasMoreComments = computed(() => comments.value.length > 1)

function addComment(text) {
  if (!auth.user) return

  commentsStore.addComment({
    eventId: props.event.id,
    authorId: auth.user.id,
    authorName: auth.user.fullName,
    text
  })
}

function deleteComment(id) {
  if (auth.user?.role !== 'admin') return
  commentsStore.deleteComment(id)
}

function toggleComments() {
  showAllComments.value = !showAllComments.value
}
</script>

<template>
  <article class="event-card card">
    <div class="event-card__meta-wrap">
      <div class="event-card__meta">{{ event.month }}</div>
    </div>

    <div class="event-card__content">
      <div class="event-card__head">
        <div>
          <h3>{{ event.title }}</h3>
          <p>{{ event.text }}</p>
        </div>

        <button
          v-if="isAdmin"
          class="btn btn-danger event-card__delete"
          @click="emit('delete-event', event.id)"
        >
          Удалить мероприятие
        </button>
      </div>

      <CommentForm @submit="addComment" />

      <CommentList
        :comments="visibleComments"
        :can-delete="auth.user?.role === 'admin'"
        @delete="deleteComment"
      />

      <div v-if="hasMoreComments" class="event-card__more">
        <button class="btn btn-secondary" @click="toggleComments">
          {{ showAllComments ? 'Скрыть отзывы' : 'Показать ещё отзывы' }}
        </button>
      </div>
    </div>
  </article>
</template>