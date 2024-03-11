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

// Food Pill that gives Naruto one health point
class Pill {
    constructor(game, x, y, scale) {
        Object.assign(this, { game, x, y, scale });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/pills.png");

        this.fallAcc = 562.5;
        this.velocity = { x: 0, y: 0 };

        this.updateBB();
        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 10, 10, 2, 0.2, 0, false, true, false));
        this.elapsedTime = 0;
    };

    updateLastBB() {
        this.lastBB = this.BB;
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 10 * this.scale, 10 * this.scale);
    }

    update() {

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
                            this.velocity.y = 0;
                            that.updateLastBB();
                            that.updateBB();
                        } 

                        if ((this.lastBB.right <= entity.BB.left)) {
                            this.x = entity.BB.left - this.BB.width;
                            that.updateLastBB();
                            that.updateBB();
                        }

                        if (this.lastBB.left >= entity.BB.right) {
                            this.x = entity.BB.right;
                            that.updateLastBB();
                            that.updateBB();
                        }

                        that.updateLastBB();
                        that.updateBB();
                    
                    } else if (entity instanceof Platform) {

                        if ((this.lastBB.bottom <= entity.BB.top)) {

                            this.y = entity.BB.top - this.BB.height;
                            this.x = entity.BB.right - entity.BB.width / 2 - this.BB.width / 2.5;

                            this.velocity.y = 0;

                            that.updateLastBB();
                            that.updateBB();
                        } 

                    } else if (entity instanceof Naruto) {
                        if(entity.currentHealth < entity.maxHealth) {
                            entity.currentHealth++;
                            this.game.addEntity(new Particle(this.game, "pink", 0.5));
                            this.removeFromWorld = true;
                        }
                    }
                }
            });          
        }

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

         //drawing the hitbox of the attack animation
         if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Particle {
    constructor(game, color, scale) {
        Object.assign(this, { game, color, scale });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/particles_" + color + ".png");

        this.animations = [];
        this.animations.push(new Animator(this.spritesheet, 0, 0, 175, 180, 7, 0.2, 0, false, true, false));
        this.elapsedTime = 0;
    };


    update() {

        const TICK = this.game.clockTick;  
    
        this.elapsedTime += TICK;

        if(this.elapsedTime >= 1.4) {
            this.removeFromWorld = true;    
        }     
    }

    draw(ctx) {
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.game.naruto.x - this.game.camera.x, this.game.naruto.y - this.game.camera.y, this.scale);
    };
};

class Kunai {
    constructor(game, x, y, targetX, targetY) {
        Object.assign(this, { game, x, y, targetX, targetY});

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/naruto.png");

        if(this.targetX < this.game.naruto.x) {
            this.facing = 0;
        } else {
            this.facing = 1;
        }

        if(this.facing === 0) { // left
            this.x -= this.game.naruto.BB.width / 6;
        } else { // right
            this.x += this.game.naruto.BB.width / 2;
        }

        this.y += this.game.naruto.BB.height / 2;

        let dx = targetX - this.x;
        let dy = targetY - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        this.velocity = { 
            x: (dx / distance) * 10, // Adjust the speed as needed
            y: (dy / distance) * 10  // Adjust the speed as needed
        };

        this.rotation = Math.atan2(this.velocity.y, this.velocity.x);
        this.degrees = (this.rotation * (180 / Math.PI) + 360) % 360;

        this.scale = 3;
        this.stuck = false;

        this.elapsedTime = 0;
        this.animations = [];

        this.updateBB();
        this.updateAB();
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) { // 2 directions
            this.animations.push([]);
        }

