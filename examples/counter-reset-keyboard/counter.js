/* if require is available, it means we are in Node.js Land i.e. testing!
 in the broweser, the "elmish" DOM functions are loaded in a <script> tag*/
/* istanbul ignore next */
if (typeof require !== 'undefined' && this.window !== this) {
  var { button, div, empty, h1, mount, text } = require('./elmish.js');
}

function update (action, model) {    // Update function takes the current state
  switch(action) {                   // and an action (String) runs a switch
    case 'inc': return model + 1;    // add 1 to the model
    case 'dec': return model - 1;    // subtract 1 from model
    case 'reset': return 0;          // reset state to 0 (Zero) git.io/v9KJk
    default: return model;           // if no action, return curent state.
  }                                  // (default action always returns current)
}

function view(model, signal) {
  return div([], [
    button(["class=inc", "id=inc", signal('inc')], [text('+')]), // increment
    div(["class=count", "id=count"], [text(model.toString())]), // count
    button(["class=dec", "id=dec", signal('dec')], [text('-')]), // decrement
    button(["class=reset", "id=reset", signal('reset')], [text('Reset')])
  ]); // forEach is ES5 so IE9+
} // yes, for loop is "faster" than forEach, but readability trumps "perf" here!

/* The code block below ONLY Applies to tests run using Node.js */
/* istanbul ignore else */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    view: view,
    update: update,
  }
}
