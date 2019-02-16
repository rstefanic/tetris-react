import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameInfo from './GameInfo';
import { allTetrominos, iTetromino, oTetromino } from './Tetrominos';

import blankGameBoard from "./blankGameBoard";
import '../styles.css';

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

        firstPiece.x = 5;
        firstPiece.y = 0;
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

        // Determine new center point
        newGameBoard[currentPiece.y][currentPiece.x] = currentPiece.color;

        // Draw piece around axis
        let axis = currentPiece.piece[currentPiece.axis[0]][currentPiece.axis[1]];

        
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