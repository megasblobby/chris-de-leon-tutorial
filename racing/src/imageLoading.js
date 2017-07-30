let carSprite = document.createElement("img");
let car2Sprite = document.createElement("img");
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
	let images = [{variableName : carSprite, path : "media/car.png"},
					{variableName : car2Sprite, path : "media/car2.png"},
				  {trackType : ROAD, path : "media/road.png"},
				  {trackType : ROAD_BLOCK, path : "media/barrier.png"},
				  {trackType : CHECKERBOARD, path : "media/checkerboard.png"},
				  {trackType : TREES, path : "media/trees.png"},
				  {trackType : FLAG, path : "media/flag.png"}];

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
