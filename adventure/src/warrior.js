const IMPACT_SPEED_DECAY = 0.5;
const ACCELERATION = 0.1, TURNING_RATIO = 0.04;
const BB_LEFT_OFFSET = 13, BB_RIGHT_OFFSET = BB_LEFT_OFFSET;
const BB_TOP_OFFSET = 11, BB_BOTTOM_OFFSET = 3;

function Warrior(name = "Warrior") {
	this.name = name;

	this.x, this.y;
	this.speed = 2;
	this.velocityX = 0;
	this.velocityY = 0;

	this.sprite;

	this.isMovingForward;
	this.isMovingBackward;
	this.isMovingLeft;
	this.isMovingRight;

	this.forwardKey;
	this.backwardKey;
	this.leftKey;
	this.rightKey;

	this.keys = 0;

	this.move = function() {
		this.velocityX = 0;
		this.velocityY = 0;

		if (this.isMovingForward) {
			this.velocityY = -this.speed;
		}
		else if(this.isMovingBackward) {
			this.velocityY = this.speed;
		}

		if (this.isMovingLeft) {
			this.velocityX = -this.speed;
		}
		else if(this.isMovingRight) {
			this.velocityX = this.speed;
		}

		this.handleWorldCollision();

		this.x += this.velocityX;
		this.y += this.velocityY;
	};

	this.handleWorldCollision = function() {
		let gridRow = Math.floor(this.y / MAP_TILE_HEIGHT);
		let gridColumn = Math.floor(this.x / MAP_TILE_WIDTH);
		let gridCell = getGridCellAtIndex(gridRow, gridColumn);

		let newX = this.x + this.velocityX;
		let newY = this.y + this.velocityY;

		let corners = this.getCorners(newX, newY,
																	this.sprite.width, this.sprite.height);

		let collision = false;
		for (let i = 0; i < corners.length; i++) {
			let gridRow = Math.floor(corners[i].y / MAP_TILE_HEIGHT);
			let gridColumn = Math.floor(corners[i].x / MAP_TILE_WIDTH);
			let gridCell = getGridCellAtIndex(gridRow, gridColumn);

			if (gridCell != FLOOR) {
				if (gridCell == TREASURE) {
					setGridCellAtIndex(gridRow, gridColumn, FLOOR);
					resetGame();
				}

				if (gridCell == KEYS) {
					this.keys += 1;
					setGridCellAtIndex(gridRow, gridColumn, FLOOR);
				}
				else if (world[gridRow][gridColumn] != null) {
					if (gridCell == DOOR && this.keys > 0) {
						this.keys -= 1;
						setGridCellAtIndex(gridRow, gridColumn, FLOOR);
					}
					else {
						this.velocityX = 0;
						this.velocityY = 0;
						collision = true;
					}
									}
				if (collision) {
					break;
				}
			}
		}
	};

	this.getCorners = function(_x, _y, width, height) {
		let corners = [
		// TOP LEFT
		{x : _x + BB_LEFT_OFFSET, y : _y  + BB_TOP_OFFSET},
		// TOP RIGHT
		{x : _x + width - BB_RIGHT_OFFSET, y : _y + BB_TOP_OFFSET},
		// BOTTOM LEFT
		{x : _x + BB_LEFT_OFFSET, y : _y + height - BB_BOTTOM_OFFSET},
		// BOTTOM RIGHT
		{x : _x + width - BB_RIGHT_OFFSET, y : _y + height - BB_BOTTOM_OFFSET} ];

		return corners;
	}

	this.reset = function() {
		for(let row = 0; row < MAP_ROWS; row++) {
			for(let column = 0; column < MAP_COLUMNS; column++) {
				if (world[row][column] == PLAYER_START) {
					world[row][column] = FLOOR;
					this.x = column * MAP_TILE_WIDTH + MAP_TILE_WIDTH / 2;
					this.y = row * MAP_TILE_HEIGHT + MAP_TILE_HEIGHT / 2;

					return;
				}
			}
		}

		console.log("NO PLAYER_START FOUND!");
	};

	this.draw = function() {
		drawImage(this.sprite, this.x, this.y);
	};

	this.setupKeys = function(forwardKey, backwardKey, leftKey,	rightKey) {
		this.forwardKey = forwardKey;
		this.backwardKey = backwardKey;
		this.leftKey = leftKey;
		this.rightKey = rightKey;
	}
}
