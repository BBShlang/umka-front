<script setup>
import { computed, ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useEventsStore } from '../stores/events'
import EventCard from './EventCard.vue'
import NewsSection from './NewsSection.vue'
import EventAdminForm from './EventAdminForm.vue'

const auth = useAuthStore()
const eventsStore = useEventsStore()

const isAdmin = computed(() => auth.user?.role === 'admin')

const visibleEventsCount = ref(3)

const visibleEvents = computed(() => {
  return eventsStore.items.slice(0, visibleEventsCount.value)
})

const hasMoreEvents = computed(() => {
  return eventsStore.items.length > visibleEventsCount.value
})

function showMoreEvents() {
  visibleEventsCount.value += 3
}

function scrollToSection(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 96
  window.scrollTo({ top, behavior: 'smooth' })
}
</script>

<template>
  <div>
    <section class="section hero" id="hero">
      <div class="container">
        <div class="hero__grid">
          <div class="hero__content card card--elevated">
            <div class="pill">💫 Помогаем детям раскрыть потенциал с первых лет жизни</div>

            <h1 class="hero__title">
              Бережная поддержка детей и семей
              на каждом этапе развития
            </h1>

            <p class="hero__text">
              Подготовка к школе, раннее развитие малышей, поддержка детей с особенностями развития,
              полезные статьи, экспертные материалы и мероприятия — в одном современном
              информационном пространстве центра.
            </p>

            <div class="hero__actions">
              <button class="btn btn-primary" @click="scrollToSection('programs')">
                Смотреть направления
              </button>
              <button class="btn btn-secondary" @click="scrollToSection('news')">
                Читать новости
              </button>
            </div>
          </div>

          <div class="hero__panel card">
            <div class="hero__meta">
              <article class="hero-stat">
                <strong>4–7 лет</strong>
                <span>Подготовка к школе: развитие речи, внимания, мышления и учебной готовности.</span>
              </article>

              <article class="hero-stat">
                <strong>0–3 года</strong>
                <span>Раннее развитие через игру, сенсорные практики и поддержку родителей.</span>
              </article>

              <article class="hero-stat">
                <strong>Поддержка</strong>
                <span>Сопровождение детей с особенностями развития и рекомендации семьям.</span>
              </article>

              <article class="hero-stat">
                <strong>Ресурсы</strong>
                <span>Новости, статьи, мероприятия, разборы и полезные материалы специалистов.</span>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="about">
      <div class="container">
        <div class="page-box page-box--tall card card--elevated">
          <div class="section-head">
            <div class="pill">О нас</div>
            <h2 class="section-title">Профессиональная помощь с заботой о каждом ребёнке</h2>
            <p class="section-subtitle">
              Мы объединяем специалистов, родителей и полезные ресурсы, чтобы помогать детям
              в развитии, обучении, коммуникации и социальной адаптации — бережно,
              системно и с уважением к индивидуальному темпу каждого ребёнка.
            </p>
          </div>

          <ul class="lead-list">
            <li>Проверенные методы коррекции и развития</li>
            <li>Полезные статьи, подкасты и материалы для родителей</li>
            <li>Разборы случаев и рекомендации специалистов</li>
            <li>Анонсы встреч, семинаров и профессиональных конференций</li>
            <li>Бережный и индивидуальный подход к каждой семье</li>
          </ul>
        </div>
      </div>
    </section>

    <section class="section" id="programs">
      <div class="container">
        <div class="section-head">
          <div class="pill">Направления</div>
          <h2 class="section-title">Основные программы центра</h2>
          <p class="section-subtitle">
            Информация сгруппирована так, чтобы родителям и специалистам было легко понять,
            какие форматы поддержки доступны и где искать нужные материалы.
          </p>
        </div>

        <div class="grid cards-3">
          <article class="info-card card">
            <div class="info-card__icon">🎒</div>
            <h3>Подготовка к школе (4–7 лет)</h3>
            <p>
              Развитие речи, внимания, памяти, мышления, мелкой моторики
              и базовой учебной готовности в комфортном темпе.
            </p>
          </article>

          <article class="info-card card">
            <div class="info-card__icon">🧸</div>
            <h3>Раннее развитие малышей (0–3 года)</h3>
            <p>
              Игровое сопровождение развития, сенсорные практики,
              поддержка контакта и участие родителей в процессе.
            </p>
          </article>

          <article class="info-card card">
            <div class="info-card__icon">🌿</div>
            <h3>Поддержка детей с особенностями развития</h3>
            <p>
              Бережное сопровождение, рекомендации семьям
              и участие профильных специалистов в маршруте помощи.
            </p>
          </article>
        </div>
      </div>
    </section>

    <NewsSection :is-admin="isAdmin" />

    <section class="section" id="events">
      <div class="container">
        <div class="section-head">
          <div class="pill">Мероприятия</div>
          <h2 class="section-title">Встречи, семинары и конференции</h2>
          <p class="section-subtitle">
            Пользователи могут знакомиться с анонсами мероприятий, а зарегистрированные участники —
            оставлять отзывы и комментарии.
          </p>
        </div>

        <div v-if="isAdmin" class="events-admin-wrap">
          <EventAdminForm />
        </div>

        <div class="events-list">
          <EventCard
            v-for="item in visibleEvents"
            :key="item.id"
            :event="item"
            :is-admin="isAdmin"
            @delete-event="eventsStore.deleteEvent"
          />
        </div>

        <div v-if="hasMoreEvents" class="section-more">
          <button class="btn btn-secondary" @click="showMoreEvents">
            Показать ещё мероприятия
          </button>
        </div>
      </div>
    </section>

    <section class="section" id="contacts">
      <div class="container">
        <div class="contacts-grid">
          <div class="contacts__box card">
            <div class="section-head">
              <div class="pill">Контакты</div>
              <h2 class="section-title">Свяжитесь с нами</h2>
              <p class="section-subtitle">
                Здесь позже можно подключить реальные контакты центра, форму обратной связи,
                карту и ссылки на мессенджеры.
              </p>
            </div>

            <div class="contact-list">
              <div class="contact-item">
                <strong>Адрес</strong>
                <span>г. Ростов-на-Дону</span>
              </div>
              <div class="contact-item">
                <strong>Телефон</strong>
                <span>+7 (___) ___-__-__</span>
              </div>
              <div class="contact-item">
                <strong>Email</strong>
                <span>info@umka-center.ru</span>
              </div>
            </div>
          </div>

          <div class="contacts__box card">
            <div class="section-head">
              <div class="pill">Поддержка семей</div>
              <h2 class="section-title">Открыты к диалогу и сотрудничеству</h2>
              <p class="section-subtitle">
                Сайт может стать точкой входа для родителей, специалистов и партнёров:
                здесь удобно размещать анонсы, методические материалы и новости центра.
              </p>
            </div>

            <div class="contact-list">
              <div class="contact-item">
                <strong>Для родителей</strong>
                <span>Материалы, мероприятия, новости, полезные рекомендации специалистов.</span>
              </div>
              <div class="contact-item">
                <strong>Для специалистов</strong>
                <span>Обмен практиками, публикация анонсов и развитие профессионального сообщества.</span>
              </div>
              <div class="contact-item">
                <strong>Для центра</strong>
                <span>Единая современная страница с понятной структурой и сильной визуальной подачей.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>