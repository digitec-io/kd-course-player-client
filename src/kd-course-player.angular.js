const angular = require('angular');
const window = require('window');

const coursePlayer = angular
  .module('kdCoursePlayer', [])
  .factory('coursePlayer', function () {
    return window.KD.CoursePlayer;
  })
  .name;

export default coursePlayer;
