"use strict"

import "babel-polyfill";
import Quadtree from "../src/libraries/quadtree";
import {DEFAULT_MAX_OBJECTS_PER_NODE} from "../src/libraries/quadtree";
import {DEFAULT_MAX_LEVELS} from "../src/libraries/quadtree";
import {DEFAULT_NAME} from "../src/libraries/quadtree";
import Vector2 from "../src/libraries/vector2";
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
                  ObjectsEquality.areEqual(new BoundingBox(), quadtree.area));
    });

    it('Default constructor should set level equal to zero', function() {
      let expectedValue = 0;
      assert.equal(expectedValue, quadtree.level);
    });

    it('Default constructor should set area name equal to default name', function() {
      let expectedValue = DEFAULT_NAME;
      assert.equal(expectedValue, quadtree.name);
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
      let area = new BoundingBox(800, 600);
      quadtree = new Quadtree(area);

      let expectedValue = true;
      assert.equal(expectedValue,
                   ObjectsEquality.areEqual(area, quadtree.area));
    });

    it('Constructor should set level equal to the argument passed', function() {
      let level = 5;
      quadtree = new Quadtree(new BoundingBox(), level);

      let expectedValue = level;
      assert.equal(expectedValue, quadtree.level);
    });

    it('Constructor should set maxObjectsPerNode equal to the argument passed', function() {
      let level = 1, maxObjectsPerNode = 10;
      quadtree = new Quadtree(new BoundingBox(), level, DEFAULT_NAME,
                              maxObjectsPerNode);

      let expectedValue = maxObjectsPerNode;
      assert.equal(expectedValue, quadtree.maxObjectsPerNode);
    });

    it('Constructor should set maxLevels equal to the argument passed', function() {
      let level = 1, maxObjectsPerNode = 5, maxLevels = 3;
      quadtree = new Quadtree(new BoundingBox(), level, DEFAULT_NAME,
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

function insertObjectsInQuadTree(settings) {
  let quadtree = new Quadtree(settings.area);
  let objects = new Array();
  //let currentPosition = settings.startingPosition.clone();
  for (let row = 0; row < settings.rows; row++) {
    for (let column = 0; column < settings.columns; column++) {
      let x = settings.startingPosition.x + column * (settings.gap.x + settings.sizes.x);
      let y = settings.startingPosition.y  + row * (settings.gap.y + settings.sizes.y);
      //currentPosition.add(settings.sizes);

      let position = new Vector2(x, y);
      let object = new BoundingBox(position, settings.sizes);
      object.tagManager.add('name', `${row}_${column}`);

      objects.push(object);
      quadtree.insert(object);
    }
  }
  let result = {objects, quadtree}
  return result;
}

function getMap(objects) {
  let names = new Map();
  objects.forEach(function(object) {
    names.set(object.tagManager.valueOf('name'), object);
  });

  return names;
}

function checkNearObjects(targetObjectsNames, nearObjects) {
  let nearObjectsMap = getMap(nearObjects);
  for (let targetName of targetObjectsNames) {
    let expectedValue = targetObjectsNames.length;
    assert.equal(expectedValue, Array.from(nearObjects.values()).length);
    expectedValue = true;
    assert.equal(expectedValue, nearObjectsMap.has(targetName));
    assert.equal(expectedValue, ObjectsEquality.areEqual(
            nearObjectsMap.get(targetName), nearObjectsMap.get(targetName)));
  }
}

describe('retrieve objects with target in the middle of a node', function() {
  let objects = Array();
  let objectsMap = new Map();
  // runs once before each test in this block
  before(function() {
    let settings =
      {'area': new BoundingBox(new Vector2(0, 0), new Vector2(800, 600)),
       'gap' : new Vector2(10, 10), 'startingPosition' : new Vector2(200, 20),
       'sizes' : new Vector2(20, 20), 'rows' : 8, 'columns' : 15 };
    let result = insertObjectsInQuadTree(settings);
    objects = result.objects, quadtree = result.quadtree;
    objectsMap = getMap(objects);
  });

  it('case 1', function() {
    debugger;
    let nearObjects = quadtree.retrieve(objectsMap.get('0_1'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_0', '0_1', '0_2', '0_3',
                              '1_0', '1_1', '1_2', '1_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 2', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('0_5'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_3', '0_4', '0_5', '0_6',
                              '1_3', '1_4', '1_5', '1_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 3', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('0_8'));
    let targetObjectsNames = ['0_7', '0_8', '0_9',
                              '1_7', '1_8', '1_9'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 4', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('0_11'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_10', '0_11', '0_12', '0_13',
                              '1_10', '1_11', '1_12', '1_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 5', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('2_14'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_13', '0_14', '1_13', '0_14', '2_13',
                              '2_14', '3_13', '3_14', '4_13', '4_14'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 6', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_1'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_0', '2_1', '2_2', '2_3',
                              '3_0', '3_1', '3_2', '3_3',
                              '4_0', '4_1', '4_2', '4_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 7', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_5'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_3', '2_4', '2_5', '2_6',
                              '3_3', '3_4', '3_5', '3_6',
                              '4_3', '4_4', '4_5', '4_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 8', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_8'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_7', '2_8', '2_9',
                              '3_7', '3_8', '3_9',
                              '4_7', '4_8', '4_9'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 9', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_11'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_10', '2_11', '2_12', '2_13',
                              '3_10', '3_11', '3_12', '3_13',
                              '4_10', '4_11', '4_12', '4_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 10', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_1'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_0', '4_1', '4_2', '4_3',
                              '5_0', '5_1', '5_2', '5_3',
                              '6_0', '6_1', '6_2', '6_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 11', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_5'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_3', '4_4', '4_5', '4_6',
                              '5_3', '5_4', '5_5', '5_6',
                              '6_3', '6_4', '6_5', '6_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 12', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_8'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_7', '4_8', '4_9',
                              '5_7', '5_8', '5_9',
                              '6_7', '6_8', '6_9'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 13', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_11'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_10', '4_11', '4_12', '4_13',
                              '5_10', '5_11', '5_12', '5_13',
                              '6_10', '6_11', '6_12', '6_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 14', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('6_14'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_13', '4_14', '5_13', '5_14',
                              '6_13', '6_14', '7_13', '7_14'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 15', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_1'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['7_0', '7_1', '7_2', '7_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 16', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_5'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['7_3', '7_4', '7_5', '7_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 17', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_8'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['7_7', '7_8', '7_9'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 18', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_11'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['7_10', '7_11', '7_12', '7_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });
});

describe('retrieve objects with target on an node\'s edge', function() {
  let objects = Array();
  let objectsMap = new Map();
  // runs once before each test in this block
  before(function() {
    let settings =
      {'area': new BoundingBox(new Vector2(0, 0), new Vector2(800, 600)),
       'gap' : new Vector2(10, 10), 'startingPosition' : new Vector2(200, 20),
       'sizes' : new Vector2(20, 20), 'rows' : 8, 'columns' : 15 };
    let result = insertObjectsInQuadTree(settings);
    objects = result.objects, quadtree = result.quadtree;
    objectsMap = getMap(objects);
  });

  it('case 1', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('0_0'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_0', '0_1', '0_2', '0_3',
                              '1_0', '1_1', '1_2', '1_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 2', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('0_6'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_3', '0_4', '0_5', '0_6',
                              '1_3', '1_4', '1_5', '1_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 3', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('0_10'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_10', '0_11', '0_12', '0_13',
                              '1_10', '1_11', '1_12', '1_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 4', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_0'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_0', '2_1', '2_2', '2_3',
                              '3_0', '3_1', '3_2', '3_3',
                              '4_0', '4_1', '4_2', '4_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 5', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_6'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_3', '2_4', '2_5', '2_6',
                              '3_3', '3_4', '3_5', '3_6',
                              '4_3', '4_4', '4_5', '4_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 6', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_10'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_10', '2_11', '2_12', '2_13',
                              '3_10', '3_11', '3_12', '3_13',
                              '4_10', '4_11', '4_12', '4_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 7', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_0'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_0', '4_1', '4_2', '4_3',
                              '5_0', '5_1', '5_2', '5_3',
                              '6_0', '6_1', '6_2', '6_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 8', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_6'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_3', '4_4', '4_5', '4_6',
                              '5_3', '5_4', '5_5', '5_6',
                              '6_3', '6_4', '6_5', '6_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 9', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_10'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_10', '4_11', '4_12', '4_13',
                              '5_10', '5_11', '5_12', '5_13',
                              '6_10', '6_11', '6_12', '6_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 10', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_0'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['7_0', '7_1', '7_2', '7_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 11', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_6'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['7_3', '7_4', '7_5', '7_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 12', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_10'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['7_10', '7_11', '7_12', '7_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });
});

describe('retrieve objects with target between two nodes', function() {
  let objects = Array();
  let objectsMap = new Map();
  // runs once before each test in this block
  before(function() {
    let settings =
      {'area': new BoundingBox(new Vector2(0, 0), new Vector2(800, 600)),
       'gap' : new Vector2(10, 10), 'startingPosition' : new Vector2(200, 20),
       'sizes' : new Vector2(20, 20), 'rows' : 8, 'columns' : 15 };
    let result = insertObjectsInQuadTree(settings);
    objects = result.objects, quadtree = result.quadtree;
    objectsMap = getMap(objects);
  });

  it('case 1', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('0_3'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_0', '0_1', '0_2', '0_3', '0_4', '0_5', '0_6',
                              '1_0', '1_1', '1_2', '1_3', '1_4', '1_5', '1_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 2', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('0_13'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_10', '0_11', '0_12', '0_13', '0_14',
                              '1_10', '1_11', '1_12', '1_13', '1_14',
                              '2_13', '2_14', '3_13', '3_13', '4_13', '4_14'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 3', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_3'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_0', '2_1', '2_2', '2_3', '2_4', '2_5', '2_6',
                              '3_0', '3_1', '3_2', '3_3', '3_4', '3_5', '3_6',
                              '4_0', '4_1', '4_2', '4_3', '4_4', '4_5', '4_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 4', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('3_13'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_13', '0_14', '1_13', '1_14', '2_10', '2_11',
                              '2_12', '2_13', '2_14', '3_10', '3_11', '3_12',
                              '3_13', '3_13', '4_10', '4_11', '4_12', '4_13',
                              '4_14'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 5', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('4_14'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['0_13', '0_14', '1_13', '1_14', '2_13', '2_14',
                              '3_13', '3_13', '4_13', '4_14', '5_13', '5_14',
                              '6_13', '6_14', '7_13', '7_14'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 6', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_3'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_0', '4_1', '4_2', '4_3', '4_4', '4_5', '4_6',
                              '5_0', '5_1', '5_2', '5_3', '5_4', '5_5', '5_6',
                              '6_0', '6_1', '6_2', '6_3', '6_4', '6_5', '6_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 7', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('5_13'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_10', '4_11', '4_12', '4_13', '4_14',
                              '5_10', '5_11', '5_12', '5_13', '5_14',
                              '6_10', '6_11', '6_12', '6_13', '6_14',
                              '7_13', '7_14'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 8', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_3'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['7_0', '7_1', '7_2', '7_3', '7_4', '7_5', '7_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 9', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('7_13'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['4_13', '4_14', '5_13', '5_14', '6_13', '6_14',
                              '7_10', '7_11', '7_12', '7_13', '7_14'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });
});

describe('retrieve objects with target on an node\'s edge and in beetween two nodes', function() {
  let objects = Array();
  let objectsMap = new Map();
  // runs once before each test in this block
  before(function() {
    let settings =
      {'area': new BoundingBox(new Vector2(0, 0), new Vector2(800, 600)),
       'gap' : new Vector2(10, 10), 'startingPosition' : new Vector2(200, 20),
       'sizes' : new Vector2(20, 20), 'rows' : 8, 'columns' : 15 };
    let result = insertObjectsInQuadTree(settings);
    objects = result.objects, quadtree = result.quadtree;
    objectsMap = getMap(objects);
  });

  it('case 1', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('4_0'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_0', '2_1', '2_2', '2_3',
                              '3_0', '3_1', '3_2', '3_3',
                              '4_0', '4_1', '4_2', '4_3',
                              '5_0', '5_1', '5_2', '5_3',
                              '6_0', '6_1', '6_2', '6_3'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 2', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('4_6'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames =   ['2_3', '2_4', '2_5', '2_6',
                                '3_3', '3_4', '3_5', '3_6',
                                '4_3', '4_4', '4_5', '4_6',
                                '5_3', '5_4', '5_5', '5_6',
                                '6_3', '6_4', '6_5', '6_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 3', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('4_10'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames =   ['2_10', '2_11', '2_12', '2_13',
                                '3_10', '3_11', '3_12', '3_13',
                                '4_10', '4_11', '4_12', '4_13',
                                '5_10', '5_11', '5_12', '5_13',
                                '6_10', '6_11', '6_12', '6_13'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });
});

describe('retrieve objects with target beetween four nodes', function() {
  let objects = Array();
  let objectsMap = new Map();
  // runs once before each test in this block
  before(function() {
    let settings =
      {'area': new BoundingBox(new Vector2(0, 0), new Vector2(800, 600)),
       'gap' : new Vector2(10, 10), 'startingPosition' : new Vector2(200, 20),
       'sizes' : new Vector2(20, 20), 'rows' : 8, 'columns' : 15 };
    let result = insertObjectsInQuadTree(settings);
    objects = result.objects, quadtree = result.quadtree;
    objectsMap = getMap(objects);
  });

  it('case 1', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('4_3'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames = ['2_0', '2_1', '2_2', '2_3', '2_4', '2_5', '2_6',
                              '3_0', '3_1', '3_2', '3_3', '3_4', '3_5', '3_6',
                              '4_0', '4_1', '4_2', '4_3', '4_4', '4_5', '4_6',
                              '5_0', '5_1', '5_2', '5_3', '5_4', '5_5', '5_6',
                              '6_0', '6_1', '6_2', '6_3', '6_4', '6_5', '6_6'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });

  it('case 2', function() {
    let nearObjects = quadtree.retrieve(objectsMap.get('4_13'));
    let nearObjectsMap = getMap(nearObjects);
    let targetObjectsNames =   ['0_13', '0_14', '1_13', '1_14',
                                '2_10', '2_11', '2_12', '2_13', '2_14',
                                '3_10', '3_11', '3_12', '3_13', '3_14',
                                '4_10', '4_11', '4_12', '4_13', '4_14',
                                '5_10', '5_11', '5_12', '5_13', '5_14',
                                '6_10', '6_11', '6_12', '6_13', '6_14',
                                '7_13', '7_14'];
    checkNearObjects(targetObjectsNames, nearObjects);
  });
});
