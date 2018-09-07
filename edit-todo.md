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
+ [ ] Set the `item.id` as the `id` of the **`<input class="edit">`**
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
http://todomvc.com/examples/vanillajs <br />
we can see that _two_ things change in the DOM when in "**editing _mode_**":

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
  1.1. Receiving the `singal('EDIT', item.id)` _activates_ "**editing _mode_**".
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

#### 5.2 `render_item` "Edit Mode" _Test_

For the above modifications (_requirements_) we can write a _single_ test
with four assertions. Append the following code to `test/todo-app.test.js`:

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

#### 5.2 `render_item` "Edit Mode" _Implementation_

Given that there are 4 assertions that need to pass
and we know there are 3 changes that need to be made
to the `render_item` function,
rather than leaving you (_the reader_) wondering "_where do I start?!_",
here is the code that makes the tests pass:

_Before_:
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

_After_:
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

3. Append the **`<input class="edit">`**
to the `<li>` if in "**editing _mode_**":

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
We are not "fans" of having "empty" elements in the DOM, it's "sloppy". <br />
Hence the `concat()` approach which results in "clean" DOM.

At this point our test assertions all pass:
```sh
node test/todo-app.test.js
```

![render_item-tests-pass](https://user-images.githubusercontent.com/194400/45167506-2c1af900-b1f1-11e8-9898-af46f979fdbd.png)

But we are building a _visual_ application and are not _seeing_ anything ...

#### _Visualise_ Editing Mode?

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
In your browser, vist: http://127.0.0.1:8000/examples/todo-list/ <br />
You should see that the _third_ todo list item is in "**editing _mode_**":

![elm-todomvc-editing-item](https://user-images.githubusercontent.com/194400/45180706-0eab5680-b214-11e8-9dcf-a8c4476e4b11.png)

Nothing will happen (_yet_) if you attempt to "save" any changes.
Let's work on the `case` (_handler_) for **`signal('EDIT', item.id)`**
which will handle the "double-click" event and set `model.editing`.


### 5.2 Double-Click item `<label>` to Edit

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

#### _How_ do we Track Double-Clicking?

When we don't know how to do something, a good place to start is to search
for the keywords we want, e.g: "JavaScript detect double-click event"
for which the top result is the following StackOverflow Q/A:
https://stackoverflow.com/questions/5497073/how-to-differentiate-single-click-event-and-double-click-event

Reading though all the answers, we determine that the most relevant (_to us_)
is: https://stackoverflow.com/a/16033129/1148249 (_which uses "vanilla" JS_):

[![stackoverflow-double-click-example](https://user-images.githubusercontent.com/194400/45124122-14942f80-b161-11e8-94c0-f54f2352bdd5.png)](https://stackoverflow.com/a/16033129/1148249)

>_**Note**: when you find a StackOverflow question/answer **helpful,
upvote** to show your appreciation!_

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
our _first_ step when adding the `case` expression
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


### 5.3 `'SAVE'` a Revised Todo Item Title after Editing it





### 5.3 `'SAVE' update case` _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.3 [ENTER] Key in edit mode triggers SAVE action', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 1 // edit the 3rd todo list item (which has id == 2)
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // change the
  const updated_title = "Do things that don\'t scale!  "
  // apply the updated_title to the <input class="edit">:
  document.querySelectorAll('.edit')[0].value = updated_title;
  // trigger the [Enter] keyboard key to ADD the new todo:
  document.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 13}));
  // confirm that the todo item title was updated to the updated_title:
  const label = document.querySelectorAll('.view > label')[1].textContent;
  t.equal(label, updated_title.trim(),
      "item title updated to:" + updated_title + ' (trimmed)');
  t.end();
});
```
If you attempt to run this test: `node test/todo-app.test.js`
you will see output similar to the following:

![save-edit-test-fails](https://user-images.githubusercontent.com/194400/45187886-2c83b600-b22a-11e8-8782-6d3fcaa240df.png)


### 5.3 `'SAVE' update case` _Implementation_

The _first_ step in the implementation is to create the `'SAVE'` case
in `update` function:

```js
case 'SAVE':
  var edit = document.getElementsByClassName('edit')[0];
  var value = edit.value;
  var id = parseInt(edit.id, 10);
  // End Editing
  new_model.clicked = false;
  new_model.editing = false;

  if (!value || value.length === 0) { // delete item if title is blank:
    return update('DELETE', new_model, id);
  }
  // update the value of the item.title that has been edited:
  new_model.todos = new_model.todos.map(function (item) {
    if (item.id === id && value && value.length > 0) {
      item.title = value.trim();
    }
    return item; // return all todo items.
  });
  break;
