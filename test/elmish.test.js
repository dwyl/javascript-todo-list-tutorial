const test = require('tape'); // see: https://github.com/dwyl/learn-tape
const fs = require('fs');
const path = require('path');
const { JSDOM } = require("jsdom"); // https://github.com/jsdom/jsdom

// const html = fs.readFileSync(path.resolve(__dirname,
//   '../examples/counter-reset/index.html'));
// const DOM = new JSDOM(html); // create DOM based on HTML
// const id = 'test-app';
// const document = DOM.window.document; // shortcut to JSDOM document
// const counter = require(path.resolve(__dirname,
//   '../examples/counter-reset/counter.js'));
// const { view, mount, update, div, button, empty, init} = counter;
// init(document); // pass the JSDOM into counter.js

// test('Mount app expect state to be Zero', function (t) {
//   mount(0, update, view, id);
//   var actual = document.getElementById(id).textContent;
//   var actual_stripped = parseInt(actual.replace('+', '').replace('-Reset', ''), 10);
//   var expected = 0;
//   t.equal(expected, actual_stripped, "Inital state set to 0.");
//   t.end()
// });
//
// test('Test Update update(0) returns 0 (current state)', function (t) {
//   var result = update(0);
//   t.equal(result, 0, "Initial state: 0, No Action, Final state: 0");
//   t.end();
// });
