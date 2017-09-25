"use strict"

const LEFT = 65, RIGHT = 68;
const FIRE = 32;

class Player extends Entity {
  constructor(canvasContext) {
    super();

    this.position = new Vector2(20, 560);
    this.velocity = new Vector2(0, 0);
    this.speed = 4;
    let sizes = new Vector2(20, 20);
    let color = "blue";

    this.renderer = new BoxRenderer(canvasContext, this.position, sizes, color);
  }

  update(deltaTime) {
    //super.update(deltaTime);
    this.position.increment(this.velocity.scaled(this.speed));
    this.renderer.position = this.position;
  }

  onNotify (subject, object) {
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
        this.observable.notify("spawn-entity", bullet);
      }
    }
  }
}
