var levelOne = {
    ground:   [{ x: 0, y: 4, size: 15 }, 
               { x: 15, y: 10.25, size: 15 },
               { x: 44, y: 7, size: 15 },
               ],

    dirt:     [{ x: 0, y: 5, size: 6, type: "Plain"},
               { x: 4, y: 6, size: 5, type: "Plain"},
               { x: 14, y: 5, size: 1, type: "Plain"},
               { x: 13, y: 6, size: 2, type: "Plain"},
               { x: 5, y: 7, size: 10, type: "Mid"},
               { x: 44, y: 8, size: 15, type: "Plain"},
               { x: 44, y: 9, size: 15, type: "Mid"},
               ],
    
    bricks:   [{ x: 6, y: 5, size: 8 }, 
               { x: 7, y: 6, size: 6 }, 
               ],
    
    edges:     [{ x: 15, y: 4, type: "RightTop"},
                { x: 15, y: 5, type: "RightMid"},
                { x: 15, y: 6, type: "RightMid"},
                { x: 15, y: 7, type: "RightBot"},
                { x: 14, y: 10.25, type: "LeftTop"},
                { x: 30, y: 10.25, type: "RightTop"},
                { x: 43, y: 7, type: "LeftTop"},
                { x: 43, y: 8, type: "LeftMid"},
                { x: 43, y: 9, type: "LeftBot"},
                { x: 59, y: 7, type: "RightTop"},
                { x: 59, y: 8, type: "RightMid"},
                { x: 59, y: 9, type: "RightBot"},
                ],

    platforms: [{ x: 12,   y: 10.5,  size: 1, scale: 1, type: "Double", moving: true, direction: -1, speed: 200 },
                { x:  7.5, y: 10,    size: 1, scale: 1, type: "Double", moving: true, direction:  1, speed: 100 }, 
                { x:  5.5,   y: 10.5,  size: 1, scale: 1, type: "Double", moving: true, direction: -1, speed: 100 },
                { x:  1,   y: 7.40,  size: 1, scale: 1, type: "Single", moving: true, direction:  1, speed: 50},
                { x: 17,   y: 5.5,   size: 1, scale: 2, type: "Double", moving: false, direction: 1, speed: 0},
                { x: 20,   y: 7,     size: 1, scale: 2, type: "Double", moving: false, direction: 1, speed: 0},
                { x: 23,   y: 8.5,   size: 1, scale: 2, type: "Double", moving: false, direction: 1, speed: 0},
                { x: 32,   y: 10.25, size: 1, scale: 1, type: "Single", moving: true, direction: 1, speed: 75},
                { x: 36,   y: 9,     size: 1, scale: 2, type: "Double", moving: false, direction: 1, speed: 0},
                { x: 41,   y: 8,     size: 1, scale: 1, type: "Single",  moving: true, direction: -1, speed: 100},
                { x: 3 ,   y: 9,     size: 1, scale: 1, type: "Single",  moving: true, direction: -1, speed: 150},
                ],
 
    beams:     [{ x: 17.90, y: 5.5,    size: 4, scale: 2, type: "Long" }, 
                { x: 20.90, y: 7,  size: 4, scale: 2, type: "Long" }, 
                { x: 23.90, y: 8.5, size: 4, scale: 2, type: "Long" }, 
                { x: 36.90, y: 9, size: 4, scale: 2, type: "Long" }, 
                ],

    trunks:   [{ x: 6, y: 0, size: 2 },
               { x: 6, y: 1, size: 2 },
               { x: 6, y: 2, size: 2 },
               { x: 6, y: 3, size: 2 },
               { x: 55, y: 0, size: 2 },
               { x: 55, y: 1, size: 2 },
               { x: 55, y: 2, size: 2 },
               { x: 55, y: 3, size: 2 },
               { x: 55, y: 4, size: 2 },
               { x: 55, y: 5, size: 2 },
               { x: 55, y: 6, size: 2 },
               { x: 1.5, y: 9, size: 3 },
                ],

    branches: [{ x: 7.75, y: 2, size: 2 },
               { x: 56.75, y: 4.75, size: 2 },
              ],

    leaves:   [{ x: 4.5, y: -2.5, size: 4, color: "Orange"},
               { x: 2.5, y: -4,   size: 5, color: "Orange"},
               { x: 2, y: 5.9,   size: 4, color: "Purple"},
               { x: 6,   y: -4,   size: 5, color: "Orange"},
               { x: 0,   y: 5.5,  size: 5, color: "OrangeBrown"},
               { x: -3,  y: 4.5,  size: 5, color: "Purple"},
               { x: 55,  y: -1,   size: 5, color: "Purple"},
               { x: 53,  y: -2,   size: 5, color: "Purple"},
               { x: 52,  y: -1,   size: 5, color: "Purple"},
               { x: 53,  y: -2,   size: 5, color: "Purple"},
               ],

    frogs:    [{ x: 10, y: 0, scale: 3, color: "blue_blue" },
               { x: 25, y: 0, scale: 2, color: "green_brown" },
               { x: 30, y: 0, scale: 5, color: "purple_white" },
               { x: 50, y: 0, scale: 3, color: "purple_white" },
               { x: 55, y: 0, scale: 3, color: "blue_blue" },
               { x: 45, y: 0, scale: 3, color: "green_brown" },
               ],

    cats:     [
        // { x: 57, y: 0, scale: 5, chosenOne: true}
               ],
               
    pills:     [{ x: 1.35, y: 6.95, scale: 4},
                { x: 9, y: 0, scale: 4},
                { x: 58, y: 0, scale: 4},
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