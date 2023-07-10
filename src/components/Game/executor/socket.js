import { io } from 'socket.io-client';
import { rotate, convertToBoard, convertPlayers } from '../utils';
import { useGameStore } from '../../../stores/game';

const apiURL = 'https://yonin-shogi.s1091026.repl.co/game';
var socket = io();

export const useSocket = () => {
    function setup() {
        socket = io(apiURL);
        socket.on('update', (res) => {
            const { viewer, currentPlayer, board, players } = useGameStore();
            Object.assign(board, convertToBoard(res[0], viewer.facing));
            Object.assign(players, convertPlayers(res[1], viewer.facing));
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
