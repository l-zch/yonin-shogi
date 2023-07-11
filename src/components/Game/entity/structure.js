export class Piece {
    constructor(type, facing) {
        this.type = type;
        this.facing = facing;
    }
}

export class Player {
    constructor(facing, piecesInHand, checkmated) {
        this.facing = facing
        this.piecesInHand = piecesInHand
        this.checkmated = checkmated
    }
}

export function createShogiBoard() {
    return Array.from({ length: 9 }, () =>
        Array(9)
            .fill()
            .map((u) => new Piece(-1, -1))
    );
}

export function createPlayers() {
    return Array.from(
        { length: 4 }, (v, i) => {
            return new Player(i, [0, 0, 0, 0], false)
        }
    )
}