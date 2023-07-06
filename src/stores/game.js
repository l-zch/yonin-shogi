import { defineStore } from "pinia";
import { reactive } from "vue";
import { Piece, createShogiBoard } from "../components/Game/shogi";

export const useGameStore = defineStore('game', () => {
    const viewer = reactive({ id:0 })
    const board = reactive(createShogiBoard())
    const selection = reactive({ x: -1, y: -1, dropPiece: null })
    let selected = false
    function select(x, y, dropPiece = null) {
        selection.x = x
        selection.y = y
        selection.dropPiece = dropPiece
        selected = true
    }

    function deselect() {
        select(-1, -1)
        selected = false
    }

    function isSelected() {
        return selected
    }
    return { board, viewer, selection, isSelected, select, deselect }
})