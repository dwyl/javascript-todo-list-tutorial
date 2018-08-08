const test = require('tape'); // see: https://github.com/dwyl/learn-tape
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname,
  '../examples/counter-reset/index.html'));
require('jsdom-global')(html);
const counter = require(path.resolve(__dirname,
  '../examples/counter-reset/counter.js'));
const { view, mount, update, div, button, empty, init} = counter;
const id = 'test-app';

test('Mount app expect state to be Zero', function (t) {
  // console.log('mount', mount);
  mount(0, update, view, id);
  // console.log('document.getElementById(id)', document.getElementById(id), document.getElementById(id).childElementCount);
  var actual = document.getElementById(id).textContent;
  // console.log('actual:', actual);
  var actual_stripped = parseInt(actual.replace('+', '').replace('-Reset', ''), 10);
  var expected = 0;
  t.equal(actual_stripped, expected, "Inital state set to 0.");
  t.end()
});

test('Test Update update("", 0) returns 0 (current state)', function (t) {
  var result = update('', 0);
  t.equal(result, 0, "Initial state: 0, No Action, Final state: 0");
  t.end();
});

test('Test Update increment: update("inc", 1) returns 2', function (t) {
  var result = update("inc", 1);
  t.equal(result, 2, "Initial state: 1, Increment once, Final state: 2");
  t.end();
});

test('Test Update decrement: update("dec", 1) returns 0', function (t) {
  var result = update("dec", 1);
  t.equal(result, 0, "Initial state: 1, Decrement once, Final state: 0");
  t.end();
});


test('click on "+" button (increment model by 1)', function (t) {
  // console.log('document', typeof document, document);
  empty(document.getElementById(id));
  document.body.appendChild(div(id));
  mount(7, update, view, id);

  // see: http://stackoverflow.com/questions/27557624/simulating-click-jsdom
  // var evt = document.createEvent("HTMLEvents");
  const evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, true);
  var btn = document.getElementById('inc');

  btn.addEventListener('click', function() {
    // console.log('increment button CLICKed!!');
    var state = parseInt( document.getElementById(id)
      .getElementsByClassName('count')[0].innerHTML, 10);
    // console.log('state:', state, 'typeof state:', typeof state);
    t.equal(state, 8,
    "End State is 8 after incrementing 7 by 1 (as expected)"); // incremented
    t.end();
  });

  btn.dispatchEvent(evt);
});

test('Click reset button resets state to 0', function (t) {
  var root = document.getElementById(id);
  empty(root);
  mount(7, update, view, id);
  var state7 = parseInt(root.getElementsByClassName('count')[0].textContent, 10)
  t.equal(state7, 7, "State is 7 after mounting with initial state=7");
  var btn = root.getElementsByClassName("reset")[0]; // click reset button
  btn.click(); // Click the Reset button!
  var state0 = parseInt(root.getElementsByClassName('count')[0].textContent, 10)
  t.equal(state0, 0, "State is 0 (Zero) after reset."); // state reset to 0!
  empty(root); // clean up after tests
  // console.log('STATE:', state);
  t.end()
});

// Reset Functionality

test('Test reset counter when model/state is 6 returns 0', function(t) {
  var result = update("reset", 6);
  t.equal(result, 0, "counter reset to 0 (Zero)");
  t.end()
});

test('Click reset button resets state to 0', function(t) {
  mount(7, update, view, id);
  var root = document.getElementById(id);
  var state7 = parseInt(root.getElementsByClassName('count')[0].textContent, 10)
  t.equal(state7, 7, "initial state is 7 as expected");
  var btn = root.getElementsByClassName("reset")[0]; // click reset button
  btn.click(); // Click the Reset button!
  var state = parseInt(root.getElementsByClassName('count')[0].textContent, 10);
  t.equal(state, 0, "State is 0 (Zero) after reset."); // state reset to 0!
  empty(root); // clean up after tests
  t.end()
});
