<template>
    <div class="relative select-none">
        <div class="absolute w-full h-full border-[0.1vmin] bg-opacity-[0.1]" :style="{
            borderColor:boardConfig.gridColor,
            backgroundColor:selected?'#ffffff4D':''
            }"></div>
        <div class="absolute w-full h-full z-10" :style="{ transform: `rotate(${90 * props.piece.facing}deg)` }">
            <Piece v-if="props.piece.type != -1" class="absolute w-full h-full z-10" :facing="props.piece.facing"
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