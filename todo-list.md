# Elm(ish) Todo List (TodoMVC) App (_Real World TDD Tutorial!_)

If you've made it this far, give yourself a pat on the back!
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
well-documented and thus **_easier_ to maintain**
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
  hash: '#/active' // the "route" to display
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
+ count - the count of items according to their state of _completion_.
e.g: in the model above there are
2 items which are "active"
and 1 which is "done".

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

#### `update` Test

As with the `update` in our `counter` example
the function body is a `switch` statement
that "decides" how to handle a request based on the `action` (_also known as the "message"_).

Given that we _know_ that our `update` function "skeleton"
(_because this is the "TEA" pattern_)
good test to _start_ with is the `default case`.



<!--

## What _Next_?

If you feel _confident_ with your "TEA" skills you can _either_:
+ **`try`** and use them to **create your _own_ App** using "TEA"
e.g: https://github.com/nelsonic/time-mvp
+ Move on and **Learn Elm**: https://github.com/dwyl/learn-elm
+ (Join the herd and) Learn & use React/Redux.

-->
