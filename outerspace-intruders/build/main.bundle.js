/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = function () {
  function Vector2() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector2);

    this.x = x;
    this.y = y;
  }

  _createClass(Vector2, [{
    key: "clone",
    value: function clone() {
      return new Vector2(this.x, this.y);
    }
  }, {
    key: "negate",
    value: function negate() {
      this.x *= -1;
      this.y *= -1;
    }
  }, {
    key: "lengthSquared",
    value: function lengthSquared() {
      return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
  }, {
    key: "length",
    value: function length() {
      return Math.sqrt(this.lengthSquared());
    }
  }, {
    key: "normalize",
    value: function normalize() {
      var length = this.length();
      this.x /= length, this.y /= length;
    }
  }, {
    key: "normalized",
    value: function normalized() {
      var length = this.length();
      return new Vector2(this.x / length, this.y / length);
    }
  }, {
    key: "add",
    value: function add(vector2) {
      return new Vector2(this.x + vector2.x, this.y + vector2.y);
    }
  }, {
    key: "subtract",
    value: function subtract(vector2) {
      return new Vector2(this.x - vector2.x, this.y - vector2.y);
    }
  }, {
    key: "increment",
    value: function increment(vector2) {
      this.x += vector2.x;
      this.y += vector2.y;
    }
  }, {
    key: "decrement",
    value: function decrement(vector2) {
      this.x -= vector2.x;
      this.y -= vector2.y;
    }
  }, {
    key: "scale",
    value: function scale(scalar) {
      this.x *= scalar;
      this.y *= scalar;
    }
  }, {
    key: "scaled",
    value: function scaled(scalar) {
      return new Vector2(this.x * scalar, this.y * scalar);
    }
  }, {
    key: "dot",
    value: function dot(vector2) {
      return this.x * vector2.x + this.y + vector2.y;
    }
  }, {
    key: "toString",
    value: function toString() {
      console.log("[x: " + this.x + ", y: " + this.y + "]");
      console.log("length: " + this.length());
    }
  }], [{
    key: "distance",
    value: function distance(vectorA, vectorB) {
      return vectorA.subtract(vectorB).length();
    }
  }]);

  return Vector2;
}();

exports.default = Vector2;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.engine = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assetManager = __webpack_require__(7);

var _assetManager2 = _interopRequireDefault(_assetManager);

var _inputManager = __webpack_require__(10);

var _inputManager2 = _interopRequireDefault(_inputManager);

var _entitiesManager = __webpack_require__(11);

var _entitiesManager2 = _interopRequireDefault(_entitiesManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MILLISECONDS_TO_SECONDS = 1 / 1000;
var DEFAULT_CANVAS_WIDTH = 800;
var DEFAULT_CANVAS_HEIGHT = 600;

function log(target, name, descriptor) {
  console.log("target: " + target + ", name: " + name + ", descriptor " + descriptor);
  var original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log("Arguments: " + args);
      try {
        var result = original.apply(this, args);
        console.log("Result: " + result);
        return result;
      } catch (e) {
        console.log("Error: " + e);
        throw e;
      }
    };
  }
  return descriptor;
}

