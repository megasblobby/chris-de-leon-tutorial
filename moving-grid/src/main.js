"use strict";

const ALIENS_ROWS = 5;
const ALIENS_PER_ROWS = 11;
let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let engine;
let scenes = new Array();
let currentScenes = new Array();
let aliens = [];
let alien;
let player;
let entities = new Array();

window.onload = function () {
	/*canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;*/

	engine = new Engine();
	engine.update = update.bind(this);
	engine.render = render.bind(this);

	//engine.init();

	/*let sceneLoader = new SceneLoader();
	sceneLoader.load(["data/spaceport.json", "data/spaceport-bathroom.json"])
	sceneLoader.observable.register("scenes-all-loaded", this);

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");*/
	alien = new Alien(engine.canvasContext);
	player = new Player(engine.canvasContext);
	player.observable.register("spawn-entity", this);
	//entities.push(alien);
	entities.push(player);

	engine.inputManager.observable.register("mouse-left-down", player);
	engine.inputManager.observable.register("key-pressed", player);
	engine.inputManager.observable.register("key-released", player);

	createAliens();

	engine.loop();
}

function createAliens() {
	for (let row = 0; row < ALIENS_ROWS; row++) {
		let alienSizeY = 40;
		let initialY = 20;
		let rowGap = 20;
		let y = initialY + (row * (alienSizeY + rowGap));
		for (let column = 0; column < ALIENS_PER_ROWS; column++) {
			let alienSizeX = 40;
			let initialX = 20;
			let columnGap = 10;
			let x = initialX + (column * (alienSizeX + columnGap));

			let position = new Vector2(x, y);
			let velocity = new Vector2(100, 0);
			let alien = new Alien(engine.canvasContext, position, velocity);
			entities.push(alien);
		}
	}
}

function update(deltaTime) {
	for (let entity of entities) {
		entity.update(deltaTime);
	}
}

function render(deltaTime) {
	clear();

	for (let entity of entities) {
		entity.render(deltaTime);
	}
}

function clear() {
	engine.canvasContext.fillStyle = "black";
	engine.canvasContext.fillRect(0, 0, engine.WIDTH, engine.HEIGHT);
}

function onNotify(subject, object){
	if (subject === "spawn-entity") {
		entities.push(object);
	}
}
