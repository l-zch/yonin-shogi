<template>
    <div class="flex flex-wrap">
        <Board></Board>
        <div class="w-full max-w-[100vmin]  bg-white">
            <InfoBar v-for="i in 4" :facing="i - 1"></InfoBar>
            <button class="border m-[10px]" @click="setup()">new game</button>
            <Dashboard></Dashboard>
        </div>
    </div>
</template>

<script setup>
import Board from "../components/game/Board.vue";
import InfoBar from "../components/game/InfoBar.vue";
import { setup } from "../components/game/executor"
import { useGameStore } from "../stores/game"

const { viewer } = useGameStore()
viewer.facing = 0

</script>

<style></style>