var id = 'test-app'

test('create test div', function(assert) {
  document.body.appendChild(div(id));
  var result = document.getElementById(id).innerHtml;
  assert.equal(result, undefined);
})

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

test('Test negative state: update(-9, "inc") returns -8', function(assert) {
  var result = update(-9, "inc");
  assert.equal(result, -8);
});

test('mount test-app with model: 7', function(assert) {
  var init = {model: 7, update: update, view: view};
  mount(init, id);
  var state = document.getElementById(id).textContent.replace(/-+/, '');
  // console.log('state',  state);
  assert.equal(state, 7);
});

test('empty test-app should be an empty DOM node', function(assert) {
  empty(document.getElementById(id));
  var init = {model: 7, update: update, view: view};
  mount(init, id);
  empty(document.getElementById(id));
  var result = document.getElementById(id).innerHtml
  assert.equal(result, undefined);
});

test('click on button to re-render state', function(assert) {
  document.body.appendChild(div(id));
  var init = {model: 7, update: update, view: view};
  mount(init, id);
  document.getElementsByTagName('button')[2].click();
  var state = document.getElementById(id).textContent.replace(/-+/, '');
  assert.equal(state, 8);
  // clean up after tests:
  empty(document.getElementById(id));
});