```

The _second_ step is _triggering_ this `case` in the `subscriptions`
event listener for `keyup`:

_Before_:

```js
document.addEventListener('keyup', function handler (e) {
  switch(e.keyCode) {
    case ENTER_KEY:
      var new_todo = document.getElementById('new-todo');
      if(new_todo.value.length > 0) {
        signal('ADD')(); // invoke singal inner callback
        new_todo.value = ''; // reset <input> so we can add another todo
        document.getElementById('new-todo').focus();
      }
      break;
  }
});
```


_After_:

```js
document.addEventListener('keyup', function handler (e) {
  switch(e.keyCode) {
    case ENTER_KEY:
      var editing = document.getElementsByClassName('editing');
      if (editing && editing.length > 0) {
        signal('SAVE')(); // invoke singal inner callback
      }

      var new_todo = document.getElementById('new-todo');
      if(new_todo.value.length > 0) {
        signal('ADD')(); // invoke singal inner callback
        new_todo.value = ''; // reset <input> so we can add another todo
        document.getElementById('new-todo').focus();
      }
      break;
  }
});
```

When you run the tests: `node test/todo-app.test.js`
they should now _pass_:
![save-update-test-pass](https://user-images.githubusercontent.com/194400/45188350-d879d100-b22b-11e8-8669-94e080a25ef7.png)


### 5.4 `'SAVE'` a _Blank_ item.title _deletes_ the item _Test_

Our mini-mission is to make the following TodoMVC test assertion _pass_:

```
✓ should remove the item if an empty text string was entered (1033ms)
```

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.4 SAVE should remove the item if an empty text string was entered',
  function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 1 // edit the 3rd todo list item (which has id == 2)
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view').length, 2, 'todo count: 2');
  // apply empty string to the <input class="edit">:
  document.querySelectorAll('.edit')[0].value = '';
  // trigger the [Enter] keyboard key to ADD the new todo:
  document.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 13}));
  // confirm that the todo item was removed!
  t.equal(document.querySelectorAll('.view').length, 1, 'todo count: 1');
  t.end();
});
```
If you attempt to run this test: `node test/todo-app.test.js`
you will see output similar to the following:

