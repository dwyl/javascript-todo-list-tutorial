# Learn Elm Architecture in _Plain_ JavaScript

Learn how to build web applications using
the Elm ("Model Update View") Architecture in "_plain_" JavaScript.

> We think Elm is the _future_ of Front End Web Development <br />
for all the reasons described in:
[github.com/dwyl/**learn-elm#why**](https://github.com/dwyl/learn-elm#why) <br />
However we _acknowledge_ that Elm is _not_ for _everyone_! <br />
This step-by-step tutorial is a _gentle_ introduction to
the Elm Architecture, <br />
for people who write JavaScript and want an elegant, efficient
and fast <br />
way of organizing their JavaScript without
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
+ Uni-directional data-flow means "state" is always predictable:
given a specific set starting data model and specific sequence of update actions
the output/end state will _always_ be the same. This makes testing/testability
very easy!
+ There's **no** "***middle man***" to complicate things
(_the way there is in the
[Model-view-Presenter](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93presenter) architecture..._)
+ _Much_ Lower Overhead when compared to implementing "Model-View-ViewModel" (MVVM) is "overkill" for simple UI operations.


### _Flattening_ the Learning Curve

The issue of the "Elm Learning Curve" was raised in:
[github.com/dwyl/**learn-elm**/issues/**45**](https://github.com/dwyl/learn-elm/issues/45) <br />
and scrolling down to to @lucymonie's [list](https://github.com/dwyl/learn-elm/issues/45#issuecomment-275947200) we see the **Elm _Architecture_** at number four ... <br />
`this` seems fairly logical (_initially_) because the _Elm **Guide**_
uses the _Elm **Language**_ to explain the _Elm **Architecture**_: https://guide.elm-lang.org/architecture

![elm-architecture](https://cloud.githubusercontent.com/assets/194400/25771470/72eccdd6-324a-11e7-8723-f07bcc188c21.png)

i.e. it ***assumes*** that people **already _understand_** the (Core) _Elm **Language**_... <br />
This is a _fair_ assumption given the _ordering_ of the Guide _however_
... we have a _different_ idea:

### Hypothesis: Learn (& Practice) Elm Architecture `before` Learning Elm?

We ***hypothesize*** that if we _**explain** the **Elm Architecture**_
(_**in detail**_) using a **language** <br />
people are _**already familiar**_ with (_i.e **JavaScript**_)
`before` diving into the Elm Language <br />
it will ["flatten"](https://english.stackexchange.com/questions/6212/whats-the-opposite-for-steep-learning-curve)
the learning curve.

> _**Note**: Understanding the **Elm Architecture**
will give you a **massive headstart** <br />
on [learning **Redux**](https://github.com/dwyl/learn-redux)
which is the "de facto" way of structuring React.js Apps. <br />
So even if you
decide not to learn/use Elm, you will still gain
**great frontend skills**!_

## _What?_

![image](https://cloud.githubusercontent.com/assets/194400/25772120/3fa2492c-325b-11e7-9aee-90b059360c14.png)

### A _Complete Beginner's_ Guide to "MUV"

Start with a few definitions:

+ **M**odel - or "data model" is the place where all data is often referred to as the application's `state`
+ **U**pdate - how your app handles `actions` performed by people and `update` the `state` of your.
+ **V**iew - what the people using your app can see; a way to `view` your state as `HTML`

![elm-muv-architecture-diagram](https://cloud.githubusercontent.com/assets/194400/25773775/b6a4b850-327b-11e7-9857-79b6972b49c3.png)

Don't worry if you don't understand this diagram (_yet_),
it will all become clear when you start seeing it in _action_!

## _Who? (Should I Read/Learn This...?)_

Anyone who knows a _little_ bit of JavaScript
and wants to learn how to organize/structure
their code in the most _sane_ and easy to understand way.

### Pre-requisites?

+ _Basic_ JavaScript Knowledge.
see: https://github.com/iteles/Javascript-the-Good-Parts-notes
+ _Basic_ Understanding of TDD. If you are _completely_ new to TDD,
please see: https://github.com/dwyl/learn-tdd
+ A computer
+ 30 minutes.

> No other knowledge is assumed or implied.
If you have **_any_ questions**, ***please ask***: <br />
[github.com/dwyl/**learn-elm-architecture**-in-plain-javascript/**issues**](https://github.com/dwyl/learn-elm-architecture-in-plain-javascript/issues)


## _How?_

![all-you-need-is-less](https://cloud.githubusercontent.com/assets/194400/25772135/a4230490-325b-11e7-9f12-da19fa4eb5e9.png)

#### 1. Clone this Repository

```sh
git clone https://github.com/dwyl/learn-elm-architecture-in-plain-javascript.git && learn-elm-architecture-in-plain-javascript
```

#### 2. Open one of the Example `.html` files in your Web Browser

e.g: `examples/01-counter-basic.html`:

![image](https://cloud.githubusercontent.com/assets/194400/25774194/cebab492-3282-11e7-813c-6f504def949e.png)

Try clicking on the buttons to increase/decrease the counter

#### 3. Edit Some Code!

In your Text Editor / IDE of choice,
edit one of the _value_ of the model
(_e.g: change the initial value from 0 to 9_):

![update-value-of-model](https://cloud.githubusercontent.com/assets/194400/25774210/111bdb2c-3283-11e7-9d9f-b54896056736.png)

#### 4. Refresh the Web Browser

When you refresh the your Web Browser you will see
that the "_initial state_" is now **9**:

![image](https://cloud.githubusercontent.com/assets/194400/25774222/61cc2cac-3283-11e7-8a72-31bc8fd541f4.png)

#### 5. Let's Read Through & Break Down the Code in the Example

You _may_ have taken the time to read through the code in step 3 (_above_).
Our _hope_ is that the functions are clear and well-commented,
please inform us if anything is unclear: <br />
[github.com/dwyl/**learn-elm-architecture**-in-plain-javascript/**issues**](https://github.com/dwyl/learn-elm-architecture-in-plain-javascript/issues)

```html
<body>
  <div id="app"></div>
<script>
// Mount Function receives all the elements and mounts the app
function mount(muv, root) {          // state is encapsulated by mount function
  var update = muv.update;           // make local copies of the init parameters
  var state = muv.model;             // initial state
  var view = muv.view;               // view is what renders the UI in Browser

  function signal(action) {          // signal function takes action
    return function callback() {     // and returns callback
      state = update(state, action); // update state according to action
      view(signal, state, root);     // subsequent re-rendering
    };
  };
  view(signal, state, root);         // render initial state (once)
}
// Define the Component's Actions:
var Inc = 'inc';                     // increment the counter
var Dec = 'dec';                     // decrement the counter

function update(model, action) {     // Update function takes the current state
  switch(action) {                   // and an action (String) runs a switch
    case Inc: return model + 1;      // add 1 to the model
    case Dec: return model - 1;      // subtract 1 from model
    default: return model;           // if no action, return curent state.
  }                                  // (default action always returns current)
}
// empty the contents of a given DOM element "node" (before re-rendering)
function empty(node) {
  while (node.firstChild) {
      node.removeChild(node.firstChild);
  }
} // Inspired by: stackoverflow.com/a/3955238/1148249

function button(text, signal, action) {
  var button = document.createElement('button');
  var text = document.createTextNode(text);    // human-readable button text
  button.appendChild(text);                    // text goes *inside* not attrib
  button.className = action;                   // use action as CSS class
  button.onclick = signal(action);             // onclick tells how to process
  return button;                               // return the DOM node(s)
} // how to create a button in JavaScript: stackoverflow.com/a/8650996/1148249

function view(signal, model, root) {
  empty(root);                                 // clear root element before
  return [                                     // Store DOM nodes in an array
    button('+', signal, Inc),                  // then iterate to append them
    document.createTextNode(model),            // avoids repetition.
    button('-', signal, Dec)
  ].forEach(function(el){ root.appendChild(el) }); // forEach is ES5 so IE9+
} // yes, for loop is "faster" than forEach, but readability trumps "perf" here!
// Initialise the app by "mounting" it passing in MUV Object and "root" DOM node
 mount({model: 0, update, view}, document.getElementById('app'));
</script>
</body>
```
once you've had a chance to read through the functions and comments,
let's move on to the _second_ example, where we are going to _test_ the counter!


#### 6. Install "Live Server" for "_Live Reloading_"

Live Reloading helps you iterate/work faster because you don't have to <br />
_manually_ refresh the page each time, simply run the following command:

```
npm install && npm start
```
This will download the dependency on `live-server`
which will auto-open your `default` browser:

![elm-arch-live-server](https://cloud.githubusercontent.com/assets/194400/25774279/569848d8-3284-11e7-9861-b401e13a89e0.png)

e.g: http://127.0.0.1:8000/examples/01-counter-basic.html

#### 7. Let's Write Some _Tests_!

Let's start by opening the `/examples/counter-basic-test`
file in your web browser: <br />
http://127.0.0.1:8000/examples/counter-basic-test/?coverage

Testing the `update` function is _very_ easy:

```js

```


<br /> <br />

## Futher/Background Reading

+ What does it mean when something is "_easy to **reason about**_"?  
http://stackoverflow.com/questions/18666821/what-does-the-term-reason-about-mean-in-computer-science
+ Elm Architecture with JQuery by @steos:
https://medium.com/javascript-inside/elm-architecture-with-jquery-152cb98a62f


<br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br /><br /> <br />
# tl;dr


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
and focus on core skills that _already_ work everywhere! <br />
b) you don't need to waste time installing
[_**Two Hundred Megabytes**_](https://cloud.githubusercontent.com/assets/194400/13321493/39fcfa30-dbc7-11e5-8b05-f046675f9cb6.png)
of dependencies just to run a simple project! <br />
c) You ***save time*** (_for yourself, your team and end-users!_)
because your code is _already_ optimized to run in _any_ browser!
