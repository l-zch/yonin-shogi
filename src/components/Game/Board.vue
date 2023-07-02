<template>
    <div class="relative background w-[80%] h-[80%]">
        <div class="absolute w-full h-[2%] px-[2%] flex justify-around">
            <text class="text-[3vmin] leading-[2vmin] scale-50" v-for="i in 9">{{ 10-i }}</text>
        </div>
        <div class="absolute w-[2%] py-[2%] h-full right-0 flex flex-col justify-around">
            <text class="text-[3vmin] leading-none scale-50 w-[2%]" v-for="i in 9">{{ i }}</text>
        </div>
        <div class="m-[2%]  w-[96%] h-[96%] grid border border-black">
            <div class="grid grid-cols-9" v-for="i in 9">
            
                <Square v-for="i in 9"></Square>
            </div>
        </div>
    </div>
</template>

<script setup>
import Square from './Square.vue'
</script>

<style lang="postcss">
.background{
    @apply
    bg-[url("https://pic.616pic.com/ys_img/00/09/26/HdlzqX0hmc.jpg")]
    bg-cover
}
</style>