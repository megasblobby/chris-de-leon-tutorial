"use strict"

import Vector2 from "./vector2";
import Rectangle from "./rectangle";
import {engine} from "./engine";

export const DEFAULT_MAX_OBJECTS_PER_NODE = 10;
export const DEFAULT_MAX_LEVELS = 5;
const PARENT = -1;
const AREA_NODE_A = 0, AREA_NODE_B = 1, AREA_NODE_C = 2, AREA_NODE_D = 3;

export default class Quadtree {
  constructor(area = new Rectangle(), level = 0,
              maxObjectsPerNode = DEFAULT_MAX_OBJECTS_PER_NODE,
              maxLevels = DEFAULT_MAX_LEVELS) {
    this._area = area;
    this._level = level;
    this._maxObjectsPerNode = maxObjectsPerNode;
    this._maxLevels = maxLevels;
    this._objects = new Array();
    this._nodes = new Array();
    this._returnObjects = new Array();
  }

  clear() {
    if (this._level === 0) {
      this._nodes.length = 0;
      this._objects.length = 0;
      this._returnObjects.length = 0;
    }
  }

  insert(boundingBox) {
    if (this._nodes.length > 0) {
      let index = this._getIndexNode(boundingBox);
      if (index !== PARENT) {
        this._nodes[index].insert(boundingBox);
      }
    }
    else {
      this._objects.push(boundingBox);
      if (this._objects.length > this._maxObjectsPerNode &&
        this._level < this._maxLevels) {
          if (this._nodes.length === 0) {
            this._split();
          }
          for (let i = 0; i < this._objects.length; i++) {
            let index = this._getIndexNode(this._objects[i]);
            if (index !== PARENT) {
              this._nodes[index].insert(this._objects[i]);
              this._objects.splice(i, 1);
              i--;
            }
          }
        }
      }
    }

    retrieve(boundingBox) {
      let index = this._getIndexNode(boundingBox);
      let objects = null;
      if (index !== PARENT && this._nodes.length > 0) {
        objects = this._nodes[index].retrieve(boundingBox);
      }

      Array.prototype.push.apply(this._returnObjects, objects);
      Array.prototype.push.apply(this._returnObjects, this._objects);

      return this._returnObjects;
   }

  _split() {
    let level = this._level + 1;
    let halfSizes = this._area.halfSizes;

    /**************************
    * _________  *  _________ *
    * | A | B |  *  | 0 | 1 | *
    * ───────── --> ───────── *
    * | C | D |  *  | 2 | 3 | *
    * ─────────  *  ───────── *
    ***************************/
    let areaNodeA = new Rectangle(this._area.leftTopCorner.clone(),
                                  halfSizes.clone());
    let areaNodeB = new Rectangle(new Vector2(this._area.center.x,
                                  this._area.minY), halfSizes.clone());
    let areaNodeC = new Rectangle(new Vector2(this._area.minX,
                                  this._area.center.y), halfSizes.clone());

    let areaNodeD = new Rectangle(this._area.center, halfSizes.clone());

    this._nodes.push(new Quadtree(areaNodeA, level));
    this._nodes.push(new Quadtree(areaNodeB, level));
    this._nodes.push(new Quadtree(areaNodeC, level));
    this._nodes.push(new Quadtree(areaNodeD, level));
  }

  _getIndexNode(boundingBox) {
    let index = PARENT;
    for (let i = 0; i < this._nodes.length; i++) {
      if (this._nodes[i].area.contains(boundingBox)) {
        index = i;
        return index;
      }
    }
    return index;
  }

  render(deltaTime) {
    engine.canvasContext.strokeStyle = '#FF0000';
    engine.canvasContext.strokeRect(this._area.leftTopCorner.x,
                                  this._area.leftTopCorner.y,
                                  this._area.width, this._area.height);

    for (let object of this._objects) {
      object.render(deltaTime);
    }

    for (let node of this._nodes) {
      node.render(deltaTime);
    }
  }

  get area() {
    return this._area;
  }

  get level() {
    return this._level;
  }

  get maxObjectsPerNode() {
    return this._maxObjectsPerNode;
  }

  get maxLevels() {
    return this._maxLevels;
  }

  get objects() {
    return this._objects;
  }

  get nodes() {
    return this._nodes;
  }
}
