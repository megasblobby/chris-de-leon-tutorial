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

  remove(entity) {
    if (this._entities.has(entity.name)) {
      this._entities.delete(entity.name)
    }
    else {
      console.warn(`"${entityName}" doesn't exists in entities`);
    }
  }

  get(entityName) {
    if (this._entities.has(entityName)) {
      return this._entities.get(entityName);
    }
    else {
      console.warn(`"${entityName}" doesn't exists in entities`);
      return null
    }
  }

  addAtGroup(entity, groupName) {
    if (this._groups.has(groupName) == false) {
      this._groups.set(groupName, new Set());
      console.warn(`Creating group: "${groupName}".`);
    }
    this._groups.get(groupName).add(entity.name);
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

  getGroup(groupName) {
    if (this._groups.has(groupName)) {
      let ids = this._groups.get(groupName).values();
      let entities = new Array();
      for (let id of ids) {
        entities.push(this.get(id));
      }

      return entities;
    }
    else{
      console.warn(`"${groupName}" doesn't exists.`);
    }
  }

  get entities() {
    return this._entities;
  }
}
