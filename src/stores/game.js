import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { createShogiBoard, createPlayers } from '../components/Game/shogi';
import { getValidities } from '../components/Game/validator';

export const useGameStore = defineStore('game', () => {
    const viewer = reactive({ id: 0 });
    const currentPlayer = reactive({ facing: -1 });
    const board = reactive(createShogiBoard());
    const players = reactive(createPlayers());
    const selection = reactive({ x: -1, y: -1, dropPiece: null });
    const hint = reactive(Array(9).fill(0).map((x) => Array(9).fill(false)))
    let selected = false;
    function select(x, y, dropPiece = null) {
        selection.x = x;
        selection.y = y;
        selection.dropPiece = dropPiece;
        selected = true;
        Object.assign(hint, getValidities([x, y]))
    }

    function deselect() {
        selection.x = -1;
        selection.y = -1;
        selection.dropPiece = null;
        selected = false;
        Object.assign(hint, Array(9).fill(0).map((x) => Array(9).fill(false)))
    }

    function isSelected() {
        return selected;
    }
    return { viewer, currentPlayer, board, players, selection, hint, isSelected, select, deselect };
});
