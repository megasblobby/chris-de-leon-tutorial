"use strict"

import Enemy from "./enemy";
import Vector2 from "./libraries/vector2";
import {engine} from "./libraries/engine";

const ROWS = 5;
const COLUMNS = 10;
const RIGHT = new Vector2(1, 0);
const LEFT = new Vector2(-1, 0);
const GAP = 20;
const STARTING_POSITION = new Vector2(10, 10);
const ENDING_POSITION = new Vector2(780, 10);
const MIN_X = STARTING_POSITION.x;
const MAX_X = STARTING_POSITION.x;
const SPEED = new Vector2(50, 50);

export default class EnemiesManager {
  constructor() {
    this._enemies = new Map();
  }

  createEnemies() {
    for (let row = 0; row < ROWS; row++) {
      this._enemies.set(`row_${row}`, new Set());
      for (let column = 0; column < COLUMNS; column++) {
        let enemy = this._createEnemy(row, column);
        this._enemies.get(`row_${row}`).add(enemy.name);
        engine.entitiesManager.addAtGroup(enemy, "enemies");
      }
    }
  }

  _createEnemy(row, column) {
    let enemy = new Enemy();

    let x = STARTING_POSITION.x + (column * GAP);
    let y = STARTING_POSITION.y + (row * GAP);
    let position = new Vector2(x, y);
    enemy.position = position;

    enemy.speed = SPEED.clone();
    enemy.velocity = RIGHT.clone();
    enemy.canvasContext = engine.canvasContext;
    enemy.sprite = engine.assetManager.assets.get("enemy");

    return enemy;
  }

  /*update(deltaTime) {
    for (let row = 0; row < ROWS; row++) {
      (this._enemies.get(`row_${row}`)[0].x < INITIAL_POSITION.x) {

      }
    }
  }*/

  get enemies() {
    return this._enemies;
  }
}