![save-blank-title-test-failing](https://user-images.githubusercontent.com/194400/45188593-e4b25e00-b22c-11e8-9623-26c8b017e9b1.png)

### 5.4 `'SAVE'` a _Blank_ item.title _deletes_ the item _Implementation_

To make this test pass we just need to add a couple of lines to the
`'SAVE'` case in the `update` function:

```js
if (!value || value.length === 0) { // delete item if title is blank:
  return update('DELETE', new_model, id);
}
```

when you _re-run_ the tests, they will _pass_:

![save-blank-title-test-pass](https://user-images.githubusercontent.com/194400/45188666-41ae1400-b22d-11e8-8154-176b5aaaea42.png)

### 5.5 `'CANCEL'` edit on [esc] Key Press

When a user presses the [esc] ("escape") key, editing should be "cancelled"
without saving the changes:

```
✓ should cancel edits on escape
```

#### 5.5 `'CANCEL'` edit on [esc] _Test_


Append following test code to your `test/todo-app.test.js` file:

```js
test.only('5.5 CANCEL should cancel edits on escape', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/', // the "route" to display
    editing: 1 // edit the 3rd todo list item (which has id == 2)
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view > label')[1].value,
    model.todos[1].title, 'todo id 1 has title: ' + model.todos[1].title);
  // apply empty string to the <input class="edit">:
  document.querySelectorAll('.edit')[0].value = 'Hello World';
  // trigger the [esc] keyboard key to CANCEL editing
  document.dispatchEvent(new KeyboardEvent('keyup', {'keyCode': 27}));
  // confirm the item.title is still the original title:
  t.equal(document.querySelectorAll('.view > label')[1].value,
      model.todos[1].title, 'todo id 1 has title: ' + model.todos[1].title);
  t.end();
});
```
If you attempt to run this test: `node test/todo-app.test.js`
it should fail.

### 5.5 `'CANCEL'` edit on [esc] _Implementation_

To make this test pass we _first_ need to add a `'CANCEL'`
`case` to the `update` function:

```js
case 'CANCEL':
  new_model.clicked = false;
  new_model.editing = false;
  break;
```
_Second_ we need to _trigger_ the `'CANCEL'` action
when the `[esc]` key is pressed, so we need to add a `case`
to the `switch(e.keyCode) {` in the subscriptions event listener:

_Before_:

```js
document.addEventListener('keyup', function handler (e) {
switch(e.keyCode) {
  case ENTER_KEY:
    var editing = document.getElementsByClassName('editing');
    if (editing && editing.length > 0) {
      signal('SAVE')(); // invoke singal inner callback
    }

    var new_todo = document.getElementById('new-todo');
    if(new_todo.value.length > 0) {
      signal('ADD')(); // invoke singal inner callback
      new_todo.value = ''; // reset <input> so we can add another todo
      document.getElementById('new-todo').focus();
    }
    break;
}
});
```


_After_:

```js
document.addEventListener('keyup', function handler (e) {
  console.log('e.keyCode:', e.keyCode, '| key:', e.key);

  switch(e.keyCode) {
    case ENTER_KEY:
      var editing = document.getElementsByClassName('editing');
      if (editing && editing.length > 0) {
        signal('SAVE')(); // invoke singal inner callback
      }

      var new_todo = document.getElementById('new-todo');
      if(new_todo.value.length > 0) {
        signal('ADD')(); // invoke singal inner callback
        new_todo.value = ''; // reset <input> so we can add another todo
        document.getElementById('new-todo').focus();
      }
      break;
    case ESCAPE_KEY:
      signal('CANCEL')();
      break;
  }
});
```

when you re-run the tests, they will pass:
![cancel-editing-on-esc-keypress-test-passing](https://user-images.githubusercontent.com/194400/45189286-15e05d80-b230-11e8-938c-4df80e49fda9.png)

### 6. Counter

```
✓ should display the current number of todo items
```

#### 6. Counter _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('6. Counter > should display the current number of todo items',
  function (t) {
  elmish.empty(document.getElementById(id));
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: false },
      { id: 2, title: "Let's solve our own problem", done: false }
    ],
    hash: '#/'
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // count:
  const count = parseInt(document.getElementById('count').textContent, 10);
  t.equal(count, model.todos.length, "displays todo item count: " + count);

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('todos-elmish_' + id);
  t.end();
});
```

Thankfully, the counter was already implemented above
so this test **_already_ passes**:

![counter-test-passing](https://user-images.githubusercontent.com/194400/45190621-ca7d7d80-b236-11e8-92b3-5a4fbda6f12a.png)

Just keep on [_movin_'](https://youtu.be/uvRBUw_Ls2o)


### 7. Clear Completed Button

When items are complete we should be able to `delete` them in bulk.

```
✓ should display the number of completed items
✓ should remove completed items when clicked
✓ should be hidden when there are no items that are completed
```

#### 7. Clear Completed Button _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('7. Clear Completed > should display the number of completed items',
  function (t) {
  elmish.empty(document.getElementById(id));
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: true },
      { id: 2, title: "Let's solve our own problem", done: true }
    ],
    hash: '#/'
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // count todo items in DOM:
  t.equal(document.querySelectorAll('.view').length, 3,
    "at the start, there are 3 todo items in the DOM.");

  // count completed items
  const completed_count =
    parseInt(document.getElementById('completed-count').textContent, 10);
  const done_count = model.todos.filter(function(i) {return i.done }).length;
  t.equal(completed_count, done_count,
    "displays completed items count: " + completed_count);

  // clear completed items:
  const button = document.querySelectorAll('.clear-completed')[0];
  button.click();

  // confirm that there is now only ONE todo list item in the DOM:
  t.equal(document.querySelectorAll('.view').length, 1,
    "after clearing completed items, there is only 1 todo item in the DOM.");

  // no clear completed button in the DOM when there are no "done" todo items:
  t.equal(document.querySelectorAll('clear-completed').length, 0,
    'no clear-completed button when there are no done items.')

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('todos-elmish_' + id);
  t.end();
});
```