var Engine = function () {
  function Engine() {
    var width = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_CANVAS_WIDTH;
    var height = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : DEFAULT_CANVAS_HEIGHT;

    _classCallCheck(this, Engine);

    this._width = width;
    this._height = height;

    this._time = new Date().getTime();
    this._oldTime = this._time;
    this._deltaTime = 0;

    this._canvas = null;
    this._canvasContext = null;

    this._inputManager = null;

    this._assetManager = new _assetManager2.default();
    this._assetManager.observable.register("all-assets-loaded", this);

    this._entitiesManager = new _entitiesManager2.default();
  }

  _createClass(Engine, [{
    key: "_initCanvas",
    value: function _initCanvas(width, height) {
      var canvas = document.createElement("canvas");
      canvas.width = this._validateSize(width, "width", DEFAULT_CANVAS_WIDTH);
      canvas.height = this._validateSize(height, "height", DEFAULT_CANVAS_HEIGHT);
      canvas.id = "gameCanvas";
      document.body.appendChild(canvas);

      this._canvas = canvas;
      this._canvasContext = this.canvas.getContext("2d");
    }
  }, {
    key: "preload",
    value: function preload() {}
  }, {
    key: "_loadAssets",
    value: function _loadAssets() {
      var _this = this;

      this._assetManager.loadAssets().then(function (value) {
        console.log(_this._assetManager.assets);
        _this._startGame();
      });
    }
  }, {
    key: "_startGame",
    value: function _startGame() {
      this._initCanvas(this._width, this._height);
      this._inputManager = new _inputManager2.default(this._canvas);

      this.init();
      this._loop();
    }
  }, {
    key: "init",
    value: function init() {}
  }, {
    key: "update",
    value: function update(deltaTime) {}
  }, {
    key: "render",
    value: function render(deltaTime) {}
  }, {
    key: "_computeDeltaTime",
    value: function _computeDeltaTime() {
      this.time = new Date().getTime();
      this.deltaTime = (this.time - this.oldTime) * MILLISECONDS_TO_SECONDS;
      this.oldTime = this.time;
    }
  }, {
    key: "_loop",
    value: function _loop() {
      this._computeDeltaTime();

      this.update(this.deltaTime);
      this.render(this.deltaTime);

      requestAnimationFrame(this._loop.bind(this));
    }
  }, {
    key: "onNotify",
    value: function onNotify(subject, object) {
      if (subject === "all-assets-loaded") {
        console.log(this._assetManager.assets);
        this._startGame();
      }
    }
  }, {
    key: "_validateSize",
    value: function _validateSize(size, name, defaultValue) {
      if (typeof size !== "number") {
        console.log("canvas " + name + " must be a number, assigning default value: " + defaultValue);
        size = defaultValue;
      } else if (size <= 0) {
        console.log("canvas " + name + " must be greater than zero, assigning default value: " + defaultValue);
        size = defaultValue;
      }

      return size;
    }

    // GETTERS SETTERS

  }, {
    key: "canvasWidth",
    set: function set(width) {
      this._canvas.width = this._validateSize(width, "width", DEFAULT_CANVAS_WIDTH);
    },
    get: function get() {
      return this._canvas.width;
    }
  }, {
    key: "canvasHeight",
    set: function set(height) {
      this._canvas.heigth = this._validateSize(height, "height", DEFAULT_CANVAS_HEIGHT);
    },
    get: function get() {
      return this._canvas.height;
    }
  }, {
    key: "canvas",
    get: function get() {
      return this._canvas;
    }
  }, {
    key: "canvasContext",
    get: function get() {
      return this._canvasContext;
    }
  }, {
    key: "inputManager",
    get: function get() {
      return this._inputManager;
    }
  }, {
    key: "assetManager",
    get: function get() {
      return this._assetManager;
    }
  }, {
    key: "entitiesManager",
    get: function get() {
      return this._entitiesManager;
    }
  }]);

  return Engine;
}();

var engine = exports.engine = new Engine();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function register(subject, observer) {
  this._validate(subject, "subject");
  this._validate(observer, "observer");

  if (this.subjects.has(subject) === false) {
    this.subjects.set(subject, new Array());
  }
  this.subjects.get(subject).push(observer);
}

function notify(subject) {
  var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  this._validate(subject, "subject");

  if (this._subjects.has(subject)) {
    var observers = this.subjects.get(subject);
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = observers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var observer = _step.value;

        observer.onNotify(subject, object);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  } else {
    console.warn("Subject " + subject + " is not a registered subject!");
  }
}

/*function validate(target, key, descriptor) {
  let _arguments = [...descriptor.value];
  for (let arguments of _arguments) {
    if (target === null || typeof target === "undefined") {
      let errorMessage = `${name} can not be ${target}!`;
      throw errorMessage;
    }
  }
}*/

