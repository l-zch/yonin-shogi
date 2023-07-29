<template>
    <div class="bg-red-400 flex flex-row h-full">
        <div v-for="(number, type) in players[props.facing].piecesInHand"
            :class="['relative h-full', number == 0 ? 'opacity-60' : '']" @click="selectPiece(type, number)">
            <div class="absolute text-[3vmin] shadow-white top-0 right-[10%] z-20 text-stroke"> {{ number }} </div>
            <PieceVue :type="type" :facing="props.facing" class="h-full"
                :selected="selection.dropPiece && selection.dropPiece.type == type && selection.dropPiece.facing == props.facing">
            </PieceVue>
        </div>
    </div>
</template>

<script setup>
import PieceVue from './Piece.vue'
import { useGameStore } from '../../stores/game'
import { canSelect } from './validator'
import { Piece } from './entity/structure'

const props = defineProps({
    facing: Number,
})
const { select, deselect, isSelected, selection, players } = useGameStore();

function selectPiece(type, number) {
    const piece = new Piece(type, props.facing)
    if (isSelected())
        deselect()
    else if (number != 0 && canSelect(piece)) {
        select(-1, -1, piece)
    }
}

</script>

<style>
.text-stroke {
    text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff;
}
</style>