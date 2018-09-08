var id = 'test-app';

test('Test Update update(0) returns 0 (current state)', function(assert) {
  var result = update('unrecognised', 0);
  assert.equal(result, 0);
});

test('Test Update increment: update(1, "inc") returns 2', function(assert) {
  var result = update("inc", 1,);
  assert.equal(result, 2);
});

test('Test Update decrement: update("dec", 3) returns 2', function(assert) {
  var result = update("dec", 3);
  assert.equal(result, 2);
});

test('Test negative state: update("inc", -9) returns -8', function(assert) {
  var result = update("inc", -9, );
  assert.equal(result, -8);
});

test('mount({model: 7, update: update, view: view}, "'
  + id +'") sets initial state to 7', function(assert) {
  mount(7, update, view, id);
  var state = document.getElementById(id)
    .getElementsByClassName('count')[0].textContent;
  assert.equal(state, 7);
});

test('empty("test-app") should clear DOM in root node', function(assert) {
  empty(document.getElementById(id));
  mount(7, update, view, id);
  empty(document.getElementById(id));
  var result = document.getElementById(id).innerHtml
  assert.equal(result, undefined);
});

test('click on "+" button to re-render state (increment model by 1)',
function(assert) {
  document.body.appendChild(div(id));
  mount(7, update, view, id);
  document.getElementById(id).getElementsByClassName('inc')[0].click();
  var state = document.getElementById(id)
    .getElementsByClassName('count')[0].textContent;
  assert.equal(state, 8); // model was incremented successfully
  empty(document.getElementById(id)); // clean up after tests
});

// Reset Functionality

test('Test reset counter when model/state is 6 returns 0', function(assert) {
  var result = update("reset", 6);
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
