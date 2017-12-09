import "babel-polyfill";
import {engine} from "../src/libraries/engine";
import Vector2 from "../src/libraries/vector2";
import Rectangle from "../src/libraries/rectangle";
import BoundingBox from "../src/libraries/bounding-box";
import Quadtree from "../src/libraries/quadtree";
import Player from "../src/player";
import EnemiesManager from "../src/enemies-manager";

let player;
let enemiesManager;
let quadtree;

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
  player.position = new Vector2(295, 750);
  player.boundingBox = new BoundingBox(new Vector2(395, 550), new Vector2(10, 15));
  player.boundingBox.tagManager.add('ID', player.ID);
  player.boundingBox.color = '#0000FF';

  player.speed = new Vector2(100, 0);
  player.canvasContext = this._canvasContext;
  player.sprite = this.assetManager.assets.get("player");
  player.boundingBox.tagManager.add('entityType', 'player')
  this._entitiesManager.add(player);

  enemiesManager = new EnemiesManager();
  enemiesManager.createEnemies();

  let enemies =  this.entitiesManager.getGroup('enemies');

  let position = new Vector2();
  let sizes = new Vector2(engine.canvasWidth, engine.canvasHeight);
  let area = new Rectangle(position, sizes);
  quadtree = new Quadtree(area, 0);
}

function update(deltaTime) {
  for (let entity of this._entitiesManager.entities.values()) {
    entity.update(deltaTime);
  }
  enemiesManager.update(deltaTime);
  updateQuadtree(deltaTime);
}

function updateQuadtree(deltaTime) {
  let enemies =  engine.entitiesManager.getGroup('enemies');
  let playerProjectiles = engine.entitiesManager.getGroup('player_projectiles');
  quadtree.clear();

  for (let i = 0; i < enemies.length; i++) {

    quadtree.insert(enemies[i].boundingBox);
   }
   if (playerProjectiles !== undefined) {
     for (let i = 0; i < playerProjectiles.length; i++) {

       quadtree.insert(playerProjectiles[i].boundingBox);
      }
   }

   quadtree.insert(player.boundingBox);
   //let returnObjects = quadtree.retrieve(player.boundingBox);
   // for (let object of returnObjects) {
   //   console.log(object.tagManager.valueOf('ID'));
   // }
   handleCollisions(deltaTime);
}

function handleCollisions(deltaTime) {
  let playerProjectiles = engine.entitiesManager.getGroup('player_projectiles');
  if (playerProjectiles !== undefined) {
    for (let playerProjectile of playerProjectiles) {
       let returnObjects = quadtree.retrieve(playerProjectile.boundingBox);
       for (let object of returnObjects) {
         if(object.tagManager.valueOf("ID") === playerProjectile.ID) {
           continue;
         }
         if (playerProjectile.boundingBox.intersect(object)) {
             playerProjectile.boundingBox.onCollision(object);
             object.onCollision(playerProjectile.boundingBox);
        }
      }
    }
  }
}

function render(deltaTime) {
  this._canvasContext.fillStyle = '#000000';
	this._canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  for (let entity of this._entitiesManager.entities.values()) {
    entity.render(deltaTime);
  }

  quadtree.render(deltaTime);
}
