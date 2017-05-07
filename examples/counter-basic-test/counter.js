// Mount Function receives all the elements and mounts the app
function mount(muv, id) {  // state is encapsulated by mount function
  var root = document.getElementById(id);
  var update = muv.update;           // make local copies of the init parameters
  var state = muv.model;             // initial state
  var view = muv.view;               // view is what renders the UI in Browser

  function signal(action) {          // signal function takes action
    return function callback() {     // and returns callback
      state = update(state, action); // update state according to action
      view(signal, state, root);     // subsequent re-rendering
    };
  };
  view(signal, state, root);         // render initial state (once)
}
// Define the Component's Actions:
var Inc = 'inc';                     // increment the counter
var Dec = 'dec';                     // decrement the counter

function update(model, action) {     // Update function takes the current state
  switch(action) {                   // and an action (String) runs a switch
    case Inc: return model + 1;      // add 1 to the model
    case Dec: return model - 1;      // subtract 1 from model
    default: return model;           // if no action, return curent state.
  }                                  // (default action always returns current)
}
// empty the contents of a given DOM element "node" (before re-rendering)
function empty(node) {
  while (node.firstChild) {
      node.removeChild(node.firstChild);
  }
} // Inspired by: stackoverflow.com/a/3955238/1148249

function button(text, signal, action) {
  var button = document.createElement('button');
  var text = document.createTextNode(text);    // human-readable button text
  button.appendChild(text);                    // text goes *inside* not attrib
  button.className = action;                   // use action as CSS class
  button.onclick = signal(action);             // onclick tells how to process
  return button;                               // return the DOM node(s)
} // how to create a button in JavaScript: stackoverflow.com/a/8650996/1148249

function view(signal, model, root) {
  empty(root);                                 // clear root element before
  return [                                     // Store DOM nodes in an array
    button('+', signal, Inc),                  // then iterate to append them
    document.createTextNode(model),            // avoids repetition.
    button('-', signal, Dec)
  ].forEach(function(el){ root.appendChild(el) }); // forEach is ES5 so IE9+
} // yes, for loop is "faster" than forEach, but readability trumps "perf" here!