var Observable = function () {
  function Observable() {
    _classCallCheck(this, Observable);

    this._subjects = new Map();

    this.register = register.bind(this);
    this.notify = notify.bind(this);
  }

  _createClass(Observable, [{
    key: "_validate",
    value: function _validate(target, name) {
      if (target === null || typeof target === "undefined") {
        var errorMessage = name + " can not be " + target + "!";
        throw errorMessage;
      }

      return target;
    }
  }, {
    key: "subjects",
    set: function set(subjects) {
      this._subjects = this._validate(subjects, "subjects");
    },
    get: function get() {
      return this._subjects;
    }
  }]);

  return Observable;
}();

exports.default = Observable;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function validateNullUndifined(target, name, descriptor) {
  var original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      for (var index = 0; index < args.length; index++) {
        if (args[index] === null || typeof args[index] === 'undefined') {
          var error = new TypeError('Argument #' + (index + 1) + ' of function ' + name + ' is: ' + args[index]);

          console.error(name + ': ' + args);
          console.error(error);

          throw error;
        }
      }
      var result = original.apply(this, args);
      return result;
    };
  }
  return descriptor;
}

function validateEmptyString(target, name, descriptor) {
  var original = descriptor.value;
  if (typeof original === 'function') {
    descriptor.value = function () {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      for (var index = 0; index < args.length; index++) {
        if (args[index] === '') {
          var error = new TypeError('Argument #' + (index + 1) + ' of function ' + name + ' is an empty string');

          console.error(name + ': ' + args);
          console.error(error);

          throw error;
        }
      }
      var result = original.apply(this, args);
      return result;
    };
  }
  return descriptor;
}

exports.validateNullUndifined = validateNullUndifined;
exports.validateEmptyString = validateEmptyString;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observable = __webpack_require__(2);

var _observable2 = _interopRequireDefault(_observable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ID = 0;

var Entity = function () {
  function Entity() {
    var components = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Map();
    var renderer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "entity";

    _classCallCheck(this, Entity);

    this._ID = Entity.obtainID();
    this._name = this.constructor.name + "_" + this._ID;

    this.components = components;
    //  this.renderer = renderer;
    this.observable = new _observable2.default();
  }

  _createClass(Entity, [{
    key: "update",
    value: function update(deltaTime) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.components[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _ref = _step.value;

          var _ref2 = _slicedToArray(_ref, 2);

          var key = _ref2[0];
          var value = _ref2[1];

          value.update(deltaTime);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "render",
    value: function render(deltaTime) {
      /*if (this.renderer !== null) {
        this.renderer.render(deltaTime);
      }*/
    }
  }, {
    key: "addComponent",
    value: function addComponent(name, component) {
      this.components.set(name, component);
    }
  }, {
    key: "getComponent",
    value: function getComponent(name) {
      return this.components.get(name);
    }
  }, {
    key: "ID",
    get: function get() {
      return this._ID;
    }
  }, {
    key: "name",
    get: function get() {
      return this._name;
    }
  }], [{
    key: "obtainID",
    value: function obtainID() {
      return ID++;
    }
  }]);

  return Entity;
}();

exports.default = Entity;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _engine = __webpack_require__(1);

var _vector = __webpack_require__(0);

var _vector2 = _interopRequireDefault(_vector);

var _player = __webpack_require__(12);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var player = void 0;

window.onload = function () {
  _engine.engine.preload = preload.bind(_engine.engine);
  _engine.engine.init = init.bind(_engine.engine);
  _engine.engine.update = update.bind(_engine.engine);
  _engine.engine.render = render.bind(_engine.engine);
  _engine.engine.preload();
};

function preload() {
  this.assetManager.addImage("player", "./media/player.png");
  this.assetManager.addImage("player_projectile", "./media/player-projectile.png");

  this._loadAssets();
}

function init() {
  player = new _player2.default();
  player.position = new _vector2.default(100, 100);
  player.speed = new _vector2.default(100, 0);
  player.canvasContext = this._canvasContext;
  player.sprite = this.assetManager.assets.get("player");

  this._entitiesManager.add(player);
}

function update(deltaTime) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = this._entitiesManager.entities.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var entity = _step.value;

      entity.update(deltaTime);
    }
    //player.update(deltaTime);
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
}

