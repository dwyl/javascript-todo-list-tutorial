const test = require('tape');       // https://github.com/dwyl/learn-tape
const fs = require('fs');           // to read html files (see below)
const path = require('path');       // so we can open files cross-platform
const html = fs.readFileSync(path.resolve(__dirname,
  '../examples/todo-list/index.html')); // sample HTML file to initialise JSDOM.
require('jsdom-global')(html);      // https://github.com/rstacruz/jsdom-global
const app = require('../examples/todo-list/todo-app.js'); // functions to test
const id = 'test-app';              // all tests use 'test-app' as root element
const elmish = require('../examples/todo-list/elmish.js'); // import "empty" etc

test('`model` (Object) has desired keys', function (t) {
  const keys = Object.keys(app.model);
  t.deepEqual(keys, ['todos', 'hash'], "`todos` and `hash` keys are present.");
  t.true(Array.isArray(app.model.todos), "model.todos is an Array")
  t.end();
});

test('`update` default case should return model unmodified', function (t) {
  const model = JSON.parse(JSON.stringify(app.model));
  const unmodified_model = app.update('UNKNOWN_ACTION', model);
  t.deepEqual(model, unmodified_model, "model returned unmodified");
  t.end();
});

test('update `ADD` a new todo item to model.todos Array', function (t) {
  const model = JSON.parse(JSON.stringify(app.model)); // initial state
  t.equal(model.todos.length, 0, "initial model.todos.length is 0");
  const updated_model = app.update('ADD', model, "Add Todo List Item");
  const expected = { id: 1, title: "Add Todo List Item", done: false };
  t.equal(updated_model.todos.length, 1, "updated_model.todos.length is 1");
  t.deepEqual(updated_model.todos[0], expected, "Todo list item added.");
  t.end();
});

test('update `TOGGLE` a todo item from done=false to done=true', function (t) {
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
  document.getElementById(id).appendChild(
    app.render_item(model.todos[0]),
  )

  const done = document.querySelectorAll('.completed')[0].textContent;
  t.equal(done, 'Learn Elm Architecture', 'Done: Learn "TEA"');

  const checked = document.querySelectorAll('input')[0].checked;
  t.equal(checked, true, 'Done: ' + model.todos[0].title + " is done=true");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});

