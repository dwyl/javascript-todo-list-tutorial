// Define the Component's Actions:
var Inc = 'inc';                     // increment the counter
var Dec = 'dec';                     // decrement the counter
var Res = 'reset';                   // reset counter: git.io/v9KJk

function update(model, action) {     // Update function takes the current state
  console.log('update', model, action);
  var i = 0; // 
  switch(action) {                   // and an action (String) runs a switch
    case Inc:
      var new_model = JSON.parse(JSON.stringify(model)) // "clone"
      new_model.counters[i] = model.counters[i] + 1;
      console.log('model:', model, 'new_model:', new_model);
      return new_model; // subtract 1 from model
    case Dec:
      var new_model = JSON.parse(JSON.stringify(model)) // "clone"
      new_model.counters[i] = model.counters[i] - 1;
      console.log('model:', model, 'new_model:', new_model);
      return new_model;
    case Res: // use ES6 magic to create a new array with all values set to 0:
      return { counters: new Array(model.counters.length).fill(0) }; // reset
    default: return model;           // if no action, return curent state.
  }                                  // (default action always returns current)
}

function view(signal, model, root) {
  var i = 0;
  empty(root);                                 // clear root element before
  [                                            // Store DOM nodes in an array
    button('+', signal, Inc),                  // then iterate to append them
    div('count', model.counters[i]),        // create div with stat as text
    button('-', signal, Dec),                  // decrement counter
    button('Reset', signal, Res)               // reset counter
  ].forEach(function (el) { root.appendChild(el) }); // forEach is ES5 so IE9+
} // yes, for loop is "faster" than forEach, but readability trumps "perf" here!

// Mount Function receives all MUV and mounts the app in the "root" DOM Element
function mount(model, update, view, root_element_id) {
  var root = document.getElementById(root_element_id); // root DOM element
  // var dummy = 0;
  function signal(action) {   // signal function takes action
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
  button.id = action;
  // console.log(signal, ' action:', action)
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

function init(doc){
  document = doc; // this is used for instantiating JSDOM. ignore!
}

/* The code block below ONLY Applies to tests run using Node.js */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    view: view,
    mount: mount,
    update: update,
    div: div,
    button: button,
    empty: empty,
    init: init
  }
} else { init(document); }

mount({counters:[0]}, update, view, 'app');
