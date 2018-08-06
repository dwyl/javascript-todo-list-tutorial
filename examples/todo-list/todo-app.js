(function() { // scope functions to prevent naming conflicts
/* if require is available, it means we are in Node.js Land i.e. testing! */
/* istanbul ignore next */
if (typeof require !== 'undefined' ) { // require elm(ish) creating local copy
  const { a, button, div, empty, footer, input, h1, header, label, li, mount,
    route, section, span, strong, text, ul } = require('./elmish.js');
} // in the browser elm(ish) functions are automatically be available


var initial_model = {
  todos: [],
  hash: "#/"
}

/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {Object} model - the App's (current) model (or "state").
 * @param {String} data - the data we want to "apply" to the item.
 * @return {Object} updated_model - the transformed model.
 */
function update(action, model, data) {
  var new_model = JSON.parse(JSON.stringify(model)) // "clone" the model
  switch(action) {                   // and an action (String) runs a switch
    case 'ADD':
      new_model.todos.push({
        id: model.todos.length + 1,
        title: data,
        done: false
      });
      break;
    case 'TOGGLE':
      new_model.todos.forEach(function (item) { // takes 1ms on a "slow mobile"
        if(item.id === data) {    // this should only "match" one item.
          item.done = !item.done; // invert state of "done" e.g false >> true
        }
      });
      break;
    default: // if action unrecognised or undefined,
      return model; // return model unmodified
  }   // see: https://softwareengineering.stackexchange.com/a/201786/211301
  return new_model;
}



// function view(signal, model, root) {
//   empty(root); // clear root element before re-rendering the App (DOM).
//   model.counters.map(function(counter, index) {
//     return container(index, [                // wrap DOM nodes in an "container"
//       button('+', signal, Inc + '-' + index),    // append index to action
//       div('count', counter),       // create div w/ count as text
//       button('-', signal, Dec + '-' + index),    // decrement counter
//       button('Reset', signal, Res + '-' + index) // reset counter
//     ]);
//   }).forEach(function (el) { root.appendChild(el) }); // forEach is ES5 so IE9+
// }

/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    model: initial_model,
    update: update,
    // view: view
  }
}


})(); // https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
