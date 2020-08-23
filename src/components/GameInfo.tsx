import React from 'react';

import { Tetromino } from '../types';
import TileRow from './TileRow';


interface GameInfoProps {
    level: number;
    time: number;
    nextPiece: Tetromino;
    lines: number;
    score: number;
}

const GameInfo: React.FunctionComponent<GameInfoProps> = ({ level, nextPiece, lines, score, time }) => {
    let id = 1;
    const nextPieceDisplay = nextPiece.piece[0].map(row => <TileRow row={ row } key={ id++ } />);

    return (
        <div className="half">
            <div className="game-info">
                <fieldset>
                    <legend>Next Piece</legend>
                    { nextPieceDisplay }
                </fieldset>
                <fieldset>
                    <legend>Info</legend>
                    <p>Level: { level }</p>
                    <p>Lines: { lines }</p>
                    <p>Score: { score }</p>
                    <p>Time Elapsed: { time }</p>
                </fieldset>
            </div>
        </div>
    );
}

export default GameInfo;