#### 7. Clear Completed Button _Implementation_

First we need to update the `button` section in the `render_footer` function
to include the `done` count:

_Before:_

```js
button(["class=clear-completed", "style=display:" + display_clear],
  [
    text("Clear completed")
  ]
)
```

_After:_

```js
button(["class=clear-completed", "style=display:" + display_clear,
  signal('CLEAR_COMPLETED')
  ],
  [
    text("Clear completed ["),
    span(["id=completed-count"], [
      text(done)
    ]),
    text("]")
  ]
)
```

_Seconde_ we need to add a `'CLEAR_COMPLETED'` `case` to the `update` function:

```js
case 'CLEAR_COMPLETED':
  new_model.todos = new_model.todos.filter(function (item) {
    return !item.done; // only return items which are item.done = false
  });
  break;
```

The tests should pass:

![clear-completed-button-tests-passing](https://user-images.githubusercontent.com/194400/45191359-a58b0980-b23a-11e8-91bf-dcb016d6f4bb.png)

<br />

### 8. Persistence > Save Todo List items to `localStorage`

```
✓ should persist its data
```

#### 8. Persistence _Test_

We have already covered saving the `model`
to `localStorage` in _detail_ (_above_),
we are adding a "proxy" test for completeness:

```js
test.only('8. Persistence > should persist its data', function (t) {
  elmish.empty(document.getElementById(id));
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false }
    ],
    hash: '#/'
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // confirm that the model is saved to localStorage
  console.log('localStorage', localStorage.getItem('todos-elmish_' + id));
  t.equal(localStorage.getItem('todos-elmish_' + id),
    JSON.stringify(model), "data is persisted to localStorage");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('todos-elmish_' + id);
  t.end();
});
```

Again, this test should _already_ pass:

![persistence-test-passing](https://user-images.githubusercontent.com/194400/45190477-0a903080-b236-11e8-991c-bab61efb3d22.png)

### 9. Routing

The following assertions:
```
✓ should allow me to display active items
✓ should allow me to display completed items
✓ should allow me to display all items
✓ should highlight the currently applied filter
```

+ `'SHOW_ALL'` the default view.
+ `'SHOW_ACTIVE'` item.done === false
+ `'SHOW_COMPLETED'` item.done === true


#### 9. Routing _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('9. Routing > should allow me to display active/completed/all items',
  function (t) {
  elmish.empty(document.getElementById(id));
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false },
      { id: 1, title: "Bootstrap for as long as you can", done: true },
      { id: 2, title: "Let's solve our own problem", done: true }
    ],
    hash: '#/active' // ONLY ACTIVE items
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view').length, 1, "one active item");
  let selected = document.querySelectorAll('.selected')[0]
  t.equal(selected.id, 'active', "active footer filter is selected");

  // empty:
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  // show COMPLTED items:
  model.hash = '#/completed';
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view').length, 2,
    "two completed items");
  selected = document.querySelectorAll('.selected')[0]
  t.equal(selected.id, 'completed', "completed footer filter is selected");

  // empty:
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('todos-elmish_' + id);
  // show ALL items:
  model.hash = '#/';
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  t.equal(document.querySelectorAll('.view').length, 3,
    "three items total");
  selected = document.querySelectorAll('.selected')[0]
  t.equal(selected.id, 'all', "all footer filter is selected");

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('todos-elmish_' + id);
  t.end();
});
```


#### 9. Routing _Implementation_

Since this is the _final_ quest in the TodoMVC/Todo List App,
the solution is _not_ included here.
Spend some time trying to make the test assertions pass.

If you get "_stuck_" consult the code in `todo-app.js`.

#### 9.1 Routing _Bonus_

As a _bonus_ level,
you can add the following event listener to your `subscriptions`
to make the router work when the url (hash) changes in the browser:

```js
window.onhashchange = function route () {
  signal('ROUTE')();
}
```
And the `'ROUTE'` `case` to your `update` function:
```js
case 'ROUTE':
  new_model.hash = (window && window.location && window.location.hash) ?
    window.location.hash : '#/';
  break;
```
