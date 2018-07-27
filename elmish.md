# `Elm`(_ish_)

### How to Build a Front-end Micro-Framework _From Scratch_

![elmlogo-ish](https://user-images.githubusercontent.com/194400/43213139-b70a4c68-902d-11e8-8162-3c7cb56b6360.png)
<!-- the colors are deliberately "a bit off" to emphasize that
this is a "inspired by" but really a "poor immitation" of Elm! -->

`Elm`(_ish_) is an **`Elm`**-_inspired_ `JavaScript` (**ES5**)
fully functional front-end _micro_-framework.[<sup>1</sup>](#notes) <br />



## _Why?_

The purpose of building `Elm`(_ish_) is _not_ to "_replace_" Elm
or to create _yet another_ front-end JS framework!

The purpose of _separating_ the `Elm`(_ish_) functions
into a "micro framework" is to: <br />
**a)** **abstract** the "plumbing" so that we can
***simplify*** the Todo List application code
to _just_
["**application logic**"](https://en.wikipedia.org/wiki/Business_logic). <br />
**b)** _demonstrate_ a ***re-useable*** (_fully-tested_)
"**micro-framework**" that allows us
to _practice_ using The Elm Architecture ("TEA").<br />
**c)** promote the **mindset** of writing **tests _first_**
and **`then`** the _least_ amount of code necessary to pass the test
(_while meeting the acceptance criteria_).

> _**Test** & **Document-Driven Development** is **easy** and it's **easily**
one of the **best habits** to form in your software development career.
This walkthrough shows **how** you can do it **the right way**
from the **start** of a project._


## _What?_

A walkthrough of creating a
_fully functional front-end_ "**micro framework**" ***from scratch***.

By the end of this exercise you will _understand_
The Elm Architecture (TEA) _much better_
because we will be analysing, documenting, testing
and writing each function required
to architect and render the our Todo List (TodoMVC) App.

## _Who?_

People who wants to gain an _in-depth_ understanding
of The Elm Architecture ("TEA")
and thus _intrinsically_ grok Redux/React JavaScript apps.

This tutorial is intended for _beginners_ who have _modest_
JavaScript knowledge (_variables, functions, DOM methods and TDD_). <br />
If you have any questions or get "stuck",
please open an issue:
https://github.com/dwyl/learn-elm-architecture-in-javascript/issues <br />
@dwyl is a "safe space" and we are all here to help don't be shy/afraid.


## _How_?

_Before_ diving into _writing functions_ for `Elm`(_ish_),
we need to consider how we are going to _test_ it.
By ensuring that we follow **TDD** from the _start_ of an App,
we _avoid_ having to "correct" any "**bad habits**" later.

