(function (document, window) {
  'use strict'

  var flatten = function flatten(list) {
      return list.reduce(function (a, b) {
          return a.concat(Array.isArray(b) ? flatten(b) : b);
      }, []);
  };

  function AntiQuery (selector) {
    if (selector instanceof AntiQuery) {
      return selector
    }
    this.elements = typeof selector === 'string' ?
      Array.prototype.slice.call(document.querySelectorAll(selector)) :
      Array.isArray(selector) ? selector : (selector ? [selector] : [])
  }

  AntiQuery.prototype = {
    get (index) {
      if (!isNaN(index) && isFinite(index)) return this.elements[index]
      return this.elements
    },
    each (fn) {
      this.elements.forEach.call(this.elements, fn)
      return this
    },
    parents () {
      return $(this.elements.map(function (el) { return el.parentElement }))
    },
    children () {
      return $(flatten(this.elements.map(function (el) { return el.children })))
    },
    find (what) {
      return $(flatten(this.elements.map(function (el) { return el.querySelectorAll(what) })))
    },
    remove () {
      this.elements.forEach(function (el) { el.parentElement.removeChild(el) })
    },
    addClass (className) {
      return this.each(function (el) { el.classList.add(className) })
    },
    removeClass (className) {
      return this.each(function (el) { el.classList.remove(className) })
    },
    css (css) {
      return this.each(function (el) {
        Object.keys(css).forEach(function (prop) {
          el.style[prop] = css[prop]
        })
      })
    },
    hide () {
      return this.css({ display: 'none' })
    },
    show () {
      return this.css({ display: null })
    },
    text (text) {
      return this.each(function (el) {
        el.textContent = text
      })
    },
    html (html) {
      return this.each(function (el) {
        el.innerHTML = html
      })
    },
    animate (animation, duration = 250) {
      this.each(function (el) { 
        setTimeout(function () {
          $(el).removeClass(animation)
        }, duration)
      })
      return this.addClass(animation)
    }
  }

  window.$ = function $(selector) {
    return new AntiQuery(selector)
  }
})(document, window)
