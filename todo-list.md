# Elm(ish) Todo List (TodoMVC) App (_Real World TDD Tutorial!_)

If you've made it this far, give yourself a pat on the back! <br />
Your persistence is about to pay off as you
"_level up_" _both_ your **`JavaScript`** and "TEA" skills!


## Why?

The _purpose_ of this **Todo List _mini_ project** is to
_consolidate_ your understanding of The Elm Architecture (TEA)
by creating a "real world" _useable_ App following _strict_
Documentation and Test Driven Development.

This will _show_ you that it's not only _possible_
to write docs and tests _first_,
you will see _first hand_ that **`code`** is **more concise**,
**well-documented** and thus **_easier_ to maintain**
and you will get your "work" done ***much faster***.

These are _foundational_ skills that will
pay **_immediate_ returns** on the time invested,
and will **`continue`** to **`return`** "**interest**"
for as long as you write (_and people use your_) software!

> _It's **impossible** to "**over-state**" how **vital writing tests first**
is to both your **personal effectiveness** and **long-term sanity**.
Thankfully, by the end of this chapter, you will see how **easy** it is._



## What?

_Use_ our "TEA" knowledge to build a simple "Todo List" Application. <br />
Along the way we will cover:

+ [x] Building an App using a pre-made CSS Styles/Framework!
+ [x] The Document Object Model (DOM)
+ [x] Browser Routing/Navigation
+ [x] Local Storage for Offline Support

We will be abstracting all "TEA" related ("generic") code
into a file called **`elmish.js`**
so that our Todo List application can be as concise
and "declarative" as possible.



### Todo List?

If you are _unfamiliar_ with Todo lists, simply put:
they are a way of keeping a list of the tasks that need to be done. <br />
see: https://en.wikipedia.org/wiki/Time_management#Setting_priorities_and_goals

Todo Lists or "Checklists" are the _best_ way of tracking tasks. <br />
Atul Gawande wrote a _superb_ book on this subject:
https://www.amazon.com/Checklist-Manifesto-How-Things-Right/dp/0312430000 <br />
Watch: https://www.youtube.com/results?search_query=checklist+manifesto

### TodoMVC?

If you have not come across TodoMVC before,
it's a sample application to showcase various "frontend" frameworks
using a common user interface (UI): a Todo List Application.
![TodoMVC-intro](https://user-images.githubusercontent.com/194400/42624420-4528a3c6-85bd-11e8-8b92-9b1c8951ba35.png)


We _highly recommend_ checking out the following links:

+ Website: http://todomvc.com
+ GitHub project: https://github.com/tastejs/todomvc

For our purposes we will simply be re-using the **TodoMVC `CSS`**
to make our TEA Todo List _look_ good
(_not have to "worry" about styles so we can **focus on functionality**_).
All the JavaScript code will be written "_from scratch_"
to ensure that everything is clear.

## _Who?_

This tutorial is for everyone who wants to _apply_ their "TEA" knowledge
and _think_ about the basics of a Todo List Application.

> As always, if you get "stuck", _please_ open an issue:
https://github.com/dwyl/learn-elm-architecture-in-javascript/issues
by opening a question you help _everyone_ learn more effectively!


## _How?_

### `Elm`(_ish_) ?

In order to _simplify_ the code for our Todo List App,
we _abstracted_ much of the "_generic_" code
into a "front-end micro framework" called `Elm`(_ish_).
The functions & functionality of `Elm`(_ish_) should be _familiar_ to you
so you _should_ be able to build the Todo List using the `Elm`(_ish_)
helper functions e.g: `mount`, `div`, `input` and `route`.

You can _opt_ to _either_:
**a)** read the `Elm`(_ish_) docs/tutorial
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/master/elmish.md)
***`before`*** building the Todo List App -
this will give you both TDD practice
and a deeper understanding of building a micro framework.
i.e. "**_prospective_ learning**"<br />
**b)** refer the `Elm`(_ish_) docs/tutorial
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/master/elmish.md)
***`while`*** building the Todo List App when you "**_need_ to know**"
how one of the helper functions works. i.e. "**_contextual_ learning**" <br />
**c)** **only _consult_** the `Elm`(_ish_) docs/tutorial
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/master/elmish.md)
***`if`*** you are "stuck" ***`while`*** building the Todo List App.
i.e. "**_debug_ learning**" <br />

The choice is yours; there is no "right" way.



### Testing?

_Before_ diving into _building_ the Todo List App,
we need to consider how we are going to _test_ it.
By ensuring that we follow **TDD** from the _start_ of an App,
we _avoid_ having to "correct" any "**bad habits**".

