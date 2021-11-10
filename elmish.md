# `Elm`(_ish_)

![elmlogo-ish](https://user-images.githubusercontent.com/194400/43213139-b70a4c68-902d-11e8-8162-3c7cb56b6360.png)
<!-- the colors are deliberately "a bit off" to emphasize that
this is a "inspired by" but really a "poor immitation" of Elm! -->

`Elm`(_ish_) is an **`Elm`**-_inspired_ `JavaScript` (**ES5**)
fully functional front-end _micro_-framework from _scratch_.[<sup>1</sup>](#notes)

<br />

## _Why?_

The purpose of building `Elm`(_ish_) is _not_ to "_replace_" Elm
or to create [_yet another_ front-end JS framework](https://medium.com/tastejs-blog/yet-another-framework-syndrome-yafs-cf5f694ee070)!

The purpose of _separating_ the `Elm`(_ish_) functions
into a "micro framework" is to: <br />
**a)** **abstract** the "plumbing" so that we can
***simplify*** the Todo List application code
to _just_
["**application logic**"](https://en.wikipedia.org/wiki/Business_logic). <br />
**b)** _demo_ a ***re-useable*** (_fully-tested_)
"**micro-framework**" that allows us
to _practice_ using The Elm Architecture ("TEA").<br />
**c)** promote the **mindset** of writing **tests _first_**
and **`then`** the _least_ amount of code necessary to pass the test
(_while meeting the acceptance criteria_).

> _**Test** & **Document-Driven Development** is **easy** and it's **easily**
one of the **best habits** to form in your software development "career".
This walkthrough shows **how** you can do it **the right way**;
from the **start** of a project._

<br />

## _What?_

A walkthrough of creating a
_fully functional front-end_ "**micro framework**" ***from scratch***.

By the end of this exercise you will _understand_
The Elm Architecture (TEA) _much better_
because we will be analysing, documenting, testing
and writing each function required
to architect and render our Todo List (TodoMVC) App.

<br /><br />

## _Who?_

People who want to gain an _in-depth_ understanding
of The Elm Architecture ("TEA")
and thus _intrinsically_
[grok](https://en.wikipedia.org/wiki/Grok) Redux/React JavaScript apps.

This tutorial is intended for _beginners_ with _modest_
JavaScript knowledge (_variables, functions, DOM methods & TDD_). <br />
If you have any questions or get "stuck",
please open an issue:
https://github.com/dwyl/learn-elm-architecture-in-javascript/issues <br />
@dwyl is a "safe space" and we are all here to help don't be shy/afraid; <br />
the _more_ questions you ask, the more you are helping yourself and _others_!

<br />

## _How_?

_Before_ diving into _writing functions_ for `Elm`(_ish_),
we need to consider how we are going to _test_ it. <br />
By ensuring that we follow **TDD** from the _start_ of an project,
we _avoid_ having to "correct" any "**bad habits**" later.

We will be using **Tape** & **`JSDOM`** for testing the functions.
Tape is a _minimalist_ testing library
that is _fast_ and has _everything we need_.
**`JSDOM`** is a JavaScript implementation of the
WHATWG DOM & HTML standards, for use with node.js. <br />
If _either_ of these tools is _unfamiliar_ to you,
please see:
[https://github.com/dwyl/**learn-tape**](https://github.com/dwyl/learn-tape)
and
[**front-end**-with-tape.md](https://github.com/dwyl/learn-tape/blob/master/front-end-with-tape.md)


### What _Can_ We _Generalise_ ?

Our **first step** in creating `Elm`(_ish_)
is to _re-visit_ the functions we wrote for the "counter app"
and consider what _can_ be _generalised_ into
an application-independent re-useable framework.

> Our **rule-of-thumb** is: anything that creates (_or destroys_)
a DOM element or looks like "plumbing"
(_that which is common to **all apps**, e.g: "routing" or "managing state"_)
is _generic_ and should thus be abstracted into the `Elm`(_ish_) framework.


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
so as beginners, we don't have to think too hard (up-front)."

The _reason_ Elm refers to the "**Controller**" as "***Update***" is because
this name _more accurately_ reflects what the function _does_:
it _updates_ the _state_ (Model) of the application.

Our `update` and `view` functions will form
the "**domain logic**" of our Todo List App, <br />
(_i.e. they are "**specific**" to the Todo List_)
so we cannot abstract them. <br />
The `model` will be a JavaScript `Object` where the App's
data (todo list items) will be stored.

The `update` function is a simple `switch` statement
that "decides" how to to _`update`_ the app's `model`
each `case` will call a function
that _belongs_ to the Todo List App. <br />

The `view` function _invokes_ several "helper" functions
which create HTML ("DOM") elements e.g: `<section>`, `<div>` & `<button>`;
these _can_ (_will_) be generalised (_below_).

Let's start with a couple of "_familiar_" _generic_ functions
(_which we used in the "counter-reset" example_): `empty` and `mount`. <br />

<br />

### Start by Creating the Files

It's _essential_ to ask: "_Where do I **start** (my **TDD** quest)?_" <br />
The answer is: create **two** new files:
`lib/elmish.js` and `test/elmish.test.js`


### Test Setup

In order to run our test, we need some "setup" code
that "requires" the libraries/files so we can _execute_ the functions.

In the `test/elmish.test.js` file, type the following code:
```js
const test = require('tape');       // https://github.com/dwyl/learn-tape
const fs = require('fs');           // to read html files (see below)
const path = require('path');       // so we can open files cross-platform
const html = fs.readFileSync(path.resolve(__dirname,
  '../index.html')); // sample HTML file to initialise JSDOM.
require('jsdom-global')(html);      // https://github.com/rstacruz/jsdom-global
const elmish = require('../lib/elmish.js'); // functions to test
const id = 'test-app';              // all tests use 'test-app' as root element
```

> Most of this code should be _familiar_ to you
if you have followed previous tutorials.
> If anything is _unclear_ please revisit
https://github.com/dwyl/learn-tape
and

If you attempt to run the test file: `node test/elmish.test.js`
you should see no output.
(_this is expected as we haven't written any tests yet!_)


### `empty` the DOM

Start by _describing_ what the `empty` function _does_. <br />
This is both to clarify our _own_ understanding
as the people _writing_ the code <br />
and to _clearly communicate_ with the **`humans` _reading_** the code.

#### `empty` Function _Description_

The `empty` function deletes all the DOM elements
from within a specific "root" element. <br />
it is used to erase the DOM before re-rendering the app.

Following "**_Document(ation)_ Driven Development**",
we create a **`JSDOC`** comment block
in the `lib/elmish.js` file
with _just_ the function description:

```js
/**
 * `empty` deletes all the DOM elements from within a specific "root" element.
 * it is used to erase the DOM before re-rendering the app.
 */
```
Writing out the function documentation _first_
allows (_our subconscious_) time to _think_ about the functionality
and how to _test_ for the "_acceptance criteria_".
Even if you know _exactly_ what code needs to be written,
_resist_ the temptation to write the code until it is documented.
Even if you are writing code alone,
always imagine that you are "_pairing_" with someone
who does _not_ (_already_) "know the solution"
and you are _explaining_ it to them.

#### `empty` Function _Test_

We previously used the `empty` function in our `counter`,
`counter-reset` and `multiple-counters` examples (_in the "basic" TEA tutorial_)
so we have a "head start" on writing the test.

<!--
> _The **reason**(s) we write the **test first**
even when we (already) know the "solution" is:_ <br />
>
-->

In the `test/elmish.test.js` file, append the following code:
```js
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
  t.equal(root.childElementCount, 0, "After empty(root) has 0 child elements!");
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

Run the test:
```sh
node test/elmish.test.js
```
You should see the following:
![tests-fail](https://user-images.githubusercontent.com/194400/43370657-fe6d82c8-937a-11e8-951d-ed4d9849f876.png)


#### `empty` Function _Implementation_

Now that we have the **test** for our `empty` function written,
we can add the `empty` function to `lib/elmish.js`:
```js
/**
 * `empty` deletes all the DOM elements from within a specific "root" element.
 * it is used to erase the DOM before re-rendering the app.
 * This is the *fastest* way according to: stackoverflow.com/a/3955238/1148249
 * @param  {Object} node the exact ("parent") DOM node you want to empty
 * @example
 * // returns true (once the 'app' node is emptied)
 * empty(document.getElementById('app'));
 */
function empty(node) {
  while (node.lastChild) {
    node.removeChild(node.lastChild);
  }
}
```

#### Add `module.exports` statement to "export" the `empty` function

Adding the function to the `elmish.js` file is a good _start_,
but we need to ***`export`*** it to be able to _invoke_ it in our test. <br />
Add the following code at the end of `lib/elmish.js`:

```js
/* module.exports is needed to run the functions using Node.js for testing! */
/* istanbul ignore next */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    empty: empty // export the `empty` function so we can test it.
  }
} else { init(document); }
```


When you run the test in your terminal with the command
`node test/elmish.test.js`
you should see something _similar_ to this:

![empty-function-tests-pass](https://user-images.githubusercontent.com/194400/43370682-5ff0726c-937b-11e8-944f-b46b71da7f6c.png)

Boom! our first test is passing!
(_the test has **3 assertions**, that's why Tape says "tests 3. pass 3"_).


### `mount` the App

The `mount` function is the "glue" or "wiring" function that
connects the `model`, `update` and `view`; we _can_ _generalise_ it.

#### `mount` function _Documentation_

Think about what the `mount` function _does_;
it "mounts" ("_renders_") the App in the "root" DOM element.
It also tells our app to "re-render"
when a `signal` with an `action` is received.

In `lib/elmish.js` add the following `JSDOC` comment:
```js
/**
 * `mount` mounts the app in the "root" DOM Element.
 * @param  {Object} model store of the application's state.
 * @param  {Function} update how the application state is updated ("controller")
 * @param  {Function} view function that renders HTML/DOM elements with model.
 * @param  {String} root_element_id root DOM element in which the app is mounted
 */
```

#### `mount` function _Test_

In the `test/elmish.test.js` file, append the following code:
```js
// use view and update from counter-reset example
// to invoke elmish.mount() function and confirm it is generic!
const { view, update } = require('./counter.js');

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


#### `mount` Function _Implementation_

Add the following code to the `mount` function body to make the test _pass_
in `lib/elmish.js`:
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
      var updatedModel = update(action, model); // update model for the action
      empty(root);                              // clear root el before rerender
      view(signal, updatedModel, root);         // subsequent re-rendering
    };
  };
  view(signal, model, root);                    // render initial model (once)
}
```

#### Add `mount` to `module.exports` Object

Recall that in order to test the `elmish` functions we need to `export` them.
Your `module.exports` statement should now look something like this:

```js
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    empty: empty,
    mount: mount
  }
} else { init(document); }
```

#### Re-Run the Test(s)

Re-run the test suite:
```sh
node test/elmish.test.js
```

You should expect to see: (_tests passing_)
![image](https://user-images.githubusercontent.com/194400/43387393-3718dcae-93de-11e8-89c1-bb353ede49cd.png)



Now that we have started creating the `elmish` generic functions,
we need to know which _other_ functions we need. <br />
Let's take a look at the TodoMVC App to "_analyse_ the requirements".

### _Analyse_ the TodoMVC App to "Gather Requirements"

In our quest to _analyse_ the required functionality of a Todo List,
the _easiest_ way is to _observe_ a functioning TodoMVC Todo List.

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
https://todomvc.com/examples/vanillajs

_Play_ with the app by adding a few items,
checking-off and toggling the views in the footer.

> _**Note**: having read through the the "**Vanilla**" **JS** implementation
we feel it is quite complex and insufficiently documented_
(_very few code comments and sparse_
[`README.md`](https://github.com/tastejs/todomvc/tree/25a9e31eb32db752d959df18e4d214295a2875e8/examples/vanillajs)),
_so don't expect to **understand** it all the first time without "study"._
_Don't worry, we will walk through building each feature in detail._





### Todo List _Basic_ Functionality

A todo list has only 2 _basic_ functions:

1. **Add** a `new` item to the list (when the **`[Enter]`** key is pressed)
2. **Check-off** an item as "**completed**" (_done/finished_)

> **Add** item and "**Check-off**" is _exactly_ the "functionality"
you would have in a _paper_-based Todo List.

#### TodoMVC "Advanced" Functionality

In _addition_ to these basic functions,
**TodoMVC** has the ability to:
+ **Un-check** an item as to make it "**active**" (_still to be done_)
+ **Double-click/tap** on todo **item description** to **`edit` it**.
+ **Mark _all_ as complete**
+ **Click `X`** on item row to remove from list.

#### `<footer>` Menu

below the main interface there is a `<footer>`
with a **count**, **3 view toggles** and **one action**:
![image](https://user-images.githubusercontent.com/194400/42633421-5eb20f24-85d8-11e8-94ad-bb653dd93ab0.png)
+ "{cont} item(s) left": <br />
  `{store.items.filter(complete==false)}` item`{store.items.length > 1 ? 's' : '' }` left
+ Show **`All`**
+ Show **`Active`**
+ Show **`Completed`**
+ **_Clear_ `Completed`**

#### Routing / Navigation

Finally, if you click around the `<footer>` toggle menu,
you will notice that the Web Bowser Address bar
changes to reflect the chosen view.

![tea-todomvc-routing](https://user-images.githubusercontent.com/194400/42633291-edef3082-85d7-11e8-93c4-5e5f2a5264a1.png)

> Thinking about a task or challenge from
["first principals"](https://en.wikipedia.org/wiki/First_principle)
is ~~a great~~ the best way to _understand_ it. <br />
This is the "physics" approach. see: https://youtu.be/L-s_3b5fRd8?t=22m37s


### HTML Elements (Functions)

The _requirements_ for the HTML elements we _need_ for a Todo List
can be _gathered_ by viewing the source code of the VanillaJS TodoMVC
in a web browser:

![todomvc-elements-browser-devtools](https://user-images.githubusercontent.com/194400/42635773-daa1ccae-85de-11e8-9f41-51d8b552ebd2.png)

This is a "copy-paste" of the _generated_ code including the Todo items:

```html
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus="">
  </header>
  <section class="main" style="display: block;">
    <input id="toggle-all" class="toggle-all" type="checkbox">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <li data-id="1531397960010" class="completed">
        <div class="view">
          <input class="toggle" type="checkbox" checked="">
          <label>Learn The Elm Architecture ("TEA")</label>
          <button class="destroy"></button>
        </div>
      </li>
      <li data-id="1531397981603" class="">
        <div class="view">
          <input class="toggle" type="checkbox">
          <label>Build TEA Todo List App</label>
          <button class="destroy">
          </button>
        </div>
      </li>
    </ul>
  </section>
  <footer class="footer" style="display: block;">
    <span class="todo-count"><strong>1</strong> item left</span>
    <ul class="filters">
      <li>
        <a href="#/" class="selected">All</a>
      </li>
      <li>
        <a href="#/active" class="">Active</a>
      </li>
      <li>
        <a href="#/completed">Completed</a>
      </li>
    </ul>
    <button class="clear-completed" style="display: block;">Clear completed</button>
  </footer>