function render(deltaTime) {
  this._canvasContext.fillStyle = '#000000';
  this._canvasContext.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = this._entitiesManager.entities.values()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var entity = _step2.value;

      entity.render(deltaTime);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _observable = __webpack_require__(2);

var _observable2 = _interopRequireDefault(_observable);

var _imageLoader = __webpack_require__(8);

var _imageLoader2 = _interopRequireDefault(_imageLoader);

var _jsonLoader = __webpack_require__(9);

var _jsonLoader2 = _interopRequireDefault(_jsonLoader);

var _validator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var IMAGE = "Image";
var JSON = "JSON";

var AssetManager = (_class = function () {
  function AssetManager() {
    _classCallCheck(this, AssetManager);

    this._assetsToLoad = new Map();
    this._assets = new Map();
    this._promises = new Map();
    this._imageLoader = new _imageLoader2.default();
    this._JSONLoader = new _jsonLoader2.default();
    this._observable = new _observable2.default();
  }

  _createClass(AssetManager, [{
    key: "addImage",
    value: function addImage(id, path) {
      this._addAsset(id, path, IMAGE);
    }
  }, {
    key: "addJSON",
    value: function addJSON(id, path) {
      this._addAsset(id, path, JSON);
    }
  }, {
    key: "_addAsset",
    value: function _addAsset(id, path, type) {
      this._assetsToLoad.set(id, { "path": path, "type": type });
    }
  }, {
    key: "loadAssets",
    value: function loadAssets() {
      var _this = this;

      this._assetsToLoad.forEach(this._loadAsset, this);

      return Promise.all(this._promises.values()).then(function (values) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var asset = _step.value;

            _this._assets.set(asset.key, asset.value);
          }
          //console.log(this._assets);
          //this._observable.notify("all-assets-loaded");
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
    }
  }, {
    key: "_loadAsset",
    value: function _loadAsset(value, key, map) {
      var asset = { key: key, "path": value.path, "type": value.type };

      switch (asset.type) {
        case IMAGE:
          {
            this._promises.set(asset.key, this._imageLoader.load(asset.key, asset.path));
            break;
          }
        case JSON:
          {
            this._promises.set(asset.key, this._JSONLoader.load(asset.key, asset.path));
            break;
          }
        default:
          {
            console.error("Type " + asset.type + " is not recognized");
            return null;
          }
      }
    }
  }, {
    key: "observable",
    get: function get() {
      return this._observable;
    }
  }, {
    key: "assets",
    get: function get() {
      return this._assets;
    }
  }]);

  return AssetManager;
}(), (_applyDecoratedDescriptor(_class.prototype, "_addAsset", [_validator.validateNullUndifined, _validator.validateEmptyString], Object.getOwnPropertyDescriptor(_class.prototype, "_addAsset"), _class.prototype)), _class);
exports.default = AssetManager;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _validator = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var REQUEST_DONE = 4;
var RESPONSE_READY = 200;

var ImageLoader = (_class = function () {
  function ImageLoader() {
    _classCallCheck(this, ImageLoader);
  }

  _createClass(ImageLoader, [{
    key: "load",
    value: function load(key, filePath) {
      return new Promise(function (resolve, reject) {
        var image = document.createElement("img");
        image.src = filePath;
        image.onloadstart = function () {};
        image.onload = function () {
          resolve({ key: key, "value": image });
        };
        image.onerror = function () {
          reject(filePath);
        };
      });
    }
  }]);

  return ImageLoader;
}(), (_applyDecoratedDescriptor(_class.prototype, "load", [_validator.validateNullUndifined, _validator.validateEmptyString], Object.getOwnPropertyDescriptor(_class.prototype, "load"), _class.prototype)), _class);
exports.default = ImageLoader;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class;

var _validator = __webpack_require__(3);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

var REQUEST_DONE = 4;
var RESPONSE_READY = 200;
var REQUEST_METHOD = "GET";
var IS_ASYNCRONOUS_REQUEST = true;

var JSONLoader = (_class = function () {
  function JSONLoader() {
    _classCallCheck(this, JSONLoader);
  }

  _createClass(JSONLoader, [{
    key: "load",
    value: function load(key, filePath) {
      return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open(REQUEST_METHOD, filePath, IS_ASYNCRONOUS_REQUEST);
        request.onload = function () {
          if (request.readyState === REQUEST_DONE && request.status === RESPONSE_READY) {
            resolve({ key: key, "value": request.response });
          } else {
            reject(request.statusText);
          }
        };
        request.onerror = function () {
          return reject(request.statusText);
        };
        request.send();
      });
    }
  }]);

  return JSONLoader;
}(), (_applyDecoratedDescriptor(_class.prototype, "load", [_validator.validateNullUndifined, _validator.validateEmptyString], Object.getOwnPropertyDescriptor(_class.prototype, "load"), _class.prototype)), _class);
exports.default = JSONLoader;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _observable = __webpack_require__(2);

