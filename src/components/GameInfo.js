import React from 'react';
import TileRow from './TileRow';

function GameInfo(props) {
    const nextPieceDisplay = props.nextPiece.piece.map(row => <TileRow row={ row }/>);

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
                    <p>Time Elapsed: { props.timeElapsed }</p>
                </fieldset>
            </div>
        </div>
    );
}

export default GameInfo;