"use strict";

const BB_LEFT_OFFSET = 13, BB_RIGHT_OFFSET = BB_LEFT_OFFSET;
const BB_TOP_OFFSET = 11, BB_BOTTOM_OFFSET = 3;
const JUMP_FORCE = 1000, GRAVITY = 90.81 * 0.7;

function Warrior(name = "Warrior") {
	this.name = name;

	this.position = new Vector2();
	this.velocity = new Vector2();
	this.size = new Vector2();
	this.speed = 300;
	this.verticalForce = 0;
	this.sprite;

	this.isMovingBackward;
	this.isMovingLeft;
	this.isMovingRight;
	this.isJumping = false;

	this.leftKey;
	this.rightKey;
	this.jumpKey;

	this.isGrounded = false;

	this.keys = 0;

	this.move = function(deltaTime) {
		if (this.isGrounded) {
			this.verticalForce = 0;
		}
		else {
			this.verticalForce -= GRAVITY;
		}

		this.velocity = new Vector2();

		if (this.isMovingLeft) {
			this.velocity.x = -this.speed;
		}
		else if(this.isMovingRight) {
			this.velocity.x = this.speed;
		}

		if (this.isJumping) {
			if(this.isGrounded) {
				this.isGrounded = false;
				this.verticalForce = JUMP_FORCE;
			}
		}

		this.velocity.y -= this.verticalForce;
		this.velocity.scale(deltaTime);

		this.handleWorldCollision();

		this.position = this.position.add(this.velocity);
	};

	this.handleWorldCollision = function() {
		this.isGrounded = false;

		let newPosition = this.position.add(this.velocity);
		let collisionPoints = this.getCollisionPoints(newPosition, this.size);

		for (let i = 0; i < collisionPoints.length; i++) {
			let gridRow = Math.floor(collisionPoints[i].y / TILE_HEIGHT);
			let gridColumn = Math.floor(collisionPoints[i].x / TILE_WIDTH);
			let gridCell = world.getTileAtIndex(gridRow, gridColumn);

			if (world.isPickable(gridCell)) {
				world.setTileAtIndex(gridRow, gridColumn, FLOOR);
				if (gridCell == TREASURE) {
					resetGame();
				}
				if (gridCell == KEYS) {
					this.keys += 1;
				}
			}

			if (world.isCollidable(gridCell)) {
				if (gridCell == DOOR && this.keys > 0) {
					this.keys -= 1;
					world.setTileAtIndex(gridRow, gridColumn, FLOOR);
				}
				let translation = new Vector2();
				let points = {CENTER_TOP : 0, CENTER_BOTTOM : 1, CENTER_LEFT : 2,
					 					 CENTER_RIGHT : 3 };
				let index;
				if (i === points.CENTER_TOP) {
					index = points.CENTER_TOP;
					let yObstacle = gridRow * TILE_HEIGHT + TILE_HEIGHT;
					translation.y = yObstacle - collisionPoints[index].y;
				}
				if (i === points.CENTER_BOTTOM) {
					index = points.CENTER_BOTTOM;
					let yObstacle = gridRow * TILE_HEIGHT;
					translation.y = yObstacle - collisionPoints[index].y;
					this.isGrounded = true;
				}
				if (i === points.CENTER_LEFT) {
					index = points.CENTER_LEFT;
					let xObstacle = gridColumn * TILE_WIDTH + TILE_WIDTH;
					translation.x = xObstacle - collisionPoints[index].x;
				}
				if (i === points.CENTER_RIGHT) {
					index = points.CENTER_RIGHT;
					let xObstacle = gridColumn * TILE_WIDTH;
					translation.x = xObstacle - collisionPoints[index].x;
				}

				this.velocity = this.velocity.add(translation);
				}
			}
	};

	this.getCollisionPoints = function(position, size) {
		let collisionPoints = [
		// TOP CENTER
		{x : position.x + size.x / 2,
		 y : position.y + BB_TOP_OFFSET},
		// BOTTOM CENTER
		{x : position.x + size.x / 2,
		 y : position.y + size.y - BB_TOP_OFFSET},
		 // LEFT CENTER
		{x : position.x + BB_LEFT_OFFSET,
		 y : position.y + size.y /2 - BB_BOTTOM_OFFSET},
		 // RIGHT CENTER
		 {x : position.x + size.x - BB_LEFT_OFFSET,
		 y : position.y + size.y /2 - BB_BOTTOM_OFFSET},];

		return collisionPoints;
	}

	this.draw = function() {
		drawImage(this.sprite, this.position.x, this.position.y);
		/*for (let i = 0; i < this.corners.length; i++) {
			drawColoredCircle(this.corners[i].x, this.corners[i].y, 2, "blue");
		}*/
	};

	this.setupKeys = function(leftKey,	rightKey, jumpKey) {
		this.leftKey = leftKey;
		this.rightKey = rightKey;
		this.jumpKey = jumpKey;
	}
};

Warrior.prototype.update = function (deltaTime) {
	this.move(deltaTime);
};
