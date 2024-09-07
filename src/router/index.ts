import { createRouter, createWebHistory } from 'vue-router'

const getIndent = ()=>{
  if(window.innerWidth >= 1181){
    return 145;
  }else if(768 <= window.innerWidth && window.innerWidth < 1181){
    return 113;
  }else{
    return 50;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: savedPosition.top,
          left: savedPosition.left,
          behavior: 'instant', // Прокрутка без анимации
        });
      });
    }
    if(to.hash){
      router.replace({ path: to.path, query: to.query});
      const element = document.querySelector(to.hash);
      if (element) {
        const offset = element.getBoundingClientRect().top + window.scrollY - getIndent();
        setTimeout(()=> {
          window.scrollTo({
            top: offset,
            behavior: 'smooth',
          })
        });
      }
    }
    if(to.name != from.name) return {top:0};
    return {};
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
      path:'/offer',
      name: 'offer',
      component: () => import('@/views/OfferPage.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFound.vue')
    }
  ]
})

export default router
