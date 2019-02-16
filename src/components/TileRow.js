import React from 'react';
import Tile from './Tile';

function TileRow(props) {
    let id = 1;
    const tileComponents = props.row.map(tile => <Tile numberColor={ tile } key={ id++ } />);

    return (
        <div className="tile-row">
            { tileComponents }
        </div>
    );
}

export default TileRow;