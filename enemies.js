class Frog {
    constructor(game, x, y, scale, color) {
        Object.assign(this, { game, x, y, scale, color });

        this.game.frog = this;

        // Frog state
        this.facing = 1; // 0 = left, 1 = right
        this.state = 0; // 0 = idle, 1 = run/jump, 2 = attack, 3 = hurt, 4 = dead
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;
        this.elapsedTime = 0; // track animation time 
        this.elapsedTimeAttack = 0;
        this.dead = false;

        this.healthbar = new HealthBar(this);

        this.currentHealth = 3;
        this.maxHealth = 3;

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/enemies/frog_" + this.color + ".png");

        this.speed = 25; // pixels per second

        this.updateBB();
        this.updateDB();
        this.updateAB();
        this.updateCircle();
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) { // 2 directions
            this.animations.push([]);
            for (var j = 0; j < 5; j++) { // 5 states
                this.animations[i].push([]);
            }
        }
        
        // 0 = left
        // 0 = idle, 1 = run/jump, 2 = attack, 3 = damage, 4 = explode/dead
        this.animations[0][0] = new Animator(this.spritesheet,    10,    16,   25,   18,   8, 0.5, 23, false, true, true);
        this.animations[0][1] = new Animator(this.spritesheet,    10,    58,   25,   30,   7, 0.1, 23, false, true, true);
        this.animations[0][2] = new Animator(this.spritesheet,    10,   110,   35,   30,   6, 0.1,   13, false, true, true);
        this.animations[0][3] = new Animator(this.spritesheet,    10,   160,   25,   30,   4, 0.2, 23, false, true, true);
        this.animations[0][4] = new Animator(this.spritesheet,    10,   205,   25,   20,   9, 0.3, 23, false, false, true);
 
        // 1 = right
        // 0 = idle, 1 = run/jump, 2 = attack, 3 = damage, 4 = explode/dead
        this.animations[1][0] = new Animator(this.spritesheet,    10,    16,   25,   18,   8, 0.5, 23, false, true, false);
        this.animations[1][1] = new Animator(this.spritesheet,    10,    58,   25,   30,   7, 0.1, 23, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheet,    10,   110,   35,   30,   6, 0.1,   13, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet,    10,   160,   25,   30,   4, 0.2, 23, false, true, false);
        this.animations[1][4] = new Animator(this.spritesheet,    10,   205,   25,   20,   9, 0.3, 23, false, false, false);
    };

    updateCircle() {
        this.BC = new BoundingCircle(this.BB.x + this.BB.width / 2, this.BB.y + this.BB.height / 2, 10 * this.scale, 125 * this.scale);
    }

    updateBB() {
        if (this.state === 1) {
            this.BB = new BoundingBox(this.x, this.y, 25 * this.scale, 22 * this.scale);
        } else if (this.state === 2) {
            this.BB = new BoundingBox(this.x, this.y, 34 * this.scale, 19.5 * this.scale);
        } else if (this.state === 3) {
            this.BB = new BoundingBox(this.x, this.y, 25 * this.scale, 16 * this.scale);
        } else if (this.state === 4) {
            this.BB = new BoundingBox(this.x, this.y, 25 * this.scale, 20 * this.scale);
        } else {
            this.BB = new BoundingBox(this.x, this.y, 20 * this.scale, 15.5 * this.scale);
        }
    };

    updateLastBB() {
        this.lastBB = this.BB;
    };

    updateDB() {
        if (this.state === 1) {
            this.DB = new BoundingBox(this.x, this.y, 25 * this.scale, 23.5 * this.scale);
        } else if (this.state === 2) {
            this.DB = new BoundingBox(this.x, this.y, 34 * this.scale, 19.5 * this.scale);
        } else if (this.state === 3) {
            this.DB = new BoundingBox(this.x, this.y, 25 * this.scale, 16 * this.scale);
        } else if (this.state === 4) {
            this.DB = new BoundingBox(this.x, this.y, 25 * this.scale, 20 * this.scale);
        } else {
            this.DB = new BoundingBox(this.x, this.y, 20 * this.scale, 15.5 * this.scale);
        }
    }

    updatelastDB() {
        this.lastDB = this.DB;
    }
    
    updateAB() {
        if (this.state === 2) {
            if(this.facing === 0) { // left
                this.AB = new BoundingBox(this.x, this.y + 6 * this.scale, 25 * this.scale, 5 * this.scale);
            } else {
                this.AB = new BoundingBox(this.x + 10 * this.scale, this.y + 6 * this.scale, 25 * this.scale, 5 * this.scale);
            }
        } else {
            this.AB = new BoundingBox(this.x, this.y, 0, 0);
        }
    }

    updateLastAB() {
        this.lastAB = this.lastAB;
    }

    update() {        
        if(this.currentHealth <= 0) {
            this.state = 4;
            this.dead = true;
        }

        const TICK = this.game.clockTick;
    
        // Update elapsed time for animations
        if (this.state !== 0) {
            
            this.elapsedTime += TICK;

            this.elapsedTimeAttack += TICK;
            
            if(this.dead && this.animations[this.facing][this.state].totalTime <= this.elapsedTime) 
            {
                this.removeFromWorld = true; // death animation has played, remove from world
            }

            else if (this.animations[this.facing][this.state].totalTime <= this.elapsedTime) {
                this.state = 0;
                this.elapsedTime = 0;
            }
        }

        this.velocity.x = 0;

        if(!this.dead) {
            // Frog faces Naruto 
            if (this.game.camera.naruto.x < this.x){
                this.facing = 0;
            } else {
                this.facing = 1;
            }
        }

            if(this.state !== 2 && this.state !== 3 & this.state !== 4) {
                // if Naruto is within visualRadius, frog will follow 
                if (this.BC.canSee(this.BC, this.game.naruto.BC) && (this.x > this.game.naruto.x) && (this.x - this.game.naruto.x >= 1) && !(this.BC.collide(this.BC, this.game.naruto.BC))) {
                    this.velocity.x -= this.speed;
                    if (this.state !== 3) {
                        this.state = 1;
                    }
                } else if (this.BC.canSee(this.BC, this.game.naruto.BC) && (this.x < this.game.naruto.x) && (this.x - this.game.naruto.x <= 1) && !(this.BC.collide(this.BC, this.game.naruto.BC))) {
                    this.velocity.x += this.speed;
                    if(this.state !== 3) {
                        this.state = 1;
                    }
                }
                
                // Update frog's velocity based on gravity
                this.velocity.y += this.fallAcc * TICK;
                
                // Update frog's position based on velocity
                this.x += this.velocity.x * TICK * PARAMS.SCALE;
                this.y += this.velocity.y * TICK * PARAMS.SCALE;
            } else {
                this.velocity.y += this.fallAcc * TICK;
                this.y += this.velocity.y * TICK * PARAMS.SCALE;
            }

            this.updateBB();
        
            // Handle collision with ground
            var that = this;
            this.game.entities.forEach((entity) => {
                if (entity.BB && this.BB.collide(entity.BB)) {
                    if (entity instanceof Ground || entity instanceof Platform) {
                        if ((this.lastBB.bottom <= entity.BB.top)) {
                            this.y = entity.BB.top - this.BB.height;
                            // Update bounding box
                            that.updateLastBB();
                            that.updateBB();
                            // Reset vertical velocity
                            this.velocity.y = 0;
                        }

                        if ((this.lastBB.right <= entity.BB.left)) {
                            this.x = entity.BB.left - this.BB.width;
                        }

                        if (this.lastBB.left >= entity.BB.right) {
                            this.x = entity.BB.right;
                        }

                        that.updateLastBB();
                        that.updateBB();
                    }

                    if (entity instanceof Naruto && this.BC.canSee(this.BC, entity.BC) && !entity.dead) {
                        if (this.state === 0 || this.state === 1) {
                            this.state = 2;
                            this.elapsedTimeAttack += TICK;
                            this.elapsedTime = 0;
                        } else if (this.state === 2 && this.elapsedTimeAttack >= 0.60 && this.AB.collide(entity.DB) && entity.state !== 6) {
                            entity.state = 6;
                            entity.currentHealth -= 1;
                            this.elapsedTimeAttack = 0;
                        }

                        }
                    } 
                });   

            // Update bounding boxes
            this.updateLastBB();
            this.updateBB();

            this.updatelastDB();
            this.updateDB();
            this.updateLastAB();
            this.updateAB();
            this.updateCircle();
    }
    
    draw(ctx) {

        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);

        if(!this.dead) {
            this.healthbar.draw(ctx);
        }
        
        if (PARAMS.DEBUG) {
                       // BC - BoundingCircle
                       ctx.strokeStyle = "Red";
                       ctx.beginPath();
                       ctx.arc(this.BC.x - this.game.camera.x, this.BC.y - this.game.camera.y, this.BC.radius, 0, 2 * Math.PI);
                       ctx.closePath();
                       ctx.stroke();
           
                       // DB
                       ctx.strokeStyle = "Blue";
                       ctx.strokeRect(this.DB.x - this.game.camera.x, this.DB.y - this.game.camera.y, this.DB.width, this.DB.height);
           
                       // AB
                       if(this.AB) {
                       ctx.strokeStyle = "Yellow";
                       ctx.strokeRect(this.AB.x - this.game.camera.x, this.AB.y - this.game.camera.y, this.AB.width, this.AB.height);
                       }
                       // BB - BoundingBox
                       // ctx.strokeStyle = "Purple";
                       // ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}