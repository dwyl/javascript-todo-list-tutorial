# _Multiple_ Counters Exercise!

There are (_at least_) two ways
of displaying multiple counters on the same page.

The _easy_ way is to "_instantiate_" several counters
each within their own "container" (DOM) element. e.g: <br />
```html
<script src="counter.js" data-cover></script> <!-- load counter once -->
<div id="app"></div>
<div id="app1"></div>
<div id="app2"></div>
<script> // Mount as many apps as you like:
 mount(0, update, view, 'app');
 mount(1, update, view, 'app1');
 mount(2, update, view, 'app2');
</script>
```

![elm-arch-multiple-counters-naive](https://user-images.githubusercontent.com/194400/41302789-5299bd5e-6e63-11e8-8006-84313c54a24c.png)
see:
[/examples/multiple-counters-instances/index.html](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/master/examples/multiple-counters-instances/index.html)


This "_works_" and "_satisfies_ the _requirement_"
of having multiple counters on the same "page". <br />
_However_, it's not a "sustainable" way of "extending"
an app for the long term. <br />
Almost no "_real_" web application uses an `Integer` as the `model`,
so the "_complexity_" of the model will be much greater.

We could leave the counter example `model` as an `Integer`
and move on to the _next_ example (_Todo List_),
but as a "_thought experiment_",
let's try to implement _multiple counters_ using an `Array` of `Integers`,
this is a good "**refactoring**" exercise.



## 1. Refactor Model from `Integer` to `Object` with `Array`

Using the code from
[`example/counter-reset`](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/counter-reset)
as a starting point,
refactor the `model` from `Integer` to an `Object` with an `Array`
called  `counters`: <br />
```js
mount({counters:[0]}, update, view, 'app');
```

That will "_break_" the existing tests:
![counter-tests-broken](https://user-images.githubusercontent.com/194400/41207245-f49b8caa-6d09-11e8-9fb9-ee9509e8b56b.png)

(_I **temporarily commented out** all the other failing tests
  to reduce noise, but by the time we are done refactoring,
  all tests will pass!_)

### 1.1 Make Tests Pass Again?

When refactoring the _convention_ is to ***not touch the tests***,
_However_ the _first_ test in our `test.js` file checks the `state`
of the `model` if no _action_ is passed into the `update` function:
```js
test('Test Update update(0) returns 0 (current state)', function(assert) {
  var result = update(0);
  assert.equal(result, 0);
});
```
This test is still _relevant_ because the Elm Architecture _always_
returns the `model` _unchanged_ if no `action` is given. <br />
We need to _update_ this test to reflect the change in the `model` signature:
```js
test('update({counters:[0]}) returns {counters:[0]} (current state unmodified)', function(assert) {
  var result = update({counters:[0]});
  assert.equal(result.counters[0], 0);
});
```

Snapshot of the code/changes required to make tests pass again:
https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/41/commits/c65d491d69d2d68964df36817ccbff9de3275f0b



## 2. Render Multiple Counters using New Model

Updating the `model` was the _start_ of our refactoring journey,
if we were to include multiple elements in the `counters` `Array`
now, before updating the `view` function,
we would still only see _one_
counter on the page because our `view`
does not _yet_ "know" how to render multiple counters.


### 2.1 Update the `view` function

Given that we have updated the `model` to be a an `Object`
with a `counters` `Array`, we need to update our `view` function
to render as many counters as we have elements
in the `counters` `Array`.

_First_ create a "container" DOM element so each counter
(_the increment, decrement and reset buttons
  and text display of the current counter value_)
can be "wrapped" together:

```js
function container(index, elements) {
  var con = document.createElement('section');
  con.id = index;
  con.className = 'counter';
  elements.forEach(function(el) { con.appendChild(el) });
  return con;
}
```

This `container` function will be used
in the re-worked `view` function (_which we are modifying next!_)

Let's modify the `view` function to accommodate

#### Before:

```js
function view(signal, model, root) {
  empty(root);                                 // clear root element before
  [                                            // Store DOM nodes in an array
    button('+', signal, Inc),                  // then iterate to append them
    div('count', model),                       // create div with stat as text
    button('-', signal, Dec),                  // decrement counter
    button('Reset', signal, Res)               // reset counter
  ].forEach(function(el){ root.appendChild(el) }); // forEach is ES5 so IE9+
}
```

#### After:

```js
function view(signal, model, root) {
  empty(root); // clear root element before re-rendering the App (DOM).
  model.counters.map(function(counter, index) { // one counter for each
    return container(index, [                // wrap DOM nodes in an "container"
      button('+', signal, Inc + '-' + index),    // append index to action
      div('count', counter),       // create div w/ count as text
      button('-', signal, Dec + '-' + index),    // decrement counter
      button('Reset', signal, Res + '-' + index) // reset counter
    ]);
  }).forEach(function (el) { root.appendChild(el) }); // forEach is ES5 so IE9+
}
```
The key differences are:
+ Wrapping the counter in a "container" DOM element.
+ Appending the index (_in the `model.counters` Array_)
to each `action` e.g: `Inc + '-' + index`
such that each button is unique and we can derive the
_exact_ counter that needs to be Incremented.


### 2.2 Refactor the `update` function

The `update` function needs to be updated to support

#### Before:

```js
function update(model, action) {     // Update function takes the current state
  switch(action) {                   // and an action (String) runs a switch
    case Inc: return model + 1;      // add 1 to the model
    case Dec: return model - 1;      // subtract 1 from model
    case Res: return 0;              // reset state to 0 (Zero) git.io/v9KJk
    default: return model;           // if no action, return curent state.
  }                                  // (default action always returns current)
}
```

#### After:

```js
function update(model, action) {
  var parts = action ? action.split('-') : []; // e.g: inc-0 where 0 is the counter "id"
  var act = parts[0];
  var index = parts[1] || 0; // default to 0 (assume only one counter)
  var new_model = JSON.parse(JSON.stringify(model)) // "clone" the model
  switch(act) {                   // and an action (String) runs a switch
    case Inc:
      new_model.counters[index] = model.counters[index] + 1;
      break;
    case Dec:
      new_model.counters[index] = model.counters[index] - 1;
      break;
    case Res: // use ES6 Array.fill to create a new array with values set to 0:
      new_model.counters[index] = 0;
      break;
    default: return model; // if action not defined, return current state.
  }
  return new_model;
}
```

Try it: http://127.0.0.1:8000/examples/multiple-counters/?coverage

![image](https://user-images.githubusercontent.com/194400/41462055-7b7158a4-7089-11e8-829e-cc8f0d9ba74a.png)


If you can _simplify_ this code,
we're happy to receive a Pull Request!
Share your thoughts on:
https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/40
