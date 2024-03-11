const xOffset = 1.05;
const yOffset = 1.03; 

class Ground { // Always has two Edge Blocks (One on its left, one on its right)
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
    };

    update() {};

    draw(ctx) {
        let brickCount = this.w / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            ctx.drawImage(this.spritesheet, 96, 0, 16, 16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y  - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
};

class Brick {
    constructor(game, x, y, w) {
        Object.assign(this, { game, x, y, w });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
    };

    update() {};

    draw(ctx) {
        let brickCount = this.w / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            ctx.drawImage(this.spritesheet, 256.5, 32, 16, 16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y  - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}

class Dirt {
    constructor(game, x, y, w, type) {
        Object.assign(this, { game, x, y, w, type });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");

        this.BB = new BoundingBox(this.x, this.y, this.w, PARAMS.BLOCKWIDTH);
    };

    update() {};

    draw(ctx) {
        let brickCount = this.w / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            if (this.type === "Roots") {
                ctx.drawImage(this.spritesheet, 48, 160, 16, 16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
            } else if (this.type === "Plain") {
                ctx.drawImage(this.spritesheet, 48, 144, 16, 16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
            } else if (this.type === "Red") {
                ctx.drawImage(this.spritesheet, 192, 176, 16, 16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
            } else if (this.type === "Mid") {
                ctx.drawImage(this.spritesheet, 208.3, 62, 15.7, 16, this.x + i * PARAMS.BLOCKWIDTH - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
            }
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y  - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}

class Edge {
    constructor(game, x, y, type) {
        Object.assign(this, { game, x, y, type });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH, PARAMS.BLOCKWIDTH);
    };

    update() {};

    draw(ctx) {

        if (this.type === "LeftTop") {
            ctx.drawImage(this.spritesheet, 16, 16, 16, 16, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
        } else if (this.type === "LeftMid") {
            ctx.drawImage(this.spritesheet, 16, 32, 16, 16, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
        } else if (this.type === "LeftBot") {
            ctx.drawImage(this.spritesheet, 16, 48, 16, 16, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
        } else if (this.type === "RightTop") {
            ctx.drawImage(this.spritesheet, 80, 16, 16, 16, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
        } else if (this.type === "RightMid") {
            ctx.drawImage(this.spritesheet, 79.5, 32, 16, 16, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
        } else if (this.type === "RightBot") {
            ctx.drawImage(this.spritesheet, 79.5, 48, 16, 16, this.x - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset, PARAMS.BLOCKWIDTH * yOffset);
        } 

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y  - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}

class Platform {
    constructor(game, x, y, w, scale, type, moving, direction, speed) {
        Object.assign(this, { game, x, y, w, scale, type, moving, direction, speed });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");

        this.updateBB();
        this.tracker = 0;

    };

    update() {
        if (this.moving) {
            this.x += this.speed * this.game.clockTick * this.direction;
            this.tracker += this.speed * this.game.clockTick;

            if (this.tracker >= 150) {
                this.direction *= -1; // Reverse direction
                this.tracker = 0;
            }

            this.updateLastBB();
            this.updateBB();
        }
    };

    updateLastBB() {
        this.lastBB = this.BB;
    }

    updateBB() {
        this.BB = new BoundingBox(this.x, this.y, this.w * this.scale, PARAMS.BLOCKWIDTH / 2);
    }

    draw(ctx) {
        let brickCount = this.w / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            if (this.type === "Single") {
                ctx.drawImage(this.spritesheet, 241, 256, 46, 8, this.x + i * PARAMS.BLOCKWIDTH * this.scale - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset * this.scale, PARAMS.BLOCKWIDTH * yOffset / 2); 
            } else if (this.type === "Double") {
                ctx.drawImage(this.spritesheet, 289, 224, 62, 8, this.x + i * PARAMS.BLOCKWIDTH * this.scale - this.game.camera.x, this.y - this.game.camera.y, PARAMS.BLOCKWIDTH * xOffset * this.scale, PARAMS.BLOCKWIDTH * yOffset / 2); 
            } 
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y  - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}

class Beam {
    constructor(game, x, y, w, scale, type) {
        Object.assign(this, { game, x, y, w, scale, type });

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");

        this.BB = new BoundingBox(this.x, this.y, PARAMS.BLOCKWIDTH / 4, this.w * this.scale);
    };

    update() {};

    draw(ctx) {
        let brickCount = this.w / PARAMS.BLOCKWIDTH;
        for (var i = 0; i < brickCount; i++) {
            if (this.type === "Short") {
                ctx.drawImage(this.spritesheet, 262, 264, 4,  8, this.x - this.game.camera.x, this.y + i * PARAMS.BLOCKWIDTH * this.scale - this.game.camera.y, PARAMS.BLOCKWIDTH / 4 * xOffset, PARAMS.BLOCKWIDTH * yOffset * this.scale); 
            } else if (this.type === "Long") {
                ctx.drawImage(this.spritesheet, 357, 225, 6, 47, this.x - this.game.camera.x, this.y + i * PARAMS.BLOCKWIDTH * this.scale - this.game.camera.y, PARAMS.BLOCKWIDTH / 4 * xOffset, PARAMS.BLOCKWIDTH * yOffset * this.scale); 
            } 
        }

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y  - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}


