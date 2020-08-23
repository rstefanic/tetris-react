/* React */
import React, { Component } from 'react';

/* Types & Pieces */
import { startingXPosition, startingYPosition} from '../config';
import { GameBoard, Tetromino, TetrominoInfo, Points } from '../types';
import { allTetrominos, iTetromino, oTetromino } from './Tetrominos';

/* Components */
import Footer from './Footer';
import blankGameBoard from './blankGameBoard';
import GameBoardComponent from './GameBoard';
import GameInfo from './GameInfo';
import GameOver from './GameOver';
import PauseScreen from './PauseScreen';

/* Styles */
import '../styles.css';

interface GameState {
    gameBoard: GameBoard;
    previousPointsDrawn: Points[];
    currentPiece: Tetromino;
    nextPiece: Tetromino;
    level: number;
    lines: number;
    score: number;
    timeElapsed: number;
    lockPieceTimer: number;
    gameIsPaused: boolean;
    gameLoop: any;
    timer: any;
    gameOver: boolean;

}

class Game extends Component<any, GameState> {
    constructor() {
        super({});
        this.state = {
            gameBoard: [],
            previousPointsDrawn: [],
            currentPiece: iTetromino,
            nextPiece: oTetromino,
            level: 1,
            lines: 0,
            score: 0,
            timeElapsed: 0,
            lockPieceTimer: 0,
            gameIsPaused: false,
            gameLoop: {},
            timer: {},
            gameOver: false
        }

        this.startGame = this.startGame.bind(this);
        this.gameLoop = this.gameLoop.bind(this);
        this.timer = this.timer.bind(this);
        this.updateGameBoard = this.updateGameBoard.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.pauseGame = this.pauseGame.bind(this);
        this.movePieceDown = this.movePieceDown.bind(this);
        this.movePieceLeft = this.movePieceLeft.bind(this);
        this.movePieceRight = this.movePieceRight.bind(this);
        this.hardDropPiece = this.hardDropPiece.bind(this);
        this.rotatePiece = this.rotatePiece.bind(this);
        this.movePiece = this.movePiece.bind(this);
        this.checkForCollision = this.checkForCollision.bind(this);
        this.clearAnyLinesAndUpdateScore = this.clearAnyLinesAndUpdateScore.bind(this);
        this.setLevel = this.setLevel.bind(this);
    }

    componentDidMount(): void {
        document.addEventListener('keydown', this.handleKeyPress);

        const firstPiece = allTetrominos[Math.floor(Math.random() * 7)];
        const secondPiece = allTetrominos[Math.floor(Math.random() * 7)];

        firstPiece.x = startingXPosition;
        firstPiece.y = startingYPosition;

        this.setState({
            gameBoard: blankGameBoard,
            currentPiece: firstPiece,
            nextPiece: secondPiece
        });

        this.startGame();
    }

    startGame(): void {
        const gameSpeed = (1000) / this.state.level;
        this.setState({
            gameLoop: setInterval(this.gameLoop, gameSpeed),
            timer: setInterval(this.timer, 1000)
        });
    }

    timer(): void {
        this.setState(prevState => {
            return {
                timeElapsed: prevState.timeElapsed + 1
            };
        });
    }

    handleKeyPress(event: { keyCode: number; }): void {
        const keys = {
            q: 81,
            w: 87,
            e: 69,
            a: 65,
            s: 83,
            d: 68,
            leftArrow: 37,
            rightArrow: 39,
            space: 32,
            slash: 191,
            esc: 27
        };

        if (event.keyCode === keys.esc) {
            this.pauseGame();
        }

        if(!this.state.gameIsPaused) {
            if (event.keyCode === keys.a) {
                this.movePieceLeft();
            }
            else if (event.keyCode === keys.d) {
                this.movePieceRight();
            }
            else if (event.keyCode === keys.s) {
                this.movePieceDown();
            }
            else if (event.keyCode === keys.w || event.keyCode === keys.space) {
                this.hardDropPiece();
            }
            else if (event.keyCode === keys.rightArrow || event.keyCode === keys.e) {
                this.rotatePiece(true);
            }
            else if (event.keyCode === keys.leftArrow || event.keyCode === keys.q) {
                this.rotatePiece(false);
            }
        }
    }

    pauseGame(): void {
        if (this.state.gameIsPaused) {
            this.startGame();
        }
        else {
            clearInterval(this.state.gameLoop);
            clearInterval(this.state.timer);
        }

        this.setState(prevState => {
            return {
                gameIsPaused: !prevState.gameIsPaused
            }
        });
    }

