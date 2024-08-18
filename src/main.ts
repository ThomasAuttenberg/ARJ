import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import VIntersection from '@/directives/VIntersection'

const app = createApp(App).directive('intersection', VIntersection)

app.use(createPinia())
app.use(router)

app.mount('#app')
