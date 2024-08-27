import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VIntersection from '@/directives/VIntersection'
import { preloadImages } from '@/hooks/ImagesPreloader'
import { determineLocale } from '@/hooks/Locale/LangDeterminator'

preloadImages();

const app = createApp(App).directive('intersection', VIntersection)


app.use(createPinia())
if(import.meta.env.VITE_LOCALIZATION_ON === "true"){
  determineLocale()
}
app.use(router)

app.mount('#app')
