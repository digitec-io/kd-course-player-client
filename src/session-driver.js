const window = require('window');

class SessionDriver {

  constructor() {
    this.storageKey = 'KD.CoursePlayer';
    this.cache = this._warmCache();
  }

  /**
   * Get the persistence driver
   *
   * @returns {Storage}
   */
  getDriver() {
    return window.sessionStorage;
  }

  /**
   * Get state object
   *
   * @returns {Object}
   */
  getData() {
    return this._getValue('cmi.suspend_data');
  }

  /**
   * Set state object
   *
   * @param {Object} data
   * @returns {boolean} success
   */
  setData(data) {
    return this._setValue('cmi.suspend_data', data);
  }

  /**
   * Get the learner's current location
   *
   * @returns {String}
   */
  getLocation() {
    return this._getValue('cmi.core.lesson_location');
  }

  /**
   * Set the learner's current location
   *
   * @param {string} location
   * @returns {boolean} success
   */
  setLocation(location) {
    return this._setValue('cmi.core.lesson_location', location);
  }

  /**
   * Get score value
   *
   * @returns {number|undefined}
   */
  getScore() {
    return this._getValue('cmi.core.score.raw');
  }

  /**
   * Set score value from 0-100
   *
   * @param {number} value
   * @returns {boolean} success
   */
  setScore(value) {
    this._setValue("cmi.core.score.min", 0);
    this._setValue("cmi.core.score.max", 100);
    return this._setValue("cmi.core.score.raw", value);
  }

  /**
   * Get completion status
   *
   * @returns {string} completed, incomplete
   */
  getCompletionStatus() {
    let scormCompletionStatus = this._getValue('cmi.core.lesson_status');
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
  getSuccessStatus() {
    let scormSuccessStatus = this._getValue('cmi.core.lesson_status');
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
  markCompleted() {
    return this._setValue('cmi.core.lesson_status', 'completed');
  }

  /**
   * Set "passed" success status
   *
   * @returns {boolean} success
   */
  markPassed() {
    return this._setValue('cmi.core.lesson_status', 'passed');
  }

  /**
   * Set "failed" success status
   *
   * @returns {boolean} success
   */
  markFailed() {
    return this._setValue('cmi.core.lesson_status', 'passed');
  }

  /**
   * Get data from persistence layer
   *
   * @returns {{}}
   * @private
   */
  _warmCache() {
    const storedData = this.getDriver().getItem(this.storageKey);
    return storedData || {'cmi.core.lesson_status': 'incomplete'};
  }

  /**
   * Get key from persistence layer
   *
   * @param key
   * @returns {*}
   * @private
   */
  _getValue(key) {
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
  _setValue(key, value) {
    this.cache[key] = value;
    this.getDriver().setItem(this.storageKey, JSON.stringify(this.cache));
    return true;
  }

}

export default SessionDriver;
