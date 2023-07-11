import { useConfigStore } from '../../stores/config';
import { useGameStore } from '../../stores/game';
import { rotate } from './entity/utils';
import { getValidPoints, getDroppablePoints, isThreatened, getPointKing } from './entity/validator'
import { toRaw } from 'vue';


const inDebugMode = () => useConfigStore().mode.value == 'debug';

function getValidities() {
    const { board, players, currentPlayer, selection } = toRaw(useGameStore());
    const validityDefault = inDebugMode();
    const validities = Array(9)
        .fill(0)
        .map((x) => Array(9).fill(validityDefault));
    if (inDebugMode()) validities[selection.x][selection.y] = false;
    else
        for (const [x, y] of selection.dropPiece
            ? getDroppablePoints(
                board,
                players,
                currentPlayer.facing,
                selection.dropPiece
              )
            : getValidPoints(
                board,
                players, currentPlayer.facing,
                [ selection.x, selection.y ]))
            validities[x][y] = true;
    return validities;
}

function canSelect(piece) {
    const { currentPlayer } = useGameStore();
    if (inDebugMode()) return true;
    return piece.facing == currentPlayer.facing && piece.type != -1;
}

function canPromote(point) {
    const { selection, board, currentPlayer } = useGameStore();
    const piece = board[selection.x][selection.y];
    if (inDebugMode()) return true;
    if ([0, 1, 3].includes(piece.type)) {
        const [fromX, fromY] = rotate(point, [4, 4], -currentPlayer.facing);
        const [toX, toY] = rotate(point, [4, 4], -currentPlayer.facing);
        return fromX < 3 || toX < 3;
    }
}

function getCheckedPlayers() {
    const { board, players } = toRaw(useGameStore())
    const checkedPlayers = []
    for (const player of players) {
        if (!player.checkmated && isThreatened(board, players, getPointKing(board, player.facing)))
            checkedPlayers.push(player)
    }
    return checkedPlayers
}

export { getValidities, canSelect, canPromote, getCheckedPlayers }