export class AntiQuery {
  constructor (selector) {
    this.elements = typeof selector === 'string' ?
      Array.prototype.slice.call(document.querySelectorAll(selector)) :
      Array.isArray(selector) ? (selector ? selector : []) : [selector]
  },
  get (index) {
    if (typeof index !== 'undefined') return this.elements[index]
    return this.elements
  }
  each (fn) {
    return this.elements.map.apply(this, fn)
  }
  parents () {
    return this.each((el) => $(el.parentElement))
  },
  children () {
    return this.each((el) => el.children.map($))
  },
  find (what) {
    return this.each((el) => $(what)),
  }
  remove () {
    this.elements.forEach((el) => el.parentElement.removeChild(el))
  },
  addClass (className) {
    return this.each((el) => {
      if (el) el.classList.add(className); return $(el)
    }),
  }
  removeClass (className) {
    return this.each((el) => {
      if (el) el.classList.remove(className); return $(el)
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
      if (el) el.textContent = text; return $(el)
    })
  },
  html (html) {
    return this.each((el) => {
      if (el) el.innerHTML = html; return $(el)
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
