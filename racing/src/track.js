const TRACK_TILE_WIDTH = 40, TRACK_TILE_HEIGHT = 40;
const TRACK_ROWS = 15, TRACK_COLUMNS = 20;
const TRACK_X_OFFSET = 2, TRACK_Y_OFFSET = 2;
const ROAD = 0, ROAD_BLOCK = 1; PLAYER_START = 2;
const CHECKERBOARD = 3, TREES = 4; FLAG = 5;

let levelOne = [
[4, 4, 4, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 4],
[4, 4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[4, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
[1, 0, 0, 0, 0, 5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 0, 0, 0, 1],
[1, 0, 0, 0, 5, 1, 1, 4, 4, 4, 4, 4, 1, 1, 1, 1, 5, 0, 0, 1],
[1, 0, 0, 5, 1, 0, 0, 1, 4, 4, 4, 5, 0, 0, 0, 0, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 0, 1, 4, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 5, 0, 0, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 5, 0, 0, 1, 0, 0, 1, 0, 0, 1],
[1, 0, 0, 1, 0, 0, 5, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
[1, 2, 2, 1, 0, 0, 1, 5, 0, 0, 0, 0, 0, 1, 0, 0, 5, 0, 0, 1],
[1, 1, 1, 5, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
[1, 3, 0, 0, 0, 0, 1, 4, 5, 0, 0, 0, 5, 1, 0, 0, 0, 0, 0, 1],
[1, 3, 0, 0, 0, 0, 1, 4, 4, 1, 1, 1, 4, 4, 5, 0, 0, 0, 5, 4],
[4, 1, 1, 1, 1, 1, 4, 4, 4, 4, 4, 4, 4, 4, 1, 1, 1, 1, 4, 4]
];

let track = [];

function getGridCellAtIndex(row, column) {
	if(row >= 0 && row < TRACK_ROWS && column >= 0 &&
	   column < TRACK_COLUMNS) {
		return track[row][column];
	}
	return ROAD_BLOCK;
}

function drawTrack() {
	let x = 0, y = 0;
	for(let row = 0; row < TRACK_ROWS; row++) {
		x = 0;
		for(let column = 0; column < TRACK_COLUMNS; column++) {

			let tileIndex = track[row][column];
			let tile = tileSprites[tileIndex];

			drawImage(tile, x, y);

			x += TRACK_TILE_WIDTH
		}
		x = 0;
		y += TRACK_TILE_HEIGHT;
	}
}
