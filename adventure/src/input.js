const LEFT = 65, RIGHT = 68;
const FORWARD = 87, BACKWARD = 83;

let mouseX, mouseY;

let isMovingForward = false, isMovingBackward = false;
let isMovingLeft = false, isMovingRight = false;

function setupInput() {
	canvas.addEventListener("mousemove", getCursorCoords);

	document.addEventListener("keydown", keyPressed);
	document.addEventListener("keyup", keyReleased);

	warrior.setupKeys(FORWARD, BACKWARD, LEFT, RIGHT);
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
	if (keyCode == warrior.forwardKey) {
		warrior.isMovingForward = value;
	}
	else if (keyCode == warrior.backwardKey) {
		warrior.isMovingBackward = value;
	}
}

function keyPressed(evt) {
	keySet(evt.keyCode, warrior, true);
}

function keyReleased(evt) {
	keySet(evt.keyCode, warrior, false);
}