</section>
```

Let's split each one of these elements into it's own `function`
(_with any necessary "helpers"_) in the order they appear.

> For a "checklist" of these features see: https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/44

When building a House we don't think "build house" as our _first_ action. <br />
_Instead_ we think: what are the "foundations" that need to be in place
***before*** we lay the _first_ "brick"?

In our Todo List App we need a few "Helper Functions"
before we start building the App.

### HTML / DOM Creation Generic Helper Functions

All "grouping" or "container" HTML elements
e.g: `<div>`, `<section>` or `<span>`
will be called with ***two arguments***:
e.g: `var sec = section(attributes, childnodes)`
+ `attributes` - a list (Array) of HTML attributes/properties
  e.g: `id` or `class`.
+ `childnodes` - a list (Array) of child HTML elements
(_nested within the_ `<section>` _element_)

Each of these function arguments will be "_applied_" to the HTML element.
We therefore need a pair of "helper" functions (_one for each argument_).


### `add_attributes`

The `JSDOC` comment for our `add_attributes` function is:
```js
/**
* add_attributes applies the desired attributes to the desired node.
* Note: this function is "impure" because it "mutates" the node.
* however it is idempotent; the "side effect" is only applied once
* and no other nodes in the DOM are "affected" (undesirably).
* @param {Array.<String>} attrlist list of attributes to be applied to the node
* @param {Object} node DOM node upon which attribute(s) should be applied
* @example
* // returns node with attributes applied
* div = add_attributes(["class=item", "id=mydiv", "active=true"], div);
*/
```
This should give you a _good idea_ of what code needs to be written.

But let's write the _test_ first!
Add the following test to the `test/elmish.test.js` file: <br />

```js
test('elmish.add_attributes applies class HTML attribute to a node', function (t) {
  const root = document.getElementById(id);
  let div = document.createElement('div');
  div.id = 'divid';
  div = elmish.add_attributes(["class=apptastic"], div);
  root.appendChild(div);
  // test the div has the desired class:
  const nodes = document.getElementsByClassName('apptastic');
  t.equal(nodes.length, 1, "<div> has 'apptastic' class applied");
  t.end();
});
```

If you (_attempt to_) run this test (_and you **should**_),
you will see something like this:

![image](https://user-images.githubusercontent.com/194400/43414770-af5ee0e4-942b-11e8-9d1c-1cbab3adc136.png)

Test is failing because the `elmish.add_attributes` function does not _exist_.

Go ahead and  _create_ the `elmish.add_attributes` function
(_just the function without passing the test_) and _export_ it in `elmish.js`:
```js
/**
* add_attributes applies the desired attributes to the desired node.
* Note: this function is "impure" because it "mutates" the node.
* however it is idempotent; the "side effect" is only applied once
* and no other nodes in the DOM are "affected" (undesirably).
* @param {Array.<String>} attrlist list of attributes to be applied to the node
* @param {Object} node DOM node upon which attribute(s) should be applied
* @example
* // returns node with attributes applied
* div = add_attributes(["class=item", "id=mydiv", "active=true"], div);
*/
function add_attributes (attrlist, node) {
  if(attrlist && attrlist.length) {
    attrlist.forEach(function (attr) { // apply each prop in array
      var a = attr.split('=');
      switch(a[0]) {
        // code to make test pass goes here ...
        default:
          break;
      }
    });
  }
  return node;
}
// ... at the end of the file, "export" the add_attributes funciton:
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    add_attributes: add_attributes, // export the function so we can test it!
    empty: empty,
    mount: mount
  }
}
```

When you re-run the test you will see something like this:
![image](https://user-images.githubusercontent.com/194400/43416008-ff63d70e-942e-11e8-97ee-6544efb7d43a.png)
The function _exists_ but it does not make the tests pass.
Your _quest_ is to turn this **`0`** into a **`1`**.

Given the **`JSDOC`** comment and _test_ above,
take a moment to think of how _you_ would write
the `add_attributes` function to apply a CSS `class` to an element. <br />

If you can, make the test _pass_
by writing the `add_attributes` function. <br />
(_don't forget to_ `export` _the function at the bottom of the file_).

If you get "stuck", checkout the _complete_ example:
[/lib/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js)

> **Note 0**: we have "_seen_" the code _before_ in the `counter` example:
> [counter.js#L51](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/814467e81b1b9739da74378455bd12721b096ebd/examples/counter-reset/counter.js#L51) <br />
> The _difference_ is this time we want it to be "generic";
we want to apply a CSS `class` to _any_ DOM node.

> **Note 1**: it's not "cheating" to look at "the solution",
the whole point of having a step-by-step tutorial
is that you can check if you get "stuck",
but you should only check _after_ making
a good attempt to write the code _yourself_.

> **Note 2**: The `add_attributes` function is "impure" as it "mutates"
the target DOM `node`, this is more of a "fact of life" in JavaScript,
and given that the application of attributes
to DOM node(s) is idempotent we aren't "concerned" with "side effects";
the attribute will only be applied _once_ to the node
regardless of how many times the `add_attributes` function is called.
see: https://en.wikipedia.org/wiki/Idempotence

For reference, the Elm HTML Attributes function on Elm package is:
https://package.elm-lang.org/packages/elm-lang/html/2.0.0/Html-Attributes

Once you make the test _pass_ you _should_ see the following in your Terminal:
![image](https://user-images.githubusercontent.com/194400/43416304-d06339da-942f-11e8-9546-06af9c494a45.png)

<!-- Onto the next one! https://vimeo.com/8503138 -->

<br />

#### Input `placeholder` Attribute

The `<input>` form element (_where we create new Todo List items_)
has a helpful `placeholder` attribute _prompting_ us with a question:
"_What needs to be done?_"

Add the following test to the `test/elmish.test.js` file: <br />

```js
test('elmish.add_attributes set placeholder on <input> element', function (t) {
  const root = document.getElementById(id);
  let input = document.createElement('input');
  input.id = 'new-todo';
  input = elmish.add_attributes(["placeholder=What needs to be done?"], input);
  root.appendChild(input);
  const placeholder = document.getElementById('new-todo')
    .getAttribute("placeholder");
  t.equal(placeholder, "What needs to be done?", "paceholder set on <input>");
  t.end();
});
```

_Run_ the test `node test/elmish.test.js`:

![image](https://user-images.githubusercontent.com/194400/43416801-34e48d2c-9431-11e8-8786-7676f9e3972f.png)

You _know_ "the drill"; write the necessary code
in the `add_attributes` function of `elmish.js`
to add a `placeholder` to an `<input>` element
and make this test _pass_:

![image](https://user-images.githubusercontent.com/194400/43416921-8506baaa-9431-11e8-9585-814e704a694d.png)

If you get "stuck", checkout the _complete_ example:
[/lib/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js)

<br />

#### `default` `case` ("branch") test?

At this point in our `Elm`(_ish_) quest,
all our tests are _passing_,
which is good,
however that is not the "full picture" ...

If you use Istanbul to check the "test coverage"
(_the measure of which lines/branches of code are being executed during tests_),
you will see that only **98.5%** of lines of code is being "covered":

![image](https://user-images.githubusercontent.com/194400/43436198-2d156248-947b-11e8-8e5a-03f608424fcb.png)

`@dwyl` we are "_keen_" on having "**100% Test Coverage**" ...
anything less than **100%** is _guaranteed_ to result in "regressions",
disappointment and a _lonely loveless life_. 💔

![87% Test Coverage](https://i.imgur.com/NTI4Pxw.png)

See:
[https://github.com/dwyl/**learn-istanbul**](https://github.com/dwyl/learn-istanbul)

This means that if we have a `switch` statement
as in the case of the `add_attributes` function we need to add a ***test***,
that "_exercises_" that "branch" of the code.
Add the following test code to your `test/elmish.test.js` file: <br />

```js
/** DEFAULT BRANCH Test **/
test('test default case of elmish.add_attributes (no effect)', function (t) {
  const root = document.getElementById(id);
  let div = document.createElement('div');
  div.id = 'divid';
  // "Clone" the div DOM node before invoking elmish.attributes to compare
  const clone = div.cloneNode(true);
  div = elmish.add_attributes(["unrecognised_attribute=noise"], div);
  t.deepEqual(div, clone, "<div> has not been altered");
  t.end();
});
```

By _definition_ this test will _pass_ without adding any additional code
because we _already_ added the `default: break;` lines above
(_which is "good practice" in `switch` statements_). <br />
Run the test(s) `node test/elmish.test.js`:
![image](https://user-images.githubusercontent.com/194400/43418987-8c5138f2-9437-11e8-92c5-7c62f1cac2d7.png)


So "_why bother_" adding a _test_ if it's _always_ going to _pass_?
**_Two_ reasons**: <br />
**First**: It _won't_ "_always pass_".
if someone decides to _remove_ the "default" `case`
from `add_attributes` function (_people do "strange things" all the time!_)
it will _fail_ so by having a test,
we will _know_ that the `switch` is "_incomplete_". <br />
**Second**: Having "full coverage" of our code from the _start_ of the project,
and not having to"debate" or "discuss" the "merits" of it means
we can have _confidence_ in the code.

#### Test `null` Attribute Argument (`attrlist`) in `add_attributes` Function

Since JavaScript is _not_ statically/strictly typed we need to _consider_
the situation where someone might _accidentally_ pass a `null` value.

Thankfully, this is _easy_ to write a test for.
Add the following test to `test/elmish.test.js`: <br />

```js
test('test elmish.add_attributes attrlist null (no effect)', function (t) {
  const root = document.getElementById(id);
  let div = document.createElement('div');
  div.id = 'divid';
  // "Clone" the div DOM node before invoking elmish.attributes to compare
  const clone = div.cloneNode(true);
  div = elmish.add_attributes(null, div); // should not "explode"
  t.deepEqual(div, clone, "<div> has not been altered");
  t.end();
});
```

This test should _also_ pass  without the addition of any code:

![image](https://user-images.githubusercontent.com/194400/43423518-93a8fa74-9444-11e8-97a3-c7e74f71a5f7.png)

Now the Coverage should be 100% when you run `npm test`:

![image](https://user-images.githubusercontent.com/194400/43423046-355f3056-9443-11e8-826f-ed61f76dddc0.png)

In your terminal, type/run the follwoing command: `open coverage/lcov-report/index.html`

![image](https://user-images.githubusercontent.com/194400/43423103-5ebde1a4-9443-11e8-835b-0dd1ef8a513c.png)


#### Check-Coverage Pre-Commit Hook

Once you _achieve_ 100% test coverage,
there is no _reason_ to "compromise"
by going _below_ this level.
Let's add a `pre-commit` check
to make sure we maintain our desired standard.

> We wrote a detailed guide to git pre-commit hooks with npm:
[https://github.com/dwyl/learn-**pre-commit**]https://github.com/dwyl/learn-pre-commit

Install the `pre-commit` module:

```sh
npm install pre-commit istanbul --save-dev
```

In your `package.json` file add:

```js
{
  "scripts": {
    "check-coverage": "istanbul check-coverage --statements 100 --functions 100 --lines 100 --branches 100",
    "test": "istanbul cover tape ./test/*.test.js | tap-spec"
  },
  "pre-commit": [
    "test",
    "check-coverage"
  ]
}
```

Now whenever you `commit` your code, your tests will run
and `istanbul` will check the test coverage level for you.

Let's get back to our `add_attributes` function!

<br />

#### Input `autofocus`

In order to "_guide_" the person using our Todo List app
to create their _first_ Todo List _item_,
**we want** the `<input>` field to be automatically "active"
**so that** they can just start typing as soon as the app loads.

This is achieved using the `autofocus` attribute.

Add the following test to the `test/elmish.test.js` file: <br />

```js
test.only('elmish.add_attributes add "autofocus" attribute', function (t) {
  document.getElementById(id).appendChild(
    elmish.add_attributes(["class=new-todo", "autofocus", "id=new"],
      document.createElement('input')
    )
  );
  // document.activeElement via: https://stackoverflow.com/a/17614883/1148249
  t.equal(document.getElementById('new'), document.activeElement,
    '<input autofocus> is "activeElement"');
  elmish.empty(document);
  t.end();
});
```

Write the necessary code to make this test _pass_
as a `case` in `add_attributes` in `elmish.js`.

Relevant reading:
+ `<input>` attributes:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes
+ https://caniuse.com/#feat=autofocus (_**unavailable** on **iOS Safari**!_)

> **Note**: while _all_ our _other_ HTML attributes
follow the `key="value"` syntax,
according to the W3C _specification_,
simply adding the attribute _key_ in the element is "valid"
e.g: `<input placeholder="What needs to be done?" autofocus>`
see: https://stackoverflow.com/questions/4445765/html5-is-it-autofocus-autofocus-or-autofocus


#### add `data-id` attribute to `<li>`

`data-*` attributes allow us to store extra information on standard,
semantic HTML elements without affecting regular attributes.
For example in the case of a Todo List item,
we want to store a reference to the "item id" in the DOM
for that item, so that we know which item to check-off when
the checkbox is clicked/tapped. _However_ we don't want to use the
"traditional" `id` attribute, we can use `data-id`
to keep a clear separation between the data and presentation.

See: "Using data attributes"
https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes

In the TodoMVC HTML code
there are two `<li>` (_list elements_)
which have the `data-id` attribute (_see above_).

Add the following test to the `test/elmish.test.js` file: <br />

```js
test('elmish.add_attributes set data-id on <li> element', function (t) {
  const root = document.getElementById(id);
  let li = document.createElement('li');
  li.id = 'task1';
  li = elmish.add_attributes(["data-id=123"], li);
  root.appendChild(li);
  const data_id = document.getElementById('task1').getAttribute("data-id");
  t.equal(data_id, '123', "data-id successfully added to <li> element");
  t.end();
});
```
Write the "case" in to make this test _pass_ in `elmish.js`.

Tip: use `setAttribute()` method:
https://developer.mozilla.org/en-US/docs/Web/API/Element/setAttribute

#### label `for` attribute

Apply the `for` attribute to a `<label>`
e.g: `<label for="toggle-all">`

HTML `<label>` attributes `for`:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/label#Attributes


Add the following test to the `test/elmish.test.js` file: <br />

```js
test.only('elmish.add_attributes set "for" attribute <label> element', function (t) {
  const root = document.getElementById(id);
  let li = document.createElement('li');
  li.id = 'toggle';
  li = elmish.add_attributes(["for=toggle-all"], li);
  root.appendChild(li);
  const label_for = document.getElementById('toggle').getAttribute("for");
  t.equal(label_for, "toggle-all", '<label for="toggle-all">');
  t.end();
});
```

Add the "`case`" in the `add_attributes` function's `switch` statement
to make this test _pass_ in `elmish.js`.

<br />

#### `<input>` attribute `type`

In order to use a Checkbox in our Todo List UI,
we need to set the `type=checkbox` on the `<input>` element.

Add the following test to the `test/elmish.test.js` file: <br />

```js
test('elmish.add_attributes type="checkbox" on <input> element', function (t) {
  const root = document.getElementById(id);
  let input = document.createElement('input');
  input = elmish.add_attributes(["type=checkbox", "id=toggle-all"], input);
  root.appendChild(input);
  const type_atrr = document.getElementById('toggle-all').getAttribute("type");
  t.equal(type_atrr, "checkbox", '<input id="toggle-all" type="checkbox">');
  t.end();
});
```

Write the "case" in `add_attributes` to make this test _pass_ in `elmish.js`.

Relevant reading
+ `<input>` attribute `type`:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes

<br />

#### Add `style` attribute to HTML element?

In TodoMVC there are _three_ instances of in-line CSS styles.
they are _all_ `style="display: block;"`.
It's _unclear_ why setting _inline_ styles is _necessary_;
we _prefer_ to be _consistent_ and
***either*** use CSS `classes`
with an _external_ stylesheet (_which TodoMVC already does!_)
***or*** go _full_ "inline styles"
e.g: https://package.elm-lang.org/packages/mdgriffith/style-elements/latest

For now, let's add the `style` attribute
to our `add_attributes` function for "completeness".

see:
https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style

Add the following test to the `test/elmish.test.js` file: <br />

```js
test.only('elmish.add_attributes apply style="display: block;"', function (t) {
  const root = document.getElementById(id);
  elmish.empty(root);
  let sec = document.createElement('section');
  root.appendChild(
    elmish.add_attributes(["id=main", "style=display: block;"], sec)
  );
  const style = window.getComputedStyle(document.getElementById('main'));
  t.equal(style._values.display, 'block', 'style="display: block;" applied!')
  t.end();
});
```

Write the "case" in to make this test _pass_ in `elmish.js`.

If you get "stuck", checkout:
https://github.com/dwyl/todomvc-vanilla-javascript-elm-architecture-example/blob/master/lib/elmish.js

<br />

#### `checked=true` attribute for "complete"/"done" items

Todo List items that have been marked as "done" will have the `checked=true`
attribute applied to them.

Add the following test to the `test/elmish.test.js` file: <br />

```js
test('elmish.add_attributes checked=true on "done" item', function (t) {
  const root = document.getElementById(id);
  elmish.empty(root);
  let input = document.createElement('input');
  input = elmish.add_attributes(["type=checkbox", "id=item1", "checked=true"],
    input);
  root.appendChild(input);
  const checked = document.getElementById('item1').checked;
  t.equal(checked, true, '<input type="checkbox" checked=true>');
  let input2
  t.end();
});
```

Write the code to make the test pass!

> _**Implementation note**: while the VanillaJS TodoMVC view has
`checked=""` (just an attribute with **no value**),
we find this "unfriendly" to beginners
so instead we are using `checked=true` instead because it's clearer.
See: https://stackoverflow.com/a/10650302/1148249
"Use true as it is marginally more efficient
and is **more intention revealing** to maintainers._"

For more detail on the `<input type="checkbox">`
see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox

<br />

#### Set `href` on `<a>` (anchor) element

The "filters" in the `<footer>` of TodoMVC contain 3 links ("anchors") `<a>`
each of which have an `href` attribute indicating where
clicking/tapping on the link (filter) should "route" to.

> We will return to routing later (_below_),
for now we simply need to set the `href` attribute.

Add the following test to the `test/elmish.test.js` file: <br />

```js
test('elmish.add_attributes <a href="#/active">Active</a>', function (t) {
  const root = document.getElementById(id);
  elmish.empty(root);
  root.appendChild(
    elmish.add_attributes(["href=#/active", "class=selected", "id=active"],
      document.createElement('a')
    )
  );
  // note: "about:blank" is the JSDOM default "window.location.href"
  console.log('JSDOM window.location.href:', window.location.href);
  // so when an href is set *relative* to this it becomes "about:blank#/my-link"
  // so we *remove* it before the assertion below, but it works fine in browser!
  const href = document.getElementById('active').href.replace('about:blank', '')
  t.equal(href, "#/active", 'href="#/active" applied to "active" link');
  t.end();
});
```

Write the code to make the test pass!


Useful knowledge:
+ What: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#Attributes
+ Why: https://stackoverflow.com/questions/4855168/what-is-href-and-why-is-it-used
+ How:  https://stackoverflow.com/questions/4689344/how-can-i-add-href-attribute-to-a-link-dynamically-using-javascript



<br />

### `append_childnodes`

The `append_childnodes` _functionality_ is a "_one-liner_": <br />
```js
childnodes.forEach(function (el) { parent.appendChild(el) });
```
It's easy to think: "_why bother to create a_ `function`...?" <br />
The _reasons_ to create _small_ functions are: <br />
**a)** Keep the _functionality_ "DRY" https://en.wikipedia.org/wiki/Don%27t_repeat_yourself
which means we can _easily_ track down all instances of function invocation.
<br />
**b)** If we ever need to modify the function, e.g: to performance optimise it, there is a _single_ definition.
<br />
**c)** It makes unit-testing the functionality easy;
that's _great_ news for reliability!

With that in mind, let's write a _test_ for the `childnodes` function!
Add the following code to the `test/elmish.test.js` file: <br />

```js
test.only('elmish.append_childnodes appends child DOM nodes to parent', function (t) {
  const root = document.getElementById(id);
  elmish.empty(root); // clear the test DOM before!
  let div = document.createElement('div');
  let p = document.createElement('p');
  let section = document.createElement('section');
  elmish.append_childnodes([div, p, section], root);
  t.equal(root.childElementCount, 3, "Root element " + id + " has 3 child els");
  t.end();
});
```

Now, based on the following `JSDOC` comment:
```js
/**
 * `append_childnodes` appends an array of HTML elements to a parent DOM node.
 * @param  {Array.<Object>} childnodes array of child DOM nodes.
 * @param  {Object} parent the "parent" DOM node where children will be added.
 * @return {Object} returns parent DOM node with appended children
 * @example
 * // returns the parent node with the "children" appended
 * var parent = elmish.append_childnodes([div, p, section], parent);
 */
