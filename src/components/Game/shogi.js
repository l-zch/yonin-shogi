export class Piece {
    constructor(id, owner) {
        this.id = id;
        this.owner = owner;
    }

    canMove(square) {
        return true
    }
}

export function createShogiBoard() {
    const board = Array.from({ length: 9 }, () =>
        Array(9)
            .fill()
            .map((u) => new Piece(-1, -1))
    );
    setup(board);
    return board;
}

export function move(board, fromPoint, toPoint) {
    const [fromX, fromY] = fromPoint;
    const [toX, toY] = toPoint;
    if (fromX == -1) {
        // TODO: drop piece
        return
    }
    const piece = board[fromX][fromY];
    if (piece.canMove(toPoint)) {
        board[toX][toY] = piece;
        board[fromX][fromY] = new Piece(-1, -1);
    }
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

function print(s, end = '\n') {
    process.stdout.write(s + end);
}

function print_board(board) {
    for (let i = 0; i < 9; ++i) {
        for (let j = 0; j < 9; ++j) {
            let piece = board[i][j];
            if (piece.id == -1) {
                print('  ', (end = ''));
                continue;
            }
            print(['步', '銀', '金', '飛', '王'][piece.id], (end = ''));
        }
        print('');
    }
}

function rotate(point, center, n) {
    let rotatedX = point[0] - center[0];
    let rotatedY = point[1] - center[1];

    for (let i = 0; i < n; i++) {
        const tempX = rotatedX;
        rotatedX = rotatedY;
        rotatedY = -tempX;
    }

    return [rotatedX + center[0], rotatedY + center[1]];
}
