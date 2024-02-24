class HealthBar {
    constructor(agent) {
        Object.assign(this, { agent });
    };

    update() {
       
    };

    draw(ctx) {
        if(this.agent instanceof Naruto) {
            for(var i = 0; i < this.agent.currentHealth; i++) {
                // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/hearts.png"), 18, 39, 19, 18, i * PARAMS.BLOCKWIDTH / 2, 1 * PARAMS.SCALE, PARAMS.BLOCKWIDTH * 1.05 / 2, PARAMS.BLOCKWIDTH / 2); // {source x, source y, width, height (SPRITESHEET)}, {position x, position y, size x, size y (CANVAS)}
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/hearts_inside.png"), 18, 39, 19, 18, i * PARAMS.BLOCKWIDTH / 2, 1 * PARAMS.SCALE, PARAMS.BLOCKWIDTH * 1.05 / 2, PARAMS.BLOCKWIDTH / 2); // {source x, source y, width, height (SPRITESHEET)}, {position x, position y, size x, size y (CANVAS)}
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/hearts_outside.png"), 18, 39, 19, 18, i * PARAMS.BLOCKWIDTH / 2, 1 * PARAMS.SCALE, PARAMS.BLOCKWIDTH * 1.05 / 2, PARAMS.BLOCKWIDTH / 2); // {source x, source y, width, height (SPRITESHEET)}, {position x, position y, size x, size y (CANVAS)}
            }
            for(var j = this.agent.currentHealth; j < this.agent.maxHealth; j++) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/hearts_outside.png"), 18, 39, 19, 18, j * PARAMS.BLOCKWIDTH / 2, 1 * PARAMS.SCALE, PARAMS.BLOCKWIDTH * 1.05 / 2, PARAMS.BLOCKWIDTH / 2); // {source x, source y, width, height (SPRITESHEET)}, {position x, position y, size x, size y (CANVAS)}
            }
        } else {
            for(var i = 0; i < this.agent.currentHealth; i++) {
                ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/hearts.png"), 18, 39, 19, 18, this.agent.x + i * PARAMS.BLOCKWIDTH / 4 - this.agent.game.camera.x, this.agent.y - this.agent.game.camera.y - 8.3 * this.agent.scale, PARAMS.BLOCKWIDTH * 1.05 / 4, PARAMS.BLOCKWIDTH / 4); // {source x, source y, width, height (SPRITESHEET)}, {position x, position y, size x, size y (CANVAS)}
            }
            // var ratio = this.agent.currentHealth / this.agent.maxHealth;
            // ctx.strokeStyle = "Black";
            // ctx.fillStyle = ratio < 0.2 ? "Red" : ratio < 0.5 ? "Yellow" : "Green";
            // ctx.fillRect(this.agent.x - this.agent.game.camera.x, this.agent.y  - this.agent.game.camera.y + this.agent.BC.radius + 5, this.agent.BC.radius * 2 * ratio, 4);
            // ctx.strokeRect(this.agent.x - this.agent.game.camera.x, this.agent.y  - this.agent.game.camera.y + this.agent.BC.radius + 5, this.agent.BC.radius * 2, 4);
        }
    };
};