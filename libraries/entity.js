"use strict";

class Entity {
  constructor(components = new Map(), renderer = null) {
    this.components = components;
    this.renderer = renderer;
    this.observable = new Observable();
  }

  update(deltaTime) {
    for (let [key, value] of this.components) {
      value.update(deltaTime);
    }
  }

  render(deltaTime) {
    if (this.renderer !== null) {
      this.renderer.render(deltaTime);
    }
  }

  addComponent(name, component) {
    this.components.set(name, component);
  }

  getComponent(name) {
    return this.components.get(name);
  }
}
