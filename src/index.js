const window = require('window');
import ScormDriver from './scorm-driver';
import SessionDriver from './session-driver';

class KdPlayer {

  constructor() {
    const scormDriver = new ScormDriver();
    this.driver = (scormDriver.isConnected) ? scormDriver : new SessionDriver();
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
      // Invalid data type error
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
      // Invalid data type error
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
      // Out of range error
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
    return this.driver.markCompleted();
  }

  /**
   * Set "passed" success status
   *
   * @returns {boolean} success
   */
  markPassed() {
    return this.driver.markPassed();
  }

  /**
   * Set "failed" success status
   *
   * @returns {boolean} success
   */
  markFailed() {
    return this.driver.markFailed();
  }

}

window.KD = window.KD || {};
window.KD.CoursePlayer = new KdPlayer();
