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

`Elm`(_ish_)
[`elmish.md`](https://github.com/dwyl/learn-elm-architecture-in-javascript/blob/master/elmish.md)


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


### Create Files

In your editor/terminal create the following files:

+ `test/todo-app.test.js`
+ `examples/todo-list/todo-app.js`

These file names should be self-explanatory, but if unclear,
`todo-app.test.js` is where we will write the tests for our
Todo List App.
`todo-app.js` is where all the JSDOCs and functions
for our Todo List App will be written.

### Test Setup

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

The `model` for our Todo List App is remarkably simple.
All we need is an `Object` containing two keys:

```js
{
  todos: [
    { id: 1, title: "Learn Elm Architecture", completed: true },
    { id: 2, title: "Build Todo List App",    completed: false },
    { id: 3, title: "Win the Internet!",      completed, false }
  ],
  hash: '#/active' // the "route" to display
}
```

#### What about `metadata` ?

Rather than storing "metadata"
(_e.g: the count of active and completed Todo items_)
we will "compute" (derive) what we _need_ at "runtime",
this may "waste" a few CPU cycles, but that's "OK"!
Even on an _ancient_ Android device
this will only take a milisecond to compute



<!--

## What _Next_?

If you feel _confident_ with your "TEA" skills you can _either_:
+ **`try`** and use them to **create your _own_ App** using "TEA"
e.g: https://github.com/nelsonic/time-mvp
+ Move on and **Learn Elm**: https://github.com/dwyl/learn-elm
+ (Join the herd and) Learn & use React/Redux.

-->
