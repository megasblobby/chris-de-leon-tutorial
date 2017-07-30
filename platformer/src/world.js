"use strict";

const TILE_WIDTH = 50, TILE_HEIGHT = 50;
const MAP_ROWS = 20, MAP_COLUMNS = 20;
const FLOOR = 0, WALL = 1, PLAYER_START = 2;
const TREASURE = 3, KEYS = 4, DOOR = 5;

let levelOne = [
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1, 0, 1, 1, 1],
[1, 0, 4, 0, 4, 0, 1, 0, 0, 0, 0, 0, 1, 4, 4, 1, 0, 1, 4, 4],
[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 5, 1, 5, 1, 1, 5, 1, 5, 1],
[1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 4, 0, 1, 1, 0, 4, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 1, 1, 0, 4, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
[1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 1, 1, 0, 4, 0, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 4, 0, 1, 1, 0, 4, 0, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 1],
[1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

function World(camera) {
	this.camera = camera;
	this.level = [];
	this.playerStart = new Vector2();
}

World.prototype.getTileAtIndex = function(row, column) {
	if(row >= 0 && row < MAP_ROWS && column >= 0 &&
	   column < MAP_COLUMNS) {
		return this.level[row][column];
	}
	return null;
};

World.prototype.setTileAtIndex = function(row, column, value) {
	if(row >= 0 && row < MAP_ROWS && column >= 0 &&
		column < MAP_COLUMNS) {
		this.level[row][column] = value;
	}
};

World.prototype.draw = function() {
	let x = 0, y = 0;
	for(let row = 0; row < MAP_ROWS; row++) {
		x = 0;
		for(let column = 0; column < MAP_COLUMNS; column++) {
			let tilePosition = new Vector2(x, y);
			let tileSize = new Vector2(TILE_WIDTH, TILE_HEIGHT);
			if(this.isInCamera(tilePosition, tileSize)) {
					 let tileIndex = this.level[row][column];
					 let tile = tileSprites[tileIndex];

			 			if (tile.hasTransparency) {
			 				drawImage(tileSprites[FLOOR], x, y);
			 			}
			 			drawImage(tile, x, y);
			}

			x += TILE_WIDTH
		}
		x = 0;
		y += TILE_HEIGHT;
	}
};

World.prototype.isInCamera = function(position, size) {
	let tileMax = new Vector2(position.x + size.x, position.y + size.y);

	if(position.x >= camera.topLeftCorner.x && tileMax.x <= camera.bottomRightCorner.x &&
		 position.y >= camera.topLeftCorner.y && tileMax.y <= camera.bottomRightCorner.y) {
			 return true;
	}

	return false;
};

World.prototype.loadLevel = function(level) {
	this.level = [level.length];

	for (let row = 0; row < level.length; row++) {
		this.level[row] = level[row].slice();
		for(let column = 0; column < MAP_COLUMNS; column++) {
			if (this.level[row][column] == PLAYER_START) {
				this.level[row][column] = FLOOR;
				this.playerStart.x = column * TILE_WIDTH + TILE_WIDTH / 2;
				this.playerStart.y = row * TILE_HEIGHT + TILE_HEIGHT / 2;
			}
		}
	}
};

World.prototype.isCollidable = function(tile) {
	if (tile == WALL || tile == DOOR) {
		return true;
	}
	return false;
};

World.prototype.isPickable = function(tile) {
	if (tile == KEYS || tile == TREASURE) {
		return true;
	}
	return false;
};