```

_Implement_ this function to make the test pass.
It _should_ be the _easiest_ one so far.
(_see above for "one-liner" clue_...). <br />

Don't forget to remove the `.only` from the test, once you finish.

If you get "stuck", checkout:
[`lib/elmish.js`](https://github.com/dwyl/todomvc-vanilla-javascript-elm-architecture-example/blob/master/lib/elmish.js)
<br />


### `<section>` HTML Element

The _first_ HTML element we encounter in the TodoMVC app is `<section>`. <br />
`<section>` represents a standalone section — which doesn't have
a more specific semantic element to represent it —
it's an alternative way to group elements to a `<div>`.

> info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section <br />
> difference:
https://stackoverflow.com/questions/6939864/what-is-the-difference-between-section-and-div

We want to make our `view` function "***declarative***",
this means our `view` should contain **no** "**control flow**"
(i.e. `if` statements).
The function invocations should reflect the final DOM quite closely
see: https://en.wikipedia.org/wiki/Declarative_programming

Example `view`:
```js
elmish.append_childnodes([
  section(["class=todoapp"], [ // array of "child" elements
    header(["class=header"], [
      h1([], [
        text("todos")
      ]), // </h1>
      input([
        "class=new-todo",
        "placeholder=What needs to be done?",
        "autofocus"
      ]) // <input> is "self-closing"
    ]) // </header>
  ])
], document.getElementById('my-app'));
```

Add the following _test_ to your `test/elmish.test.js` file: <br />

```js
test('elmish.section creates a <section> HTML element', function (t) {
  const p = document.createElement('p');
  p.id = 'para';
  const text = 'Hello World!'
  const txt = document.createTextNode(text);
  p.appendChild(txt);
  // create the `<section>` HTML element using our section function
  const section = elmish.section(["class=new-todo"], [p])
  document.getElementById(id).appendChild(section); // add section with <p>
  // document.activeElement via: https://stackoverflow.com/a/17614883/1148249
  t.equal(document.getElementById('para').textContent, text,
    '<section> <p>' + text + '</p></section> works as expected!');
  elmish.empty(document.getElementById(id));
  t.end();
});
```

Based on the following `JSDOC` comment:
```js
/**
 * section creates a <section> HTML element with attributes and childnodes
 * @param {Array.<String>} attrlist list of attributes to be applied to the node
 * @param {Array.<Object>} childnodes array of child DOM nodes.
 * @return {Object} returns the <section> DOM node with appended children
 * @example
 * // returns <section> DOM element with attributes applied & children appended
 * var section = elmish.section(["class=todoapp"], [h1, input]);
 */
