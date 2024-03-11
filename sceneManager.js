class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.coins = 0;
        this.lives = 3;
        this.title = true;
        this.credits = false;
        this.loadLevel(level1, 0, 0, true, false, false);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, gameOver, gameWin) {
        this.level = level;
        this.clearEntities();
        this.x = 0;
        this.y = 0;

        if (transition) {
            this.game.addEntity(new TransitionScreen(this.game, level, x, y, gameOver, gameWin));
        } else {
            this.background = new Background(this.game, 0, 0);
            this.game.addEntity(this.background);
            if (level.trunks) {
                for (var i = 0; i < level.trunks.length; i++) {
                    let trunk = level.trunks[i];
                    this.game.addEntity(new Trunk(this.game, trunk.x * PARAMS.BLOCKWIDTH, trunk.y * PARAMS.BLOCKWIDTH, trunk.size));
                }
            }

            if (level.branches) {
                for (var i = 0; i < level.branches.length; i++) {
                    let branch = level.branches[i];
                    this.game.addEntity(new Branch(this.game, branch.x * PARAMS.BLOCKWIDTH, branch.y * PARAMS.BLOCKWIDTH, branch.size));
                }
            }

            if (level.beams) {
                for (var i = 0; i < level.beams.length; i++) {
                    let beam = level.beams[i];
                    this.game.addEntity(new Beam(this.game, beam.x * PARAMS.BLOCKWIDTH, beam.y * PARAMS.BLOCKWIDTH, beam.size * PARAMS.BLOCKWIDTH, beam.scale, beam.type));
                }
            }

            if (level.dirt) {
                for (var i = 0; i < level.dirt.length; i++) {
                    let dirt = level.dirt[i];
                    this.game.addEntity(new Dirt(this.game, dirt.x * PARAMS.BLOCKWIDTH, dirt.y * PARAMS.BLOCKWIDTH, dirt.size * PARAMS.BLOCKWIDTH, dirt.type));
                }
            }

            if (level.bricks) {
                for (var i = 0; i < level.bricks.length; i++) {
                    let brick = level.bricks[i];
                    this.game.addEntity(new Brick(this.game, brick.x * PARAMS.BLOCKWIDTH, brick.y * PARAMS.BLOCKWIDTH, brick.size * PARAMS.BLOCKWIDTH));
                }
            }

            if (level.ground) {
                for (var i = 0; i < level.ground.length; i++) {
                    let ground = level.ground[i];
                    this.game.addEntity(new Ground(this.game, ground.x * PARAMS.BLOCKWIDTH, ground.y * PARAMS.BLOCKWIDTH, ground.size * PARAMS.BLOCKWIDTH));
                }
            }

            if (level.edges) {
                for (var i = 0; i < level.edges.length; i++) {
                    let edge = level.edges[i];
                    this.game.addEntity(new Edge(this.game, edge.x * PARAMS.BLOCKWIDTH, edge.y * PARAMS.BLOCKWIDTH, edge.type));
                }
            }

            if (level.leaves) {
                for (var i = 0; i < level.leaves.length; i++) {
                    let leaf = level.leaves[i];
                    this.game.addEntity(new Leaf(this.game, leaf.x * PARAMS.BLOCKWIDTH, leaf.y * PARAMS.BLOCKWIDTH, leaf.size, leaf.color));
                }
            }

            if (level.platforms) {
                for (var i = 0; i < level.platforms.length; i++) {
                    let platform = level.platforms[i];
                    this.game.addEntity(new Platform(this.game, platform.x * PARAMS.BLOCKWIDTH, platform.y * PARAMS.BLOCKWIDTH, platform.size * PARAMS.BLOCKWIDTH, platform.scale, platform.type, platform.moving, platform.direction, platform.speed));
                }
            }

            if (level.frogs) {
                for (var i = 0; i < level.frogs.length; i++) {
                    let frog = level.frogs[i];
                    this.game.addEntity(new Frog(this.game, frog.x * PARAMS.BLOCKWIDTH, frog.y * PARAMS.BLOCKWIDTH, frog.scale, frog.color));
                }
            }

            if (level.cats) {
                for (var i = 0; i < level.cats.length; i++) {
                    let cat = level.cats[i];
                    this.game.addEntity(new Cat(this.game, cat.x * PARAMS.BLOCKWIDTH, cat.y * PARAMS.BLOCKWIDTH, cat.scale, cat.chosenOne));
                }
            }
            
            if (level.pills) {
                for (var i = 0; i < level.pills.length; i++) {
                    let pill = level.pills[i];
                    this.game.addEntity(new Pill(this.game, pill.x * PARAMS.BLOCKWIDTH, pill.y * PARAMS.BLOCKWIDTH, pill.scale));
                }
            }

            if (level.players) {
                for (var i = 0; i < level.players.length; i++) {
                    let player = level.players[i];
                    this.naruto = new Naruto(this.game, player.x * PARAMS.BLOCKWIDTH, player.y * PARAMS.BLOCKWIDTH);
                    this.game.addEntity(this.naruto);
                }
            }

            // Focus game camera on Naruto's starting point
            this.x = this.naruto.x;
            this.y = this.naruto.y;

            this.naruto.removeFromWorld = false;
            this.naruto.velocity = { x: 0, y: 0 };
            this.naruto.state = 0 

            var that = this;
            var naruto = false;
            this.game.entities.forEach(function(entity) {
                if(that.naruto === entity) naruto = true;
            });
            this.game.camera.paused = false;
        } 
    };

    update() {
        if (this.game.naruto) {
            if (this.game.naruto.gameOver || this.game.naruto.gameWin) {
                this.loadLevel(this.level, 0, 0, true, this.game.naruto.gameOver, this.game.naruto.gameWin);
            }
    
            PARAMS.DEBUG = document.getElementById('debug').checked;
            PARAMS.CREATIVE = document.getElementById('creative').checked;
    
            // Calculate the midpoint of the canvas
            let midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
            let midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2;
    
            // Set the target position for the camera to follow Naruto
            let targetX = this.game.naruto.x - midpointX;
            let targetY = this.game.naruto.y - midpointY;
    
            // Set interpolation factors for smoother camera movement
            let interpolationFactorX = 0.1; // Adjust as needed for desired smoothness
            let interpolationFactorY = 0.1; // Adjust as needed for desired smoothness
    
            // Interpolate camera position towards the target position
            // Only update x-coordinate if Naruto is to the right of the midpoint
            if (this.game.naruto.x > midpointX) {
                this.x += (targetX - this.x) * interpolationFactorX;
            }
    
            // Only update y-coordinate if Naruto is below the midpoint
            if (this.game.naruto.y > midpointY) {
                this.y += (targetY - this.y) * interpolationFactorY;
            }
        }
    };    
    
    draw(ctx) {}
};
