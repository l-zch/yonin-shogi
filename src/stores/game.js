import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { createShogiBoard, createPlayers } from '../components/Game/structure';
import { getValidities } from '../components/Game/validator';

export const useGameStore = defineStore('game', () => {
    const viewer = reactive({ id: 0 });
    const currentPlayer = reactive({ facing: 0 });
    const board = reactive(createShogiBoard());
    const players = reactive(createPlayers());
    const selection = reactive({ x: -1, y: -1, dropPiece: null });
    const hint = reactive(
        Array(9)
            .fill(0)
            .map((x) => Array(9).fill(false))
    );
    let selected = false;

    function reset() {
        viewer.id = 0;
        currentPlayer.facing = 0;
        Object.assign(board, createShogiBoard());
        Object.assign(players, createPlayers());
        deselect();
    }

    function select(x, y, dropPiece = null) {
        selection.x = x;
        selection.y = y;
        selection.dropPiece = dropPiece;
        selected = true;
        Object.assign(hint, getValidities());
    }

    function deselect() {
        selection.x = -1;
        selection.y = -1;
        selection.dropPiece = null;
        selected = false;
        Object.assign(
            hint,
            Array(9)
                .fill(0)
                .map((x) => Array(9).fill(false))
        );
    }

    function isSelected() {
        return selected;
    }

    return {
        reset,
        viewer,
        currentPlayer,
        board,
        players,
        selection,
        hint,
        isSelected,
        select,
        deselect
    };
});
