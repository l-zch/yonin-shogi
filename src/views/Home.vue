<template>
    <div class="flex h-[100vh] w-[100vw] relative bg-[rgb(var(--v-theme-background-home))]">
        <div class="container flex flex-col justify-around items-center h-[60vh] m-auto lg:flex-row h:bg-red">
            <Header class="w-[80cqw] lg:w-[45cqw] mb-[30cqh] lg:mb-0" title="四人將棋" subtitle="ＹＯＮＩＮ　ＳＨＯＧＩ"></Header>
            <div class="container flex w-[80cqw] lg:w-[45cqw] lg:justify-center h-[40cqh] full flex-col items-center">
                <RouterLink to="/lobby" custom v-slot="{ navigate }">
                    <button @click="navigate" class="button-accent text-[min(20cqw,30cqh)] w-full h-[50cqh] mb-[10cqh]">進入大廳</button>
                </RouterLink>
                <div class="flex h-[40cqh] w-full">
                    <button class="button-muted grow mr-[10cqh] text-[min(10cqw,25cqh)]">四人將棋規則</button>
                    <button class="button-inverted h-full aspect-square flex">
                        <v-icon class="m-auto text-[rgb(var(--v-theme-text-inverted))]" size="35cqh" icon="mdi:mdi-github" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import Header from '../components/ui/Header.vue'

</script>

<style lang="postcss">
button {
    @apply rounded-md text-center
}

.button-inverted {
    @apply bg-[rgb(var(--v-theme-button-inverted))] text-[rgb(var(--v-theme-text-inverted))]
}

.button-accent {
    @apply bg-[rgb(var(--v-theme-accent))] text-[rgb(var(--v-theme-text-inverted))]
}

.button-muted {
    @apply bg-[rgb(var(--v-theme-button-muted))] text-[rgb(var(--v-theme-accent-sub))]
}

.container {
    container-type: size;
}

@media (min-width: 1024px) {}
</style>