# Elm(ish) Todo List (TodoMVC) Mini App

If you've made it this far, give yourself a pat on the back!
You are about to "_level up_" your JavaScript and "TEA" skills!


## Why?

Consolidate your understanding of The Elm Architecture (TEA)
by creating a "real world" _useable_ App.

## What?

_Use_ our "TEA" knowledge to build a simple "Todo List" Application. <br />
Along the way we will touch upon:

+ [x] The Document Object Model (DOM)
+ [x] Browser Routing/Navigation
+ [x] Local Storage for Offline Support

We will be abstracting all "TEA" related code
into a file called `elmish.js`
so that our Todo List application can be as simple as possible.

### Todo List?

If you are _unfamiliar_ with Todo lists,
they are a way of keeping a list of the tasks that need to be done.
see: https://en.wikipedia.org/wiki/Time_management#Setting_priorities_and_goals

Todo Lists or "Checklists" are the _best_ way of tracking tasks.
Atul Gawande wrote a _fantastic_ book on this subject:
https://www.amazon.com/Checklist-Manifesto-How-Things-Right/dp/0312430000
Watch: https://www.youtube.com/results?search_query=checklist+manifesto

### TodoMVC?

If you have not come across TodoMVC before,
it's a sample application to showcase various "frontend" frameworks.
![TodoMVC-intro](https://user-images.githubusercontent.com/194400/42624420-4528a3c6-85bd-11e8-8b92-9b1c8951ba35.png)


We highly recommend checking out the following links:

+ Website: http://todomvc.com
+ GitHub project: https://github.com/tastejs/todomvc

For our purposes we will simply be re-using the **`CSS`**
to make our TEA Todo List _look_ nice.
All the JavaScript code will be written "_from scratch_"
to ensure that everything is clear.

## _Who?_

This tutorial is for everyone who wants to _apply_ their "TEA" knowledge
and _think_ about the basics of a Todo List Application.

> As always, if you get "stuck", _please_ open an issue:
https://github.com/dwyl/learn-elm-architecture-in-javascript/issues
by opening a question you help _everyone_ learn more effectively!


## _How?_

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
[front-end-with-tape.md](https://github.com/dwyl/learn-tape/blob/master/front-end-with-tape.md)

It's "OK" to ask: "_Where do I **start** (my **TDD** quest)?_" <br />
The answer is: create **two** new files:
`examples/todo-list/elmish.js` and `test/elmish.test.js`

We will create a couple of tests and their corresponding functions _next_!

## Elm(_ish_)

Our **first step** is to _abstract_ and _generalise_
the Elm Architecture (`mount`) and HTML ("DOM") functions
we used in the "counter" example.

Recall that there are **3 parts** to "TEA": `model`, `update` and `view`. <br />
These correspond to the `M`odel, `C`ontroller and `V`iew of "**MVC**".
The _reason_ Elm refers to the "Controller" as "Update" is because
this name _more accurately_ reflects what the function _does_:
it updates the _state_ of the application.

Our `update` and `view` functions form
the "business logic" of our Todo List App,
so we cannot abstract these. <br />
The `update` function is a simple `switch` statement
that "decides" how to to _update_ the app's `model`
each `case` is functionality that is _specific_ to the Todo List App. <br />
The `view` function _invokes_ several "helper" functions
which create HTML elements e.g: `div` & `<button>`;
these _can_ (_will_) be generalised (_below_).

Let's kick-off with a couple of "_familiar_" _generic_ functions:
`empty` and `mount`.


#### `empty` the DOM

Given that we _know_ we are going to use the `empty`
function we used previously in our `counter`,
`counter-reset` and `multiple-counters` examples (_in the "basic" TEA tutorial_)
we can write a _test_ for the `empty` function quite easily.

In the `test/elmish.test.js` file, type the following code:
```js
const test = require('tape');       // https://github.com/dwyl/learn-tape
const fs = require('fs');           // read html files (see below)
const path = require('path');       // so we can open files cross-platform
const elmish = require('../examples/todo-list/elmish.js');
const html = fs.readFileSync(path.resolve(__dirname,
  '../examples/todo-list/index.html'));
require('jsdom-global')(html);      // https://github.com/rstacruz/jsdom-global
elmish.init(document);              // pass JSDOM into elmish for DOM functions
const id = 'test-app';              // all tests use separate root element

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
  elmish.empty(root); // exercise the `empty` function!
  t.equal(root.childElementCount, 0, "After empty(root) has 0 child elements!")
  t.end();
});
```

> _**Note**: if any line in this file is **unfamiliar** to you,
please **first** go back over the previous example(s),
**then** do bit of "googling" for any words or functions you don't recognise
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

If the comment syntax above the function definition is _unfamiliar_,
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
we need to know which _other_ functions we need.
Let's take a look at the TodoMVC App to see what we need.

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



### Todo List _Basic_ Functionality

A todo list has only 2 basic functions:

1. **Add** a `new` item to the list when the **`[Enter]`** key is pressed
2. **Check-off** an item as "**completed**" (_done/finished_)

> **Add** item and **Check-off** is _exactly_ the "functionality"
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

#### `<section>`

The _first_ HTML we encounter in the TodoMVC app is
`<section>`.
`<section>` represents a standalone section — which doesn't have
a more specific semantic element to represent it —
it's an alternative way to group elements to a `<div>`.

> info: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section <br />
> difference:
https://stackoverflow.com/questions/6939864/what-is-the-difference-between-section-and-div

As with other "grouping" or "container" HTML elements,
our `section` function (_which will create the_ `<section>` _DOM node_)
will be a function with _two_ arguments:
+ `attributes` - a list (Array) of HTML attributes/properties
  e.g: `id` or `class`.
+ `children` - a list (Array) of child HTML elements
(_nested within the_ `<section>`)

Each of these function arguments will be "_applied_" to the HTML element.
We therefore need a pair of "helper" functions (_one for each argument_).



#### `attributes`

`attributes(attrlist, node)`

The `attributes` function is "impure" as it "mutates"
the target DOM `node`, however the application of attributes
to DOM node(s) is idempotent;
the attribute will only be applied _once_ to the node
regardless of how many times the `attributes` function is called.
see: https://en.wikipedia.org/wiki/Idempotence




Section in Elm: http://package.elm-lang.org/packages/elm-lang/html/2.0.0/Html
<br />
Demo: https://ellie-app.com/LTtNVQjfWVa1
![ellie-elm-section](https://user-images.githubusercontent.com/194400/42708957-bbcc1020-86d6-11e8-97bf-f2f3a1c6fdea.png)



The Elm HTML Attributes package is:
http://package.elm-lang.org/packages/elm-lang/html/2.0.0/Html-Attributes







<!--

## What _Next_?

If you feel _confident_ with your "TEA" skills you can _either_:
+ **`try`** and use them to **create your _own_ App** using "TEA"
+ **Learn Elm**: https://github.com/dwyl/learn-elm
+ (Join the herd and) learn React/Redux.

-->
