import { defineStore } from 'pinia'
import { loadFromStorage, saveToStorage } from '../utils/storage'

const DEFAULT_EVENTS = [
  {
    id: 'event-1',
    month: 'Май',
    title: 'Открытая встреча для родителей',
    text: 'Обсуждение возрастных особенностей развития, школьной готовности и способов поддержки ребёнка дома.'
  },
  {
    id: 'event-2',
    month: 'Июнь',
    title: 'Практический семинар специалистов',
    text: 'Обмен опытом, современные коррекционные подходы и рекомендации по междисциплинарной работе.'
  },
  {
    id: 'event-3',
    month: 'Сентябрь',
    title: 'Конференция по вопросам сопровождения детей',
    text: 'Площадка для профессионального диалога, обмена кейсами и знакомства с полезными ресурсами.'
  }
]

export const useEventsStore = defineStore('events', {
  state: () => ({
    items: loadFromStorage('umka_events', DEFAULT_EVENTS)
  }),

  actions: {
    addEvent(payload) {
      this.items.unshift({
        id: crypto.randomUUID(),
        month: payload.month,
        title: payload.title,
        text: payload.text
      })
      saveToStorage('umka_events', this.items)
    },

    deleteEvent(id) {
      this.items = this.items.filter((item) => item.id !== id)
      saveToStorage('umka_events', this.items)
    }
  }
})