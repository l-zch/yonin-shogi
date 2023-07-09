import { Piece } from "./shogi";

export function convertToBoard(arr, rotation) {
    const length = 9; // Math.sqrt(arr.length)
    const board = [];

    for (let i = 0; i < length; i++) {
        const row = [];
        for (let j = 0; j < length; j++) {
            let index;
            if (rotation == 0) {
                index = i * length + j;
            } else if (rotation == 1) {
                index = length - 1 - i + j * length;
            } else if (rotation == 2) {
                index = (length - 1 - i) * length + (length - 1 - j);
            } else {
                index = i + (length - 1 - j) * length;
            }
            row.push(convertToPiece(arr[index], rotation));
        }
        board.push(row);
    }
    return board;
}

function convertToPiece(pieceData, rotation) {
    const { type, owner } = pieceData
    if(type==-1 || owner == -1)
        return new Piece(-1,-1)
    return new Piece(type, (owner-rotation+4)%4)
}


export function rotate(point, center, n) {
    let rotatedX = point[0] - center[0];
    let rotatedY = point[1] - center[1];

    for (let i = 0; i < (n+4)%4; i++) {
        const tempX = rotatedX;
        rotatedX = rotatedY;
        rotatedY = -tempX;
    }

    return [rotatedX + center[0], rotatedY + center[1]];
}

export function convertPlayers(arr, rotation){
    const length =  4 // arr.length
    const shifts = rotation%length
    return [...arr.slice(shifts), ...arr.slice(0,shifts)]
}

export function applyOnLine(origin, direction, fn) {
    let [x, y] = origin;
    let [dx, dy] = direction;
    x += dx
    y += dy
    while (inRange(x, 0, 8) && inRange(y, 0, 8)) {
        if (fn(x, y)) break;
        x += dx;
        y += dy;
    }
}

export function inRange(n, min, max){
    return n >= min && n <= max;
}

export function includePoint(points, point) {
    return points.some(([x,y]) => x === point[0] && y === point[1])
}

export function sumOfPoints(pointA, pointB) {
    return [pointA[0]+pointB[0], pointA[1]+pointB[1]]
}