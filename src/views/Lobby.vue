<template>
    <div
        class="relative flex h-[100vh] w-[100vw] flex-col items-center justify-around bg-[rgb(var(--v-theme-background-lobby))]">
        <Header class="w-[30vw] h-[20vh]" title="大廳" subtitle="ＬＯＢＢＹ"></Header>
        <button class="button-accent m-[3vh] h-[12vh] w-[80vw] text-[7vh]">
            創建棋局
        </button>
        <div
            class="content h-[60vh] w-full rounded-t-md border-[1px] border-[rgb(var(--v-theme-border-panel))] p-[3cqw]">
            <div class="mb-[3cqw] flex items-center h-[15cqh]">
                <text class="text-[10cqh] leading-none text-[rgb(var(--v-theme-text-muted))]">
                    棋局
                </text>
                <RouterLink to="/game" custom v-slot="{ navigate }">
                    <button @click="navigate" class="button-muted ml-auto h-[15cqh] w-[60cqw] text-[10cqh] leading-none">
                        單機棋局
                    </button>
                </RouterLink>
            </div>
            <div class="relative overflow-auto h-[85cqh]">
            <table class="w-full border-solid border-separate border-spacing-y-2 text-center text-[4cqh]">
                <tr class="text-[rgb(var(--v-theme-text-muted))] sticky top-0 bg-[rgb(var(--v-theme-background-lobby))]">
                    <th>ID</th>
                    <th>時制</th>
                    <th>人數</th>
                </tr>
                <tr v-for="i in  20" class="[&>*:nth-child(n)]:bg-[rgb(var(--v-theme-background-panel))] h-[10cqh]">
                    <td class="rounded-l-md">{{ i }}</td>
                    <td>10|30</td>
                    <td class="rounded-r-md"> 1/4 </td>
                </tr>
            </table>
            </div>
        </div>
    </div>
</template>

<script setup>
import Header from "../components/ui/Header.vue"

</script>

<style lang="postcss">
.content {
    container-type: size;
}

.panel {
    grid-template-columns: repeat(auto-fill, minmax(200px,1fr));
}
</style>
