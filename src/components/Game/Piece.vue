<template>
    <div>
        <div class="aspect-square relative w-full h-full flex" :style="{ transform: `scale(${size[type]})` }">

            <div class="bg-black w-[50%] z-10 m-auto aspect-[3/4]"
                :style="{ 'mask': getMask(type), '-webkit-mask': getMask(type) }"></div>

            <img class="absolute w-full h-full" :src="piece_path_url[props.facing]">
        </div>
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

const textStyle = "hai-yan"
const getMask = (type) => {
    const mapping = ['p0', 's0', 'g0', 'r0', 'k0', 'p1', 's1', 'r1']
    const url = getImageUrl(`appearance/piece/text/${textStyle}/${[mapping[type]]}.svg`)
    return `url(${url}) no-repeat center / contain`
}

const piece_path_url = piece_path.map(getImageUrl)
</script>

<style scoped></style>