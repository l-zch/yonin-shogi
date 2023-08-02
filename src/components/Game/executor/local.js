import { rotate } from '../entity/utils';
import { Piece } from '../entity/structure';
import { useGameStore } from '../../../stores/game';
import { getCheckedPlayers } from '../validator'
import { isCheckmated, isThreatened } from '../entity/validator';


export const useLocal = () => {
    return { setup, move, drop };
};

function setup() {
    const { board } = useGameStore();
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

const promote = (piece) =>
    new Piece({ 0: 5, 1: 6, 3: 7 }[piece.type], piece.facing);

function move(origin, destination, promotion) {
    const { board, currentPlayer, players } = useGameStore();
    const [fromX, fromY] = origin;
    const [toX, toY] = destination;
    const piece = board[fromX][fromY];
    const capturedPiece = board[toX][toY];
    board[fromX][fromY] = new Piece(-1, -1);
    board[toX][toY] = promotion ? promote(piece) : piece;
    if (capturedPiece.type != -1)
        players[currentPlayer.facing].piecesInHand[
            [0, 1, 2, 3, 4, 0, 1, 3][capturedPiece.type]
        ] += 1;
    update();
}

function drop(destination, pieceType) {
    const { board, currentPlayer, players } = useGameStore();
    const [x, y] = destination;
    board[x][y] = new Piece(pieceType, currentPlayer.facing);
    players[currentPlayer.facing].piecesInHand[pieceType] -= 1;
    update();
}

function nextOne(players) {
    const { currentPlayer } = useGameStore();
    const playersRight = players.filter(player => player.facing > currentPlayer.facing)
    return playersRight.length ? playersRight[0]: players[0]
}

function update() {
    const { board, currentPlayer, players } = useGameStore();
    const checkedPlayers = getCheckedPlayers();
    const nextPlayer = nextOne(
            checkedPlayers.length
                ? checkedPlayers
                : players.filter((player) => !player.checkmated)
        )
    currentPlayer.facing = nextPlayer.facing
    if (isCheckmated(board, players, nextPlayer.facing)) {
        if (checkedPlayers.some(player => player.facing == nextPlayer.facing)) {
            players[nextPlayer.facing].checkmated = true;
            update();
        } else if (!nextPlayer.piecesInHand.some((n) => n > 0)) {
            players[nextPlayer.facing].checkmated = true;
            update();
        }
    }

}
    
