"use strict";

function drawColoredRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}

function drawEmptyRect(x, y, width, height, color) {
	canvasContext.strokeStyle = color;
	canvasContext.rect(x, y, width, height);
	canvasContext.stroke();
}

function drawColoredCircle(x, y, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, 0, Math.PI * 2);
	canvasContext.fill();
}

function drawImage(image, x, y) {
	canvasContext.drawImage(image, x, y);
}

function drawCenteredRotatedImage(image, x, y, angle) {
	canvasContext.save();
	canvasContext.translate(x, y);
	canvasContext.rotate(angle);
	canvasContext.drawImage(image, -image.width / 2,
							-image.height / 2);
	canvasContext.restore();
}

function drawColoredText(stringToRender, x, y, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillText(stringToRender, x, y);
}
