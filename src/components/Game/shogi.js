import { rotate } from './utils';

export class Piece {
    constructor(type, facing) {
        this.type = type;
        this.facing = facing;
    }
}

export function createShogiBoard() {
    const board = Array.from({ length: 9 }, () =>
        Array(9)
            .fill()
            .map((u) => new Piece(-1, -1))
    );
    // setup(board);
    return board;
}


export function createPlayers() {
    return Array.from({ length: 4 }, () => {
        return { piecesInHand: [0, 0, 0, 0]}
    })
}

function setup(board) {
    [
        [[6, 4], 0],
        [[7, 3], 0],
        [[7, 4], 3],
        [[7, 5], 0],
        [[8, 2], 1],
        [[8, 3], 2],
        [[8, 4], 4],
        [[8, 5], 2],
        [[8, 6], 1]
    ].forEach((args) => {
        for (let n = 0; n < 4; ++n) {
            const [rotatedX, rotatedY] = rotate(args[0], [4, 4], n);
            board[rotatedX][rotatedY] = new Piece(args[1], n);
        }
    });
}
