import React from 'react';
import Tile from './Tile';

interface TileRowProps {
    row: number[];
}

const TileRow: React.FunctionComponent<TileRowProps> = ({ row }) => {
    let id = 1;
    const tileComponents = row.map(tile => <Tile numberColor={ tile } key={ id++ } />);

    return (
        <div className="tile-row">
            { tileComponents }
        </div>
    );
}

export default TileRow;