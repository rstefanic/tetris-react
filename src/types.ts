export type Piece = number[][][];

export interface Tetromino {
    orientation: number;
    axisPositionY: () => number;
    axisPositionX: () => number;
    piece: Piece;
    color: number;
}

export type GameBoard = number[][];