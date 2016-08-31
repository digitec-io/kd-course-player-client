const window = require('window');
import ScormDriver from "./scorm-driver";
import SessionDriver from "./session-driver";

class CoursePlayer {

  constructor(debug = false) {
    this.debug = debug;
    const scormDriver = new ScormDriver();
    this.driver = (scormDriver.isConnected) ? scormDriver : new SessionDriver();
    if (scormDriver.isConnected) {
      this.driver = scormDriver;
      this.log(`Connected to SCORM 1.2 driver`);
    } else {
      this.driver = new SessionDriver(debugKey);
      this.log(`Connected to window.sessionStorage driver`);
    }
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
        console.log(`[KD.CoursePlayer] ${message}`, payload);
      } else {
        console.log(`[KD.CoursePlayer] ${message}`);
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
    const data = this.driver.getData();
    this.log('getData', data);
    return data;
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
    const success = this.driver.setData(data);
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
  getLocation() {
    const location = this.driver.getLocation();
    this.log('getLocation', location);
    return location;
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
    const success = this.driver.setLocation(location);
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
  getScore() {
    const score = this.driver.getScore();
    this.log('getScore', score);
    return score;
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
    if (this.getCompletionStatus() === 'completed') {
      this.log('setScore: Unable to set score because course is already completed.');
      return false;
    }
    const success = this.driver.setScore(score);
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
  getCompletionStatus() {
    const status = this.driver.getCompletionStatus();
    this.log('getCompletionStatus', status);
    return status;
  }

  /**
   * Get success status
   *
   * @returns {string} passed, failed, unknown
   */
  getSuccessStatus() {
    const status = this.driver.getSuccessStatus();
    this.log('getSuccessStatus', status);
    return status;
  }

  /**
   * Set "completed" completion status
   *
   * @returns {boolean} success
   */
  markCompleted() {
    if (this.getCompletionStatus() !== 'incomplete' || this.getSuccessStatus() !== 'unknown') {
      this.log('markCompleted: Already marked completed.');
      return false;
    }
    const success = this.driver.markCompleted();
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
  markPassed() {
    if (this.getCompletionStatus() === 'completed') {
      this.log('markPassed: Unable to set success status because course is already completed.');
      return false;
    }
    const success = this.driver.markPassed();
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
  markFailed() {
    if (this.getCompletionStatus() === 'completed') {
      this.log('markFailed: Unable to set success status because course is already completed.');
      return false;
    }
    const success = this.driver.markFailed();
    if (success) {
      this.log('markFailed: Success.');
    } else {
      this.log('markFailed: Failed.');
    }
    return success;
  }

}

window.KD = window.KD || {};
window.KD.CoursePlayer = new CoursePlayer(window['KD_DEBUG']);

export default CoursePlayer;
