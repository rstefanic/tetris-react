export interface Points {
    x: number;
    y: number;
}

export interface Tetromino {
    orientation: number;
    axisPositionY: () => number;
    axisPositionX: () => number;
    piece: Piece;
    color: number;
    x: number;
    y: number;
}

export type Piece = number[][][];

export type GameBoard = number[][];
