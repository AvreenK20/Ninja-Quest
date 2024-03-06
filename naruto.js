class Naruto {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y});

        this.game.naruto = this;
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/naruto.png");
        this.scale = 3;

        this.dead = false;
        this.gameOver = false;
        this.gameWin = false;

        this.speed = 25 * this.scale;

        // this.radius = 10 * this.scale;

        this.currentHealth = 10;
        this.maxHealth = 10;
        this.healthbar = new HealthBar(this);

        this.facing = 1; // 0 = left, 1 = right
        this.state = 0; // 0 = idle, 1 = run, 2 = jump, 3 = crouch, 4 = punch, 5 = throw, 6 = hurt
        this.grounded = false;
        this.velocity = { x: 0, y: 0 };
        this.fallAcc = 562.5;

        this.elapsedTime = 0; // time since animation per action begins
        this.elapsedTimeAttack = 0; // duration for attack
        this.elapsedTimeThrowKunai = 0.6; // duration for kunai being thrown
        this.elapsedTimeThrowShuriken = 0.6; // duration for kunai being thrown

        this.shurikenCount = 5;
        this.kunaiCount = 5;

        this.throwShuriken = false;
        this.throwKunai = false;

        this.updateBB(); // bounding box
        this.updateDB(); // damage box (character takes damage)
        this.updateAB(); // attack box (character attacks)
        this.updateCircle(); // circle (enemies attack character at this radius)
        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) { // 2 directions
            this.animations.push([]);
            for (var j = 0; j < 7; j++) { // 7 states
                this.animations[i].push([]);
            }
        }
        
        // 0 = left
        // 0 = idle, 1 = run, 2 = jump, 3 = crouch, 4 = punch, 5 = throw, 6 = hurt, 7 = dead
        this.animations[0][0] = new Animator(this.spritesheet,    66,   113,   23,   37,   3, 0.3,  8, false, true, true);
        this.animations[0][1] = new Animator(this.spritesheet,    62,   150.5, 31,   37,   2, 0.1,  0, false, true, true);
        this.animations[0][2] = new Animator(this.spritesheet,    65,   200,   28,   42.5, 1, 0.65, 3, false, true, true);
        this.animations[0][3] = new Animator(this.spritesheet,    63,   297,   26,   37,   2, 0.3, 17, false, true, true);
        this.animations[0][4] = new Animator(this.spritesheet,    56.5, 468,   39,   37,   2, 0.2,  5, false, true, true);
        this.animations[0][5] = new Animator(this.spritesheet,    72,   566.5, 30,   37,   2, 0.3, 15, false, true, true);
        this.animations[0][6] = new Animator(this.spritesheet,    67,   759,   38,   37,   2, 0.5, 16, false, true, true);
        this.animations[0][7] = new Animator(this.spritesheet,    65,   845.5, 40,   37,   1, 0.3,  5, false, true, true);
 
        // 1 = right
        // 0 = idle, 1 = run, 2 = jump, 3 = crouch, 4 = punch, 5 = throw, 6 = hurt, 7 = dead
        this.animations[1][0] = new Animator(this.spritesheet,    66,   113,   23,   37,   3, 0.3,  8, false, true, false);
        this.animations[1][1] = new Animator(this.spritesheet,    62,   150.5, 31,   37,   2, 0.1,  0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheet,    65,   200,   28,   42.5, 1, 0.65, 3, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet,    63,   297,   26,   37,   2, 0.3, 17, false, true, false);
        this.animations[1][4] = new Animator(this.spritesheet,    56.5, 468,   39,   37,   2, 0.2,  5, false, true, false);
        this.animations[1][5] = new Animator(this.spritesheet,    72,   566.5, 30,   37,   2, 0.3, 15, false, true, false);
        this.animations[1][6] = new Animator(this.spritesheet,    67,   759,   38,   37,   2, 0.5, 16, false, true, false);
        this.animations[1][7] = new Animator(this.spritesheet,    65,   845.5, 40,   37,   1, 0.3,  5, false, true, false);
    };

    updateCircle() {
        this.BC = new BoundingCircle(this.BB.x + this.BB.width / 2, this.BB.y + this.BB.height / 2, 10 * this.scale, 0);
    }

    updateBB() {
        if (this.state === 0) {
            this.BB = new BoundingBox(this.x, this.y, 23.33 * this.scale, 36.67 * this.scale);
        } else if (this.state === 1) {
            this.BB = new BoundingBox(this.x, this.y + 10 * this.scale, 30 * this.scale, 26.67 * this.scale);
        } else if (this.state === 2) {
            this.BB = new BoundingBox(this.x, this.y, 28.33 * this.scale, 41 * this.scale);
        } else if (this.state === 3) {
            this.BB = new BoundingBox(this.x, this.y + 10 * this.scale, 25 * this.scale, 26.67 * this.scale);
        } else if (this.state === 4) {
            this.BB = new BoundingBox(this.x, this.y + 3 * this.scale, 38.33 * this.scale, 33 * this.scale);
        } else if (this.state === 5) {
            this.BB = new BoundingBox(this.x, this.y + 1.67 * this.scale, 30 * this.scale, 35 * this.scale);
        } else if (this.state === 6) {
            this.BB = new BoundingBox(this.x, this.y + 1.67 * this.scale, 38.33 * this.scale, 35 * this.scale);
        } else if (this.state === 7) {
            this.BB = new BoundingBox(this.x, this.y + 20 * this.scale, 40 * this.scale, 12 * this.scale);
        }
    };

    updateLastBB() {
        this.lastBB = this.BB;
    };

    updateAB() {
        if(this.state === 4) {
            if(this.facing === 0) { // left
                this.AB = new BoundingBox(this.x, this.y + this.BB.height / 1.75, 16 * this.scale, 16 * this.scale);
            } else { // right
                this.AB = new BoundingBox(this.x + this.BB.width / 1.75, this.y + this.BB.height / 1.75, 16 * this.scale, 16 * this.scale);
            }
        } else {
            this.AB = new BoundingBox(this.x, this.y, 0, 0);
        }
    }

    updateLastAB() {
        this.lastAB = this.AB;
    }

    updateDB() {
        if (this.state === 0) {
            this.DB = new BoundingBox(this.x, this.y, 23.33 * this.scale, 36.67 * this.scale);
        } else if (this.state === 1) {
            this.DB = new BoundingBox(this.x, this.y + 10 * this.scale, 30 * this.scale, 26.67 * this.scale);
        } else if (this.state === 2) {
            this.DB = new BoundingBox(this.x, this.y, 28.33 * this.scale, 41 * this.scale);
        } else if (this.state === 3) {
            this.DB = new BoundingBox(this.x, this.y + 10 * this.scale, 25 * this.scale, 26.67 * this.scale);
        } else if (this.state === 4) {
            this.DB = new BoundingBox(this.x, this.y + 3 * this.scale, 38.33 * this.scale, 33 * this.scale);
        } else if (this.state === 5) {
            this.DB = new BoundingBox(this.x, this.y + 1.67 * this.scale, 30 * this.scale, 35 * this.scale);
        } else if (this.state === 6) {
            this.DB = new BoundingBox(this.x, this.y + 1.67 * this.scale, 38.33 * this.scale, 35 * this.scale);
        } else if (this.state === 7) {
            this.DB = new BoundingBox(this.x, this.y + 20 * this.scale, 40 * this.scale, 12 * this.scale);
        }
    }

    updateLastDB() {
        this.lastDB = this.DB;
    }

    die() {
        this.state = 7;
        this.dead = true;
        this.gameOver = true;
        this.gameWin = false;
    }

    update () {
        if(PARAMS.CREATIVE) {
            this.creativeSpeed = 1000;

            if (this.game.right) {
                this.x = this.x + this.creativeSpeed * this.game.clockTick;
                this.facing = 1;
            }    
            if (this.game.left) {
                this.x = this.x - this.creativeSpeed * this.game.clockTick;
                this.facing = 0;
            }   
            if (this.game.up) {
                this.y = this.y - this.creativeSpeed * this.game.clockTick;
            }    
            if (this.game.down) {
                this.y = this.y + this.creativeSpeed * this.game.clockTick;
            }  

            this.updateCircle();
            this.updateLastBB();
            this.updateBB();
            this.updateLastAB();
            this.updateAB();
            this.updateLastDB();
            this.updateDB();
        } else {
            const TICK = this.game.clockTick;  

            if(this.state !== 0) {

                this.elapsedTime += TICK;
                this.elapsedTimeAttack += TICK;

                this.elapsedTimeThrowKunai += TICK;
                this.elapsedTimeThrowShuriken += TICK;
                

                if(this.animations[this.facing][this.state].totalTime <= this.elapsedTime) {
                    this.animations[this.facing][this.state].elapsedTime = 0; // reset animation?
                    this.state = 0;
                    this.elapsedTime = 0;
                }
            }

            if(this.currentHealth <= 0 || this.y > PARAMS.BLOCKWIDTH * 16) {
                this.die();
            }

            const RUN_FALL = 2025;
            const RUN_FALL_A = 562.5;

            this.velocity.x = 0;

            if(!this.dead) {

            if (this.game.left && !this.game.right) {
                this.facing = 0;
                if (this.state !== 2 && this.state !== 4 && this.state !== 5 && this.state !== 6) { // If not jumping, set the state to running
                    this.state = 1;
                }

                this.velocity.x -= this.speed;
            }
            
            if (this.game.right && !this.game.left) {
                this.facing = 1;
                if (this.state !== 2 && this.state !== 4 && this.state !== 5 && this.state !== 6) { // If not jumping, set the state to running
                    this.state = 1;
                }
                
                this.velocity.x += this.speed;
            }

            if (this.game.down && !this.game.up) {
                this.velocity.x = 0;
                this.state = 3;
            }

            if (this.game.up && !this.game.down && this.grounded && this.velocity.y === 0) {
                this.state = 2;
                this.velocity.y = -200;
                this.fallAcc = RUN_FALL;
                this.grounded = false;   
            }

            if (this.fallAcc === RUN_FALL) {
                this.velocity.y -= (RUN_FALL - RUN_FALL_A) * TICK;
            }

            if (this.game.attack) {
                this.state = 4;
                this.velocity.x = 0;
            }

            if(this.game.throw && this.shurikenCount > 0) {
                this.state = 5;
                this.velocity.x = 0;
                this.throwShuriken = true;
            }

            if(this.game.throw2 && this.kunaiCount > 0) {
                this.state = 5;
                this.velocity.x = 0;
                this.throwKunai = true;
            }

            if (this.elapsedTimeThrowShuriken >= 0.6 && this.throwShuriken) {
                if (this.state === 5 && this.animations[this.facing][5].currentFrame() === 1) {
                    this.game.addEntity(new Shuriken(this.game, this.x, this.y));
                    this.shurikenCount--;
                    this.elapsedTimeThrowShuriken = 0;
                    this.throwShuriken = false;
                }
            }

            if (this.elapsedTimeThrowKunai >= 0.6 && this.throwKunai) {
                if (this.state === 5 && this.animations[this.facing][5].currentFrame() === 1) {
                    this.game.addEntity(new Kunai(this.game, this.x, this.y, this.game.mouse.x + this.game.camera.x, this.game.mouse.y + this.game.camera.y));
                    this.kunaiCount--;
                    this.elapsedTimeThrowKunai = 0;
                    this.throwKunai = false;
                }
            }

            if (this.game.damage) {
                this.state = 6;   
            }

            if (this.game.dead) {
                this.state = 7;
            }

            this.velocity.y += this.fallAcc * TICK;
            
            this.x += this.velocity.x * TICK * PARAMS.SCALE;
            this.y += this.velocity.y * TICK * PARAMS.SCALE;
            this.updateLastBB();
            this.updateBB(); 
            
            var that = this;
            this.game.entities.forEach((entity) => {
                if (entity.BB && this.BB.collide(entity.BB)) {
                        if (entity instanceof Ground || entity instanceof Brick || entity instanceof Dirt || entity instanceof Branch || entity instanceof Edge || entity instanceof Platform) { // was above last tick
                            this.grounded = true;
                            if ((this.lastBB.bottom <= entity.BB.top)) {
                                if(that.state === 1 || that.state === 3) { // run, jump
                                    this.y = entity.BB.top - this.BB.height - 10 * this.scale;
                                } else if (this.state === 4) {
                                    this.y = entity.BB.top - this.BB.height - 3 * this.scale; 
                                } else if (this.state === 5 || this.state === 6) {
                                    this.y = entity.BB.top - this.BB.height - 1.67 * this.scale;
                                } else if (this.state === 7) {
                                    this.y = entity.BB.top - this.BB.height - 20 * this.scale;
                                } else { // idle
                                    this.y = entity.BB.top - this.BB.height;
                                }

                                if (entity instanceof Platform && entity.moving) {
                                    this.x += entity.speed * entity.game.clockTick * entity.direction
                                }

                                that.updateBB();

                                this.velocity.y = 0;

                            } else if ((entity instanceof Dirt || entity instanceof Edge) && (this.lastBB.top >= entity.BB.bottom)) { // nartuo cannot jump through dirt
                                this.y = entity.BB.bottom;
                                this.velocity.y = 0;
                                this.grounded = false;
                            } else { // naruto is not on the ground 
                                this.grounded = false;
                            }

                            if ((this.lastBB.right <= entity.BB.left)) {
                                this.x = entity.BB.left - this.BB.width;
                            }

                            if (this.lastBB.left >= entity.BB.right) {
                                this.x = entity.BB.right;
                            }

                            that.updateBB();
                        } 
                        else if (entity instanceof Shuriken) {
                            if(entity.stuck) {
                                this.shurikenCount++;
                                entity.removeFromWorld = true;
                            }
                        }
                        else if (entity instanceof Kunai) {
                            if(entity.stuck) {
                                this.kunaiCount++;
                                entity.removeFromWorld = true;
                            }
                        }
                        else if (entity instanceof Cat) {
                            if(entity.chosenOne) {
                                this.gameWin = true;
                            }
                        }
                        
                        that.updateBB();
                    }
                    if (entity instanceof Frog) {
                        if (this.AB.collide(entity.DB) && this.state === 4) {
                            if (this.elapsedTimeAttack >= 0.40 && !entity.dead && entity.state !== 3) {
                                entity.state = 3;
                                entity.currentHealth -= 1;
                                this.elapsedTimeAttack = 0;
                            }
                        }
                    }   
                    
                }); 
            }  
            
            this.updateCircle();
            this.updateLastBB();
            this.updateBB();
            this.updateLastAB();
            this.updateAB();
            this.updateLastDB();
            this.updateDB();
        }
    }

    draw(ctx) { 
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x - this.game.camera.x, this.y - this.game.camera.y, this.scale);
        
        // Shuriken Tracker  (Top Right of Canvas)
        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/naruto.png"), 71.5, 60, 13, 10, PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH / 1.2, PARAMS.BLOCKWIDTH / 8, 13 * this.scale, 10 * this.scale); // {source x, source y, width, height (SPRITESHEET)}, {position x, position y, size x, size y (CANVAS)}
        ctx.font = "32px PixelFont";
        ctx.fillText("x" + this.shurikenCount + "", PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH / 2.5, PARAMS.BLOCKWIDTH / 2.5);

        ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/naruto.png"), 75, 82.5,  18, 7,  PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH * 2, PARAMS.BLOCKWIDTH / 5, 18 * this.scale, 7 * this.scale); // {source x, source y, width, height (SPRITESHEET)}, {position x, position y, size x, size y (CANVAS)}
        ctx.font = "32px PixelFont";
        ctx.fillText("x" + this.kunaiCount + "", PARAMS.CANVAS_WIDTH - PARAMS.BLOCKWIDTH / 0.75, PARAMS.BLOCKWIDTH / 2.5);

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
