var flatten = function flatten(list) {
    return list.reduce(function (a, b) {
        return a.concat(Array.isArray(b) ? flatten(b) : b);
    }, []);
};

export function AntiQuery (selector) {
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
    return flatten(this.elements.map.call(this.elements, fn))
  },
  parents () {
    return this.each((el) => $(el.parentElement))
  },
  children () {
    return this.each((el) => el.children.map($))
  },
  find (what) {
    return this.each((el) => $(el.querySelectorAll(what)))
  },
  remove () {
    this.elements.forEach((el) => el.parentElement.removeChild(el))
  },
  addClass (className) {
    return this.each((el) => {
      el.classList.add(className)
      return $(el)
    })
  },
  removeClass (className) {
    return this.each((el) => {
      el.classList.remove(className)
      return $(el)
    })
  },
  css (css) {
    return this.each((el) => {
      if (el) Object.keys(css).forEach((prop) => {
        el.style[prop] = css[prop];        
      })
      return $(el)
    })
  },
  hide () {
    return this.css({ display: 'none' })
  },
  show () {
    return this.css({ display: null })
  },
  text (text) {
    return this.each((el) => {
      el.textContent = text
      return $(el)
    })
  },
  html (html) {
    return this.each((el) => {
      el.innerHTML = html
      return $(el)
    })
  },
  animate (animation, duration = 250) {
    return this.each((el) => {
      setTimeout(() => $(el).removeClass(animation), duration)
      return $(el).addClass(animation)
    })
  }
}

export default function $(selector) {
  return new AntiQuery(selector)
}
