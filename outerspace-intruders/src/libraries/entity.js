"use strict";

import Observable from "./observable";

let ID = 0;

export default class Entity {
  constructor(components = new Map(), renderer = null, name = "entity") {
    this._ID = Entity.obtainID();
    this._name = `${this.constructor.name}_${this._ID}`;
    this._tags = new Map();

    this.components = components;
  //  this.renderer = renderer;
    this.observable = new Observable();
  }

  static obtainID() {
    return ID++;
  }

  update(deltaTime) {
    for (let [key, value] of this.components) {
      value.update(deltaTime);
    }
  }

  render(deltaTime) {
    /*if (this.renderer !== null) {
      this.renderer.render(deltaTime);
    }*/
  }

  addComponent(name, component) {
    this.components.set(name, component);
  }

  getComponent(name) {
    return this.components.get(name);
  }

  get ID() {
    return this._ID;
  }

  get name() {
    return this._name;
  }

  get tags() {
    return this._tags;
  }
}
