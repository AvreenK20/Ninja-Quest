class Naruto {
    constructor(game, x, y, facing, state) {
        Object.assign(this, { game, x, y, facing, state });

        this.game.naruto = this;

        // this.x = 0;
        // this.y = 0;
        this.speed = 200;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./naruto.png");

        // this.facing = 0; // 0 = left, 1 = right
        // this.state = 0; // 0 = idle, 1 = run, 2 = jump, 3 = crouch, 4 = punch, 5 = throw, 6 = hurt

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
        this.animations[0][0] = new Animator(this.spritesheet,    60,  110, 32,   50, 3, 0.1, 0, true, true, true);
        this.animations[0][1] = new Animator(this.spritesheet,    60,  160, 32.5, 30, 2, 0.1, 0, true, true, true);
        this.animations[0][2] = new Animator(this.spritesheet,    60,  200, 32,   45, 2, 0.3, 0, false, true, true);
        this.animations[0][3] = new Animator(this.spritesheet,    60,  300, 40,   40, 2, 0.5, 0, false, true, true);
        this.animations[0][4] = new Animator(this.spritesheet,    55,  470, 45,   40, 2, 0.3, 0, false, true, true);
        this.animations[0][5] = new Animator(this.spritesheet,    60,  555, 45,   55, 2, 0.3, 0, false, true, true);
        this.animations[0][6] = new Animator(this.spritesheet,    60,  750, 50,   50, 2, 1,   0, false, true, true);
        this.animations[0][7] = new Animator(this.spritesheet,    60,  850, 50,   50, 1, 1,   0, false, true, true);

        // 1 = right
        // 0 = idle, 1 = run, 2 = jump, 3 = crouch, 4 = punch, 5 = throw, 6 = hurt, 7 = dead
        this.animations[1][0] = new Animator(this.spritesheet,    60,  110, 32,   50, 3, 0.1, 0, false, true, false);
        this.animations[1][1] = new Animator(this.spritesheet,    60,  160, 32.5, 30, 2, 0.1, 0, false, true, false);
        this.animations[1][2] = new Animator(this.spritesheet,    60,  200, 32,   45, 2, 0.3, 0, false, true, false);
        this.animations[1][3] = new Animator(this.spritesheet,    60,  300, 40,   40, 2, 0.5, 0, false, true, false);
        this.animations[1][4] = new Animator(this.spritesheet,    55,  470, 45,   40, 2, 0.3, 0, false, true, false);
        this.animations[1][5] = new Animator(this.spritesheet,    60,  555, 45,   55, 2, 0.3, 0, false, true, false);
        this.animations[1][6] = new Animator(this.spritesheet,    60,  750, 50,   50, 2, 1,   0, false, true, false);
        this.animations[1][7] = new Animator(this.spritesheet,    60,  850, 50,   50, 1, 1,   0, false, true, false);
    };

    update() {
        if (this.x > 1024) {
            this.x = -130;
        }

        if (this.x < -130) {
            this.x = 1024;
        }

        if (this.y > 1024) {
            this.y = -130;
        }

        if (this.y < -130) {
            this.y = 1024;
        }

        // this.state = 0; 

        // if (this.game.down && !this.game.up) {
        //     console.log("DOWN");
        //     this.state = 3;
        //     // this.y = this.y + this.speed * this.game.clockTick;
        // }

        // else if (this.game.up && !this.game.down) {
        //     console.log("UP");
        //     this.state = 2;
        //     // this.y = this.y - this.speed * this.game.clockTick;
        // }

        // else if (this.game.left && !this.game.right) {
        //     console.log("LEFT");
        //     this.facing = 0;
        //     this.state = 1;
        //     // this.x = this.x - this.speed * this.game.clockTick;
        // }

        // else if (this.game.right && !this.game.left) {
        //     console.log("RIGHT");
        //     this.facing = 1;
        //     this.state = 1;
        //     // this.x = this.x + this.speed * this.game.clockTick;
        // }

        //  if(this.game.attack) {
        //      this.state = 4; 
        // }

        // if(this.game.throw) {
        //     this.state = 5; 
        // }

        // if(this.game.damage) {
        //     this.state = 6; 
        // }
    };

    draw(ctx) { 

        if(this.state === 1) {
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y + 40, 3); 
        } else if(this.state === 3 || this.state === 4) {
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y + 25, 3);
        } else if(this.state === 5) {
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y - 15, 3);
        } else if(this.state === 7) {
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y + 50, 3);
        }  else {
            this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y, 3);
        }
    }
}

class Weapons {
    constructor(game, x, y, state) {
        Object.assign(this, { game, x, y, state });

        this.game.weapon = this;

        // this.x = 0;
        // this.y = 0;
        this.speed = 200;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./naruto.png");

        // 0 = shuriken, 1 = kunai

        this.animations = [];
        this.loadAnimations();
    };

    loadAnimations() {
        for (var i = 0; i < 2; i++) { // 2 weapon types
            this.animations.push([]);
        }
        
        // 0 = shuriken
        // 1 = kunai
        this.animations[0] = new Animator(this.spritesheet, 70,  55,  15, 25, 2, 0.1, 0, false, true, false);
        this.animations[1] = new Animator(this.spritesheet, 70,  70,  50, 40, 1, 0.1, 0, false, true, false);
    };

    update() {
         
    };

    draw(ctx) { 
            this.animations[this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y, 3);
    }
}