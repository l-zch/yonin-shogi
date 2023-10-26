<template>
    <div class="flex h-[100vh] w-[100vw] relative bg-[rgb(var(--v-theme-background-home))]">
        <div class="content flex flex-col w-[70vw] h-[40vh] m-auto lg:w-[40vw] lg:h-[50vh]">
            <div class="content mb-[5cqh] text-center h-[45cqh] w-full">
                <div class="text-[rgb(var(--v-theme-text-base))] text-[min(61cqh,25cqw)] leading-none">四人將棋</div>
                <div class="text-[rgb(var(--v-theme-text-muted))] text-[min(39cqh,16cqw)] leading-none">YONIN SHOGI</div>
            </div>
            <RouterLink to="/lobby" custom v-slot="{navigate}">
                <button @click="navigate" class="button-accent text-[15cqh] w-full h-[20cqh] mb-[5cqh]">進入大廳</button>
            </RouterLink>
            <div class="flex h-[15cqh] w-full">
                <button class="button-muted grow mr-[5cqh] text-[9cqh]">四人將棋規則</button>
                <button class="button-inverted h-full aspect-square flex">
                    <v-icon class="m-auto text-[rgb(var(--v-theme-text-inverted))]" size="12cqh" icon="fab fa-github" />
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';

 </script>

<style lang="postcss">
button {
    @apply
    rounded-[1vmin]
    text-center
}

.button-inverted {
    @apply
    bg-[rgb(var(--v-theme-button-inverted))]
    text-[rgb(var(--v-theme-text-inverted))]
}

.button-accent {
    @apply
    bg-[rgb(var(--v-theme-accent))] 
    text-[rgb(var(--v-theme-text-inverted))]    
}

.button-muted {
    @apply
    bg-[rgb(var(--v-theme-button-muted))] 
    text-[rgb(var(--v-theme-accent-sub))]
}

.content {
    container-type: size;
}
</style>