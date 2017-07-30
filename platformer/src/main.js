"use strict";

const MILLISECONDS_TO_SECONDS = 1/1000;
let WIDTH, HEIGHT;

let canvas, canvasContext;
let time, oldTime;

let warrior;
let camera;
let world;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	time = new Date().getTime();
	oldTime = time;

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	warrior = new Warrior("Player");
	camera = new Camera(warrior);
	world = new World(camera);

	setupInput();

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");

	loadImages();

	startGame();

	gameLoop();
}

function startGame() {
	resetGame();

	warrior.sprite = warriorSprite;
	warrior.size = new Vector2(warriorSprite.width, warriorSprite.height);
	//warrior.reset();

	camera.position = warrior.position.clone();
	camera.size = new Vector2(WIDTH, HEIGHT);
}

function resetGame() {
	world.loadLevel(levelOne);
	warrior.position = world.playerStart.clone();
}

function gameLoop() {
	let deltaTime = getDeltaTime();

	update(deltaTime);
	render(deltaTime);

	requestAnimationFrame(gameLoop);
}

function getDeltaTime() {
	time = new Date().getTime();
	let deltaTime = (time - oldTime) * MILLISECONDS_TO_SECONDS;
	oldTime = time;

	return deltaTime;
}

function update(deltaTime) {
	warrior.update(deltaTime);
	camera.update(deltaTime);
}

function render(deltaTime) {

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

	canvasContext.save();
	canvasContext.translate(-camera.pan.x, -camera.pan.y);

	world.draw();
	warrior.draw();
	//camera.draw();

	canvasContext.restore();
}
