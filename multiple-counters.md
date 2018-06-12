# _Multiple_ Counters Exercise!

There are (_at least_) two ways
of displaying multiple counters on the same page.

The _easy_ way is to "_instantiate_" several counters
each within their own "container" (DOM) element.

e.g:
```html
<script src="counter.js" data-cover></script> <!-- load counter once -->
<div id="app"></div>
<div id="app1"></div>
<div id="app2"></div>
<script> // Mount as many apps as you like:
 mount(0, update, view, 'app');
 mount(1, update, view, 'app1');
 mount(2, update, view, 'app2');
</script>
```

![elm-arch-multiple-counters-naive](https://user-images.githubusercontent.com/194400/41302789-5299bd5e-6e63-11e8-8006-84313c54a24c.png)



## 1. Refactor Model from `Integer` to `Object`

Using the code from
[`example/counter-reset`](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/counter-reset)
as a starting point,
refactor the `model` from `Integer` to an `Object`:
```js
mount({counters:[0]}, update, view, 'app');
```


That will "_break_" the existing tests.
