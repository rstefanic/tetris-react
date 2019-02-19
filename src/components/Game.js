import React, { Component } from 'react';
import { allTetrominos, iTetromino, oTetromino } from './Tetrominos';
import blankGameBoard from "./blankGameBoard";
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';
import '../styles.css';

const config = require('../config');

class Game extends Component {
    constructor() {
        super();
        this.state = {
            gameBoard: [],
            previousPointsDrawn: [],
            currentPiece: iTetromino,
            nextPiece: oTetromino,
            level: 1,
            lines: 0,
            score: 0,
            timeElapsed: 0,
            pieceInSamePos: 0
        }

        this.gameLoop = this.gameLoop.bind(this);
        this.timer = this.timer.bind(this);
        this.updateGameBoard = this.updateGameBoard.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.movePieceDown = this.movePieceDown.bind(this);
        this.movePieceLeft = this.movePieceLeft.bind(this);
        this.movePieceRight = this.movePieceRight.bind(this);
        this.hardDropPiece = this.hardDropPiece.bind(this);
        this.rotatePiece = this.rotatePiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.checkForCollision = this.checkForCollision.bind(this);
        this.clearAnyLines = this.clearAnyLines.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyPress);

        const firstPiece = allTetrominos[Math.floor(Math.random() * 7)];
        const secondPiece = allTetrominos[Math.floor(Math.random() * 7)];

        firstPiece.x = config.startingXPosition;
        firstPiece.y = config.startingYPosition;

        this.setState({
            gameBoard: blankGameBoard,
            currentPiece: firstPiece,
            nextPiece: secondPiece
        });

