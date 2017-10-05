exports.default = function $(selector) {
  const divs = typeof selector === 'string' ?
    Array.prototype.slice.call(document.querySelectorAll(selector)) :
    Array.isArray(selector) ? (selector ? selector : []) : [selector]
  const api = {
    parents: () => divs.map((el) => el.parentElement),
    children: () => divs.map((el) => el.children),
    find: (what) => divs.map((el) => el.querySelectorAll(what)),
    remove: () => divs.forEach((el) => el.parentElement.removeChild(el)),
    addClass: (className) => divs.map((el) => { if (el) el.classList.add(className); return el }),
    removeClass: (className) => divs.map((el) => { if (el) el.classList.remove(className); return el }),
    animate: (animation, duration = 250) => {
      wrap((el) => {
        api.addClass(animation)
        setTimeout(() => api.removeClass(animation), duration)
      })
    },
    hide: () => divs.map((el) => { if (el) el.style.display = 'none'; return el }),
    show: () => divs.map((el) => { if (el) el.style.display = null; return el }),
    each: (fn) => divs.forEach(fn)
  }
  divs.forEach((el, i) => api[i] = el)
  return api;
}