    movePieceLeft(): void {
        this.movePiece(0, -1);
        this.draw();
    }

    movePieceRight(): void {
        this.movePiece(0, 1);
        this.draw();
    }

    movePieceDown(): void {
        this.movePiece(1, 0);
        this.draw();
    }

    hardDropPiece(): void {
        let piece: Tetromino = this.state.currentPiece;

        while(!this.checkIfPieceIsOnFloor(this.state.gameBoard, piece)) {
            piece.y++;
        }

        this.setState({
            currentPiece: piece
        });

        this.draw();
        
        this.lockCurrentPiece();
        this.clearAnyLinesAndUpdateScore();
        this.setLevel()
    }

    rotatePiece(turnRight: boolean): void {;
        const oldOrientation = this.state.currentPiece.orientation;
        let newOrientation: number = 0;

        if (turnRight) {
            newOrientation = oldOrientation + 1;
        }
        else {
            newOrientation = oldOrientation - 1;
        }

        // If it's fully turned right, turn it to position 0
        if (newOrientation > 3) {
            newOrientation = 0;
        }

        // If it's fully turned left, turn it to position 3
        if (newOrientation < 0) {
            newOrientation = 3;
        }

        let rotatedPiece: Tetromino = this.state.currentPiece;
        rotatedPiece.orientation = newOrientation;

        let collision: boolean = this.checkForCollision(
            this.state.currentPiece.y, 
            this.state.currentPiece.x, 
            rotatedPiece
        );

        if (!collision) {
            this.setState(() => {
                return {
                    currentPiece: rotatedPiece
                };
            });
        }
        else {
            rotatedPiece.orientation = oldOrientation;
            this.setState(() => {
                return {
                    currentPiece: rotatedPiece
                };
            });
        }

        this.draw();
    }

    gameLoop(): void {
        if (this.state.lockPieceTimer > 1) {
            this.lockCurrentPiece();
            this.clearAnyLinesAndUpdateScore();
            this.setLevel();
        }

        // Apply Gravity
        this.movePiece(1, 0);

        if (this.state.gameOver) {
            this.gameOver();
        }
    }

    gameOver() : void {
        clearInterval(this.state.gameLoop);
        clearInterval(this.state.timer);

        this.setState({
            gameOver: true
        });
    }

    lockCurrentPiece() : void {
        const pointsDrawnAtTopOfScreen = 
            this.state.previousPointsDrawn
                .filter((point: { y: number; }) => point.y < 1);

        // If any points are drawn at the top of the screen, then the game is over
        if (pointsDrawnAtTopOfScreen.length > 0) {
            this.setState({
                gameOver: true
            });
        }
        else {
            this.setState(prevState => {
                const newCurrentPiece = prevState.nextPiece;
                newCurrentPiece.x = startingXPosition;
                newCurrentPiece.y = startingYPosition;
                newCurrentPiece.orientation = 0;

                const newNextPiece = allTetrominos[Math.floor(Math.random() * 7)];
                newNextPiece.orientation = 0;

                return {
                    lockPieceTimer: 0,
                    previousPointsDrawn: [],
                    currentPiece: newCurrentPiece,
                    nextPiece: newNextPiece
                };
            });
        }
    }

    movePiece(y: number, x: number): void {
        const newYPos = this.state.currentPiece.y + y;
        const newXPos = this.state.currentPiece.x + x;
        const collision = this.checkForCollision(newYPos, newXPos, this.state.currentPiece);
        
        if (!collision) {
            this.setState(prevState => {
                prevState.currentPiece.y += y;
                prevState.currentPiece.x += x;

                return { 
                    currentPiece: prevState.currentPiece,
                    lockPieceTimer: 0
                };
            });
        }
        else {
            if (this.checkIfPieceIsOnFloor(this.state.gameBoard, this.state.currentPiece)) {
                this.setState(prevState => {
                    return {
                        lockPieceTimer: prevState.lockPieceTimer + 1
                    };
                });
            }
        }

        this.draw();
    }

