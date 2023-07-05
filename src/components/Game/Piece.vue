<template>
    <div class="piece relative flex rotate-90" :style="{transform: `rotate(${90*props.facing}deg) scale(${size[type]})`}">
        <text class="m-auto z-10 text-[55cqw] font-normal">{{symbols[type][promoted]}}</text>
        <img class="absolute" :src="piece_path_url[props.facing]">
    </div>
</template>

<script setup>

const piece_path = [
    "pieceForward.png",
    "pieceRight.png",
    "pieceBackward.png",
    "pieceLeft.png"
]


const symbols = [['步', 'と'], ['銀', '全'], ['金', ''], ['飛', '龍'], ['王', ''],]
const size = [0.8, 0.9, 0.9, 1, 1]

const props = defineProps({
    facing: Number,  // 0:forward 1:right 2:backward 3:left
    type: Number,    // 0:pawn 1:silver 2:gold 3:rook 4:king
    promoted: Number // 0:false 1:true
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