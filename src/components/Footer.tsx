import * as React from 'react';

const Footer: React.FunctionComponent = () => {
    return (
        <footer className="tetris-footer">
            <p>Created by <a href="https://robertstefanic.com">Robert Stefanic</a></p>
            <p>View game code <a href="https://github.com/rstefanic/tetris-react">here</a>.</p>
        </footer>
    );
}

export default Footer;