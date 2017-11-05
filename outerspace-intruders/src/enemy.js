"use strict"

import Entity from "./libraries/entity";
import Projectile from "./projectile";
import Vector2 from "./libraries/vector2";
import {engine} from "./libraries/engine";

const DOWN = new Vector2(0, 1);

export default class Enemy extends Entity {
  constructor() {
    super();
    this._position = new Vector2();
    this._velocity = new Vector2();
    this._speed = new Vector2();
    this._canvasContext = null;
    this._sprite = null;
    this._fireRatio = 0.5;
    this._elpasedTimeFromLastShoot = this._fireRatio;
  }

  update(deltaTime) {
    //this._velocity = new Vector2();

    this._position.increment(this._velocity);
  }

  render(deltaTime) {
    this.canvasContext.drawImage(this._sprite, this._position.x, this._position.y);
  }

  /*_shoot(deltaTime) {
      if (this._elpasedTimeFromLastShoot > this._fireRatio) {
        this._elpasedTimeFromLastShoot = 0;

        let projectile = this._createProjectile();
        engine.entitiesManager.addAtGroup(projectile, "player_projectiles");
      }
      else {
        this._elpasedTimeFromLastShoot += deltaTime;
      }
  }

  _createProjectile() {
    let projectile = new Projectile();
    projectile.position = this._position.clone();
    projectile.speed = new Vector2(200, 0);
    projectile.velocity = UP.clone();
    projectile.canvasContext = this._canvasContext;
    projectile.sprite = engine.assetManager.assets.get("player_projectile");

    return projectile;
  }*/

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
