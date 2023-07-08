<template>
    <div class="border-[0.1vmin] relative select-none" :style="{borderColor:boardConfig.gridColor}">
        <div class="absolute w-full h-full" :style="{ transform: `rotate(${90 * props.piece.facing}deg)` }">
            <div class="absolute w-full h-full bg-white bg-opacity-30 z-10" v-if="selected"></div>
            <Piece v-if="props.piece.type != -1" class="absolute w-full h-full z-20" :facing="props.piece.facing"
                :selected="selected" :type="props.piece.type"></Piece>
        </div>
    </div>
</template>

<script setup>
import Piece from "./Piece.vue"
import { useConfigStore } from "../../stores/config";

const { boardConfig } = useConfigStore();

const props = defineProps({
    piece: Object,
    selected: Boolean
})
</script>

<style></style>