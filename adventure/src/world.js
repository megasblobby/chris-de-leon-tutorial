const MAP_TILE_WIDTH = 50, MAP_TILE_HEIGHT = 50;
const MAP_ROWS = 12, MAP_COLUMNS = 16;
const FLOOR = 0, WALL = 1; PLAYER_START = 2;
const TREASURE = 3, KEYS = 4; DOOR = 5;

let levelOne = [
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 1, 1, 1],
[1, 0, 4, 0, 4, 0, 1, 0, 0, 0, 1, 0, 1, 4, 4, 1],
[1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 5, 1, 5, 1, 1],
[1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 1, 0, 4, 0, 1, 1],
[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1],
[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1],
[1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1],
[1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1],
[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

let world = [];

function getGridCellAtIndex(row, column) {
	if(row >= 0 && row < MAP_ROWS && column >= 0 &&
	   column < MAP_COLUMNS) {
		return world[row][column];
	}
	return null;
}

function setGridCellAtIndex(row, column, value) {
	if(row >= 0 && row < MAP_ROWS && column >= 0 &&
		column < MAP_COLUMNS) {
		world[row][column] = value;
	}
}

function drawWorld() {
	let x = 0, y = 0;
	for(let row = 0; row < MAP_ROWS; row++) {
		x = 0;
		for(let column = 0; column < MAP_COLUMNS; column++) {

			let tileIndex = world[row][column];
			let tile = tileSprites[tileIndex];

			if (tile.hasTransparency) {
				drawImage(tileSprites[FLOOR], x, y);
			}
			drawImage(tile, x, y);

			x += MAP_TILE_WIDTH
		}
		x = 0;
		y += MAP_TILE_HEIGHT;
	}
}
