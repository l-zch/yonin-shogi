import { toRaw } from "vue";
import { useConfigStore } from "../../stores/config";
import { useGameStore } from "../../stores/game"
import { Piece } from "./shogi";
import { rotate, inRange, applyOnLine, includePoint, sumOfPoints } from "./utils"


function inDebugMode() {
    return useConfigStore().debugMode.on    
}

export function canSelect(piece){
    const { currentPlayer } = useGameStore()
    if (inDebugMode()) return true 
    return piece.facing == currentPlayer.facing && piece.type != -1 
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


function getValidPoints(board, currentPlayer, point) {
    const [x, y] = point;
    const reachablePoints = getReachablePoints(board, [x, y]);
    const validPoints = reachablePoints.filter(([toX, toY]) => {
        const newBoard = board.map((row) => row.slice());
        newBoard[x][y] = new Piece(-1, -1);
        newBoard[toX][toY] = board[x][y];
        let pointKing = [];
        for (const [x, row] of newBoard.entries())
            for (const [y, piece] of row.entries())
                if (piece.type == 4 && piece.facing == currentPlayer.facing)
                    pointKing = [x, y];
        return !isThreatened(newBoard, pointKing);
    });
    return validPoints;
}

export function getValidities(point) {
    const { board, currentPlayer } = useGameStore();
    const { debugMode } = useConfigStore();
    const validities = Array(9)
        .fill(0)
        .map((x) => Array(9).fill(debugMode.on));
    if (debugMode.on) 
        validities[point[0]][point[1]] = false
    else
        for (const [x, y] of getValidPoints(toRaw(board), toRaw(currentPlayer), point))
            validities[x][y] = true;
    return validities;
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