// Define the Component's Actions:
var Inc = 'inc';                     // increment the counter
var Dec = 'dec';                     // decrement the counter
var Res = 'reset';                   // reset counter: git.io/v9KJk

function update(model, action) {     // Update function takes the current state
  // console.log('update', model, action);
  var parts = action.split('-'); // e.g: inc-0 where 0 is the counter "id"
  var act = parts[0];
  var index = parts[1];
  console.log('action:', action, '| act:', act, '| index:', index,
    '| value:', model.counters[index])
  var new_model = JSON.parse(JSON.stringify(model)) // "clone"
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
  model.counters.map(function(item, index) {
    return container(index, [                // wrap DOM nodes in an "container"
      button('+', signal, Inc + '-' + index),    // append index to action
      div('count', model.counters[index]),       // create div w/ count as text
      button('-', signal, Dec + '-' + index),    // decrement counter
      button('Reset', signal, Res + '-' + index) // reset counter
    ]);
  }).forEach(function (el) { root.appendChild(el) }); // forEach is ES5 so IE9+


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

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section
function container(index, elements) {
  var con = document.createElement('section');
  con.id = index;
  con.className = 'counter';
  elements.forEach(function(el) { con.appendChild(el) });
  return con;
}

function button(text, signal, action) {
  var button = document.createElement('button');
  var text = document.createTextNode(text);    // human-readable button text
  button.appendChild(text);                    // text goes *inside* not attrib
  button.className = action.split('-')[0];                   // use action as CSS class
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

mount({counters:[0, 1, 2]}, update, view, 'app');
