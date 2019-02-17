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
            lines: 0,
            score: 0,
            timeElapsed: 0
        }

        this.gameLoop = this.gameLoop.bind(this);
        this.updateGameBoard = this.updateGameBoard.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.movePieceDown = this.movePieceDown.bind(this);
        this.movePieceLeft = this.movePieceLeft.bind(this);
        this.movePieceRight = this.movePieceRight.bind(this);
        this.hardDropPiece = this.hardDropPiece.bind(this);
        this.rotatePieceRight = this.rotatePieceRight.bind(this);
    }

    componentDidMount() {

        document.addEventListener('keydown', this.handleKeyPress);

        const firstPiece = allTetrominos[Math.floor(Math.random() * 7)];
        const secondPiece = allTetrominos[Math.floor(Math.random() * 7)];

        firstPiece.x = config.startingXPosition;
        firstPiece.y = config.startingYPosition;
        firstPiece.previousX = firstPiece.x;
        firstPiece.previousY = firstPiece.y;

        this.setState({
            gameBoard: blankGameBoard,
            currentPiece: firstPiece,
            nextPiece: secondPiece
        });

        setInterval(this.gameLoop, 1000);
    }

    handleKeyPress(event) {
        const keys = {
            w: 87,
            a: 65,
            s: 83,
            d: 68,
            space: 32,
            slash: 191
        };

        if (event.keyCode === keys.a) {
            this.movePieceLeft();
        }
        else if (event.keyCode === keys.d) {
            this.movePieceRight();
        }
        else if (event.keyCode === keys.s) {
            this.movePieceDown();
        }
        else if (event.keyCode === keys.space) {
            this.hardDropPiece();
        }
        else if (event.keyCode === keys.slash) {
            this.rotatePieceRight();
        }
    }

    movePieceLeft() {
        console.log("Move left!");
    }

    movePieceRight() {
        console.log("Move Right!");
    }

    movePieceDown() {
        console.log("Move Down!");
    }

    hardDropPiece() {
        console.log("Drop Piece!");
    }

    rotatePieceRight() {
        console.log("Roate Piece Right!");
    }

    checkIfValidMove() {
        this.setState(prevState => {
           const oldBoard = prevState.gameBoard.map(row => {
                return row.map(grid => grid);
           });

           let updateSuccess = this.updateGameBoard(prevState.gameBoard, prevState.currentPiece);

           return {
                gameBoard: updateSuccess ? prevState.gameBoard : oldBoard
           };
        });
    }

    gameLoop() {
        // Apply Gravity
        // Clear any lines if applicable

        // Update Score
        // Render Piece to Screen
        this.setState(prevState => {
            const updatedGameBoard = prevState.gameBoard.map((row) => { return row.map(() => 0);
            });

            this.updateGameBoard(updatedGameBoard, prevState.currentPiece);

            let piece = prevState.currentPiece;
            return { 
                gameBoard: prevState.gameBoard,
                currentPiece: piece
            };
        });
    }

    updateGameBoard(gameBoard, currentPiece) {

        // Draw piece around axis
        const axisRelativeToPieceYPos = currentPiece.axisPositionY;
        const axisRelativeToPieceXPos = currentPiece.axisPositionX; 

        for(let y = 0; y < currentPiece.piece.length; y++) {

            // Only draw the piece if it's visible on the gameboard
            if (y < axisRelativeToPieceYPos) {
                continue; 
            }

            for(let x = 0; x < currentPiece.piece[y].length; x++) {
                if (currentPiece.piece[y][x] > 0) {

                    if (gameBoard[y][x] !== 0 || gameBoard[y][x] !== currentPiece.color) {
                        return false;
                    }

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

                    gameBoard[newYPos][newXPos] = currentPiece.color;
                }
            }
        }
        
        return true;
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
                        nextPiece={ this.state.nextPiece }
                        lines={ this.state.lines }
                        score={ this.state.score }
                    />
                </div>
            </div>
        );
    }
}

export default Game;