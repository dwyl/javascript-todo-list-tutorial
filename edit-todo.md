### 5. `EDIT` an Item

Editing a Todo List item is (_by far_)
the most "advanced" functionality in the TodoMVC app
because it involves multiple steps and "dynamic UI".

Don't panic! Just because something has "more steps" than we have seen before,
doesn't mean we should be "overwhelmed" by its' complexity.
We just need to "break it down" into "bitesize chunks"!

> _**Note**: the most "**difficult**" part of implementing the "edit an item"
functionality is having a "mental picture" of the UX
so that we can write the **tests first**
and isolate the required functions (update actions) from the keyboard/mouse
interactions. i.e. breaking down the steps into distinct "units"_.


First let's review the TodoMVC "Editing" test assertions:


#### `EDIT` Item Test Titles & Acceptance Criteria

```
5. Editing
  ✓ should hide other controls when editing (718ms)
  ✓ should save edits on enter (1093ms)
  ✓ should save edits on blur (1256ms)
  ✓ should trim entered text (1163ms)
  ✓ should remove the item if an empty text string was entered (1033ms)
  ✓ should cancel edits on escape (1115ms)
```

Further reading of the TodoMVC Spec:
https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
reveals the following acceptance criteria:


+ [ ] Double-click on Item **`<label>title</label>`**
to begin editing (_that item_)
+ [ ] Render an **`<input class="edit">`**
if in "**editing _mode_**"
(_see screenshot and markup below_)
  + [ ] Add `class="editing"` to `<li>` when editing
  + [ ] Remove (_don't add_) `class="editing"` from `<li>`
  when no longer editing.
+ Set the `item.id` as the `id` of the **`<input class="edit">`**
  so that we know which item is being edited.
+ [ ] Add `case` in `keyup` Event Listener
  for **`[Enter]`** keyup (_see **`subscriptions`** above_)
  if we are in "**editing _mode_**",
  get the text value from the **`<input class="edit">`**
  _instead_ of **`<input id="new-todo">`**
  so that we _update_ the _existing_ Todo Item title (text).
+ [ ] When **`[Enter]`** is pressed while in "**editing _mode_**",
"_dispatch_" the **`SAVE`** action: `signal('SAVE')`
  + [ ] If the **`<input class="edit">`** is _blank_, `delete` the todo item.

By _inspecting_ the DOM for the VanillaJS TodoMVC example:
http://todomvc.com/examples/vanillajs
we can see that _two_ things change:

+ **`<li class="editing">`** the CSS `class="editing"` is added
to the todo list item being _edited_.
+ **`<input class="edit">`** is inserted into the DOM _inside_ the `<li>`
so the item title can be edited.

![todo-edit-html](https://user-images.githubusercontent.com/194400/43995210-f4f484e0-9da1-11e8-8cc5-09f7309db963.png)

Here is the _sample_ HTML in "**editing _mode_**"
(_copy-pasted_) from the VanillaJS TodoMVC implementation
the **`<li>`** is being edited (_as per screenshot above_):
```HTML
<ul class="todo-list">
  <li data-id="1533987109280" class="completed ">
    <div class="view">
      <input class="toggle" type="checkbox" checked="">
      <label>hello world</label>
      <button class="destroy"></button>
    </div>
  </li>
  <li data-id="1534013859716" class="editing">
    <div class="view"><input class="toggle" type="checkbox">
      <label>totes editing this todo item</label>
      <button class="destroy">
      </button>
    </div>
    <input class="edit">
  </li>
</ul>
```

From the HTML/DOM we can see that "editing" a Todo item is _deceptively_ simple
from a markup perspective, we _just_ need to know _which_ item we are editing
and render the appropriate tags/classes.

#### Three Steps to `EDIT` an Item

There are _three_ steps to Editing a Todo List item:

1. ***Trigger*** the "double-click" event listener/handler
  + Receiving the `singal('EDIT', item.id)` "activates" editing mode.
2. ***Edit*** the todo list item's `title` property
3. ***Save*** the updated item `title`: `singal('SAVE', item.id)`

For these _three_ steps there are two `update` actions: `EDIT` and `SAVE`
which will require two new `case` statements in the `update` function.

> _**Note**: there is a "fourth" step which is "**Cancelling**" an edit,
which we will cover in **section 5.5** below, but for now we are
only considering the "happy path" which results in a successful edit._



#### 5.1 `render_item` view function with "Edit Mode" `<input class="edit">`

In order to edit an item the **`render_item`** function
will require **3 modifications**:

1. Add the `signal('EDIT', item.id)` as an **`onclick` attribute** to `<label>`
so that when a `<label>` is (double-)clicked
the `model.editing` property is set by the `update` function (_see below_).
2. Apply the **`"class=editing"`** to the list item which is being edited.
3. Display the **`<input class="edit">`**
with the Todo list item title as it's **`value`** property.

##### 5.2 `render_item` "Edit Mode" _Test_

For the above modifications (_requirements_) we can write a _single_ test
with four assertions:

```js
test.only('5. Editing: > Render an item in "editing mode"', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: false },
      { id: 2, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 2 // edit the 3rd todo list item (which has id == 2)
  };

  // render the ONE todo list item in "editing mode" based on model.editing:
  document.getElementById(id).appendChild(
    app.render_item(model.todos[2], model, mock_signal),
  );
  // test that signal (in case of the test mock_signal) is onclick attribute:
  t.equal(document.querySelectorAll('.view > label')[0].onclick.toString(),
    mock_signal().toString(), "mock_signal is onclick attribute of label");

  // test that the <li class="editing"> and <input class="edit"> was rendered:
  t.equal(document.querySelectorAll('.editing').length, 1,
    "<li class='editing'> element is visible");
  t.equal(document.querySelectorAll('.edit').length, 1,
    "<input class='edit'> element is visible");
  t.equal(document.querySelectorAll('.edit')[0].value, model.todos[2].title,
    "<input class='edit'> has value: " + model.todos[2].title);
  t.end();
});
```

There is quite a lot to "unpack" here, but the main gist is that
based on the `model.editing` key being set to `2`, our `render_item` function,
will add the `editing` CSS class to the `<li>` element and render an
`<input>` with CSS class `edit`.
The TodoMVC style sheet (`todomvc-app.css`) will take care of displaying
the input correctly.

Setting the **`onclick`** attribute of the `<label>` element
to whatever is passed in as the third argument of `redner_item`
i.e. the `signal` will mean that a specific action will be dispatched/triggered
when the `<label>` element is clicked.


> **SPOILER ALERT**: If you want to _try_ to make the "Edit Mode" _Test_
assertions _pass_ without reading the "solution",
do it now before proceeding to the reading the _implementation_ section.

<br />

##### 5.2 `render_item` "Edit Mode" _Implementation_

Given that there are 4 assertions that need to pass
and we know there are 3 changes that need to be made
to the `render_item` function,
rather than leaving you (_the reader_) wondering "_where do I start?!_",
here is the code that makes the tests pass:

BEFORE:
```js
function render_item (item, model, signal) {
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : ""
    ], [
      div(["class=view"], [
        input([
          item.done ? "checked=true" : "",
          "class=toggle",
          "type=checkbox",
          typeof signal === 'function' ? signal('TOGGLE', item.id) : ''
          ],[]), // <input> does not have any nested elements
        label([], [text(item.title)]),
        button(["class=destroy",
        typeof signal === 'function' ? signal('DELETE', item.id) : ''])
      ]) // </div>
    ]) // </li>
  )
}
```

AFTER:
```js
function render_item (item, model, signal) {
  return (
    li([
      "data-id=" + item.id,
      "id=" + item.id,
      item.done ? "class=completed" : "",
      model && model.editing && model.editing === item.id ? "class=editing" : ""
    ], [
      div(["class=view"], [
        input([
          item.done ? "checked=true" : "",
          "class=toggle",
          "type=checkbox",
          typeof signal === 'function' ? signal('TOGGLE', item.id) : ''
          ], []), // <input> does not have any nested elements
        label([ typeof signal === 'function' ? signal('EDIT', item.id) : '' ],
          [text(item.title)]),
        button(["class=destroy",
          typeof signal === 'function' ? signal('DELETE', item.id) : ''])
        ]
      ), // </div>
    ].concat(model && model.editing && model.editing === item.id ? [ // editing?
      input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
    ] : [])) // </li>
  )
}
```
Let's walk through the three code changes made:

1. Adding `"class=editing"` to the `<li>` based on `model.editing`
is the simplest code modification, similar to the conditional attribute
`class=completed` on the previous line.

```js
model && model.editing && model.editing === item.id ? "class=editing" : ""
````

We include the check for `model && model.editing` because if either of these
two are `undefined` there's no need to keep checking.
Only if the `model.editing` matches the `item.id`
(_the todo list item being rendered_) do we render the **`"class=editing"`**.
Only one todo list item `title` will be edited at once,
so this will only match (_at most_) _one_ item in the `model.todos` array.

2. Setting the **`signal('EDIT', item.id)`**

_Why_ do we need the `typeof signal` (_type-checking_)...?

```js
label([ typeof signal === 'function' ? signal('EDIT', item.id) : '' ],
  [text(item.title)]),
```

Why _can't_ we just write this:

```js
label([signal('EDIT', item.id)], [text(item.title)]),
```

Given that **`signal`** is the final argument to the `render_item` function,
it is considered an _optional_ argument.
If for any reason the `render_item` function is invoked _without_ the `singal`
parameter, then attempting to _invoke_ **`signal('EDIT', item.id)`**
will result in a **`ReferenceError: signal is not defined`** which will
"crash" the app _fatally_.

If you are the _only_ person who is going to write code that will invoke
`render_item`, you don't need to "worry" about the `typeof signal`
because there is "no need" for type-checking the `signal`;
surely you won't _forget_ to invoke it with a valid `signal` ...
_however_ we _always_ approach our JavaScript code a
["***defensive programming***"](https://en.wikipedia.org/wiki/Defensive_programming)
perspective
because we _know_ from _experience_
that banking on the
["***happy path***"](https://en.wikipedia.org/wiki/Happy_path)
in JS code
is like driving without a seatbelt;
you might be "fine" most of the time, but when something "bad" happens,
you will go flying through the windscreen and have a _really_ bad day!

![dilbert-bugs](https://user-images.githubusercontent.com/194400/45164547-8f555d00-b1ea-11e8-9767-e23350c1e9a0.png)

If you want to _avoid_ having to do _manual_ "type-checking",
use **`Elm`**, it does all this for you _transparently_.

3. Append the **`<input class="edit">`** to the `<li>` if in "editing mode":

```js
].concat(model && model.editing && model.editing === item.id ? [ // editing?
  input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
] : [])) // </li>
```
The _reason_ we use `.concat` is to allow us to
_optionally_ render the element or _nothing_ then _append_ it to the
Array of child elements nested in the `<li>`.

An _alternative_ to using `.concat()` could be an empty `div` node:
```js
model && model.editing && model.editing === item.id ? // editing?
  input(["class=edit", "id=" + item.id, "value=" + item.title, "autofocus"])
  : div() // empty element.
