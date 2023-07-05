<template>
    <div class="border-[0.1vmin] border-black flex relative">
        <div class="absolute w-full h-full">
            <Piece v-if="props.data.id != -1" class="m-auto w-full h-full" :facing="props.data.owner" :type="props.data.id"
                :promoted="0"></Piece>
        </div>
    </div>
</template>

<script setup>
import Piece from "./Piece.vue"

const props = defineProps({
    data: Object
})
</script>