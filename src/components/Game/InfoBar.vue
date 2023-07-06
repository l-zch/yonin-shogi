<template>
    <div class="flex w-full border-[0.3vmin] h-[10vmin]">
        <div class="bg-gray-300 flex-grow mr-[2vmin]">Ray {{currentPlayer.facing == props.facing?'<<':''}}</div>
        <div class="bg-green-300 mr-[2vmin]">179:59</div>
        <PieceStand :facing="props.facing"></PieceStand>
    </div>
</template>


<script setup>
import PieceStand from './PieceStand.vue'
import { useGameStore } from '../../stores/game'

const {currentPlayer} = useGameStore()

const props = defineProps({
    facing: Number
})
</script>

<style>
</style>