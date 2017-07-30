let WIDTH, HEIGHT;

let canvas, canvasContext;
let warrior;
let camera;
let world;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	warrior = new Warrior("Player");
	camera = new Camera(warrior);
	world = new World(camera);

	setupInput();

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");

	loadImages();
}

function startGame() {
	let framesPerSecond = 60;
	setInterval(gameLoop, 1000/framesPerSecond);

	resetGame();

	warrior.sprite = warriorSprite;
	//warrior.reset();

	camera.position = warrior.position.clone();
	camera.size = new Vector2(WIDTH, HEIGHT);
}

function resetGame() {
	world.loadLevel(levelOne);
	warrior.position = world.playerStart.clone();
}

function gameLoop() {
	update();
	render();
}

function update() {
	warrior.move();
	camera.update();
}

function render() {

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

	canvasContext.save();
	canvasContext.translate(-camera.pan.x, -camera.pan.y);

	world.draw();
	warrior.draw();
	//camera.draw();

	canvasContext.restore();
}

function clamp(minValue, maxValue, value) {
	if (value < minValue)
		value = minValue;
	if (value > maxValue)
		value = maxValue;

	return value;
}
