const BB_LEFT_OFFSET = 13, BB_RIGHT_OFFSET = BB_LEFT_OFFSET;
const BB_TOP_OFFSET = 11, BB_BOTTOM_OFFSET = 3;

function Warrior(name = "Warrior") {
	this.name = name;

	this.position = new Vector2();
	this.velocity = new Vector2();
	this.speed = 2;

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
		this.velocity = new Vector2();

		if (this.isMovingForward) {
			this.velocity.y = -this.speed;
		}
		else if(this.isMovingBackward) {
			this.velocity.y = this.speed;
		}

		if (this.isMovingLeft) {
			this.velocity.x = -this.speed;
		}
		else if(this.isMovingRight) {
			this.velocity.x = this.speed;
		}

		this.handleWorldCollision();

		this.position = this.position.add(this.velocity);
	};

	this.handleWorldCollision = function() {
		let gridRow = Math.floor(this.position.y / TILE_HEIGHT);
		let gridColumn = Math.floor(this.position.x / TILE_WIDTH);
		let gridCell = world.getTileAtIndex(gridRow, gridColumn);

		let newPosition = new Vector2(this.position.x + this.velocity.x,
																	this.position.y + this.velocity.y);

		let corners = this.getCorners(newPosition.x, newPosition.y,
																	this.sprite.width, this.sprite.height);

		let collision = false;
		for (let i = 0; i < corners.length; i++) {
			let gridRow = Math.floor(corners[i].y / TILE_HEIGHT);
			let gridColumn = Math.floor(corners[i].x / TILE_WIDTH);
			let gridCell = world.getTileAtIndex(gridRow, gridColumn);

			if (gridCell != FLOOR) {
				if (gridCell == TREASURE) {
					world.setTileAtIndex(gridRow, gridColumn, FLOOR);
					resetGame();
				}

				if (gridCell == KEYS) {
					this.keys += 1;
					world.setTileAtIndex(gridRow, gridColumn, FLOOR);
				}
				else if (world.level[gridRow][gridColumn] != null) {
					if (gridCell == DOOR && this.keys > 0) {
						this.keys -= 1;
						world.setTileAtIndex(gridRow, gridColumn, FLOOR);
					}
					else {
						this.velocity.x = 0;
						this.velocity.y = 0;
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

	this.draw = function() {
		drawImage(this.sprite, this.position.x, this.position.y);
	};

	this.setupKeys = function(forwardKey, backwardKey, leftKey,	rightKey) {
		this.forwardKey = forwardKey;
		this.backwardKey = backwardKey;
		this.leftKey = leftKey;
		this.rightKey = rightKey;
	}
}
