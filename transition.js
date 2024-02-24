class TransitionScreen {
    constructor(game, level, x, y, gameOver, gameWin) {
        Object.assign(this, { game, level, x, y, gameOver, gameWin });
        this.gameStarted = false;
        document.getElementById("gameWorld").addEventListener('click', this.handleMouseClick.bind(this));
    };

    handleMouseClick(event) {
        // Check if the game is in the transition screen and the user clicks
        if (!this.gameOver && !this.gameWin && !this.gameStarted) {
            this.gameStarted = true;
            this.game.camera.loadLevel(this.level, this.x, this.y, false, this.gameOver);
        }

        if (this.gameOver || this.gameWin) {
            window.location.reload(); // Reload the index.html file
        }
    }
    
    update() { };

    draw(ctx) {
        if (this.gameOver) {
            ctx.fillStyle = "Red";
            ctx.font = "48px Arial"; // Example: 40 pixels Arial font
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/screen/gameover.png"), 0, 0, 1024, 768, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            ctx.fillText("Click anywhere to play again!", PARAMS.CANVAS_WIDTH / 3, PARAMS.CANVAS_HEIGHT / 4);
        } else if (this.gameWin) {
            ctx.fillStyle = "Orange";
            ctx.font = "48px Arial"; // Example: 40 pixels Arial font
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/screen/gamewin.png"), 0, 0, 1024, 768, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            ctx.fillStyle = "Black";
            ctx.fillText("Click anywhere to play again!", PARAMS.CANVAS_WIDTH / 3, PARAMS.CANVAS_HEIGHT / 4);
        }
        else { // Starting game
            ctx.fillStyle = "White";
            ctx.font = "40px Arial"; // Example: 40 pixels Arial font
            // ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/cloud.png"), 0, 0, 1024, 682, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            ctx.drawImage(ASSET_MANAGER.getAsset("./sprites/screen/welcome.png"), 0, 0, 1024, 768, 0, 0, PARAMS.CANVAS_WIDTH, PARAMS.CANVAS_HEIGHT);
            ctx.fillStyle = "Black";
            ctx.fillText("Click anywhere to start!", PARAMS.CANVAS_WIDTH / 4, PARAMS.CANVAS_HEIGHT / 1.25);
        }
    };
};