```
Attempt to create the `section` function
using the `add_attributes` and `append_childnodes` "helper" functions.

If you get "stuck", checkout:
[`lib/elmish.js`](https://github.com/dwyl/todomvc-vanilla-javascript-elm-architecture-example/blob/master/lib/elmish.js)
<br />
> _**Note**: in our "solution" we created a "helper" function
called `create_element` to "DRY" the HTML element creation code;
this is a *recommended** "best practice" improves maintainability._

The `JSDOC` comment for our `create_element` function is:
```js
/**
 * create_element is a "helper" function to "DRY" HTML element creation code
 * creat *any* element with attributes and childnodes.
 * @param {String} type of element to be created e.g: 'div', 'section'
 * @param {Array.<String>} attrlist list of attributes to be applied to the node
 * @param {Array.<Object>} childnodes array of child DOM nodes.
 * @return {Object} returns the <section> DOM node with appended children
 * @example
 * // returns the parent node with the "children" appended
 * var div = elmish.create_element('div', ["class=todoapp"], [h1, input]);
 */
```
`try` to write it for yourself before looking at the "answer".


For reference, the section function in Elm:
https://package.elm-lang.org/packages/elm-lang/html/2.0.0/Html
<br />
Demo: https://ellie-app.com/LTtNVQjfWVa1
![ellie-elm-section](https://user-images.githubusercontent.com/194400/42708957-bbcc1020-86d6-11e8-97bf-f2f3a1c6fdea.png)


### Create a `view` using HTML Element Functions!

Once we know how to create _one_ HTML element,
it's _easy_ to create _all_ of them!
Consider the following HTML for the `<header>` section of the TodoMVC App:

```html
<section class="todoapp">
  <header class="header">
    <h1>todos</h1>
    <input class="new-todo" placeholder="What needs to be done?" autofocus="">
  </header>
