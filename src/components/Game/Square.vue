<template>
    <div class="border-[0.1vmin] border-black flex relative">
        <div class="absolute w-full h-full">
            <Piece v-if="props.piece.type != -1" class="m-auto w-full h-full"
                :style="{ transform: `rotate(${90 * props.piece.facing}deg)` }" :facing="props.piece.facing"
                :type="props.piece.type"></Piece>
        </div>
    </div>
</template>

<script setup>
import Piece from "./Piece.vue"

const props = defineProps({
    piece: Object
})
</script>