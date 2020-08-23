import { Piece, Tetromino } from '../types';

const iPiece: Piece = [
    [
        [1], 
        [1], 
        [1], 
        [1] 
    ],
    [ 
        [1, 1, 1, 1]
    ],
    [
        [1], 
        [1], 
        [1], 
        [1] 
    ],
    [ 
        [1, 1, 1, 1]
    ]
];

const oPiece: Piece = [
    [
        [2, 2],
        [2, 2]
    ],
    [
        [2, 2],
        [2, 2]
    ],
    [
        [2, 2],
        [2, 2]
    ],
    [
        [2, 2],
        [2, 2]
    ]
];

const tPiece: Piece = [
    [
        [0, 3, 0],
        [3, 3, 3]
    ],
    [
        [3, 0],
        [3, 3],
        [3, 0]
    ],
    [
        [3, 3, 3],
        [0, 3, 0]
    ],
    [
        [0, 3],
        [3, 3],
        [0, 3]
    ]
]

const sPiece: Piece = [
    [
        [0, 4, 4],
        [4, 4, 0]
    ],
    [
        [4, 0],
        [4, 4],
        [0, 4]
    ],
    [
        [0, 4, 4],
        [4, 4, 0]
    ],
    [
        [4, 0],
        [4, 4],
        [0, 4]
    ]
]

const zPiece: Piece = [
    [
        [5, 5, 0],
        [0, 5, 5]
    ],
    [
        [0, 5],
        [5, 5],
        [5, 0]
    ],
    [
        [5, 5, 0],
        [0, 5, 5]
    ],
    [
        [0, 5],
        [5, 5],
        [5, 0]
    ]
]

const jPiece: Piece = [
    [
        [6, 0, 0],
        [6, 6, 6]
    ],
    [
        [6, 6],
        [6, 0],
        [6, 0]
    ],
    [
        [6, 6, 6],
        [0, 0, 6]
    ],
    [
        [0, 6],
        [0, 6],
        [6, 6]
    ]
]

const lPiece: Piece = [
    [
        [0, 0, 7],
        [7, 7, 7]
    ],
    [
        [7, 0],
        [7, 0],
        [7, 7]
    ],
    [
        [7, 7, 7],
        [7, 0, 0]
    ],
    [
        [7, 7],
        [0, 7],
        [0, 7]
    ]

]

export const iTetromino: Tetromino = {
    orientation: 0,
    axisPositionY: function() {
        if (this.orientation === 0 || this.orientation === 2) {
            return 2;
        }
        else {
            return 0;
        }
    },
    axisPositionX: function() {
        if (this.orientation === 0 || this.orientation === 2) {
            return 0;
        }
        else {
            return 2;
        }
    },
    piece: iPiece,
    color: 1
}

export const oTetromino: Tetromino = {
    orientation: 0,
    axisPositionY: function() { return 0; },
    axisPositionX: function() { return 1; },
    piece: oPiece,
    color: 2
}

export const tTetromino: Tetromino = {
    orientation: 0,
    axisPositionY: function() {
        if (this.orientation === 2) {
            return 0;
        }
        else {
            return 1;
        }
    },
    axisPositionX: function() {
        if (this.orientation === 1) {
            return 0;
        }
        else {
            return 1;
        }
    },
    piece: tPiece,
    color: 3
}

export const sTetromino: Tetromino = {
    orientation: 0,
    axisPositionY: function() {
        if (this.orientation === 0 || this.orientation === 2) {
            return 0;
        }
        else {
            return 1;
        }
    }, 
    axisPositionX: function() { return 1; },
    piece: sPiece,
    color: 4
}

export const zTetromino: Tetromino = {
    orientation: 0,
    axisPositionY: function() {
        if (this.orientation === 0 || this.orientation === 2) {
            return 0;
        }
        else {
            return 1;
        }
    },
    axisPositionX: function() { return 1; },
    piece: zPiece,
    color: 5 
}

export const jTetromino: Tetromino = {
    orientation: 0,
    axisPositionY: function() {
        if (this.orientation === 2) {
            return 0;
        }
        else {
            return 1;
        }
    },
    axisPositionX: function() {
        if (this.orientation === 1) {
            return 0;
        }
        else {
            return 1;
        }
    },
    piece: jPiece,
    color: 6
}

export const lTetromino: Tetromino = {
    orientation: 0,
    axisPositionY: function() {
        if (this.orientation === 2) {
            return 0;
        }
        else {
            return 1;
        }
    },
    axisPositionX: function() {
        if (this.orientation === 1) {
            return 0;
        }
        else {
            return 1;
        }
    },
    piece: lPiece,
    color: 7
}

export const allTetrominos: Tetromino[] = [
    iTetromino,
    oTetromino,
    tTetromino,
    sTetromino,
    zTetromino,
    jTetromino,
    lTetromino
]