</section>
```

There are five HTML elements: `<section>`, `<header>`, `<h1>`
(_which has a `text` element_) and `<input>`.
We need a _function_ to represent (_create_) each one of these HTML elements.

Here is a **test** that creates the "real" header `view`:
(_notice how the "shape" of the "elmish" functions matches the HTML_)

```js
test('elmish create <header> view using HTML element functions', function (t) {
  const { append_childnodes, section, header, h1, text, input } = elmish;
  append_childnodes([
    section(["class=todoapp"], [ // array of "child" elements
      header(["class=header"], [
        h1([], [
          text("todos")
        ]), // </h1>
        input([
          "id=new",
          "class=new-todo",
          "placeholder=What needs to be done?",
          "autofocus"
        ], []) // <input> is "self-closing"
      ]) // </header>
    ])
  ], document.getElementById(id));

  const place = document.getElementById('new').getAttribute('placeholder');
  t.equal(place, "What needs to be done?", "placeholder set in <input> el");
  t.equal(document.querySelector('h1').textContent, 'todos', '<h1>todos</h1>');
  elmish.empty(document.getElementById(id));
  t.end();
});
```
We can define the required HTML element creation functions
in only a few lines of code.

Create (_and export_) the necessary functions to make the test pass:
`header`, `h1`, `input` and `text`.

**Tip**: each one of these HTML creation functions is a "_one-liner_" function body
that invokes the `create_element` function defined above.
Except the `text` function, which is still a "_one-liner_",
but has only one argument and invokes a native method.

If you get stuck trying to make this test pass,
refer to the completed code:
[/lib/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js )


#### Create the "main" `view` functions

Once you have the code to pass the above test(s),
you will be ready to tackle something a bit bigger.
Our next `view` is the `main` App:

```html
<section class="main" style="display: block;">
  <input id="toggle-all" class="toggle-all" type="checkbox">
  <label for="toggle-all">Mark all as complete</label>
  <ul class="todo-list">
    <li data-id="1531397960010" class="completed">
      <div class="view">
        <input class="toggle" type="checkbox" checked="">
        <label>Learn The Elm Architecture ("TEA")</label>
        <button class="destroy"></button>
      </div>
    </li>
    <li data-id="1531397981603" class="">
      <div class="view">
        <input class="toggle" type="checkbox">
        <label>Build TEA Todo List App</label>
        <button class="destroy">
        </button>
      </div>
    </li>
  </ul>
