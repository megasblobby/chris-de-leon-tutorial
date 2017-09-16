"use strict"

class BoxRenderer {
  constructor(canvasContext, position, sizes, color) {
    this.canvasContext = canvasContext;
    this.position = position;
    this.sizes = sizes;
    this.color = color;
  }

  render(deltaTime) {
    this.canvasContext.fillStyle = this.color;
    this.canvasContext.fillRect(this.position.x, this.position.y,
                                this.sizes.x, this.sizes.y);
  }
}
