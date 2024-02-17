class SceneManager {
    constructor(game) {
        this.game = game;
        this.game.camera = this;
        this.x = 0;
        this.y = 0;
        this.score = 0;
        this.coins = 0;
        this.lives = 3;

        this.gameOver = false;

        this.title = true;
        this.credits = false;
        this.level = null;

        this.naruto = new Naruto(this.game, 0, 0);
        this.game.addEntity(this.naruto);

        this.loadLevel(levelOne, 0, 0, false, true);
    };

    clearEntities() {
        this.game.entities.forEach(function (entity) {
            entity.removeFromWorld = true;
        });
    };

    loadLevel(level, x, y, transition, title) {
        this.title = title;
        this.level = level;
        this.clearEntities();
        this.x = 0;
        this.y = 0;
    
        if (transition) {
            // this.game.addEntity(new TransitionScreen(this.game, level, x, y, title));
        } else {
            if (level.frogs) {
                for (var i = 0; i < level.frogs.length; i++) {
                    let frog = level.frogs[i];
                    this.game.addEntity(new Frog(this.game, frog.x * PARAMS.BLOCKWIDTH, frog.y * PARAMS.BLOCKWIDTH, frog.scale, frog.color));
                }
            }
            if (level.cats) {
                for (var i = 0; i < level.cats.length; i++) {
                    let cat = level.cats[i];
                    this.game.addEntity(new Cat(this.game, cat.x * PARAMS.BLOCKWIDTH, cat.y * PARAMS.BLOCKWIDTH, cat.scale));
                }
            }
            if (level.platforms) {
                for (var i = 0; i < level.platforms.length; i++) {
                    let platform = level.platforms[i];
                    this.game.addEntity(new Platform(this.game, platform.x * PARAMS.BLOCKWIDTH, platform.y * PARAMS.BLOCKWIDTH, platform.size * PARAMS.BLOCKWIDTH, platform.scale, platform.type, platform.moving, platform.direction));
                }
            } 
            if (level.leaves) {
                for (var i = 0; i < level.leaves.length; i++) {
                    let leaf = level.leaves[i];
                    this.game.addEntity(new Leaf(this.game, leaf.x * PARAMS.BLOCKWIDTH, leaf.y * PARAMS.BLOCKWIDTH, leaf.size, leaf.color));
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
            if (level.bricks) {
                for (var i = 0; i < level.bricks.length; i++) {
                    let brick = level.bricks[i];
                    this.game.addEntity(new Brick(this.game, brick.x * PARAMS.BLOCKWIDTH, brick.y * PARAMS.BLOCKWIDTH, brick.size * PARAMS.BLOCKWIDTH));
                }
            }  
            if (level.dirt) {
                for (var i = 0; i < level.dirt.length; i++) {
                    let dirt = level.dirt[i];
                    this.game.addEntity(new Dirt(this.game, dirt.x * PARAMS.BLOCKWIDTH, dirt.y * PARAMS.BLOCKWIDTH, dirt.size * PARAMS.BLOCKWIDTH, dirt.type));
                }
            } 
            if (level.beams) {
                for (var i = 0; i < level.beams.length; i++) {
                    let beam = level.beams[i];
                    this.game.addEntity(new Beam(this.game, beam.x * PARAMS.BLOCKWIDTH, beam.y * PARAMS.BLOCKWIDTH, beam.size * PARAMS.BLOCKWIDTH, beam.scale, beam.type));
                }
            } 
            if (level.branches) {
                for (var i = 0; i < level.branches.length; i++) {
                    let branch = level.branches[i];
                    this.game.addEntity(new Branch(this.game, branch.x * PARAMS.BLOCKWIDTH, branch.y * PARAMS.BLOCKWIDTH, branch.size));
                }
            }  
            if (level.trunks) {
                for (var i = 0; i < level.trunks.length; i++) {
                    let trunk = level.trunks[i];
                    this.game.addEntity(new Trunk(this.game, trunk.x * PARAMS.BLOCKWIDTH, trunk.y * PARAMS.BLOCKWIDTH, trunk.size));
                }
            }                  

            this.background = new Background(this.game, 0, 0);
            this.game.addEntity(this.background);
            
            this.naruto.x = x;
            this.naruto.y = y;
            this.naruto.removeFromWorld = false;
            this.naruto.velocity = { x: 0, y: 0 };
            this.naruto.state = 0 

            var that = this;
            var naruto = false;
            this.game.entities.forEach(function(entity) {
                if(that.naruto === entity) naruto = true;
            });
            if(!naruto) this.game.addEntity(this.naruto);

            this.game.camera.paused = false;
        }

        this.naruto.x = x;
        this.naruto.y = y;
    };

    update() {
        PARAMS.DEBUG = document.getElementById('debug').checked;
    
        // Calculate the midpoint of the canvas 
        let midpointX = PARAMS.CANVAS_WIDTH / 2 - PARAMS.BLOCKWIDTH / 2;
        let midpointY = PARAMS.CANVAS_HEIGHT / 2 - PARAMS.BLOCKWIDTH / 2;
    
        // Update the camera's x-coordinate to follow Naruto horizontally
        if (this.naruto.x - midpointX > 0) {
            this.x = this.naruto.x - midpointX;
        }

        // Update the camera's y-coordinate to follow Naruto vertically 
        if (this.naruto.y - midpointY > 0 && this.naruto.y < PARAMS.CANVAS_HEIGHT - PARAMS.BLOCKWIDTH * 1.1) this.y = this.naruto.y - midpointY;
    };

    draw(ctx) {

    }
};
