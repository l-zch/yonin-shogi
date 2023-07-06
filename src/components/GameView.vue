<template>
    <div class="flex flex-wrap">
        <Board></Board>
        <div class="w-full max-w-[100vmin]  bg-white">
            <InfoBar v-for="i in 4" :owner="i-1"></InfoBar>
        </div>
        <button class="border" @click="startGame">start game</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import Board from "./Game/Board.vue";
import InfoBar from "./Game/InfoBar.vue";

import { socket, gameState } from "./Game/socket"
import { convertToBoard } from "./Game/utils"
import { useGameStore } from "../stores/game"

const { viewer } = useGameStore()
viewer.id = 0

function startGame() {
   socket.emit('join') 
}
</script>

<style></style>