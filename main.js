const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();
ASSET_MANAGER.queueDownload("./naruto.png");
ASSET_MANAGER.queueDownload("./ninja.png");
ASSET_MANAGER.queueDownload("./wolf.png");

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");
	ctx.imageSmoothingEnabled = true;

	gameEngine.init(ctx);

	// NARUTO : x, y, facing, state (0 = left, 1 = right)
	gameEngine.addEntity(new Naruto(gameEngine,   0,   0, 0, 0));
	gameEngine.addEntity(new Naruto(gameEngine,   0, 125, 1, 0));

	gameEngine.addEntity(new Naruto(gameEngine, 100,   0, 0, 1));
	gameEngine.addEntity(new Naruto(gameEngine, 100, 125, 1, 1));

	gameEngine.addEntity(new Naruto(gameEngine, 200,   0, 0, 2));
	gameEngine.addEntity(new Naruto(gameEngine, 200, 125, 1, 2));

	gameEngine.addEntity(new Naruto(gameEngine, 300,   0, 0, 3));
	gameEngine.addEntity(new Naruto(gameEngine, 300, 125, 1, 3));

	gameEngine.addEntity(new Naruto(gameEngine, 400,   0, 0, 4));
	gameEngine.addEntity(new Naruto(gameEngine, 400, 125, 1, 4));	

	gameEngine.addEntity(new Naruto(gameEngine, 500,   0, 0, 5));
	gameEngine.addEntity(new Naruto(gameEngine, 500, 125, 1, 5));	

	gameEngine.addEntity(new Naruto(gameEngine, 600,   0, 0, 6));
	gameEngine.addEntity(new Naruto(gameEngine, 600, 125, 1, 6));

	gameEngine.addEntity(new Naruto(gameEngine, 700,   0, 0, 7));
    gameEngine.addEntity(new Naruto(gameEngine, 725, 125, 1, 7));	

	gameEngine.addEntity(new Weapons(gameEngine, 900, 100, 0));
    gameEngine.addEntity(new Weapons(gameEngine, 875, 125, 1));
	
	// ENEMY NINJA : x, y, facing, state

	// gameEngine.addEntity(new Ninja(gameEngine, 100, 0, 0, 0));
	// gameEngine.addEntity(new Ninja(gameEngine, 100, 200, 0, 1));

	// WOLF : x, y, facing, state 

	// gameEngine.addEntity(new Wolf(gameEngine, 50,   0, 0, 0));
	// gameEngine.addEntity(new Wolf(gameEngine, 50, 300, 0, 1));

	gameEngine.start();
});
