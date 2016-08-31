# KD Course Player Client

A JavaScript client that interacts with the Knowledge Direct Course Player.

## Installation

Add a `<script>` tag to your HTML:

```html
<script src="kd-course-player.min.js"></script>
```

If you are using Angular 1.*, then also add our Angular script:

```html
<script src="kd-course-player.min.js"></script>
<script src="kd-course-player.angular.min.js"></script>
```

You would then need to add our `kdCoursePlayer` module as a submodule to your app's module.

```js
angular.module('app', ['kdCoursePlayer']);
```

## How to Use

### Understanding the flow

Each time your course is loaded by the **KD Course Player**, the `index.html` file will be loaded. This file **should** redirect the user to the first page of your course, or where your customer last left off in their previous session. You can manage the learner's location using the `setLocation()` and `getLocation()` methods. Once a learner has completed the course, make a call to `markCompleted()`.

### Debug Mode

You can enable console debugging by setting a `KD_DEBUG = true;` value on the global window object. This must be done before you include the `kd-course-player.min.js` script tag.

### Client API

The Client API is stored on the following global object: `KD.CoursePlayer`.  So, when we reference a method (e.g. `getLocation()`, you would access the method like so: `KD.CoursePlayer.getLocation()`.

#### Angular Users

You can access the Client API via the `coursePlayer` service.  This service can be inject into your controllers, directives, components, etc.

#### Environment detection

The Client API will auto-detect if it is in the **KD Course Player** environment. If detection comes back false, the Client API will fallback to a `sessionStorage` persistence driver.  This allows you to test your course outside of the  **KD Course Player** environment.  All data will be stored in your browser's sessionStorage [[MDN: sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)].

#### Methods

| Method | Params | Returns | Details |
| ------ | ------ | ------- | ------- |
| `setLocation(location)` | _location_:**string** | _success_:**boolean** | Store the learner's current location (url, route, etc) in your app. This value is what your app will use to send the learner back to where they left off, if they relaunch the course. |
| `getLocation()` |  | _location_:**string** | Get the learner's last stored location. |
| `setData(data)` | _data_:**object** | _success_:**boolean** | Store app state data.  All instance data that you want persisted can be stored on this arbitrary data object. Typical uses include _(but are not limited to)_ completion states for each view, storing user submitted values, etc. |
| `getData()` |  | _data_:**object** | Get the app's state data. |
| `markCompleted()` |  | _success_:**boolean** | Set the course completion status to `completed`. **PLEASE NOTE**: This will lock the success status and score. You will need to set success status and score prior to calling this method. |
| `getCompletionStatus()` |  | _status_:**string** | Completion status for the course. Possible values are `completed` and `incomplete`. |
| `markPassed()` |  | _success_:**boolean** | Mark the course success status as `passed`. Once a course is marked complete, the status becomes immutable. |
| `markFailed()` |  | _success_:**boolean** | Mark the course success status as `failed`. Once a course is marked complete, the status becomes immutable. |
| `getSuccessStatus()` |  | _status_:**string** | Success status for the course. Possible values are `passed`, `failed` and `unknown`. |
| `setScore(score)` | _score_:**int** | _success_:**boolean** | Store the final score for the course. Scores must be in the following range: `0`-`100`.  Once a course is marked complete, the score becomes immutable. |
| `getScore()` |  | _score_:**int/undefined** | Get the final score for the course. |
| `getDriver()` |  | _driver_:**object** | Get the persistence driver that the Client API is using. When in the **KD Player** environment, the driver is the [Scorm 1.2 API](http://scorm.com/scorm-explained/technical-scorm/run-time/). Otherwise the driver is your browser's `sessionStorage` property. |
