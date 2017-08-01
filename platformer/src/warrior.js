"use strict";

const BB_LEFT_OFFSET = 13, BB_RIGHT_OFFSET = BB_LEFT_OFFSET;
const BB_TOP_OFFSET = 11, BB_BOTTOM_OFFSET = 3;
const JUMP_FORCE = 300, GRAVITY = 50;
const MAX_VERTICAL_ACCELERATION = 100;
const MIN_VERTICAL_ACCELERATION = -MAX_VERTICAL_ACCELERATION;
const HORIZONTAL_ACCELERATION_INCREMENT = 10;
const HORIZONTAL_RATIO_DECREMENT = 0.85;
const MAX_HORIZONTAL_ACCELERATION = 30;
const MIN_HORIZONTAL_ACCELERATION = -MAX_HORIZONTAL_ACCELERATION;
const FLOOR_FRICTION = 0.6;
const MAX_HORIZONTAL_VELOCITY = 10;
const MIN_HORIZONTAL_VELOCITY = -MAX_HORIZONTAL_VELOCITY;
const MAX_VERTICAL_VELOCITY = 10;
const MIN_VERTICAL_VELOCITY = -MAX_VERTICAL_VELOCITY;

function Warrior(name = "Warrior") {
	this.name = name;


	this.position = new Vector2();
	this.velocity = new Vector2();
	this.acceleration = new Vector2();
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
		this.acceleration.y += GRAVITY;

		if (this.isMovingLeft) {
			this.acceleration.x -= HORIZONTAL_ACCELERATION_INCREMENT * deltaTime;
		}
		else if(this.isMovingRight) {
			this.acceleration.x += HORIZONTAL_ACCELERATION_INCREMENT * deltaTime;
		}
		else {
			this.acceleration.x *= HORIZONTAL_RATIO_DECREMENT;

			if (Math.abs(this.acceleration.x) < 0.1) {
				this.acceleration.x = 0;
			}
		}

		if (this.isJumping) {
			if(this.isGrounded) {
				this.isGrounded = false;
				this.acceleration.y = -JUMP_FORCE;
			}
			else {
				this.acceleration.y = 0;
			}
		}

		this.acceleration.x = clamp(this.acceleration.x,
																MIN_HORIZONTAL_ACCELERATION,
																MAX_HORIZONTAL_ACCELERATION);
		console.log("acceleration.x: ", this.acceleration.x);
		this.acceleration.y = clamp(this.acceleration.y,
																MIN_VERTICAL_ACCELERATION,
																MAX_VERTICAL_ACCELERATION);

		if(Math.abs(this.acceleration.y) < 0.1) {
			this.acceleration.y = 0;
		}
		console.log("acceleration.y: ", this.acceleration.y);


		this.velocity.x += this.acceleration.x;
		this.velocity.y += this.acceleration.y;

		if (Math.abs(this.velocity.x) < 0.1) {
			this.velocity.x = 0;
		}
		if (Math.abs(this.velocity.y) < 0.1) {
			this.velocity.y = 0;
		}

		if(this.isGrounded) {
			this.velocity.x *= FLOOR_FRICTION;
		}

		this.velocity.x = clamp(this.velocity.x, MIN_HORIZONTAL_VELOCITY,
			MAX_HORIZONTAL_VELOCITY);
		this.velocity.y = clamp(this.velocity.y, MIN_VERTICAL_VELOCITY,
				MAX_VERTICAL_VELOCITY);

		this.handleWorldCollision();

		console.log("velocity: ", this.velocity);
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
