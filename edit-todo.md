

#### 3. Mark all as completed

The third batch of tests involves "Toggling" all todos as "done=true":

```
3. Mark all as completed
  ✓ should allow me to mark all items as completed
  ✓ should allow me to clear the completion state of all items
  ✓ complete all checkbox should update state when items are completed
```
Luckily, given that we know how to use a _boolean_ value,
these _three_ assertions can be "solved" with _minimal_ code.
Let's create a test with these 3 assertions.

Add the following code/test to your `test/todo-app.test.js` file:
```js
test.only('3. Mark all as completed ("TOGGLE_ALL")', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Learn Elm Architecture", done: true },
      { id: 1, title: "Build Todo List App",    done: false },
      { id: 2, title: "Win the Internet!",      done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // confirm that the ONLY the first todo item is done=true:
  const items = document.querySelectorAll('.view');

  document.querySelectorAll('.toggle').forEach(function(item, index) {
    t.equal(item.checked, model.todos[index].done,
      "Todo #" + index + " is done=" + item.checked
      + " text: " + items[index].textContent)
  })

  // click the toggle-all checkbox to trigger TOGGLE_ALL: >> true
  document.getElementById('toggle-all').click(); // click toggle-all checkbox
  document.querySelectorAll('.toggle').forEach(function(item, index) {
    t.equal(item.checked, true,
      "TOGGLE each Todo #" + index + " is done=" + item.checked
      + " text: " + items[index].textContent)
  });
  t.equal(document.getElementById('toggle-all').checked, true,
    "should allow me to mark all items as completed")


  // click the toggle-all checkbox to TOGGLE_ALL (again!) true >> false
  document.getElementById('toggle-all').click(); // click toggle-all checkbox
  document.querySelectorAll('.toggle').forEach(function(item, index) {
    t.equal(item.checked, false,
      "TOGGLE_ALL Todo #" + index + " is done=" + item.checked
      + " text: " + items[index].textContent)
  })
  t.equal(document.getElementById('toggle-all').checked, false,
    "should allow me to clear the completion state of all items")

  // *manually* "click" each todo item:
  document.querySelectorAll('.toggle').forEach(function(item, index) {
    item.click(); // this should "toggle" the todo checkbox to done=true
    t.equal(item.checked, true,
      ".toggle.click() (each) Todo #" + index + " which is done=" + item.checked
      + " text: " + items[index].textContent)
  });
  // the toggle-all checkbox should be "checked" as all todos are done=true!
  t.equal(document.getElementById('toggle-all').checked, true,
    "complete all checkbox should update state when items are completed")

  elmish.empty(document.getElementById(id)); // clear DOM ready for next test
  localStorage.removeItem('elmish_store');
  t.end();
});
```

If you attempt to run the test file:
```sh
node test/todo-app.test.js
```
You will see something like this:

