<template>
    <div class="flex w-full border-[0.3vmin] h-[10vmin]">
        <div class="bg-gray-300 flex-grow mr-[2vmin]">Ray</div>
        <div class="bg-green-300 mr-[2vmin]">179:59</div>
        <PieceStand :piecesInHand="piecesInHand"></PieceStand>
    </div>
</template>


<script setup>
import PieceStand from './PieceStand.vue'
import { reactive } from 'vue';

const piecesInHand = reactive([0,0,0,0])
</script>

<style>
</style>