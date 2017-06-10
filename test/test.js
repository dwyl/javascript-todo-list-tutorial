var QUnit = require('qunitjs'); // require QUnit node.js module
// alias the QUnit.test method so we don't have to change all our tests
var test = QUnit.test; // stores a copy of QUnit.test
require('qunit-tap')(QUnit, console.log); // use console.log for test output

var jsdom = require("jsdom"); // https://github.com/tmpvar/jsdom
var { JSDOM } = jsdom;
var path = require('path');
// var html = fs.readFileSync(path.resolve(__dirname,
//   '../examples/counter-reset/index.html'));
// var DOM = new JSDOM(html);
var id = 'test-app'
var DOM = new JSDOM(`<!DOCTYPE html><div id="${id}">Hello world</div>`);
var document = DOM.window.document; // shortcut to JSDOM document

test('hello world before mounting app', function(assert){
  var actual = document.getElementById(id).textContent; // "Hello world"
  var expected = "Hello world";
  assert.equal(expected, actual);
});

var counter = require(path.resolve(__dirname,
  '../examples/counter-reset/counter.js'));
var { view, mount, update, div, button, empty, init} = counter;
init(document); // pass the JSDOM into counter.js
// console.log(update.toString());
// console.log(counter.view);
mount(0, update, view, 'test-app');
update(0);
update(1, "inc");
update(1, "dec");
update(1, "reset");
// document.getElementById(id).getElementsByClassName('inc')[0].click();
const evt = document.createEvent("MouseEvents");
evt.initEvent("click", false, true);

var btn = document.getElementById('inc');
// console.log('>> inc', btn);
btn.addEventListener('click', function() {
  console.log('increment button CLICKed!!');
  var state = document.getElementById(id)
    .getElementsByClassName('count')[0].textContent;
  console.log('state:', state);
});

// btn.dispatchEvent(evt);


test('Test Update update(0) returns 0 (current state)', function(assert) {
  var result = update(0);
  assert.equal(result, 0);
});

test('Test Update increment: update(1, "inc") returns 2', function(assert) {
  var result = update(1, "inc");
  assert.equal(result, 2);
});

test('Test Update decrement: update(3, "dec") returns 2', function(assert) {
  var result = update(1, "dec");
  assert.equal(result, 0);
});


test('click on "+" button to re-render state (increment model by 1)',
function(assert) {
  var done = assert.async(); // assertion will be inside click even callback
  document.body.appendChild(div(id));
  mount(7, update, view, id);

  // see: http://stackoverflow.com/questions/27557624/simulating-click-on-document-reactjs-jsdom
  // var evt = document.createEvent("HTMLEvents");
  const evt = document.createEvent("MouseEvents");
  evt.initEvent("click", false, true);

  var btn = document.getElementById('inc');
  // console.log('>> inc', btn);
  btn.addEventListener('click', function() {
    console.log('increment button CLICKed!!');
    var state = document.getElementById(id)
      .getElementsByClassName('count')[0].innerHTML;
    console.log('state:', state);
    assert.equal(state, 8); // model was incremented successfully
    done();
  });

  btn.dispatchEvent(evt);
  // document.getElementById(id).getElementsByClassName('inc')[0].click();
});

test('Click reset button resets state to 0', function(assert) {
  mount(7, update, view, id);
  var root = document.getElementById(id);
  assert.equal(root.getElementsByClassName('count')[0].textContent, 7);
  var btn = root.getElementsByClassName("reset")[0]; // click reset button
  btn.click(); // Click the Reset button!
  var state = root.getElementsByClassName('count')[0].textContent;
  assert.equal(state, 0); // state was successfully reset to 0!
  empty(root); // clean up after tests
  // console.log('STATE:', state);
});

// Reset Functionality

test('Test reset counter when model/state is 6 returns 0', function(assert) {
  var result = update(6, "reset");
  assert.equal(result, 0);
});

test('reset button should be present on page', function(assert) {
  var reset = document.getElementsByClassName('reset');
  assert.equal(reset.length, 1);
});



test('Click reset button resets state to 0', function(assert) {
  mount(7, update, view, id);
  var root = document.getElementById(id);
  assert.equal(root.getElementsByClassName('count')[0].textContent, 7);
  var btn = root.getElementsByClassName("reset")[0]; // click reset button
  btn.click(); // Click the Reset button!
  var state = root.getElementsByClassName('count')[0].textContent;
  assert.equal(state, 0); // state was successfully reset to 0!
  empty(root); // clean up after tests
});

QUnit.load(); // run the tests
