import React from 'react';
import TileRow from './TileRow';

function GameInfo(props) {
    let id = 1;
    const nextPieceDisplay = props.nextPiece.piece.map(row => <TileRow row={ row } key={ id++ } />);

    return (
        <div className="half">
            <div className="game-info">
                <fieldset>
                    <legend>Next Piece</legend>
                    { nextPieceDisplay }
                </fieldset>
                <fieldset>
                    <legend>Info</legend>
                    <p>Level: { props.level }</p>
                    <p>Lines: { props.lines }</p>
                    <p>Score: { props.score }</p>
                    <p>Time Elapsed: { props.timeElapsed }</p>
                </fieldset>
            </div>
        </div>
    );
}

export default GameInfo;