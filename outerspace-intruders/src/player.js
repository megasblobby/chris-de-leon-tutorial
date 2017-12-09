"use strict"

import Entity from "./libraries/entity";
import Projectile from "./projectile";
import Vector2 from "./libraries/vector2";
import BoundingBox from "./libraries/bounding-box";
import ObjectsPool from "./libraries/objects-pool.js"
import {engine} from "./libraries/engine";

const MOVE_LEFT = "ArrowLeft";
const MOVE_RIGHT = "ArrowRight";
const SHOOT = "z";
const UP = new Vector2(0, -1);
const SPEED = new Vector2(0, 2);

export default class Player extends Entity {
  constructor() {
    super();
    this._position = new Vector2();
    this._velocity = new Vector2();
    this._speed = new Vector2();
    this._canvasContext = null;
    this._sprite = null;
    this._boundingBox = new BoundingBox();
    this._fireRatio = 0.5;
    this._elpasedTimeFromLastShoot = this._fireRatio;
    this._projectilesPool = new ObjectsPool(Projectile, 10);
  }

  update(deltaTime) {
    this._velocity = new Vector2();

    if (engine.inputManager.KeyBoard.get(MOVE_LEFT)) {
      this._velocity.x = -this._speed.x * deltaTime;
    }
    else if (engine.inputManager.KeyBoard.get(MOVE_RIGHT)) {
      this._velocity.x = this._speed.x * deltaTime;
    }
    if (engine.inputManager.KeyBoard.get(SHOOT)) {
      this._shoot(deltaTime);
    }

    this._boundingBox.position.add(this._velocity);
  }

  render(deltaTime) {
    this.canvasContext.drawImage(this._sprite,  this._boundingBox.position.x,  this._boundingBox.position.y);
  }

  _shoot(deltaTime) {
      this._elpasedTimeFromLastShoot += deltaTime;
      if (this._elpasedTimeFromLastShoot >= this._fireRatio) {
        this._elpasedTimeFromLastShoot = 0;

        let projectile = this._createProjectile();
        engine.entitiesManager.addAtGroup(projectile, "player_projectiles");
      }
  }

  _createProjectile() {
    let projectile = this._projectilesPool.getObject();
    //projectile.position.copy(this._boundingBox.position);
    projectile.speed.copy(SPEED);
    projectile.velocity.copy(UP);
    projectile.canvasContext = this._canvasContext;
    projectile.sprite = engine.assetManager.assets.get("player_projectile");
    projectile.sprite.isActive = true;
    projectile.boundingBox.position.copy(this._boundingBox.position);
    projectile.boundingBox.sizes.copy(new Vector2(3, 9));
    projectile.boundingBox.tagManager.add('entityType', 'player_projectile')
    projectile.boundingBox.tagManager.add('ID', projectile.ID);
    return projectile;
  }

  set position(_position) {
    this._boundingBox.position = _position.clone();
  }

  get position() {
    return this._boundingBox.position.clone();
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

  /*onNotify (subject, object) {
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
    if (subject === "key-pressed") {
      if (object === FIRE) {
        console.log("SHOOT");
        let position = new Vector2(this.position.x,
                                   this.position.y + 20);
        let velocity = new Vector2(0, -1);
        let speed = 4;
        let movementManager = new StraightMovement(position, velocity, speed);
        let sizes = new Vector2(5, 10);
        let color = "yellow"
        let renderer = new BoxRenderer(this.renderer.canvasContext, position, sizes, color);
        let components = new Map();
        components.set("movement-manager", movementManager);

        let bullet = new Bullet(components, renderer);
        /*bullet.position = new Vector2(this.position.x,
                                                     this.position.y + 20);
        bullet.movementManager.velocity = new Vector2(0, 1);
        bullet.movementManager.speed = 4;*/
        //this.observable.notify("spawn-entity", bullet);
      //}
    //}
  //}
}
