const TURN_LEFT = 65, TURN_RIGHT = 68;
const ACCELERATE = 87, DECELERATE = 83;
const TURN_LEFT2 = 37, TURN_RIGHT2 = 39;
const ACCELERATE2 = 38, DECELERATE2 = 40;

let mouseX, mouseY;

let isAccelerating = false, isDecelerating = false;
let isTurningLeft = false, isTurningRight = false;

function setupInput() {
	canvas.addEventListener("mousemove", getCursorCoords);

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	car.setupKeys(ACCELERATE, DECELERATE, TURN_LEFT, TURN_RIGHT);
	car2.setupKeys(ACCELERATE2, DECELERATE2, TURN_LEFT2, TURN_RIGHT2);
}

function getCursorCoords(evt) {
	let rect = canvas.getBoundingClientRect();
	let root = document.documentElement;

	mouseX = evt.clientX - rect.left - root.scrollLeft;
	mouseY = evt.clientY - rect.top - root.scrollTop;
}

function keySet(keyCode, car, value) {
	if (keyCode == car.turnLeftKey) {
		car.isTurningLeft = value;
	}
	else if (keyCode == car.turnRightKey) {
		car.isTurningRight = value;
	}
	if (keyCode == car.accelerateKey) {
		car.isAccelerating = value;
	}
	else if (keyCode == car.brakeKey) {
		car.isDecelerating = value;
	}
}

function keyPressed(evt) {
	keySet(evt.keyCode, car, true);
	keySet(evt.keyCode, car2, true);
}

function keyReleased(evt) {
	keySet(evt.keyCode, car, false);
	keySet(evt.keyCode, car2, false);
}
