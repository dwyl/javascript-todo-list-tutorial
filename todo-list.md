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

Our _first_ step is to _analyse_ the required functionality of a Todo List.

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

_Play_ with the app by adding a few items,
checking-off and toggling the views in the footer.

> _**Note**: IMO the "**Vanilla**" **JS** implementation
is quite complex and insufficiently documented_
(_very few code comments and sparse_
[`README.md`](https://github.com/tastejs/todomvc/tree/25a9e31eb32db752d959df18e4d214295a2875e8/examples/vanillajs)),
_so don't expect to **understand** it all the first time without study._
_Don't worry, we will walk through building each feature in detail._


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
which create HTML elements e.g: `div` & `<button>`; these _can_ be generalised.

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




### `mount`

### ``












<!--

## What _Next_?

If you feel _confident_ with your "TEA" skills you can _either_:
+ **`try`** and use them to **create your _own_ App** using "TEA"
+ **Learn Elm**: https://github.com/dwyl/learn-elm
+ (Join the herd and) learn React/Redux.

-->
