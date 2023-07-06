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
    return new Piece(type, (owner-rotation+4)%4)
}


export function rotate(point, center, n) {
    let rotatedX = point[0] - center[0];
    let rotatedY = point[1] - center[1];

    for (let i = 0; i < n; i++) {
        const tempX = rotatedX;
        rotatedX = rotatedY;
        rotatedY = -tempX;
    }

    return [rotatedX + center[0], rotatedY + center[1]];
}
