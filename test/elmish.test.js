const test = require('tape');         // https://github.com/dwyl/learn-tape
const fs = require('fs');
const path = require('path');
const elmish = require(path.resolve(__dirname,
  '../examples/todo-list/elmish.js'))
const html = fs.readFileSync(path.resolve(__dirname,
  '../examples/todo-list/index.html'));
require('jsdom-global')(html); // https://github.com/rstacruz/jsdom-global
elmish.init(document); // pass the JSDOM into counter.js
const id = 'test-app';

test('empty("root") removes DOM elements from container', function (t) {
  // setup the test div:
  const text = 'Hello World!'
  const root = document.getElementById(id);
  const div = document.createElement('div');
  div.id = 'mydiv';
  const txt = document.createTextNode(text);
  div.appendChild(txt);
  root.appendChild(div);
  // check text of the div:
  const actual = document.getElementById('mydiv').textContent;
  t.equal(actual, text, "Contents of mydiv is: " + actual + ' == ' + text);
  t.equal(root.childElementCount, 1, "Root element " + id + " has 1 child el");
  // empty the root DOM node:
  elmish.empty(root);
  t.equal(root.childElementCount, 0, "After empty(root) has 0 child elements!")
  t.end();
});

// test('Mount app expect state to be Zero', function (t) {
//   mount(0, update, view, id);
//   var actual = document.getElementById(id).textContent;
//   var actual_stripped = parseInt(actual.replace('+', '').replace('-Reset', ''), 10);
//   var expected = 0;
//   t.equal(expected, actual_stripped, "Inital state set to 0.");
//   t.end()
// });
//
// test('Test Update update(0) returns 0 (current state)', function (t) {
//   var result = update(0);
//   t.equal(result, 0, "Initial state: 0, No Action, Final state: 0");
//   t.end();
// });
