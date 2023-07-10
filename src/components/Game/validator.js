import { useConfigStore } from '../../stores/config';
import { useGameStore } from '../../stores/game';
import { Piece } from './entity/structure';
import {
    rotate,
    inRange,
    applyOnLine,
    includePoint,
    sumOfPoints
} from './entity/utils';
import { toRaw } from 'vue';

const inDebugMode = () => useConfigStore().mode.value == 'debug';

export function getValidities() {
    const { board, currentPlayer, selection } = useGameStore();
    const validityDefault = inDebugMode();
    const validities = Array(9)
        .fill(0)
        .map((x) => Array(9).fill(validityDefault));
    if (inDebugMode()) validities[selection.x][selection.y] = false;
    else
        for (const [x, y] of selection.dropPiece
            ? getDroppablePoints(
                  toRaw(board),
                  toRaw(currentPlayer),
                  toRaw(selection.dropPiece)
              )
            : getValidPoints(toRaw(board), toRaw(currentPlayer), [
                  selection.x,
                  selection.y
              ]))
            validities[x][y] = true;
    return validities;
}

export function canSelect(piece) {
    const { currentPlayer } = useGameStore();
    if (inDebugMode()) return true;
    return piece.facing == currentPlayer.facing && piece.type != -1;
}

export function canPromote(board, fromPoint, toPoint) {
    const { currentPlayer } = useGameStore();
    const [fromX, fromY] = fromPoint;
    const piece = board[fromX][fromY];
    if (inDebugMode()) return true;
    if ([0, 1, 3].includes(piece.type)) {
        const [fromX, fromY] = rotate(fromPoint, [4, 4], -currentPlayer.facing);
        const [toX, toY] = rotate(toPoint, [4, 4], -currentPlayer.facing);
        return fromX < 3 || toX < 3;
    }
}