We will be using **Tape** and **`JSDOM`** for testing the functions.
Tape is a _minimalist_ testing framework
that is fast and has everything we need.
**`JSDOM`** is a JavaScript implementation of the
WHATWG DOM and HTML standards, for use with node.js. <br />
If _either_ of these tools is _unfamiliar_ to you,
please see:
[https://github.com/dwyl/**learn-tape**](https://github.com/dwyl/learn-tape)
and
[front-end-with-tape.md](https://github.com/dwyl/learn-tape/blob/master/front-end-with-tape.md)

### Start by Creating the Files

It's "OK" to ask: "_Where do I **start** (my **TDD** quest)?_" <br />
The answer is: create **two** new files:
`examples/todo-list/elmish.js` and `test/elmish.test.js`

We will create a couple of tests and their corresponding functions _next_
but first, let's take a moment to think about what we _can_ generalise
from the code we wrote for our "counter" example at the start of this tutorial.

### What _Can_ We _Generalise_ ?

Our **first step** in creating `Elm`(_ish_) is to consider
what _can_ be _generalised_ into
an application-independent re-useable framework.

> Our **rule-of-thumb** is: anything that creates (_or destroys_)
a DOM element or looks like "plumbing"
(_e.g: "routing" or "managing state"_) is _generic_
and should thus be abstracted into the `Elm`(_ish_) framework.


Recall that there are **3 parts** to the Elm Architecture:
`model`, `update` and `view`. <br />
These correspond to the `M`odel, `C`ontroller and `V`iew
of
["**MVC** pattern"](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller),
which is the most _widely used_ "software architecture pattern".

> **Aside**: "**software architecture**" is just a fancy way of saying
"how code is **organised**" and/or how "data **flows**" through a system.
Whenever you see the word "**pattern**" it just means
"a bunch of experienced people have concluded that this works well,
so as beginners, we don't have to think too hard."

The _reason_ Elm refers to the "**Controller**" as "***Update***" is because
this name _more accurately_ reflects what the function _does_:
it _updates_ the _state_ (Model) of the application.

Our `update` and `view` functions will form
the "**domain logic**" of our Todo List App,
(_i.e. they are "**specific**" to the Todo List_)
so we cannot abstract them. <br />
The `model` will be a JavaScript `Object` where the App's data will be stored.

The `update` function is a simple `switch` statement
that "decides" how to to _update_ the app's `model`
each `case` will call a function
that _belongs_ to the Todo List App. <br />

The `view` function _invokes_ several "helper" functions
which create HTML ("DOM") elements e.g: `<section>`, `<div>` & `<button>`;
these _can_ (_will_) be generalised (_below_).


Let's start with a couple of "_familiar_" _generic_ functions
(_which we saw and used in the "counter" example_):
`empty` and `mount`. <br />

<br />

#### `empty` the DOM

Start by _describing_ what the `empty` function _does_. <br />
This is both to clarify our _own_ understanding
as the people _writing_ the code <br />
and to _clearly communicate_ with the **`humans` _reading_** the code.

##### Function Description

The `empty` function clears the DOM elements out of a specific "root" element.
We use it to erase the DOM before re-rendering our app.

Following "**_Document(ation)_ Driven Development**",
we create a **`JSDOC`** comment block
in the `examples/todo-list/elmish.js` file
with _just_ the function description:

```js
/**
 * `empty` clears the DOM elements out of a specific "root" element.
 * it is used to erase the DOM before re-rendering the app.
 */
```
Writing out the function documentation _first_
helps us _think_ about the functionality.
Even if you know _exactly_ what code needs to be written,
_resist_ the temptation to write the code until it is documented.
Even if you are writing code alone,
always imagine that you are "_pairing_" with someone
who does _not_ (_already_) "know the solution"
and you are _explaining_ it to them.



Given that we _know_ we are going to use the `empty`

function we used previously in our `counter`,
`counter-reset` and `multiple-counters` examples (_in the "basic" TEA tutorial_)
we can write a _test_ for the `empty` function quite easily.


In the `test/elmish.test.js` file, type the following code:
```js
const test = require('tape');       // https://github.com/dwyl/learn-tape
const fs = require('fs');           // to read html files (see below)
const path = require('path');       // so we can open files cross-platform
const elmish = require('../examples/todo-list/elmish.js'); // functions to test
const html = fs.readFileSync(path.resolve(__dirname,
  '../examples/todo-list/index.html')); // sample HTML file for JSDOM to load
require('jsdom-global')(html);      // https://github.com/rstacruz/jsdom-global
elmish.init(document);              // pass JSDOM into elmish for DOM functions
const id = 'test-app';              // all tests use 'test-app' as root element

test('empty("root") removes DOM elements from container', function (t) {
  // setup the test div:
  const text = 'Hello World!'
  const root = document.getElementById(id);
  const div = document.createElement('div');
  div.id = 'mydiv';
  const txt = document.createTextNode(text);
  div.appendChild(txt);
  root.appendChild(div);
  // check text of the div:
  const actual = document.getElementById('mydiv').textContent;
  t.equal(actual, text, "Contents of mydiv is: " + actual + ' == ' + text);
  t.equal(root.childElementCount, 1, "Root element " + id + " has 1 child el");
  // empty the root DOM node:
  elmish.empty(root); // <-- exercise the `empty` function!
  t.equal(root.childElementCount, 0, "After empty(root) has 0 child elements!")
  t.end();
});
```

> _**Note**: if any line in this file is **unfamiliar** to you,
please **first** go back over the previous example(s)_:
`counter-basic` _and_ `counter-reset`,
_**then** do bit of "googling" for any words or functions you don't recognise
e.g: `childElementCount`,
and if you are **still** "**stuck**"_,
[***please open an
issue***!](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues)
_It's **essential** that you **understand** each **character**
in the code **before** continuing to **avoid** "**confusion**" later._

Now that we have the **test** for our `empty` function written,
we can add the `empty` function to `examples/todo-list/elmish.js`:
```js
/**
 * `empty` the contents of a given DOM element "node" (before re-rendering).
 * This is the *fastest* way according to: stackoverflow.com/a/3955238/1148249
 * @param  {Object} node the exact DOM node you want to empty
 * @example
 * // returns true (once the 'app' node is emptied)
 * const node = document.getElementById('app');
 * empty(node);
 */
function empty(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
```

If the **comment syntax**
above the function definition
is _unfamiliar_,
please see:
[https://github.com/dwyl/**learn-jsdoc**](https://github.com/dwyl/learn-jsdoc)


### `mount` the App

The `mount` function is the "glue" or "wiring" function that
connects the `model`, `update` and `view`; we _can_ _generalise_ it.

In the `test/elmish.test.js` file, type the following code:
```js
// use view and update from counter-reset example
// to invoke elmish.mount() function and confirm it is generic!
const { view, update } = require('../examples/counter-reset/counter.js');

test('elmish.mount app expect state to be Zero', function (t) {
  const root = document.getElementById(id);
  elmish.mount(7, update, view, id);
  const actual = document.getElementById(id).textContent;
  const actual_stripped = parseInt(actual.replace('+', '')
    .replace('-Reset', ''), 10);
  const expected = 7;
  t.equal(expected, actual_stripped, "Inital state set to 7.");
  // reset to zero:
  const btn = root.getElementsByClassName("reset")[0]; // click reset button
  btn.click(); // Click the Reset button!
  const state = parseInt(root.getElementsByClassName('count')[0]
    .textContent, 10);
  t.equal(state, 0, "State is 0 (Zero) after reset."); // state reset to 0!
  elmish.empty(root); // clean up after tests
  t.end()
});
```
> _**Note**: we have "**borrowed**" this test from our previous example.
see:_ `test/counter-reset.test.js`

The corresponding code with JSDOC for the `mount` function
in `examples/todo-list/elmish.js` is:
```js
/**
 * `mount` mounts the app in the "root" DOM Element.
 * @param  {Object} model store of the application's state.
 * @param  {Function} update how the application state is updated ("controller")
 * @param  {Function} view function that renders HTML/DOM elements with model.
 * @param  {String} root_element_id root DOM element in which the app is mounted
 */
function mount(model, update, view, root_element_id) {
  var root = document.getElementById(root_element_id); // root DOM element
  function signal(action) {                     // signal function takes action
    return function callback() {                // and returns callback
      var updatedModel = update(model, action); // update model for the action
      empty(root);                              // clear root el before rerender
      view(signal, updatedModel, root);         // subsequent re-rendering
    };
  };
  view(signal, model, root);                    // render initial model (once)
}
```

### `module.exports`

In order to test the `elmish` functions we need to `export` them.
Additionally, because we are using JSDOM
to test our front-end functions using `tape`,
we need an `init` function to pass in the JSDOM `document`.
add the following lines to `examples/todo-list/elmish.js`:

```js
/**
 * init initialises the document (Global) variable for DOM operations.
 * @param  {Object} doc window.document in browser and JSDOM.document in tests.
 * @return {Object} document returns whatever is passed in.
 */
function init(doc){
  document = doc; // this is used for instantiating JSDOM for testing.
  return document;
}

/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    empty: empty,
    mount: mount,
    init: init
  }
} else { init(document); }
```

Now that we have started creating the `elmish` generic functions,
we need to know which _other_ functions we need. <br />
Let's take a look at the TodoMVC App to "_analyse_ the requirements".

### _Analyse_ the TodoMVC App to "Gather Requirements"

Our _next_ step is to _analyse_ the required functionality of a Todo List.

### _Recommended_ Background Reading: TodoMVC "_Vanilla_" JS

By _far_ the best place to start for _understanding_ TodoMVC's layout/format,
is the "Vanilla" JavaScript (_no "framework"_) implementation:
https://github.com/tastejs/todomvc/tree/gh-pages/examples/vanillajs

Run it locally with:
```
git clone https://github.com/tastejs/todomvc.git
cd todomvc/examples/vanillajs
python -m SimpleHTTPServer 8000
```
Open your web browser to: http://localhost:8000

![vanillajs-localhost](https://user-images.githubusercontent.com/194400/42632838-6e68c20c-85d6-11e8-8ae4-d688f5977704.png)

> If you are unable to run the TodoMVC locally, you can always view it online:
http://todomvc.com/examples/vanillajs

_Play_ with the app by adding a few items,
checking-off and toggling the views in the footer.

> _**Note**: IMO the "**Vanilla**" **JS** implementation
is quite complex and insufficiently documented_
(_very few code comments and sparse_
[`README.md`](https://github.com/tastejs/todomvc/tree/25a9e31eb32db752d959df18e4d214295a2875e8/examples/vanillajs)),
_so don't expect to **understand** it all the first time without study._
_Don't worry, we will walk through building each feature in detail._



## Notes

<sup>1</sup><small>The reason for calling the micro-framework `Elm`(_ish_)
is to **emphasize** that it is "**inspired by**" **`Elm`**.
The only things `Elm`(_ish_) shares with `Elm`
are the "MUV" architecture "pattern"
and function naming/argument similarity.
In all other respects `Elm`(_ish_) is a "**poor imitation**"
and should _only_ be used for learning purposes!
To _truly_ appreciate the awesome elegance, simplicity, power
and personal effectiveness of using Elm, there is **no substitute**
for the "real thing".
</small>
