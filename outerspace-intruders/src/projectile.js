"use strict"

import Entity from "./libraries/entity";
import Vector2 from "./libraries/vector2";
import BoundingBox from "./libraries/bounding-box";
import {engine} from "./libraries/engine";


export default class Projectile extends Entity {
  constructor() {
    super();
    this._position = new Vector2();
    this._velocity = new Vector2();
    this._speed = new Vector2();
    this._boundingBox = new BoundingBox();
    this._canvasContext = null;
    this._sprite = null;

    this._boundingBox.onCollision = this._onCollision.bind(this);
  }

  update(deltaTime) {
    this._boundingBox.position.add(Vector2.multiply(this._velocity, this._speed));
    this._position.add(this._velocity);
    if (this._boundingBox.position.y <= -5) {
      this.observable.notify("dispose", this);
    }
  }

  render(deltaTime) {
    this.canvasContext.drawImage(this._sprite, this._boundingBox.position.x,  this._boundingBox.position.y);
  }

  _onCollision(boundingBox) {
    if (boundingBox.tagManager.valueOf("entityType") === "enemy") {
      console.log("COLLISION666!!!");
      this.isActive = false;
      engine.entitiesManager.removeFromGroup(this, "player_projectiles");
    }
  }

  set position(newPosition) {
    this._position = newPosition;
  }

  get position() {
    return this._position;
  }

  set velocity(newVelocity) {
    this._velocity = newVelocity;
  }

  get velocity() {
    return this._velocity;
  }

  set speed(newSpeed) {
    this._speed = newSpeed;
  }

  get speed() {
    return this._speed;
  }

  set canvasContext(newCanvasContext) {
    this._canvasContext = newCanvasContext;
  }

  get canvasContext() {
    return this._canvasContext;
  }

  set sprite(newSprite) {
    this._sprite = newSprite;
  }

  get sprite() {
    return this._sprite;
  }

  set boundingBox(_boundingBox) {
    return this._boundingBox = _boundingBox;
  }

  get boundingBox() {
    return this._boundingBox;
  }

}
