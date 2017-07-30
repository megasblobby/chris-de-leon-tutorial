"use strict";

const SAFETY_MARGIN = new Vector2(50, 50);
const FOCUS_WIDTH = 300, FOCUS_HEIGHT = 150;

function Camera(target = null, position = new Vector2(), size = new Vector2()) {
	this.target = target;
	this.position = position;
  this.size = size;
  this.pan = new Vector2();
  this.topLeftCorner = new Vector2();
  this.bottomRightCorner = new Vector2();
	this.translationSpeed = 200;
};

Camera.prototype.translate = function(translation) {
  this.position.increment(translation);
};

Camera.prototype.update = function(deltaTime) {
	  this.pan = this.getPan(this.position, this.size);
		this.calculateCorners(this.pan, this.size, SAFETY_MARGIN);

	// x and y of the top left corner of the focus area
	let x = (this.position.x + this.target.sprite.width / 2) - FOCUS_WIDTH / 2;
	let y = (this.position.y + this.target.sprite.height / 2) - FOCUS_HEIGHT / 2;
	let focusCenter = new Vector2(x + FOCUS_WIDTH / 2, y + FOCUS_HEIGHT / 2);

	let fromFocusCenterToTarget = this.position.subtract(this.target.position);

	if (this.target.position.x < x || this.target.position.x > focusCenter.x + FOCUS_WIDTH / 2 || this.target.position.y < y || this.target.position.y > focusCenter.y + FOCUS_HEIGHT / 2) {
		let translation = fromFocusCenterToTarget.normalized();
		translation.scale(this.translationSpeed);
		translation.scale(deltaTime);

		this.position = this.position.subtract(translation);
	}
};

Camera.prototype.getPan = function (center, size) {
	let halfSize = size.clone();
	halfSize.scale(0.5);

	let pan = center.subtract(halfSize);
	pan.x = Math.floor(pan.x);
	pan.y = Math.floor(pan.y);

	return pan;
};

Camera.prototype.calculateCorners = function (pan, size, safetyMargin) {
	this.topLeftCorner = new Vector2(pan.x - safetyMargin.x,
																	 pan.y - safetyMargin.y);
	this.bottomRightCorner = new Vector2(pan.x + size.x + safetyMargin.x,
																 pan.y + size.y + safetyMargin.y);
};

Camera.prototype.draw = function() {
	let x = (this.position.x + this.target.sprite.width / 2) - FOCUS_WIDTH / 2;
	let y = (this.position.y + this.target.sprite.height / 2) - FOCUS_HEIGHT / 2;
	let focus_center = new Vector2(x + FOCUS_WIDTH / 2, y + FOCUS_HEIGHT / 2);
	drawEmptyRect(x, y, FOCUS_WIDTH, FOCUS_HEIGHT, "blue");
	drawColoredCircle(focus_center.x, focus_center.y, 5, "blue");
};
