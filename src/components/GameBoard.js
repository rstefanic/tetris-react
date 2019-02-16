import React from 'react';
import TileRow from './TileRow';

function GameBoard(props) {
    const rowComponents = props.gameBoard.map(row => {
        return <TileRow row={ row } />
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