```
This is because attempting to return anything other than a DOM element
will result in the following error:
```js
TypeError: Argument 1 of Node.appendChild does not implement interface Node
```
We are not "fans" of having "empty" elements in the DOM, it's "sloppy".
Hence the `concat()` approach which results in "clean" DOM.

At this point our test assertions all pass:
```sh
node test/todo-app.test.js
```

![render_item-tests-pass](https://user-images.githubusercontent.com/194400/45167506-2c1af900-b1f1-11e8-9898-af46f979fdbd.png)

But we are building a _visual_ application and are not _seeing_ anything ...

#### Visualise Editing Mode?

Let's take a _brief_ detour to _visualise_ the progress we have made.

Open the `examples/todo-list/index.html` file
and alter the contents of the `<script>` tag:
```html
<script>
  var model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: false },
      { id: 2, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 2 // edit the 3rd todo list item (which has id == 2)
  };
  mount(model, update, view, 'app', subscriptions);
</script>
```

Then in your terminal, start the live-server:
```sh
npm start
```
In your browser, vist: http://127.0.0.1:8000/examples/todo-list/
You should see that the _third_ todo list item is in "edit mode".
![elm-todomvc-editing-item](https://user-images.githubusercontent.com/194400/45180706-0eab5680-b214-11e8-9dcf-a8c4476e4b11.png)

Nothing will happen (_yet_) if you attempt to "save" any changes.
Let's work on the `case` (_handler_) for **`signal('EDIT', item.id)`**
which will handle the "double-click" event and set `model.editing`.


#### 5.2 Double-Click item `<label>` to Edit

The TodoMVC ***spec*** for item
https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
includes the line:

```sh
Double-clicking the <label> activates editing mode, by toggling the .editing class on its <li>
```

> _**Note**: the sample TodoMVC Browser Tests:
https://github.com/tastejs/todomvc/tree/master/tests#example-output
does **not** include a test-case for **double-clicking**.
We are going to add one below for "extra credit"._

Since Double-clicking/tapping is the _only_ way to edit a todo item,
we feel that it deserves a test.

When we don't know how to do something, a good place to start is to search
for the keywords we want, e.g: "JavaScript detect double-click event"
for which the top result is the following StackOverflow Q/A:
https://stackoverflow.com/questions/5497073/how-to-differentiate-single-click-event-and-double-click-event
Reading though all the answers, we determine that the most relevant (_to us_)
is: https://stackoverflow.com/a/16033129/1148249 (_which uses "vanilla" JS_)

[![stackoverflow-double-click-example](https://user-images.githubusercontent.com/194400/45124122-14942f80-b161-11e8-94c0-f54f2352bdd5.png)](https://stackoverflow.com/a/16033129/1148249)

>_**Note**: when you find a StackOverflow question/answer **helpful, upvote**!_

```html
<div onclick="doubleclick(this, function(){alert('single')}, function(){alert('double')})">click me</div>
<script>
  function doubleclick(el, onsingle, ondouble) {
    if (el.getAttribute("data-dblclick") == null) {
      el.setAttribute("data-dblclick", 1);
      setTimeout(function () {
        if (el.getAttribute("data-dblclick") == 1) {
          onsingle();
        }
        el.removeAttribute("data-dblclick");
      }, 300);
    } else {
      el.removeAttribute("data-dblclick");
      ondouble();
    }
  }
