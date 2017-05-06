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

test('mount test-app with model: 7', function(assert) {
  var init = {model: 7, update: update, view: view};
  mount(init, 'test-app');
  var state = document.getElementById('test-app').textContent.replace(/-+/, '');
  // console.log('state',  state);
  assert.equal(state, 7);
});

test('empty test-app should be an empty DOM node', function(assert) {
  empty(document.getElementById('test-app'));
  var init = {model: 7, update: update, view: view};
  mount(init, 'test-app');
  empty(document.getElementById('test-app'));
  var result = document.getElementById('test-app').innerHtml;
  assert.equal(result, undefined);
});

test('click on button to re-render state', function(assert) {
  var init = {model: 7, update: update, view: view};
  mount(init, 'test-app');
  document.getElementsByTagName('button')[2].click();
  var state = document.getElementById('test-app').textContent.replace(/-+/, '');
  assert.equal(state, 8);
  // clean up after tests:
  empty(document.getElementById('test-app'));
});
