<template>
    <div class="flex flex-wrap">
        <Board></Board>
        <div class="w-full max-w-[100vmin]  bg-white">
            <InfoBar v-for="i in 4" :facing="i - 1"></InfoBar>
            <button class="border m-[10px]" @click="startGame">new game</button>
            <Dashboard></Dashboard>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import Board from "./Game/Board.vue";
import InfoBar from "./Game/InfoBar.vue";

import { socket } from "./Game/socket"
import { useGameStore } from "../stores/game"
import Dashboard from './Dashboard.vue';

const { viewer } = useGameStore()
viewer.facing = 0

function startGame() {
    socket.emit('join')
}
</script>

<style></style>