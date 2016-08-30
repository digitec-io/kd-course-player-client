const window = require('window');
import ScormDriver from "./scorm-driver";
import SessionDriver from "./session-driver";

class CoursePlayer {

  constructor(debug = false) {
    this.debug = debug;
    const scormDriver = new ScormDriver();
    this.driver = (scormDriver.isConnected) ? scormDriver : new SessionDriver();
  }

  /**
   * Log message in console if debug is enabled
   *
   * @param {string} message
   * @param {*} payload
   */
  log(message = '', payload) {
    if (this.debug) {
      if (typeof payload !== 'undefined') {
        console.log(`[CoursePlayer] ${message}`, payload);
      } else {
        console.log(`[CoursePlayer] ${message}`);
      }
    }
  }

  /**
   * Get the persistence driver
   *
   * @returns {*} SCORM 1.2 API or sessionStorage
   */
  getDriver() {
    return this.driver.getDriver();
  }

  /**
   * Get state object
   *
   * @returns {Object}
   */
  getData() {
    return this.driver.getData();
  }

  /**
   * Set state object
   *
   * @param {Object} data
   * @returns {boolean} success
   */
  setData(data) {
    if (typeof data !== 'object') {
      this.log('setData: Invalid data type given. Expected object.', data);
      return false;
    }
    return this.driver.setData(data);
  }

  /**
   * Get the learner's current location
   *
   * @returns {String}
   */
  getLocation() {
    return this.driver.getLocation();
  }

  /**
   * Set the learner's current location
   *
   * @param {string} location
   * @returns {boolean} success
   */
  setLocation(location) {
    if (typeof location !== 'string') {
      this.log('setLocation: Invalid data type given. Expected string.', location);
      return false;
    }
    return this.driver.setLocation(location);
  }

  /**
   * Get score value
   *
   * @returns {number|undefined}
   */
  getScore() {
    return this.driver.getScore();
  }

  /**
   * Set score value from 0-100
   *
   * @param {number} value
   * @returns {boolean} success
   */
  setScore(value) {
    const score = parseInt(value);
    if (score < 0 || score > 100) {
      this.log('setScore: Given value is out of range. Expected number between 0-100.', value);
      return false;
    }
    return this.driver.setScore(score);
  }

  /**
   * Get completion status
   *
   * @returns {string} completed, incomplete
   */
  getCompletionStatus() {
    return this.driver.getCompletionStatus();
  }

  /**
   * Get success status
   *
   * @returns {string} passed, failed, unknown
   */
  getSuccessStatus() {
    return this.driver.getSuccessStatus();
  }

  /**
   * Set "completed" completion status
   *
   * @returns {boolean} success
   */
  markCompleted() {
    if (this.getCompletionStatus() !== 'unknown' || this.getSuccessStatus() !== 'unknown') {
      this.log('markCompleted: Already marked completed.');
      return false;
    }
    return this.driver.markCompleted();
  }

  /**
   * Set "passed" success status
   *
   * @returns {boolean} success
   */
  markPassed() {
    if (this.getSuccessStatus() !== 'unknown') {
      this.log(`markPassed: Already has success status of ${this.getSuccessStatus()}. Once set, success status can not be modified.`);
      return false;
    }
    return this.driver.markPassed();
  }

  /**
   * Set "failed" success status
   *
   * @returns {boolean} success
   */
  markFailed() {
    if (this.getSuccessStatus() !== 'unknown') {
      this.log(`markPassed: Already has success status of ${this.getSuccessStatus()}. Once set, success status can not be modified.`);
      return false;
    }
    return this.driver.markFailed();
  }

}

window.KD = window.KD || {};
window.KD.CoursePlayer = new CoursePlayer(window['KD_DEBUG']);

export default CoursePlayer;
