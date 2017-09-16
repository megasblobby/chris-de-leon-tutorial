"use strict";

function getMousePosition(evt) {
	let rect = this.canvas.getBoundingClientRect();
	let root = document.documentElement;

	let x = evt.clientX - rect.left - root.scrollLeft;
	let y = evt.clientY - rect.top - root.scrollTop;
	this.mouse.position = new Vector2(x, y);
}

function onMouseDown(evt) {
	if(evt.button == this.mouse.LEFT_BUTTON) {
		console.log("mouse down");
		this.mouse.leftButton = true;
		this.observable.notify("mouse-left-down", this.mouse)
	}
}

function onMouseUp(evt) {
		if(evt.button == this.mouse.LEFT_BUTTON) {
			console.log("mouse up");
			this.mouse.leftButton = false;
		}
}

function keyPressed(evt) {
	console.log(`key pressed ${evt.keyCode}`);
	this.observable.notify("key-pressed", evt.keyCode);
}

function keyReleased(evt) {
	console.log(`key released ${evt.keyCode}`);
	this.observable.notify("key-released", evt.keyCode);
}

class InputManager {
	constructor(canvas) {
		this.canvas = canvas;
		this.mouse = new Mouse();
		this.keyboard = new Keyboard();
		this.observable = new Observable();

		this.getMousePosition = getMousePosition.bind(this);
		this.onMouseDown = onMouseDown.bind(this);
		this.onMouseUp = onMouseUp.bind(this);
		this.keyPressed = keyPressed.bind(this);
		this.keyReleased = keyReleased.bind(this);
	}
}
