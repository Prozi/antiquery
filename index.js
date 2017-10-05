export default function $(selector) {
  const divs = typeof selector === 'string' ?
    Array.prototype.slice.call(document.querySelectorAll(selector)) :
    Array.isArray(selector) ? (selector ? selector : []) : [selector]
  const wrap = (fn) => divs.forEach(fn)
  const api = {
    parents: () => divs.map((el) => el.parentElement),
    children: () => divs.map((el) => el.children),
    find: (what) => divs.map((el) => el.querySelectorAll(what)),
    remove: () => wrap((el) => el.parentElement.removeChild(el)),
    addClass: (className) => wrap((el) => el.classList.add(className)),
    removeClass: (className) => wrap((el) => el.classList.remove(className)),
    animate: (animation, duration = 250) => {
      wrap((el) => {
        api.addClass(animation)
        setTimeout(() => api.removeClass(animation), duration)
      })
    },
    hide: () => wrap((el) => { el && el.style.display = 'none'; return el }),
    show: () => wrap((el) => { el && el.style.display = null; return el }),
    each: wrap
  }
  divs.forEach((el, i) => api[i] = el)
  return api;
}
