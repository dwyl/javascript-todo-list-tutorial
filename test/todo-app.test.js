const test = require('tape');       // https://github.com/dwyl/learn-tape
const fs = require('fs');           // to read html files (see below)
const path = require('path');       // so we can open files cross-platform
const html = fs.readFileSync(path.resolve(__dirname,
  '../examples/todo-list/index.html')); // sample HTML file to initialise JSDOM.
require('jsdom-global')(html);      // https://github.com/rstacruz/jsdom-global
const app = require('../examples/todo-list/todo-app.js'); // functions to test
const id = 'test-app';              // all tests use 'test-app' as root element
const elmish = require('../examples/todo-list/elmish.js'); // import "empty" etc

test('todo `model` (Object) has desired keys', function (t) {
  const keys = Object.keys(app.model);
  t.deepEqual(keys, ['todos', 'hash'], "`todos` and `hash` keys are present.");
  t.true(Array.isArray(app.model.todos), "model.todos is an Array")
  t.end();
});

test('todo `update` default case should return model unmodified', function (t) {
  const model = JSON.parse(JSON.stringify(app.model));
  const unmodified_model = app.update('UNKNOWN_ACTION', model);
  t.deepEqual(model, unmodified_model, "model returned unmodified");
  t.end();
});

test('`ADD` a new todo item to model.todos Array via `update`', function (t) {
  const model = JSON.parse(JSON.stringify(app.model)); // initial state
  t.equal(model.todos.length, 0, "initial model.todos.length is 0");
  const updated_model = app.update('ADD', model, "Add Todo List Item");
  const expected = { id: 1, title: "Add Todo List Item", done: false };
  t.equal(updated_model.todos.length, 1, "updated_model.todos.length is 1");
  t.deepEqual(updated_model.todos[0], expected, "Todo list item added.");
  t.end();
});

test('`TOGGLE` a todo item from done=false to done=true', function (t) {
  const model = JSON.parse(JSON.stringify(app.model)); // initial state
  const model_with_todo = app.update('ADD', model, "Toggle a todo list item");
  const item = model_with_todo.todos[0];
  const model_todo_done = app.update('TOGGLE', model_with_todo, item.id);
  const expected = { id: 1, title: "Toggle a todo list item", done: true };
  t.deepEqual(model_todo_done.todos[0], expected, "Todo list item Toggled.");
  t.end();
});

test('`TOGGLE` (undo) a todo item from done=true to done=false', function (t) {
  const model = JSON.parse(JSON.stringify(app.model)); // initial state
  const model_with_todo = app.update('ADD', model, "Toggle a todo list item");
  const item = model_with_todo.todos[0];
  const model_todo_done = app.update('TOGGLE', model_with_todo, item.id);
  const expected = { id: 1, title: "Toggle a todo list item", done: true };
  t.deepEqual(model_todo_done.todos[0], expected, "Toggled done=false >> true");
  // add another item before "undoing" the original one:
  const model_second_item = app.update('ADD', model_todo_done, "Another todo");
  t.equal(model_second_item.todos.length, 2, "there are TWO todo items");
  // Toggle the original item such that: done=true >> done=false
  const model_todo_undone = app.update('TOGGLE', model_second_item, item.id);
  const undone = { id: 1, title: "Toggle a todo list item", done: false };
  t.deepEqual(model_todo_undone.todos[0],undone, "Todo item Toggled > undone!");
  t.end();
});

test('render_item HTML for a single Todo Item', function (t) {
  const model = {
    todos: [
      { id: 1, title: "Learn Elm Architecture", done: true },
    ],
    hash: '#/' // the "route" to display
  };
  // render the ONE todo list item:
  document.getElementById(id).appendChild(app.render_item(model.todos[0]))

  const done = document.querySelectorAll('.completed')[0].textContent;
  t.equal(done, 'Learn Elm Architecture', 'Done: Learn "TEA"');

  const checked = document.querySelectorAll('input')[0].checked;
  t.equal(checked, true, 'Done: ' + model.todos[0].title + " is done=true");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});

test('render "main" view using (elmish) HTML DOM functions', function (t) {
  const model = {
    todos: [
      { id: 1, title: "Learn Elm Architecture", done: true },
      { id: 2, title: "Build Todo List App",    done: false },
      { id: 3, title: "Win the Internet!",      done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the "main" view and append it to the DOM inside the `test-app` node:
  console.log(app.render_item(model.todos[0]));
  // elmish.append_childnodes(app.render_main(model), document.getElementById(id));
  // const done = document.querySelectorAll('.completed')[0].textContent;
  // t.equal(done, 'Learn Elm Architecture', 'Done: Learn "TEA"');
  // const todo = document.querySelectorAll('.view')[1].textContent;
  // t.equal(todo, 'Build Todo List App', 'Todo: Build Todo List App');
  // const todos = document.querySelectorAll('.toggle');
  // [true, false, false].forEach(function(state, index){
  //   t.equal(todos.checked, state, "Todo #" + index + " is done=" + state)
  // })
  // elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});
