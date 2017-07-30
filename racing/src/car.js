const ROAD_SPEED_DECAY = 0.98, IMPACT_SPEED_DECAY = 0.5;
const ACCELERATION = 0.1, TURNING_RATIO = 0.04;
const MINIMUM_SPEED_FOR_TURNING = 0.5;

function Car(name = "Car") {
	this.name = name;
	this.x;
	this.y;
	this.angle = 0;
	this.speed = 0;

	this.sprite;

	this.isAccelerating;
	this.isDecelerating;
	this.isTurningLeft;
	this.isTurningRight;

	this.accelerateKey;
	this.brakeKey;
	this.turnLeftKey;
	this.turnRightKey;

	this.move = function() {
		this.speed *= ROAD_SPEED_DECAY;

		if (this.isAccelerating) {
			this.speed += ACCELERATION;
		}
		else if(this.isDecelerating) {
			this.speed -= ACCELERATION;
		}
		if (Math.abs(this.speed) >= MINIMUM_SPEED_FOR_TURNING) {
			if (this.isTurningLeft) {
				if (this.speed > 0)
				{
					this.angle -= TURNING_RATIO;
				}
				else
				{
					this.angle += TURNING_RATIO;
				}
			}
			else if(this.isTurningRight) {
				if (this.speed > 0)
				{
					this.angle += TURNING_RATIO;
				}
				else
				{
					this.angle -= TURNING_RATIO;
				}
			}
		}

		this.x += Math.cos(this.angle) * this.speed;
		this.y += Math.sin(this.angle) * this.speed;

		this.handleTrackCollision();
	};

	this.handleTrackCollision = function() {
		let gridRow = Math.floor(this.y / TRACK_TILE_HEIGHT);
		let gridColumn = Math.floor(this.x / TRACK_TILE_WIDTH);
		let gridCell = getGridCellAtIndex(gridRow, gridColumn);
		if (gridCell == CHECKERBOARD) {
			console.log(this.name + " Wins!!!");
			resetGame();
		}
		else if (gridCell != ROAD) {
			if (track[gridRow][gridColumn]) {
				this.x -= Math.cos(this.angle) * this.speed;
				this.y -= Math.sin(this.angle) * this.speed;
				this.speed *= -IMPACT_SPEED_DECAY;
			}
		}
	};

	this.reset = function() {
		for(let row = 0; row < TRACK_ROWS; row++) {
			for(let column = 0; column < TRACK_COLUMNS; column++) {
				if (track[row][column] == PLAYER_START) {
					track[row][column] = ROAD;
					this.x = column * TRACK_TILE_WIDTH + TRACK_TILE_WIDTH / 2;
					this.y = row * TRACK_TILE_HEIGHT + TRACK_TILE_HEIGHT / 2;
					this.angle = -Math.PI / 2;
					this.speed = 0;
					
					return;
				}
			}
		}

		console.log("NO PLAYER_START FOUND!");
	};

	this.draw = function() {
		drawCenteredRotatedImage(this.sprite, this.x, this.y,
									 this.angle);
	};

	this.setupKeys = function(accelerateKey, brakeKey, turnLeftKey,
		turnRightKey) {
		this.accelerateKey = accelerateKey;
		this.brakeKey = brakeKey;
		this.turnLeftKey = turnLeftKey;
		this.turnRightKey = turnRightKey;
	}
}
