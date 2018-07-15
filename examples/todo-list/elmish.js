



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
* attributes applies the desired attributes to the desired node.
* Note: this function is "impure" because it "mutates" the node.
* however it is idempotent; the "side effect" is only applied once.
* @param {Array.<String>} attrlist list of attributes to be applied to the node
* @param {Object} node DOM node upon which attribute(s) should be applied
* @example
* // returns node with attributes applied
* div = attributes(["class=item", "id=mydiv", "active=true"], div);
*/
function attributes(attrlist, node) {
  attrlist.forEach(function (attr) {
    var a = attr.split('=');
    switch(a[0]) {
      case 'class':
        node.className = a[1]; // apply CSS classes
        break;
      default:
        break;
    }
  });
  return node;
}


/**
 * init initialises the document (Global) variable for DOM operations.
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
    // view: view,
    attributes: attributes,
    empty: empty,
    init: init,
    mount: mount
    // update: update,
    // div: div,
    // button: button,
  }
} else { init(document); }