We will be using **Tape** and **JSDOM** for testing
both our functions and the final application.
If you are `new` to either of these tools,
please see:
[https://github.com/dwyl/**learn-tape**](https://github.com/dwyl/learn-tape)
and
[**front-end**-with-tape.md](https://github.com/dwyl/learn-tape/blob/master/front-end-with-tape.md)


#### Create Files

In your editor/terminal create the following files:

+ `test/todo-app.test.js`
+ `examples/todo-list/todo-app.js`

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
const html = fs.readFileSync(path.resolve(__dirname,
  '../examples/todo-list/index.html')); // sample HTML file to initialise JSDOM.
require('jsdom-global')(html);      // https://github.com/rstacruz/jsdom-global
const app = require('../examples/todo-list/todo-app.js'); // functions to test
const id = 'test-app';              // all tests use 'test-app' as root element
```

> Most of this code should be _familiar_ to you
if you have followed previous tutorials.
> If anything is _unclear_ please revisit
[https://github.com/dwyl/**learn-tape**](https://github.com/dwyl/learn-tape)
and
[**front-end**-with-tape.md](https://github.com/dwyl/learn-tape/blob/master/front-end-with-tape.md)

If you attempt to run the test file: `node test/todo-app.test.js`
you should see no output.
(_this is expected as we haven't written any tests yet!_)



### `model`

The `model` for our Todo List App is **_boringly_ simple**.
All we need is an `Object` containing two keys `todos` and `hash`:

```js
{
  todos: [
    { id: 1, title: "Learn Elm Architecture", done: true },
    { id: 2, title: "Build Todo List App",    done: false },
    { id: 3, title: "Win the Internet!",      done, false }
  ],
  hash: '#/' // the "route" to display
}
```
`todos` is an `Array` of `Objects` and each Todo (Array) item
has 3 keys:
+ `id`: the index in the list.
+ `title`: the title/description of the todo item.
+ `done`: a `boolean` indicating if the item is complete or still "todo".


#### What about `metadata` ?

> Metadata is a set of data that describes
and gives information about other data.
https://en.wikipedia.org/wiki/Metadata

There are two types of `metadata` in a Todo List App:
+ `id` - each todo item has an `id`, this is the item's position in the list.
+ `count` - the count of items according to their state of _completion_.
e.g: in the model above there are 3 todo items in the `todos` Array;
2 items which are "active" (`done=false`)
and 1 which is "done" (`done=true`).

Rather than _storing_ "metadata" in the model
(_e.g: the count of active and completed Todo items_)
we will "compute" (derive) it "runtime" to keep the `model` simple.
This may "waste" a few CPU cycles computing the count but that's "OK"!
Even on an _ancient_ Android device
this will only take a millisecond to compute,
will not "slow down" the app or affect UX.


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
  todos: [],me
  hash: "#/"
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
 * @return {Object} updated_model - the transformed model.
 */
```

#### `update` Test > `default case`

As with the `update` in our `counter` example
the function body is a `switch` statement
that "decides" how to handle a request based on the `action` (_also known as the "message"_).

Given that we _know_ that our `update` function "skeleton"
will be a `switch` statement
(_because that is the "TEA" pattern_)
good test to _start_ with is the `default case`.

Append following test code in `test/todo-app.test.js`:

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
 * @return {Object} updated_model - the transformed model.
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

Append following test code to your `test/todo-app.test.js` file:

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
  ],
  hash: "#/"
}
```
_TO_:
```js
{
  todos: [
    {id: 1, "Toggle a todo list item", done: true }
  ],
  hash: "#/"
}
```

Given that we have already defined our `update` function above,
we can dive straight into writing a _test_:


#### `TOGGLE` item _Test_

Append following test code to your `test/todo-app.test.js` file:

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

_Yes_, You _guessed_ it,
choosing to name the `action` as "`TOGGLE`"
is _precisely_ because we don't _need_
to have a _**separate**_ function
to "undo" an item if it has been "checked off".

Append following test code to your `test/todo-app.test.js` file:

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
of the `TOGGLE case` in `upadate` until _all_ tests pass:

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
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/master/elmish.md)
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
echo ![todomvc-3-items-1-done](https://user-images.githubusercontent.com/194400/43689907-e9caa548-98f8-11e8-8fd1-7b63e7fc5e30.png)

Our _quest_ in the next "pomodoro" is to re-create this
using the DOM functions we created in `Elm`(_ish_)!

#### Focus on Rendering The _List_ First

For now, _ignore_ the `<footer>` (_below the Todo List_)
and _just_ focus on rendering the _list_ itself.

![todomvc-3-items-1-done](https://user-images.githubusercontent.com/194400/43690122-b72bcb0e-98fc-11e8-83c2-8b8703b177ed.png)


In your web browser, open **Dev**eloper **Tools**
and _inspect_ the HTML for the Todo list:

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
  + [ ] **`<label>`** - the text content of the todo list item
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
const { a, button, div, empty, footer, input, h1, header, label, li, mount,
  route, section, span, strong, text, ul } =
    (typeof require !== 'undefined') ? require('./elmish.js') : {};

/**
 * `render_item` creates an DOM "tree" with a single Todo List Item
 * using the "elmish" DOM functions (`li`, `div`, `input`, `label` and `button`)
 * returns an `<li>` HTML element with a nested `<div>` which in turn has the:
 * + `<input type=checkbox>` which lets users to "Toggle" the status of the item
 * + `<label>` which displays the Todo item text (`title`) in a `<text>` node
 * + `<button class="destroy">` lets people "delete" a todo item.
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

Append following test code to your `test/todo-app.test.js` file:

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


### `<footer>` Element [issues/53](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/53)

Referring again to the _rendered_ HTML
on http://todomvc.com/examples/vanillajs as our "guide":
![image](https://user-images.githubusercontent.com/194400/42633421-5eb20f24-85d8-11e8-94ad-bb653dd93ab0.png)
there is:
+ [ ] a **`<footer>`** element with
  + [ ] a **`<span>`** element which contains
    + [ ] a **`text`** node with: **"`{count}` item(s) left"**.
  + [ ] a **`<ul>`** containing
    + [ ] 3 **`<li>`** elements each with
     + [ ] a link (**`<a>`**) which allow the "user"
     to ***filter*** which items appear in the **`<view>`**.
  + [ ] a **`<button class="clear-completed">`**
  which will **_Clear_ all `Completed`** items when clicked.

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
  + [ ] **`<button class="clear-completed" style="display: block;">`** will **_Clear_ all `Completed`** items.
    _pseudocode_:
`var new_model =  model.todos.filter(function(item) { return item.done === false})`

#### _Estimate_ Time Required to Write `render_footer` Function

"_armed_" with the acceptance criteria _checklist_
and the
["***informative prior***"](https://en.wikipedia.org/wiki/Prior_probability#Informative_priors)
(_the **experience** we have **already** gained_)
from building the previous view functions
**`render_item`** and **`render_main`**
we ***estimate*** with _reasonable confidence_
that it will take us
**_25 minutes** (_**one** "**pomodoro**_)
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

> If you get "stuck" trying to make the tests pass, first keep tring!
Then "as a friend" and finally, consult the _reference_ implementation in:
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
**`render_main`** #51, **`render_item`** #52, and **`render_footer`** #53
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

> If you get "stuck" trying to make the tests pass, first keep tring!
Then "as a friend" and finally, consult the _reference_ implementation in:
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

Open your **`/examples/todo-list/index.html`** file
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
see: [**`examples/todo-list/index.html`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/ef56c490a48db8a900f1832d0cc373b75838b4d4/examples/todo-list/index.html)


If you run the project with command **`npm start`**
and navigate to: http://127.0.0.1:8000/examples/todo-list

You should see:
![view-working](https://user-images.githubusercontent.com/194400/43786145-e476bdd0-9a5f-11e8-9043-cf997be615ae.png)

So the **`view`** _looks_ like a TodoMVC Todo List
(_mostly thanks to the imported CSS_),
_however_ we still cannot _interact_ with the app.

_Next_ we're going to move to "wiring-up" the _functionality_
to construct the UX.

### Functionality - The _Fun_ Part!

With all the "foundation" well defined and tested,
we can _confidently_ move on to building out the _features_
people _using_ the app will interact with!

#### Requirements?

Take a look at this list of test output:
https://github.com/tastejs/todomvc/tree/master/tests#example-output

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

Recommended reading on CSS `visibility:hidden` vs. `display:none` :
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
  new_todo.dispatchEvent(new KeyboardEvent('keypress', {'keyCode': 13}));
  const items = document.querySelectorAll('.view');

  t.equal(items.length, 1, "should allow me to add todo items");
  // check if the new todo was added to the DOM:
  const actual = document.getElementById('1').textContent;
  t.equal(todo_text.trim(), actual, "should trim text input")

  // subscription keyCode trigger "branch" test (should NOT fire the signal):
  const clone = document.getElementById(id).cloneNode(true);
  new_todo.dispatchEvent(new KeyboardEvent('keypress', {'keyCode': 42}));
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

Reading: https://stackoverflow.com/questions/596481/is-it-possible-to-simulate-key-press-events-programmatically


<!--

## What _Next_?

If you feel _confident_ with your "TEA" skills you can _either_:
+ **`try`** and use them to **create your _own_ App** using "TEA"
e.g: https://github.com/nelsonic/time-mvp
+ Move on and **Learn Elm**: https://github.com/dwyl/learn-elm
+ (Join the herd and) Learn & use React/Redux.
-->