    checkIfPieceIsOnFloor(gameBoard: GameBoard, currentPiece: Tetromino): boolean {
        let pieceIsOnFloor: boolean = false;
        let pointsToCheck: Points[] = [];
        const { axisRelativeToPieceXPos, axisRelativeToPieceYPos, orientation } = this.getTetrominoInfo(currentPiece);
        const yPiecePos = currentPiece.y;
        const xPiecePos = currentPiece.x;

        const pieceHeight = currentPiece.piece[orientation].length;
        const pieceWidth = currentPiece.piece[orientation][0].length;

        // Work our way up from the bottom to check the x-pos of 
        // each grid piece that needs to be checked
        for(let x = 0; x < pieceWidth; x++) {

            // For the inner loop, start from the bottom of the piece and work up
            for(let y = pieceHeight - 1; y >= 0; y--) {
                if (currentPiece.piece[orientation][y][x] !== 0) {
                    const pointsContainingX = pointsToCheck.filter(points => {
                        return points.x === x;
                    });

                    // Only add the point if there isn't an X coordinated point in the array
                    if (pointsContainingX.length === 0) {
                        pointsToCheck.push({y: y, x: x});
                    }
                }
            }
        }

        // Now go through each of the recorded points and check to see if the piece under it
        // is either the floor or another piece
        pointsToCheck.forEach(point => {
            const pointUnderYCoordinate: number = point.y + 1;

            let yCheckPoint: number = 0;
            let xCheckPoint: number = 0;
            let yDifference: number = this.absoluteDifference(axisRelativeToPieceYPos, pointUnderYCoordinate);
            let xDifference: number = this.absoluteDifference(axisRelativeToPieceXPos, point.x);

            if (pointUnderYCoordinate <= axisRelativeToPieceYPos) {
                yCheckPoint = yPiecePos - yDifference;
            }
            else {
                yCheckPoint = yPiecePos + yDifference;
            }

            if (point.x <= axisRelativeToPieceXPos) {
                xCheckPoint = xPiecePos - xDifference;
            }
            else {
                xCheckPoint = xPiecePos + xDifference;
            }

            if (yCheckPoint > 19 || 
                gameBoard[yCheckPoint][xCheckPoint] > 0) {
                    pieceIsOnFloor = true;
            }
        });

        return pieceIsOnFloor;
    }

    clearAnyLinesAndUpdateScore(): void {
        let currentGameBoard: GameBoard = this.state.gameBoard;

        let lineNumbersToClear: number[] = [];

        for (let i = 0; i < currentGameBoard.length; i++) {
            let row: number[] = currentGameBoard[i].filter(value => value !== 0);
            if (row.length === 10) {
                lineNumbersToClear.push(i);
            }
        }

        // For each line that needs to be removed, remove it 
        // and add a new one the top of the game board
        lineNumbersToClear.forEach(x => {
            currentGameBoard.splice(x, 1);
            currentGameBoard.unshift(Array<number>(10).fill(0));
        });

        const linesCleared: number = lineNumbersToClear.length;

        this.setState(prevState => {

            let pointsEarned: number = 0; 
            switch (linesCleared) {
                case 1:
                    pointsEarned = 40 * prevState.level;
                    break;
                case 2:
                    pointsEarned = 100 * prevState.level;
                    break;
                case 3:
                    pointsEarned = 300 * prevState.level;
                    break;
                case 4:
                    pointsEarned = 1200 * prevState.level;
                    break;
                default:
                    break;
            }

            return {
                gameBoard: currentGameBoard,
                lines: prevState.lines + linesCleared,
                score: prevState.score + pointsEarned
            };
        });
    }

    setLevel(): void {
        this.setState((prevState: GameState) => {
            const lines = prevState.lines;

            let level: number = Math.floor(lines / 10) + 1;

            if (level > prevState.level) {
                clearInterval(this.state.gameLoop);
                const gameSpeed = (1000) / this.state.level;

                return {
                    level: level,
                    gameLoop: setInterval(this.gameLoop, gameSpeed)
                }
            }
            else {
                return {
                    level: level,
                    gameLoop: this.gameLoop
                };
            }
        });
    }

    draw(): void {
        this.setState((prevState: GameState) => {
            let newPoints: Points[] = [];
            this.updateGameBoard(prevState.gameBoard, prevState.currentPiece, prevState.previousPointsDrawn, newPoints);

            return { 
                gameBoard: prevState.gameBoard,
                previousPointsDrawn: newPoints
            };
        });
    }

    absoluteDifference(a: number, b: number): number {
        let difference: number = a - b;

        if (difference < 0) {
            difference *= -1;
        }

        return difference;
    }

