## Anti-Query

You dont need any Big-Ass-Query that weights about 50KB, this library is enough for your needs (propably)

## Whats this

this is DOM manipulation language

## Installation

install by typing `yarn add antiquery --save # or npm install antiquery --save`

## What is the usage

to use as import/export module use

```javascript
import $ from 'antiquery'
```

for older javascript use:
```javascript
const $ = require('antiquery').default

// or thanks to editions
const $ = require('antiquery/es2015').default // es5
// or
const $ = require('antiquery/source').default // es6
```

for browser download browser/index.js and then just include as script src

...

then you can use like

```javascript
$('div.golden')
  .removeClass('golden')
  .css({ background: 'black', color: 'white' })
  .text('hello')
  .animate('blink')
  .show()
```

## What is ready?

* what document.querySelector supports (a lot in current browsers)
* chaining next methods
* methods:
  * get (index: Number? or returns all)
  * each (fn: Function)
  * parents
  * children
  * find
  * remove
  * addClass (className: String)
  * removeClass (className: String)
  * css (css: Object)
  * hide
  * show
  * text (text: String)
  * html (html: String)
  * animate (className: String, ms: Number)

animate adds css class for duration of ms

## Enjoy

by Jacek Pietal (github.com/Prozi)

## License

MIT
