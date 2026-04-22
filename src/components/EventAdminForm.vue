<script setup>
import { reactive } from 'vue'
import { useEventsStore } from '../stores/events'

const eventsStore = useEventsStore()

const form = reactive({
  month: '',
  title: '',
  text: ''
})

function addEvent() {
  if (!form.month.trim() || !form.title.trim() || !form.text.trim()) return

  eventsStore.addEvent({
    month: form.month,
    title: form.title,
    text: form.text
  })

  form.month = ''
  form.title = ''
  form.text = ''
}
</script>

<template>
  <div class="card admin-form news-admin-form">
    <h3>Добавить мероприятие</h3>

    <input
      v-model="form.month"
      class="input"
      type="text"
      placeholder="Месяц, например: Октябрь"
    />

    <input
      v-model="form.title"
      class="input"
      type="text"
      placeholder="Название мероприятия"
    />

    <textarea
      v-model="form.text"
      class="textarea"
      rows="5"
      placeholder="Описание мероприятия"
    ></textarea>

    <button class="btn btn-primary" @click="addEvent">
      Добавить мероприятие
    </button>
  </div>
</template>