"use strict";

let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let engine;
let scenes = new Array();
let currentScenes = new Array();
let alien;
let player;

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
	engine.inputManager.observable.register("mouse-left-down", player);
	engine.inputManager.observable.register("key-pressed", player);
	engine.inputManager.observable.register("key-released", player);

	engine.loop();
	//engine.inputManager.observable.register("mouse-left-down", player);
}

function update(deltaTime) {
	alien.update(deltaTime);
	player.update(deltaTime);
}

function render(deltaTime) {
	clear();

	alien.render(deltaTime);
	player.render(deltaTime);
}

function clear() {
	engine.canvasContext.fillStyle = "black";
	engine.canvasContext.fillRect(0, 0, engine.WIDTH, engine.HEIGHT);
}

function onNotify(subject, object){
	/*if (subject === "scenes-all-loaded") {
		scenes = object;
		currentScenes.push(scenes[0]);
		console.log("SCENE PRONTE");
		engine.loop();*/
	}
