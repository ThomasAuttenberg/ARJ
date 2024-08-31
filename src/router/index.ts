import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    if(to.name == from.name){
      return {};
    }
    return {top:0}
  },
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import("@/views/MainPage.vue")
    },
    {
      path:'/policy',
      name: 'policy',
      component: () => import('@/views/PolicyPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