        setInterval(this.gameLoop, 1000);
        setInterval(this.timer, 1000);
    }

    timer() {
        this.setState(prevState => {
            return {
                timeElapsed: prevState.timeElapsed + 1
            };
        });
    }

    handleKeyPress(event) {
        const keys = {
            w: 87,
            a: 65,
            s: 83,
            d: 68,
            leftArrow: 37,
            rightArrow: 39,
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
        else if (event.keyCode === keys.w || event.keyCode === keys.space) {
            this.hardDropPiece();
        }
        else if (event.keyCode === keys.rightArrow) {
            this.rotatePiece(true);
        }
        else if (event.keyCode === keys.leftArrow) {
            this.rotatePiece(false);
        }
    }

    movePieceLeft() {
        this.movePiece(0, -1);
        this.draw();
    }

    movePieceRight() {
        this.movePiece(0, 1);
        this.draw();
    }

    movePieceDown() {
        this.movePiece(1, 0);
        this.draw();
    }

    hardDropPiece() {
        console.log("Drop Piece!");
    }

    rotatePiece(turnRight) {
        // Move Y up once to see if piece can be rotated;
        // if it cannot be rotated after that, then do not rotate

        let orientation = this.state.currentPiece.orientation;

        turnRight ? orientation++ : orientation--;

        // If it's fully turned right, turn it to position 0
        if (orientation > 3) {
            orientation = 0;
        }

        // If it's fully turned left, turn it to position 3
        if (orientation < 0) {
            orientation = 3;
        }

        let rotatedPiece = this.state.currentPiece;
        rotatedPiece.orientation = orientation;

        let collision = this.checkForCollision(
            this.state.currentPiece.y, 
            this.state.currentPiece.x, 
            rotatedPiece
        );

        if (!collision) {
            console.log(collision);
            console.log("Changing!");
            console.log(this.state.currentPiece);
            this.setState(prevState => {
                return {
                    currentPiece: rotatedPiece
                };
            });

            this.draw();
        }
    }

    gameLoop() {
        if (this.state.pieceInSamePos === 3) {
            this.setCurrentPiece();
        }

        // Clear any lines if applicable
        this.clearAnyLines();

        // Apply Gravity
        this.movePiece(1, 0);

        // Update Score

        // Draw screen
        this.draw();
    }

    setCurrentPiece() {
       this.setState(prevState => {
            let newCurrentPiece = prevState.nextPiece;
            newCurrentPiece.orientation = 0;

            return {
                pieceInSamePos: 0,
                currentPiece: newCurrentPiece
            };
       });

       this.getNextPiece();
    }

    getNextPiece() {
       this.setState(prevState => {
            const newNextPiece = allTetrominos[Math.floor(Math.random() * 7)];
            return {
                nextPiece: newNextPiece
            }
       });
    }

    movePiece(y, x) {
        this.setState(prevState => {
            let pieceInSamePos = prevState.pieceInSamePos;

            let newYPos = prevState.currentPiece.y + y;
            let newXPos = prevState.currentPiece.x + x;

            let collision = this.checkForCollision(newYPos, newXPos, prevState.currentPiece);

            if (!collision) {
                prevState.currentPiece.y += y;
                prevState.currentPiece.x += x;
            }
            else {
                pieceInSamePos++;
            }

            return { 
                currentPiece: prevState.currentPiece,
                pieceInSamePos: pieceInSamePos
            };
        });
    }

    clearAnyLines() {
        let currentGameBoard = this.state.gameBoard;

        let linesToClear = [];

        for (let i = 0; i < currentGameBoard.length; i++) {
            let row = currentGameBoard[i].filter(value => value !== 0);
            if (row.length === 10) {
                linesToClear.push(i);
            }
        }

        for(let i = 0; i < linesToClear.length; i++) {
            currentGameBoard.splice(linesToClear[i], 1);
        }

        linesToClear.forEach(x => {
            currentGameBoard.unshift([Array(10).fill(0)]);
        })

        this.setState(prevState => {
            return {
                gameBoard: currentGameBoard
            };
        });
    }

    draw() {
        this.setState(prevState => {
            let newPoints = [];
            this.updateGameBoard(prevState.gameBoard, prevState.currentPiece, prevState.previousPointsDrawn, newPoints);

            return { 
                gameBoard: prevState.gameBoard,
                previousPointsDrawn: newPoints
            };
        });
    }

    checkForCollision(yTestPosition, xTestPosition, testPiece) {
        const axisRelativeToPieceYPos = testPiece.axisPositionY();
        const axisRelativeToPieceXPos = testPiece.axisPositionX(); 
        const orientation = testPiece.orientation;

        let currentGameBoard = this.state.gameBoard;
        this.state.previousPointsDrawn.forEach(points => {
            currentGameBoard[points.y][points.x] = 0;
        });

        for(let y = 0; y < testPiece.piece[orientation].length; y++) {
            for(let x = 0; x < testPiece.piece[orientation][y].length; x++) {
                if (testPiece.piece[orientation][y][x] > 0 &&
                    this.state.previousPointsDrawn.x !== x &&
                    this.state.previousPointsDrawn.y !== y) {

                    let newYPos = 0;
                    let newXPos = 0;
 
                    // In order to ensure the difference between the realtive 
                    // axis point and the current point in the loop is positive,
                    // I need to check whether or not x/y is less than
                    // or equal to the relative axis position in order
                    // to determine the order of the elements

                    if (y <= axisRelativeToPieceYPos) {
                        let yDifference = axisRelativeToPieceYPos - y;
                        newYPos = yTestPosition - yDifference;
                    }
                    else {
                        let yDifference = y - axisRelativeToPieceYPos;;
                        newYPos = yTestPosition + yDifference;
                    }

                    if (x <= axisRelativeToPieceXPos) {
                        let xDifference = axisRelativeToPieceXPos - x;
                        newXPos = xTestPosition - xDifference;
                    }
                    else {
                        let xDifference = x - axisRelativeToPieceXPos;
                        newXPos = xTestPosition + xDifference;
                    }
                    
                    // Catch out of bounds
                    if (newYPos < 0 || newYPos > 19 ||
                        newXPos < 0 || newXPos > 9) {
                            console.log("Out of Bounds");
                            return true;
                    }

                    // react complaint here
                    if (currentGameBoard[newYPos][newXPos] > 0) {
                        console.log("space occupied");
                        return true;
                    }
                }
            }
        }

        return false;
    }

    updateGameBoard(gameBoard, currentPiece, oldDrawingPoints, newDrawingPoints) {
        // Draw piece around axis
        const axisRelativeToPieceYPos = currentPiece.axisPositionY();
        const axisRelativeToPieceXPos = currentPiece.axisPositionX(); 
        const orientation = currentPiece.orientation;

        oldDrawingPoints.forEach(points => {
            gameBoard[points.y][points.x] = 0;
        });

        for(let y = 0; y < currentPiece.piece[orientation].length; y++) {
            for(let x = 0; x < currentPiece.piece[orientation][y].length; x++) {
                if (currentPiece.piece[orientation][y][x] > 0) {

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

                    if (newYPos > -1) {
                        gameBoard[newYPos][newXPos] = currentPiece.color;
                        newDrawingPoints.push({y: newYPos, x: newXPos});
                    }
                }
            }
        }
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
                        timeElapsed={ this.state.timeElapsed }
                    />
                </div>
            </div>
        );
    }
}

export default Game;