import {engine} from "../src/libraries/engine";
import Vector2 from "../src/libraries/vector2";
import Player from "../src/player";
import EnemiesManager from "../src/enemies-manager";

let player;
let enemiesManager;

window.onload = () => {
  engine.preload = preload.bind(engine);
  engine.init = init.bind(engine);
  engine.update = update.bind(engine);
  engine.render = render.bind(engine);
  engine.preload();
}

function preload() {
  this.assetManager.addImage("player", "./media/player.png");
  this.assetManager.addImage("player_projectile", "./media/player-projectile.png");
  this.assetManager.addImage("enemy", "./media/enemy.png");

  this._loadAssets();
}

function init() {
  player = new Player();
  player.position = new Vector2(100, 100);
  player.speed = new Vector2(100, 0);
  player.canvasContext = this._canvasContext;
  player.sprite = this.assetManager.assets.get("player");

  this._entitiesManager.add(player);

  enemiesManager = new EnemiesManager();
  enemiesManager.createEnemies();
}

function update(deltaTime) {
  for (let entity of this._entitiesManager.entities.values()) {
    entity.update(deltaTime);
  }
}

function render(deltaTime) {
  this._canvasContext.fillStyle = '#000000';
	this._canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  for (let entity of this._entitiesManager.entities.values()) {
    entity.render(deltaTime);
  }
}