</script>
```
Given that we are using the Elm Architecture to manage the DOM,
we don't want a function that _alters_ the DOM.
So we are going to _borrow_ the _logic_ from this example but _simplify_ it.
Since we are not mutating the DOM by setting `data-dblclick` attributes,
we won't need to remove the attribute using a `setTimeout`,


### 5.2 `'EDIT' update case` _Test_

In keeping with our TDD approach,
our first step when adding the `case` expression
for `'EDIT'` in the `update` function is to write a _test_.

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.2 Double-click an item <label> to edit it', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  const label = document.querySelectorAll('.view > label')[1]
  // "double-click" i.e. click the <label> twice in quick succession:
  label.click();
  label.click();
  // confirm that we are now in editing mode:
  t.equal(document.querySelectorAll('.editing').length, 1,
    "<li class='editing'> element is visible");
  t.equal(document.querySelectorAll('.edit')[0].value, model.todos[1].title,
    "<input class='edit'> has value: " + model.todos[1].title);
  t.end();
});
```
If you attempt to run this test: `node test/todo-app.test.js`
you will see output similar to the following:

![edit-double-click-test-failing](https://user-images.githubusercontent.com/194400/45183202-54b7e880-b21b-11e8-84d8-7b3b50162113.png)

Let's write the code necessary to make the test assertions _pass_!
If you want to try this yourself based on the StackOverflow answer (_above_),
go for it! (_don't scroll down to the "answer" till you have tried..._)

### 5.2 `'EDIT' update case` _Implementation_

Given our "research" (_above_) of how to implement a "double-click" handler,
we can write the `'EDIT'` case as the following:

```js
case 'EDIT':
  // this code is inspired by: https://stackoverflow.com/a/16033129/1148249
  // simplified as we are not altering the DOM!
  if (new_model.clicked && new_model.clicked === data &&
    Date.now() - 300 < new_model.click_time ) { // DOUBLE-CLICK < 300ms
      new_model.editing = data;
      console.log('DOUBLE-CLICK', "item.id=", data,
      "| model.editing=", model.editing,
      "| diff Date.now() - new_model.click_time: ",
      Date.now(), "-", new_model.click_time, "=",
      Date.now() - new_model.click_time);
  }
  else { // first click
    new_model.clicked = data; // so we can check if same item clicked twice!
    new_model.click_time = Date.now(); // timer to detect double-click 300ms
    new_model.editing = false; // reset
    console.log('FIRST CLICK! data:', data);
  }
  break;
```
If you ignore/remove the `console.log` lines (_which we are using for now!_),
the code is only a few lines long:
```js
case 'EDIT':
  // this code is inspired by: https://stackoverflow.com/a/16033129/1148249
  // simplified as we are not altering the DOM!
  if (new_model.clicked && new_model.clicked === data &&
    Date.now() - 300 < new_model.click_time ) { // DOUBLE-CLICK < 300ms
      new_model.editing = data;
  }
  else { // first click
    new_model.clicked = data; // so we can check if same item clicked twice!
    new_model.click_time = Date.now(); // timer to detect double-click 300ms
    new_model.editing = false; // reset
  }
  break;
```
The main "purpose" of this code is to _detect_ if a `<label>` was clicked
twice in the space of 300 milliseconds and apply the `item.id` to
the `model.editing` property so that we know which `<li>` to render in
"editing mode".

Run the test and watch it _pass_: `node test/todo-app.test.js`
![edit-double-click-test-pass](https://user-images.githubusercontent.com/194400/45183878-3bb03700-b21d-11e8-9842-be62113bfe0a.png)

In this case the time between the two clicks was 31 milliseconds,
so they will count as a "double-click"!


If a `<label>` is clicked slowly, the `model.editing` will _not_ be set,
and we will _not_ enter "editing mode".
Let's add a quick test for the scenario
where two clicks are more than 300ms apart.

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.2.2 Slow clicks do not count as double-click > no edit!', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  const label = document.querySelectorAll('.view > label')[1]
  // "double-click" i.e. click the <label> twice in quick succession:
  label.click();
  setTimeout(function (){
    label.click();
    // confirm that we are now in editing mode:
    t.equal(document.querySelectorAll('.editing').length, 0,
      "<li class='editing'> element is NOT visible");
    t.end();
  }, 301)
});
```

There is no need to write any code to make this test pass,
this is merely an additional test to _confirm_ that our check for the
time between clicks works; clicks spaced more than 300ms will not count
as "double-click".

![edit-item-not-double-click](https://user-images.githubusercontent.com/194400/45184155-ff310b00-b21d-11e8-8f6c-ef6d699861cf.png)
