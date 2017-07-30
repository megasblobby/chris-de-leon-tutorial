let WIDTH, HEIGHT;

let canvas, canvasContext;
let car;
let car2;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	car = new Car("Blue Storm");
	car2 = new Car("Red Fury");

	setupInput();

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");

	loadImages();
}

function startGame() {
	let framesPerSecond = 60;
	setInterval(gameLoop, 1000/framesPerSecond);

	loadLevel(levelOne);

	car.sprite = carSprite;
	car2.sprite = car2Sprite;
	resetCars();
}

function loadLevel(level) {
	track = [levelOne.length];
	for (let row = 0; row < level.length; row++) {
		track[row] = level[row].slice();
	}
}

function resetCars() {
	car.reset();
	car2.reset();
}

function resetGame() {
	loadLevel(levelOne);
	resetCars();
}

function gameLoop() {
	update();
	render();
}

function update() {
	car.move();
	car2.move();
}

function render() {
	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

	drawTrack();

	car.draw();
	car2.draw();
}

function clamp(minValue, maxValue, value) {
	if (value < minValue)
		value = minValue;
	if (value > maxValue)
		value = maxValue;

	return value;
}
