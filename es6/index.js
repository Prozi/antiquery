const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
);

class AntiQuery {
  constructor (selector) {
    if (selector instanceof AntiQuery) {
      return selector
    }
    this.elements = typeof selector === 'string' ?
      Array.prototype.slice.call(document.querySelectorAll(selector)) :
      Array.isArray(selector) ? selector : (selector ? [selector] : [])
  }
  get (index) {
    if (!isNaN(index) && isFinite(index)) return this.elements[index]
    return this.elements
  }
  each (fn) {
    this.elements.forEach.call(this.elements, fn)
    return this
  }
  parents () {
    return $(this.elements.map((el) => el.parentElement))
  }
  children () {
    return $(flatten(this.elements.map((el) => el.children)))
  }
  find (what) {
    return $(flatten(this.elements.map((el) => el.querySelectorAll(what))))
  }
  remove () {
    this.elements.forEach((el) => el.parentElement.removeChild(el))
  }
  addClass (className) {
    return this.each((el) => el.classList.add(className))
  }
  removeClass (className) {
    return this.each((el) => el.classList.remove(className))
  }
  css (css) {
    return this.each((el) => Object.keys(css).forEach((prop) => {
      el.style[prop] = css[prop]
    }))
  }
  hide () {
    return this.css({ display: 'none' })
  }
  show () {
    return this.css({ display: null })
  }
  text (text) {
    return this.each((el) => {
      el.textContent = text
    })
  }
  html (html) {
    return this.each((el) => {
      el.innerHTML = html
    })
  }
  animate (animation, duration = 250) {
    this.each((el) => setTimeout(() => $(el).removeClass(animation), duration))
    return this.addClass(animation)
  }
}

function $(selector) {
  return new AntiQuery(selector)
}

module.exports.AntiQuery = AntiQuery
module.exports.default = $
module.exports.flattenArray = flatten
