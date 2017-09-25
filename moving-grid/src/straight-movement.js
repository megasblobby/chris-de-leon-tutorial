"use strict"

class StraightMovement extends Entity {
  constructor(position, velocity, speed) {
    super();

    this.position = position;
    this.velocity = velocity;
    this.speed = speed;
  }

  update(deltaTime) {
    this.position.increment(this.velocity.scaled(this.speed));
  }
}
