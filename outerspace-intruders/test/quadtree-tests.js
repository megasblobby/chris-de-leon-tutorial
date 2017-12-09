"use strict"

import "babel-polyfill";
import Quadtree from "../src/libraries/quadtree";
import {DEFAULT_MAX_OBJECTS_PER_NODE} from "../src/libraries/quadtree";
import {DEFAULT_MAX_LEVELS} from "../src/libraries/quadtree";
import Vector2 from "../src/libraries/vector2";
import Rectangle from "../src/libraries/rectangle";
import BoundingBox from "../src/libraries/bounding-box";
import ObjectsEquality from "../src/libraries/objects-equality";

var assert = require('assert');
let quadtree;
describe('Quadtree', function() {
  // runs once before each test in this block
  before(function() {
  });

  // runs after all tests in this block
  after(function() {
  });

  // runs before each test in this block
  beforeEach(function() {
    quadtree = new Quadtree();
  });

  // runs after each test in this block
  afterEach(function() {
  });
});

describe('default-constructor', function() {
  // runs before each test in this block
  beforeEach(function() {
    quadtree = new Quadtree();
  });

  it('Default constructor should set area equal to a flat rectangle', function() {
      let expectedValue = true;
      assert.equal(expectedValue,
                  ObjectsEquality.areEqual(new Rectangle(), quadtree.area));
    });

    it('Default constructor should set level equal to zero', function() {
      let expectedValue = 0;
      assert.equal(expectedValue, quadtree.level);
    });

    it('Default constructor should set maxObjectsPerNode equal to default value', function() {
      let expectedValue = DEFAULT_MAX_OBJECTS_PER_NODE;
      assert.equal(expectedValue, quadtree.maxObjectsPerNode);
    });

    it('Default constructor should set maxLevels equal to default value', function() {
      let expectedValue = DEFAULT_MAX_LEVELS;
      assert.equal(expectedValue, quadtree.maxLevels);
    });
});

describe('constructor', function() {
    it('Constructor should set area equal to the argument passed', function() {
      let area = new Rectangle(800, 600);
      quadtree = new Quadtree(area);

      let expectedValue = true;
      assert.equal(expectedValue,
                   ObjectsEquality.areEqual(area, quadtree.area));
    });

    it('Constructor should set level equal to the argument passed', function() {
      let level = 5;
      quadtree = new Quadtree(new Rectangle(), level);

      let expectedValue = level;
      assert.equal(expectedValue, quadtree.level);
    });

    it('Constructor should set maxObjectsPerNode equal to the argument passed', function() {
      let level = 1, maxObjectsPerNode = 10;
      quadtree = new Quadtree(new Rectangle(), level, maxObjectsPerNode);

      let expectedValue = maxObjectsPerNode;
      assert.equal(expectedValue, quadtree.maxObjectsPerNode);
    });

    it('Constructor should set maxLevels equal to the argument passed', function() {
      let level = 1, maxObjectsPerNode = 5, maxLevels = 3;
      quadtree = new Quadtree(new Rectangle(), level,
                              maxObjectsPerNode, maxLevels);

      let expectedValue = maxLevels;
      assert.equal(expectedValue, quadtree.maxLevels);
    });
});

