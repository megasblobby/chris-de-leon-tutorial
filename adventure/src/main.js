let WIDTH, HEIGHT;

let canvas, canvasContext;
let warrior;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	warrior = new Warrior("Player");

	setupInput();

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");

	loadImages();
}

function startGame() {
	let framesPerSecond = 60;
	setInterval(gameLoop, 1000/framesPerSecond);

	loadLevel(levelOne);

	warrior.sprite = warriorSprite;
	warrior.reset();
}

function loadLevel(level) {
	world = [levelOne.length];
	for (let row = 0; row < level.length; row++) {
		world[row] = level[row].slice();
	}
}

function resetGame() {
	loadLevel(levelOne);
	warrior.reset();
}

function gameLoop() {
	update();
	render();
}

function update() {
	warrior.move();
}

function render() {
	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

	drawWorld();

	warrior.draw();
}

function clamp(minValue, maxValue, value) {
	if (value < minValue)
		value = minValue;
	if (value > maxValue)
		value = maxValue;

	return value;
}
