"use strict"

import Entity from "./libraries/entity";
import Vector2 from "./libraries/vector2";
import {engine} from "./libraries/engine";


export default class Projectile extends Entity {
  constructor() {
    super();
    this._position = new Vector2();
    this._velocity = new Vector2();
    this._speed = new Vector2();
    this._canvasContext = null;
    this._sprite = null;
  }

  update(deltaTime) {
    this._position.add(this._velocity);
  }

  render(deltaTime) {
    this.canvasContext.drawImage(this._sprite, this._position.x, this._position.y);
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
}
