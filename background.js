class Background {
    constructor(game, x, y) {
        Object.assign(this, { game, x, y });
        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/background.png");
        this.width = 1780; // Width of the background image
        this.height = 1080;
    }

    update() {

    }

    draw(ctx) {
        // Calculate the position to draw the background image
        const drawX = -(this.game.camera.x % this.width);
        const drawY = -(this.game.camera.y % this.spritesheet.height);
    
        // Calculate the number of repetitions needed to cover the entire canvas width and height based on Naruto's position
        const repetitionsX = Math.ceil(PARAMS.CANVAS_WIDTH / this.width) + 1;
        const repetitionsY = Math.ceil(PARAMS.CANVAS_HEIGHT / this.spritesheet.height) + 1;
    
        // Draw the background image multiple times to cover the canvas width and height based on Naruto's position
        for (let i = 0; i < repetitionsX; i++) {
            for (let j = 0; j < repetitionsY; j++) {
                ctx.drawImage(this.spritesheet, Math.floor(drawX + i * this.width), Math.floor(drawY + j * this.spritesheet.height));
            }
        }
    }
      
}

class Trunk {
    constructor(game, x, y, size) {
        Object.assign(this, { game, x, y, size});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 275, 94, 45, 36, this.x - this.game.camera.x, this.y  - this.game.camera.y, PARAMS.BLOCKWIDTH * this.size, PARAMS.BLOCKWIDTH * this.size);
    };
}

class Branch {
    constructor(game, x, y, size) {
        Object.assign(this, { game, x, y, size});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");

        this.BB = new BoundingBox(this.x, this.y + 18 * this.size, PARAMS.BLOCKWIDTH * this.size , 20 * this.size);
    };

    update() {

    };

    draw(ctx) {
        ctx.drawImage(this.spritesheet, 315.25, 105, 50, 40, this.x - this.game.camera.x, this.y  - this.game.camera.y, PARAMS.BLOCKWIDTH * this.size, PARAMS.BLOCKWIDTH * this.size);

        if (PARAMS.DEBUG) {
            ctx.strokeStyle = 'Red';
            ctx.strokeRect(this.BB.x - this.game.camera.x, this.BB.y  - this.game.camera.y, this.BB.width, this.BB.height);
        }
    };
}

class Leaf { 
    constructor(game, x, y, size, color) {
        Object.assign(this, { game, x, y, size, color});

        this.spritesheet = ASSET_MANAGER.getAsset("./sprites/setting/scenery.png");
    };

    update() {

    };

    draw(ctx) {
        if(this.color === "Purple") {
            // Purple
            ctx.drawImage(this.spritesheet, 97, 97, 78, 79, this.x - this.game.camera.x, this.y  - this.game.camera.y, PARAMS.BLOCKWIDTH * this.size, PARAMS.BLOCKWIDTH * this.size);
        } else if (this.color === "Orange") {
            // Orange with red center
            ctx.drawImage(this.spritesheet, 225, 145, 79, 77, this.x - this.game.camera.x, this.y  - this.game.camera.y, PARAMS.BLOCKWIDTH * this.size, PARAMS.BLOCKWIDTH * this.size);
        } else {
            // Oragne with brown cetner
            ctx.drawImage(this.spritesheet, 305, 145, 79, 77, this.x - this.game.camera.x, this.y  - this.game.camera.y, PARAMS.BLOCKWIDTH * this.size, PARAMS.BLOCKWIDTH * this.size);
        }
    };
};