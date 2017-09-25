"use strict"

class Bullet extends Entity {
  constructor(components, renderer) {
    super();

    /*this.position = new Vector2();
    this.velocity = new Vector2();
    this.sizes = new Vector2();
    this.speed = 0;*/
    /*this.sizes
    let color = "yellow";*/
    this.components = components;
    this.renderer = renderer;
    this.movementManager = components.get("movement-manager");
    this.canvasContext = renderer.canvasContext;
    //this.addComponent("movement-manager", this.movementManager);*/
  }

  update(deltaTime) {
    //super.update(deltaTime);
    this.movementManager.position.increment(this.movementManager.velocity.scaled(this.movementManager.speed));
    this.renderer.position =   this.movementManager.position;
  }
}
