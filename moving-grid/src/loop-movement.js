"use strict";

const DEFAULT_DELTA = 0.5;

class LoopMovement {
  constructor(position, minPosition, maxPosition, velocity) {
    this.position = position;
    this.minPosition = minPosition;
    this.maxPosition = maxPosition;
    this.velocity = velocity;
    this.delta = DEFAULT_DELTA;

    this.checkPositions();
  }

  update(deltaTime) {
    this.position.increment(this.velocity.scaled(deltaTime));

    if (this.areEqual(this.position, this.minPosition)) {
      this.position = this.minPosition.clone();
      this.velocity.negate();
    }
    if (this.areEqual(this.position, this.maxPosition)) {
      this.position = this.maxPosition.clone();
      this.velocity.negate();
    }
  }

  checkPositions() {
    if (this.minPosition.x > this.maxPosition.x) {
      let temp = this.minPosition.x;
      this.minPosition.x = this.maxPosition.x;
      this.maxPosition.x = temp;
    }
    if (this.minPosition.y > this.maxPosition.y) {
      let temp = this.minPosition.y;
      this.minPosition.y = this.maxPosition.y;
      this.maxPosition.y = temp;
    }
  }

  areEqual(positionA, positionB) {
    let distance = Vector2.distance(positionA, positionB);
    if (Math.abs(distance) <= this.delta) {
      return true;
    }

    return false;
  }
}
