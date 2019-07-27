"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var flatten = function flatten(list) {
  return list.reduce(function (a, b) {
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []);
};

var AntiQuery =
/*#__PURE__*/
function () {
  function AntiQuery(selector) {
    _classCallCheck(this, AntiQuery);

    if (selector instanceof AntiQuery) {
      return selector;
    }

    this.elements = typeof selector === 'string' ? Array.prototype.slice.call(document.querySelectorAll(selector)) : Array.isArray(selector) ? selector : selector ? [selector] : [];
  }

  _createClass(AntiQuery, [{
    key: "get",
    value: function get(index) {
      if (!isNaN(index) && isFinite(index)) return this.elements[index];
      return this.elements;
    }
  }, {
    key: "each",
    value: function each(fn) {
      this.elements.forEach.call(this.elements, fn);
      return this;
    }
  }, {
    key: "parents",
    value: function parents() {
      return $(this.elements.map(function (el) {
        return el.parentElement;
      }));
    }
  }, {
    key: "children",
    value: function children() {
      return $(flatten(this.elements.map(function (el) {
        return el.children;
      })));
    }
  }, {
    key: "find",
    value: function find(what) {
      return $(flatten(this.elements.map(function (el) {
        return el.querySelectorAll(what);
      })));
    }
  }, {
    key: "remove",
    value: function remove() {
      this.elements.forEach(function (el) {
        return el.parentElement.removeChild(el);
      });
    }
  }, {
    key: "addClass",
    value: function addClass(className) {
      return this.each(function (el) {
        return el.classList.add(className);
      });
    }
  }, {
    key: "removeClass",
    value: function removeClass(className) {
      return this.each(function (el) {
        return el.classList.remove(className);
      });
    }
  }, {
    key: "css",
    value: function css(_css) {
      return this.each(function (el) {
        return Object.keys(_css).forEach(function (prop) {
          el.style[prop] = _css[prop];
        });
      });
    }
  }, {
    key: "hide",
    value: function hide() {
      return this.css({
        display: 'none'
      });
    }
  }, {
    key: "show",
    value: function show() {
      return this.css({
        display: null
      });
    }
  }, {
    key: "text",
    value: function text(_text) {
      return this.each(function (el) {
        el.textContent = _text;
      });
    }
  }, {
    key: "html",
    value: function html(_html) {
      return this.each(function (el) {
        el.innerHTML = _html;
      });
    }
  }, {
    key: "animate",
    value: function animate(animation) {
      var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;
      this.each(function (el) {
        return setTimeout(function () {
          return $(el).removeClass(animation);
        }, duration);
      });
      return this.addClass(animation);
    }
  }]);

  return AntiQuery;
}();

function $(selector) {
  return new AntiQuery(selector);
}

module.exports.AntiQuery = AntiQuery;
module.exports["default"] = $;
module.exports.flattenArray = flatten;