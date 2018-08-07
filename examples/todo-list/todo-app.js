(function() { // scope functions to prevent naming conflicts
/* if require is available, it means we are in Node.js Land i.e. testing! */
/* istanbul ignore next */
const { a, button, div, empty, footer, input, h1, header, label, li, mount,
  route, section, span, strong, text, ul } =
    (typeof require !== 'undefined') ? require('./elmish.js') : {};

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

/**
 * `render_item` creates an DOM "tree" with a single Todo List Item
 * using the "elmish" DOM functions (`li`, `div`, `input`, `label` and `button`)
 * returns an `<li>` HTML element with a nested `<div>` which in turn has the:
 * + `<input type=checkbox>` which lets users to "Toggle" the status of the item
 * + `<label>` which displays the Todo item text (`title`) in a `<text>` node
 * + `<button class="destroy">` lets people "delete" a todo item.
 * see: https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/52
 * @param  {Object} item the todo item object
 * @return {Object} <li> DOM Tree which is nested in the <ul>.
 * @example
 * // returns <li> DOM element with <div>, <input>. <label> & <button> nested
 * var DOM = render_item({id: 1, title: "Build Todo List App", done: false});
 */
function render_item(item) {
  console.log('item', item);
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : ""
    ], [
      div(["class=view"], [
        input(["class=toggle", "type=checkbox",
            item.done ? "checked=true" : ""],
          []), // <input> does not have any nested elements
        label([], [text(item.title)]),
        button(["class=destroy"])
      ]) // </div>
    ]) // </li>
  )
}

function render_main(model) {
  return (
    section(["class=main", "style=display: block;"], [
      input(["id=toggle-all", "class=toggle-all", "type=checkbox"], []),
      label(["for=toggle-all"], [ text("Mark all as complete") ]),
      ul(["class=todo-list"],
        model.todos.map(function (item) { return render_item(item) })
      ) // </ul>
    ]) // </section>
  )
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
    render_item: render_item, // export so that we can unit test
    render_main: render_main,
  }
}


})(); // https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
