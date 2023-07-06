import { io } from 'socket.io-client';
import { rotate, convertToBoard } from './utils';
import { reactive } from 'vue';
import { useGameStore } from '../../stores/game';


export const gameState = reactive({
    board: Array,
    players: Array
});

const apiURL = 'https://yonin-shogi.s1091026.repl.co/game'; // TODO
export const socket = io(apiURL);

socket.on('update', (res) => {
    const { viewer, board } = useGameStore()
    Object.assign(board, convertToBoard(res[0], viewer.id));
    gameState.players = res[1];
});

export function move(origin, destination, pieceType, promotion) {
    const { viewer } = useGameStore();
    socket.emit('move', [
        rotate(origin, [4, 4], viewer.id),
        rotate(destination, [4, 4], viewer.id),
        promotion ? [5, 6, -1, 7][pieceType] : pieceType
    ]);
}

/*
[
    [Chess ... {type:Number, owner:Number}],
    [Player ... { id:Number, piecesInHand:[count_type_0, count_type_1 ...] } ]
]
*/
