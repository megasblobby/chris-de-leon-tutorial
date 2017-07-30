const ROAD_SPEED_DECAY = 0.98, IMPACT_SPEED_DECAY = 0.5;
const ACCELERATION = 0.1, TURNING_RATIO = 0.04;
const MINIMUM_SPEED_FOR_TURNING = 0.5;

function Ball(name = "Ball") {
	this.name = name;

	this.position = new Vector2();
	this.velocity = new Vector2();
	this.speed = 0;

	this.sprite = null;

	this.move = function() {
		this.position.x += this.velocity.x * this.speed;
		this.position.y += this.velocity.y * this.speed;

		this.handleWorldCollision();
	};

	this.handleWorldCollision = function() {
		let gridRow = Math.floor(this.position.y / TILE_HEIGHT);
		let gridColumn = Math.floor(this.position.x / TILE_WIDTH);

		if (getGridCellAtIndex(gridRow, gridColumn) == WALL) {
			let prevPosition = new Vector2();
			prevPosition.x = this.position.x - (this.velocity.x * this.speed);
			prevPosition.y = this.position.y - (this.velocity.y * this.speed);

			let prevGridRow =	Math.floor(prevPosition.y / TILE_HEIGHT);
			let prevGridColumn = Math.floor(prevPosition.x / TILE_WIDTH);
			let bothTestsFailed = true;

			if (prevGridRow != gridRow) {
				if (getGridCellAtIndex(prevGridRow, gridColumn) == BACKGROUND)  {
					this.velocity.y *= -1;
					bothTestsFailed = false;
					this.position.x = prevPosition.x;
					this.position.y = prevPosition.y;
				}
			}
			if (prevGridColumn != gridColumn) {
				if (getGridCellAtIndex(gridRow, prevGridColumn) == BACKGROUND) {
					this.velocity.x *= -1;
					bothTestsFailed = false;
					this.position.x = prevPosition.x;
					this.position.y = prevPosition.y;
				}
			}
			if (bothTestsFailed) {
				this.velocity.y *= -1;
				this.velocity.x *= -1;
				this.position.x = prevPosition.x;
				this.position.y = prevPosition.y;
			}
		}
}

	this.draw = function() {
		drawImage(this.sprite, this.position.x, this.position.y);
	};
}
