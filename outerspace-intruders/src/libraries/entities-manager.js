"use strict";

export default class EntitesManager {
  constructor() {
    this._entities = new Map();
    this._groups = new Map();
  }

  add(entity) {
    this._entities.set(entity.name, entity);
    console.log(`Add "${entity.name}" to entities`);
  }

  remove(entityName) {
    if (this._entities.has(entityName)) {
      this._entities.delete(entityName)
    }
    else {
      console.warn(`"${entityName}" doesn't exists in entities`);
    }
  }

  addAtGroup(entity, groupName) {
    if (this._groups.has(groupName) == false) {
      this._groups.set(groupName, new Map());
      console.warn(`Creating group: "${groupName}".`);
    }
    this._groups.get(groupName).set(entity.name, entity);
    this.add(entity);
  }

  removeFromGroup(entity, groupName) {
    if (this._groups.has(groupName)) {
      this.remove(entity);
      this._groups.delete(entity.name);
    }
    else{
      console.warn(`Creating group: "${groupName}".`);
    }
  }

  removeGroup(entity, groupName) {
    if (this._groups.has(groupName)) {
      for (let key of this._groups.keys()) {
        this.remove(entity);
      }
      this._groups.delete(groupName);
    }
    else{
      console.warn(`"${groupName}" doesn't exists.`);
    }
  }

  get entities() {
    return this._entities;
  }
}
