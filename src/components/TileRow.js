import React from 'react';
import Tile from './Tile';

function TileRow(props) {
    const tileComponents = props.row.map(tile => <Tile numberColor={ tile }/>);
    return (
        <div className="tile-row">
            { tileComponents }
        </div>
    );
}

export default TileRow;