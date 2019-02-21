import React from 'react';

function PauseScreen(props) {
    const pauseClassName = "pause-screen";
    return (
        <div className={ props.showPauseScreen ? pauseClassName : undefined }>
            { props.showPauseScreen ? <h1>Game Paused</h1> : undefined }
        </div>
    );
}

export default PauseScreen;