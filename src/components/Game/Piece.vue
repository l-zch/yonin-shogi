<template>
    <div class="piece relative flex rotate-90 aspect-square" :style="{transform: `rotate(${90*props.facing}deg) scale(${size[type]})`}">
        <text class="m-auto z-10 text-[55cqw] font-normal">{{symbols[type]}}</text>
        <img class="absolute w-full h-full" :src="piece_path_url[props.facing]">
    </div>
</template>

<script setup>

const piece_path = [
    "pieceForward.png",
    "pieceRight.png",
    "pieceBackward.png",
    "pieceLeft.png"
]


const symbols = ['步', '銀', '金', '飛', '王', 'と', '全', '龍']
const size = [0.8, 0.9, 0.9, 1, 1]

const props = defineProps({
    facing: Number,  // 0:forward 1:right 2:backward 3:left
    type: Number,    // 0:pawn 1:silver 2:gold 3:rook 4:king 5:prom pawn 6:prom silver 7: dragon
})

const getImageUrl = (name) => {
    return new URL(`../../assets/${name}`, import.meta.url).href
}

const piece_path_url = piece_path.map(getImageUrl)
</script>

<style scoped>
.piece {
    container-type: inline-size;
}
</style>