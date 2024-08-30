import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/views/MainPage.vue'
import NotFound from '@/views/NotFound.vue'
import PolicyPage from '@/views/PolicyPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main
    },
    {
      path:'/policy',
      name: 'policy',
      component: PolicyPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFound
    }
  ]
})

export default router