![toggle-all-test-failing](https://user-images.githubusercontent.com/194400/43985804-3c8dbe02-9d02-11e8-9876-cd7e35602754.png)

While there may _appear_ to be "_many_" assertions in this test,
in reality there are only two bits of functionality.

_Firstly_, we need a new `case`
in the `update` `switch` statement: `TOGGLE_ALL`. <br />
and _second_ we need to add a couple of lines to our `TOGGLE`
block to _check_ if _all_ todos are `done=true` or `done=false`.
In the case where _all_ todos are `done=true` we should reflect
this in the "state" of the `toggle-all` checkbox.
The _easiest_ way of representing this in the `model` is
with a new property, e.g: `model.all_done=true`
when _all_ todos are `done=true`.

The only other thing we need to update is the `render_main`
function to include `signal('TOGGLE_ALL')` in the attributes array.

Try and make this test pass by yourself before consulting the
sample code:
[**`examples/todo-list/todo-app.js`**](https://github.com/dwyl/learn-elm-architecture-in-javascript/pull/45/files#diff-6be3e16fe7cfb4c00788d4d587374afdR46)


### 4. Item (Toggle, Edit & Delete)

```
4. Item
  ✓ should allow me to mark items as complete (843ms)
  ✓ should allow me to un-mark items as complete (978ms)
  ✓ should allow me to edit an item (1155ms)
  ✓ should show the remove button on hover
```

Of these requirements, we already have the first two "_covered_"
because we implemented the `TOGGLE` feature (_above_).

We can add another "proxy" test just for "_completeness_":

```js
test.only('4. Item: should allow me to mark items as complete', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  const item = document.getElementById('0')
  t.equal(item.textContent, model.todos[0].title, 'Item contained in model.');
  // confirm that the todo item is NOT done (done=false):
  t.equal(document.querySelectorAll('.toggle')[0].checked, false,
  'Item starts out "active" (done=false)');


  // click the checkbox to toggle it to done=true
  document.querySelectorAll('.toggle')[0].click()
  t.equal(document.querySelectorAll('.toggle')[0].checked, true,
  'Item should allow me to mark items as complete');

  // click the checkbox to toggle it to done=false "undo"
  document.querySelectorAll('.toggle')[0].click()
  t.equal(document.querySelectorAll('.toggle')[0].checked, false,
  'Item should allow me to un-mark items as complete');
  t.end();
});
```
You should not need to write any additional code
in order to make this test pass; just run it and move on.

![toggle-todo-tests-passing](https://user-images.githubusercontent.com/194400/43992979-a4d00ab6-9d7e-11e8-891b-9f699f474dd5.png)



#### 4.1 `DELETE` an Item

```
should show the remove button on hover
```

##### Acceptance Criteria

+ [ ] should show the `<button class="destroy">`
on hover (over the item) ... thankfully the TodoMVC CSS
handles this for us, we just need our `view`
to render the `<button>`
+ [ ] Clicking/tapping the `<button class="destroy">`
sends the `signal('DELETE', todo.id, model)`
+ [ ] The `DELETE` update case receives the `todo.id`
and removes it from the `model.todos` Array.


##### `DELETE` Item _Test_

Append following test code to your `test/todo-app.test.js` file:

```js
test.only('4.1 DELETE item by clicking <button class="destroy">', function (t) {
  elmish.empty(document.getElementById(id));
  localStorage.removeItem('elmish_' + id);
  const model = {
    todos: [
      { id: 0, title: "Make something people want.", done: false }
    ],
    hash: '#/' // the "route" to display
  };
  // render the view and append it to the DOM inside the `test-app` node:
  elmish.mount(model, app.update, app.view, id, app.subscriptions);
  // const todo_count = ;
  t.equal(document.querySelectorAll('.destroy').length, 1, "one destroy button")

  const item = document.getElementById('0')
  t.equal(item.textContent, model.todos[0].title, 'Item contained in DOM.');
  // DELETE the item by clicking on the <button class="destroy">:
  const button = item.querySelectorAll('button.destroy')[0];
  button.click()
  // confirm that there is no loger a <button class="destroy">
  t.equal(document.querySelectorAll('button.destroy').length, 0,
    'there is no loger a <button class="destroy"> as the only item was DELETEd')
  t.equal(document.getElementById('0'), null, 'todo item successfully DELETEd');
  t.end();
});
```

If you run the tests `node test/todo-app.test.js`
you should now see:
![delete-test-one-assertion-failing](https://user-images.githubusercontent.com/194400/44953479-21313300-ae96-11e8-971a-51757702bacc.png)

The first two assertions are _optional_ and _should_ (_always_)
pass given that they rely on functionality defined previously.
The second two will only pass once you _make_ them pass!

##### `DELETE` Item _Implementation_

The _first_ step is to add an invocation of `signal('DELETE' ...)`
to the `render_item` view rendering function. _Specifically_ the
`button` line:

```js
button(["class=destroy"])
```
Add the `signal` function invocation:
```js
button(["class=destroy", signal('DELETE', item.id)])
```

simply adding this function invocation as an Array element will set it
as an `onclick` attribute for the `<button>`
therefore when the _user_ clicks the button it will
"trigger" the `signal` function with the appropriate arguments.
There is no "magic" just code we tested/wrote earlier.


_Second_ we need to add a `case` statement
to the `update` function.
You should attempt to "solve" this yourself.
There is no "right" answer, there are at least
5 ways of solving this, as always, you should write the code
that you feel is most _readable_.

If you get "_stuck_" or want to confirm your understanding
of the implementation of the `DELETE` functionality,
check the code in `todo-app.js` > `update` function.


> Rather bizarrely the edit functionality is mentioned
_both_ in the Item and Editing sections.
So we will cover it in the Editing section next.

```
should allow me to edit an item
```

This is kinda _meaningless_ as an assertion.
What does "edit an item" actually _mean_?
(_we have expanded the acceptance criteria below..._)


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


#### 5.1 Double-Click to Edit

The TodoMVC ***spec*** for item
https://github.com/tastejs/todomvc/blob/master/app-spec.md#item
includes the line:

```sh
Double-clicking the <label> activates editing mode, by toggling the .editing class on its <li>
```

> _**Note**: the sample TodoMVC Browser Tests:
https://github.com/tastejs/todomvc/tree/master/tests#example-output
does **not** include a test-case for **double-clicking**_

Since Double-clicking/tapping is the _only_ way to edit a todo item,
we feel that it deserves a test.

When we don't know how to do something, a good place to start is to search
for the keywords we want, e.g: "JavaScript detect double-click event"
for which the top result is the following StackOverflow Q/A:
https://stackoverflow.com/questions/5497073/how-to-differentiate-single-click-event-and-double-click-event
Reading though all the answers, we determine that the most relevant (_to us_)
is: https://stackoverflow.com/a/16033129/1148249 (_which uses "vanilla" JS_)

![stackoverflow-double-click-example](https://user-images.githubusercontent.com/194400/45124122-14942f80-b161-11e8-94c0-f54f2352bdd5.png)

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
So we are going to _borrow_ the _logic_ from this example but simplify it.






#### 5.2 `render_item` view function with Edit controls

The `render_item` function will require 3 changes:
1. Add the `"class=editing"` to the list item which is being edited.
2. Add the `signal('EDIT', item.id)` as an `onclick` attribute to `<label>`
3. Display the **`<input class="edit">`** with the

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
