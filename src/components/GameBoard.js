import React from 'react';
import TileRow from './TileRow';

function GameBoard(props) {
    let id = 1;
    const rowComponents = props.gameBoard.map(row => {
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