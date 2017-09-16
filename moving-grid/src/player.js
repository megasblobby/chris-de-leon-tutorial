"use strict"

const LEFT = 65, RIGHT = 68;
const FIRE = 32;

class Player extends Entity {
  constructor(canvasContext) {
    super();

    this.position = new Vector2(20, 560);
    this.velocity = new Vector2(0, 0);
    this.speed = 4;
    let sizes = new Vector2(20, 20);
    let color = "blue";

    this.renderer = new BoxRenderer(canvasContext, this.position, sizes, color);

    this.addComponent("movement-manager", this.movementManager);
  }

  update(deltaTime) {
    //super.update(deltaTime);
    this.position.increment(this.velocity.scaled(this.speed));
    this.renderer.position = this.position;
  }

  onNotify (subject, object) {
    if (subject === "key-pressed") {
      if (object === LEFT) {
        this.velocity.x = -1;
      }
    }
    else if (subject === "key-released") {
      if (object === LEFT) {
        this.velocity.x = 0;
      }
    }
    if (subject === "key-pressed") {
      if (object === RIGHT) {
        this.velocity.x = 1;
      }
    }
    else if (subject === "key-released") {
      if (object === RIGHT) {
        this.velocity.x = 0;
      }
    }
  }
}
