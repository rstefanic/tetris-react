import React from 'react';

interface TileProps {
    numberColor: number;
}

const Tile: React.FunctionComponent<TileProps> = ({ numberColor }) => {
    let styles = {};
    switch(numberColor) {
        case 1: 
            styles = { "backgroundColor": "steelblue" };
            break; 
        case 2: 
            styles = { "backgroundColor": "lightsalmon" };
            break;
        case 3: 
            styles = { "backgroundColor": "purple" };
            break;
        case 4: 
            styles = { "backgroundColor": "green" };
            break;
        case 5:
            styles = { "backgroundColor": "red" };
            break;
        case 6:
            styles = { "backgroundColor": "blue" };
            break;
        case 7:
            styles = { "backgroundColor": "orange" };
            break;
        default:
            break;
    }

    return (
        <div className="tile" style={ styles }></div>
    );
}

export default Tile;