<template>
    <div class="container text-center flex flex-col justify-center select-none">
        <div class="text-[rgb(var(--v-theme-text-base))] leading-none"
            :style="{ fontSize: `${100 / props.title.length - 0.1}cqw` }">{{ props.title }}</div>
        <div class="text-[rgb(var(--v-theme-text-muted))] leading-none"
            :style="{ fontSize: `${100 / props.subtitle.length - 0.1}cqw` }">{{ props.subtitle }}</div>
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