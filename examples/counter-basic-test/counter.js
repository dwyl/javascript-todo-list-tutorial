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

function view(signal, model, root) {
  empty(root);                                 // clear root element before
  return [                                     // Store DOM nodes in an array
    button('+', signal, Inc),                  // then iterate to append them
    div('count', model),                      // avoids repetition.
    button('-', signal, Dec)
  ].forEach(function(el){ root.appendChild(el) }); // forEach is ES5 so IE9+
} // yes, for loop is "faster" than forEach, but readability trumps "perf" here!

// Mount Function receives all MUV and mounts the app in the "root" DOM Element
function mount(model, update, view, root_element_id) {
  var root = document.getElementById(root_element_id); // root DOM element
  function signal(action) {          // signal function takes action
    return function callback() {     // and returns callback
      model = update(model, action); // update model according to action
      view(signal, model, root);     // subsequent re-rendering
    };
  };
  view(signal, model, root);         // render initial model (once)
}

// The following are "Helper" Functions which each "Do ONLY One Thing" and are
// used in the "View" function to render the Model (State) to the Browser DOM:

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

function div(divid, text) {
  var div = document.createElement('div');
  div.id = divid;
  div.className = divid;
  if(text !== undefined) { // if text is passed in render it in a "Text Node"
    var txt = document.createTextNode(text);
    div.appendChild(txt);
  }
  return div;
}
