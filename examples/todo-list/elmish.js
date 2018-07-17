/**
 * `empty` the contents of a given DOM element "node" (before re-rendering).
 * This is the *fastest* way according to: stackoverflow.com/a/3955238/1148249
 * @param  {Object} node the exact DOM node you want to empty
 * @example
 * // returns true (once the 'app' node is emptied)
 * const node = document.getElementById('app');
 * empty(node);
 */
function empty(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}

/**
 * `mount` mounts the app in the "root" DOM Element.
 * @param  {Object} model store of the application's state.
 * @param  {Function} update how the application state is updated ("controller")
 * @param  {Function} view function that renders HTML/DOM elements with model.
 * @param  {String} root_element_id root DOM element in which the app is mounted
 */
function mount(model, update, view, root_element_id) {
  var root = document.getElementById(root_element_id); // root DOM element
  function signal(action) {                     // signal function takes action
    return function callback() {                // and returns callback
      var updatedModel = update(model, action); // update model for the action
      empty(root);                              // clear root el before rerender
      view(signal, updatedModel, root);         // subsequent re-rendering
    };
  };
  view(signal, model, root);                    // render initial model (once)
}


/**
* `add_attributes` applies the desired attributes to the desired node.
* Note: this function is "impure" because it "mutates" the node.
* however it is idempotent; the "side effect" is only applied once.
* @param {Array.<String>} attrlist list of attributes to be applied to the node
* @param {Object} node DOM node upon which attribute(s) should be applied
* @example
* // returns node with attributes applied
* div = add_attributes(["class=item", "id=mydiv", "active=true"], div);
*/
function add_attributes(attrlist, node) {
  attrlist.forEach(function (attr) {
    var a = attr.split('=');
    switch(a[0]) {
      case 'class':
        node.className = a[1]; // apply CSS classes
        break;
      case 'data-id':
        node.setAttribute('data-id', a[1]); // add data-id e.g: to <li>
        break;
      case 'for':
        node.setAttribute('for', a[1]); // e.g: <label for="toggle-all">
        break;
      case 'id':
        node.id = a[1]; // apply element id
        break;
      case 'placeholder':
        node.placeholder = a[1]; // add placeholder to <input> element
        break;
      case 'style':
        node.setAttribute("style", a[1]); // e.g: <div style="display: block;">
        break;
      case 'type':
        node.setAttribute('type', a[1]); // e.g: <input id="toggle-all" type="checkbox">
        break;
      default:
        break;
    }
  });
  return node;
}

/**
 * `append_children` appends an array of HTML elements to a parent DOM node.
 * @param  {Array.<Object>} childnodes array of child DOM nodes.
 * @param  {Object} parent the "parent" DOM node where children will be added.
 * @return {Object} returns parent DOM node with appended children
 * @example
 * // returns the parent node with the "children" appended
 * var parent = elmish.append_childnodes([div, p, section], parent);
 */
function append_childnodes (childnodes, parent) {
  childnodes.forEach(function (el) { parent.appendChild(el) });
  return parent;
}

/**
 * `init` initialises the document (Global) variable for DOM operations.
 * @param  {Object} doc window.document in browser and JSDOM.document in tests.
 * @return {Object} document returns whatever is passed in.
 */
function init(doc){
  document = doc; // this is used for instantiating JSDOM for testing.
  return document;
}

/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    add_attributes: add_attributes,
    append_childnodes: append_childnodes,
    // button: button,
    // div: div,
    empty: empty,
    init: init,
    mount: mount
  }
} else { init(document); }
