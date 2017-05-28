var Actions = (function(){

  var startRecursiveAction = function(action, a, b, m, lastCallback) {
    recursiveActionWithTimeout(action, a, b, 0, m, lastCallback);
  }

  var recursiveActionWithTimeout = function(action, a, b, i, m, lastCallback) {
    if (i == m) {
      lastCallback()
    } else {
      actionWithTimeout(action, a, b, i, generateRecursiveActionWithTimeout(action, a, b, i, m, lastCallback))
    }
  }

  var actionWithTimeout = function(action, a, b, i, callback) {
    setTimeout(doAction(action, a, b, i, callback), 50);
  }

  var doAction = function(action, a, b, i, callback) {
    return function(){
      action(a,b,i);
      callback();
    }
  }

  var generateRecursiveActionWithTimeout = function(action, a, b, i, m, lastCallback) {
    return function(){
      recursiveActionWithTimeout(action, a, b, i + 1, m, lastCallback)
    }
  }



  return {
    start: startRecursiveAction,
  }
})