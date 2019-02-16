import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';

import { allTetrominos, iTetromino, oTetromino } from './Tetrominos';

import blankGameBoard from "./blankGameBoard";
import '../styles.css';

const config = require('../config');

class Game extends Component {
    constructor() {
        super();
        this.state = {
            gameBoard: [],
            currentPiece: iTetromino,
            nextPiece: oTetromino,
            level: 1,
            timeElapsed: 0
        }

        this.gameLoop = this.gameLoop.bind(this);
        this.updateGameBoard = this.updateGameBoard.bind(this);
    }

    componentDidMount() {
        const firstPiece = allTetrominos[Math.floor(Math.random() * 7)];
        const secondPiece = allTetrominos[Math.floor(Math.random() * 7)];

        firstPiece.x = config.startingXPosition;
        firstPiece.y = config.startingYPosition;
        this.setState({
            gameBoard: blankGameBoard,
            currentPiece: firstPiece,
            nextPiece: secondPiece
        });

        setInterval(this.gameLoop(), 1000);
    }

    gameLoop() {
        this.setState(prevState => {
            const updatedGameBoard = this.updateGameBoard(prevState.gameBoard, prevState.currentPiece);

            return { 
                gameBoard: updatedGameBoard,
                currentPiece: prevState.currentPiece,
                nextPiece: prevState.nextPiece
            };
        });
    }

    updateGameBoard(gameBoard, currentPiece) {
        let newGameBoard = gameBoard;

        // Draw piece around axis
        const axisRelativeToPieceYPos = currentPiece.axis[0];
        const axisRelativeToPieceXPos = currentPiece.axis[1];
        const piece = currentPiece.piece;

        for(let y = 0; y < currentPiece.piece.length; y++) {
            for(let x = 0; x < currentPiece.piece[y].length; x++) {
                if (piece[y][x] > 0) {
                    let newYPos = 0;
                    let newXPos = 0;
 
                    // In order to ensure the difference between the realtive 
                    // axis point and the current point in the loop is positive,
                    // I need to check whether or not x/y is less than
                    // or equal to the relative axis position in order
                    // to determine the order of the elements

                    if (y <= axisRelativeToPieceYPos) {
                        let yDifference = axisRelativeToPieceYPos - y;
                        newYPos = currentPiece.y - yDifference;
                    }
                    else {
                        let yDifference = y - axisRelativeToPieceYPos;;
                        newYPos = currentPiece.y + yDifference;
                    }

                    if (x <= axisRelativeToPieceXPos) {
                        let xDifference = axisRelativeToPieceXPos - x;
                        newXPos = currentPiece.x - xDifference;
                    }
                    else {
                        let xDifference = x - axisRelativeToPieceXPos;
                        newXPos = currentPiece.x + xDifference;
                    }

                    newGameBoard[newYPos][newXPos] = currentPiece.color;
                }
            }
        }
        
        return newGameBoard;
    }

    render() {
        return (
            <div>
                <h1>Tetris</h1>
                <div className="game">
                    <GameBoard 
                        gameBoard={ this.state.gameBoard }
                    />
                    <GameInfo 
                        level={ this.state.level }
                        time={ this.state.timeElapsed }
                        nextPiece= { this.state.nextPiece }
                    />
                </div>
            </div>
        );
    }
}

export default Game;