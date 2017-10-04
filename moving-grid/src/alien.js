"use strict"

class Alien extends Entity {
  constructor(canvasContext, position, velocity) {
    super();
    this.position = position;
    this.velocity = velocity;

    let minPosition = new Vector2(10, 100);
    let maxPosition = new Vector2(100, 100);
    let sizes = new Vector2(40, 40);
    let color = "red";

    this.movementManager = new LoopMovement(position, minPosition, maxPosition,
                                            velocity);
    this.renderer = new BoxRenderer(canvasContext, position, sizes, color);

    this.addComponent("movement-manager", this.movementManager);
  }

  update(deltaTime) {
    super.update(deltaTime);
    this.renderer.position = this.movementManager.position;
  }
}
