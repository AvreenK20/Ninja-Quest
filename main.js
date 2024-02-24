const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// Player
ASSET_MANAGER.queueDownload("./sprites/naruto.png");

// HealthBar
ASSET_MANAGER.queueDownload("./sprites/hearts.png");
ASSET_MANAGER.queueDownload("./sprites/hearts_inside.png");
ASSET_MANAGER.queueDownload("./sprites/hearts_outside.png");

// Items (Cat, Pill)
ASSET_MANAGER.queueDownload("./sprites/cat.png");
ASSET_MANAGER.queueDownload("./sprites/pills.png");
ASSET_MANAGER.queueDownload("./sprites/particles.png");
ASSET_MANAGER.queueDownload("./sprites/particles_pink.png");

// Transition Screens
ASSET_MANAGER.queueDownload("./sprites/screen/welcome.png");
ASSET_MANAGER.queueDownload("./sprites/screen/gameover.png");
ASSET_MANAGER.queueDownload("./sprites/screen/gamewin.png");


// Enemy Entities 
ASSET_MANAGER.queueDownload("./sprites/enemies/frog_blue_blue.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/frog_green_brown.png");
ASSET_MANAGER.queueDownload("./sprites/enemies/frog_purple_white.png");

// Background
ASSET_MANAGER.queueDownload("./sprites/setting/background.png");
ASSET_MANAGER.queueDownload("./sprites/setting/scenery.png");


ASSET_MANAGER.downloadAll(() => {
	PARAMS.BLOCKWIDTH = PARAMS.BITWIDTH * PARAMS.SCALE;

	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;

	PARAMS.CANVAS_WIDTH = canvas.width;
	PARAMS.CANVAS_HEIGHT = canvas.height;

	gameEngine.init(ctx);

	gameEngine.addEntity(new SceneManager(gameEngine));

	gameEngine.start();
});
