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
see: [link to multiple counter instances code]


This "_works_" and "_satisfies_ the _requirement_"
of having multiple counters on the same "page".
_However_, it's not a "sustainable" way of "extending" an app for the long term.
Almost no "_real_" web application uses an `Integer` as the `model`.

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

(_I **temporarily commented out** all the other failing tests to reduce noise,
  but by the time we are done refactoring, all tests will pass!_)

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
returns the `model` _unchanged_ if no `action` is given.
We need to _update_ this test to reflect the change in the `model` signature:
```js
test('Test update({counters:[0]}) returns {counters:[0]} (current state unmodified)', function(assert) {
  var result = update({counters:[0]});
  assert.equal(result.counters[0], 0);
});
```


Code changes to make tests pass again:
https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/41/commits/c65d491d69d2d68964df36817ccbff9de3275f0b

> _**Note**: the [**Elephant in the room**](https://en.wikipedia.org/wiki/Elephant_in_the_room)
is that **both** the_ `view` _and_ `update` _functions_
_need to be "updated" to "work" with multiple counters_...


## 2. Render Multiple Counters using New Model
