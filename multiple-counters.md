# _Multiple_ Counters Exercise!

## 1. Refactor Model from `Integer` to `Object`

Using the code from
[`example/counter-reset`](https://github.com/dwyl/learn-elm-architecture-in-javascript/tree/master/examples/counter-reset)
as a starting point,
refactor the `model` from `Integer` to an `Object`:
```js
mount({counters:[0]}, update, view, 'app');
```


That will "_break_" the existing tests.
