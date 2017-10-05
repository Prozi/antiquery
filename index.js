export default function $(selector) {
  const divs = typeof selector === 'string' ?
    Array.prototype.slice.call(document.querySelectorAll(selector)) :
    Array.isArray(selector) ? (selector ? selector : []) : [selector]
  const each = divs.map.bind(divs)
  const api = {
    parents: () => each((el) => el.parentElement),
    children: () => each((el) => el.children),
    find: (what) => each((el) => el.querySelectorAll(what)),
    remove: () => divs.forEach((el) => el.parentElement.removeChild(el)),
    addClass: (className) => each((el) => { if (el) el.classList.add(className); return el }),
    removeClass: (className) => each((el) => { if (el) el.classList.remove(className); return el }),
    animate: (animation, duration = 250) => {
      wrap((el) => {
        api.addClass(animation)
        setTimeout(() => api.removeClass(animation), duration)
      })
    },
    hide: () => each((el) => { if (el) el.style.display = 'none'; return el }),
    show: () => each((el) => { if (el) el.style.display = null; return el }),
    each
  }
  divs.forEach((el, i) => api[i] = el)
  return api;
}