var _observable2 = _interopRequireDefault(_observable);

var _vector = __webpack_require__(0);

var _vector2 = _interopRequireDefault(_vector);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*function getMousePosition(evt) {
	let rect = this._canvas.getBoundingClientRect();
	let root = document.documentElement;

	let x = evt.clientX - rect.left - root.scrollLeft;
	let y = evt.clientY - rect.top - root.scrollTop;
	this.mouse.position = new Vector2(x, y);
}

function onMouseDown(evt) {
	if(evt.button == this.mouse.LEFT_BUTTON) {
		console.log("mouse down");
		this.mouse.leftButton = true;
		this.observable.notify("mouse-left-down", this.mouse)
	}
}

function onMouseUp(evt) {
		if(evt.button == this.mouse.LEFT_BUTTON) {
			console.log("mouse up");
			this.mouse.leftButton = false;
		}
}*/

function keyPressed(evt) {
	console.log("key pressed \"" + evt.key + "\"");
	this._keyBoard.set(evt.key, true);
}

function keyReleased(evt) {
	console.log("key released \"" + evt.key + "\"");
	this._keyBoard.set(evt.key, false);
}

var InputManager = function () {
	function InputManager(canvas) {
		_classCallCheck(this, InputManager);

		this._canvas = canvas;
		/*this.mouse = new Mouse();*/
		this._keyBoard = null;
		this.observable = new _observable2.default();

		//this.getMousePosition = getMousePosition.bind(this);
		//this.onMouseDown = onMouseDown.bind(this);
		//this.onMouseUp = onMouseUp.bind(this);
		this.keyPressed = keyPressed.bind(this);
		this.keyReleased = keyReleased.bind(this);

		this._setCallbacks();
		this._initKeyboard();
	}

	_createClass(InputManager, [{
		key: "_setCallbacks",
		value: function _setCallbacks() {
			this._canvas.addEventListener("mousemove", this.getMousePosition);

			document.addEventListener("keydown", this.keyPressed);
			document.addEventListener("keyup", this.keyReleased);
		}
	}, {
		key: "_initKeyboard",
		value: function _initKeyboard() {
			this._keyBoard = new Map();
			this._keyBoard.set("a", false);
			this._keyBoard.set("w", false);
			this._keyBoard.set("s", false);
			this._keyBoard.set("d", false);
			this._keyBoard.set("z", false);
			this._keyBoard.set("ArrowLeft", false);
			this._keyBoard.set("ArrowRight", false);
		}
	}, {
		key: "KeyBoard",
		get: function get() {
			return this._keyBoard;
		}
	}]);

	return InputManager;
}();