/*  describe('insert', function() {
    it('After inserting a new object, if the number of objects is less than maxObjects, the node should not slpit', function() {
      let area = new Rectangle(800, 600);
      quadtree = new Quadtree(area);
      //debugger;
      let gap = new Vector2(10, 10);
      let startingPosition = new Vector2(10, 10), sizes = new Vector2(10, 10);
      let objects = createObjects(1, quadtree.maxObjectsPerNode -1, gap,
                                  startingPosition, sizes);
      objects.forEach(function(object) {quadtree.insert(object)});
      let expectedValue = 0;
      assert.equal(expectedValue, quadtree.nodes.length);
    });

    it('After inserting a new object, if the number of objects is equal to maxObjects, the node should not slpit', function() {
      let area = new Rectangle(800, 600);
      quadtree = new Quadtree(area);
      //debugger;
      let gap = new Vector2(10, 10);
      let startingPosition = new Vector2(10, 10), sizes = new Vector2(10, 10);
      let objects = createObjects(1, quadtree.maxObjectsPerNode, gap,
                                  startingPosition, sizes);
      objects.forEach(function(object) {quadtree.insert(object)});
      let expectedValue = 0;
      assert.equal(expectedValue, quadtree.nodes.length);
    });

  it('After inserting a new object, if the number of objects is greather than maxObjects, the node should slpit', function() {
    let area = new Rectangle(800, 600);
    quadtree = new Quadtree(area);
    //debugger;
    let gap = new Vector2(10, 10);
    let startingPosition = new Vector2(10, 10), sizes = new Vector2(10, 10);
    let objects = createObjects(1, quadtree.maxObjectsPerNode + 1, gap,
                                startingPosition, sizes);
    objects.forEach(function(object) {quadtree.insert(object)});
    let expectedValue = 4;
    assert.equal(expectedValue, quadtree.nodes.length);
  });

  it('After inserting a new object, if the number of objects is greather than maxObjects, the node should slpit', function() {
    let area = new Rectangle(120, 100);
    quadtree = new Quadtree(area);
    //debugger;
    let gap = new Vector2(20, 10);
    let startingPosition = new Vector2(10, 10), sizes = new Vector2(10, 10);
    let objects = createObjects(1, quadtree.maxObjectsPerNode + 1, gap,
                                startingPosition, sizes);
    objects.forEach(function(object) {quadtree.insert(object)});
    let expectedValue = 4;
    assert.equal(expectedValue, quadtree.nodes.length);
  });
});*/

function insertObjectsInQuadTree(rows, columns) {
  let area = new Rectangle(120, 100);
  let gap = new Vector2(20, 10);
  let startingPosition = new Vector2(10, 10), sizes = new Vector2(10, 10);
  let objects = createObjects(rows, columns, gap, startingPosition, sizes);
  objects.forEach(function(object) {quadtree.insert(object)});

  return quadtree;
}

function createObjects(rows, columns, gap, startingPosition, sizes) {
  let objects = new Array();
  let currentPosition = startingPosition.clone();
  for (let row = 0; row < rows; row++) {
    for (let column = 0; column < columns; column++) {
      let x = currentPosition.x + (column * gap.x);
      let y = currentPosition.y + (row * gap.y);
      currentPosition.add(sizes);
    
      let position = new Vector2(x, y);
      let object = new BoundingBox(position, sizes);
      object.tagManager.add('name', `${row}_${column}`);

      objects.push(object);
    }
  }
  return objects;
}

describe('retrieve', function() {
  // runs before each test in this block
  beforeEach(function() {
    debugger;
    quadtree = insertObjectsInQuadTree(4, 4);
  });

  it('Retrieve objects the are in the same node', function() {
    let position = new Vector2(25, 10), sizes = new Vector2(10, 10);
    let object = new BoundingBox(position, sizes);
    object.tagManager.add('name', 'object');
    debugger;
    quadtree.insert(object);
    let objects = quadtree.retrieve(overlappingObject);
    let expectedValue = true;
    assert.equal(expectedValue, quadtree.nodes.length);
  });

  /*it('Retrieve edge case: objects overlap 4 nodes', function() {
    let position = new Vector2(55, 45), sizes = new Vector2(10, 10);
    let overlappingObject = new BoundingBox(position, sizes);
    overlappingObject.tagManager.add('name', 'overlappingObject');
    //debugger;
    quadtree.insert(overlappingObject);
    let objects = quadtree.retrieve(overlappingObject);
    let expectedValue = true;
    assert.equal(expectedValue, quadtree.nodes.length);
  });*/
});

function getNames(objects) {
  let names = new Map();
  objects.forEach(function(object) {
    names.set(object.tagManager.valueOf('name'), object);
  });

  return names;
}
