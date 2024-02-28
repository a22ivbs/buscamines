"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
console.log('board.ts');
var tableroSize = 25;
var Board = /** @class */ (function () {
    function Board() {
        this.board = this.createBoard();
    }
    Board.prototype.createBoard = function () {
        var positions = new Array(tableroSize).fill(0);
        var minePositions = [];
        while (minePositions.length < 8) {
            var randomPos = Math.floor(Math.random() * 25);
            if (minePositions.indexOf(randomPos) === -1)
                minePositions.push(randomPos);
        }
        minePositions.forEach(function (pos) { return positions[pos] = 'x'; });
        var finalBoard = [];
        while (positions.length)
            finalBoard.push(positions.splice(0, 5));
        return finalBoard;
    };
    Board.prototype.printBoard = function () {
        var boardElement = document.getElementById('board');
        if (boardElement) {
            boardElement.innerHTML = this.board.map(function (row) { return '<div>' + row.join(' ') + '</div>'; }).join('');
        }
    };
    return Board;
}());
var board = new Board();
board.printBoard();
