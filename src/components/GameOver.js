import React from 'react';

function GameOver(props) {
    return (
        <div className="pause-screen">
            <h1>Game Over</h1>
            <div>
                <h2>Final Score</h2>
                <p>Score: { props.score }</p>
                <p>Lines: { props.lines }</p>
            </div>
        </div>
    );
}

export default GameOver;