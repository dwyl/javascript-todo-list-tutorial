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



## 
























<!--

## What _Next_?

If you feel _confident_ with your "TEA" skills you can _either_:
+ **`try`** and use them to **create your _own_ App** using "TEA"
+ **Learn Elm**: https://github.com/dwyl/learn-elm
+ (Join the herd and) learn React/Redux.

-->
