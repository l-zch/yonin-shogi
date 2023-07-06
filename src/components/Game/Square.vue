<template>
    <div class="border-[0.1vmin] border-black relative select-none">
        <div class="absolute w-full h-full" :style="{ transform: `rotate(${90 * props.piece.facing}deg)` }">
            <div class="absolute w-full h-full bg-white bg-opacity-30 z-10" v-if="selected"></div>
            <Piece v-if="props.piece.type != -1" class="absolute w-full h-full z-20"
                :facing="props.piece.facing"
                :selected="selected"
                :type="props.piece.type"></Piece>
        </div>
    </div>
</template>

<script setup>
import Piece from "./Piece.vue"

const props = defineProps({
    piece: Object,
    selected: Boolean
})
</script>

<style>
</style>