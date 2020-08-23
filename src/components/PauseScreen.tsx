import React from 'react';

interface PauseScreenProps {
    showPauseScreen: boolean;
}

const PauseScreen: React.FunctionComponent<PauseScreenProps> = ({ showPauseScreen }) => {
    const pauseClassName = "pause-screen";
    return (
        <div className={ showPauseScreen ? pauseClassName : undefined }>
            { showPauseScreen ? <h1>Game Paused</h1> : undefined }
        </div>
    );
}

export default PauseScreen;