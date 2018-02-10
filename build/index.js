!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { configurable: !1, enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    (n.w = {}),
    n((n.s = 14));
})([
  function(e, t, n) {
    'use strict';
    e.exports = {
      capitalizeFirstLetter: function(e) {
        return e.charAt(0).toUpperCase() + e.slice(1);
      },
    };
  },
  function(e, t) {
    e.exports = require('chalk');
  },
  function(e, t, n) {
    'use strict';
    e.exports = function() {
      process.stdout.write('win32' === process.platform ? '[2J[0f' : '[2J[3J[H');
    };
  },
  function(e, t, n) {
    'use strict';
    var r = n(2);
    e.exports = r;
  },
  function(e, t) {
    e.exports = require('prettier');
  },
  function(e, t, n) {
    'use strict';
    var r = n(4),
      o = { printWidth: 100, semi: !0, trailingComma: 'es5', singleQuote: !0 };
    e.exports = {
      formatPrettier: function(e) {
        return r.format(e, o);
      },
    };
  },
  function(e, t, n) {
    'use strict';
    var r = n(0);
    e.exports = {
      createReactComponent: function(e) {
        var t = r.capitalizeFirstLetter(e);
        return (
          "import React, { Component } from 'react';\n\nclass " +
          t +
          ' extends Component {\n  render() {\n    return (\n      <div>\n        ' +
          t +
          '\n      </div>\n    );\n  }\n}\n\nexport default ' +
          t +
          ';\n  '
        );
      },
      createReactComponentWithProps: function(e) {
        var t = r.capitalizeFirstLetter(e);
        return (
          "import React, { Component } from 'react';\nimport PropTypes from 'prop-types';\n\nclass " +
          t +
          ' extends Component {\n  render() {\n    return (\n      <div>\n        ' +
          t +
          '\n      </div>\n    );\n  }\n}\n\n' +
          t +
          '.propTypes = {\n\n};\n\nexport default ' +
          t +
          ';\n  '
        );
      },
      createIndex: function(e, t) {
        return "export { default } from './" + (!0 === t ? r.capitalizeFirstLetter(e) : e) + "';";
      },
      createTest: function(e, t) {
        var n = r.capitalizeFirstLetter(e);
        return (
          "import React from 'react';\nimport { shallow } from 'enzyme';\nimport " +
          n +
          " from './" +
          (!0 === t ? n : e) +
          "';\n\ndescribe('<" +
          n +
          " />', () => {\n  test('renders', () => {\n    const wrapper = shallow(<" +
          n +
          ' />);\n    expect(wrapper).toMatchSnapshot();\n  });\n});\n  '
        );
      },
    };
  },
  function(e, t) {
    e.exports = require('mkdirp');
  },
  function(e, t) {
    e.exports = require('fs');
  },
  function(e, t, n) {
    'use strict';
    var r = n(8),
      o = n(7);
    e.exports = {
      readFileAsync: function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 'utf8';
        return new Promise(function(n, o) {
          r.readFile(e, t, function(e, t) {
            return e ? o(e) : n(t);
          });
        });
      },
      writeFileAsync: function(e, t) {
        var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 'utf8';
        return new Promise(function(o, s) {
          r.writeFile(e, t, n, function(e) {
            return e ? s(e) : o();
          });
        });
      },
      readDirAsync: function(e) {
        return new Promise(function(t, n) {
          r.readdir(e, function(e, r) {
            return e ? n(e) : t(r);
          });
        });
      },
      existsSyncAsync: function(e) {
        return new Promise(function(t, n) {
          return r.existsSync(e) ? n(new Error(!1)) : t(!0);
        });
      },
      createDirectorys: function(e) {
        return new Promise(function(t, n) {
          try {
            return r.exists(e, function(r) {
              return r
                ? t(e)
                : o(e, function(r) {
                    return r ? n(new Error(r)) : t(e);
                  });
            });
          } catch (t) {
            return n(new Error('Failed to create directory ' + e));
          }
        });
      },
    };
  },
  function(e, t) {
    e.exports = require('log-update');
  },
  function(e, t, n) {
    'use strict';
    var r =
        'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
          ? function(e) {
              return typeof e;
            }
          : function(e) {
              return e &&
                'function' == typeof Symbol &&
                e.constructor === Symbol &&
                e !== Symbol.prototype
                ? 'symbol'
                : typeof e;
            },
      o = n(1),
      s = n(10),
      i = {
        warn: { bg: 'bgYellow', msg: ' WARNING ', text: 'yellow' },
        info: { bg: 'bgMagenta', msg: ' INFO ', text: 'magenta' },
        error: { bg: 'bgRed', msg: ' ERROR ', text: 'red' },
        start: { bg: 'bgBlue', msg: ' WAIT ', text: 'blue' },
        done: { bg: 'bgGreen', msg: ' DONE ', text: 'green' },
        title: { bg: 'bgMagenta', msg: ' TITLE MISSING ', text: 'magenta' },
      };
    function c(e, t, n, s) {
      var c = '',
        a = !1,
        u = i[e];
      s && (u.msg = ' ' + s.toUpperCase() + ' '),
        (c += o[u.bg].black(u.msg) + ' ' + o[u.text](t)),
        n && ('object' === (void 0 === n ? 'undefined' : r(n)) ? (a = !0) : (c += '\n\n' + n)),
        console.log(c),
        ['start', 'done', 'error'].indexOf(e) > -1 && console.log(),
        a && console.dir(n, { depth: 15 });
    }
    var a = null;
    e.exports = {
      log: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : '';
        console.log(e);
      },
      info: function(e) {
        c('info', e);
      },
      warn: function(e, t) {
        c('warn', e, t);
      },
      error: function(e, t) {
        c('error', e, t);
      },
      start: function(e) {
        c('start', e);
      },
      done: function(e) {
        c('done', e);
      },
      title: function(e, t) {
        c('title', t, null, e);
      },
      animateStart: function(e, t) {
        t = t || ['-', '\\', '|', '/'];
        var n = 0;
        a = setInterval(function() {
          var r = t[(n = ++n % t.length)];
          s(r + ' ' + e);
        }, 80);
      },
      animateStop: function() {
        clearInterval(a);
      },
    };
  },
  function(e, t) {
    e.exports = require('commander');
  },
  function(e, t) {
    e.exports = require('path');
  },
  function(e, t, n) {
    'use strict';
    var r,
      o,
      s = ((r = c(
        regeneratorRuntime.mark(function e(t) {
          var n, r, o, s, i, c;
          return regeneratorRuntime.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    return (
                      (n = ['index.js', A + '.js']),
                      p.notest || n.push(A + '.test.js'),
                      t && n.push(A + '.' + t),
                      p.uppercase &&
                        (n = n.map(function(e, t) {
                          return 0 !== t ? v.capitalizeFirstLetter(e) : e;
                        })),
                      (e.prev = 4),
                      (e.next = 7),
                      m.createDirectorys(R)
                    );
                  case 7:
                    for (r = [], o = 0; o < n.length; o += 1)
                      (s = n[o]),
                        (i = u.join(R, s)),
                        (c = ''),
                        'index.js' === s
                          ? ((c = d.createIndex(A, p.uppercase)),
                            r.push(m.writeFileAsync(i, g.formatPrettier(c))))
                          : s === A + '.js'
                            ? ((c = p.proptypes
                                ? d.createReactComponentWithProps(A)
                                : d.createReactComponent(A)),
                              r.push(m.writeFileAsync(i, g.formatPrettier(c))))
                            : s.indexOf('.test.js') > -1
                              ? ((c = d.createTest(A, p.uppercase)),
                                p.notest || r.push(m.writeFileAsync(i, g.formatPrettier(c))))
                              : (s.indexOf('.css') > -1 ||
                                  s.indexOf('.less') > -1 ||
                                  s.indexOf('.scss') > -1) &&
                                ((c = ''), r.push(m.writeFileAsync(i, g.formatPrettier(c))));
                    return (e.next = 11), Promise.all(r);
                  case 11:
                    return e.abrupt('return', n);
                  case 14:
                    throw ((e.prev = 14), (e.t0 = e.catch(4)), new Error('Error creating files'));
                  case 17:
                  case 'end':
                    return e.stop();
                }
            },
            e,
            this,
            [[4, 14]]
          );
        })
      )),
      function(e) {
        return r.apply(this, arguments);
      }),
      i = ((o = c(
        regeneratorRuntime.mark(function e() {
          var t, n;
          return regeneratorRuntime.wrap(
            function(e) {
              for (;;)
                switch ((e.prev = e.next)) {
                  case 0:
                    if ((x(), console.time('✨  Finished in'), 0 !== b.length)) {
                      e.next = 6;
                      break;
                    }
                    return (
                      l.warn("You didn't supply component name as an argument."),
                      l.log(
                        'Please try "crc componentName" or "create-react-component-folder componentName"'
                      ),
                      e.abrupt('return')
                    );
                  case 6:
                    if ('index' !== b[0]) {
                      e.next = 13;
                      break;
                    }
                    return (
                      l.log(),
                      l.warn('You cannot name your component index'),
                      l.log(),
                      l.log('Please choose a more descriptive name'),
                      l.log(),
                      e.abrupt('return')
                    );
                  case 13:
                    return (e.prev = 13), (e.next = 16), m.existsSyncAsync(R);
                  case 16:
                    e.next = 22;
                    break;
                  case 18:
                    return (
                      (e.prev = 18),
                      (e.t0 = e.catch(13)),
                      l.error('Folder "' + A + '" already exists at ..' + S),
                      e.abrupt('return')
                    );
                  case 22:
                    return l.log(), (e.next = 25), l.animateStart('Creating components files...');
                  case 25:
                    return (
                      (e.prev = 25),
                      (t = 'css'),
                      p.less && (t = 'less'),
                      p.sass && (t = 'sass'),
                      p.nocss && (t = null),
                      (e.next = 32),
                      s(t)
                    );
                  case 32:
                    (n = e.sent),
                      setTimeout(function() {
                        l.log(),
                          l.animateStop(),
                          console.timeEnd('✨  Finished in'),
                          l.done('Success!');
                        var e = y + '/' + F;
                        l.log('Created a new React component at ' + f.cyan(e)),
                          l.log(),
                          l.log(A + '/');
                        for (var t = 0; t < n.length; t += 1) l.log('  └─ ' + n[t]);
                        l.log(), l.log();
                      }, 500),
                      (e.next = 39);
                    break;
                  case 36:
                    (e.prev = 36), (e.t1 = e.catch(25)), l.error(e.t1);
                  case 39:
                  case 'end':
                    return e.stop();
                }
            },
            e,
            this,
            [[13, 18], [25, 36]]
          );
        })
      )),
      function() {
        return o.apply(this, arguments);
      });
    function c(e) {
      return function() {
        var t = e.apply(this, arguments);
        return new Promise(function(e, n) {
          return (function r(o, s) {
            try {
              var i = t[o](s),
                c = i.value;
            } catch (e) {
              return void n(e);
            }
            if (!i.done)
              return Promise.resolve(c).then(
                function(e) {
                  r('next', e);
                },
                function(e) {
                  r('throw', e);
                }
              );
            e(c);
          })('next');
        });
      };
    }
    var a,
      u = n(13),
      p = n(12),
      f = n(1),
      l = n(11),
      m = n(9),
      d = n(6),
      g = n(5),
      x = n(3),
      v = n(0),
      y = process.cwd(),
      h = y.substring(y.lastIndexOf('/'), y.length),
      b = ((a = process.argv), Array.isArray(a) ? a : Array.from(a)).slice(2);
    var w,
      P,
      F = b[b.length - 1] || '',
      A = -1 !== (P = (w = F).lastIndexOf('/')) ? w.substring(P + 1, w.length) : w,
      R = u.join(y, F),
      S = u.join(h, R);
    p
      .version('0.1.0')
      .option('-l, --less', 'Adds .less file to component')
      .option('-s, --sass', 'Adds .sass file to component')
      .option('-n, --nocss', 'No css file')
      .option('-t, --notest', 'No test file')
      .option('-p, --proptypes', 'Adds prop-types to component')
      .option('-u, --uppercase', 'Component files start on uppercase letter')
      .parse(process.argv),
      i();
  },
]);
//# sourceMappingURL=index.js.map
