(function() { // scope functions to prevent naming conflicts
/* if require is available, it means we are in Node.js Land i.e. testing! */
/* istanbul ignore next */
if (typeof require !== 'undefined' ) { // require elm(ish) creating local copy
  const { a, button, div, empty, footer, input, h1, header, label, li, mount,
    route, section, span, strong, text, ul } = require('./elmish.js');
} // in the browser elm(ish) functions are automatically be available

// Define the Component's Actions:
var Inc = 'inc';                     // increment the counter
var Dec = 'dec';                     // decrement the counter
var Res = 'reset';                   // reset counter: git.io/v9KJk

function update(model, action) {     // Update function takes the current state
  var parts = action ? action.split('-') : []; // e.g: inc-0 where 0 is the counter "id"
  var act = parts[0];
  var index = parts[1] || 0;
  var new_model = JSON.parse(JSON.stringify(model)) // "clone" the model
  switch(act) {                   // and an action (String) runs a switch
    case Inc:
      new_model.counters[index] = model.counters[index] + 1;
      break;
    case Dec:
      new_model.counters[index] = model.counters[index] - 1;
      break;
    case Res: // use ES6 Array.fill to create a new array with values set to 0:
      new_model.counters[index] = 0;
      break;
    default: return model; // if action not defined, return curent state.
  }
  return new_model;
}

function view(signal, model, root) {
  empty(root); // clear root element before re-rendering the App (DOM).
  model.counters.map(function(counter, index) {
    return container(index, [                // wrap DOM nodes in an "container"
      button('+', signal, Inc + '-' + index),    // append index to action
      div('count', counter),       // create div w/ count as text
      button('-', signal, Dec + '-' + index),    // decrement counter
      button('Reset', signal, Res + '-' + index) // reset counter
    ]);
  }).forEach(function (el) { root.appendChild(el) }); // forEach is ES5 so IE9+
}




})(); // https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