</section>
```

The corresponding _test_ for the above `view` is:

```js
test.only('elmish create "main" view using HTML DOM functions', function (t) {
  const { section, input, label, ul, li, div, button, text } = elmish;
  elmish.append_childnodes([
    section(["class=main", "style=display: block;"], [
      input(["id=toggle-all", "class=toggle-all", "type=checkbox"], []),
      label(["for=toggle-all"], [ text("Mark all as complete") ]),
      ul(["class=todo-list"], [
        li(["data-id=123", "class=completed"], [
          div(["class=view"], [
            input(["class=toggle", "type=checkbox", "checked=true"], []),
            label([], [text('Learn The Elm Architecture ("TEA")')]),
            button(["class=destroy"])
          ]) // </div>
        ]), // </li>
        li(["data-id=234"], [
          div(["class=view"], [
            input(["class=toggle", "type=checkbox"], []),
            label([], [text("Build TEA Todo List App")]),
            button(["class=destroy"])
          ]) // </div>
        ]) // </li>
      ]) // </ul>
    ])
  ], document.getElementById(id));
  const done = document.querySelectorAll('.completed')[0].textContent;
  t.equal(done, 'Learn The Elm Architecture ("TEA")', 'Done: Learn "TEA"');
  const todo = document.querySelectorAll('.view')[1].textContent;
  t.equal(todo, 'Build TEA Todo List App', 'Todo: Build TEA Todo List App');
  elmish.empty(document.getElementById(id));
  t.end();
});
```
Add the _test_ to your `test/elmish.test.js` file.

To make this test pass you will need to write (_and `export`_)
5 new functions: `label`, `ul`, `li`, `div` and `button`.

These five functions are all _almost_ identical so you _should_
be able to get these done in under 5 minutes. (_don't over-think it_!)
Just make the tests pass and try to keep your code _maintainable_.

Again, if you get stuck trying to make this test pass,
refer to the completed code:
[/lib/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js)


#### Create the `<footer>` view functions

The final `view` we need functions for is `<footer>`:

```js
<footer class="footer" style="display: block;">
  <span class="todo-count"><strong>1</strong> item left</span>
  <ul class="filters">
    <li>
      <a href="#/" class="selected">All</a>
    </li>
    <li>
      <a href="#/active" class="">Active</a>
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
This `view` introduces 4 new tags:
`<footer>`, `<span>`, `<strong>` and `<a>` (_in the order they appear_).

Add the following _test_ for this `view`
to your `test/elmish.test.js` file: <br />:
```js
test.only('elmish create <footer> view using HTML DOM functions', function (t) {
  const { footer, span, strong, text, ul, li, a, button } = elmish;
  elmish.append_childnodes([
    footer(["class=footer", "style=display: block;"], [
      span(["class=todo-count", "id=count"], [
        strong("1"),
        text("item left")
      ]),
      ul(["class=filters"], [
        li([], [
          a(["href=#/", "class=selected"], [text("All")])
        ]),
        li([], [
          a(["href=#/active"], [text("Active")])
        ]),
        li([], [
          a(["href=#/completed"], [text("Completed")])
        ])
      ]), // </ul>
      button(["class=clear-completed", "style=display:block;"],
        [text("Clear completed")]
      )
    ])
  ], document.getElementById(id));

  const left = document.getElementById('count').textContent;
  t.equal(left, "item left", 'there is 1 todo item left');
  const clear = document.querySelectorAll('button')[1].textContent;
  t.equal(clear, "Clear completed", '<button> text is "Clear completed"');
  const selected = document.querySelectorAll('.selected')[1].textContent;
  t.equal(selected, "All", "All is selected by default");
  elmish.empty(document.getElementById(id));
  t.end();
});
```

Add the 4 functions `footer`, `span`, `strong` and `a`
to `elmish.js` and `export` them so the test will pass.

if you get stuck trying to make this test pass,
refer to the completed code:
[/lib/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js)

<br />

### Routing

Routing is how we use the browser URL/Address
to keep track of what should be displayed in the browser window.

#### Acceptance Criteria

+ [ ] URL (hash) should change to reflect navigation in the app
+ [ ] History of navigation should be preserved
  + [ ] Browser "back button" should _work_.
+ [ ] Pasting (_or Book-marking_) a URL should display the desired content
when the "page" is loaded.

#### Background reading

Routing uses _two_ web browser APIs:

+ Location: https://developer.mozilla.org/en-US/docs/Web/API/Location
+ History: https://developer.mozilla.org/en-US/docs/Web/API/History_API

`location` allows us to "**get**" and "**set**" the URL (`href`)
and `history` lets us set the page history (_before changing the `href`_)
so that the user can use their browser's "back button"
(_or other native browser navigation to go "back" through the history_).

> Note: Internet Explorer <11 does not support `history.pushState`:
https://caniuse.com/#search=pushstate

#### Try it!

Open a web browser window, open the "Developer Tools"
then type (_or copy-paste_) the following code into the Console:

```js
setTimeout(function () { // delay for 1 second then run:
  console.log('window.location.href:', window.location.href);
  var base = window.location.href.split('#')[0];
  var active = '#/active';
  console.log('Setting the window.location.href to:', base + active);
  window.location.href = base + active;
  console.log('window.location.href:', window.location.href, 'updated!');
  console.log('window.history.length:', window.history.length);
  window.history.pushState(null, 'Active', active);
  console.log('window.history.length:', window.history.length);
}, 1000)
```