    getTetrominoInfo(tetromino: Tetromino): TetrominoInfo {
        const axisRelativeToPieceYPos: number = tetromino.axisPositionY();
        const axisRelativeToPieceXPos: number = tetromino.axisPositionX(); 
        const orientation: number = tetromino.orientation;

        return { axisRelativeToPieceXPos, axisRelativeToPieceYPos, orientation };
    }

    // This function is used to check if a collision will occur
    checkForCollision(yTestPosition: number, xTestPosition: number, testPiece: Tetromino): boolean {

        const { axisRelativeToPieceXPos, axisRelativeToPieceYPos, orientation } = this.getTetrominoInfo(testPiece);

        let currentGameBoard: GameBoard = this.state.gameBoard;
        this.state.previousPointsDrawn.forEach(points => {
            currentGameBoard[points.y][points.x] = 0;
        });

        for(let y: number = 0; y < testPiece.piece[orientation].length; y++) {
            for(let x: number = 0; x < testPiece.piece[orientation][y].length; x++) {
                if (testPiece.piece[orientation][y][x] > 0) {

                    let newYPos: number = 0;
                    let newXPos: number = 0;
 
                    if (y <= axisRelativeToPieceYPos) {
                        let yDifference: number = axisRelativeToPieceYPos - y;
                        newYPos = yTestPosition - yDifference;
                    }
                    else {
                        let yDifference: number = y - axisRelativeToPieceYPos;;
                        newYPos = yTestPosition + yDifference;
                    }

                    if (x <= axisRelativeToPieceXPos) {
                        let xDifference: number = axisRelativeToPieceXPos - x;
                        newXPos = xTestPosition - xDifference;
                    }
                    else {
                        let xDifference: number = x - axisRelativeToPieceXPos;
                        newXPos = xTestPosition + xDifference;
                    }
                    
                    // Catch out of bounds
                    if (newYPos > 19 ||
                        newXPos < 0 || newXPos > 9) {
                        return true;
                    }

                    // Catch if the piece is alrady occupied
                    if (newYPos >=0 && currentGameBoard[newYPos][newXPos] > 0) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    updateGameBoard(gameBoard: GameBoard, currentPiece: Tetromino, oldDrawingPoints: Points[], newDrawingPoints: Points[]): void {
        // Draw piece around the tetromino axis

        const { axisRelativeToPieceXPos, axisRelativeToPieceYPos, orientation } = this.getTetrominoInfo(currentPiece);
        oldDrawingPoints.forEach((points: { y: number; x: number; }) => {
            gameBoard[points.y][points.x] = 0;
        });

        for(let y: number = 0; y < currentPiece.piece[orientation].length; y++) {
            for(let x: number = 0; x < currentPiece.piece[orientation][y].length; x++) {
                if (currentPiece.piece[orientation][y][x] > 0) {

                    let newYPos: number = 0;
                    let newXPos: number = 0;
 
                    // In order to ensure the difference between the realtive 
                    // axis point and the current point in the loop is absolute,
                    // I need to check whether or not x/y is less than
                    // or equal to the relative axis position in order
                    // to determine the order of the elements

                    if (y <= axisRelativeToPieceYPos) {
                        let yDifference: number = axisRelativeToPieceYPos - y;
                        newYPos = currentPiece.y - yDifference;
                    }
                    else {
                        let yDifference: number = y - axisRelativeToPieceYPos;;
                        newYPos = currentPiece.y + yDifference;
                    }

                    if (x <= axisRelativeToPieceXPos) {
                        let xDifference: number = axisRelativeToPieceXPos - x;
                        newXPos = currentPiece.x - xDifference;
                    }
                    else {
                        let xDifference: number = x - axisRelativeToPieceXPos;
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

    render(): JSX.Element {
        return (
            <div>
                <h1>Tetris</h1>
                <div className="game">
                    <PauseScreen showPauseScreen={ this.state.gameIsPaused } />
                    { this.state.gameOver && <GameOver score={ this.state.score } lines={ this.state.lines } /> }
                    <GameBoardComponent 
                        gameBoard={ this.state.gameBoard }
                    />
                    <GameInfo 
                        level={ this.state.level }
                        time={ this.state.timeElapsed }
                        nextPiece={ this.state.nextPiece }
                        lines={ this.state.lines }
                        score={ this.state.score }
                    />
                    <Footer />
                </div>
            </div>
        );
    }
}

export default Game;
