class Cat {
    constructor(game, x, y, scale, chosenOne) {
        Object.assign(this, { game, x, y, scale, chosenOne});

        this.game.cat = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/cat.png");
        this.fallAcc = 562.5;
        this.velocity = { x: 0, y: 0 };

        this.facing = 0; // 0 = right
        this.state = 0; // 0 = sleeping, picked up

        this.updateBB();
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) { //  2 states
            this.animations.push([]);
            for (var j = 0; j < 1; j++) { // 1 directions
                this.animations[i].push([]);
            }
        }

        // 0 = right
        // 0 = sleeping, 1 = picked up
        this.animations[0][0] = new Animator(this.spritesheet,    96,   207, 30, 16,   1, 0.5,  18, false, true, false);
        this.animations[0][1] = new Animator(this.spritesheet,    0,   0, 100, 100,   2, 0.1,  0, false, true, false);
    };

    updateBB() {
        if (this.state === 0) { // sleeping
            this.BB = new BoundingBox(this.x + 6 * this.scale, this.y, 22 * this.scale, 15 * this.scale);
        } else if (this.state === 1) { // picked up
            this.BB = new BoundingBox(this.x, this.y + 10 * this.scale, 30 * this.scale, 26.67 * this.scale);
        } 
    };

    updateLastBB() {
        this.lastBB = this.BB;
    };

    update () {

        const TICK = this.game.clockTick;  
    
        const RUN_FALL = 2025;
        const RUN_FALL_A = 562.5;

        this.velocity.x = 0;

        if (this.fallAcc === RUN_FALL) {
            this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
        }

        this.velocity.y += this.fallAcc * TICK;
        this.y += this.velocity.y * TICK * PARAMS.SCALE;

        this.updateLastBB();
        this.updateBB(); 
        
        var that = this;
        this.game.entities.forEach((entity) => {
            if (entity.BB && this.BB.collide(entity.BB)) {
                    if (entity instanceof Ground || entity instanceof Brick || entity instanceof Dirt || entity instanceof Branch) { // was above last tick
                        if ((this.lastBB.bottom <= entity.BB.top)) {
                            this.y = entity.BB.top - this.BB.height;

                            that.updateBB();

                            this.velocity.y = 0;
                        } 
                        if ((this.lastBB.right <= entity.BB.left)) {
                            this.x = entity.BB.left - this.BB.width;
                        }

                        if (this.lastBB.left >= entity.BB.right) {
                            this.x = entity.BB.right;
                        }

                        that.updateBB();
                    
                    } 
                }
            });          
        }

    draw(ctx) { 
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        
        if (PARAMS.DEBUG) {            
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}