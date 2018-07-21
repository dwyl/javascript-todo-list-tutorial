# Elm(ish) Todo List (TodoMVC) Mini App (TDD Tutorial!)

If you've made it this far, give yourself a pat on the back!
You are about to "_level up_" your JavaScript and "TEA" skills!


## Why?

_Consolidate_ your understanding of The Elm Architecture (TEA)
by creating a "real world" _useable_ App.

## What?

_Use_ our "TEA" knowledge to build a simple "Todo List" Application. <br />
Along the way we will cover:

+ [x] Building an App using a pre-made CSS Styles/Framework!
+ [x] The Document Object Model (DOM)
+ [x] Browser Routing/Navigation
+ [x] Local Storage for Offline Support

We will be abstracting all "TEA" related code
into a file called **`elmish.js`**
so that our Todo List application can be as simple
and "declarative" as possible.

### Todo List?

If you are _unfamiliar_ with Todo lists,
they are a way of keeping a list of the tasks that need to be done. <br />
see: https://en.wikipedia.org/wiki/Time_management#Setting_priorities_and_goals

Todo Lists or "Checklists" are the _best_ way of tracking tasks. <br />
Atul Gawande wrote a _superb_ book on this subject:
https://www.amazon.com/Checklist-Manifesto-How-Things-Right/dp/0312430000 <br />
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

When building a House we don't think "build house" as our _first_ action.
Instead we think: what are the "foundations" that need to be in place
***before*** we lay the first brick?

In our Todo List App we need a few "Helper Functions"
before we start building the App.

### HTML / DOM Creation Generic Helper Functions

All "grouping" or "container" HTML elements e.g: `<div>` or `<section>`
will be called with ***two arguments***:
e.g: `var sec = section(attributes, childnodes)`
+ `attributes` - a list (Array) of HTML attributes/properties
  e.g: `id` or `class`.
+ `childnodes` - a list (Array) of child HTML elements
(_nested within the_ `<section>`)

Each of these function arguments will be "_applied_" to the HTML element.
We therefore need a pair of "helper" functions (_one for each argument_).


### `add_attributes`

The `JSDOC` comment for our `add_attributes` function is:
```js
/**
* add_attributes applies the desired attributes to the desired node.
* Note: this function is "impure" because it "mutates" the node.
* however it is idempotent; the "side effect" is only applied once.
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

Given the code in the test above,
take a moment to think of how _you_ would write,
the `add_attributes` function to apply a CSS `class` to an element. <br />
Note: we have _seen_ the code _before_ in the `counter` example.
The difference is this time we want it to be "generic";
we want to apply a CSS `class` to _any_ DOM node.

If you can, make the test _pass_
by writing the `add_attributes` function.
(_don't forget to_ `export` _the function at the end of the file_).

If you get "stuck", checkout:
https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js <br />


> **Note**: The `add_attributes` function is "impure" as it "mutates"
the target DOM `node`, this is more of a "fact of life" in JavaScript,
and given that the application of attributes
to DOM node(s) is idempotent we aren't "concerned" with "side effects";
the attribute will only be applied _once_ to the node
regardless of how many times the `add_attributes` function is called.
see: https://en.wikipedia.org/wiki/Idempotence


For reference, the Elm HTML Attributes function on Elm package is:
http://package.elm-lang.org/packages/elm-lang/html/2.0.0/Html-Attributes

#### Input `placeholder` Attribute

The `<input>` form element (_where we create new Todo List items_)
has a helpful `placeholder` _prompting_ us with a question:
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

Write the necessary code to make this test _pass_ in `elmish.js`.


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

Write the necessary code to make this test _pass_ in `elmish.js`.

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

Write the "case" in to make this test _pass_ in `elmish.js`.


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

Write the "case" in to make this test _pass_ in `elmish.js`.

`<input>` attribute `type`:
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Attributes


#### Add `style` attribute to HTML element?

In TodoMVC there are _three_ instances of in-line CSS styles.
they are _all_ `style="display: block;"`.
It's _unclear_ why setting _inline_ styles is _necessary_;
we _prefer_ to be _consistent_ and
***either*** use CSS `classes`
with an _external_ stylesheet (_which TodoMVC already does!_)
***or*** go _full_ "inline styles"
e.g: http://package.elm-lang.org/packages/mdgriffith/style-elements/latest

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
https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js <br />


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
https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js <br />


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
https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js <br />
> _**Note**: in our "solution" we created a "helper" function
called `create_element` to "DRY" the HTML element creation code;
this is a *recommended** "best practice"._

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
http://package.elm-lang.org/packages/elm-lang/html/2.0.0/Html
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
[/examples/todo-list/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js )


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
[/examples/todo-list/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js)


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
[/examples/todo-list/elmish.js](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/todo-list/elmish.js)


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
and type (_or copy-paste_) the following code into the Console:

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
![browser-routing-example](https://user-images.githubusercontent.com/194400/43035907-f3a1adac-8cee-11e8-9122-43fb756749a3.png)
The values for `window.history.length` will be different
(_depending on how many times you run the code_).

But that's "_all_" there is to it!
Now let's define some "helper functions" 
so that we can use routing in our Todo List App!


#### Implementation





### Elm(ish) Store > Local Storage



<!--

## What _Next_?

If you feel _confident_ with your "TEA" skills you can _either_:
+ **`try`** and use them to **create your _own_ App** using "TEA"
+ Move on and **Learn Elm**: https://github.com/dwyl/learn-elm
+ (Join the herd and) Learn & use React/Redux.

-->

### Why _Not_ use HTML5 `<template>`

Templates are an _awesome_ feature in HTML5 which
allow the creation of reusable markup!

_Sadly_, they are unavailable in Internet Explorer.
https://caniuse.com/#feat=template
If you don't _need_ to "cater" for Internet Explorer,
then checkout:
https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro
