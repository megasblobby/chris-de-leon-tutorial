let tileSprites = [];

let imagesToLoad;
let ballSprite = document.createElement("img");

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
	let images = [{variableName : ballSprite, path : "media/ball.png"},
				  			{trackType : WALL, path : "media/wall.png"}];

	imagesToLoad = images.length;

	for (let i = 0; i < images.length; i++) {
		if (images[i].variableName != undefined) {
			setOnLoadEvent(images[i].variableName, images[i].path);
		}
		else {
			loadImageForTrackCode(images[i].trackType, images[i].path);
		}
	}
}

function loadImageForTrackCode(trackType, path) {
	tileSprites[trackType] = document.createElement("img");
	setOnLoadEvent(tileSprites[trackType], path);
}
