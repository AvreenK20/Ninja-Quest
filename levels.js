var levelOne = {
    ground:   [{ x: 0, y: 4, size: 15 }, 
               { x: 15, y: 10.25, size: 15 },
               ],

    dirt:     [{ x: 0, y: 5, size: 6, type: "Plain"},
               { x: 3, y: 6, size: 7, type: "Plain"},
               { x: 14, y: 5, size: 1, type: "Plain"},
               { x: 13, y: 6, size: 2, type: "Plain"},
               { x: 4, y: 7, size: 11, type: "Mid"},
               ],
    
    bricks:   [{ x: 6, y: 5, size: 8 }, 
               { x: 7, y: 6, size: 6 }, 
               ],
    
    edges:     [{ x: 15, y: 4, type: "RightTop"},
                { x: 15, y: 5, type: "RightMid"},
                { x: 15, y: 6, type: "RightMid"},
                { x: 15, y: 7, type: "RightBot"},
                { x: 14, y: 10.25, type: "LeftTop"},
                ],

    platforms: [{ x: 12,   y: 10.5, size: 1, scale: 1, type: "Double", moving: true, direction: -1 },
                { x:  7.5, y: 10,   size: 1, scale: 1, type: "Double", moving: true, direction:  1 }, 
                { x:  5,   y: 10.5, size: 1, scale: 1, type: "Double", moving: true, direction: -1 },
                { x:  1,   y: 7.40, size: 1, scale: 1, type: "Single", moving: true, direction: 1},
                { x: 17,   y: 5.5,  size: 1, scale: 2, type: "Double", moving: false},
                { x: 20,   y: 7,    size: 1, scale: 2, type: "Double", moving: false},
                { x: 23,   y: 8.5,  size: 1, scale: 2, type: "Double", moving: false},
                ],
 
    beams:     [{ x: 17.90, y: 5.5,    size: 4, scale: 2, type: "Long" }, 
                { x: 20.90, y: 7,  size: 4, scale: 2, type: "Long" }, 
                { x: 23.90, y: 8.5, size: 4, scale: 2, type: "Long" }, 
                ],

    trunks:   [{ x: 6, y: 0, size: 2 },
               { x: 6, y: 1, size: 2 },
               { x: 6, y: 2, size: 2 },
               { x: 6, y: 3, size: 2 }],

    branches: [{ x: 7.75, y: 2, size: 2 }],

    leaves:   [{ x: 4.5, y: -2.5, size: 4, color: "Orange"},
               { x: 2.5, y: -4,   size: 5, color: "Orange"},
               { x: 6,   y: -4,   size: 5, color: "Orange"},
               { x: -1,  y: 6.5,  size: 5, color: "Orange"},
               { x: 0,   y: 5.5,  size: 5, color: "OrangeBrown"},
               { x: -3,  y: 4.5,  size: 5, color: "Purple"},
               ],

    frogs:    [{ x: 10, y: 0, scale: 3, color: "BlueBlue" },
               { x: 25, y: 0, scale: 2, color: "GreenBrown" },
               // { x: 30, y: 0, scale: 5, color: "PurpleWhite" }
               ],

    cats:     [{ x: 8, y: 0, scale: 3}
               ],
};

var credits = {
    text: [
    "  Chris Marriot",
    "  Avreen Kaur",
    "  // TODO : Sprite Sheet Credit",
    "  TCSS 491 - Winter 2024"
    ]
}