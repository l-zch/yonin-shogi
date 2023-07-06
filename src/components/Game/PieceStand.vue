<template>
    <div class="bg-red-400  flex flex-row">
        <div v-for="(number, type) in players[props.facing].piecesInHand" class="relative h-full" @click="selectPiece(type)">
            <div class="absolute text-[3vmin] shadow-white top-0 right-[10%] z-10 text-stroke"> {{ number }} </div>
            <PieceVue :type="type" :facing="props.facing" class="h-full" ></PieceVue>
        </div>
    </div>
</template>

<script setup>
import PieceVue from './Piece.vue'
import { useGameStore } from '../../stores/game'
import { Piece } from './shogi'

const props = defineProps({
    facing: Number,
})
const { select, deselect, players } = useGameStore();

function selectPiece(type) {
    deselect();
    select(-1, -1, new Piece(type, props.facing))
}

</script>

<style>
.text-stroke {
    text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff;
}
</style>