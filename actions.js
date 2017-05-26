var Actions = (function(){

  var doAction = function(action, a, b, i, callback) {
    return function(){
      action(a,b,i);
      callback();
    }
  }

  var actionWithTimeout = function(action, a, b, i, callback) {
    setTimeout(doAction(action, a, b, i, callback), 50);
  }

  var generateRecursiveActionWithTimeout = function(action, a, b, i) {
    return function(){
      recursiveActionWithTimeout(action, a, b, i + 1)
    }
  }

  var recursiveActionWithTimeout = function(action, a, b, i) {
    if (a[i] === undefined) {return}
    actionWithTimeout(action, a, b, i, generateRecursiveActionWithTimeout(action, a, b, i))
  }

  var startRecursiveAction = function(action, a, b) {
    recursiveActionWithTimeout(action, a, b, 0);
  }


  return {
    start: startRecursiveAction,
  }
})