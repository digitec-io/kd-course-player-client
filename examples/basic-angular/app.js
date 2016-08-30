(function (angular) {

  angular.module('app', ['ngRoute', 'kdCoursePlayer']);


  angular.module('app').config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {template: 'Loading...', controller: 'HomeController', controllerAs: 'vm'})
      .when('/1', {templateUrl: 'page-1', controller: 'Page1Controller', controllerAs: 'vm'})
      .when('/2', {templateUrl: 'page-2', controller: 'Page2Controller', controllerAs: 'vm'})
      .when('/3', {templateUrl: 'page-3', controller: 'Page3Controller', controllerAs: 'vm'})
      .otherwise({redirectTo: '/'});
  }]);


  angular.module('app').controller('HomeController', function ($location, coursePlayer) {
    var firstPage = '/1';

    // Redirect learner
    if (coursePlayer.getLocation()) {
      // Redirect to where learner left off
      $location.path(coursePlayer.getLocation());
    } else {
      // Learner's first visit.  Redirect to first page.
      $location.path(firstPage);
    }
  });


  angular.module('app').controller('Page1Controller', function ($location, coursePlayer) {
    // Store the learner's current location
    coursePlayer.setLocation($location.path());
  });


  angular.module('app').controller('Page2Controller', function ($location, coursePlayer) {
    var vm = this;

    // Get app state data
    var data = coursePlayer.getData();
    vm.flavor = (data.flavor) ? data.flavor : null;

    // Store the learner's current location
    coursePlayer.setLocation($location.path());

    // Set flavor on app's data object, and then persist the data object
    vm.setFlavor = function (flavor) {
      data.flavor = flavor;
      coursePlayer.setData(data);
    }

  });


  angular.module('app').controller('Page3Controller', function ($location, coursePlayer) {
    var vm = this;

    // Get flavor from app state data
    vm.flavor = coursePlayer.getData().flavor;

    // Store the learner's current location
    coursePlayer.setLocation($location.path());

    // This is the final page. Let's mark as "completed".
    if (coursePlayer.getCompletionStatus() !== 'completed') {
      coursePlayer.markCompleted();
    }

  });

})(window.angular);
