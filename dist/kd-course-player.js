/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _scormDriver = __webpack_require__(1);

	var _scormDriver2 = _interopRequireDefault(_scormDriver);

	var _sessionDriver = __webpack_require__(4);

	var _sessionDriver2 = _interopRequireDefault(_sessionDriver);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var window = __webpack_require__(3);

	var CoursePlayer = function () {
	  function CoursePlayer() {
	    var debug = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

	    _classCallCheck(this, CoursePlayer);

	    this.debug = debug;
	    var scormDriver = new _scormDriver2.default();
	    this.driver = scormDriver.isConnected ? scormDriver : new _sessionDriver2.default();
	  }

	  /**
	   * Log message in console if debug is enabled
	   *
	   * @param {string} message
	   * @param {*} payload
	   */


	  _createClass(CoursePlayer, [{
	    key: "log",
	    value: function log() {
	      var message = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var payload = arguments[1];

	      if (this.debug) {
	        if (typeof payload !== 'undefined') {
	          console.log("[KD.CoursePlayer] " + message, payload);
	        } else {
	          console.log("[KD.CoursePlayer] " + message);
	        }
	      }
	    }

	    /**
	     * Get the persistence driver
	     *
	     * @returns {*} SCORM 1.2 API or sessionStorage
	     */

	  }, {
	    key: "getDriver",
	    value: function getDriver() {
	      return this.driver.getDriver();
	    }

	    /**
	     * Get state object
	     *
	     * @returns {Object}
	     */

	  }, {
	    key: "getData",
	    value: function getData() {
	      var data = this.driver.getData();
	      this.log('getData', data);
	      return data;
	    }

	    /**
	     * Set state object
	     *
	     * @param {Object} data
	     * @returns {boolean} success
	     */

	  }, {
	    key: "setData",
	    value: function setData(data) {
	      if ((typeof data === "undefined" ? "undefined" : _typeof(data)) !== 'object') {
	        this.log('setData: Invalid data type given. Expected object.', data);
	        return false;
	      }
	      var success = this.driver.setData(data);
	      if (success) {
	        this.log('setData: Success.', data);
	      } else {
	        this.log('setData: Failed.', data);
	      }
	      return success;
	    }

	    /**
	     * Get the learner's current location
	     *
	     * @returns {String}
	     */

	  }, {
	    key: "getLocation",
	    value: function getLocation() {
	      var location = this.driver.getLocation();
	      this.log('getLocation', location);
	      return location;
	    }

	    /**
	     * Set the learner's current location
	     *
	     * @param {string} location
	     * @returns {boolean} success
	     */

	  }, {
	    key: "setLocation",
	    value: function setLocation(location) {
	      if (typeof location !== 'string') {
	        this.log('setLocation: Invalid data type given. Expected string.', location);
	        return false;
	      }
	      var success = this.driver.setLocation(location);
	      if (success) {
	        this.log('setLocation: Success.', location);
	      } else {
	        this.log('setLocation: Failed.', location);
	      }
	      return success;
	    }

	    /**
	     * Get score value
	     *
	     * @returns {number|undefined}
	     */

	  }, {
	    key: "getScore",
	    value: function getScore() {
	      var score = this.driver.getScore();
	      this.log('getScore', score);
	      return score;
	    }

	    /**
	     * Set score value from 0-100
	     *
	     * @param {number} value
	     * @returns {boolean} success
	     */

	  }, {
	    key: "setScore",
	    value: function setScore(value) {
	      var score = parseInt(value);
	      if (score < 0 || score > 100) {
	        this.log('setScore: Given value is out of range. Expected number between 0-100.', value);
	        return false;
	      }
	      var success = this.driver.setScore(score);
	      if (success) {
	        this.log('setScore: Success.', score);
	      } else {
	        this.log('setScore: Failed.', score);
	      }
	      return success;
	    }

	    /**
	     * Get completion status
	     *
	     * @returns {string} completed, incomplete
	     */

	  }, {
	    key: "getCompletionStatus",
	    value: function getCompletionStatus() {
	      var status = this.driver.getCompletionStatus();
	      this.log('getCompletionStatus', status);
	      return status;
	    }

	    /**
	     * Get success status
	     *
	     * @returns {string} passed, failed, unknown
	     */

	  }, {
	    key: "getSuccessStatus",
	    value: function getSuccessStatus() {
	      var status = this.driver.getSuccessStatus();
	      this.log('getSuccessStatus', status);
	      return status;
	    }

	    /**
	     * Set "completed" completion status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: "markCompleted",
	    value: function markCompleted() {
	      if (this.getCompletionStatus() !== 'incomplete' || this.getSuccessStatus() !== 'unknown') {
	        this.log('markCompleted: Already marked completed.');
	        return false;
	      }
	      var success = this.driver.markCompleted();
	      if (success) {
	        this.log('markCompleted: Success.');
	      } else {
	        this.log('markCompleted: Failed.');
	      }
	      return success;
	    }

	    /**
	     * Set "passed" success status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: "markPassed",
	    value: function markPassed() {
	      if (this.getSuccessStatus() !== 'unknown') {
	        this.log("markPassed: Already has success status of " + this.getSuccessStatus() + ". Once set, success status can not be modified.");
	        return false;
	      }
	      var success = this.driver.markPassed();
	      if (success) {
	        this.log('markPassed: Success.');
	      } else {
	        this.log('markPassed: Failed.');
	      }
	      return success;
	    }

	    /**
	     * Set "failed" success status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: "markFailed",
	    value: function markFailed() {
	      if (this.getSuccessStatus() !== 'unknown') {
	        this.log("markPassed: Already has success status of " + this.getSuccessStatus() + ". Once set, success status can not be modified.");
	        return false;
	      }
	      var success = this.driver.markFailed();
	      if (success) {
	        this.log('markFailed: Success.');
	      } else {
	        this.log('markFailed: Failed.');
	      }
	      return success;
	    }
	  }]);

	  return CoursePlayer;
	}();

	window.KD = window.KD || {};
	window.KD.CoursePlayer = new CoursePlayer(window['KD_DEBUG']);

	exports.default = CoursePlayer;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _scormApi = __webpack_require__(2);

	var _scormApi2 = _interopRequireDefault(_scormApi);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScormDriver = function () {
	  function ScormDriver() {
	    _classCallCheck(this, ScormDriver);

	    this.driver = (0, _scormApi2.default)();
	    if (this.driver) {
	      this.isConnected = true;
	      this._bootstrap();
	    }
	  }

	  /**
	   * Get the persistence driver
	   *
	   * @returns {Object} SCORM 1.2 API
	   */


	  _createClass(ScormDriver, [{
	    key: 'getDriver',
	    value: function getDriver() {
	      return this.driver;
	    }

	    /**
	     * Get state object
	     *
	     * @returns {Object}
	     */

	  }, {
	    key: 'getData',
	    value: function getData() {
	      var jsonString = this._getValue('cmi.suspend_data');
	      if (!jsonString) {
	        return {};
	      }
	      return JSON.parse(jsonString);
	    }

	    /**
	     * Set state object
	     *
	     * @param {Object} data
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      var json = JSON.stringify(data);
	      return this._setValue('cmi.suspend_data', json);
	    }

	    /**
	     * Get the learner's current location
	     *
	     * @returns {String}
	     */

	  }, {
	    key: 'getLocation',
	    value: function getLocation() {
	      return this._getValue('cmi.core.lesson_location');
	    }

	    /**
	     * Set the learner's current location
	     *
	     * @param {string} location
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'setLocation',
	    value: function setLocation(location) {
	      return this._setValue('cmi.core.lesson_location', location);
	    }

	    /**
	     * Get score value
	     *
	     * @returns {number|undefined}
	     */

	  }, {
	    key: 'getScore',
	    value: function getScore() {
	      var score = this._getValue('cmi.core.score.raw');
	      return score ? parseInt(score) : undefined;
	    }

	    /**
	     * Set score value from 0-100
	     *
	     * @param {number} value
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'setScore',
	    value: function setScore(value) {
	      this._setValue("cmi.core.score.min", 0);
	      this._setValue("cmi.core.score.max", 100);
	      return this._setValue("cmi.core.score.raw", value);
	    }

	    /**
	     * Get completion status
	     *
	     * @returns {string} completed, incomplete
	     */

	  }, {
	    key: 'getCompletionStatus',
	    value: function getCompletionStatus() {
	      var scormCompletionStatus = this._getValue('cmi.core.lesson_status');
	      if (['passed', 'failed'].indexOf(scormCompletionStatus) !== -1) {
	        scormCompletionStatus = 'completed';
	      }
	      return scormCompletionStatus;
	    }

	    /**
	     * Get success status
	     *
	     * @returns {string} passed, failed, unknown
	     */

	  }, {
	    key: 'getSuccessStatus',
	    value: function getSuccessStatus() {
	      var scormSuccessStatus = this._getValue('cmi.core.lesson_status');
	      if (scormSuccessStatus !== 'passed' && scormSuccessStatus !== 'failed') {
	        scormSuccessStatus = 'unknown';
	      }
	      return scormSuccessStatus;
	    }

	    /**
	     * Set "completed" completion status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'markCompleted',
	    value: function markCompleted() {
	      return this._setValue('cmi.core.lesson_status', 'completed');
	    }

	    /**
	     * Set "passed" success status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'markPassed',
	    value: function markPassed() {
	      return this._setValue('cmi.core.lesson_status', 'passed');
	    }

	    /**
	     * Set "failed" success status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'markFailed',
	    value: function markFailed() {
	      return this._setValue('cmi.core.lesson_status', 'passed');
	    }

	    /**
	     * Initialize SCORM and data.
	     *
	     * @private
	     */

	  }, {
	    key: '_bootstrap',
	    value: function _bootstrap() {
	      this.getDriver().LMSInitialize('');
	      // If this is the first time the user has ever loaded the sco,
	      // let's set the status to incomplete now that the LMS knows
	      // that they've started the course.
	      var status = this._getValue('cmi.core.lesson_status');
	      if (status === 'not attempted' || status === 'unknown') {
	        this._setValue('cmi.core.lesson_status', 'incomplete');
	      }
	    }

	    /**
	     * Get key from persistence layer
	     *
	     * @param key
	     * @returns {*}
	     * @private
	     */

	  }, {
	    key: '_getValue',
	    value: function _getValue(key) {
	      return this.getDriver().LMSGetValue(key);
	    }

	    /**
	     * Persist key/value pair
	     *
	     * @param key
	     * @param value
	     * @returns {boolean} success
	     * @private
	     */

	  }, {
	    key: '_setValue',
	    value: function _setValue(key, value) {
	      this.getDriver().LMSSetValue(key, value);
	      return ScormDriver._stringToBoolean(this.getDriver().LMSCommit(''));
	    }

	    /**
	     * Converts 'boolean strings' into actual valid booleans
	     *
	     * @param value
	     * @returns {boolean}
	     * @private
	     */

	  }], [{
	    key: '_stringToBoolean',
	    value: function _stringToBoolean(value) {
	      var t = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	      switch (t) {
	        // typeof new String('true') === 'object',
	        // so handle objects as string via fall-through.
	        case 'object':
	        case 'string':
	          return (/(true|1)/i.test(value)
	          );
	        case 'number':
	          return !!value;
	        case 'boolean':
	          return value;
	        case 'undefined':
	          return null;
	        default:
	          return false;
	      }
	    }
	  }]);

	  return ScormDriver;
	}();

	exports.default = ScormDriver;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var window = __webpack_require__(3);

	function ScormApi() {

	  /**
	   * Fetches the SCORM API object.
	   *
	   * Code is lightly modified version of official SCORM API Discovery Algorithm, with comments left in.
	   * @link http://scorm.com/scorm-explained/technical-scorm/run-time/api-discovery-algorithms/
	   *
	   * @param window
	   * @returns {*}
	   */
	  function getAPI(window) {
	    // start by looking for the API in the current window
	    var theAPI = findAPI(window);

	    // if the API is null (could not be found in the current window)
	    // and the current window has an opener window
	    if (theAPI == null && window.opener != null && typeof window.opener != "undefined") {
	      // try to find the API in the current window’s opener
	      theAPI = findAPI(window.opener);
	    }

	    return theAPI;
	  }

	  /**
	   * Scans given window object for SCORM API
	   *
	   * Code is lightly modified version of official SCORM API Discovery Algorithm, with comments left in.
	   * @link http://scorm.com/scorm-explained/technical-scorm/run-time/api-discovery-algorithms/
	   *
	   * @param win
	   * @returns {*}
	   */
	  function findAPI(win) {
	    var findAPITries = 0;
	    var maxTries = 10;

	    // Check to see if the window (win) contains the API
	    // if the window (win) does not contain the API and
	    // the window (win) has a parent window and the parent window
	    // is not the same as the window (win)
	    while (win.API == null && win.parent != null && win.parent != win) {
	      // increment the number of findAPITries
	      findAPITries++;

	      if (findAPITries > maxTries) {
	        return null;
	      }

	      // set the variable that represents the window being
	      // being searched to be the parent of the current window
	      // then search for the API again
	      win = win.parent;
	    }
	    return win.API;
	  }

	  return getAPI(window);
	}

	exports.default = ScormApi;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = window;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var window = __webpack_require__(3);

	var SessionDriver = function () {
	  function SessionDriver() {
	    _classCallCheck(this, SessionDriver);

	    this.storageKey = 'KD.CoursePlayer';
	    this.cache = this._warmCache();
	  }

	  /**
	   * Get the persistence driver
	   *
	   * @returns {Storage}
	   */


	  _createClass(SessionDriver, [{
	    key: 'getDriver',
	    value: function getDriver() {
	      return window.sessionStorage;
	    }

	    /**
	     * Get state object
	     *
	     * @returns {Object}
	     */

	  }, {
	    key: 'getData',
	    value: function getData() {
	      return this._getValue('cmi.suspend_data') || {};
	    }

	    /**
	     * Set state object
	     *
	     * @param {Object} data
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'setData',
	    value: function setData(data) {
	      return this._setValue('cmi.suspend_data', data);
	    }

	    /**
	     * Get the learner's current location
	     *
	     * @returns {String}
	     */

	  }, {
	    key: 'getLocation',
	    value: function getLocation() {
	      return this._getValue('cmi.core.lesson_location');
	    }

	    /**
	     * Set the learner's current location
	     *
	     * @param {string} location
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'setLocation',
	    value: function setLocation(location) {
	      return this._setValue('cmi.core.lesson_location', location);
	    }

	    /**
	     * Get score value
	     *
	     * @returns {number|undefined}
	     */

	  }, {
	    key: 'getScore',
	    value: function getScore() {
	      return this._getValue('cmi.core.score.raw');
	    }

	    /**
	     * Set score value from 0-100
	     *
	     * @param {number} value
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'setScore',
	    value: function setScore(value) {
	      this._setValue("cmi.core.score.min", 0);
	      this._setValue("cmi.core.score.max", 100);
	      return this._setValue("cmi.core.score.raw", value);
	    }

	    /**
	     * Get completion status
	     *
	     * @returns {string} completed, incomplete
	     */

	  }, {
	    key: 'getCompletionStatus',
	    value: function getCompletionStatus() {
	      var scormCompletionStatus = this._getValue('cmi.core.lesson_status');
	      if (['passed', 'failed'].indexOf(scormCompletionStatus) !== -1) {
	        scormCompletionStatus = 'completed';
	      }
	      return scormCompletionStatus;
	    }

	    /**
	     * Get success status
	     *
	     * @returns {string} passed, failed, unknown
	     */

	  }, {
	    key: 'getSuccessStatus',
	    value: function getSuccessStatus() {
	      var scormSuccessStatus = this._getValue('cmi.core.lesson_status');
	      if (scormSuccessStatus !== 'passed' && scormSuccessStatus !== 'failed') {
	        scormSuccessStatus = 'unknown';
	      }
	      return scormSuccessStatus;
	    }

	    /**
	     * Set "completed" completion status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'markCompleted',
	    value: function markCompleted() {
	      return this._setValue('cmi.core.lesson_status', 'completed');
	    }

	    /**
	     * Set "passed" success status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'markPassed',
	    value: function markPassed() {
	      return this._setValue('cmi.core.lesson_status', 'passed');
	    }

	    /**
	     * Set "failed" success status
	     *
	     * @returns {boolean} success
	     */

	  }, {
	    key: 'markFailed',
	    value: function markFailed() {
	      return this._setValue('cmi.core.lesson_status', 'passed');
	    }

	    /**
	     * Get data from persistence layer
	     *
	     * @returns {{}}
	     * @private
	     */

	  }, {
	    key: '_warmCache',
	    value: function _warmCache() {
	      var storedData = this.getDriver().getItem(this.storageKey);
	      return storedData ? JSON.parse(storedData) : { 'cmi.core.lesson_status': 'incomplete' };
	    }

	    /**
	     * Get key from persistence layer
	     *
	     * @param key
	     * @returns {*}
	     * @private
	     */

	  }, {
	    key: '_getValue',
	    value: function _getValue(key) {
	      return this.cache[key];
	    }

	    /**
	     * Persist key/value pair
	     *
	     * @param key
	     * @param value
	     * @returns {boolean} success
	     * @private
	     */

	  }, {
	    key: '_setValue',
	    value: function _setValue(key, value) {
	      this.cache[key] = value;
	      this.getDriver().setItem(this.storageKey, JSON.stringify(this.cache));
	      return true;
	    }
	  }]);

	  return SessionDriver;
	}();

	exports.default = SessionDriver;

/***/ }
/******/ ]);