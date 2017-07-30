"use strict";

const LEFT = 65, RIGHT = 68;
const JUMP = 32;

let mouseX, mouseY;

let isMovingLeft = false, isMovingRight = false;
let isJumping = false;

function setupInput() {
	canvas.addEventListener("mousemove", getCursorCoords);

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	warrior.setupKeys(LEFT, RIGHT, JUMP);
}

function getCursorCoords(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(keyCode, warrior, value) {
	if (keyCode == warrior.leftKey) {
		warrior.isMovingLeft = value;
	}
	else if (keyCode == warrior.rightKey) {
		warrior.isMovingRight = value;
	}
	if (keyCode == warrior.jumpKey) {
		warrior.isJumping = value;
	}
}

function keyPressed(evt) {
	keySet(evt.keyCode, warrior, true);
}

function keyReleased(evt) {
	keySet(evt.keyCode, warrior, false);
}
