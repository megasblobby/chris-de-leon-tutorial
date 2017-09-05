const TOTAL_BALLS = 800;
const MIN_SPEED = 0.1, MAX_SPEED = 5;

let WIDTH, HEIGHT;

let canvas, canvasContext;
let balls = [];

window.onload = function () {
	canvas = document.getElementById("gameCanvas");
	canvasContext = canvas.getContext("2d");

	WIDTH = canvas.width;
	HEIGHT = canvas.height;

  drawColoredRect(0, 0, WIDTH, HEIGHT, "black");
	drawColoredText("LOADING", WIDTH / 2, HEIGHT / 2, "white");

  loadImages();
}

function startGame() {
	let framesPerSecond = 60;
	setInterval(gameLoop, 1000/framesPerSecond);

	loadLevel(levelOne);

	createBalls(TOTAL_BALLS);
}

function loadLevel(level) {
	track = [levelOne.length];
	for (let row = 0; row < level.length; row++) {
		track[row] = level[row].slice();
	}
}

function createBalls(totalBalls) {
  for (let i = 0; i < totalBalls; i++) {
		let randomVelocity = getRandomVelocity();
    let randomSpeed = getRandomSpeed(MIN_SPEED, MAX_SPEED);

    let ball = new Ball();
    ball.velocity = randomVelocity, ball.speed = randomSpeed;

		ball.position = getRandomPosition();

    ball.sprite = ballSprite;

    balls.push(ball);
  }
}

function getRandomVelocity() {
	let x = Math.random();
	let y = Math.random();

	return new Vector2(x, y).normalized();
}

function getRandomSpeed(minSpeed, maxSpeed) {
  let randomSpeed = Math.random() * (maxSpeed - minSpeed) + minSpeed;

  return randomSpeed;
}

function getRandomPosition() {
	let randomPosition = new Vector2();
	let gridCell = null;
	do {
		randomPosition.x = Math.floor(Math.random() * WIDTH);
		randomPosition.y = Math.floor(Math.random() * HEIGHT);

		let gridRow = Math.floor(randomPosition.y / TILE_HEIGHT);
		let gridColumn = Math.floor(randomPosition.x / TILE_WIDTH);

		let gridCell = getGridCellAtIndex(gridRow, gridColumn);
	} while (gridCell == WALL);

	return randomPosition;
}

function resetGame() {
	loadLevel(levelOne);
}

function gameLoop() {
	update();
	render();
}

function update() {
	for (let i = 0; i < balls.length; i++) {
		balls[i].move();
	}
}

function render() {
	drawColoredRect(0, 0, WIDTH, HEIGHT, "black");

	drawWorld();

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
  }
}

function clamp(minValue, maxValue, value) {
	if (value < minValue)
		value = minValue;
	if (value > maxValue)
		value = maxValue;

	return value;
}