You should see something like this:
![browser-routing-example](https://user-images.githubusercontent.com/194400/43035907-f3a1adac-8cee-11e8-9122-43fb756749a3.png) <br />

The values for `window.history.length` will be different
(_depending on how many times you run the code_).

But that's "_all_" there is to it!
Now let's define some "helper functions"
so that we can use routing in our Todo List App!


#### Implementation

##### JSDOC

We are _huge_ proponents of "document driven development"
this includes writing _both_ `markdown` _and_ code comments.

Consider the following JSDOC for the `route` function:

```js
/**
 * route sets the hash portion of the URL in a web browser
 * and sets the browser history so that the "back button" works.
 * @param {Object} state - the current state of the application.
 * @param {String} title - the title of the "page" being navigated to
 * @param {String} hash - the hash (URL) to be navigated to.
 * @return {Object} new_state - state with hash updated to the *new* hash.
 * @example
 * // returns the state object with updated hash value:
 * var new_state = elmish.route(state, 'Active', '#/active');
 */
```


#### `route` _Test_!

Add the following _test_ to your `test/elmish.test.js` file: <br />

```js
test.only('elmish.route updates the url hash and sets history', function (t) {
  const initial_hash = window.location.hash
  console.log('START window.location.hash:', initial_hash, '(empty string)');
  const initial_history_length = window.history.length;
  console.log('START window.history.length:', initial_history_length);
  // update the URL Hash and Set Browser History
  const state = { hash: '' };
  const new_hash = '#/active'
  const new_state = elmish.route(state, 'Active', new_hash);
  console.log('UPDATED window.history.length:', window.history.length);
  console.log('UPDATED state:', new_state);
  console.log('UPDATED window.location.hash:', window.location.hash);
  t.notEqual(initial_hash, window.location.hash, "location.hash has changed!");
  t.equal(new_hash, new_state.hash, "state.hash is now: " + new_state.hash);
  t.equal(new_hash, window.location.hash, "window.location.hash: "
    + window.location.hash);
  t.equal(initial_history_length + 1, window.history.length,
    "window.history.length increased from: " + initial_history_length + ' to: '
    + window.history.length);
  t.end();
});
```

#### `route` Implementation (_to make test(s) pass_)

The code to make these tests pass is only 3 or 4 lines.
(_depending on your implementation ..._) <br />
Provided the tests pass and you haven't "hard coded" the `return`,
there is no "wrong answer".
Try and figure it out for yourself before checking a solution.

**`if`** you get stuck trying to make this test pass,
refer to the completed code:
[/lib/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js)


> _**Note**: do not "worry" about how to render the "right" content on the "page"
in response to the URL (hash) changing, we will come to that when
writing the "business logic" of the Todo List Application,
because it will "make more sense" in context._


### Elm(ish) Store > Save Model (Data) to `localStorage`

The _final_ piece in the "Elm(ish)" puzzle is saving data on the device
so that the Todo List items (_and history_) is not "_lost_" when
when the user refreshes the browser or navigates away (_and back_).

The relevant Web Browser API is `localStorage`:
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage <br />


We are only using _two_ methods of the `localStorage` API:
+ `setItem` - save a `value` (`String`) to the borwser/device's `localStorage`
with a specific `key`
+ `getItem` - retrieve the `value` `String` from `localStorage` by `key`

Example:
```js
localStorage.setItem('key', "World");
console.log("Hello " + localStorage.getItem('key')); // Hello World
```

#### Acceptance Criteria

+ [ ] `model` is ***retrieved*** from `localStorage`
if it has been (_previously_) set when `mount` is invoked
+ [ ] Initial `model` is ***saved*** to `localStorage` when `mount` is invoked
+ [ ] ***Updated*** `model` is ***saved*** to `localStorage`
when `update` is called. (_thus_ `localStorage` _always has the latest version_)

#### Try it!

As always, the best way to familiarise yourself with a DOM API
is to `try` it in your web browser!
Open a browser tab, open Dev Tools and type the following code:

```js
var model = { 'one': 1, 'two': 2, 'three': 3 };

// save the model (data) into storage as a stringified object:
localStorage.setItem('elmish_store', JSON.stringify(model));

// Retrieve the stringified object from localStorage:
var retrieved_model = localStorage.getItem('elmish_store');

console.log('Retrieved model: ', JSON.parse(retrieved_model));
```
You should see something like this:

![localStorage-example-run-in-browser](https://user-images.githubusercontent.com/194400/43045550-6f06b082-8db2-11e8-80a8-8489f158c2ac.png)


+ Further reading & discussion:
https://stackoverflow.com/questions/2010892/storing-objects-in-html5-localStorage <br />
+ Spec: https://www.w3.org/TR/webstorage/#the-localstorage-attribute

#### Implementation

_Given_ that saving and retrieving the Todo List `model` to/from `localStorage`
uses two "native" DOM API functions, we can _avoid_ writing our own functions
which are just going to "_wrap_" `setItem` and `getItem`.

We can simply _use_ the `setItem` and `getItem` where we _need_ them!
The best place to handle the "set" and "get" logic is in the `mount` function.
You will recall from earlier (_above_) that the Elm(ish) `mount` function
looks like this:

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
      var updatedModel = update(action, model); // update model for the action
      empty(root);                              // clear root el before rerender
      view(signal, updatedModel, root);         // subsequent re-rendering
    };
  };
  view(signal, model, root);                    // render initial model (once)
}
```

We are going to make **3 adjustments** to this code
to use `setItem` and `getItem`,
but _first_ let's write a ***test*** for the desired outcome!

Add the following _test code_ to your `test/elmish.test.js` file: <br />

```js
// Testing localStorage requires a "polyfil" because it's unavailable in JSDOM:
// https://github.com/jsdom/jsdom/issues/1137 ¯\_(ツ)_/¯
global.localStorage = { // globals are bad! but a "necessary evil" here ...
  getItem: function(key) {
   const value = this[key];
   return typeof value === 'undefined' ? null : value;
 },
 setItem: function (key, value) {
   this[key] = value;
 }
}
localStorage.setItem('hello', 'world!');
console.log('localStorage (polyfil) hello', localStorage.getItem('hello'));

// Test mount's localStorage using view and update from counter-reset example
// to confirm that our elmish.mount localStorage works and is "generic".

