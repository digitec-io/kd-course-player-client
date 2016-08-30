import ScormApi from './scorm-api';

class ScormDriver {

  constructor() {
    this.driver = ScormApi();
    if (this.driver) {
      this.isConnected = true;
      this._bootstrap()
    }
  }

  /**
   * Get the persistence driver
   *
   * @returns {Object} SCORM 1.2 API
   */
  getDriver() {
    return this.driver;
  }

  /**
   * Get state object
   *
   * @returns {Object}
   */
  getData() {
    const jsonString = this._getValue('cmi.suspend_data');
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
  setData(data) {
    const json = JSON.stringify(data);
    return this._setValue('cmi.suspend_data', json);
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
    const score = this._getValue('cmi.core.score.raw');
    return (score) ? parseInt(score) : undefined;
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
    if (this.getSuccessStatus() === 'unknown') {
      return this._setValue('cmi.core.lesson_status', 'completed');
    }
  }

  /**
   * Set "passed" success status
   *
   * @returns {boolean} success
   */
  markPassed() {
    if (this.getSuccessStatus() === 'unknown') {
      return this._setValue('cmi.core.lesson_status', 'passed');
    }
  }

  /**
   * Set "failed" success status
   *
   * @returns {boolean} success
   */
  markFailed() {
    if (this.getSuccessStatus() === 'unknown') {
      return this._setValue('cmi.core.lesson_status', 'passed');
    }
  }

  /**
   * Initialize SCORM and data.
   *
   * @private
   */
  _bootstrap() {
    this.getDriver().LMSInitialize('');
    // If this is the first time the user has ever loaded the sco,
    // let's set the status to incomplete now that the LMS knows
    // that they've started the course.
    const status = this._getValue('cmi.core.lesson_status');
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
  _getValue(key) {
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
  _setValue(key, value) {
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
  static _stringToBoolean(value) {
    var t = typeof value;
    switch (t) {
      // typeof new String('true') === 'object',
      // so handle objects as string via fall-through.
      case 'object':
      case 'string':
        return (/(true|1)/i).test(value);
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

}

export default ScormDriver;
