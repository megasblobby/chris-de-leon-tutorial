"use strict"

import "babel-polyfill";
import Rectangle from "../src/libraries/rectangle";
import Vector2 from "../src/libraries/vector2";
import ObjectsEquality from "../src/libraries/objects-equality";

var assert = require('assert');

describe('AreEqual', function() {
  // runs once before each test in this block
  before(function() {
  });

  // runs after all tests in this block
  after(function() {
  });

  // runs before each test in this block
  beforeEach(function() {
  });

  // runs after each test in this block
  afterEach(function() {
  });


  describe('objects-of-different-type', function() {
    it('Should return false if objects are of completely different types', function() {
      let objectA = new Vector2();
      let objectB = new Rectangle();

      assert.equal(false, ObjectsEquality.areEqual(objectA, objectB));
    });
  });

  describe('objects-of-same-type', function() {
    it('Should return false if an object member is different', function() {
      let position = new Vector2(10, 10);
      let sizesA = new Vector2(30, 10), sizesB = new Vector2(30, 20);
      let objectA = new Rectangle(position, sizesA);
      let objectB = new Rectangle(position, sizesB);

      assert.equal(false, ObjectsEquality.areEqual(objectA, objectB));
    });

    it('Should return false if a primitive type member is different', function() {
      let objectA = new Vector2(30, 10);
      let objectB = new Vector2(30, 20);

      assert.equal(false, ObjectsEquality.areEqual(objectA, objectB));
    });

    it('Should return true if alle members are equal', function() {
      let position = new Vector2(10, 10);
      let sizes = new Vector2(30, 10);
      let objectA = new Rectangle(position, sizes);
      let objectB = new Rectangle(position, sizes);

      assert.equal(true, ObjectsEquality.areEqual(objectA, objectB));
    });
  });
});
