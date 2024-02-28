console.log('board.ts');
const tableroSize = 25;
import {Cell} from './src/cell.js';
class Board {
    private board: (number | 'x')[][];
    
    constructor() {
        this.board = this.createBoard();
    }

    createBoard(){
        let positions = new Array(tableroSize).fill(0);

        let minePositions = [];
        while(minePositions.length < 8) {
            let randomPos = Math.floor(Math.random() * 25); 
            if(minePositions.indexOf(randomPos) === -1) minePositions.push(randomPos);
        }

        minePositions.forEach(pos => positions[pos] = 'x');

        let finalBoard = [];
        while(positions.length) finalBoard.push(positions.splice(0,5));

        return finalBoard;
    }

    printBoard() {
        let boardElement = document.getElementById('board');
        if (boardElement) {
            boardElement.innerHTML = this.board.map(row => '<div>' + row.join(' ') + '</div>').join('');
        }
    }
}

let board = new Board();
board.printBoard();