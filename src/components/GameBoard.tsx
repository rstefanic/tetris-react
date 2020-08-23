import React from 'react';

import TileRow from './TileRow';
import { GameBoard } from '../types';

interface GameBoardProps {
    gameBoard: GameBoard;
}

const GameBoard: React.FunctionComponent<GameBoardProps> = ({ gameBoard }) => {
    let id = 1;
    const rowComponents = gameBoard.map(row => {
        return <TileRow row={ row } key={ id++ } />
    });
    
    return (
        <div className="half">
            <div className="game-board">
                { rowComponents }
            </div>
        </div>
    );
}

export default GameBoard;