const window = require('window');

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
    let theAPI = findAPI(window);

    // if the API is null (could not be found in the current window)
    // and the current window has an opener window
    if ((theAPI == null) && (window.opener != null) && (typeof(window.opener) != "undefined")) {
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
    let findAPITries = 0;
    const maxTries = 10;

    // Check to see if the window (win) contains the API
    // if the window (win) does not contain the API and
    // the window (win) has a parent window and the parent window
    // is not the same as the window (win)
    while ((win.API == null) && (win.parent != null) && (win.parent != win)) {
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

export default ScormApi;
