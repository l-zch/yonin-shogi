<template>
    <div class="relative background w-[100vmin] h-[100vmin]">
        <div class="absolute w-full h-[2%] px-[2%] flex justify-around">
            <text class="text-[3vmin] leading-[2vmin] scale-50" v-for="i in 9">{{ 10 - i }}</text>
        </div>
        <div class="absolute w-[2%] py-[2%] h-full right-0 flex flex-col justify-around">
            <text class="text-[3vmin] w-[2%] leading-none scale-50 m-auto" v-for="i in 9">{{ boardConfig.notation=='japanese' ? "一二三四五六七八九"[i-1] : i}}</text>
        </div>
        <div class="m-[2%] w-[96%] h-[96%] grid border-[0.1vmin]" :style="{borderColor:boardConfig.gridColor}">
            <div class="grid grid-cols-9" v-for="i in 9">
                <div class="relative" v-for="j in 9">
                    <Square class="w-full h-full" :piece="board[i - 1][j - 1]" @click="selectSquare(i - 1, j - 1)"
                        :selected="(i - 1) == selection.x && (j - 1) == selection.y"> </Square>
                    <div v-if="(i - 1) == promotionDialog.x && (j - 1) == promotionDialog.y" class="promotionDialog"
                        :style="{ transform: `rotate(${90*promotionDialog.facing}deg) ` }">
                        <Piece :facing="promotionDialog.facing" :type="[5, 6, -1, 7, -1, 5, 6, 7][promotionDialog.type]"
                            :selected="false" @click="promotionDialog.confirm(true)"></Piece>
                        <Piece :facing="promotionDialog.facing" :type="[0, 1, 2, 3, 4, 0, 1, 3][promotionDialog.type]" :selected=" false"
                            @click="promotionDialog.confirm(false)"></Piece>
                    </div>
                    <div class="absolute w-full h-full flex top-0" v-if="hint[i-1][j-1]" @click="selectHint(i-1, j-1)">
                        <div class="m-auto top-1/2 w-[20%] h-[20%] rounded-[50%] bg-slate-500 bg-opacity-70" v-if="!debugMode.on"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import Square from './Square.vue'
import Piece from './Piece.vue';
import { useGameStore } from '../../stores/game'
import { useConfigStore } from '../../stores/config'
import { drop, move } from './socket'
import { canSelect, canDrop, canPromote, getValidities } from './validator';


const { board, selection, select, deselect, isSelected, hint } = useGameStore();
const { boardConfig, debugMode } = useConfigStore();

const promotionDialog = reactive({ x: -1, y: -1, facing: -1, type: -1, confirm: () => { } })


function selectSquare(x, y) {
    promotionDialog.x = -1
    if (!isSelected())
        if (canSelect(board[x][y]))
            select(x, y)
        else deselect()
    else if (selection.dropPiece && canDrop([x, y], selection.dropPiece))
        drop([x, y], selection.dropPiece.type);
    else 
        deselect()
}

function selectHint(x, y) {
    if (canPromote(board, [selection.x, selection.y], [x, y])) {
        showPromoteDialog(x, y)
    } else {
        move([selection.x, selection.y], [x, y], false);
        deselect()
    }
}

function showPromoteDialog(x, y) {

    const piece = board[selection.x][selection.y]
    Object.assign(
        promotionDialog,
        {
            x: x,
            y: y,
            facing: piece.facing,
            type: piece.type,
            confirm: (choice) => {
                move([selection.x, selection.y], [x, y], choice)
                promotionDialog.x = -1
                deselect()
            }
        })
    return
}

</script>

<style lang="postcss">
.background {
    @apply bg-[url("https://pic.616pic.com/ys_img/00/09/26/HdlzqX0hmc.jpg")] bg-cover
}

.promotionDialog {
    filter: drop-shadow(0 1vmin 1vmin #2b2b2b);
    @apply bg-white absolute w-full h-[200%] top-0 origin-[50%_25%] flex flex-col rounded-[1vmin] z-10
}
</style>