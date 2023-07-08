import { useConfigStore } from "../../stores/config";
import { useGameStore } from "../../stores/game"
import { rotate } from "./utils"

function inDebugMode() {
    return useConfigStore().debugMode.on    
}

export function canSelect(x,y){
    const { selection, board, currentPlayer } = useGameStore()
    if (inDebugMode()) {
        return selection.x != x || selection.y != y
    }
    const piece = board[x][y]
    return piece.facing == currentPlayer.facing && piece.type != -1 
}

export function canMove(board, fromPoint, toPoint) {
    const [fromX, fromY] = fromPoint
    const [toX, toY] = toPoint
    if (fromX == fromY && toX == toY) return false
    if(inDebugMode()) return true
    return true
}

export function canDrop(toPoint, pieceType) {
    return true;
}

export function canPromote(board, fromPoint, toPoint) {
    const { currentPlayer } = useGameStore()
    const [fromX, fromY] = fromPoint 
    const piece = board[fromX][fromY]
    if (inDebugMode()) return true
    if ([0,1,3].includes(piece.type)) {
        const [fromX, fromY] = rotate(fromPoint, [4,4], -currentPlayer.facing)
        const [toX, toY] = rotate(toPoint, [4,4], -currentPlayer.facing)
        return fromX  < 3 || toX < 3 
    }
}