test.only('elmish.mount sets model in localStorage', function (t) {
  const { view, update } = require('./counter.js');

  const root = document.getElementById(id);
  elmish.mount(7, update, view, id);
  // the "model" stored in localStorage should be 7 now:
  t.equal(JSON.parse(localStorage.getItem('elmish_store')), 7,
    "elmish_store is 7 (as expected). initial state saved to localStorage.");
  // test that mount still works as expected (check initial state of counter):
  const actual = document.getElementById(id).textContent;
  const actual_stripped = parseInt(actual.replace('+', '')
    .replace('-Reset', ''), 10);
  const expected = 7;
  t.equal(expected, actual_stripped, "Inital state set to 7.");
  // attempting to "re-mount" with a different model value should not work
  // because mount should retrieve the value from localStorage
  elmish.mount(42, update, view, id); // model (42) should be ignored this time!
  t.equal(JSON.parse(localStorage.getItem('elmish_store')), 7,
    "elmish_store is 7 (as expected). initial state saved to localStorage.");
  // increment the counter
  const btn = root.getElementsByClassName("inc")[0]; // click increment button
  btn.click(); // Click the Increment button!
  const state = parseInt(root.getElementsByClassName('count')[0]
    .textContent, 10);
  t.equal(state, 8, "State is 8 after increment.");
  // the "model" stored in localStorage should also be 8 now:
  t.equal(JSON.parse(localStorage.getItem('elmish_store')), 8,
    "elmish_store is 8 (as expected).");
  elmish.empty(root); // reset the DOM to simulate refreshing a browser window
  elmish.mount(5, update, view, id); // 5 ignored! model read from localStorage.
  // clearing DOM does NOT clear the localStorage (this is desired behaviour!)
  t.equal(JSON.parse(localStorage.getItem('elmish_store')), 8,
    "elmish_store still 8 from increment (above) saved in localStorage");
  t.end()
});
```

There is quite a lot to "unpack" in this test but let's walk through the steps:

1. Require the `view` and `update` from our counter reset example.
2. `mount` the counter reset app
3. ***test*** that the `model` (7) is being saved to `localStorage`
by `mount` function.
4. Attempt to "***re-mount***" the counter app with an initial model of `42`
should not work because `mount` will "read"
the initial model from `localStorage` if it is defined.
5. `update` the model using the `inc` (_increment_) action
6. ***test*** that `localStorage` was updated to reflect the increment (8)
7. ***`empty`*** the DOM. (_to simulate a page being refreshed_)
8. ***test*** that `localStorage` still contains our saved data.

Based on this test, try to add the necessary lines to the `mount` function,
to make the test pass.

**`if`** you get stuck trying to make this test pass,
refer to the completed code:
[/lib/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js)

<br />

### `onclick` `attribute` to invoke the "dispatcher" when element clicked

In order to allow click/tap interactions with buttons,
we need to add an `onclick` attribute which then _invokes_ the desired update.

Add the following _test code_ to your `test/elmish.test.js` file: <br />
```js
test.only('elmish.add_attributes onclick=signal(action) events!', function (t) {
  const root = document.getElementById(id);
  elmish.empty(root);
  let counter = 0; // global to this test.
  function signal (action) { // simplified version of TEA "dispatcher" function
    return function callback() {
      switch (action) {
        case 'inc':
          counter++; // "mutating" ("impure") counters for test simplicity.
          break;
      }
    }
  }

  root.appendChild( // signal('inc') should be applied as "onclick" function:
    elmish.add_attributes(["id=btn", signal('inc')],
      document.createElement('button'))
  );

  // "click" the button!
  document.getElementById("btn").click()
  // confirm that the counter was incremented by the onclick being triggered:
  t.equal(counter, 1, "Counter incremented via onclick attribute (function)!");
  elmish.empty(root);
  t.end();
});
```

Run the test:
```sh
node test/elmish.test.js
```
![onclick-test-failing](https://user-images.githubusercontent.com/194400/43955072-99712c7e-9c96-11e8-94a0-8c6d6d9169cb.png)

Making this test pass requires a little knowledge of how JavaScript
does "type checking" and the fact that we can "pass around" functions
as variables.

The amount of code required to make this test pass is _minimal,_
you could even get it down to ***1 line***.
The key is thinking through what the test is doing
and figuring out how to apply an `onclick` function to a DOM node.

Relevant/useful reading:

+ https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onclick
+ https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof
+ https://stackoverflow.com/questions/6956258/adding-onclick-event-to-dynamically-added-button
+ https://stackoverflow.com/questions/14569320/simulating-button-click-in-javascript

Try to make the test pass by yourself or with your pairing partner.

If you get "stuck", checkout:
[**`elmish.js > add_attributes`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/commits/d41c8d87aea1a656b33d450c868bab92eb1d7ae8#diff-61a1967a8f2230abdebea6572ec20c82R61)


<br />

### `subscriptions` for Event Listeners

In Elm, when we want to "listen" for an event or "external input"
we use `subscriptions`. <br />
Examples include:

+ [Keyboard events](https://package.elm-lang.org/packages/elm-lang/keyboard/latest/Keyboard)
+ [Mouse movements & clicks](https://package.elm-lang.org/packages/elm-lang/mouse/latest/Mouse)
+ [Browser location changes (Navigation)](https://github.com/elm-lang/navigation)
+ [Websocket events (messages)](https://package.elm-lang.org/packages/elm-lang/websocket/latest/WebSocket)

In order to listen for and respond to Keyboard events,
specifically the **`Enter`** and **`[Escape]`** key press,
we need a way of "attaching" event listeners to the DOM
when mounting our App.

To demonstrate **`subscriptions`**,
let's _briefly re-visit_ the Counter Example
and consider an alternative User Interaction/Experience: Keyboard!

#### Use-case: Use Up/Down Keyboard (Arrow) Keys to Increment/Decrement Counter

***As a user*** <br />
***I would like*** to use the keyboard **`[↑]`** (Up) and **`[↓]`** (Down) arrow keys <br />
to signal the **Increment** and **Decrement** action (_respectively_)
of the Counter. <br />
***So that*** I don't have to use a mouse to click a button.

![up-down-arrrow-keys](https://user-images.githubusercontent.com/194400/43962720-4cbfb192-9cb0-11e8-9c45-63e7644f1cf6.png)

Background reading: https://webaim.org/techniques/keyboard

#### Baseline Example Code _Without_ Subscription

Let's start by making a "copy" of the code in
[`/examples/counter-reset`](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/counter-reset):

```sh
cp test/counter.js test/counter-reset-keyboard.js
```

_First step_ is to _re-factor_ the code in
`test/counter-reset-keyboard.js`
to use the "DOM" functions we've been creating for `Elm`(_ish_).
This will _simplify_ the `counter.js` down to the _bare minimum_.

In your `test/counter-reset-keyboard.js` file,
type the following code:

```js
/* if require is available, it means we are in Node.js Land i.e. testing!
 in the broweser, the "elmish" DOM functions are loaded in a <script> tag */
/* istanbul ignore next */
if (typeof require !== 'undefined' && this.window !== this) {
  var { button, div, empty, h1, mount, text } = require('../lib/elmish.js');
}

function update (action, model) {    // Update function takes the current state
  switch(action) {                   // and an action (String) runs a switch
    case 'inc': return model + 1;    // add 1 to the model
    case 'dec': return model - 1;    // subtract 1 from model
    case 'reset': return 0;          // reset state to 0 (Zero) git.io/v9KJk
    default: return model;           // if no action, return curent state.
  }                                  // (default action always returns current)
}

function view(model, signal) {
  return div([], [
    button(["class=inc", "id=inc", signal('inc')], [text('+')]), // increment
    div(["class=count", "id=count"], [text(model.toString())]), // count
    button(["class=dec", "id=dec", signal('dec')], [text('-')]), // decrement
    button(["class=reset", "id=reset", signal('reset')], [text('Reset')])
  ]);
}

/* The code block below ONLY Applies to tests run using Node.js */
/* istanbul ignore else */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    view: view,
    update: update,
  }
}
```
<!--
Without _touching_ the code/tests
in **`test/counter-reset-keyboard.js`**,

You should just be able to _run_ the "liveserver" on your `localhost`:

```sh
npm run dev
```
and when you open: http://127.0.0.1:8000/examples/counter-reset-keyboard

should see the Qunit (Broweser) Tests _passing_:
![counter-reset-keyboard-broweser-tests-passing](https://user-images.githubusercontent.com/194400/43960760-ed098e80-9caa-11e8-9d8f-08310846dacb.png)
-->

#### How do We _Test_ for Subscription Events?

As described above in our "use case" we want to create event listeners,
for the **`[↑]`** (Up) and **`[↓]`** (Down) arrow keyboard keys,
so the _only_ way to _test_ for these is to "Trigger" the event(s).
Thankfully, this is _easy_ in JavaScript. Let's write the test!

Add the following _test code_ to your `test/elmish.test.js` file: <br />
```js
test here!
```

Run the test (_watch it fail_!):
```sh
node test/elmish.test.js
```
![subscriptions-test-failing](https://user-images.githubusercontent.com/194400/43964543-f4a6e520-9cb4-11e8-80f5-ae6bb491b83f.png)

Hopefully it's clear from reading the test _why_ the assertion is _failing_.
The counter is not being incremented.
The last assertion passes because
"_even a broken clock is right twice a day_" ...
since the counter is never incremented,
the count is 0 (zero) throughout the test,
so the last assertion always passes.
(_this will not be the case
  once you have the [Up] arrow event listener working_).

Recommended reading: https://stackoverflow.com/questions/596481/is-it-possible-to-simulate-key-press-events-programmatically

#### `subscriptions`_Implementation_: Keyboard Keys Increment/Decrement Counter!

Once again, try to _think_ of how you would implement
a subscriptions function and _attempt_ to write the code.

Don't be disheartened if you have "_no idea_" how to solve this one.
If you are relatively recent to JavaScript,
it is _unlikely_ that you have come across event listeners.

It's "OK" to "take a peek" at the sample code:
[**`examples/counter-reset-keyboard/counter.js`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/files#diff-97353eabc55df91dbb3f96ba5a000a1aR26)

Once you add the **`subscriptions`** function to
**`test/counter-reset-keyboard.js`**,
Your tests should pass:

![counter-reset-keyboard-subscriptions-tests-passing](https://user-images.githubusercontent.com/194400/43981911-b6413dda-9ceb-11e8-8514-44fc1f88c3fe.png)

Well done!

<br />

That's it for now! `Elm`(_ish_) is "ready" to be _used_
for our TodoMVC App!

# [< _Back_ To Todo List App!](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/master/todo-list.md#how)

<br />



### Why _Not_ use HTML5 `<template>` Element ??

Templates are an _awesome_ feature in HTML5 which
allow the creation of reusable markup!

_Sadly_, they are unavailable in Internet Explorer.
https://caniuse.com/#feat=template <br />
If you don't _need_ to "cater" for Internet Explorer,
then checkout:
https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro


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
