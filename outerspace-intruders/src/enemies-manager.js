"use strict"

import Enemy from "./enemy";
import Vector2 from "./libraries/vector2";
import BoundingBox from "./libraries/bounding-box";
import {engine} from "./libraries/engine";

const ROWS = 5;
const COLUMNS = 10;
const RIGHT = new Vector2(1, 0);
const LEFT = new Vector2(-1, 0);
const DOWN = new Vector2(0, 1);
const GAP = 20;
const STARTING_POSITION = new Vector2(10, 10);
const ENDING_POSITION = new Vector2(380, 10);
const MIN_X = STARTING_POSITION.x;
const MAX_X = STARTING_POSITION.x;
const SPEED = new Vector2(50, 50);

function* moveDown(deltaTime) {
  var y = 0, finalY = 40;
  let velocity = DOWN.clone(), speed = SPEED.clone();

  this._setGlobalVelocity(DOWN.clone());

  y += velocity.add(speed.scaled(deltaTime)).y;
  yield y;

  while (y < finalY) {
    console.log("SPEED:" + y);

    y += velocity.add(speed.scaled(yield)).y;
  }
}

let y;
export default class EnemiesManager {
  constructor() {
    this._enemies = new Map();
    this._previousVelocity = new Vector2();
    this._moveFormationDown = false;
    this._moveDown = moveDown.bind(this);
    this._iterator = null;
  }

  createEnemies() {
    for (let row = 0; row < ROWS; row++) {
      this._enemies.set(`row_${row}`, new Map());
      for (let column = 0; column < COLUMNS; column++) {
        let enemy = this._createEnemy(row, column);
        enemy.tagManager.add('row', row);
        this._enemies.get(`row_${row}`).set(enemy.name, enemy);
        engine.entitiesManager.addAtGroup(enemy, "enemies");
      }
    }
  }

  _createEnemy(row, column) {
    let enemy = new Enemy();

    let x = STARTING_POSITION.x + (column * GAP);
    let y = STARTING_POSITION.y + (row * GAP);
    let position = new Vector2(x, y);

    enemy.boundingBox = new BoundingBox(position, new Vector2(14, 15));


    enemy.speed = SPEED.clone();
    enemy.velocity = RIGHT.clone();
    enemy.canvasContext = engine.canvasContext;
    enemy.sprite = engine.assetManager.assets.get("enemy");

    return enemy;
  }

  update(deltaTime) {
    for (let row = 0; row < ROWS; row++) {
      let enemiesOfTheRow = Array.from(this._enemies.get(`row_${row}`).values());
      if (this._shouldMoveDown(enemiesOfTheRow)) {
        this._moveFormationDown = true;
        this._previousVelocity = enemiesOfTheRow[0].velocity;
        this._iterator = this._moveDown(deltaTime);
      }
    }
    if (this._moveFormationDown) {
      if (this._iterator.next(deltaTime).done === true) {
        this._moveFormationDown = false;
        this._setGlobalVelocity(this._previousVelocity.scaled(-1));
      }
    }
  }

  _shouldMoveDown(enemies) {
    let firstEnemy = enemies[0];
    let lastEnemy = enemies[enemies.length - 1];

    if (((firstEnemy.position.x < STARTING_POSITION.x &&
          firstEnemy._velocity.x === LEFT.x) ||
         (lastEnemy.position.x > ENDING_POSITION.x &&
          lastEnemy._velocity.x === RIGHT.x)) &&
          this._moveFormationDown === false)
    {
            return true;
    }
    return false;
  }


  _setGlobalVelocity(velocity) {
    for (let row = 0; row < ROWS; row++) {
      let enemiesOfTheRow = Array.from(this._enemies.get(`row_${row}`).values());
      for (let index = 0; index < enemiesOfTheRow.length; index++) {
        enemiesOfTheRow[index].velocity = velocity;
      }
    }
  }

}
