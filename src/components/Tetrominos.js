
const iPiece = [ 
    [1], 
    [1], 
    [1], 
    [1] 
];

const oPiece = [
    [2, 2],
    [2, 2]
];

const tPiece = [
    [0, 3, 0],
    [3, 3, 3]
]

const sPiece = [
    [0, 4, 4],
    [4, 4, 0]
]

const zPiece = [
    [5, 5, 0],
    [0, 5, 5]
]

const jPiece = [
    [6, 0, 0],
    [6, 6, 6]
]

const lPiece = [
    [0, 0, 7],
    [7, 7, 7]
]

export const iTetromino = {
    axis: [2, 0],
    piece: iPiece,
    color: 1
}

export const oTetromino = {
    axis: [0, 1],
    piece: oPiece,
    color: 2
}

export const tTetromino = {
    axis: [1, 1],
    piece: tPiece,
    color: 3
}

export const sTetromino = {
    axis: [0, 1],
    piece: sPiece,
    color: 4
}

export const zTetromino = {
    axis: [0, 1],
    piece: zPiece,
    color: 5
}

export const jTetromino = {
    axis: [1, 1],
    piece: jPiece,
    color: 6
}

export const lTetromino = {
    axis: [1, 1],
    piece: lPiece,
    color: 7
}

export const allTetrominos = [
    iTetromino,
    oTetromino,
    tTetromino,
    sTetromino,
    zTetromino,
    jTetromino,
    lTetromino
]