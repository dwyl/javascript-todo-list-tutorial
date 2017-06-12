# Learn Elm Architecture in _Plain_ JavaScript

Learn how to build web applications using
the Elm ("Model Update View") Architecture in "_plain_" JavaScript.

[![Build Status](https://travis-ci.org/dwyl/learn-elm-architecture-in-javascript.svg?branch=master)](https://travis-ci.org/dwyl/learn-elm-architecture-in-javascript)
[![codecov](https://codecov.io/gh/dwyl/learn-elm-architecture-in-javascript/branch/master/graph/badge.svg)](https://codecov.io/gh/dwyl/learn-elm-architecture-in-javascript)
[![dependencies Status](https://david-dm.org/dwyl/learn-elm-architecture-in-javascript/status.svg)](https://david-dm.org/dwyl/learn-elm-architecture-in-javascript)
[![devDependencies Status](https://david-dm.org/dwyl/learn-elm-architecture-in-javascript/dev-status.svg)](https://david-dm.org/dwyl/learn-elm-architecture-in-javascript?type=dev)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues)



> We think Elm is the _future_ of Front End Web Development <br />
for all the _reasons_ described in:
[github.com/dwyl/**learn-elm#why**](https://github.com/dwyl/learn-elm#why) <br />
_However_ we _acknowledge_ that Elm is _not_ for _everyone_! <br />

> What the [_majority_](https://youtu.be/VNGFep6rncY)
of Front-End Devs _are_ learning/using is
[React.js](https://github.com/dwyl/learn-react).
_Most_ new _React.js_ apps are being built using
[Redux](https://github.com/dwyl/learn-redux) which "_takes cues from_"
(_i.e. takes **all** it's **best ideas/features** from_) Elm:
![redux-borrows-elm](https://cloud.githubusercontent.com/assets/194400/25845941/c7a9ce78-34a7-11e7-91fb-a65f99ce0046.png)
So... by learning the Elm Architecture,
you will **_intrinsically_ understand Redux** <br />
which will help you learn/develop
[React](https://github.com/dwyl/learn-react/issues/18)
apps so you can be one of the
[_cool kids_](https://github.com/nelsonic/nelsonic.github.io/issues/75)! <br />

> This step-by-step tutorial is a _gentle_ introduction to
the Elm Architecture, <br />
for people who write JavaScript and want
a _**functional**, **elegant** and **fast**_ <br />
way of organizing their JavaScript _without_
having the learning curve <br />
of a completely new (_functional_) programming language!


## _Why?_

![simple-life](https://cloud.githubusercontent.com/assets/194400/25773897/ea0c11fa-327d-11e7-86e0-7d8721c2d7ea.png)

_Organizing_ `code` in a Web (_or Mobile_) Application
is _really easy_ to ***over-complicate***, <br />
_especially_ when you are just starting out and there
are dozens of competing ideas <br />
all claiming to be the "_right way_".

When we encounter this type of "_what is the **right way**_?"
question <br />
we always follow [***Occam's Razor***](https://en.wikipedia.org/wiki/Occam%27s_razor) and _ask_:
what is the ***simplest way***? <br />
And to _that_ question the ***answer*** is:
the "**Elm (MUV) _Architecture_**".


When compared to _other_ ways of organizing your code,
"MUV" has the following benefits:
+ Easier to _understand_ what is going on in more advanced apps
because the "_flow_" is always the same.
+ ***Uni-directional data-flow*** means "state" of the app is always predictable;
given a specific starting "state" and sequence of update actions
the output/end state will _always_ be the same. This makes testing/testability
very easy!
+ There's **no** "***middle man***" to complicate things
(_the way there is in the
[Model-view-Presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) architecture..._)
+ _Much_ Lower Overhead when compared to implementing "Model-View-ViewModel" (MVVM) is "overkill" for simple UI operations.

## _Who? (Should I Read/Learn This...?)_

[![everybodys-gotta-learn-sometime](https://cloud.githubusercontent.com/assets/194400/25806590/a1619644-33fb-11e7-8b84-1a21be188fb7.png)](https://www.youtube.com/results?q=The+Korgis+-+Everybody%27s+Gotta+Learn+Sometime)

Anyone who knows a _little_ bit of JavaScript
and wants to learn how to organize/structure <br />
their code/app in a _sane_, predictable and testable way.

### _Prerequisites_?

![all-you-need-is-less](https://cloud.githubusercontent.com/assets/194400/25772135/a4230490-325b-11e7-9f12-da19fa4eb5e9.png)

+ _Basic_ JavaScript Knowledge.
see: [github.com/iteles/**Javascript**-the-**Good-Parts**-notes](https://github.com/iteles/Javascript-the-Good-Parts-notes)
+ _Basic_ Understanding of TDD. If you are _completely_ new to TDD,
please see: https://github.com/dwyl/learn-tdd
+ A computer
+ 30 minutes.

> No other knowledge is assumed or implied.
If you have **_any_ questions**, ***please ask***: <br />
[github.com/dwyl/**learn-elm-architecture**-in-javascript/**issues**](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues)


## _What?_

![image](https://cloud.githubusercontent.com/assets/194400/25772120/3fa2492c-325b-11e7-9aee-90b059360c14.png)

### A _Complete Beginner's_ Guide to "MUV"

Start with a few definitions:

+ **M**odel - or "data model" is the place where all data
is often referred to as the application's `state`
+ **U**pdate - how your app handles `actions` performed
by people and `update` the `state` of your.
+ **V**iew - what the people using your app can see;
a way to `view` the Model (counter) as `HTML`

![elm-muv-architecture-diagram](https://cloud.githubusercontent.com/assets/194400/25773775/b6a4b850-327b-11e7-9857-79b6972b49c3.png)

Don't worry if you don't understand this diagram (_yet_),
it will all become clear when you start seeing it in _action_ (_below_)!


## _How?_

### 1. Clone this Repository

```sh
git clone https://github.com/dwyl/learn-elm-architecture-in-javascript.git && cd learn-elm-architecture-in-javascript
```

### 2. Open Example `.html` file in Web Browser

When you open `examples/counter-basic/index.html` you should see:

![elm-architecture-counter](https://cloud.githubusercontent.com/assets/194400/25780607/d2251eac-3321-11e7-8e65-9abbfa204fb3.gif)

Try clicking on the buttons to increase/decrease the counter.

### 3. Edit Some Code!

In your Text Editor / IDE of choice,
edit the _initial value_ of the model
(_e.g: change the initial value from 0 to 9_):

![elm-architecture-code-update](https://cloud.githubusercontent.com/assets/194400/25780662/adff6418-3323-11e7-8089-fae4bdc515e8.gif)

### 4. Refresh the Web Browser

When you refresh the your Web Browser you will see
that the "_initial state_" is now **9**:

![update-initial-model-to-9](https://cloud.githubusercontent.com/assets/194400/25780667/c84d0bf4-3323-11e7-929d-2019f5face2c.png)

You have just seen how easy it is to set the "_initial state_"
in an App built with the Elm Architecture. <
This

### 5. Read Through & Break Down the Code in the Example

You _may_ have taken the time to read the code in Step 3 (_above_) ... <br />
If you did, _well done_ for challenging yourself
and getting a "_head start_" on reading/learning! <br />
Reading (_other people's_) code is the _fastest_ way
to learn programming skills and
the _only_ way to learn useful "_patterns_". <br />
If you didn't read through the code in Step 3, that's ok!
Let's walk through the functions _now_!

> As always, our _hope_ is that the functions
are clear and well-commented, <br />
please inform us if anything is unclear please
ask any questions as **issues**: <br />
[github.com/dwyl/**learn-elm-architecture**-in-javascript/**issues**](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues)


### 5.1 `mount` Function Walkthrough

The mount function "wires up" the app and tells the _view_
how to process a `signal` sent by the user/client.

```js
function mount(model, update, view, root_element_id) {
  var root = document.getElementById(root_element_id); // root DOM element
  function signal(action) {          // signal function takes action
    return function callback() {     // and returns callback
      model = update(model, action); // update model according to action
      view(signal, model, root);     // subsequent re-rendering
    };
  };
  view(signal, model, root);         // render initial model (once)
}
```

`mount` receives an `Object` containing three properties:
+ `model`: "_initial state_" of your application
(_in this case the counter which starts at 0_)
+ `update`: the function that gets executed when ever a "_signal_"
is received from the client (_person using the app_).
+ `view`: the function that renders the DOM (_see: section 5.3 below_)

`mount` _also_ receives the `id` of the "root DOM element"
as it's _second_ argument; this is the DOM element <br />
where your app will be "_mounted to_". In other words your app
will be _contained_ within this root element. <br />
(_so make sure it is empty before `mount`ing_)

The first line in `mount` is to get a _reference_ to the root DOM element <br />
we do this _once_ in the entire application to _minimze_ DOM lookups.

The _next_ 3 lines are simply making _local_ copies of the properties of MUV.

#### `mount` > `signal` > `callback` ?

The _interesting_ part of the `mount` function is `signal`! <br />
At first this function may seem a little strange ... <br />
_Why_ are we defining a function that returns another function? <br />
If this your first time seeing this "_pattern_",
welcome to the wonderful world of "_closures_"!

#### _What_ is a "Closure" and _Why/How_ is it Useful?

A `closure` is an inner function that has access
to the outer (enclosing) function's variables—scope chain.
The closure has three scope chains: it has access to its own scope
(variables defined between its curly brackets), it has access to
the outer function's variables, and it has access to the global variables.

In the case of the `callback` function inside `signal`,
the `signal` is "passed" to the various bits of UI
and the `callback` gets executed when the UI gets interacted with.
If we did not have the `callback` the `signal`
would be executed _immediately_ when the `button` is _defined_. <br />
Whereas we only want the `signal` (`callback`) to be triggered
when the button is _clicked_. <br />
Try removing the `callback` to see the effect:

![range-error-stack-exceeded](https://cloud.githubusercontent.com/assets/194400/25838395/bcb3296e-348a-11e7-8a8b-10114016cdfb.png)

The `signal` is triggered when button is _created_, which _re-renders_
the `view` creating the button again. And, since the `view` renders _two_
buttons each time it creates a "_chain reaction_" which almost
instantly _exceeds_ the "***call stack***"
(_i.e. exhausts the allocated memory_) of the browser!

The putting the `callback` in a _closure_ means we can pass a _reference_
to the `signal` (_parent/outer_) function to the `view` function.

##### Further Reading on Closures

+ https://developer.mozilla.org/en/docs/Web/JavaScript/Closures
+ http://javascriptissexy.com/understand-javascript-closures-with-ease/
+ ... if closures aren't "clicking",
or you want _more_ detail/examples,
[***please ask***!](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues)


#### 5.1.1 `mount` > render initial view

The last line in the `mount` function is to _render_ the `view` function
for the first time passing in the `signal` function, initial model ("state")
and root element. This is the _initial_ rendering of the UI.


### 5.2 Define the "_Actions_" in your App

The next step in the Elm Architecture is to _define_ the Actions
that can be taken in your application. In the case of our _counter_
example we only have _two_ (_for now_):

```js
// Define the Component's Actions:
var Inc = 'inc';                     // increment the counter
var Dec = 'dec';                     // decrement the counter
```
These _Actions_ are used in the `switch` (_i.e. decide what to do_)
inside the `update` function.

Actions are always defined as a `String`. <br >
The Action _variable_ gets passed around inside the JS code <br />
but the `String` representation is what appears in the DOM <br />
and then gets passed in `signal` from the UI back to the `update` function.

One of the biggest (_side_) benefits of defining actions like this
is that it's really quick to see what the application _does_
by _reading_ the list of actions!

### 5.3 Define the `update` Function

The `update` function is a simple
[`swicth`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Statements/switch)
statement that evaluates the `action` and "dispatches"
to the required function for processing.

In the case of our simple counter we aren't defining functions for each `case`:
```js
function update(model, action) {     // Update function takes the current model
  switch(action) {                   // and an action (String) runs a switch
    case Inc: return model + 1;      // add 1 to the model
    case Dec: return model - 1;      // subtract 1 from model
    default: return model;           // if no action, return current model.
  }                                  // (default action always returns current)
}
```
However this if the "_handlers_" for each `action` were "_bigger_",
we would split them out into their own functions e.g:

```js
// define the handler function used when action is "inc"
function increment(model) {
  return model + 1
}
// define handler for "dec" action
function decrement(model) {
  return model - 1
}
function update(model, action) {     // Update function takes the current state
  switch(action) {                   // and an action (String) runs a switch
    case Inc: return increment(model);  // add 1 to the model
    case Dec: return decrement(model);  // subtract 1 from model
    default: return model;           // if no action, return curent state.
  }                                  // (default action always returns current)
}
```
This is _functionally_ equivalent to the simpler `update` (_above_) <br />
But does not offer any _advantage_ at this stage. (_just remember it for later_)

### 5.4 Define the `view` Function

The `view` function is responsible
for _rendering_ the `state` to the DOM. <br />

```js
function view(signal, model, root) {
  empty(root);                                 // clear root element before
  [                                            // Store DOM nodes in an array
    button('+', signal, Inc),                  // create button (defined below)
    div('count', model),                       // show the "state" of the Model
    button('-', signal, Dec)                   // button to decrement counter
  ].forEach(function(el){ root.appendChild(el) }); // forEach is ES5 so IE9+
}
```

The `view` receives three arguments:
+ `signal` defined above in `mount` (_above_) tells each (DOM) element
how to to "handle" the user input.
+ `model` a reference to the _current_ value of the counter.
+ `root` a reference to the root DOM element where the app is _mounted_.

The `view` function starts by _emptying_
the DOM inside the `root` element using the `empty` helper function. <br />
This is _necessary_ because, in the Elm Architecture, we _re-render_
the _entire_ application for each action. <br />

> See note on DOM Manipulation and "Virtual DOM" (_below_)

The `view` creates a _list_ (`Array`) of DOM nodes that need to be rendered.


#### 5.4.1 `view` helper functions: `empty`, `button` and `div`

The `view` makes use of three "helper" (_DOM manipulation_) functions:

1. `empty`: empty the `root` element of any "child" nodes.
_Essentially_ `delete` the DOM inside which ever element passed into `empty`.
```js
function empty(node) {
  while (node.firstChild) { // while there are stil nodes inside the "parent"
      node.removeChild(node.firstChild); // remove any children recursively
  }
}
```

2. `button`: creates a
[`<button>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button)
DOM element and attaches a
["text node"](https://developer.mozilla.org/en-US/docs/Web/API/Document/createTextNode)
which is the _visible_ contents of the button the "_user_" sees.
```js
function button(buttontext, signal, action) {
  var button = document.createElement('button');  // create a button HTML node
  var text = document.createTextNode(buttontext); // human-readable button text
  button.appendChild(text);                       // text goes *inside* button
  button.className = action;                      // use action as CSS class
  button.onclick = signal(action);                // onclick sends signal
  return button;                                  // return the DOM node(s)
}
```

3. `div`: creates a `<div>` DOM element and apply an `id` to it,
then if some `text` was supplied in the _second_ argument,
create a "text node" to display that text.
(_in the case of our counter the `text` is the current value of the model,
  i.e. the count_)
```js
function div(divid, text) {
  var div = document.createElement('div'); // create a <div> DOM element
  div.id = divid;
  if(text !== undefined) { // if text is passed in render it in a "Text Node"
    var txt = document.createTextNode(text);
    div.appendChild(txt);
  }
  return div;
}
```

> _**Note**: in `elm` land all of these "helper" functions are in the
[`elm-html`](http://package.elm-lang.org/packages/evancz/elm-html/latest/)
package, but we have defined them in this counter example
so there are **no dependencies** and you can see **exactly**
how everything is "made" from "**first principals**"_

Once you have read through the functions
(_and corresponding comments_), <br />
take a look at the _tests_.

> _**Pro Tip**: Writing code is an **iterative** (repetitive) process,
**manually refreshing** the web browser each time you update
some code get's **tedious** quite fast, Live Server to the rescue!_

### 6. (_Optional_) Install "Live Server" for "_Live Reloading_"

> **Note**: Live Reloading is not required,
e.g. if you are on a computer where you cannot install anything,
the examples will still work in your web browser.

Live Reloading helps you iterate/work faster because you don't have to <br />
_manually_ refresh the page each time, simply run the following command:

```
npm install && npm start
```
This will download and start
[`live-server`](https://github.com/tapio/live-server)
which will auto-open your `default` browser: <br />
Then you can _navigate_ to the desired file.
e.g:
[http://127.0.0.1:8000/examples/**counter-basic**/](http://127.0.0.1:8000/examples/counter-basic/)

### 7. Read the _Tests_!

In the _first_ example we kept everything in
_one_ file (`index.html`) for simplicity. <br />
In order to write tests (_and collect coverage_),
we need to _separate_ out
the JavaScript code from the HTML.

For this example there are 3 _separate_ files:

![test-example-files](https://cloud.githubusercontent.com/assets/194400/25785513/768205e8-337a-11e7-826f-887c3ac937b6.png)


Let's start by opening the `/examples/counter-basic-test/index.html`
file in a web browser: <br />
http://127.0.0.1:8000/examples/counter-basic-test/?coverage

![counter-coverage](https://cloud.githubusercontent.com/assets/194400/25816673/b994d25a-341c-11e7-8fd1-52e136fb7152.png)

Because all functions are "pure" testing
the `update` function is _very_ easy:

```js
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
```
open: `examples/counter-basic-test/test.js` to see these and _other_ tests.

> The _reason_ why Apps built using the Elm Architecture
are _**so easy**_ to _understand_ <br />
(_or ["**reason about**"](http://stackoverflow.com/q/18666821)_)
and _test_ is that all functions are "Pure".

### 8. What is a "_Pure_" Function? (_Quick Learning/Recap_)

Pure Functions are functions that **always
return** the **same output** for a **given input**. <br />
Pure Functions have "_no side effects_",
meaning they don't change anything they aren't supposed to, <br />
they just do what they are told; this makes them very predictable/testable.
Pure functions "transform" data into the desired value,
they do not "mutate" state.

#### 8.1 Example of an _Impure_ Function

The following function is "_impure_" because it "_mutates_"
i.e. changes the `counter` variable which is _outside_ of the function
and not passed in as an argument:
```js
// this is an "impure" function that "mutates" state
var counter = 0;
function increment () {
  return ++counter;
}
console.log(increment()); // 1
console.log(increment()); // 2
console.log(increment()); // 3
```
see: https://repl.it/FIot/1

#### 8.2 Example of an _Pure_ Function

This example is a "pure" function because it will _always_ return
same result for a given input.
```js
var counter = 0;
function increment (my_counter) {
  return my_counter + 1;
}
// counter variable is not being "mutated"
// the output of a pure function is always identical
console.log(increment(counter)); // 1
console.log(increment(counter)); // 1
console.log(increment(counter)); // 1
// you can "feed" the output of one pure function into another to get the same result:
console.log(increment(increment(increment(counter)))); // 3
```
see: https://repl.it/FIpV

#### 8.3 Counter Example written in "Impure" JS

It's _easy_ to get
[_suckered_](http://www.urbandictionary.com/define.php?term=suckered)
into thinking that the "_impure_" version of the counter <br />
`examples/counter-basic-impure/index.html`
is "_simpler_" ... <br />
the _complete_ code (_including HTML and JS_) is ***8 lines***:

```html
<button class='inc' onclick="incr()">+</button>
<div id='count'>0</div>
<button class='dec' onclick="decr()">-</button>
<script>
  var el = document.getElementById('count')
  function incr() { el.innerHTML = parseInt(el.textContent, 10) + 1 };
  function decr() { el.innerHTML = parseInt(el.textContent, 10) - 1 };
</script>
```


This counter _does_ the same thing as
our Elm Architecture example (_above_), <br />
and to the _end-user_ the UI **_looks_ identical**:

![counter-impure-665](https://cloud.githubusercontent.com/assets/194400/25816521/3a0e0722-341c-11e7-9afc-269abb4bb225.png)


The difference is that in the _impure_ example is "_mutating state_"
and it's impossible to predict what that state will be!

> _Annoyingly, for the person explaining the benefits
of function "purity" and the virtues of the Elm Architecture <br />
the "impure" example is both **fewer lines of code**
(which means it **loads faster**!), takes less time to read  <br />
and renders faster because only the `<div>` text content
is being updated on each update! <br />
> This is why it can often be **difficult to explain** to "**non-technical**"
**people** that code which has similar output  <br />
on the **screen**(s)
might **not the same** quality "**behind the scenes**"!_ <Br />
> _Writing impure functions is like setting off on a marathon run after
[tying your shoelaces **incorrectly**](https://youtu.be/zAFcV7zuUDA) ... <br />
You might be "OK" for a while, but pretty soon your laces will come undone
and you will have to **stop** and **re-do** them._


To conclude: Pure functions do not mutate a "global" state
and are thus predictable and easy to test;
we _always_ use "Pure" functions in Apps built with the Elm Architecture.
The moment you use "_impure_" functions you forfeit reliability.


### 9. Extend the Counter Example following "TDD": Reset the Count!

As you (_hopefully_) recall from our
[Step-by-Step TDD Tutorial](https://github.com/dwyl/learn-tdd),
when we craft code following the "TDD" approach,
we go through the following steps:
1. Read and understand the "user story"
(_e.g: in this case_:
  [issues/5](https://github.com/dwyl/learn-elm-architecture-in-javascript/issues/5))
![reset-counter-user-story](https://cloud.githubusercontent.com/assets/194400/25817522/84fdd9bc-341f-11e7-9efd-406d76a3b1f3.png) <br />
2. Make sure the "_acceptance criteria_" are clear
(_the checklist in the issue_)
3. Write your test(s) based on the acceptance criteria.
(_Tip: a single feature - in this case resetting the counter - can
  and often `should` have multiple tests to cover all cases._)
4. Write code to make the test(s) pass.

> `BEFORE` you continue, try and build the "reset"
functionality yourself following TDD approach!



<br /><br /><br />

#### 9.1 Tests for Resetting the Counter (Update)

We _always_ start with the Model test(s)
(_because they are the easiest_):

```js
test('Test: reset counter returns 0', function(assert) {
  var result = update(6, "reset");
  assert.equal(result, 0);
});
```
#### 9.2 Watch it Fail!

Watch the test _fail_ in your Web Browser: <br />
![reset-counter-failing-test](https://cloud.githubusercontent.com/assets/194400/25818566/e2c33152-3422-11e7-9c4c-9ecd9fa9ffc6.png)

#### 9.3 Make it Pass (_writing the minimum code_)

In the case of an App written with the Elm Architecture,
the minimum code is:
+ Action in this case `var Res = 'reset';`
+ Update (_case and/or function_) to "_process the signal_" from the UI
(_i.e. handle the user's desired action_)
```js
case Res: return 0;
```
![reset-counter-test-passing](https://cloud.githubusercontent.com/assets/194400/25818892/05349e96-3424-11e7-8d42-b4cbbc1eb1a6.png)

#### 9.4 Write View (UI) Tests

Once we have the Model tests passing
we need to give the _user_ something to interact with! <br />
We are going to be "_adventurous_" and write _two_ tests this time! <br />
(_thankfully we already have a UI test for another button we can "copy"_)

```
test('reset button should be present on page', function(assert) {
  var reset = document.getElementsByClassName('reset');
  console.log(reset);
  assert.equal(reset.length, 1);
});

test('Click reset button resets model (counter) to 0', function(assert) {
  mount({model: 7, update: update, view: view}, id); // set initial state
  var root = document.getElementById(id);
  assert.equal(root.getElementsByClassName('count')[0].textContent, 7);
  var btn = root.getElementsByClassName("reset")[0]; // click reset button
  btn.click(); // Click the Reset button!
  var state = root.getElementsByClassName('count')[0].textContent;
});
```
#### 9.5 Watch View/UI Tests Fail!

Watch the UI tests go red in the browser:

![reset-counter-failing-tests](https://cloud.githubusercontent.com/assets/194400/25819267/59ea1a64-3425-11e7-8f77-2380c6518b9d.png)

#### 9.6 Make UI Tests Pass (_writing the minimum code_)

Luckily, to make _both_ these tests _pass_ requires
a _single_ line of code in the `view` function!

```js
button('Reset', signal, Res)
```
![reset-counter](https://cloud.githubusercontent.com/assets/194400/25822128/82eb7a8e-342f-11e7-9cd0-1a69d95ee878.gif)



<br /> <br />

## Futher/Background Reading

+ The Elm Architecture Simple, yet powerful – An overview by example:
https://dennisreimann.de/articles/elm-architecture-overview.html
(_written in Elm so not much use for people who only know JS,
  but a good post for further reading!_)
+ What does it mean when something is "_easy to **reason about**_"?  
http://stackoverflow.com/questions/18666821/what-does-the-term-reason-about-mean-in-computer-science
+ Elm Architecture with JQuery by @steos:
https://medium.com/javascript-inside/elm-architecture-with-jquery-152cb98a62f
(_written in JQuery and no Tests so
  not great for teaching beginners good habits, but still a v. good post!_)
+ Pure functions: https://en.wikipedia.org/wiki/Pure_function
+ Higher Order Functions in JavaScript:
http://eloquentjavascript.net/05_higher_order.html
+ Higher-order functions - Part 1 of Functional Programming in JavaScript:
https://youtu.be/BMUiFMZr7vk


<br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br />
# tl;dr


### _Flattening_ the Learning Curve

The issue of the "Elm Learning Curve" was raised in:
[github.com/dwyl/**learn-elm**/issues/**45**](https://github.com/dwyl/learn-elm/issues/45) <br />
and scrolling down to to @lucymonie's
[list](https://github.com/dwyl/learn-elm/issues/45#issuecomment-275947200)
we see the **Elm _Architecture_** at number four ... <br />
`this` seems fairly logical (_initially_) because the _Elm **Guide**_
uses the _Elm **Language**_ to explain the _Elm **Architecture**_:
https://guide.elm-lang.org/architecture

![elm-architecture](https://cloud.githubusercontent.com/assets/194400/25771470/72eccdd6-324a-11e7-8723-f07bcc188c21.png)

i.e. it ***assumes*** that people **already _understand_**
the (Core) _Elm **Language**_... <br />
This is a _fair_ assumption given the _ordering_ of the Guide _however_
... we have a _different_ idea:

### Hypothesis: Learn (& Practice) Elm Architecture `before` Learning Elm?

We ***hypothesize*** that if we _**explain** the **Elm Architecture**_
(_**in detail**_) using a **language** <br />
people are _**already familiar**_ with (_i.e **JavaScript**_)
`before` diving into the Elm Language <br />
it will
["***flatten***"](https://english.stackexchange.com/questions/6212/whats-the-opposite-for-steep-learning-curve)
the **learning curve**.

> _**Note**: Understanding the **Elm Architecture**
will give you a **massive headstart** <br />
on [learning **Redux**](https://github.com/dwyl/learn-redux)
which is the "de facto" way of structuring React.js Apps. <br />
So even if you
decide not to learn/use Elm, you will still gain
**great frontend skills**!_

### Isn't DOM Manipulation Super Slow...?

> _DOM manipulation is the **slowest**
part of any "**client-side**" web app. <br />
> That is why so many client-side frameworks
(including **Elm**, React and Vue.js) now use a "**Virtual DOM**".
> For the purposes of `this` tutorial, and for **most small apps**
Virtual DOM is total **overkill**! <br />
It's akin to putting a Ferrari engine in a gocart!_

### What is "_Plain_" JavaScript?

"_Plain_" JavaScript just means not using _any_ frameworks
or features that require "compilation".

The point is to _understand_ that you don't need
_anything_ more than
["***JavaScript the Good Parts***"](https://github.com/iteles/Javascript-the-Good-Parts-notes) <br />
to build something full-featured and easy/fast to read!!

[![babel](https://cloud.githubusercontent.com/assets/194400/25772913/72a818f4-326c-11e7-8020-9b5dab715987.png)](https://twitter.com/iamdevloper/status/787969734918668289 "Babel, how to show off that you don't have core ES5 skills.")

If you can build with "ES5" JavaScript: <br />
a) you side-step the
[_noise_](https://twitter.com/iamdevloper/status/610191865216786432)
and focus on core skills that _already_ work everywhere!
(_don't worry you can always "top-up" your
JS knowledge later with ES6, etc!)<br />
b) you don't need to waste time installing
[_**Two Hundred Megabytes**_](https://cloud.githubusercontent.com/assets/194400/13321493/39fcfa30-dbc7-11e5-8b05-f046675f9cb6.png)
of dependencies just to run a simple project! <br />
c) You ***save time*** (_for yourself, your team and end-users!_)
because your code is _already_ optimized to run in _any_ browser!
