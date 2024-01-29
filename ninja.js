class Ninja {
    constructor(game, x, y, facing, state) {
        Object.assign(this, { game, x, y, facing, state });

        this.game.ninja = this;

        // this.x = 0;
        // this.y = 0;
        this.speed = 200;

        // spritesheet
        this.spritesheet = ASSET_MANAGER.getAsset("./ninja.png");

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
        // 0 = idle, 1 = run, 2 = jump, 3 = punch, 5 = hurt, 6 = dead
        this.animations[0][0] = new Animator(this.spritesheet, 0, 0, 42, 63, 7, 0.1, 0,        false, true, false);
        this.animations[0][1] = new Animator(this.spritesheet, 45 * 7 + 5, 0, 40.3, 60, 6, 0.1, 0,        false, true, false);
        this.animations[0][2] = new Animator(this.spritesheet,    60,  200, 32,   45, 2, 0.3, 0, false, true, false);
        this.animations[0][3] = new Animator(this.spritesheet,    60,  300, 40,   40, 2, 0.5, 0, false, true, false);
        this.animations[0][4] = new Animator(this.spritesheet,    55,  470, 45,   40, 2, 0.3, 0, false, true, false);
        this.animations[0][5] = new Animator(this.spritesheet,    60,  555, 45,   55, 2, 0.3, 0, false, true, false);
        this.animations[0][6] = new Animator(this.spritesheet,    60,  750, 50,   50, 2, 1,   0, false, true, false);
        this.animations[0][7] = new Animator(this.spritesheet,    60,  850, 50,   50, 1, 1,   0, false, true, false);

        // 1 = right
        // 0 = idle, 1 = run, 2 = jump, 3 = punch, 5 = hurt, 6 = dead
        this.animations[1][0] = new Animator(this.spritesheet,    60,  110, 32,   50, 3, 0.1, 0, false, true, true);
        this.animations[1][1] = new Animator(this.spritesheet,    60,  160, 32.5, 30, 2, 0.1, 0, false, true, true);
        this.animations[1][2] = new Animator(this.spritesheet,    60,  200, 32,   45, 2, 0.3, 0, false, true, true);
        this.animations[1][3] = new Animator(this.spritesheet,    60,  300, 40,   40, 2, 0.5, 0, false, true, true);
        this.animations[1][4] = new Animator(this.spritesheet,    55,  470, 45,   40, 2, 0.3, 0, false, true, true);
        this.animations[1][5] = new Animator(this.spritesheet,    60,  555, 45,   55, 2, 0.3, 0, false, true, true);
        this.animations[1][6] = new Animator(this.spritesheet,    60,  750, 50,   50, 2, 1,   0, false, true, true);
        this.animations[1][7] = new Animator(this.spritesheet,    60,  850, 50,   50, 1, 1,   0, false, true, true);
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
        this.animations[this.facing][this.state].drawFrame(this.game.clockTick, ctx, this.x , this.y, 3);
    }
}