        this.animations[0] = new Animator(this.spritesheet, 75,  82.5,  18, 7, 1, 0.1, 0, false, true, false);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.updateLastBB();
        this.updateBB();
        this.updateAB();

        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if (entity instanceof Frog && this.AB.collide(entity.DB) && entity.state !== 3 && !entity.dead) {
                if (!this.stuck) {
                    entity.state = 3;
                    entity.currentHealth -= 1;
                    this.removeFromWorld = true;
                }
            } else if (!(entity instanceof Naruto) && !(entity instanceof Frog) && !(entity instanceof Kunai)&& !(entity instanceof Kunai) && !(entity instanceof Beam) && !(entity instanceof Pill) && entity.BB && this.lastBB.collide(entity.BB)) {
                if ((this.lastBB.top <= entity.BB.bottom)) {
                    if(!this.stuck) {
                        this.rotation = Math.atan2(this.velocity.y, this.velocity.x);
                        this.velocity = { x: 0, y: 0 };
                        this.stuck = true;
                    }
                }
            }
                this.updateLastBB();
                this.updateBB();
        }
    }
    
    updateLastBB() {
        this.lastBB = this.BB;
    }

    updateBB() {
        // Define the width and height of the bounding box
        let width = 18 * this.scale; // Adjust as needed
        let height = 7 * this.scale; // Adjust as needed
    
        // Calculate the position of the bounding box to center it around the center of the Kunai
        let bbX = this.x - width / 2;
        let bbY = this.y - height / 2;
    
        // Update the bounding box
        this.BB = new BoundingBox(bbX, bbY, width, height);
    }
    
    
    updateAB() {
        this.AB = new BoundingBox(this.x, this.y, 18 * this.scale, 7 * this.scale);
    }

    draw(ctx) { 
        // this.animations[this.facing].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y, this.scale);

        ctx.save(); // Save the current canvas state
        // Translate the canvas origin to the Kunai's position
        ctx.translate(this.x - this.game.camera.x, this.y - this.game.camera.y);        
        // Rotate the canvas context
        ctx.rotate(this.rotation);
        // Draw the Kunai sprite
        this.animations[0].drawFrame(this.game.clockTick, ctx, 0, 0, this.scale);
        // Restore the canvas state
        ctx.restore(); 

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}

class Shuriken {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/naruto.png");
        this.facing = this.game.naruto.facing;
        this.stuck = false; // shuriken has collided with object 

        if(this.facing === 0) { // left
            this.x -= this.game.naruto.BB.width / 6;
            this.velocity = { x: -10, y: 1 };

        } else { // right
            this.x += this.game.naruto.BB.width / 2;
            this.velocity = { x: 10, y: 1 };
        }

        this.y += this.game.naruto.BB.height / 2;

        this.scale = 3;

        this.elapsedTime = 0;
        this.animations = [];

        this.updateBB();
        this.updateAB();
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 1; i++) { // 1 direction
            this.animations.push([]);
        }

        this.animations[0] = new Animator(this.spritesheet, 71.5,  60,  13, 10, 2, 0.1, 0, false, true, false);
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.updateLastBB();
        this.updateBB();
        this.updateAB();

        for (var i = 0; i < this.game.entities.length; i++) {
            var entity = this.game.entities[i];
            if (entity instanceof Frog && this.AB.collide(entity.DB) && entity.state !== 3 && !entity.dead) {
                if(!this.stuck) {
                    entity.state = 3;
                    entity.currentHealth -= 1;
                    this.removeFromWorld = true;
                }
            } else if (!(entity instanceof Naruto) && !(entity instanceof Frog) && !(entity instanceof Shuriken) && !(entity instanceof Kunai) && !(entity instanceof Beam) && !(entity instanceof Pill) && entity.BB && this.lastBB.collide(entity.BB)) {
                if ((this.lastBB.top <= entity.BB.bottom)) {
                    if(!this.stuck) {
                        this.animations[0] = new Animator(this.spritesheet, 71.5 + this.animations[0].currentFrame() * 13,  60,  13, 10, 1, 0.1, 0, false, true, false);
                        this.stuck = true;
                        this.velocity = { x: 0, y: 0 };
                    }
                }
            }
                this.updateLastBB();
                this.updateBB();
        }
     }
    

    updateLastBB() {
        this.lastBB = this.BB;
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, 10 * this.scale, 10 * this.scale);
    };

    updateAB() {
        this.AB = new BoundingBox(this.x, this.y, 10 * this.scale, 10 * this.scale);
    }

    draw(ctx) { 
        this.animations[0].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x , this.y - this.game.camera.y, this.scale);
        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    }
}
