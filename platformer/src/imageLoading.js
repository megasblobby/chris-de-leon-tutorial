"use strict";

let warriorSprite = document.createElement("img");
let tileSprites = [];

let imagesToLoad;

function countLoadedImagesAndLaunchIfReady() {
	imagesToLoad--;

	if (imagesToLoad == 0) {
		startGame();
	}
}

function setOnLoadEvent(target, path) {
	target.onload = countLoadedImagesAndLaunchIfReady;
	target.src = path;
}

function loadImages() {
	let images = [{targetVariable : warriorSprite, path : "media/warrior.png"},
			{tileType : FLOOR, path : "media/floor.png", hasTransparency : false},
		 	{tileType : WALL, path : "media/wall.png", hasTransparency : false},
			{tileType : TREASURE, path : "media/treasure.png", hasTransparency : true},
			{tileType : KEYS, path : "media/key.png", hasTransparency : true},
			{tileType : DOOR, path : "media/door.png", hasTransparency : true}];

	imagesToLoad = images.length;

	for (let i = 0; i < images.length; i++) {
		if (images[i].targetVariable != undefined) {
			setOnLoadEvent(images[i].targetVariable, images[i].path);
		}
		else {
			createTile(images[i].tileType, images[i].path, images[i].hasTransparency);
		}
	}
}

function createTile(tileType, path, hasTransparency) {
	tileSprites[tileType] = document.createElement("img");
	tileSprites[tileType].hasTransparency = hasTransparency;
	setOnLoadEvent(tileSprites[tileType], path);
}
