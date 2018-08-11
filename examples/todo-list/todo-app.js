/* if require is available, it means we are in Node.js Land i.e. testing! */
/* istanbul ignore next */
if (typeof require !== 'undefined' && this.window !== this) {
  var { a, button, div, empty, footer, input, h1, header, label, li, mount,
    route, section, span, strong, text, ul } = require('./elmish.js');
}

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
  // console.log('> > > > > > > > > > > model', model);
  switch(action) {                   // and an action (String) runs a switch
    case 'ADD':
      // can you see an "issue" with this way of generating the todo id? Bug...?
      var id = (typeof model.todos !== 'undefined' && model.todos.length > 0) ?
        (model.todos.length + 1) : 1;
      var input = document.getElementById('new-todo');
      // console.log('new_model.todos', new_model.todos);
      new_model.todos = (new_model.todos && new_model.todos.length > 0)
        ? new_model.todos : [];
      // console.log('new_model.todos', new_model.todos);
      new_model.todos.push({
        id: id,
        title: data || input.value.trim(),
        done: false
      });
      break;
    case 'TOGGLE':
      new_model.todos.forEach(function (item) { // takes 1ms on a "slow mobile"
        if(item.id === data) {    // this should only "match" one item.
          item.done = !item.done; // invert state of "done" e.g false >> true
        }
      });
      // if all todos are done=true then "check" the "toggle-all" checkbox:
      var all_done = new_model.todos.filter(function(item) {
        // console.log('> > > > > >item.done:', item.done);
        return item.done === false; // only care about items that are NOT done
      }).length;
      // console.log(' >>>> all_done', all_done);
      new_model.all_done = all_done === 0 ? true : false;
      break;
    case 'TOGGLE_ALL':
      new_model.all_done = new_model.all_done ? false : true;
      new_model.todos.forEach(function (item) { // takes 1ms on a "slow mobile"
        item.done = new_model.all_done;
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
function render_item (item, signal) {
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : ""
    ], [
      div(["class=view"], [
        input([
          item.done ? "checked=true" : "",
          "class=toggle",
          "type=checkbox",
          typeof signal === 'function' ? signal('TOGGLE', item.id) : ''
          ],
          []), // <input> does not have any nested elements
        label([], [text(item.title)]),
        button(["class=destroy"])
      ]) // </div>
    ]) // </li>
  )
}

/**
 * `render_main` renders the `<section class="main">` of the Todo List App
 * which contains all the "main" controls and the `<ul>` with the todo items.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} <section> DOM Tree which containing the todo list <ul>, etc.
 */
function render_main (model, signal) {
  // Requirement #1 - No Todos, should hide #footer and #main
  var display = "style=display:"
    + (model.todos && model.todos.length > 0 ? "block" : "none");
  // console.log('display:', display);
  return (
    section(["class=main", "id=main", display], [ // hide if no todo items.
      input(["id=toggle-all", "type=checkbox",
        typeof signal === 'function' ? signal('TOGGLE_ALL') : '',
        (model.all_done ? "checked=checked" : ""),
        "class=toggle-all"
      ], []),
      label(["for=toggle-all"], [ text("Mark all as complete") ]),
      ul(["class=todo-list"],
        (model.todos && model.todos.length > 0) ?
        model.todos.map(function (item) { return render_item(item, signal) })
        : null
      ) // </ul>
    ]) // </section>
  )
}

/**
 * `render_footer` renders the `<footer class="footer">` of the Todo List App
 * which contains count of items to (still) to be done and a `<ul>` "menu"
 * with links to filter which todo items appear in the list view.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} <section> DOM Tree which containing the <footer> element.
 * @example
 * // returns <footer> DOM element with other DOM elements nested:
 * var DOM = render_footer(model);
 */
function render_footer (model, signal) {

  // count how many "active" (not yet done) items by filtering done === false:
  var done = (model.todos && model.todos.length > 0) ?
    model.todos.filter( function (i) { return i.done; }).length : 0;
  // console.log('done:', done);
  var count = (model.todos && model.todos.length > 0) ?
    model.todos.filter( function (i) { return !i.done; }).length : 0;
  // console.log('count:', count);
  // Requirement #1 - No Todos, should hide #footer and #main
  var display = (count > 0 || done > 0) ? "block" : "none";
  // console.log('model:', model, 'count:', count, 'display:', display);

  // number of completed items:
  var done = (model.todos && model.todos.length > 0) ?
    (model.todos.length - count) : 0;
  var display_clear =  (done > 0) ? "block;" : "none;";
  // console.log('display_clear:', display_clear);
  // pluarisation of number of items:
  var left = (" item" + ( count > 1 || count === 0 ? 's' : '') + " left");

  return (
    footer(["class=footer", "id=footer", "style=display:" + display], [
      span(["class=todo-count", "id=count"], [
        strong(count),
        text(left)
      ]),
      ul(["class=filters"], [
        li([], [
          a(["href=#/", "class=selected"], [text("All")])
        ]),
        li([], [
          a(["href=#/active"], [text("Active")])
        ]),
        li([], [
          a(["href=#/completed"], [text("Completed")])
        ])
      ]), // </ul>
      button(["class=clear-completed", "style=display:" + display_clear,
        // signal('CLEAR_COMPLETED')
        ],
        [text("Clear completed")]
      )
    ])
  )
}

/**
 * `view` renders the entire Todo List App
 * which contains count of items to (still) to be done and a `<ul>` "menu"
 * with links to filter which todo items appear in the list view.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} <section> DOM Tree which containing all other DOM elements.
 * @example
 * // returns <section class="todo-app"> DOM element with other DOM els nested:
 * var DOM = view(model);
 */
function view (model, signal) {
  return (
    section(["class=todoapp"], [ // array of "child" elements
      header(["class=header"], [
        h1([], [
          text("todos")
        ]), // </h1>
        input([
          "id=new-todo",
          "class=new-todo",
          "placeholder=What needs to be done?",
          "autofocus"
        ], []) // <input> is "self-closing"
      ]), // </header>
      render_main(model, signal),
      render_footer(model, signal)
    ]) // <section>
  );
}

/**
 * `subscriptions` let us "listen" for events such as "key press" or "click".
 * and respond according to a pre-defined update/action.
 * @param {Function} singal - the Elm Architicture "dispacher" which will run
 * both the "update" and "render" functions when invoked with singal(action)
 */
function subscriptions (signal) {
	var ENTER_KEY = 13; // add a new todo item when [Enter] key is pressed
	var ESCAPE_KEY = 27; // used for "escaping" when editing a Todo item

  document.addEventListener('keyup', function handler (e) {
    var new_todo = document.getElementById('new-todo');
    console.log('e.keyCode', e);
    if (e.keyCode === ENTER_KEY && new_todo.value.length > 0) {
      signal('ADD')(); // invoke singal inner callback
      new_todo.value = ''; // reset <input> so we can add another todo
      document.getElementById('new-todo').focus();
    }
  });
}

/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    model: initial_model,
    update: update,
    render_item: render_item,     // export so that we can unit test
    render_main: render_main,     // export for unit testing
    render_footer: render_footer, // export for unit testing
    subscriptions: subscriptions,
    view: view
  }
}
