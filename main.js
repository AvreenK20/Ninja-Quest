const gameEngine = new GameEngine();
const ASSET_MANAGER = new AssetManager();

// Player
ASSET_MANAGER.queueDownload("./sprites/naruto.png");

// Cat (Trophy)
ASSET_MANAGER.queueDownload("./sprites/cat.png");

// Transition Screens
ASSET_MANAGER.queueDownload("./sprites/cloud.png");
ASSET_MANAGER.queueDownload("./sprites/title.png");

// Enemy Entities 
ASSET_MANAGER.queueDownload("./sprites/ToxicFrogBlueBlue.png");
ASSET_MANAGER.queueDownload("./sprites/ToxicFrogGreenBrown.png");
ASSET_MANAGER.queueDownload("./sprites/ToxicFrogPurpleWhite.png");

// Background
ASSET_MANAGER.queueDownload("./sprites/background.png");
ASSET_MANAGER.queueDownload("./sprites/scenery.png");


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
