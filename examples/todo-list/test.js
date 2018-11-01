var id = 'test-app';

test('update({counters:[0]}) returns {counters:[0]} (current state unmodified)',
    function(assert) {
  var result = update({counters:[0]});
  assert.equal(result.counters[0], 0);
});

test('Test Update increment: update(1, "inc") returns 2', function(assert) {
  var result = update({counters: [1] }, "inc");
  console.log('result', result);
  assert.equal(result.counters[0], 2);
});


test('Test Update decrement: update(1, "dec") returns 0', function(assert) {
  var result = update({counters: [1] }, "dec");
  assert.equal(result.counters[0], 0);
});

test('Test negative state: update(-9, "inc") returns -8', function(assert) {
  var result = update({counters: [-9] }, "inc");
  assert.equal(result.counters[0], -8);
});

test('mount({model: 7, update: update, view: view}, "'
  + id +'") sets initial state to 7', function(assert) {
  mount({counters:[7]}, update, view, id);
  var state = document.getElementById(id)
    .getElementsByClassName('count')[0].textContent;
  assert.equal(state, 7);
});

test('empty("test-app") should clear DOM in root node', function(assert) {
  empty(document.getElementById(id));
  mount({counters:[7]}, update, view, id);
  empty(document.getElementById(id));
  var result = document.getElementById(id).innerHtml
  assert.equal(result, undefined);
});

test('click on "+" button to re-render state (increment model by 1)',
function(assert) {
  document.body.appendChild(div(id));
  mount({counters:[7]}, update, view, id);
  document.getElementById(id).getElementsByClassName('inc')[0].click();
  var state = document.getElementById(id)
    .getElementsByClassName('count')[0].textContent;
  assert.equal(state, 8); // model was incremented successfully
  empty(document.getElementById(id)); // clean up after tests
});

// Reset Functionality

test('Test reset counter when model/state is 6 returns 0', function(assert) {
  var result = update({counters:[7]}, "reset");
  assert.equal(result.counters[0], 0);
});

test('reset button should be present on page', function(assert) {
  var reset = document.getElementsByClassName('reset');
  assert.equal(reset.length, 3);
});

test('Click reset button resets state to 0', function(assert) {
  mount({counters:[7]}, update, view, id);
  var root = document.getElementById(id);
  assert.equal(root.getElementsByClassName('count')[0].textContent, 7);
  var btn = root.getElementsByClassName("reset")[0]; // click reset button
  btn.click(); // Click the Reset button!
  var state = root.getElementsByClassName('count')[0].textContent;
  assert.equal(state, 0); // state was successfully reset to 0!
  empty(root); // clean up after tests
});