exports.default = InputManager;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EntitesManager = function () {
  function EntitesManager() {
    _classCallCheck(this, EntitesManager);

    this._entities = new Map();
    this._groups = new Map();
  }

  _createClass(EntitesManager, [{
    key: "add",
    value: function add(entity) {
      this._entities.set(entity.name, entity);
      console.log("Add \"" + entity.name + "\" to entities");
    }
  }, {
    key: "remove",
    value: function remove(entityName) {
      if (this._entities.has(entityName)) {
        this._entities.delete(entityName);
      } else {
        console.warn("\"" + entityName + "\" doesn't exists in entities");
      }
    }
  }, {
    key: "addAtGroup",
    value: function addAtGroup(entity, groupName) {
      if (this._groups.has(groupName) == false) {
        this._groups.set(groupName, new Map());
        console.warn("Creating group: \"" + groupName + "\".");
      }
      this._groups.get(groupName).set(entity.name, entity);
      this.add(entity);
    }
  }, {
    key: "removeFromGroup",
    value: function removeFromGroup(entity, groupName) {
      if (this._groups.has(groupName)) {
        this.remove(entity);
        this._groups.delete(entity.name);
      } else {
        console.warn("Creating group: \"" + groupName + "\".");
      }
    }
  }, {
    key: "removeGroup",
    value: function removeGroup(entity, groupName) {
      if (this._groups.has(groupName)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this._groups.keys()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var key = _step.value;

            this.remove(entity);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this._groups.delete(groupName);
      } else {
        console.warn("\"" + groupName + "\" doesn't exists.");
      }
    }
  }, {
    key: "entities",
    get: function get() {
      return this._entities;
    }
  }]);

  return EntitesManager;
}();

exports.default = EntitesManager;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(4);

var _entity2 = _interopRequireDefault(_entity);

var _projectile = __webpack_require__(13);

var _projectile2 = _interopRequireDefault(_projectile);

var _vector = __webpack_require__(0);

var _vector2 = _interopRequireDefault(_vector);

var _engine = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOVE_LEFT = "ArrowLeft";
var MOVE_RIGHT = "ArrowRight";
var SHOOT = "z";
var UP = new _vector2.default(0, -1);

var Player = function (_Entity) {
  _inherits(Player, _Entity);

  function Player() {
    _classCallCheck(this, Player);

    var _this = _possibleConstructorReturn(this, (Player.__proto__ || Object.getPrototypeOf(Player)).call(this));

    _this._position = new _vector2.default();
    _this._velocity = new _vector2.default();
    _this._speed = new _vector2.default();
    _this._canvasContext = null;
    _this._sprite = null;
    _this._fireRatio = 0.5;
    _this._elpasedTimeFromLastShoot = _this._fireRatio;
    return _this;
  }

  _createClass(Player, [{
    key: "update",
    value: function update(deltaTime) {
      this._velocity = new _vector2.default();

      if (_engine.engine.inputManager.KeyBoard.get(MOVE_LEFT)) {
        this._velocity.x = -this._speed.x * deltaTime;
      } else if (_engine.engine.inputManager.KeyBoard.get(MOVE_RIGHT)) {
        this._velocity.x = this._speed.x * deltaTime;
      }
      if (_engine.engine.inputManager.KeyBoard.get(SHOOT)) {
        this._shoot(deltaTime);
      }

      this._position.increment(this._velocity);
    }
  }, {
    key: "render",
    value: function render(deltaTime) {
      this.canvasContext.drawImage(this._sprite, this._position.x, this._position.y);
    }
  }, {
    key: "_shoot",
    value: function _shoot(deltaTime) {
      if (this._elpasedTimeFromLastShoot > this._fireRatio) {
        this._elpasedTimeFromLastShoot = 0;

        var projectile = this._createProjectile();
        _engine.engine.entitiesManager.addAtGroup(projectile, "player_projectiles");
      } else {
        this._elpasedTimeFromLastShoot += deltaTime;
      }
    }
  }, {
    key: "_createProjectile",
    value: function _createProjectile() {
      var projectile = new _projectile2.default();
      projectile.position = this._position.clone();
      projectile.speed = new _vector2.default(200, 0);
      projectile.velocity = UP.clone();
      projectile.canvasContext = this._canvasContext;
      projectile.sprite = _engine.engine.assetManager.assets.get("player_projectile");

      return projectile;
    }
  }, {
    key: "position",
    set: function set(newPosition) {
      this._position = newPosition;
    },
    get: function get() {
      return this._position;
    }
  }, {
    key: "velocity",
    set: function set(newVelocity) {
      this._velocity = newVelocity;
    },
    get: function get() {
      return this._velocity;
    }
  }, {
    key: "speed",
    set: function set(newSpeed) {
      this._speed = newSpeed;
    },
    get: function get() {
      return this._speed;
    }
  }, {
    key: "canvasContext",
    set: function set(newCanvasContext) {
      this._canvasContext = newCanvasContext;
    },
    get: function get() {
      return this._canvasContext;
    }
  }, {
    key: "sprite",
    set: function set(newSprite) {
      this._sprite = newSprite;
    },
    get: function get() {
      return this._sprite;
    }

    /*onNotify (subject, object) {
      if (subject === "key-pressed") {
        if (object === LEFT) {
          this.velocity.x = -1;
        }
      }
      else if (subject === "key-released") {
        if (object === LEFT) {
          this.velocity.x = 0;
        }
      }
      if (subject === "key-pressed") {
        if (object === RIGHT) {
          this.velocity.x = 1;
        }
      }
      else if (subject === "key-released") {
        if (object === RIGHT) {
          this.velocity.x = 0;
        }
      }
      if (subject === "key-pressed") {
        if (object === FIRE) {
          console.log("SHOOT");
          let position = new Vector2(this.position.x,
                                     this.position.y + 20);
          let velocity = new Vector2(0, -1);
          let speed = 4;
          let movementManager = new StraightMovement(position, velocity, speed);
          let sizes = new Vector2(5, 10);
          let color = "yellow"
          let renderer = new BoxRenderer(this.renderer.canvasContext, position, sizes, color);
          let components = new Map();
          components.set("movement-manager", movementManager);
            let bullet = new Bullet(components, renderer);
          /*bullet.position = new Vector2(this.position.x,
                                                       this.position.y + 20);
          bullet.movementManager.velocity = new Vector2(0, 1);
          bullet.movementManager.speed = 4;*/
    //this.observable.notify("spawn-entity", bullet);
    //}
    //}
    //}

  }]);

  return Player;
}(_entity2.default);

