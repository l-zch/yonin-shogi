<template>
    <div class="bg-red-400  flex flex-row">
        <div v-for="(number, index) in props.piecesInHand" class="relative h-full" @click="selectPiece(index)">
            <div class="absolute text-[3vmin] shadow-white top-0 right-[10%] z-10 text-stroke"> {{ number }} </div>
            <Piece :type="index" :facing="0" class="h-full"></Piece>
        </div>
    </div>
</template>

<script setup>
import Piece from './Piece.vue'

const props = defineProps({
    piecesInHand: Array
})
</script>
<style>
.text-stroke {
    text-shadow: -1px -1px 0 #ffffff, 1px -1px 0 #ffffff, -1px 1px 0 #ffffff, 1px 1px 0 #ffffff;
}
</style>