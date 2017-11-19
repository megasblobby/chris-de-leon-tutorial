"use strict"

import Vector2 from "./vector2";
import Rectangle from "./rectangle";
import {engine} from "./engine";

const MAX_OBJECTS_PER_NODE = 10;
const MAX_LEVEL = 5;
const PARENT = -1;
const AREA_NODE_A = 0, AREA_NODE_B = 1, AREA_NODE_C = 2, AREA_NODE_D = 3;

export default class Quadtree {
  constructor(area = new Rectangle(), level = 0) {
    this._area = area;
    this._level = level;
    this._objects = new Array();
    this._nodes = new Array();
  }

  clear() {
    /*if (this._nodes.lenght > 0) {
      for (let index = 0; index < this._nodes.length; index++) {
        this._nodes[index].clear();
        this._nodes.
      }
      while (this._nodes.length.)
    }*/
    if (this._level === 0) {
      this._nodes.length = 0;
      this._objects.length = 0;
    }
  }

  insert(boundingBox) {
    if (this._nodes.length > 0) {
      let index = this._getIndexNode(boundingBox);
      if (index !== -1) {
        this._nodes[index].insert(boundingBox);
      }
    }
    else {
      this._objects.push(boundingBox);
      if (this._objects.length > MAX_OBJECTS_PER_NODE &&
        this._level < MAX_LEVEL) {
          if (this._nodes.length === 0) {
            this._split();
            console.log("splitty-cash");
          }
          for (let i = 0; i < this._objects.length; i++) {
            let index = this._getIndexNode(this._objects[i]);
            console.log(`index ${index}`);
            if (index !== -1) {
              this._nodes[index].insert(this._objects[i]);
              this._objects.splice(i, 1);
              i--;
            }
          }
        }
      }
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

  get objects() {
    return this._objects;
  }

  get nodes() {
    return this._nodes;
  }
}
