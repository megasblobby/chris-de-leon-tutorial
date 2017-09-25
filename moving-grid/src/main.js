"use strict";

let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let engine;
let scenes = new Array();
let currentScenes = new Array();
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
	entities.push(alien);
	entities.push(player);

	engine.inputManager.observable.register("mouse-left-down", player);
	engine.inputManager.observable.register("key-pressed", player);
	engine.inputManager.observable.register("key-released", player);

	engine.loop();

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
