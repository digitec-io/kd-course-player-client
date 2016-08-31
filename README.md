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

Each time your course is loaded by the **KD Course Player**, the `index.html` file will be loaded. This file **should** redirect the user to the first page of your course, or where your customer last left off in their previous session. You can manage the learner's location using the `setLocation()` and `getLocation()` methods _(see below)_.

### Debug Mode

You can enable console debugging by setting a `KD_DEBUG = true;` value on the global window object. This must be done before you include the `kd-course-player.min.js` script tag.

### API

The client API is stored on the following global object: `KD.CoursePlayer`.  So, when we reference a method (e.g. `getLocation()`, you would access the method like so: `KD.CoursePlayer.getLocation()`.

**Angular Users**

You can access the client API via the `coursePlayer` service.  This service can be inject into your controllers, directives, components, etc.

#### Environment detection

The client API will auto-detect if it is in the **KD Course Player** environment. If detection comes back false, the client API will fallback to a `sessionStorage` persistence driver.  This allows you to test your course outside of the  **KD Course Player** environment.  All data will be stored in your browser's sessionStorage [[MDN: sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)].
