import { io } from 'socket.io-client';
import { rotate } from '../entity/utils';
import { Player, Piece } from '../entity/structure';
import { useGameStore } from '../../../stores/game';

const apiURL = 'https://yonin-shogi.s1091026.repl.co/game';
var socket = io();

function convertToPiece(pieceData, rotation) {
    const { type, owner } = pieceData;
    if (type == -1 || owner == -1) return new Piece(-1, -1);
    return new Piece(type, (owner - rotation + 4) % 4);
}

function convertToPlayers(playersData, rotation) {
    const shifts = rotation % 4;
    const players = []
    for (let i = 0; i < 4; ++i){
        const { piecesInHand, checkmated } = playersData[(i+rotation)%4]
        players.push(new Player(i, piecesInHand, checkmated))
    }
    [...arr.slice(shifts), ...arr.slice(0, shifts)];
    
}

function convertToBoard(arr, rotation) {
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


export const useSocket = () => {
    function setup() {
        socket = io(apiURL);
        socket.on('update', (res) => {
            const { viewer, currentPlayer, board, players } = useGameStore();
            Object.assign(board, convertToBoard(res[0], viewer.facing));
            Object.assign(players, convertToPlayers(res[1], viewer.facing));
            currentPlayer.facing = (res[2] - viewer.facing + 4) % 4;
            // for (let i = 0; i < 4;++i)
            // piecesInHand[(viewer.facing-i+4)%4] = res[1][i]
            // res[1].forEach((pieces, index) => piecesInHand[(viewer.facing-index+4)%4] = pieces)
        });
        socket.emit('join');
        return socket;
    }

    function move(origin, destination, promotion) {
        const { viewer } = useGameStore();
        socket.emit('move', [
            rotate(origin, [4, 4], viewer.facing),
            rotate(destination, [4, 4], viewer.facing),
            promotion
        ]);
    }

    function drop(destination, pieceType) {
        const { viewer } = useGameStore();
        socket.emit('drop', [
            rotate(destination, [4, 4], viewer.facing),
            pieceType
        ]);
    }
    return { socket, setup, move, drop };
};

/*
[
    [Chess ... {type:Number, owner:Number}],
    [Player ... { id:Number, piecesInHand:[count_type_0, count_type_1 ...] } ]
]
*/
