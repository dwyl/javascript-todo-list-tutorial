<div align="center">

# Todo List App JavaScript Tutorial

A **_step-by-step_ tutorial** showing you how to
build a **Todo List App _from scratch_** in **`JavaScript`**.

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/dwyl/javascript-todo-list-tutorial/ci.yml?label=build&style=flat-square&branch=main)](https://github.com/dwyl/javascript-todo-list-tutorial/actions)
[![codecov.io](https://img.shields.io/codecov/c/github/dwyl/javascript-todo-list-tutorial/main.svg?style=flat-square)](https://codecov.io/github/dwyl/javascript-todo-list-tutorial?branch=main)
[![Dependencies: None](https://img.shields.io/badge/dependencies-none-brightgreen.svg?style=flat-square)](https://github.com/dwyl/javascript-todo-list-tutorial/blob/main/package.json#L12 "Zero Dependencies")
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat-square)](https://github.com/dwyl/javascript-todo-list-tutorial/issues)
[![HitCount](https://hits.dwyl.com/dwyl/todo-list-javascript-tutorial.svg)](https://hits.dwyl.com/dwyl/javascript-todo-list-tutorial)
<!-- uncomment when service is working ... [![Inline docs](http://inch-ci.org/github/dwyl/javascript-todo-list-tutorial.svg?branch=main&style=flat-square)](http://inch-ci.org/github/dwyl/javascript-todo-list-tutorial) -->


<a href="https://dwyl.github.io/javascript-todo-list-tutorial/"
 alt="Try the Demo on GitHub Pages!">
  <img src="https://user-images.githubusercontent.com/194400/45237254-10d5e980-b2d6-11e8-8281-b95452bde519.gif"
  alt="Step one: learn JavaScript!">
</a>

</div>

> Before you continue, try the demo: https://dwyl.github.io/javascript-todo-list-tutorial/ <br />

> Add a few items to the list. Double-click/tap the item to edit it.
Check-off your todos and navigate the footer to filter for Active/Completed.
Try and "break" it! Refresh the page and notice how your todo items
are "still there" (_they were saved to `localStorage`!_).
Once you have had a "play" with the demo, come back and _build_ it!!

<hr />

## Why?

The _purpose_ of this **Todo List _mini_ project**
is to _practice_ your "VanillaJS" skills and
_consolidate_ your understanding of The Elm Architecture (TEA)
by creating a real world _useable_ App following _strict_
Documentation and Test Driven Development.

This will _show_ you that it's not only _possible_
to write docs and tests _first_,
you will see _first hand_ that **`code`** is **more concise**,
**well-documented** and thus **_easier_ to maintain**
and you will get your work done ***much faster***.

These are _foundational_ skills that will
pay **_immediate_ returns** on the time invested,
and will **`continue`** to **`return`** "**interest**"
for as long as you write (_and people use your_) software!

> _It's **impossible** to "**over-state**" how **vital writing tests first**
is to both your **personal effectiveness** and **long-term sanity**.
Thankfully, by the end of this chapter, you will see how **easy** it is._



## What?

Build a fully functional "Todo List" Application! <br />
Along the way we will cover:

+ [x] Building an App using a pre-made CSS Styles/Framework!
+ [x] The Document Object Model (DOM) + JSDOM
+ [x] Browser Routing/Navigation
+ [x] Local Storage for Offline Support
+ [x] Keyboard event listeners for rapid todo list creation and editing!

We will be abstracting all "architecture" related ("generic") code
into a "mini frontend framework" called "***elmish***".
(_elmish is inspired by Elm but only meant for educational purposes!_)

The journey to creating **elmish** is captured in
[**`elmish.md`**](https://github.com/dwyl/javascript-todo-list-tutorial/blob/main/elmish.md)
and fully documented code is in **`elmish.js`**.
This means our Todo List App can be as concise
and "declarative" as possible.

### Todo List?

If you are _unfamiliar_ with Todo lists, simply put:
they are a way of keeping a list of the tasks that need to be done. <br />
see: https://en.wikipedia.org/wiki/Time_management#Setting_priorities_and_goals

Todo Lists or "Checklists" are the _best_ way of tracking tasks. <br />
Atul Gawande wrote a _superb_ book on this subject: <br />
https://www.amazon.com/Checklist-Manifesto-How-Things-Right/dp/0312430000 <br />
Or if you don't have time to read,
watch: https://www.youtube.com/results?search_query=checklist+manifesto

### TodoMVC?

If you have not come across TodoMVC before,
it's a website that showcases various "frontend" frameworks
using a common user interface (UI): a Todo List Application.
![TodoMVC-intro](https://user-images.githubusercontent.com/194400/42624420-4528a3c6-85bd-11e8-8b92-9b1c8951ba35.png)


We _highly recommend_ checking out the following links:

+ Website: https://todomvc.com
+ GitHub project: https://github.com/tastejs/todomvc

For our purposes we will simply be re-using the **TodoMVC `CSS`**
to make our TEA Todo List _look_ good
(_not have to "worry" about styles so we can **focus on functionality**_).
All the JavaScript code will be written "_from scratch_"
to ensure that everything is clear.

## _Who?_

This tutorial is for anyone/everyone who wants
to develop their "core" JavaScript skills (_without using a framework/library_)
while building a "real world" (_fully functional_) Todo List Application.

> As always, if you get "stuck", _please_ open an issue:
https://github.com/dwyl/javascript-todo-list-tutorial/issues
by opening a question you help _everyone_ learn more effectively!


### Prerequisites

Most beginners with basic JavaScript and HTML knowledge
should be able to follow this example without any prior experience.
The code is commented and the most "complex" function is an event listener.
With that said, if you feel "stuck" at any point,
please consult the recommend reading (_and Google_)
and if you cannot find an answer,
please open an issue!

### Recommended reading:

+ Test Driven Developement: https://github.com/dwyl/learn-tdd
+ Tape-specific syntax: https://github.com/dwyl/learn-tape
+ Elm Architecture: https://github.com/dwyl/learn-elm-architecture-in-javascript


## _How?_


Start by cloning this repository to your `localhost`
so that you can follow the example/tutorial offline:

```sh
git clone https://github.com/dwyl/javascript-todo-list-tutorial.git
```

Install the `devDependencies` so you can run the tests:
```sh
cd javascript-todo-list-tutorial && npm install
```

Now you have _everything_ you need to build a Todo List from scratch!


### `Elm`(_ish_) ?

In order to _simplify_ the code for our Todo List App,
we _abstracted_ much of the "_generic_" code
into a "front-end micro framework" called `Elm`(_ish_).
The functions & functionality of `Elm`(_ish_) should be _familiar_ to you
so you _should_ be able to build the Todo List using the `Elm`(_ish_)
helper functions e.g: `mount`, `div`, `input` and `route`.

You can _opt_ to _either_: <br />

**a)** read the `Elm`(_ish_) docs/tutorial
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/main/elmish.md)
***`before`*** building the Todo List App -
this will give you both TDD practice
and a deeper understanding of building a micro framework.
i.e. "**_prospective_ learning**"<br />

**b)** refer the `Elm`(_ish_) docs/tutorial
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/main/elmish.md)
***`while`*** building the Todo List App when you "**_need_ to know**"
how one of the helper functions works. i.e. "**_contextual_ learning**" <br />

**c)** **only _consult_** the `Elm`(_ish_) docs/tutorial
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/main/elmish.md)
***`if`*** you are "stuck" ***`while`*** building the Todo List App.
i.e. "**_debug_ learning**" <br />

The choice is yours; there is no "_right_" way to learn.



### Testing & Documentation?

_Before_ diving into _building_ the Todo List App,
we need to consider how we are going to _test_ it.
By ensuring that we follow **TDD** from the _start_ of an App,
we will have ["***no surprises***"](https://youtu.be/u5CVsCnxyXg)
and _avoid_ having to "correct" any
["***bad habits***"](https://www.youtube.com/results?search_query=Destiny%27s+Child+Bad+Habit).

We will be using **Tape** and **JSDOM** for testing
both our functions and the final application.
If you are `new` to either of these tools,
please see:
[github.com/dwyl/**learn-tape**](https://github.com/dwyl/learn-tape)
and
[**front-end**-with-tape.md](https://github.com/dwyl/learn-tape/blob/main/front-end-with-tape.md)

We will be using **JSDOC** for documentation.
Please see [our tutorial](https://github.com/dwyl/learn-jsdoc) if this is new to you.

<br />

#### Create Files

Create a **`new`** directory e.g: `/todo-app`
So that you can build the Todo List from scratch!

In your editor/terminal create the following files:

+ `test/todo-app.test.js`
+ `lib/todo-app.js`
+ `index.html`

These file names should be self-explanatory, but if unclear,
`todo-app.test.js` is where we will write the tests for our
Todo List App.
`todo-app.js` is where all the JSDOCs and functions
for our Todo List App will be written.

#### Test Setup

In order to run our test(s), we need some "setup" code
that "requires" the libraries/files so we can _execute_ the functions.

In the `test/todo-app.test.js` file, type the following code:
```js
const test = require('tape');       // https://github.com/dwyl/learn-tape
const fs = require('fs');           // to read html files (see below)
const path = require('path');       // so we can open files cross-platform
const html = fs.readFileSync(path.resolve(__dirname, '../index.html'));
require('jsdom-global')(html);      // https://github.com/rstacruz/jsdom-global
const app = require('../lib/todo-app.js'); // functions to test
const id = 'test-app';              // all tests use 'test-app' as root element
```

> Most of this code should be _familiar_ to you
if you have followed previous tutorials.
> If anything is _unclear_ please revisit
[https://github.com/dwyl/**learn-tape**](https://github.com/dwyl/learn-tape)
and
[**front-end**-with-tape.md](https://github.com/dwyl/learn-tape/blob/main/front-end-with-tape.md)

If you attempt to run the test file: `node test/todo-app.test.js`
you should see no output. <br />
(_this is expected as we haven't written any tests yet!_)


### `model`

The `model` for our Todo List App is **_boringly_ simple**.
All we need is an `Object` with a
`todos` key which has an Array of Objects as it's value:

```js
{
  todos: [
    { id: 1, title: "Learn Elm Architecture", done: true },
    { id: 2, title: "Build Todo List App",    done: false },
    { id: 3, title: "Win the Internet!",      done: false }
  ]
}
```
`todos` is an `Array` of `Objects` and each Todo (Array) item
has 3 keys:
+ `id`: the index in the list.
+ `title`: the title/description of the todo item.
+ `done`: a `boolean` indicating if the item is complete or still "todo".


#### What about the `count` of items ?

> The TodoMVC Specification requires us to display a **`counter`**
of the items in the Todo list:
https://github.com/tastejs/todomvc/blob/main/app-spec.md#counter

![javascript-todo-list-count](https://user-images.githubusercontent.com/194400/73112092-e73a5400-3f04-11ea-90f6-d4ae541a129c.png)

In order to display the `count` of items in the Todo list,
we _could_ store 3 values in the model:

+ `total_items` - the total number of items, in this case 3.
+ `completed_items` - the number of completed items. in this case 1.
+ `incomplete_items` - the number of items still to be done; 2.

Each time a `new item` is added to the list
we would need to update
both the `total_items`
and the `incomplete_items`
values in the `model`.
And each time an `item` gets checked off as "done",
we would need to update _both_ the `incomplete_items`
and the `completed_items`.
This is _unnecessary_ effort we can avoid.
We can simply _compute_ these values based on the data in the `todos` Array
and display them for the user without storing any additional data.

Instead of _storing_ any additional data for a `counter` in the model
(_the count of active and completed Todo items_),
we will _compute_ the count and display the count at "runtime".
We don't _need_ to store any additional data in the `model`.
This may use a few CPU cycles computing the `count`
each time the view is rendered but that's "OK"!
Even on an _ancient_ Android device
this will only take a millisecond to compute and
won't "slow down" the app or affect UX.

See below for how the three counts are computed.

e.g: in the model above there are 3 todo items in the `todos` Array;
2 items which are "active" (`done=false`)
and 1 which is "done" (`done=true`).

#### `model` _Test_

Given that the `model` is "just data"
(
_it has **no** "**methods**" because `Elm`(ish) is_
["***Functional***"](https://en.wikipedia.org/wiki/Functional_programming)
_**not**_
["***Object Oriented***"](https://en.wikipedia.org/wiki/Object-oriented_programming)
),
there is no _functionality_ to test.
We are merely going to test for the "shape" of the data.

In the `test/todo-app.test.js` file, append following test code:

```js
test('todo `model` (Object) has desired keys', function (t) {
  const keys = Object.keys(app.model);
  t.deepEqual(keys, ['todos', 'hash'], "`todos` and `hash` keys are present.");
  t.true(Array.isArray(app.model.todos), "model.todos is an Array")
  t.end();
});
```

If you _run_ this test in your terminal:
```sh
node test/todo-app.test.js
```
You should see _both_ assertions _fail_:
![model-tests-failing](https://user-images.githubusercontent.com/194400/43508841-e8473e90-9568-11e8-85fd-6e0e30f244cb.png)



#### `model` _Implementation_

Write the _minimum_ code required to _pass_ this test in `todo-app.js`.
e.g:

```js
/**
 * initial_model is a simple JavaScript Object with two keys and no methods.
 * it is used both as the "initial" model when mounting the Todo List App
 * and as the "reset" state when all todos are deleted at once.
 */
var initial_model = {
  todos: [], // empty array which we will fill shortly
  hash: "#/" // the hash in the url (for routing)
}

/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    model: initial_model
  }
}
```

Once you save the `todo-app.js` file and re-run the tests.
```sh
node test/todo-app.test.js
```
You _should_ expect to see both assertions _passing_:
![model-tests-passing](https://user-images.githubusercontent.com/194400/43508894-0df475cc-9569-11e8-8665-14320138ba79.png)

We're off to a _great_ start! Let's tackle some actual _functionality_ next!

<br />

### `update`

The `update` function is the
["brain"](https://www.youtube.com/results?search_query=Pinky+and+The+Brain)
of the App.

#### `update` JSDOC

The **`JSDOC`** for our `update` function is:
```js
/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {Object} model - the App's data ("state").
 * @return {Object} new_model - the transformed model.
 */
```

#### `update` Test > `default case`

As with the `update` in our `counter` example
the function body is a `switch` statement
that "decides" how to handle a request based on the `action`
(_also known as the "message"_).

Given that we _know_ that our `update` function "skeleton"
will be a `switch` statement
(_because that is the "TEA" pattern_)
a good test to _start_ with is the `default case`.

Append the following test code in `test/todo-app.test.js`:

```js
test('todo `update` default case should return model unmodified', function (t) {
  const model = JSON.parse(JSON.stringify(app.model));
  const unmodified_model = app.update('UNKNOWN_ACTION', model);
  t.deepEqual(model, unmodified_model, "model returned unmodified");
  t.end();
});
```

If you _run_ this test in your terminal:
```sh
node test/todo-app.test.js
```
You should see the assertion _fail_:
![update-default-branch-test-failing](https://user-images.githubusercontent.com/194400/43580847-b78105c0-964e-11e8-81ac-61a1dd8ec535.png)

#### `update` Function Implementation > `default case`

Write the _minimum_ code necessary to pass the test.

> Yes, we could just write:

```js
function update (action, model) { return model; }
```

And that _would_ make the test _pass_. <br />

But, in light of the fact that we **know** the `update`
function body will contain a `switch` statement,
make the test pass by returning the `model` _unmodified_ in the `default` case.

e.g:
```js
/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} new_model - the transformed model.
 */
function update(action, model) {
 switch (action) {                  // action (String) determines which case
   default:                         // if action unrecognised or undefined,
     return model;                  // return model unmodified
 }    // default? https://softwareengineering.stackexchange.com/a/201786/211301
}
```

When you re-run the test(s) in your terminal:
```sh
node test/todo-app.test.js
```
You should see this assertion pass:
![update-default-branch-test-passing](https://user-images.githubusercontent.com/194400/43581137-c6aa236e-964f-11e8-96d0-ef724659761e.png)

Now that we have a _passing_ test
for the `default case` in our `update` function,
we can move on to
thinking about the first (_and most fundamental_) piece
of _functionality_ in the Todo List App: Adding an item to the list.


### `ADD` an `item` to the Todo List

This is both the _first_ "feature" a "user" will encounter and
_by_ far the most _used_ feature of a Todo List. <br />
(_by **definition** people add more items to their list than they finish,
  to finish everything we would have to_
  [***live forever***!](https://youtu.be/TDe1DqxwJoc))

#### `ADD` item _Acceptance Criteria_

Adding a new todo item's text should
append the todo item `Object` to the `model.todos` Array. <br />
Such that the `model` is transformed (_data is added_) in the following way:

_BEFORE_:
```js
{
  todos: [],
  hash: "#/"
}
```
_AFTER_:
```js
{
  todos: [
    {id: 1, "Add Todo List Item", done: false }
  ],
  hash: "#/"
}
```

#### Hold On, That Doesn't Seem "_Right_" How Does Todo Item _Text_ Get Added?

![sotp-sign-fail](https://user-images.githubusercontent.com/194400/43678248-ba12f248-9807-11e8-8ebc-0afd8fd8bb0e.jpg)

While considering the "Acceptance Criteria"
for adding an item to the Todo List,
we _notice_ that our `update` **`JSDOC`**
and corresponding function "signature" (_defined above_) as:
```js
/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} updated_model - the transformed model.
 */
function update(action, model) {
 switch (action) {                  // action (String) determines which case
   default:                         // if action unrecognised or undefined,
     return model;                  // return model unmodified
 }    // default? https://softwareengineering.stackexchange.com/a/201786/211301
}
```
does not have a **parameter** for passing in the Todo List item Text (`title`),
i.e. how do we add "data" to the `model`...?


That's "_Oh kay_"! (_don't panic_!) <br />
If we **`try`** to think about implementation up-front,
we would _invariably_ be "over-thinking" things
and get "stuck" in the
["analysis paralysis"](https://en.wikipedia.org/wiki/Analysis_paralysis)
of
["***waterfall***"](https://en.wikipedia.org/wiki/Waterfall_model)

As you are _about_ to see, we can _easily_ change the function signature,
in the _next_ test _without affecting_ our exiting (_passing_) test!

As you _practice_ "DDD" & "TDD" you will begin to _appreciate_
and even _embrace_ the _mental agility_ that comes from
_not_ "over-thinking" things.

Whenever you encounter a "New Requirement"
(_or realise that you didn't **fully consider** the **original requirements**_),
you know that your _suite_ of tests has
"
[got your](https://www.urbandictionary.com/define.php?term=Got%20your%20back)
[back](https://youtu.be/gk2yOxTuLck)
". <br />
You can "_refactor_" a function's _implementation_ to your heart's content,
safe in the knowledge that all your _existing_ tests still pass.
i.e. the _rest_ of the app "**still works**" **_exactly_ as expected**.

We don't want to "mess with" either of the other two (_existing_) parameters,
both `action` and `model` have clearly defined purposes,
but we _need_ a way to pass "data" into the `update` function!

With that in mind, let's _amend_ the `update` **`JSDOC`** comment
and function signature to:

```js
/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {Object} model - the App's (current) model (or "state").
 * @param {String} data - data we want to "apply" to the item. e.g: item Title.
 * @return {Object} updated_model - the transformed model.
 */
function update(action, model, data) {
  switch (action) {                  // action (String) determines which case
    default:                         // if action unrecognised or undefined,
      return model;                  // return model unmodified
  }    // default? https://softwareengineering.stackexchange.com/a/201786/211301
}
```

Without making _any_ other changes, re-run the tests:

```sh
node test/todo-app.test.js
```
_Everything_ should still pass:
![update-default-branch-test-passing](https://user-images.githubusercontent.com/194400/43581137-c6aa236e-964f-11e8-96d0-ef724659761e.png)

Congratulations! You just _extended_ a function (_signature_)
without affecting any _existing_ tests.



#### `ADD` item _Test_

Append the following test code to your `test/todo-app.test.js` file:

```js
test('`ADD` a new todo item to model.todos Array via `update`', function (t) {
  const model = JSON.parse(JSON.stringify(app.model)); // initial state
  t.equal(model.todos.length, 0, "initial model.todos.length is 0");
  const updated_model = app.update('ADD', model, "Add Todo List Item");
  const expected = { id: 1, title: "Add Todo List Item", done: false };
  t.equal(updated_model.todos.length, 1, "updated_model.todos.length is 1");
  t.deepEqual(updated_model.todos[0], expected, "Todo list item added.");
  t.end();
});
```

If you _run_ this test in your terminal:
```sh
node test/todo-app.test.js
```
You should see the assertion _fail_:

![update-add-item-test-failing](https://user-images.githubusercontent.com/194400/43639131-206b632c-9713-11e8-83ee-d0ecab0ac4ef.png)


#### `ADD` item _Implementation_

With the above test as your "guide",
write the _bare minimum_ code necessary to make all assertions pass.

_Sample_ implementation:
```js
/**
 * `update` transforms the `model` based on the `action`.
 * @param {String} action - the desired action to perform on the model.
 * @param {Object} model - the App's (current) model (or "state").
 * @param {String} data - the data we want to "apply" to the item.
 * @return {Object} updated_model - the transformed model.
 */
function update(action, model, data) {
  var new_model = JSON.parse(JSON.stringify(model)) // "clone" the model
  switch(action) {                   // and an action (String) runs a switch
    case 'ADD':
      new_model.todos.push({
        id: model.todos.length + 1,
        title: data,
        done: false
      });
      break;
    default: // if action unrecognised or undefined,
      return model; // return model unmodified
  }   // see: https://softwareengineering.stackexchange.com/a/201786/211301
  return new_model;
}
```
the `case 'ADD'` is the _relevant_ code. <br />

> Was _your_ implementation _similar_...? <br />
> If you were able to make it _simpler_,
[please share!](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/48)

Once you have the test(s) _passing_ e.g:
![todo-add-item-tests-passing](https://user-images.githubusercontent.com/194400/43678110-2688ea7a-9805-11e8-9003-97b5450d0cf1.png)

Let's move on to the _next_ functionality!

<br />

### `TOGGLE` a Todo `item` to `done=true`

![todomvc-two-items-1-done](https://user-images.githubusercontent.com/194400/43686242-150d8f66-98ba-11e8-9f63-df7523666fd8.png)

Checking off a todo item involves changing the value of the `done` property
from `false` to `true`. e.g:

_FROM_:
```js
{
  todos: [
    {id: 1, "Toggle a todo list item", done: false }
  ]
}
```
_TO_:
```js
{
  todos: [
    {id: 1, "Toggle a todo list item", done: true }
  ]
}
```

Given that we have already defined our `update` function above,
we can dive straight into writing a _test_:


#### `TOGGLE` item _Test_

Append the following test code to your `test/todo-app.test.js` file:

```js
test('`TOGGLE` a todo item from done=false to done=true', function (t) {
  const model = JSON.parse(JSON.stringify(app.model)); // initial state
  const model_with_todo = app.update('ADD', model, "Toggle a todo list item");
  const item = model_with_todo.todos[0];
  const model_todo_done = app.update('TOGGLE', model_with_todo, item.id);
  const expected = { id: 1, title: "Toggle a todo list item", done: true };
  t.deepEqual(model_todo_done.todos[0], expected, "Todo list item Toggled.");
  t.end();
});
```
_execute_ the test:
```sh
node test/todo-app.test.js
```
You should see something _similar_ to the following:
![toggle-todo-list-item](https://user-images.githubusercontent.com/194400/43686329-8cdffc12-98bb-11e8-9b04-5d2ef2dc54a3.png)


#### `TOGGLE` item _Implementation_

With the above test as your "guide",
write the _minimum_ code necessary to make the test pass.
(_ensure that you continue to make a "copy" of the `model`
rather than "mutate" it_)

Once you make it _pass_ you should see:

![todo-item-toggled](https://user-images.githubusercontent.com/194400/43686401-fcdd417c-98bc-11e8-8766-2b967b6e4481.png)

> Try to make the test pass alone (or with your pairing partner).
If you get "stuck" see: [**`todo-app.js`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/commits/5d4ebc546101efe05644a05833d73caec77c32ae)


#### Hold On, Does This Work _Both_ Ways?

_Yes_, you _guessed_ it!
Choosing to name the `action` as "`TOGGLE`"
is _precisely_ because we don't _need_
to have a _**separate**_ function
to "undo" an item if it has been "checked off".

Append the following test code to your `test/todo-app.test.js` file:

```js
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
```

You should not _need_ to modify any of the code in the `update` function.
The above test should just _pass_ based on the code you wrote above.
If it does _not_, then _revise_ your implementation
of the `TOGGLE case` in `update` until _all_ tests pass:

![undo-a-todo-item](https://user-images.githubusercontent.com/194400/43686533-b25d4608-98bf-11e8-809e-1153fcfb1db1.png)

### `view` Function

It won't have "_escaped_" you that _so far_ we have not written _any_ code
that a _user_ can actually _interact_ with.

_So far_ we have _successfully_ added two `case` blocks in the `switch` statement
of our `update` function. We now have the two _basic_ functions required
to both `ADD` a new todo list item to the `model.todos` Array
_and_ check-off a todo list item as "done" using the `TOGGLE action`.
This is "_enough_" functionality to start _using_ the todo list (_ourselves_)
and **UX-testing** it with _prospective_ "***users***".

If you followed through the "Elm(ish)" tutorial
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/main/elmish.md)
you will have seen that we created a _sample_ `view` in the last few _tests_
to "_exercise_" the DOM element creation functions.
This means that we _already know_ how to build a `view` for our Todo List App!
We "_just_" need to _adapt_ the `view` we made in `Elm`(_ish_) to display
the data in our `model`.

#### Sample `model` to Render in Our `view`

Let's return to the sample `model` from above:

```js
{
  todos: [
    { id: 1, title: "Learn Elm Architecture", done: true },
    { id: 2, title: "Build Todo List App",    done: false },
    { id: 3, title: "Win the Internet!",      done: false }
  ],
  hash: '#/' // the "route" to display
}
```
The model contains _three_ items in the `todos` Array. <br />
The first is complete (`done=true`)
whereas the second and third items are still "todo" (`done=false`).

This is what this `model` looks like in the "VanillaJS"
TodoMVC:

![todomvc-3-items-1-done](https://user-images.githubusercontent.com/194400/43689907-e9caa548-98f8-11e8-8fd1-7b63e7fc5e30.png)

Our _quest_ in the next "pomodoro" is to re-create this
using the DOM functions we created in `Elm`(_ish_)!

#### Focus on Rendering The _List_ First

For now, _ignore_ the `<footer>` (_below the Todo List_)
and _just_ focus on rendering the _list_ itself.

![todomvc-3-items-1-done](https://user-images.githubusercontent.com/194400/43690122-b72bcb0e-98fc-11e8-83c2-8b8703b177ed.png)


In your web browser, open **Dev**eloper **Tools**
and _inspect_ the HTML for the Todo list:
https://todomvc.com/examples/vanillajs/

![todomvc-main-section-todo-list-html](https://user-images.githubusercontent.com/194400/43717480-9fb80982-997f-11e8-9ffe-6aa90a89a042.png)

This is the HTML copied directly from the browser:
```html
<section class="main" style="display: block;">
  <input class="toggle-all" type="checkbox">
  <label for="toggle-all">Mark all as complete</label>
  <ul class="todo-list">
    <li data-id="1533501855500" class="completed">
      <div class="view">
        <input class="toggle" type="checkbox">
        <label>Learn Elm Architecture</label>
        <button class="destroy"></button>
      </div>
    </li>
    <li data-id="1533501861171" class="">
      <div class="view">
        <input class="toggle" type="checkbox">
        <label>Build Todo List App</label>
        <button class="destroy"></button>
      </div>
    </li>
    <li data-id="1533501867123" class="">
      <div class="view"><input class="toggle" type="checkbox">
        <label>Win the Internet!</label>
        <button class="destroy"></button>
      </div>
    </li>
  </ul>
</section>
```
> _**Note**: there is "redundant" markup in this HTML in the form of a `<div>`
inside the `<li>`, for now we are just replicating the HTML "faithfully",
we can "prune" it later._

From this HTMl we can write our
["**_Technical_ Acceptance Criteria**"](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/51):

+ [ ] Todo List items should be displayed as list items **`<li>`**
in an _unordered list_ **`<ul>`**.
+ [ ] Each Todo List item **`<li>`**  should contain a **`<div>`**
with a **`class="view"`** which "wraps":
  + [ ] **`<input class="toggle" type="checkbox">`** - the "checkbox"
  that people can "Toggle" to change the "state"
  of the Todo item from "active" to "done"
  (_which updates the model
    From: `model.todos[id].done=false`
    To: `model.todos[id].done=true`_)
  + [ ] **`<label>`** - the text content ("title") of the todo list item
  + [ ] **`<button class="destroy">`** - the button the person
  can click/tap to **`delete`** a Todo item.


### Todo List `view` Test Assertions

Given the `model` (_above_),
+ [ ] There is a `<ul class="todo-list">` with 3 **`<li>`** (_list items_)
rendered in the `view`.
+ [ ] The ***first*** **`<li>`** has an **`<input type="checkbox">`**
which is _checked_ (`done=true`)
+ [ ] The ***remaining*** **`<li>'s`** have **`<input type="checkbox">`**
that are _unchecked_ (`done=false`)

Let's "tackle" the _first_ assertion _first_:

#### Render a _Single_ Todo List Item Using `render_list` Test

It's _always_ a good idea to "break apart" a test into smaller tests
because it means we will write smaller
(_and thus **more maintainable**_) "_composable_" functions.
With that in mind, let's add the following _test_ to `test/todo-app.test.js`:

```js
test.only('render_item HTML for a single Todo Item', function (t) {
  const model = {
    todos: [
      { id: 1, title: "Learn Elm Architecture", done: true },
    ],
    hash: '#/' // the "route" to display
  };
  // render the ONE todo list item:
  document.getElementById(id).appendChild(app.render_item(model.todos[0]))

  const done = document.querySelectorAll('.completed')[0].textContent;
  t.equal(done, 'Learn Elm Architecture', 'Done: Learn "TEA"');

  const checked = document.querySelectorAll('input')[0].checked;
  t.equal(checked, true, 'Done: ' + model.todos[0].title + " is done=true");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});
```

After saving the `test/todo-app.test.js` file, if you attempt to run it:
```sh
node test/todo-app.test.js
```
you will see something like this:

![render_item-test-failing](https://user-images.githubusercontent.com/194400/43743931-b397cd7a-99cf-11e8-81a6-3218207ca05b.png)

#### `render_list` Implementation

Given the test above, I added the following code to my `todo-app.js` file:

```js
/* if require is available, it means we are in Node.js Land i.e. testing! */
/* istanbul ignore next */
if (typeof require !== 'undefined' && this.window !== this) {
  var { a, button, div, empty, footer, input, h1, header, label, li, mount,
    route, section, span, strong, text, ul } = require('./elmish.js');
}

/**
 * `render_item` creates an DOM "tree" with a single Todo List Item
 * using the "elmish" DOM functions (`li`, `div`, `input`, `label` and `button`)
 * returns an `<li>` HTML element with a nested `<div>` which in turn has the:
 *   `<input type=checkbox>` which lets users to "Toggle" the status of the item
 *   `<label>` which displays the Todo item text (`title`) in a `<text>` node
 *   `<button class="destroy">` lets people "delete" a todo item.
 * see: https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/52
 * @param  {Object} item the todo item object
 * @return {Object} <li> DOM Tree which is nested in the <ul>.
 * @example
 * // returns <li> DOM element with <div>, <input>. <label> & <button> nested
 * var DOM = render_item({id: 1, title: "Build Todo List App", done: false});
 */
function render_item(item) {
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : ""
    ], [
      div(["class=view"], [
        input(["class=toggle", "type=checkbox",
          (item.done ? "checked=true" : "")], []),
        label([], [text(item.title)]),
        button(["class=destroy"])
      ]) // </div>
    ]) // </li>
  )
}
```
Add the `render_item` to the `module.exports` at the end of the file:
```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    model: initial_model,
    update: update,
    render_item: render_item, // export so that we can unit test
  }
}
```

This will make the test pass:
![image](https://user-images.githubusercontent.com/194400/43762133-f6c21de0-9a1e-11e8-871d-e6f5b86d1d55.png)


Now that we have a `render_item` function
that renders a _single_ `<li>` (_todo list item_),
we can create another function which _uses_ the `render_item` in a "loop",
to create _several_ `<li>` nested in a `<ul>`.

#### `render_main` Test

Append the following test code to your `test/todo-app.test.js` file:

```js
test('render "main" view using (elmish) HTML DOM functions', function (t) {
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
```

If you attempt to run this test:
```sh
node test/todo-app.test.js
```

you will see something like this:
![main-test-failing](https://user-images.githubusercontent.com/194400/43741630-f03f1fe8-99c6-11e8-8b7b-e44ee397b38e.png)


Given your knowledge of implementing the `render_item` function above,
and your skills with JavaScript loops, create your `render_main` function,
to make the tests pass.

> If you get "stuck" there is a _reference_ implementation in:
[**`todo-app.js`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/commits/b6607478c3dbed048781932261af2981f4c6c405#diff-6be3e16fe7cfb4c00788d4d587374afdR76)

All our tests pass _and_ we have **100% test coverage**:

![render_main-tests-pass-100-coverage](https://user-images.githubusercontent.com/194400/43766409-4189ce4e-9a2a-11e8-8d73-3ea636b22928.png)

This means we are writing the "_bare minimum_" code necessary
to meet all acceptance criteria (_requirements_),
which is _both **faster** and **more maintainable**_! <br />
Onwards!


<br />


### `<footer>` Element [issues/53](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/53)

Referring again to the _rendered_ HTML
on https://todomvc.com/examples/vanillajs as our "guide":

![footer-screenshot](https://user-images.githubusercontent.com/194400/42633421-5eb20f24-85d8-11e8-94ad-bb653dd93ab0.png)

####  Dev Tools > Elements (inspector)

![todo-list-mvc-](https://user-images.githubusercontent.com/194400/43768735-f1f7798e-9a2f-11e8-9f73-c69ea63b1064.png)

#### Copy-paste the _rendered_ HTML

"_copy-pasted_" of the _rendered_ HTML from the Dev Tools:
![todo-list-mvc-copy-html](https://user-images.githubusercontent.com/194400/43769759-6f18ca4c-9a32-11e8-8f96-7b19ed364c07.png)

```html
<footer class="footer" style="display: block;">
  <span class="todo-count">
    <strong>2</strong> items left
  </span>
  <ul class="filters">
    <li>
      <a href="#/" class="selected">All</a>
    </li>
    <li>
      <a href="#/active">Active</a>
    </li>
    <li>
      <a href="#/completed">Completed</a>
    </li>
  </ul>
  <button class="clear-completed" style="display: block;">
    Clear completed
  </button>
</footer>
```

#### Technical Acceptance Criteria

These are the criteria (_checklist_) as described in [issues/53](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/53):

+ [ ] **`render_footer`** returns a  **`<footer>`** DOM element which can be rendered directly to the `document` or _nested_ in another DOM element.
+ [ ]  **`<footer>`** contains:
  + [ ] **`<span class="todo-count">`** which contains
    + [ ] a **`text`** node with: **"`{count}` item(s) left"**.
   _pseudocode_:
  `{model.todos.filter( (i) => { i.done==false })}`
    item`{model.todos.length > 1 ? 's' : '' }` left
  + [ ] **`<ul>`** containing 3 **`<li>`** with the following links (**`<a>`**):
    + [ ] Show **`All`**: **`<a href="#/" class="selected">All</a>`**
      + [ ] **`class="selected"`** should only appear on the selected menu/navigation item.
       this should be "driven" by the `model.hash` property.
    + [ ] Show **`Active`**: **` <a href="#/active">Active</a>`**
    + [ ] Show **`Completed`**: **`<a href="#/completed">Completed</a>`**
  + [ ] **`<button class="clear-completed" style="display: block;">`**
    will **_Clear_ all `Completed`** items.
    _sample code_: <br />
`new_model.todos =  model.todos.filter(function(item) { return item.done === false })`

#### _Estimate_ Time Required to Write `render_footer` Function

"_armed_" with the acceptance criteria _checklist_
and the
["***informative prior***"](https://en.wikipedia.org/wiki/Prior_probability#Informative_priors)
(_the **experience** we have **already** gained_)
from building the previous view functions
**`render_item`** and **`render_main`**
we ***estimate*** with _reasonable confidence_
that it will take us
**25 minutes** (_**one** "**pomodoro**_)
to:
+ [ ] Craft the **`JSDOC`** comment _documenting_ the `render_footer` function
so that all future developers will _easily_ understand what the function does.
+ [ ] Write a (unit) **test** covering the acceptance criteria (_test first!_)
+ [ ] Write the (_bare minimum_) code to ***pass*** the test assertions.

> _**Note On Time Estimates**: if it takes **longer** than **25 mins** "budget",
**don't panic** or feel like you have "failed",
it's not a "problem" ...
it's just "**more data**" (knowledge/experience)
that you can incorporate into improving **future estimates**!
over time you will get **really good** at estimating,
this is just a **starting point**_

#### `render_footer` `JSDOC` Comment Documentation

Here is a sample comment which documents the **`render_footer`** function:

```js
/**
 * `render_footer` renders the `<footer class="footer">` of the Todo List App
 * which contains count of items to (still) to be done and a `<ul>` "menu"
 * with links to filter which todo items appear in the list view.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} <section> DOM Tree which containing the <footer> element.
 * @example
 * // returns <footer> DOM element with other DOM elements nested:
 * var DOM = render_footer(model);
 */
```

Write your _own_ JSDOC or add these lines to your **`todo-app.js`** file.

#### `render_footer` Test

Here is a sample test you can add to your `test/todo-app.test.js` file:
(_if you feel confident in your TDD skills,
  you could **`try`** to write your own test/assertions..._)

```js
test.only('render_footer view using (elmish) HTML DOM functions', function (t) {
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
```

Run this test:
```sh
node test/todo-app.test.js
```

you will see something like this:
![render_footer-test-failing](https://user-images.githubusercontent.com/194400/43774185-3be99666-9a40-11e8-9387-f172f95dd80b.png)

#### `render_footer` Implementation

Given the docs and test above, attempt to write the `render_footer` function.

> _**Note**: for now we are **not** "concerned"
with what happens when the "Clear completed" **`<buton>`** is clicked/tapped.
We will "cover" that below. For now, focus on rendering the DOM._

> If you get "stuck" trying to make the tests pass, first keep trying! <br />
Then "ask a friend" and finally, consult the _reference_ implementation in:
[**`todo-app.js`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/commits/68e2afa3bd95c46da7df559007d90dedcbae500f#diff-6be3e16fe7cfb4c00788d4d587374afdR103)


For good measure, we add a _second_ test to check our "pluarisation":

```js
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
```
This test _should_ pass without any further code needing to be written.

Once you have written the code to pass the tests,
you should see something like this:

![render_footer-tests-passing-coverage-100percent](https://user-images.githubusercontent.com/194400/43776336-6a3b8fe0-9a47-11e8-8155-deb0fcf44e5a.png)


### `view` Function

Now that we have the individual ("_lower order_") functions
**`render_main`**
[#51](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/51),
**`render_item`**
[#52](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/52),
and **`render_footer`**
[#53](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/53)
for rendering the _sections_ of the todo app,
we can write the `view` function to render the _entire_ app!

With the `main` and `footer` "_partial_" views built,
the overall **`view`** is quite simple:

![todoapp-view](https://user-images.githubusercontent.com/194400/43779964-6fb92176-9a51-11e8-8b78-64c60242990d.png)

To save on repetition, and illustrate just how _simple_
the **`view`** is,
this is the "HTML" with the
**`<section class"main">`** and **`<footer class="footer">`**
partials replaced by invocations
to the respective functions
**`render_main`** and **`render_footer`**:

```html
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus="">
  </header>
  render_main(model)
  render_footer(model)
</section>
```

#### `view` Acceptance Criteria

The `view` displays:
+ [ ] **`<section class="todo-app">`** inside which the app is rendered.
+ [ ] **`<h1>`** containing the title text "**todos**".
+ [ ] **`<input class="new-todo">`**
  has placeholder text **"What needs to be done?"**
+ [ ] **`<ul class="todo-list">`** list of todo items
  has `zero` items by default (_based on the `initial_model`_)
+ [ ] `<footer>` count is Zero when the app is first
  rendered with no todos in the `model`.

#### `view` JSDOC Comment Documentation

Here is a sample JSDOC comment you can add to your **`todo-app.js`** file:

```js
/**
 * `view` renders the entire Todo List App
 * which contains count of items to (still) to be done and a `<ul>` "menu"
 * with links to filter which todo items appear in the list view.
 * @param {Object} model - the App's (current) model (or "state").
 * @return {Object} <section> DOM Tree which containing all other DOM elements.
 * @example
 * // returns <section class="todo-app"> DOM element with other DOM els nested:
 * var DOM = view(model);
 */
```
These should be pretty familiar to you by now.
If you feel comfortable extending it with more detail, go for it!

#### `view` _Tests_

A sample test for the `view` function
you can add to your `test/todo-app.test.js` file:
(_if you feel confident in your TDD skills,
  you could **`try`** to write your own test/assertions..._)

```js
test.only('view renders the whole todo app using "partials"', function (t) {
  // render the view and append it to the DOM inside the `test-app` node:
  document.getElementById(id).appendChild(app.view(app.model)); // initial_model

  t.equal(document.querySelectorAll('h1')[0].textContent, "todos", "<h1>todos");
  // placeholder:
  const placeholder = document.getElementById('new-todo')
    .getAttribute("placeholder");
  t.equal(placeholder, "What needs to be done?", "paceholder set on <input>");

  // todo-count should display "0 items left" (based on initial_model):
  const left = document.getElementById('count').innerHTML;
  t.equal(left, "<strong>0</strong> items left", "Todos remaining: " + left);

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});
```

Run this test:
```sh
node test/todo-app.test.js
```

you will see something like this ("_Red_"):
![app.view-not-a-function](https://user-images.githubusercontent.com/194400/43782111-721805c2-9a56-11e8-970b-681b1499b3a8.png)

#### `view` Function _Implementation_

You should have the knowledge & skill
to write the `view` function and make the test pass.

> If you get "stuck" trying to make the tests pass, first keep trying! <br />
Then "ask a friend" and finally, consult the _reference_ implementation in:
[**`todo-app.js`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/commits/3096d81a777392c07a132136db496224871ff4c9#diff-6be3e16fe7cfb4c00788d4d587374afdR145)

When you run `npm test` you should see something like this:
![image](https://user-images.githubusercontent.com/194400/43782895-48496f22-9a58-11e8-9fde-dbb5554f43a0.png)


## Checkpoint!

So far we have made a _lot_ of progress with our Todo List App _quest_,
_however_ if we were to _stop_ working on this _now_ we would have
_nothing_ to show a "user".
Users can't _interact_ with functions,
even those with _great_ test coverage!

What we _need_ is to start putting all the pieces together
into a functioning app!

### Mount the App in `index.html`

Open your **`index.html`** file
and ensure that the following lines are in the **`<body>`**:

```html
<body>
  <div id="app"></div>
  <!-- CSS Styles are 100% optional. but they make it look *much* nicer -->
  <link rel="stylesheet" href="todomvc-common-base.css">
  <link rel="stylesheet" href="todomvc-app.css">

  <script src="elmish.js"></script>
  <script src="todo-app.js"></script>
  <script>
    var model = {
      todos: [
        { id: 1, title: "Learn Elm Architecture", done: true },
        { id: 2, title: "Build Todo List App",    done: false },
        { id: 3, title: "Win the Internet!",      done: false }
      ],
      hash: '#/' // the "route" to display
    };
    mount(model, update, view, 'app');
  </script>

  <!-- Below this point is all related to the Tests for the App -->
  <div id="test-app"></div> <!-- Create a test-app div to mount the app -->
</body>
```

For a complete "snapshot" of the `index.html` file here,
see: [**`index.html`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/ef56c490a48db8a900f1832d0cc373b75838b4d4/examples/todo-list/index.html)


If you run the project with command **`npm start`**
and navigate to: http://127.0.0.1:8000/

You should see:
![view-working](https://user-images.githubusercontent.com/194400/43786145-e476bdd0-9a5f-11e8-9043-cf997be615ae.png)

So the **`view`** _looks_ like a TodoMVC Todo List
(_mostly thanks to the imported CSS_),
_however_ we still cannot _interact_ with the app.

_Next_ we're going to move to "wiring-up" the _functionality_
to construct the UX.

## Functionality - The _Fun_ Part!

With all the "foundation" well defined and tested,
we can _confidently_ move on to building out the _features_
people _using_ the app will interact with!

#### Requirements?

Take a look at this list of test output:
https://github.com/tastejs/todomvc/tree/main/tests#example-output

```
TodoMVC
  1. No Todos
    ✓ should hide #main and #footer (201ms)
  2. New Todo
    ✓ should allow me to add todo items (548ms)
    ✓ should clear text input field when an item is added (306ms)
    ✓ should trim text input (569ms)
    ✓ should show #main and #footer when items added (405ms)
  3. Mark all as completed
    ✓ should allow me to mark all items as completed (1040ms)
    ✓ should allow me to clear the completion state of all items (1014ms)
    ✓ complete all checkbox should update state when items are completed (1413ms)
  4. Item
    ✓ should allow me to mark items as complete (843ms)
    ✓ should allow me to un-mark items as complete (978ms)
    ✓ should allow me to edit an item (1155ms)
    ✓ should show the remove button on hover
  5. Editing
    ✓ should hide other controls when editing (718ms)
    ✓ should save edits on enter (1093ms)
    ✓ should save edits on blur (1256ms)
    ✓ should trim entered text (1163ms)
    ✓ should remove the item if an empty text string was entered (1033ms)
    ✓ should cancel edits on escape (1115ms)
  6. Counter
    ✓ should display the current number of todo items (462ms)
  7. Clear completed button
    ✓ should display the number of completed items (873ms)
    ✓ should remove completed items when clicked (898ms)
    ✓ should be hidden when there are no items that are completed (893ms)
  8. Persistence
    ✓ should persist its data (3832ms)
  9. Routing
    ✓ should allow me to display active items (871ms)
    ✓ should allow me to display completed items (960ms)
    ✓ should allow me to display all items (1192ms)
    ✓ should highlight the currently applied filter (1095ms)

27 passing (1m)
```

We are going to write each one of these tests and then

#### 1. No Todos, should hide #footer and #main


Add the following test to your `test/todo-app.test.js` file:
```js
test.only('1. No Todos, should hide #footer and #main', function (t) {
  // render the view and append it to the DOM inside the `test-app` node:
  document.getElementById(id).appendChild(app.view({todos: []})); // No Todos

  const main_display = window.getComputedStyle(document.getElementById('main'));
  t.equal('none', main_display._values.display, "No Todos, hide #main");

  const main_footer= window.getComputedStyle(document.getElementById('footer'));
  t.equal('none', main_footer._values.display, "No Todos, hide #footer");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  t.end();
});
```

Run the test with:
```sh
node test/todo-app.js
```
You should see the following output:
![image](https://user-images.githubusercontent.com/194400/43868621-59e1aba0-9b66-11e8-95c1-0034892128cd.png)

##### Make it Pass!

Simply replace the instances of `"style=display: block;"` in the view code
with a reference to a "_computed style_" e.g:

```js
// Requirement #1 - No Todos, should hide #footer and #main
var display = "style=display:"
  + (model.todos.length > 0 ? + "block" : "none");
```

You should see:
![no-todos-test-passing](https://user-images.githubusercontent.com/194400/43868724-e3e2249c-9b66-11e8-8228-a5c1528c17b0.png)

Testing it in your web browser you should see the desired result:

![no-todos-hide-main-and-footer](https://user-images.githubusercontent.com/194400/43869170-1982648e-9b69-11e8-8f7a-4730edbc07ca.png)

> If you get stuck trying to make the test pass, see:
[todo-app.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/commits/d1bd85e4d75afdc69fcf38b9d58947cdce18a9cf#diff-6be3e16fe7cfb4c00788d4d587374afdR85)

Recommended reading on CSS `visibility:hidden` vs. `display:none`
the difference is _important_ for UI:
https://stackoverflow.com/questions/133051/what-is-the-difference-between-visibilityhidden-and-displaynone

<br />

#### 2. New Todo, should allow me to add todo items

The second batch of tests involves adding a new todo item to the list:

```
2. New Todo
  ✓ should allow me to add todo items (548ms)
  ✓ should clear text input field when an item is added (306ms)
  ✓ should trim text input (569ms)
  ✓ should show #main and #footer when items added (405ms)
```
Let's create a test with these 4 assertions.

Add the following code/test to your `test/todo-app.test.js` file:
```js
// Testing localStorage requires "polyfil" because:
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
  new_todo.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 13}));
  const items = document.querySelectorAll('.view');

  t.equal(items.length, 1, "should allow me to add todo items");
  // check if the new todo was added to the DOM:
  const actual = document.getElementById('1').textContent;
  t.equal(todo_text.trim(), actual, "should trim text input")

  // subscription keyCode trigger "branch" test (should NOT fire the signal):
  const clone = document.getElementById(id).cloneNode(true);
  new_todo.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 42}));
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
  localStorage.removeItem('elmish_store'); // clear "localStorage" for next test
  t.end();
});
```

Run the test with:
```sh
node test/todo-app.js
```
You should see the following output:

![test-failing](https://user-images.githubusercontent.com/194400/43929259-1880b41e-9c2c-11e8-9615-1372928c905d.png)


#### Todo List `subscriptions`

So far in the Todo List App
we have not implemented any **`subscriptions`**,
however, in order to "listen" for the **`[Enter]`** key "event"
(_to add a Todo List item_), we need to dive into event listeners.

Thankfully, we touched upon this while building `Elm`(_ish_),
if you need a recap, see:
[**elmish.md#subscriptions-for-event-listeners**](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/main/elmish.md#subscriptions-for-event-listeners)

Try to make the "**2. New Todo**" batch of tests _pass_
by creating (_and exporting_) a **`subscriptions`** function
in your **`lib/todo-app.js`** file.

If you get "_stuck_", checkout the sample code:
[**`todo-app.js > subscriptions`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/files#diff-6be3e16fe7cfb4c00788d4d587374afdR320)

Once you see the tests passing:

![add-todo-tests-passing](https://user-images.githubusercontent.com/194400/43982691-08d81eee-9cef-11e8-92c3-341433884092.png)

Let's add some _interaction_!


#### 3. Mark all as completed

The third batch of tests involves "Toggling" all todos as "done=true":

```
3. Mark all as completed
  ✓ should allow me to mark all items as completed
  ✓ should allow me to clear the completion state of all items
  ✓ complete all checkbox should update state when items are completed
```
Luckily, given that we know how to use a _boolean_ value,
these _three_ assertions can be "solved" with _minimal_ code.
Let's create a test with these 3 assertions.

Add the following code/test to your `test/todo-app.test.js` file:
```js
test.only('3. Mark all as completed ("TOGGLE_ALL")', function (t) {
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
```

> _Yes, it's a "big" test with several assertions.
We prefer to keep them "clustered" together because they test
the functionality as a "block".
Some people prefer to split the assertions out into individual unit tests,
our advice to the "practical developer" is: be pragmatic!
If you are testing the functionality and the test is legible,
there's no "harm" in having several assertions._

If you attempt to run the test file:
```sh
node test/todo-app.test.js
```
You will see something like this:

![toggle-all-test-failing](https://user-images.githubusercontent.com/194400/43985804-3c8dbe02-9d02-11e8-9876-cd7e35602754.png)

While there may _appear_ to be "_many_" assertions in this test,
in reality there are only two bits of functionality.

_Firstly_, we need a new `case`
in the `update` `switch` statement: `TOGGLE_ALL`. <br />
and _second_ we need to add a couple of lines to our `TOGGLE`
block to _check_ if _all_ todos are `done=true` or `done=false`.
In the case where _all_ todos are `done=true` we should reflect
this in the "state" of the `toggle-all` checkbox.
The _easiest_ way of representing this in the `model` is
with a new property, e.g: `model.all_done=true`
when _all_ todos are `done=true`.

The only other thing we need to update is the `render_main`
function to include `signal('TOGGLE_ALL')` in the attributes array.

Try and make this test pass by yourself before consulting the
sample code:
[**`lib/todo-app.js`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/files#diff-6be3e16fe7cfb4c00788d4d587374afdR46)


### 4. Item (Toggle, Edit & Delete)

```
4. Item
  ✓ should allow me to mark items as complete (843ms)
  ✓ should allow me to un-mark items as complete (978ms)
  ✓ should allow me to edit an item (1155ms)
  ✓ should show the remove button on hover
```

Of these requirements, we already have the first two "_covered_"
because we implemented the `TOGGLE` feature (_above_).

We can add another "proxy" test just for "_completeness_":

```js
test.only('4. Item: should allow me to mark items as complete', function (t) {
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
```
You should not need to write any additional code
in order to make this test pass; just run it and move on.

![toggle-todo-tests-passing](https://user-images.githubusercontent.com/194400/43992979-a4d00ab6-9d7e-11e8-891b-9f699f474dd5.png)



#### 4.1 `DELETE` an Item

```
should show the remove button on hover
```

##### Acceptance Criteria

+ [ ] should show the `<button class="destroy">`
on hover (over the item) ... thankfully the TodoMVC CSS
handles this for us, we just need our `view`
to render the `<button>`
+ [ ] Clicking/tapping the `<button class="destroy">`
sends the `signal('DELETE', todo.id, model)`
+ [ ] The `DELETE` update case receives the `todo.id`
and removes it from the `model.todos` Array.


##### `DELETE` Item _Test_

Append the following test code to your `test/todo-app.test.js` file:

```js
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
  t.equal(item.textContent, model.todos[0].title, 'Item contained in DOM.');
  // DELETE the item by clicking on the <button class="destroy">:
  const button = item.querySelectorAll('button.destroy')[0];
  button.click()
  // confirm that there is no loger a <button class="destroy">
  t.equal(document.querySelectorAll('button.destroy').length, 0,
    'there is no loger a <button class="destroy"> as the only item was DELETEd')
  t.equal(document.getElementById('0'), null, 'todo item successfully DELETEd');
  t.end();
});
```

If you run the tests `node test/todo-app.test.js`
you should now see:
![delete-test-one-assertion-failing](https://user-images.githubusercontent.com/194400/44953479-21313300-ae96-11e8-971a-51757702bacc.png)

The first two assertions are _optional_ and _should_ (_always_)
pass given that they rely on functionality defined previously.
The second two will only pass once you _make_ them pass!

##### `DELETE` Item _Implementation_

The _first_ step is to add an invocation of `signal('DELETE' ...)`
to the `render_item` view rendering function. _Specifically_ the
`button` line:

```js
button(["class=destroy"])
```
Add the `signal` function invocation:
```js
button(["class=destroy", signal('DELETE', item.id)])
```

simply adding this function invocation as an Array element will set it
as an `onclick` attribute for the `<button>`
therefore when the _user_ clicks the button it will
"trigger" the `signal` function with the appropriate arguments.
There is no "magic" just code we tested/wrote earlier.


_Second_ we need to add a `case` statement
to the `update` function.
You should attempt to "solve" this yourself.
There is no "right" answer, there are at least
5 ways of solving this, as always, you should write the code
that you feel is most _readable_.

If you get "_stuck_" or want to confirm your understanding
of the implementation of the `DELETE` functionality,
check the code in [`todo-app.js` > `update`](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/files#diff-6be3e16fe7cfb4c00788d4d587374afdR57)
function.


> Rather bizarrely the edit functionality is mentioned
_both_ in the Item and Editing sections. <br />

```
should allow me to edit an item
```

> This is kinda _meaningless_ as an assertion.
What does "edit an item" actually _mean_? <br />
(_we have expanded the acceptance criteria below..._)

<br />

### 5. `EDIT` an Item

Editing a Todo List item is (_by far_)
the most "advanced" functionality in the TodoMVC app
because it involves multiple steps and "dynamic UI".

Don't panic! Just because something has "more steps" than we have seen before,
doesn't mean we should be "overwhelmed" by its' complexity.
We just need to "break it down" into "bitesize chunks"!

> _**Note**: the most "**difficult**" part of implementing the "edit an item"
functionality is having a "mental picture" of the UX
so that we can write the **tests first**
and isolate the required functions (update actions) from the keyboard/mouse
interactions. i.e. breaking down the steps into distinct "units"_.


First let's review the TodoMVC "Editing" test assertions:


#### `EDIT` Item Test Titles & Acceptance Criteria

```
5. Editing
  ✓ should hide other controls when editing (718ms)
  ✓ should save edits on enter (1093ms)
  ✓ should save edits on blur (1256ms)
  ✓ should trim entered text (1163ms)
  ✓ should remove the item if an empty text string was entered (1033ms)
  ✓ should cancel edits on escape (1115ms)
```

Further reading of the TodoMVC Spec:
https://github.com/tastejs/todomvc/blob/main/app-spec.md#item
reveals the following acceptance criteria:


+ [ ] Double-click on Item **`<label>title</label>`**
to begin editing (_that item_)
+ [ ] Render an **`<input class="edit">`**
if in "**editing _mode_**"
(_see screenshot and markup below_)
  + [ ] Add `class="editing"` to `<li>` when editing
  + [ ] Remove (_don't add_) `class="editing"` from `<li>`
  when no longer editing.
+ [ ] Set the `item.id` as the `id` of the **`<input class="edit">`**
  so that we know which item is being edited.
+ [ ] Add `case` in `keyup` Event Listener
  for **`[Enter]`** keyup (_see **`subscriptions`** above_)
  if we are in "**editing _mode_**",
  get the text value from the **`<input class="edit">`**
  _instead_ of **`<input id="new-todo">`**
  so that we _update_ the _existing_ Todo Item title (text).
+ [ ] When **`[Enter]`** is pressed while in "**editing _mode_**",
"_dispatch_" the **`SAVE`** action: `signal('SAVE')`
  + [ ] If the **`<input class="edit">`** is _blank_, `delete` the todo item.

By _inspecting_ the DOM for the VanillaJS TodoMVC example:
https://todomvc.com/examples/vanillajs <br />
we can see that _two_ things change in the DOM when in "**editing _mode_**":

+ **`<li class="editing">`** the CSS `class="editing"` is added
to the todo list item being _edited_.
+ **`<input class="edit">`** is inserted into the DOM _inside_ the `<li>`
so the item title can be edited.

![todo-edit-html](https://user-images.githubusercontent.com/194400/43995210-f4f484e0-9da1-11e8-8cc5-09f7309db963.png)

Here is the _sample_ HTML in "**editing _mode_**"
(_copy-pasted_) from the VanillaJS TodoMVC implementation
the **`<li>`** is being edited (_as per screenshot above_):
```HTML
<ul class="todo-list">
  <li data-id="1533987109280" class="completed ">
    <div class="view">
      <input class="toggle" type="checkbox" checked="">
      <label>hello world</label>
      <button class="destroy"></button>
    </div>
  </li>
  <li data-id="1534013859716" class="editing">
    <div class="view"><input class="toggle" type="checkbox">
      <label>totes editing this todo item</label>
      <button class="destroy">
      </button>
    </div>
    <input class="edit">
  </li>
</ul>
```

From the HTML/DOM we can see that "editing" a Todo item is _deceptively_ simple
from a markup perspective, we _just_ need to know _which_ item we are editing
and render the appropriate tags/classes.

#### Three Steps to `EDIT` an Item

There are _three_ steps to Editing a Todo List item:

1. ***Trigger*** the "double-click" event listener/handler
  1.1. Receiving the `singal('EDIT', item.id)` _activates_ "**editing _mode_**".
2. ***Edit*** the todo list item's `title` property
3. ***Save*** the updated item `title`: `singal('SAVE', item.id)`

For these _three_ steps there are two `update` actions: `EDIT` and `SAVE`
which will require two new `case` statements in the `update` function.

> _**Note**: there is a "fourth" step which is "**Cancelling**" an edit,
which we will cover in **section 5.5** below, but for now we are
only considering the "happy path" which results in a successful edit._



#### 5.1 `render_item` view function with "Edit Mode" `<input class="edit">`

In order to edit an item the **`render_item`** function
will require **3 modifications**:

1. Add the `signal('EDIT', item.id)` as an **`onclick` attribute** to `<label>`
so that when a `<label>` is (double-)clicked
the `model.editing` property is set by the `update` function (_see below_).
2. Apply the **`"class=editing"`** to the list item which is being edited.
3. Display the **`<input class="edit">`**
with the Todo list item title as it's **`value`** property.

#### 5.2 `render_item` "Edit Mode" _Test_

For the above modifications (_requirements_) we can write a _single_ test
with four assertions. Append the following code to `test/todo-app.test.js`:

```js
test.only('5. Editing: > Render an item in "editing mode"', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: false },
      { id: 2, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 2 // edit the 3rd todo list item (which has id == 2)
  };

  // render the ONE todo list item in "editing mode" based on model.editing:
  document.getElementById(id).appendChild(
    app.render_item(model.todos[2], model, mock_signal),
  );
  // test that signal (in case of the test mock_signal) is onclick attribute:
  t.equal(document.querySelectorAll('.view > label')[0].onclick.toString(),
    mock_signal().toString(), "mock_signal is onclick attribute of label");

  // test that the <li class="editing"> and <input class="edit"> was rendered:
  t.equal(document.querySelectorAll('.editing').length, 1,
    "<li class='editing'> element is visible");
  t.equal(document.querySelectorAll('.edit').length, 1,
    "<input class='edit'> element is visible");
  t.equal(document.querySelectorAll('.edit')[0].value, model.todos[2].title,
    "<input class='edit'> has value: " + model.todos[2].title);
  t.end();
});
```

There is quite a lot to "unpack" here, but the main gist is that
based on the `model.editing` key being set to `2`, our `render_item` function,
will add the `editing` CSS class to the `<li>` element and render an
`<input>` with CSS class `edit`.
The TodoMVC style sheet (`todomvc-app.css`) will take care of displaying
the input correctly.

Setting the **`onclick`** attribute of the `<label>` element
to whatever is passed in as the third argument of `redner_item`
i.e. the `signal` will mean that a specific action will be dispatched/triggered
when the `<label>` element is clicked.


> **SPOILER ALERT**: If you want to _try_ to make the "Edit Mode" _Test_
assertions _pass_ without reading the "solution",
do it now before proceeding to the reading the _implementation_ section.

<br />

#### 5.2 `render_item` "Edit Mode" _Implementation_

Given that there are 4 assertions that need to pass
and we know there are 3 changes that need to be made
to the `render_item` function,
rather than leaving you (_the reader_) wondering "_where do I start?!_",
here is the code that makes the tests pass:

_Before_:
```js
function render_item (item, model, signal) {
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : ""
    ], [
      div(["class=view"], [
        input([
          item.done ? "checked=true" : "",
          "class=toggle",
          "type=checkbox",
          typeof signal === 'function' ? signal('TOGGLE', item.id) : ''
          ],[]), // <input> does not have any nested elements
        label([], [text(item.title)]),
        button(["class=destroy",
        typeof signal === 'function' ? signal('DELETE', item.id) : ''])
      ]) // </div>
    ]) // </li>
  )
}
```

_After_:
```js
function render_item (item, model, signal) {
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : "",
      model && model.editing && model.editing === item.id ? "class=editing" : ""
    ], [
      div(["class=view"], [
        input([
          item.done ? "checked=true" : "",
          "class=toggle",
          "type=checkbox",
          typeof signal === 'function' ? signal('TOGGLE', item.id) : ''
          ], []), // <input> does not have any nested elements
        label([ typeof signal === 'function' ? signal('EDIT', item.id) : '' ],
          [text(item.title)]),
        button(["class=destroy",
          typeof signal === 'function' ? signal('DELETE', item.id) : ''])
        ]
      ), // </div>
    ].concat(model && model.editing && model.editing === item.id ? [ // editing?
      input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
    ] : [])) // </li>
  )
}
```
Let's walk through the three code changes made:

1. Adding `"class=editing"` to the `<li>` based on `model.editing`
is the simplest code modification, similar to the conditional attribute
`class=completed` on the previous line.

```js
model && model.editing && model.editing === item.id ? "class=editing" : ""
````

We include the check for `model && model.editing` because if either of these
two are `undefined` there's no need to keep checking.
Only if the `model.editing` matches the `item.id`
(_the todo list item being rendered_) do we render the **`"class=editing"`**.
Only one todo list item `title` will be edited at once,
so this will only match (_at most_) _one_ item in the `model.todos` array.

2. Setting the **`signal('EDIT', item.id)`**

_Why_ do we need the `typeof signal` (_type-checking_)...?

```js
label([ typeof signal === 'function' ? signal('EDIT', item.id) : '' ],
  [text(item.title)]),
```

Why _can't_ we just write this:

```js
label([signal('EDIT', item.id)], [text(item.title)]),
```

Given that **`signal`** is the final argument to the `render_item` function,
it is considered an _optional_ argument.
If for any reason the `render_item` function is invoked _without_ the `singal`
parameter, then attempting to _invoke_ **`signal('EDIT', item.id)`**
will result in a **`ReferenceError: signal is not defined`** which will
"crash" the app _fatally_.

If you are the _only_ person who is going to write code that will invoke
`render_item`, you don't need to "worry" about the `typeof signal`
because there is "no need" for type-checking the `signal`;
surely you won't _forget_ to invoke it with a valid `signal` ...
_however_ we _always_ approach our JavaScript code a
["***defensive programming***"](https://en.wikipedia.org/wiki/Defensive_programming)
perspective
because we _know_ from _experience_
that banking on the
["***happy path***"](https://en.wikipedia.org/wiki/Happy_path)
in JS code
is like driving without a seatbelt;
you might be "fine" most of the time, but when something "bad" happens,
you will go flying through the windscreen and have a _really_ bad day!

![dilbert-bugs](https://user-images.githubusercontent.com/194400/45164547-8f555d00-b1ea-11e8-9767-e23350c1e9a0.png)

If you want to _avoid_ having to do _manual_ "type-checking",
use **`Elm`**, it does all this for you _transparently_.

3. Append the **`<input class="edit">`**
to the `<li>` if in "**editing _mode_**":

```js
].concat(model && model.editing && model.editing === item.id ? [ // editing?
  input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
] : [])) // </li>
```
The _reason_ we use `.concat` is to allow us to
_optionally_ render the element or _nothing_ then _append_ it to the
Array of child elements nested in the `<li>`.

An _alternative_ to using `.concat()` could be an empty `div` node:
```js
model && model.editing && model.editing === item.id ? // editing?
  input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
  : div() // empty element.
```
This is because attempting to return anything other than a DOM element
will result in the following error:
```js
TypeError: Argument 1 of Node.appendChild does not implement interface Node
```
We are not "fans" of having "empty" elements in the DOM, it's "sloppy". <br />
Hence the `concat()` approach which results in "clean" DOM.

At this point our test assertions all pass:
```sh
node test/todo-app.test.js
```

![render_item-tests-pass](https://user-images.githubusercontent.com/194400/45167506-2c1af900-b1f1-11e8-9898-af46f979fdbd.png)

But we are building a _visual_ application and are not _seeing_ anything ...

#### _Visualise_ Editing Mode?

Let's take a _brief_ detour to _visualise_ the progress we have made.

Open the `index.html` file
and alter the contents of the `<script>` tag:
```html
<script>
  var model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: false },
      { id: 2, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 2 // edit the 3rd todo list item (which has id == 2)
  };
  mount(model, update, view, 'app', subscriptions);
</script>
```

Then in your terminal, start the live-server:
```sh
npm start
```
In your browser, vist: http://127.0.0.1:8000/ <br />
You should see that the _third_ todo list item is in "**editing _mode_**":

![elm-todomvc-editing-item](https://user-images.githubusercontent.com/194400/45180706-0eab5680-b214-11e8-9dcf-a8c4476e4b11.png)

Nothing will happen (_yet_) if you attempt to "save" any changes.
Let's work on the `case` (_handler_) for **`signal('EDIT', item.id)`**
which will handle the "double-click" event and set `model.editing`.


### 5.2 Double-Click item `<label>` to Edit

The TodoMVC ***spec*** for item
https://github.com/tastejs/todomvc/blob/main/app-spec.md#item
includes the line:

```sh
Double-clicking the <label> activates editing mode, by toggling the .editing class on its <li>
```

> _**Note**: the sample TodoMVC Browser Tests:
https://github.com/tastejs/todomvc/tree/main/tests#example-output
does **not** include a test-case for **double-clicking**.
We are going to add one below for "extra credit"._

Since Double-clicking/tapping is the _only_ way to edit a todo item,
we feel that it deserves a test.

#### _How_ do we Track Double-Clicking?

When we don't know how to do something, a good place to start is to search
for the keywords we want, e.g: "JavaScript detect double-click event"
for which the top result is the following StackOverflow Q/A:
https://stackoverflow.com/questions/5497073/how-to-differentiate-single-click-event-and-double-click-event

Reading though all the answers, we determine that the most relevant (_to us_)
is: https://stackoverflow.com/a/16033129/1148249 (_which uses "vanilla" JS_):

[![stackoverflow-double-click-example](https://user-images.githubusercontent.com/194400/45124122-14942f80-b161-11e8-94c0-f54f2352bdd5.png)](https://stackoverflow.com/a/16033129/1148249)

>_**Note**: when you find a StackOverflow question/answer **helpful,
upvote** to show your appreciation!_

```html
<div onclick="doubleclick(this, function(){alert('single')}, function(){alert('double')})">click me</div>
<script>
  function doubleclick(el, onsingle, ondouble) {
    if (el.getAttribute("data-dblclick") == null) {
      el.setAttribute("data-dblclick", 1);
      setTimeout(function () {
        if (el.getAttribute("data-dblclick") == 1) {
          onsingle();
        }
        el.removeAttribute("data-dblclick");
      }, 300);
    } else {
      el.removeAttribute("data-dblclick");
      ondouble();
    }
  }
</script>
```
Given that we are using the Elm Architecture to manage the DOM,
we don't want a function that _alters_ the DOM.
So we are going to _borrow_ the _logic_ from this example but _simplify_ it.
Since we are not mutating the DOM by setting `data-dblclick` attributes,
we won't need to remove the attribute using a `setTimeout`,


### 5.2 `'EDIT' update case` _Test_

In keeping with our TDD approach,
our _first_ step when adding the `case` expression
for `'EDIT'` in the `update` function is to write a _test_.

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.2 Double-click an item <label> to edit it', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  const label = document.querySelectorAll('.view > label')[1]
  // "double-click" i.e. click the <label> twice in quick succession:
  label.click();
  label.click();
  // confirm that we are now in editing mode:
  t.equal(document.querySelectorAll('.editing').length, 1,
    "<li class='editing'> element is visible");
  t.equal(document.querySelectorAll('.edit')[0].value, model.todos[1].title,
    "<input class='edit'> has value: " + model.todos[1].title);
  t.end();
});
```
If you attempt to run this test: `node test/todo-app.test.js`
you will see output similar to the following:

![edit-double-click-test-failing](https://user-images.githubusercontent.com/194400/45183202-54b7e880-b21b-11e8-84d8-7b3b50162113.png)

Let's write the code necessary to make the test assertions _pass_!
If you want to try this yourself based on the StackOverflow answer (_above_),
go for it! (_don't scroll down to the "answer" till you have tried..._)

### 5.2 `'EDIT' update case` _Implementation_

Given our "research" (_above_) of how to implement a "double-click" handler,
we can write the `'EDIT'` case as the following:

```js
case 'EDIT':
  // this code is inspired by: https://stackoverflow.com/a/16033129/1148249
  // simplified as we are not altering the DOM!
  if (new_model.clicked && new_model.clicked === data &&
    Date.now() - 300 < new_model.click_time ) { // DOUBLE-CLICK < 300ms
      new_model.editing = data;
      console.log('DOUBLE-CLICK', "item.id=", data,
      "| model.editing=", model.editing,
      "| diff Date.now() - new_model.click_time: ",
      Date.now(), "-", new_model.click_time, "=",
      Date.now() - new_model.click_time);
  }
  else { // first click
    new_model.clicked = data; // so we can check if same item clicked twice!
    new_model.click_time = Date.now(); // timer to detect double-click 300ms
    new_model.editing = false; // reset
    console.log('FIRST CLICK! data:', data);
  }
  break;
```
If you ignore/remove the `console.log` lines (_which we are using for now!_),
the code is only a few lines long:
```js
case 'EDIT':
  // this code is inspired by: https://stackoverflow.com/a/16033129/1148249
  // simplified as we are not altering the DOM!
  if (new_model.clicked && new_model.clicked === data &&
    Date.now() - 300 < new_model.click_time ) { // DOUBLE-CLICK < 300ms
      new_model.editing = data;
  }
  else { // first click
    new_model.clicked = data; // so we can check if same item clicked twice!
    new_model.click_time = Date.now(); // timer to detect double-click 300ms
    new_model.editing = false; // reset
  }
  break;
```
The main "purpose" of this code is to _detect_ if a `<label>` was clicked
twice in the space of 300 milliseconds and apply the `item.id` to
the `model.editing` property so that we know which `<li>` to render in
"editing mode".

Run the test and watch it _pass_: `node test/todo-app.test.js`
![edit-double-click-test-pass](https://user-images.githubusercontent.com/194400/45183878-3bb03700-b21d-11e8-9842-be62113bfe0a.png)

In this case the time between the two clicks was 31 milliseconds,
so they will count as a "double-click"!


If a `<label>` is clicked slowly, the `model.editing` will _not_ be set,
and we will _not_ enter "editing mode".
Let's add a quick test for the scenario
where two clicks are more than 300ms apart.

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.2.2 Slow clicks do not count as double-click > no edit!', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  const label = document.querySelectorAll('.view > label')[1]
  // "double-click" i.e. click the <label> twice in quick succession:
  label.click();
  setTimeout(function (){
    label.click();
    // confirm that we are now in editing mode:
    t.equal(document.querySelectorAll('.editing').length, 0,
      "<li class='editing'> element is NOT visible");
    t.end();
  }, 301)
});
```

There is no need to write any code to make this test pass,
this is merely an additional test to _confirm_ that our check for the
time between clicks works; clicks spaced more than 300ms will not count
as "double-click".

![edit-item-not-double-click](https://user-images.githubusercontent.com/194400/45184155-ff310b00-b21d-11e8-8f6c-ef6d699861cf.png)


### 5.3 `'SAVE'` a Revised Todo Item Title after Editing it

Once you are done editing a todo list item title,
you want to _save_ your changes!


### 5.3 `'SAVE' update case` _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.3 [ENTER] Key in edit mode triggers SAVE action', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 1 // edit the 3rd todo list item (which has id == 2)
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // change the
  const updated_title = "Do things that don\'t scale!  "
  // apply the updated_title to the <input class="edit">:
  document.querySelectorAll('.edit')[0].value = updated_title;
  // trigger the [Enter] keyboard key to ADD the new todo:
  document.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 13}));
  // confirm that the todo item title was updated to the updated_title:
  const label = document.querySelectorAll('.view > label')[1].textContent;
  t.equal(label, updated_title.trim(),
      "item title updated to:" + updated_title + ' (trimmed)');
  t.end();
});
```
If you attempt to run this test: `node test/todo-app.test.js`
you will see output similar to the following:

![save-edit-test-fails](https://user-images.githubusercontent.com/194400/45187886-2c83b600-b22a-11e8-8782-6d3fcaa240df.png)


### 5.3 `'SAVE' update case` _Implementation_

The _first_ step in the implementation is to create the `'SAVE'` case
in `update` function:

```js
case 'SAVE':
  var edit = document.getElementsByClassName('edit')[0];
  var value = edit.value;
  var id = parseInt(edit.id, 10);
  // End Editing
  new_model.clicked = false;
  new_model.editing = false;

  if (!value || value.length === 0) { // delete item if title is blank:
    return update('DELETE', new_model, id);
  }
  // update the value of the item.title that has been edited:
  new_model.todos = new_model.todos.map(function (item) {
    if (item.id === id && value && value.length > 0) {
      item.title = value.trim();
    }
    return item; // return all todo items.
  });
  break;
```

The _second_ step is _triggering_ this `case` in the `subscriptions`
event listener for `keyup`:

_Before_:

```js
document.addEventListener('keyup', function handler (e) {
  switch(e.keyCode) {
    case ENTER_KEY:
      var new_todo = document.getElementById('new-todo');
      if(new_todo.value.length > 0) {
        signal('ADD')(); // invoke singal inner callback
        new_todo.value = ''; // reset <input> so we can add another todo
        document.getElementById('new-todo').focus();
      }
      break;
  }
});
```


_After_:

```js
document.addEventListener('keyup', function handler (e) {
  switch(e.keyCode) {
    case ENTER_KEY:
      var editing = document.getElementsByClassName('editing');
      if (editing && editing.length > 0) {
        signal('SAVE')(); // invoke singal inner callback
      }

      var new_todo = document.getElementById('new-todo');
      if(new_todo.value.length > 0) {
        signal('ADD')(); // invoke singal inner callback
        new_todo.value = ''; // reset <input> so we can add another todo
        document.getElementById('new-todo').focus();
      }
      break;
  }
});
```

When you run the tests: `node test/todo-app.test.js`
they should now _pass_:
![save-update-test-pass](https://user-images.githubusercontent.com/194400/45188350-d879d100-b22b-11e8-8669-94e080a25ef7.png)


### 5.4 `'SAVE'` a _Blank_ item.title _deletes_ the item _Test_

Our mini-mission is to make the following TodoMVC test assertion _pass_:

```
✓ should remove the item if an empty text string was entered (1033ms)
```

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.4 SAVE should remove the item if an empty text string was entered',
  function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 1 // edit the 3rd todo list item (which has id == 2)
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view').length, 2, 'todo count: 2');
  // apply empty string to the <input class="edit">:
  document.querySelectorAll('.edit')[0].value = '';
  // trigger the [Enter] keyboard key to ADD the new todo:
  document.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 13}));
  // confirm that the todo item was removed!
  t.equal(document.querySelectorAll('.view').length, 1, 'todo count: 1');
  t.end();
});
```
If you attempt to run this test: `node test/todo-app.test.js`
you will see output similar to the following:

![save-blank-title-test-failing](https://user-images.githubusercontent.com/194400/45188593-e4b25e00-b22c-11e8-9623-26c8b017e9b1.png)

### 5.4 `'SAVE'` a _Blank_ item.title _deletes_ the item _Implementation_

To make this test pass we just need to add a couple of lines to the
`'SAVE'` case in the `update` function:

```js
if (!value || value.length === 0) { // delete item if title is blank:
  return update('DELETE', new_model, id);
}
```

when you _re-run_ the tests, they will _pass_:

![save-blank-title-test-pass](https://user-images.githubusercontent.com/194400/45188666-41ae1400-b22d-11e8-8154-176b5aaaea42.png)

### 5.5 `'CANCEL'` edit on [esc] Key Press

When a user presses the [esc] ("escape") key, editing should be "cancelled"
without saving the changes:

```
✓ should cancel edits on escape
```

#### 5.5 `'CANCEL'` edit on [esc] _Test_


Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.5 CANCEL should cancel edits on escape', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 1 // edit the 3rd todo list item (which has id == 2)
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view > label')[1].value,
    model.todos[1].title, 'todo id 1 has title: ' + model.todos[1].title);
  // apply empty string to the <input class="edit">:
  document.querySelectorAll('.edit')[0].value = 'Hello World';
  // trigger the [esc] keyboard key to CANCEL editing
  document.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 27}));
  // confirm the item.title is still the original title:
  t.equal(document.querySelectorAll('.view > label')[1].value,
      model.todos[1].title, 'todo id 1 has title: ' + model.todos[1].title);
  t.end();
});
```
If you attempt to run this test: `node test/todo-app.test.js`
it should fail.

### 5.5 `'CANCEL'` edit on [esc] _Implementation_

To make this test pass we _first_ need to add a `'CANCEL'`
`case` to the `update` function:

```js
case 'CANCEL':
  new_model.clicked = false;
  new_model.editing = false;
  break;
```
_Second_ we need to _trigger_ the `'CANCEL'` action
when the `[esc]` key is pressed, so we need to add a `case`
to the `switch(e.keyCode) {` in the subscriptions event listener:

_Before_:

```js
document.addEventListener('keyup', function handler (e) {
switch(e.keyCode) {
  case ENTER_KEY:
    var editing = document.getElementsByClassName('editing');
    if (editing && editing.length > 0) {
      signal('SAVE')(); // invoke singal inner callback
    }

    var new_todo = document.getElementById('new-todo');
    if(new_todo.value.length > 0) {
      signal('ADD')(); // invoke singal inner callback
      new_todo.value = ''; // reset <input> so we can add another todo
      document.getElementById('new-todo').focus();
    }
    break;
}
});
```


_After_:

```js
document.addEventListener('keyup', function handler (e) {
  console.log('e.keyCode:', e.keyCode, '| key:', e.key);

  switch(e.keyCode) {
    case ENTER_KEY:
      var editing = document.getElementsByClassName('editing');
      if (editing && editing.length > 0) {
        signal('SAVE')(); // invoke singal inner callback
      }

      var new_todo = document.getElementById('new-todo');
      if(new_todo.value.length > 0) {
        signal('ADD')(); // invoke singal inner callback
        new_todo.value = ''; // reset <input> so we can add another todo
        document.getElementById('new-todo').focus();
      }
      break;
    case ESCAPE_KEY:
      signal('CANCEL')();
      break;
  }
});
```

when you re-run the tests, they will pass:
![cancel-editing-on-esc-keypress-test-passing](https://user-images.githubusercontent.com/194400/45189286-15e05d80-b230-11e8-938c-4df80e49fda9.png)

### 6. Counter

```
✓ should display the current number of todo items
```

#### 6. Counter _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('6. Counter > should display the current number of todo items',
  function (t) {
  elmish.empty(document.getElementById(id));
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: false },
      { id: 2, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/'
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // count:
  const count = parseInt(document.getElementById('count').textContent, 10);
  t.equal(count, model.todos.length, "displays todo item count: " + count);

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('todos-elmish_' + id);
  t.end();
});
```

Thankfully, the counter was already implemented above
so this test **_already_ passes**:

![counter-test-passing](https://user-images.githubusercontent.com/194400/45190621-ca7d7d80-b236-11e8-92b3-5a4fbda6f12a.png)

Just keep on [_movin_'](https://youtu.be/uvRBUw_Ls2o)


### 7. Clear Completed Button

When items are complete we should be able to `delete` them in bulk.

```
✓ should display the number of completed items
✓ should remove completed items when clicked
✓ should be hidden when there are no items that are completed
```

#### 7. Clear Completed Button _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('7. Clear Completed > should display the number of completed items',
  function (t) {
  elmish.empty(document.getElementById(id));
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: true },
      { id: 2, title: "Let's solve our own problem", done: true }
    ],
    hash: '#/'
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // count todo items in DOM:
  t.equal(document.querySelectorAll('.view').length, 3,
    "at the start, there are 3 todo items in the DOM.");

  // count completed items
  const completed_count =
    parseInt(document.getElementById('completed-count').textContent, 10);
  const done_count = model.todos.filter(function(i) {return i.done }).length;
  t.equal(completed_count, done_count,
    "displays completed items count: " + completed_count);

  // clear completed items:
  const button = document.querySelectorAll('.clear-completed')[0];
  button.click();

  // confirm that there is now only ONE todo list item in the DOM:
  t.equal(document.querySelectorAll('.view').length, 1,
    "after clearing completed items, there is only 1 todo item in the DOM.");

  // no clear completed button in the DOM when there are no "done" todo items:
  t.equal(document.querySelectorAll('clear-completed').length, 0,
    'no clear-completed button when there are no done items.')

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('todos-elmish_' + id);
  t.end();
});
```

#### 7. Clear Completed Button _Implementation_

First we need to update the `button` section in the `render_footer` function
to include the `done` count:

_Before:_

```js
button(["class=clear-completed", "style=display:" + display_clear],
  [
    text("Clear completed")
  ]
)
```

_After:_

```js
button(["class=clear-completed", "style=display:" + display_clear,
  signal('CLEAR_COMPLETED')
  ],
  [
    text("Clear completed ["),
    span(["id=completed-count"], [
      text(done)
    ]),
    text("]")
  ]
)
```

_Seconde_ we need to add a `'CLEAR_COMPLETED'` `case` to the `update` function:

```js
case 'CLEAR_COMPLETED':
  new_model.todos = new_model.todos.filter(function (item) {
    return !item.done; // only return items which are item.done = false
  });
  break;
```

The tests should pass:

![clear-completed-button-tests-passing](https://user-images.githubusercontent.com/194400/45191359-a58b0980-b23a-11e8-91bf-dcb016d6f4bb.png)

<br />

### 8. Persistence > Save Todo List items to `localStorage`

```
✓ should persist its data
```

#### 8. Persistence _Test_

We have already covered saving the `model`
to `localStorage` in _detail_ (_above_),
we are adding a "proxy" test for completeness:

```js
test.only('8. Persistence > should persist its data', function (t) {
  elmish.empty(document.getElementById(id));
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false }
    ],
    hash: '#/'
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // confirm that the model is saved to localStorage
  console.log('localStorage', localStorage.getItem('todos-elmish_' + id));
  t.equal(localStorage.getItem('todos-elmish_' + id),
    JSON.stringify(model), "data is persisted to localStorage");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('todos-elmish_' + id);
  t.end();
});
```

Again, this test should _already_ pass:

![persistence-test-passing](https://user-images.githubusercontent.com/194400/45190477-0a903080-b236-11e8-991c-bab61efb3d22.png)

### 9. Routing

The following assertions:
```
✓ should allow me to display active items
✓ should allow me to display completed items
✓ should allow me to display all items
✓ should highlight the currently applied filter
```

+ `'SHOW_ALL'` the default view.
+ `'SHOW_ACTIVE'` item.done === false
+ `'SHOW_COMPLETED'` item.done === true


#### 9. Routing _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('9. Routing > should allow me to display active/completed/all items',
  function (t) {
  elmish.empty(document.getElementById(id));
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: true },
      { id: 2, title: "Let's solve our own problem", done: true }
    ],
    hash: '#/active' // ONLY ACTIVE items
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view').length, 1, "one active item");
  let selected = document.querySelectorAll('.selected')[0]
  t.equal(selected.id, 'active', "active footer filter is selected");

  // empty:
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  // show COMPLTED items:
  model.hash = '#/completed';
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view').length, 2,
    "two completed items");
  selected = document.querySelectorAll('.selected')[0]
  t.equal(selected.id, 'completed', "completed footer filter is selected");

  // empty:
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  // show ALL items:
  model.hash = '#/';
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view').length, 3,
    "three items total");
  selected = document.querySelectorAll('.selected')[0]
  t.equal(selected.id, 'all', "all footer filter is selected");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('todos-elmish_' + id);
  t.end();
});
```


#### 9. Routing _Implementation_

Given that we are using "hash" based routing,
where the content of the app changes in response to the hash portion of the URL
implementing routing is a matter of _filtering_ the Todo List items
in response to the hash.

There 3 steps to implementing this:

1. Create an Event Listener for the `window.onhashchange` event
which invokes `signal('ROUTE')`.

2. Create a `'ROUTE'` case in the `update` function
which sets the `model.hash` value.

3. Based on the `model.hash` value defined above,
filter the `model.todos`.

Since this is the _final_ quest in the TodoMVC/Todo List App,
the we encourage you to attempt to write this
before/without looking at the "solution".

Remember that you only want to write the _minimum_ code
necessary to make the test assertions pass.

If you get "_stuck_" consult the code in `todo-app.js`.


#### 9.1 Routing _Event Listener_

Add the following event listener to your `subscriptions`
to "listen" for when the URL hash changes:


```js
window.onhashchange = function route () {
  signal('ROUTE')();
}
```

#### 9.2 ROUTE `case`

Add the `'ROUTE'` `case`
to your `update` function:

```js
case 'ROUTE':
  new_model.hash = (window && window.location && window.location.hash) ?
    window.location.hash : '#/';
  break;
```
***OR***, if you are confident that your app
will _always_ run in a Web Browser with a `window.location.hash` property:

```js
case 'ROUTE':
  new_model.hash = window.location.hash;
  break;
```

#### But _Why...?_

**Question**: Why do we "copy" the `window.location.hash`
to `model.hash` instead of just "getting" it from `window.location.hash`
each time we need to know what the hash is? <br />

**Answer**: technically, we could _avoid_ having
the `'ROUTE'` case in `update` completely
and just use the `window.location.hash`
instead of `model.hash`,
the _reason_ we add this "step"
is that we want to have a "single source of truth" in the `model`.
This is a _good_ habit to have
as it makes _debugging_ your application
_much_ easier because you _know **exactly**_
what the "full state" of the application is/was at any point in time.  

You will often read/hear the expression "_easier to **reason about**_",
all this means is that you can "work through" something in your head
without getting "confused" by having "too many things to keep track of".


#### 9.3 _Filter_ the `model.todos` based on `model.hash`

We need to do the filtering "_non-destructively_",
so it needs to happen in the **`view`** function `render_main`
(_just before rendering_).

`render_main` function _Before_ (_without filter_):

```js
function render_main (model, signal) {
  // Requirement #1 - No Todos, should hide #footer and #main
  var display = "style=display:"
    + (model.todos && model.todos.length > 0 ? "block" : "none");
  // console.log('display:', display);
  return (
    section(["class=main", "id=main", display], [ // hide if no todo items.
      input(["id=toggle-all", "type=checkbox",
        typeof signal === 'function' ? signal('TOGGLE_ALL') : '',
        (model.all_done ? "checked=checked" : ""),
        "class=toggle-all"
      ], []),
      label(["for=toggle-all"], [ text("Mark all as complete") ]),
      ul(["class=todo-list"],
        (model.todos && model.todos.length > 0) ?
        model.todos.map(function (item) {
          return render_item(item, model, signal)
        }) : null
      ) // </ul>
    ]) // </section>
  )
}

```

`render_main` function _After_ (_with `model.hash` filter_):

```js
function render_main (model, signal) {
  // Requirement #1 - No Todos, should hide #footer and #main
  var display = "style=display:"
    + (model.todos && model.todos.length > 0 ? "block" : "none");
  // console.log('display:', display);
  return (
    section(["class=main", "id=main", display], [ // hide if no todo items.
      input(["id=toggle-all", "type=checkbox",
        typeof signal === 'function' ? signal('TOGGLE_ALL') : '',
        (model.all_done ? "checked=checked" : ""),
        "class=toggle-all"
      ], []),
      label(["for=toggle-all"], [ text("Mark all as complete") ]),
      ul(["class=todo-list"],
        (model.todos && model.todos.length > 0) ?
        model.todos
        .filter(function (item) {
          switch(model.hash) {
            case '#/active':
              return !item.done;
            case '#/completed':
              return item.done;
            default: // if hash doesn't match Active/Completed render ALL todos:
              return item;
          }
        })
        .map(function (item) {
          return render_item(item, model, signal)
        }) : null // if there are no todos, don't show anything.
      ) // </ul>
    ]) // </section>
  )
}
```
The important lines are:
```js
.filter(function (item) {
  switch(model.hash) {
    case '#/active':
      return !item.done;
    case '#/completed':
      return item.done;
    default: // if hash doesn't match Active/Completed render ALL todos:
      return item;
  }
})
```
`Array.filter` returns a ***`new`*** Array
(_it does not "mutate" the Array it is filtering_)
so we will only see the todo items that match the `hash` in the URL.
`'#/active'` means any todos which are not yet done i.e. `!done`
and `'#/completed'` are the items which are `done=true`.
If the URL `hash` does not match either of these two filters,
then simply "show everything".

> _**Question**: is this "**logic in the view**"...?_ <br />
> _**Answer**: **Yes**, it is **presentation logic**.
The `view` function, **`render_main` in this case
is merely **filtering** the data **non-destructively** before rendering it.
Using `Array.filter` is a "fancy" (concise) way of writing an `if` statement.
`if` statements are "OK" in views because they are
"conditional presentation logic"
i.e. only show this section `if` a certain variable is set. <br />_
_By using `Array.filter` followed by `Array.map` we render a **subset**
of the `model.todos` **without** "**mutating**" the `model.todos` Array.
In other words if the URL hash is `'#/completed'`
the user only wants to see the "completed" items,
we don't want to "lose" the todos that are not yet complete,
we just want to "hide" them temporarily,
if we were to apply this filter in the `update` function it would
"lose" the other todos (i.e. destroy the data!)
the best way to filter data non-destructively is in the **view**_

# Done!

In your terminal, run:

```sh
npm start
```

You should have a fully-featured Todo list App!

![elm-todo](https://user-images.githubusercontent.com/194400/45237254-10d5e980-b2d6-11e8-8281-b95452bde519.gif)

Try out your Todo List App!

If you found this tutorial _useful_,
please "star" the project on GitHub ⭐️ to show your appreciation
and share it with others in the community who might find it useful! Thanks! ✨

Consider sharing your creation with your friends
by deploying it to GitHub Pages!
https://github.com/dwyl/learn-github-pages


# Thanks for Learning with Us!


<!--
## What _Next_?

If you feel _confident_ with your "TEA" skills you can _either_:
+ **`try`** and use them to **create your _own_ App** using "TEA"
e.g: https://github.com/nelsonic/time-mvp
+ Move on and **Learn Elm**: https://github.com/dwyl/learn-elm
+ (Join the herd and) Learn & use React/Redux.
-->
