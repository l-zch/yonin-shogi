import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import { router } from './router';

const pinia = createPinia()
const app = createApp(App)
app.use(router)
app.use(pinia)
app.mount('#app')