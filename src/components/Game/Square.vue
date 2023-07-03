<template>
    <div class="border-[0.1vmin] border-black flex">
        <Piece class="m-auto w-full h-full" :facing="Math.floor(Math.random() * 3)" :type="Math.floor(Math.random()* 5)" :promoted="0"></Piece>
    </div>
</template>

<script setup>
import Piece from "./Piece.vue"
</script>