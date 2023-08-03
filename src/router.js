import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

import Home from './views/Home.vue'
import Lobby from './views/Lobby.vue'
import Game from './views/Game.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/lobby', component: Lobby },
    { path: '/game', component: Game }
]

export const router = createRouter({
    history: createWebHistory('/yonin-shogi/'),
    routes
})
