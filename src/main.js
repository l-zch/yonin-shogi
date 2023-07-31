import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import App from './App.vue'
import './index.css'

import GameView  from './components/GameView.vue'
import HomeView from './components/HomeView.vue'
import LobbyView from './components/LobbyView.vue'


const routes = [
    { path: '/yonin-shogi/', component: HomeView },
    { path: '/yonin-shogi/lobby', component: LobbyView },
    { path: '/yonin-shogi/game', component: GameView }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.mount('#app')