import React from 'react';

interface GameOverProps {
    score: number;
    lines: number;
}

const GameOver: React.FunctionComponent<GameOverProps> = ({ score, lines }) => {
    return (
        <div className="pause-screen">
            <h1>Game Over</h1>
            <div>
                <h2>Final Score</h2>
                <p>Score: { score }</p>
                <p>Lines: { lines }</p>
            </div>
        </div>
    );
}

export default GameOver;