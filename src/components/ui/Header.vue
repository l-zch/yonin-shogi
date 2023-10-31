<template>
    <div class="container text-center flex flex-col justify-center select-none leading-none">
        <text class="text-[rgb(var(--v-theme-text-base))] whitespace-nowrap"
            :style="{ fontSize: `${100 / props.title.length }cqw` }">{{ props.title }}</text>
        <text class="text-[rgb(var(--v-theme-text-muted))] whitespace-nowrap"
            :style="{ fontSize: `${100 / props.subtitle.length }cqw` }">{{ props.subtitle }}</text>
    </div>
</template>


<script setup>

const props = defineProps({
    title: String,
    subtitle: String
})

</script>

<style scoped>
.container {
    container-type: size;
}
</style>