test('render_main "main" view using (elmish) HTML DOM functions', function (t) {
  const model = {
    todos: [
      { id: 1, title: "Learn Elm Architecture", done: true },
      { id: 2, title: "Build Todo List App",    done: false },
      { id: 3, title: "Win the Internet!",      done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the "main" view and append it to the DOM inside the `test-app` node:
  document.getElementById(id).appendChild(app.render_main(model));
  // test that the title text in the model.todos was rendered to <label> nodes:
  document.querySelectorAll('.view').forEach(function (item, index) {
    t.equal(item.textContent, model.todos[index].title,
      "index #" + index + " <label> text: " + item.textContent)
  })

  const inputs = document.querySelectorAll('input'); // todo items are 1,2,3
  [true, false, false].forEach(function(state, index){
    t.equal(inputs[index + 1].checked, state,
      "Todo #" + index + " is done=" + state)
  })
  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});

test('render_footer view using (elmish) HTML DOM functions', function (t) {
  const model = {
    todos: [
      { id: 1, title: "Learn Elm Architecture", done: true },
      { id: 2, title: "Build Todo List App",    done: false },
      { id: 3, title: "Win the Internet!",      done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render_footer view and append it to the DOM inside the `test-app` node:
  document.getElementById(id).appendChild(app.render_footer(model));

  // todo-count should display 2 items left (still to be done):
  const left = document.getElementById('count').innerHTML;
  t.equal(left, "<strong>2</strong> items left", "Todos remaining: " + left);

  // count number of footer <li> items:
  t.equal(document.querySelectorAll('li').length, 3, "3 <li> in <footer>");

  // check footer link text and href:
  const link_text = ['All', 'Active', 'Completed'];
  const hrefs = ['#/', '#/active', '#/completed'];
  document.querySelectorAll('a').forEach(function (a, index) {
    // check link text:
    t.equal(a.textContent, link_text[index], "<footer> link #" + index
      + " is: " + a.textContent + " === " + link_text[index]);
    // check hrefs:
    t.equal(a.href.replace('about:blank', ''), hrefs[index],
    "<footer> link #" + index + " href is: " + hrefs[index]);
  });

  // check for "Clear completed" button in footer:
  const clear = document.querySelectorAll('.clear-completed')[0].textContent;
  t.equal(clear, 'Clear completed', '<button> in <footer> "Clear completed"');

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});

test('render_footer 1 item left (pluarisation test)', function (t) {
  const model = {
    todos: [
      { id: 1, title: "Be excellent to each other!", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render_footer view and append it to the DOM inside the `test-app` node:
  document.getElementById(id).appendChild(app.render_footer(model));

  // todo-count should display "1 item left" (still to be done):
  const left = document.getElementById('count').innerHTML;
  t.equal(left, "<strong>1</strong> item left", "Todos remaining: " + left);

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});

test('view renders the whole todo app using "partials"', function (t) {
  // render the view and append it to the DOM inside the `test-app` node:
  document.getElementById(id).appendChild(app.view(app.model)); // initial_model

  t.equal(document.querySelectorAll('h1')[0].textContent, "todos", "<h1>todos");
  // placeholder:
  const placeholder = document.getElementById('new-todo')
    .getAttribute("placeholder");
  t.equal(placeholder, "What needs to be done?", "paceholder set on <input>");

  // todo-count should display 0 items left (based on initial_model):
  const left = document.getElementById('count').innerHTML;
  t.equal(left, "<strong>0</strong> items left", "Todos remaining: " + left);

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});

test('1. No Todos, should hide #footer and #main', function (t) {
  // render the view and append it to the DOM inside the `test-app` node:
  document.getElementById(id).appendChild(app.view({todos: []})); // No Todos

  const main_display = window.getComputedStyle(document.getElementById('main'));
  t.equal(main_display._values.display, 'none', "No Todos, hide #main");

  const main_footer= window.getComputedStyle(document.getElementById('footer'));
  t.equal(main_footer._values.display, 'none', "No Todos, hide #footer");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});

// Testing localStorage requires "polyfil" because:a
// https://github.com/jsdom/jsdom/issues/1137 ¯\_(ツ)_/¯
// globals are usually bad! but a "necessary evil" here.
global.localStorage = global.localStorage ? global.localStorage : {
  getItem: function(key) {
   const value = this[key];
   return typeof value === 'undefined' ? null : value;
 },
 setItem: function (key, value) {
   this[key] = value;
 },
 removeItem: function (key) {
   delete this[key]
 }
}
localStorage.removeItem('elmish_store');

test('2. New Todo, should allow me to add todo items', function (t) {
  elmish.empty(document.getElementById(id));
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount({todos: []}, app.update, app.view, id, app.subscriptions);
  const new_todo = document.getElementById('new-todo');
  // "type" content in the <input id="new-todo">:
  const todo_text = 'Make Everything Awesome!     '; // deliberate whitespace!
  new_todo.value = todo_text;
  // trigger the [Enter] keyboard key to ADD the new todo:
  document.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 13}));
  const items = document.querySelectorAll('.view');
  t.equal(items.length, 1, "should allow me to add todo items");
  // check if the new todo was added to the DOM:
  const actual = document.getElementById('1').textContent;
  t.equal(todo_text.trim(), actual, "should trim text input")

  // subscription keyCode trigger "branch" test (should NOT fire the signal):
  const clone = document.getElementById(id).cloneNode(true);
  document.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 42}));
  t.deepEqual(document.getElementById(id), clone, "#" + id + " no change");

  // check that the <input id="new-todo"> was reset after the new item was added
  t.equal(new_todo.value, '',
    "should clear text input field when an item is added")

  const main_display = window.getComputedStyle(document.getElementById('main'));
  t.equal('block', main_display._values.display,
    "should show #main and #footer when items added");
  const main_footer= window.getComputedStyle(document.getElementById('footer'));
  t.equal('block', main_footer._values.display, "item added, show #footer");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('elmish_' + id);
  t.end();
});


test('3. Mark all as completed ("TOGGLE_ALL")', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Learn Elm Architecture", done: true },
      { id: 1, title: "Build Todo List App",    done: false },
      { id: 2, title: "Win the Internet!",      done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // confirm that the ONLY the first todo item is done=true:
  const items = document.querySelectorAll('.view');

  document.querySelectorAll('.toggle').forEach(function(item, index) {
    t.equal(item.checked, model.todos[index].done,
      "Todo #" + index + " is done=" + item.checked
      + " text: " + items[index].textContent)
  })

  // click the toggle-all checkbox to trigger TOGGLE_ALL: >> true
  document.getElementById('toggle-all').click(); // click toggle-all checkbox
  document.querySelectorAll('.toggle').forEach(function(item, index) {
    t.equal(item.checked, true,
      "TOGGLE each Todo #" + index + " is done=" + item.checked
      + " text: " + items[index].textContent)
  });
  t.equal(document.getElementById('toggle-all').checked, true,
    "should allow me to mark all items as completed")


  // click the toggle-all checkbox to TOGGLE_ALL (again!) true >> false
  document.getElementById('toggle-all').click(); // click toggle-all checkbox
  document.querySelectorAll('.toggle').forEach(function(item, index) {
    t.equal(item.checked, false,
      "TOGGLE_ALL Todo #" + index + " is done=" + item.checked
      + " text: " + items[index].textContent)
  })
  t.equal(document.getElementById('toggle-all').checked, false,
    "should allow me to clear the completion state of all items")

  // *manually* "click" each todo item:
  document.querySelectorAll('.toggle').forEach(function(item, index) {
    item.click(); // this should "toggle" the todo checkbox to done=true
    t.equal(item.checked, true,
      ".toggle.click() (each) Todo #" + index + " which is done=" + item.checked
      + " text: " + items[index].textContent)
  });
  // the toggle-all checkbox should be "checked" as all todos are done=true!
  t.equal(document.getElementById('toggle-all').checked, true,
    "complete all checkbox should update state when items are completed")

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('elmish_store');
  t.end();
});

test('4. DELETE an item', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  const item = document.getElementById('0')
  t.equal(item.textContent, model.todos[0].title, 'Item contained in model.');
  // confirm that the todo item is NOT done (done=false):
  t.equal(document.querySelectorAll('.toggle')[0].checked, false,
  'Item starts out "active" (done=false)');


  // click the checkbox to toggle it to done=true
  document.querySelectorAll('.toggle')[0].click()
  t.equal(document.querySelectorAll('.toggle')[0].checked, true,
  'Item should allow me to mark items as complete');

  // click the checkbox to toggle it to done=false "undo"
  document.querySelectorAll('.toggle')[0].click()
  t.equal(document.querySelectorAll('.toggle')[0].checked, false,
  'Item should allow me to un-mark items as complete');
  t.end();
});

test.only('4.1 DELETE item by clicking <button class="destroy">', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // const todo_count = ;
  t.equal(document.querySelectorAll('.destroy').length, 1, "one destroy button")

  const item = document.getElementById('0')
  t.equal(item.textContent, model.todos[0].title, 'Item contained in model.');
  // DELETE the item by clicking on the <button class="destroy">:
  const button = item.querySelectorAll('button.destroy')[0];
  button.click()
  // confirm that there is no loger a <button class="destroy">
  t.equal(document.querySelectorAll('button.destroy').length, 0,
    'there is no loger a <button class="destroy"> as the only item was DELETEd')
  t.end();
});