exports.default = Player;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _entity = __webpack_require__(4);

var _entity2 = _interopRequireDefault(_entity);

var _vector = __webpack_require__(0);

var _vector2 = _interopRequireDefault(_vector);

var _engine = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Projectile = function (_Entity) {
  _inherits(Projectile, _Entity);

  function Projectile() {
    _classCallCheck(this, Projectile);

    var _this = _possibleConstructorReturn(this, (Projectile.__proto__ || Object.getPrototypeOf(Projectile)).call(this));

    _this._position = new _vector2.default();
    _this._velocity = new _vector2.default();
    _this._speed = new _vector2.default();
    _this._canvasContext = null;
    _this._sprite = null;
    return _this;
  }

  _createClass(Projectile, [{
    key: "update",
    value: function update(deltaTime) {
      this._position.increment(this._velocity);
    }
  }, {
    key: "render",
    value: function render(deltaTime) {
      this.canvasContext.drawImage(this._sprite, this._position.x, this._position.y);
    }
  }, {
    key: "position",
    set: function set(newPosition) {
      this._position = newPosition;
    },
    get: function get() {
      return this._position;
    }
  }, {
    key: "velocity",
    set: function set(newVelocity) {
      this._velocity = newVelocity;
    },
    get: function get() {
      return this._velocity;
    }
  }, {
    key: "speed",
    set: function set(newSpeed) {
      this._speed = newSpeed;
    },
    get: function get() {
      return this._speed;
    }
  }, {
    key: "canvasContext",
    set: function set(newCanvasContext) {
      this._canvasContext = newCanvasContext;
    },
    get: function get() {
      return this._canvasContext;
    }
  }, {
    key: "sprite",
    set: function set(newSprite) {
      this._sprite = newSprite;
    },
    get: function get() {
      return this._sprite;
    }
  }]);

  return Projectile;
}(_entity2.default);

exports.default = Projectile;

/***/ })
/******/ ]);