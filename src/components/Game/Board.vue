<template>
    <div class="relative background w-[100vmin] h-[100vmin]">
        <div class="absolute w-full h-[2%] px-[2%] flex justify-around">
            <text class="text-[3vmin] leading-[2vmin] scale-50" v-for="i in 9">{{ 10 - i }}</text>
        </div>
        <div class="absolute w-[2%] py-[2%] h-full right-0 flex flex-col justify-around">
            <text class="text-[3vmin] leading-none scale-50 m-auto" v-for="i in 9">{{ i }}</text>
        </div>
        <div class="m-[2%] w-[96%] h-[96%] grid border-[0.1vmin] border-black">
            <div class="grid grid-cols-9" v-for="i in 9">
                <Square v-for="j in 9" :piece="board[i - 1][j - 1]" @click="selectSquare(i - 1, j - 1)"></Square>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Square from './Square.vue'
import { useGameStore } from '../../stores/game'
import { move } from './socket'

const { board, selection, select, deselect, isSelected } = useGameStore();


function selectSquare(x, y) {
    if (!isSelected()) {
        select(x, y)
    } else if (x == selection.x && y == selection.y) {
        deselect()
    } else {
        move([selection.x, selection.y], [x, y],selection.dropPiece?.type, 0);
        deselect()
    }
}

</script>

<style lang="postcss">
.background {
    @apply bg-[url("https://pic.616pic.com/ys_img/00/09/26/HdlzqX0hmc.jpg")] bg-cover
}
</style>