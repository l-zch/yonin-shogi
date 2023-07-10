import { useConfigStore } from "../../stores/config";
import { useGameStore } from "../../stores/game"
import { Piece } from "./structure";
import { rotate, inRange, applyOnLine, includePoint, sumOfPoints } from "./utils"
import { toRaw } from "vue";

const inDebugMode = () => useConfigStore().mode.value == "debug" 

export function getValidities() {
    const { board, currentPlayer, selection } = useGameStore();
    const validityDefault = inDebugMode()
    const validities = Array(9)
        .fill(0)
        .map((x) => Array(9).fill(validityDefault));
    if (inDebugMode()) validities[selection.x][selection.y] = false;
    else
        for (const [x, y] of selection.dropPiece
            ? getDroppablePoints(toRaw(board), toRaw(currentPlayer), toRaw(selection.dropPiece))
            : getValidPoints(toRaw(board), toRaw(currentPlayer), [selection.x, selection.y]))
            validities[x][y] = true;
    return validities;
}

export function canSelect(piece){
    const { currentPlayer } = useGameStore()
    if (inDebugMode()) return true 
    return piece.facing == currentPlayer.facing && piece.type != -1 
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

function isOnBoard(x, y){
    return inRange(x, 0, 8) && inRange(y, 0, 8)
}

function getReachablePoints(board, point) {
    const [x, y] = point;
    const piece = board[x][y];
    const MOVEMENTS = {
        '-1': [],
        0: [[-1, 0]],
        1: [[-1, -1], [-1, 0], [-1, 1], [1, -1], [1, 1]],
        2: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]],
        3: [],
        4: [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]],
        5:[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]],
        6:[[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, 0]],
        7: [[-1,-1],[-1,1],[1,-1],[1,1]],
        // 'n':[[-2,-1],[-2,1]],
        // 'l':[[-1,0]],
        // 'b':[[-1,-1],[-1,1],[1,-1],[1,1]],
        // 'B':[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]],
    }
    const reachablePoints = []
    const addReachablePoint = (x, y) => {  if (board[x][y].facing != piece.facing) reachablePoints.push([x, y]) }
    for (const [moveX, moveY] of MOVEMENTS[piece.type]) {
        const [newX, newY] = rotate([x + moveX, y + moveY], [x, y], piece.facing)
        if (isOnBoard(newX, newY)) addReachablePoint(newX, newY)
    }
    
    if ([3, 7].includes(piece.type)) {
        for (let n = 0; n < 4; ++n) {
            applyOnLine(
                [x,y],
                rotate([0, -1], [0, 0], n),
                (x, y) => {
                    if (board[x][y].type != -1) {
                        addReachablePoint(x, y);
                        return true;
                    }
                    addReachablePoint(x, y);
                }
            );
        }
    }
    
    return reachablePoints
}


function isThreatened(board, point) {
    const [x, y] = point
    const piece = board[x][y]
    for(const [dx,dy] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]])
        if (
            isOnBoard(x+dx, y+dy) &&
            board[x+dx][y+dy] != piece.facing &&
            includePoint(getReachablePoints(board,[x+dx,y+dy]), [x,y])
        ) return true;
    
    let result = false
    for (let n = 0; n < 4; ++n){
        applyOnLine(
            [x,y],
            rotate([0, -1], [0,0], n),
            (x, y) => {
                const threateningPiece = board[x][y]
                result |= (threateningPiece.facing != piece.facing && [3,7].includes(threateningPiece.type))
                if (threateningPiece.type != -1)
                    return true
            }
        )
    }

    return result
}


function getPointKing(board, player) {
    let pointKing = [];
    for (const [x, row] of board.entries())
        for (const [y, piece] of row.entries())
            if (piece.type == 4 && piece.facing == player.facing)
                pointKing = [x, y];
    return pointKing

}

function isCheckmated(board, player) {
    for (const [x, row] of board.entries())
        for(const [y, piece] of row.entries())
            if (piece.facing == player.facing && getValidPoints(board, player, [x,y]).length)
                return false
    return true
}

function getValidPoints(board, player, point) {
    const [x, y] = point;
    const piece = board[x][y]
    let [kingX, kingY] = getPointKing(board, player)
    const reachablePoints = getReachablePoints(board, [x, y]);
    const validPoints = reachablePoints.filter(([toX, toY]) => {
        if (board[toX][toY].type == 4) return false
        const newBoard = board.map((row) => row.slice());
        if (piece.type == 4) {
            kingX = toX
            kingY = toY
        }
        newBoard[x][y] = new Piece(-1, -1);
        newBoard[toX][toY] = piece;
        return !isThreatened(newBoard, [kingX, kingY])
    });
    return validPoints;
}

function getColumnsWithPawn(board, currentPlayer) {
    const columnsWithPawn = []
    for(let y = 0; y < 9; ++y)
        applyOnLine(
            rotate([-1, y], [4,4], currentPlayer.facing),
            rotate([1, 0], [0,0], currentPlayer.facing),
            (x, y) => {
            const piece = board[x][y]
            if (piece.type == 0 && piece.facing == currentPlayer.facing) {
                columnsWithPawn.push( currentPlayer.facing % 2 ? x : y)
                return true
            }
        })
    return columnsWithPawn
}

function isDropPawnMate(board, player, point) {
    const [x, y] = sumOfPoints(point, rotate([-1,0],[0,0],player.facing))
    if(!isOnBoard(x,y)) return false
    const piece = board[x][y]
    if (piece.type == 4 && piece.facing != player.facing) {
        const [x, y] = point
        const newBoard = board.map((row) => row.slice());
        newBoard[x][y] = new Piece(0, player.facing)
        if (isCheckmated(newBoard, { facing: piece.facing }))
            return true
    } 
    return false
}

function getDroppablePoints(board, currentPlayer, dropPiece) {
    let droppablePoints = []
    const pointKing = getPointKing(board, currentPlayer)
    for (const [x, row] of board.entries()) for (const [y, piece] of row.entries())
        if (piece.type == -1) {
            const newBoard = board.map((row) => row.slice());
            newBoard[x][y] = dropPiece
            if(!isThreatened(newBoard, pointKing))
                droppablePoints.push([x, y])
        }
    
    if (dropPiece.type == 0) {
        const columnsWithPawn = getColumnsWithPawn(board, currentPlayer)
        droppablePoints = droppablePoints.filter((point) => {
            const [rx,ry] = rotate(point, [4,4], -currentPlayer.facing)
            return rx>0 && !columnsWithPawn.includes(ry) && !isDropPawnMate(board, currentPlayer, point)
        })
    }

    return droppablePoints
}

