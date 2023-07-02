<template>
    <div class="flex flex-wrap">
        <Board></Board>
        <div class="w-full max-w-[100vmin]  bg-white">
            <InfoBar v-for="i in 4"></InfoBar>
        </div>
    </div>
</template>

<script setup>
import Board from "./Game/Board.vue";
import InfoBar from "./Game/InfoBar.vue";

</script>

<style></style>