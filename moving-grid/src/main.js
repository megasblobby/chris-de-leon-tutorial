"use strict";

let WIDTH, HEIGHT;

let canvas, canvasContext;

let time, oldTime

let engine;
let scenes = new Array();
let currentScenes = new Array();
let alien;

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

	engine = new Engine();
	engine.update = update.bind(this);
	engine.render = render.bind(this);

	alien = new Alien(canvasContext);
	//engine.init();

	/*let sceneLoader = new SceneLoader();
	sceneLoader.load(["data/spaceport.json", "data/spaceport-bathroom.json"])
	sceneLoader.observable.register("scenes-all-loaded", this);

	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");*/
	engine.loop();
}

function update(deltaTime) {
	alien.update(deltaTime);
}

function render(deltaTime) {
	clear();

	alien.render(deltaTime);
}

function clear() {
	canvasContext.fillStyle = "black";
	canvasContext.fillRect(0, 0, WIDTH, HEIGHT);
}

function onNotify(subject, object){
	/*if (subject === "scenes-all-loaded") {
		scenes = object;
		currentScenes.push(scenes[0]);
		console.log("SCENE PRONTE");
		engine.loop();*/
	}
