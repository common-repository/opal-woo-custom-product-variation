/*! For license information please see form-render.min.js.LICENSE.txt */
!(function (e) {
    "use strict";
    !(function () {
        var t = {
                44: function (e, t, n) {
                    n.r(t);
                    var r = n(476),
                        o = n.n(r)()(!1);
                    o.push([
                        e.id,
                        '',
                        "",
                    ]),
                        (t.default = o);
                },
                476: function (e) {
                    e.exports = function (e) {
                        var t = [];
                        return (
                            (t.toString = function () {
                                return this.map(function (t) {
                                    var n = (function (e, t) {
                                        var n,
                                            r,
                                            o,
                                            i = e[1] || "",
                                            s = e[3];
                                        if (!s) return i;
                                        if (t && "function" == typeof btoa) {
                                            var a = ((n = s), (r = btoa(unescape(encodeURIComponent(JSON.stringify(n))))), (o = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(r)), "/*# ".concat(o, " */")),
                                                l = s.sources.map(function (e) {
                                                    return "/*# sourceURL=".concat(s.sourceRoot || "").concat(e, " */");
                                                });
                                            return [i].concat(l).concat([a]).join("\n");
                                        }
                                        return [i].join("\n");
                                    })(t, e);
                                    return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
                                }).join("");
                            }),
                            (t.i = function (e, n, r) {
                                "string" == typeof e && (e = [[null, e, ""]]);
                                var o = {};
                                if (r)
                                    for (var i = 0; i < this.length; i++) {
                                        var s = this[i][0];
                                        null != s && (o[s] = !0);
                                    }
                                for (var a = 0; a < e.length; a++) {
                                    var l = [].concat(e[a]);
                                    (r && o[l[0]]) || (n && (l[2] ? (l[2] = "".concat(n, " and ").concat(l[2])) : (l[2] = n)), t.push(l));
                                }
                            }),
                            t
                        );
                    };
                },
                747: function (e) {
                    e.exports = (function (e) {
                        var t = {};
                        function n(r) {
                            if (t[r]) return t[r].exports;
                            var o = (t[r] = { i: r, l: !1, exports: {} });
                            return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
                        }
                        return (
                            (n.m = e),
                            (n.c = t),
                            (n.d = function (e, t, r) {
                                n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
                            }),
                            (n.r = function (e) {
                                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
                            }),
                            (n.t = function (e, t) {
                                if ((1 & t && (e = n(e)), 8 & t)) return e;
                                if (4 & t && "object" == typeof e && e && e.__esModule) return e;
                                var r = Object.create(null);
                                if ((n.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & t && "string" != typeof e))
                                    for (var o in e)
                                        n.d(
                                            r,
                                            o,
                                            function (t) {
                                                return e[t];
                                            }.bind(null, o)
                                        );
                                return r;
                            }),
                            (n.n = function (e) {
                                var t =
                                    e && e.__esModule
                                        ? function () {
                                              return e.default;
                                          }
                                        : function () {
                                              return e;
                                          };
                                return n.d(t, "a", t), t;
                            }),
                            (n.o = function (e, t) {
                                return Object.prototype.hasOwnProperty.call(e, t);
                            }),
                            (n.p = ""),
                            n((n.s = 7))
                        );
                    })([
                        function (e, t, n) {
                            var r =
                                    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                          },
                                o = n(2),
                                i = n(10),
                                s = Object.prototype.toString;
                            function a(e) {
                                return "[object Array]" === s.call(e);
                            }
                            function l(e) {
                                return null !== e && "object" === (void 0 === e ? "undefined" : r(e));
                            }
                            function c(e) {
                                return "[object Function]" === s.call(e);
                            }
                            function u(e, t) {
                                if (null != e)
                                    if (("object" !== (void 0 === e ? "undefined" : r(e)) && (e = [e]), a(e))) for (var n = 0, o = e.length; n < o; n++) t.call(null, e[n], n, e);
                                    else for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && t.call(null, e[i], i, e);
                            }
                            e.exports = {
                                isArray: a,
                                isArrayBuffer: function (e) {
                                    return "[object ArrayBuffer]" === s.call(e);
                                },
                                isBuffer: i,
                                isFormData: function (e) {
                                    return "undefined" != typeof FormData && e instanceof FormData;
                                },
                                isArrayBufferView: function (e) {
                                    return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : e && e.buffer && e.buffer instanceof ArrayBuffer;
                                },
                                isString: function (e) {
                                    return "string" == typeof e;
                                },
                                isNumber: function (e) {
                                    return "number" == typeof e;
                                },
                                isObject: l,
                                isUndefined: function (e) {
                                    return void 0 === e;
                                },
                                isDate: function (e) {
                                    return "[object Date]" === s.call(e);
                                },
                                isFile: function (e) {
                                    return "[object File]" === s.call(e);
                                },
                                isBlob: function (e) {
                                    return "[object Blob]" === s.call(e);
                                },
                                isFunction: c,
                                isStream: function (e) {
                                    return l(e) && c(e.pipe);
                                },
                                isURLSearchParams: function (e) {
                                    return "undefined" != typeof URLSearchParams && e instanceof URLSearchParams;
                                },
                                isStandardBrowserEnv: function () {
                                    return ("undefined" == typeof navigator || "ReactNative" !== navigator.product) && "undefined" != typeof window && "undefined" != typeof document;
                                },
                                forEach: u,
                                merge: function e() {
                                    var t = {};
                                    function n(n, o) {
                                        "object" === r(t[o]) && "object" === (void 0 === n ? "undefined" : r(n)) ? (t[o] = e(t[o], n)) : (t[o] = n);
                                    }
                                    for (var o = 0, i = arguments.length; o < i; o++) u(arguments[o], n);
                                    return t;
                                },
                                extend: function (e, t, n) {
                                    return (
                                        u(t, function (t, r) {
                                            e[r] = n && "function" == typeof t ? o(t, n) : t;
                                        }),
                                        e
                                    );
                                },
                                trim: function (e) {
                                    return e.replace(/^\s*/, "").replace(/\s*$/, "");
                                },
                            };
                        },
                        function (e, t, n) {
                            (function (t) {
                                var r = n(0),
                                    o = n(13),
                                    i = { "Content-Type": "application/x-www-form-urlencoded" };
                                function s(e, t) {
                                    !r.isUndefined(e) && r.isUndefined(e["Content-Type"]) && (e["Content-Type"] = t);
                                }
                                var a = {
                                    adapter: (function () {
                                        var e;
                                        return ("undefined" != typeof XMLHttpRequest || void 0 !== t) && (e = n(3)), e;
                                    })(),
                                    transformRequest: [
                                        function (e, t) {
                                            return (
                                                o(t, "Content-Type"),
                                                r.isFormData(e) || r.isArrayBuffer(e) || r.isBuffer(e) || r.isStream(e) || r.isFile(e) || r.isBlob(e)
                                                    ? e
                                                    : r.isArrayBufferView(e)
                                                    ? e.buffer
                                                    : r.isURLSearchParams(e)
                                                    ? (s(t, "application/x-www-form-urlencoded;charset=utf-8"), e.toString())
                                                    : r.isObject(e)
                                                    ? (s(t, "application/json;charset=utf-8"), JSON.stringify(e))
                                                    : e
                                            );
                                        },
                                    ],
                                    transformResponse: [
                                        function (e) {
                                            if ("string" == typeof e)
                                                try {
                                                    e = JSON.parse(e);
                                                } catch (e) {}
                                            return e;
                                        },
                                    ],
                                    timeout: 0,
                                    xsrfCookieName: "XSRF-TOKEN",
                                    xsrfHeaderName: "X-XSRF-TOKEN",
                                    maxContentLength: -1,
                                    validateStatus: function (e) {
                                        return e >= 200 && e < 300;
                                    },
                                    headers: { common: { Accept: "application/json, text/plain, */*" } },
                                };
                                r.forEach(["delete", "get", "head"], function (e) {
                                    a.headers[e] = {};
                                }),
                                    r.forEach(["post", "put", "patch"], function (e) {
                                        a.headers[e] = r.merge(i);
                                    }),
                                    (e.exports = a);
                            }.call(this, n(12)));
                        },
                        function (e, t, n) {
                            e.exports = function (e, t) {
                                return function () {
                                    for (var n = new Array(arguments.length), r = 0; r < n.length; r++) n[r] = arguments[r];
                                    return e.apply(t, n);
                                };
                            };
                        },
                        function (e, t, n) {
                            var r = n(0),
                                o = n(14),
                                i = n(16),
                                s = n(17),
                                a = n(18),
                                l = n(4),
                                c = ("undefined" != typeof window && window.btoa && window.btoa.bind(window)) || n(19);
                            e.exports = function (e) {
                                return new Promise(function (t, u) {
                                    var d = e.data,
                                        p = e.headers;
                                    r.isFormData(d) && delete p["Content-Type"];
                                    var f = new XMLHttpRequest(),
                                        h = "onreadystatechange",
                                        m = !1;
                                    if (
                                        ("undefined" == typeof window ||
                                            !window.XDomainRequest ||
                                            "withCredentials" in f ||
                                            a(e.url) ||
                                            ((f = new window.XDomainRequest()), (h = "onload"), (m = !0), (f.onprogress = function () {}), (f.ontimeout = function () {})),
                                        e.auth)
                                    ) {
                                        var g = e.auth.username || "",
                                            b = e.auth.password || "";
                                        p.Authorization = "Basic " + c(g + ":" + b);
                                    }
                                    if (
                                        (f.open(e.method.toUpperCase(), i(e.url, e.params, e.paramsSerializer), !0),
                                        (f.timeout = e.timeout),
                                        (f[h] = function () {
                                            if (f && (4 === f.readyState || m) && (0 !== f.status || (f.responseURL && 0 === f.responseURL.indexOf("file:")))) {
                                                var n = "getAllResponseHeaders" in f ? s(f.getAllResponseHeaders()) : null,
                                                    r = {
                                                        data: e.responseType && "text" !== e.responseType ? f.response : f.responseText,
                                                        status: 1223 === f.status ? 204 : f.status,
                                                        statusText: 1223 === f.status ? "No Content" : f.statusText,
                                                        headers: n,
                                                        config: e,
                                                        request: f,
                                                    };
                                                o(t, u, r), (f = null);
                                            }
                                        }),
                                        (f.onerror = function () {
                                            u(l("Network Error", e, null, f)), (f = null);
                                        }),
                                        (f.ontimeout = function () {
                                            u(l("timeout of " + e.timeout + "ms exceeded", e, "ECONNABORTED", f)), (f = null);
                                        }),
                                        r.isStandardBrowserEnv())
                                    ) {
                                        var y = n(20),
                                            v = (e.withCredentials || a(e.url)) && e.xsrfCookieName ? y.read(e.xsrfCookieName) : void 0;
                                        v && (p[e.xsrfHeaderName] = v);
                                    }
                                    if (
                                        ("setRequestHeader" in f &&
                                            r.forEach(p, function (e, t) {
                                                void 0 === d && "content-type" === t.toLowerCase() ? delete p[t] : f.setRequestHeader(t, e);
                                            }),
                                        e.withCredentials && (f.withCredentials = !0),
                                        e.responseType)
                                    )
                                        try {
                                            f.responseType = e.responseType;
                                        } catch (t) {
                                            if ("json" !== e.responseType) throw t;
                                        }
                                    "function" == typeof e.onDownloadProgress && f.addEventListener("progress", e.onDownloadProgress),
                                        "function" == typeof e.onUploadProgress && f.upload && f.upload.addEventListener("progress", e.onUploadProgress),
                                        e.cancelToken &&
                                            e.cancelToken.promise.then(function (e) {
                                                f && (f.abort(), u(e), (f = null));
                                            }),
                                        void 0 === d && (d = null),
                                        f.send(d);
                                });
                            };
                        },
                        function (e, t, n) {
                            var r = n(15);
                            e.exports = function (e, t, n, o, i) {
                                var s = new Error(e);
                                return r(s, t, n, o, i);
                            };
                        },
                        function (e, t, n) {
                            e.exports = function (e) {
                                return !(!e || !e.__CANCEL__);
                            };
                        },
                        function (e, t, n) {
                            function r(e) {
                                this.message = e;
                            }
                            (r.prototype.toString = function () {
                                return "Cancel" + (this.message ? ": " + this.message : "");
                            }),
                                (r.prototype.__CANCEL__ = !0),
                                (e.exports = r);
                        },
                        function (e, t, n) {
                            (t.__esModule = !0), (t.I18N = void 0);
                            var r =
                                    "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
                                        ? function (e) {
                                              return typeof e;
                                          }
                                        : function (e) {
                                              return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
                                          },
                                o = (function () {
                                    function e(e, t) {
                                        for (var n = 0; n < t.length; n++) {
                                            var r = t[n];
                                            (r.enumerable = r.enumerable || !1), (r.configurable = !0), "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
                                        }
                                    }
                                    return function (t, n, r) {
                                        return n && e(t.prototype, n), r && e(t, r), t;
                                    };
                                })(),
                                i = n(8),
                                s = { extension: ".lang", location: "assets/lang/", langs: ["en-US"], locale: "en-US", override: {} },
                                a = (t.I18N = (function () {
                                    function e() {
                                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : s;
                                        !(function (e, t) {
                                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                                        })(this, e),
                                            (this.langs = Object.create(null)),
                                            (this.loaded = []),
                                            this.processConfig(t);
                                    }
                                    return (
                                        (e.prototype.processConfig = function (e) {
                                            var t = this,
                                                n = Object.assign({}, s, e),
                                                r = n.location,
                                                o = (function (e, t) {
                                                    var n = {};
                                                    for (var r in e) t.indexOf(r) >= 0 || (Object.prototype.hasOwnProperty.call(e, r) && (n[r] = e[r]));
                                                    return n;
                                                })(n, ["location"]),
                                                i = r.replace(/\/?$/, "/");
                                            this.config = Object.assign({}, { location: i }, o);
                                            var a = this.config,
                                                l = a.override,
                                                c = a.preloaded,
                                                u = void 0 === c ? {} : c,
                                                d = Object.entries(this.langs).concat(Object.entries(l || u));
                                            (this.langs = d.reduce(function (e, n) {
                                                var r = n[0],
                                                    o = n[1];
                                                return (e[r] = t.applyLanguage.call(t, r, o)), e;
                                            }, {})),
                                                (this.locale = this.config.locale || this.config.langs[0]);
                                        }),
                                        (e.prototype.init = function (e) {
                                            return this.processConfig.call(this, Object.assign({}, this.config, e)), this.setCurrent(this.locale);
                                        }),
                                        (e.prototype.addLanguage = function (e) {
                                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                                            (t = "string" == typeof t ? this.processFile.call(this, t) : t), this.applyLanguage.call(this, e, t), this.config.langs.push("locale");
                                        }),
                                        (e.prototype.getValue = function (e) {
                                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : this.locale;
                                            return (this.langs[t] && this.langs[t][e]) || this.getFallbackValue(e);
                                        }),
                                        (e.prototype.getFallbackValue = function (e) {
                                            var t = Object.values(this.langs).find(function (t) {
                                                return t[e];
                                            });
                                            return t && t[e];
                                        }),
                                        (e.prototype.makeSafe = function (e) {
                                            var t = { "{": "\\{", "}": "\\}", "|": "\\|" };
                                            return (
                                                (e = e.replace(/\{|\}|\|/g, function (e) {
                                                    return t[e];
                                                })),
                                                new RegExp(e, "g")
                                            );
                                        }),
                                        (e.prototype.put = function (e, t) {
                                            return (this.current[e] = t);
                                        }),
                                        (e.prototype.get = function (e, t) {
                                            var n = this.getValue(e);
                                            if (n) {
                                                var o = n.match(/\{[^}]+?\}/g),
                                                    i = void 0;
                                                if (t && o)
                                                    if ("object" === (void 0 === t ? "undefined" : r(t))) for (var s = 0; s < o.length; s++) (i = o[s].substring(1, o[s].length - 1)), (n = n.replace(this.makeSafe(o[s]), t[i] || ""));
                                                    else n = n.replace(/\{[^}]+?\}/g, t);
                                                return n;
                                            }
                                        }),
                                        (e.prototype.fromFile = function (e) {
                                            for (var t, n = e.split("\n"), r = {}, o = 0; o < n.length; o++) (t = n[o].match(/^(.+?) *?= *?([^\n]+)/)) && (r[t[1]] = t[2].replace(/^\s+|\s+$/, ""));
                                            return r;
                                        }),
                                        (e.prototype.processFile = function (e) {
                                            return this.fromFile(e.replace(/\n\n/g, "\n"));
                                        }),
                                        (e.prototype.loadLang = function (e) {
                                            var t = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1],
                                                n = this;
                                            return new Promise(function (r, o) {
                                                return n.applyLanguage.call(n, n.langs[e]), r(n.langs[e]);
                                                if (-1 !== n.loaded.indexOf(e) && t) return n.applyLanguage.call(n, n.langs[e]), r(n.langs[e]);
                                                var s = [n.config.location, e, n.config.extension].join("");
                                                return (0, i.get)(s)
                                                    .then(function (t) {
                                                        var o = t.data,
                                                            i = n.processFile(o);
                                                        return n.applyLanguage.call(n, e, i), n.loaded.push(e), r(n.langs[e]);
                                                    })
                                                    .catch(function () {
                                                        var t = n.applyLanguage.call(n, e);
                                                        r(t);
                                                    });
                                            });
                                        }),
                                        (e.prototype.applyLanguage = function (e) {
                                            var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {},
                                                n = this.config.override[e] || {},
                                                r = this.langs[e] || {};
                                            return (this.langs[e] = Object.assign({}, r, t, n)), this.langs[e];
                                        }),
                                        (e.prototype.setCurrent = function () {
                                            var e = this,
                                                t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "en-US";
                                            return this.loadLang(t).then(function () {
                                                return (e.locale = t), (e.current = e.langs[t]), e.current;
                                            });
                                        }),
                                        o(e, [
                                            {
                                                key: "getLangs",
                                                get: function () {
                                                    return this.config.langs;
                                                },
                                            },
                                        ]),
                                        e
                                    );
                                })());
                            t.default = new a();
                        },
                        function (e, t, n) {
                            e.exports = n(9);
                        },
                        function (e, t, n) {
                            var r = n(0),
                                o = n(2),
                                i = n(11),
                                s = n(1);
                            function a(e) {
                                var t = new i(e),
                                    n = o(i.prototype.request, t);
                                return r.extend(n, i.prototype, t), r.extend(n, t), n;
                            }
                            var l = a(s);
                            (l.Axios = i),
                                (l.create = function (e) {
                                    return a(r.merge(s, e));
                                }),
                                (l.Cancel = n(6)),
                                (l.CancelToken = n(26)),
                                (l.isCancel = n(5)),
                                (l.all = function (e) {
                                    return Promise.all(e);
                                }),
                                (l.spread = n(27)),
                                (e.exports = l),
                                (e.exports.default = l);
                        },
                        function (e, t, n) {
                            function r(e) {
                                return !!e.constructor && "function" == typeof e.constructor.isBuffer && e.constructor.isBuffer(e);
                            }
                            e.exports = function (e) {
                                return (
                                    null != e &&
                                    (r(e) ||
                                        (function (e) {
                                            return "function" == typeof e.readFloatLE && "function" == typeof e.slice && r(e.slice(0, 0));
                                        })(e) ||
                                        !!e._isBuffer)
                                );
                            };
                        },
                        function (e, t, n) {
                            var r = n(1),
                                o = n(0),
                                i = n(21),
                                s = n(22);
                            function a(e) {
                                (this.defaults = e), (this.interceptors = { request: new i(), response: new i() });
                            }
                            (a.prototype.request = function (e) {
                                "string" == typeof e && (e = o.merge({ url: arguments[0] }, arguments[1])), ((e = o.merge(r, { method: "get" }, this.defaults, e)).method = e.method.toLowerCase());
                                var t = [s, void 0],
                                    n = Promise.resolve(e);
                                for (
                                    this.interceptors.request.forEach(function (e) {
                                        t.unshift(e.fulfilled, e.rejected);
                                    }),
                                        this.interceptors.response.forEach(function (e) {
                                            t.push(e.fulfilled, e.rejected);
                                        });
                                    t.length;

                                )
                                    n = n.then(t.shift(), t.shift());
                                return n;
                            }),
                                o.forEach(["delete", "get", "head", "options"], function (e) {
                                    a.prototype[e] = function (t, n) {
                                        return this.request(o.merge(n || {}, { method: e, url: t }));
                                    };
                                }),
                                o.forEach(["post", "put", "patch"], function (e) {
                                    a.prototype[e] = function (t, n, r) {
                                        return this.request(o.merge(r || {}, { method: e, url: t, data: n }));
                                    };
                                }),
                                (e.exports = a);
                        },
                        function (e, t, n) {
                            var r,
                                o,
                                i = (e.exports = {});
                            function s() {
                                throw new Error("setTimeout has not been defined");
                            }
                            function a() {
                                throw new Error("clearTimeout has not been defined");
                            }
                            function l(e) {
                                if (r === setTimeout) return setTimeout(e, 0);
                                if ((r === s || !r) && setTimeout) return (r = setTimeout), setTimeout(e, 0);
                                try {
                                    return r(e, 0);
                                } catch (t) {
                                    try {
                                        return r.call(null, e, 0);
                                    } catch (t) {
                                        return r.call(this, e, 0);
                                    }
                                }
                            }
                            !(function () {
                                try {
                                    r = "function" == typeof setTimeout ? setTimeout : s;
                                } catch (e) {
                                    r = s;
                                }
                                try {
                                    o = "function" == typeof clearTimeout ? clearTimeout : a;
                                } catch (e) {
                                    o = a;
                                }
                            })();
                            var c,
                                u = [],
                                d = !1,
                                p = -1;
                            function f() {
                                d && c && ((d = !1), c.length ? (u = c.concat(u)) : (p = -1), u.length && h());
                            }
                            function h() {
                                if (!d) {
                                    var e = l(f);
                                    d = !0;
                                    for (var t = u.length; t; ) {
                                        for (c = u, u = []; ++p < t; ) c && c[p].run();
                                        (p = -1), (t = u.length);
                                    }
                                    (c = null),
                                        (d = !1),
                                        (function (e) {
                                            if (o === clearTimeout) return clearTimeout(e);
                                            if ((o === a || !o) && clearTimeout) return (o = clearTimeout), clearTimeout(e);
                                            try {
                                                o(e);
                                            } catch (t) {
                                                try {
                                                    return o.call(null, e);
                                                } catch (t) {
                                                    return o.call(this, e);
                                                }
                                            }
                                        })(e);
                                }
                            }
                            function m(e, t) {
                                (this.fun = e), (this.array = t);
                            }
                            function g() {}
                            (i.nextTick = function (e) {
                                var t = new Array(arguments.length - 1);
                                if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
                                u.push(new m(e, t)), 1 !== u.length || d || l(h);
                            }),
                                (m.prototype.run = function () {
                                    this.fun.apply(null, this.array);
                                }),
                                (i.title = "browser"),
                                (i.browser = !0),
                                (i.env = {}),
                                (i.argv = []),
                                (i.version = ""),
                                (i.versions = {}),
                                (i.on = g),
                                (i.addListener = g),
                                (i.once = g),
                                (i.off = g),
                                (i.removeListener = g),
                                (i.removeAllListeners = g),
                                (i.emit = g),
                                (i.prependListener = g),
                                (i.prependOnceListener = g),
                                (i.listeners = function (e) {
                                    return [];
                                }),
                                (i.binding = function (e) {
                                    throw new Error("process.binding is not supported");
                                }),
                                (i.cwd = function () {
                                    return "/";
                                }),
                                (i.chdir = function (e) {
                                    throw new Error("process.chdir is not supported");
                                }),
                                (i.umask = function () {
                                    return 0;
                                });
                        },
                        function (e, t, n) {
                            var r = n(0);
                            e.exports = function (e, t) {
                                r.forEach(e, function (n, r) {
                                    r !== t && r.toUpperCase() === t.toUpperCase() && ((e[t] = n), delete e[r]);
                                });
                            };
                        },
                        function (e, t, n) {
                            var r = n(4);
                            e.exports = function (e, t, n) {
                                var o = n.config.validateStatus;
                                n.status && o && !o(n.status) ? t(r("Request failed with status code " + n.status, n.config, null, n.request, n)) : e(n);
                            };
                        },
                        function (e, t, n) {
                            e.exports = function (e, t, n, r, o) {
                                return (e.config = t), n && (e.code = n), (e.request = r), (e.response = o), e;
                            };
                        },
                        function (e, t, n) {
                            var r = n(0);
                            function o(e) {
                                return encodeURIComponent(e).replace(/%40/gi, "@").replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
                            }
                            e.exports = function (e, t, n) {
                                if (!t) return e;
                                var i;
                                if (n) i = n(t);
                                else if (r.isURLSearchParams(t)) i = t.toString();
                                else {
                                    var s = [];
                                    r.forEach(t, function (e, t) {
                                        null != e &&
                                            (r.isArray(e) ? (t += "[]") : (e = [e]),
                                            r.forEach(e, function (e) {
                                                r.isDate(e) ? (e = e.toISOString()) : r.isObject(e) && (e = JSON.stringify(e)), s.push(o(t) + "=" + o(e));
                                            }));
                                    }),
                                        (i = s.join("&"));
                                }
                                return i && (e += (-1 === e.indexOf("?") ? "?" : "&") + i), e;
                            };
                        },
                        function (e, t, n) {
                            var r = n(0),
                                o = [
                                    "age",
                                    "authorization",
                                    "content-length",
                                    "content-type",
                                    "etag",
                                    "expires",
                                    "from",
                                    "host",
                                    "if-modified-since",
                                    "if-unmodified-since",
                                    "last-modified",
                                    "location",
                                    "max-forwards",
                                    "proxy-authorization",
                                    "referer",
                                    "retry-after",
                                    "user-agent",
                                ];
                            e.exports = function (e) {
                                var t,
                                    n,
                                    i,
                                    s = {};
                                return e
                                    ? (r.forEach(e.split("\n"), function (e) {
                                          if (((i = e.indexOf(":")), (t = r.trim(e.substr(0, i)).toLowerCase()), (n = r.trim(e.substr(i + 1))), t)) {
                                              if (s[t] && o.indexOf(t) >= 0) return;
                                              s[t] = "set-cookie" === t ? (s[t] ? s[t] : []).concat([n]) : s[t] ? s[t] + ", " + n : n;
                                          }
                                      }),
                                      s)
                                    : s;
                            };
                        },
                        function (e, t, n) {
                            var r = n(0);
                            e.exports = r.isStandardBrowserEnv()
                                ? (function () {
                                      var e,
                                          t = /(msie|trident)/i.test(navigator.userAgent),
                                          n = document.createElement("a");
                                      function o(e) {
                                          var r = e;
                                          return (
                                              t && (n.setAttribute("href", r), (r = n.href)),
                                              n.setAttribute("href", r),
                                              {
                                                  href: n.href,
                                                  protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
                                                  host: n.host,
                                                  search: n.search ? n.search.replace(/^\?/, "") : "",
                                                  hash: n.hash ? n.hash.replace(/^#/, "") : "",
                                                  hostname: n.hostname,
                                                  port: n.port,
                                                  pathname: "/" === n.pathname.charAt(0) ? n.pathname : "/" + n.pathname,
                                              }
                                          );
                                      }
                                      return (
                                          (e = o(window.location.href)),
                                          function (t) {
                                              var n = r.isString(t) ? o(t) : t;
                                              return n.protocol === e.protocol && n.host === e.host;
                                          }
                                      );
                                  })()
                                : function () {
                                      return !0;
                                  };
                        },
                        function (e, t, n) {
                            function r() {
                                this.message = "String contains an invalid character";
                            }
                            (r.prototype = new Error()),
                                (r.prototype.code = 5),
                                (r.prototype.name = "InvalidCharacterError"),
                                (e.exports = function (e) {
                                    for (var t, n, o = String(e), i = "", s = 0, a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="; o.charAt(0 | s) || ((a = "="), s % 1); i += a.charAt(63 & (t >> (8 - (s % 1) * 8)))) {
                                        if ((n = o.charCodeAt((s += 0.75))) > 255) throw new r();
                                        t = (t << 8) | n;
                                    }
                                    return i;
                                });
                        },
                        function (e, t, n) {
                            var r = n(0);
                            e.exports = r.isStandardBrowserEnv()
                                ? {
                                      write: function (e, t, n, o, i, s) {
                                          var a = [];
                                          a.push(e + "=" + encodeURIComponent(t)),
                                              r.isNumber(n) && a.push("expires=" + new Date(n).toGMTString()),
                                              r.isString(o) && a.push("path=" + o),
                                              r.isString(i) && a.push("domain=" + i),
                                              !0 === s && a.push("secure"),
                                              (document.cookie = a.join("; "));
                                      },
                                      read: function (e) {
                                          var t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
                                          return t ? decodeURIComponent(t[3]) : null;
                                      },
                                      remove: function (e) {
                                          this.write(e, "", Date.now() - 864e5);
                                      },
                                  }
                                : {
                                      write: function () {},
                                      read: function () {
                                          return null;
                                      },
                                      remove: function () {},
                                  };
                        },
                        function (e, t, n) {
                            var r = n(0);
                            function o() {
                                this.handlers = [];
                            }
                            (o.prototype.use = function (e, t) {
                                return this.handlers.push({ fulfilled: e, rejected: t }), this.handlers.length - 1;
                            }),
                                (o.prototype.eject = function (e) {
                                    this.handlers[e] && (this.handlers[e] = null);
                                }),
                                (o.prototype.forEach = function (e) {
                                    r.forEach(this.handlers, function (t) {
                                        null !== t && e(t);
                                    });
                                }),
                                (e.exports = o);
                        },
                        function (e, t, n) {
                            var r = n(0),
                                o = n(23),
                                i = n(5),
                                s = n(1),
                                a = n(24),
                                l = n(25);
                            function c(e) {
                                e.cancelToken && e.cancelToken.throwIfRequested();
                            }
                            e.exports = function (e) {
                                return (
                                    c(e),
                                    e.baseURL && !a(e.url) && (e.url = l(e.baseURL, e.url)),
                                    (e.headers = e.headers || {}),
                                    (e.data = o(e.data, e.headers, e.transformRequest)),
                                    (e.headers = r.merge(e.headers.common || {}, e.headers[e.method] || {}, e.headers || {})),
                                    r.forEach(["delete", "get", "head", "post", "put", "patch", "common"], function (t) {
                                        delete e.headers[t];
                                    }),
                                    (e.adapter || s.adapter)(e).then(
                                        function (t) {
                                            return c(e), (t.data = o(t.data, t.headers, e.transformResponse)), t;
                                        },
                                        function (t) {
                                            return i(t) || (c(e), t && t.response && (t.response.data = o(t.response.data, t.response.headers, e.transformResponse))), Promise.reject(t);
                                        }
                                    )
                                );
                            };
                        },
                        function (e, t, n) {
                            var r = n(0);
                            e.exports = function (e, t, n) {
                                return (
                                    r.forEach(n, function (n) {
                                        e = n(e, t);
                                    }),
                                    e
                                );
                            };
                        },
                        function (e, t, n) {
                            e.exports = function (e) {
                                return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e);
                            };
                        },
                        function (e, t, n) {
                            e.exports = function (e, t) {
                                return t ? e.replace(/\/+$/, "") + "/" + t.replace(/^\/+/, "") : e;
                            };
                        },
                        function (e, t, n) {
                            var r = n(6);
                            function o(e) {
                                if ("function" != typeof e) throw new TypeError("executor must be a function.");
                                var t;
                                this.promise = new Promise(function (e) {
                                    t = e;
                                });
                                var n = this;
                                e(function (e) {
                                    n.reason || ((n.reason = new r(e)), t(n.reason));
                                });
                            }
                            (o.prototype.throwIfRequested = function () {
                                if (this.reason) throw this.reason;
                            }),
                                (o.source = function () {
                                    var e;
                                    return {
                                        token: new o(function (t) {
                                            e = t;
                                        }),
                                        cancel: e,
                                    };
                                }),
                                (e.exports = o);
                        },
                        function (e, t, n) {
                            e.exports = function (e) {
                                return function (t) {
                                    return e.apply(null, t);
                                };
                            };
                        },
                    ]);
                },
                929: function (e, t, n) {
                    var r = n(892),
                        o = n(44);
                    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [[e.id, o, ""]]);
                    r(o, { attributes: { class: "formBuilder-injected-style" }, insert: "head", singleton: !1 }), (e.exports = o.locals || {});
                },
                892: function (e, t, n) {
                    var r,
                        o = (function () {
                            var e = {};
                            return function (t) {
                                if (void 0 === e[t]) {
                                    var n = document.querySelector(t);
                                    if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement)
                                        try {
                                            n = n.contentDocument.head;
                                        } catch (e) {
                                            n = null;
                                        }
                                    e[t] = n;
                                }
                                return e[t];
                            };
                        })(),
                        i = [];
                    function s(e) {
                        for (var t = -1, n = 0; n < i.length; n++)
                            if (i[n].identifier === e) {
                                t = n;
                                break;
                            }
                        return t;
                    }
                    function a(e, t) {
                        for (var n = {}, r = [], o = 0; o < e.length; o++) {
                            var a = e[o],
                                l = t.base ? a[0] + t.base : a[0],
                                c = n[l] || 0,
                                u = "".concat(l, " ").concat(c);
                            n[l] = c + 1;
                            var d = s(u),
                                p = { css: a[1], media: a[2], sourceMap: a[3] };
                            -1 !== d ? (i[d].references++, i[d].updater(p)) : i.push({ identifier: u, updater: m(p, t), references: 1 }), r.push(u);
                        }
                        return r;
                    }
                    function l(e) {
                        var t = document.createElement("style"),
                            r = e.attributes || {};
                        if (void 0 === r.nonce) {
                            var i = n.nc;
                            i && (r.nonce = i);
                        }
                        if (
                            (Object.keys(r).forEach(function (e) {
                                t.setAttribute(e, r[e]);
                            }),
                            "function" == typeof e.insert)
                        )
                            e.insert(t);
                        else {
                            var s = o(e.insert || "head");
                            if (!s) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
                            s.appendChild(t);
                        }
                        return t;
                    }
                    var c,
                        u =
                            ((c = []),
                            function (e, t) {
                                return (c[e] = t), c.filter(Boolean).join("\n");
                            });
                    function d(e, t, n, r) {
                        var o = n ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
                        if (e.styleSheet) e.styleSheet.cssText = u(t, o);
                        else {
                            var i = document.createTextNode(o),
                                s = e.childNodes;
                            s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(i, s[t]) : e.appendChild(i);
                        }
                    }
                    function p(e, t, n) {
                        var r = n.css,
                            o = n.media,
                            i = n.sourceMap;
                        if (
                            (o ? e.setAttribute("media", o) : e.removeAttribute("media"),
                            i && btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")),
                            e.styleSheet)
                        )
                            e.styleSheet.cssText = r;
                        else {
                            for (; e.firstChild; ) e.removeChild(e.firstChild);
                            e.appendChild(document.createTextNode(r));
                        }
                    }
                    var f = null,
                        h = 0;
                    function m(e, t) {
                        var n, r, o;
                        if (t.singleton) {
                            var i = h++;
                            (n = f || (f = l(t))), (r = d.bind(null, n, i, !1)), (o = d.bind(null, n, i, !0));
                        } else
                            (n = l(t)),
                                (r = p.bind(null, n, t)),
                                (o = function () {
                                    !(function (e) {
                                        if (null === e.parentNode) return !1;
                                        e.parentNode.removeChild(e);
                                    })(n);
                                });
                        return (
                            r(e),
                            function (t) {
                                if (t) {
                                    if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                                    r((e = t));
                                } else o();
                            }
                        );
                    }
                    e.exports = function (e, t) {
                        (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = (void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), r));
                        var n = a((e = e || []), t);
                        return function (e) {
                            if (((e = e || []), "[object Array]" === Object.prototype.toString.call(e))) {
                                for (var r = 0; r < n.length; r++) {
                                    var o = s(n[r]);
                                    i[o].references--;
                                }
                                for (var l = a(e, t), c = 0; c < n.length; c++) {
                                    var u = s(n[c]);
                                    0 === i[u].references && (i[u].updater(), i.splice(u, 1));
                                }
                                n = l;
                            }
                        };
                    };
                },
            },
            n = {};
        function r(e) {
            var o = n[e];
            if (void 0 !== o) return o.exports;
            var i = (n[e] = { id: e, exports: {} });
            return t[e](i, i.exports, r), i.exports;
        }
        (r.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return r.d(t, { a: t }), t;
        }),
            (r.d = function (e, t) {
                for (var n in t) r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
            }),
            (r.o = function (e, t) {
                return Object.prototype.hasOwnProperty.call(e, t);
            }),
            (r.r = function (e) {
                "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
            }),
            (r.nc = void 0),
            (function () {
                var t = r(747),
                    n = r.n(t);
                const o = ["events"],
                    i = ["tag", "content"];
                function s(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable;
                            })),
                            n.push.apply(n, r);
                    }
                    return n;
                }
                function a(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? s(Object(n), !0).forEach(function (t) {
                                  l(e, t, n[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : s(Object(n)).forEach(function (t) {
                                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                              });
                    }
                    return e;
                }
                function l(e, t, n) {
                    return (
                        (t = (function (e) {
                            var t = (function (e, t) {
                                if ("object" != typeof e || null === e) return e;
                                var n = e[Symbol.toPrimitive];
                                if (void 0 !== n) {
                                    var r = n.call(e, "string");
                                    if ("object" != typeof r) return r;
                                    throw new TypeError("@@toPrimitive must return a primitive value.");
                                }
                                return String(e);
                            })(e);
                            return "symbol" == typeof t ? t : String(t);
                        })(t)) in e
                            ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[t] = n),
                        e
                    );
                }
                function c(e, t) {
                    if (null == e) return {};
                    var n,
                        r,
                        o = (function (e, t) {
                            if (null == e) return {};
                            var n,
                                r,
                                o = {},
                                i = Object.keys(e);
                            for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                            return o;
                        })(e, t);
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(e);
                        for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
                    }
                    return o;
                }
                (window.fbLoaded = { js: [], css: [] }), (window.fbEditors = { quill: {}, tinymce: {} });
                const u = function (e, t) {
                        void 0 === t && (t = !1);
                        const n = [null, void 0, ""];
                        t && n.push(!1);
                        for (const t in e) n.includes(e[t]) ? delete e[t] : Array.isArray(e[t]) && (e[t].length || delete e[t]);
                        return e;
                    },
                    d = function (e) {
                        return !["values", "enableOther", "other", "label", "subtype"].includes(e);
                    },
                    p = (e, t) => {
                        let n;
                        return (e = f(e)), t && (Array.isArray(t) ? (n = j(t.join(" "))) : ("boolean" == typeof t && (t = t.toString()), (n = j(t.trim())))), { name: e, value: (t = t ? `="${n}"` : "") };
                    },
                    f = (e) => ({ className: "class" }[e] || h(e)),
                    h = (e) =>
                        (e = (e = e.replace(/[^\w\s\-]/gi, "")).replace(/([A-Z])/g, function (e) {
                            return "-" + e.toLowerCase();
                        }))
                            .replace(/\s/g, "-")
                            .replace(/^-+/g, ""),
                    m = (e) => e.replace(/-([a-z])/g, (e, t) => t.toUpperCase()),
                    g = (function () {
                        let e,
                            t = 0;
                        return function (n) {
                            const r = new Date().getTime();
                            return r === e ? ++t : ((t = 0), (e = r)), (n.type || h(n.label)) + "-" + r + "-" + t;
                        };
                    })(),
                    b = (e) =>
                        void 0 === e
                            ? e
                            : [
                                  ["array", (e) => Array.isArray(e)],
                                  ["node", (e) => e instanceof window.Node || e instanceof window.HTMLElement],
                                  ["component", () => e && e.dom],
                                  [typeof e, () => !0],
                              ].find((t) => t[1](e))[0],
                    y = function (e, t, n) {
                        void 0 === t && (t = ""), void 0 === n && (n = {});
                        let r = b(t);
                        const { events: s } = n,
                            a = c(n, o),
                            l = document.createElement(e),
                            u = {
                                string: (e) => {
                                    l.innerHTML += e;
                                },
                                object: (e) => {
                                    const { tag: t, content: n } = e,
                                        r = c(e, i);
                                    return l.appendChild(y(t, n, r));
                                },
                                node: (e) => l.appendChild(e),
                                array: (e) => {
                                    for (let t = 0; t < e.length; t++) (r = b(e[t])), u[r](e[t]);
                                },
                                function: (e) => {
                                    (e = e()), (r = b(e)), u[r](e);
                                },
                                undefined: () => {},
                            };
                        for (const e in a)
                            if (a.hasOwnProperty(e)) {
                                const t = f(e),
                                    n = Array.isArray(a[e]) ? C(a[e].join(" ").split(" ")).join(" ") : a[e];
                                if ("boolean" == typeof n) {
                                    if (!0 === n) {
                                        const e = "contenteditable" === t || t;
                                        l.setAttribute(t, e);
                                    }
                                } else l.setAttribute(t, n);
                            }
                        return (
                            t && u[r](t),
                            ((e, t) => {
                                if (t) for (const n in t) t.hasOwnProperty(n) && e.addEventListener(n, (e) => t[n](e));
                            })(l, s),
                            l
                        );
                    },
                    v = (e) => {
                        const t = e.attributes,
                            n = {};
                        return (
                            k(t, (e) => {
                                let r = t[e].value || "";
                                r.match(/false|true/g) ? (r = "true" === r) : r.match(/undefined/g) && (r = void 0), r && (n[m(t[e].name)] = r);
                            }),
                            n
                        );
                    },
                    x = (e) => {
                        const t = [];
                        for (let n = 0; n < e.length; n++) {
                            const r = a(a({}, v(e[n])), {}, { label: e[n].textContent });
                            t.push(r);
                        }
                        return t;
                    },
                    w = (e) => {
                        const t = [];
                        if (e.length) {
                            const n = e[0].getElementsByTagName("value");
                            for (let e = 0; e < n.length; e++) t.push(n[e].textContent);
                        }
                        return t;
                    },
                    q = (e) => {
                        const t = new window.DOMParser().parseFromString(e, "text/xml"),
                            n = [];
                        if (t) {
                            const e = t.getElementsByTagName("field");
                            for (let t = 0; t < e.length; t++) {
                                const r = v(e[t]),
                                    o = e[t].getElementsByTagName("option"),
                                    i = e[t].getElementsByTagName("userData");
                                o && o.length && (r.values = x(o)), i && i.length && (r.userData = w(i)), n.push(r);
                            }
                        }
                        return n;
                    },
                    O = (e) => {
                        const t = document.createElement("textarea");
                        return (t.innerHTML = e), t.textContent;
                    },
                    j = (e) => {
                        const t = { '"': "&quot;", "&": "&amp;", "<": "&lt;", ">": "&gt;" };
                        return "string" == typeof e ? e.replace(/["&<>]/g, (e) => t[e] || e) : e;
                    },
                    k = function (e, t, n) {
                        for (let r = 0; r < e.length; r++) t.call(n, r, e[r]);
                    },
                    C = (e) => e.filter((e, t, n) => n.indexOf(e) === t),
                    S = (e, t) => {
                        const n = jQuery;
                        let r = [];
                        return (
                            Array.isArray(e) || (e = [e]),
                            E(e) ||
                                (r = jQuery.map(e, (e) => {
                                    const n = { dataType: "script", cache: !0, url: (t || "") + e };
                                    return jQuery.ajax(n).done(() => window.fbLoaded.js.push(e));
                                })),
                            r.push(jQuery.Deferred((e) => n(e.resolve))),
                            jQuery.when(...r)
                        );
                    },
                    E = function (e, t) {
                        void 0 === t && (t = "js");
                        let n = !1;
                        const r = window.fbLoaded[t];
                        return (n = Array.isArray(e) ? e.every((e) => r.includes(e)) : r.includes(e)), n;
                    },
                    A = (t, n) => {
                        Array.isArray(t) || (t = [t]),
                            t.forEach((t) => {
                                let r = "href",
                                    o = t,
                                    i = "";
                                if (("object" == typeof t && ((r = t.type || (t.style ? "inline" : "href")), (i = t.id), (o = i || t.href || t.style), (t = "inline" == r ? t.style : t.href)), !E(o, "css"))) {
                                    if ("href" == r) {
                                        const e = document.createElement("link");
                                        (e.type = "text/css"), (e.rel = "stylesheet"), (e.href = (n || "") + t), document.head.appendChild(e);
                                    } else e(`<style type="text/css">${t}</style>`).attr("id", i).appendTo(e(document.head));
                                    window.fbLoaded.css.push(o);
                                }
                            });
                    },
                    T = (e, t) => {
                        const n = Object.assign({}, e, t);
                        for (const r in t) n.hasOwnProperty(r) && (Array.isArray(t[r]) ? (n[r] = Array.isArray(e[r]) ? C(e[r].concat(t[r])) : t[r]) : "object" == typeof t[r] ? (n[r] = T(e[r], t[r])) : (n[r] = t[r]));
                        return n;
                    },
                    L = /^col-(xs|sm|md|lg)-([^\s]+)/,
                    R = {
                        addEventListeners: (e, t, n) => t.split(" ").forEach((t) => e.addEventListener(t, n, !1)),
                        attrString: (e) =>
                            Object.entries(e)
                                .map((e) => {
                                    let [t, n] = e;
                                    return d(t) && Object.values(p(t, n)).join("");
                                })
                                .filter(Boolean)
                                .join(" "),
                        camelCase: m,
                        capitalize: (e) =>
                            e.replace(/\b\w/g, function (e) {
                                return e.toUpperCase();
                            }),
                        closest: (e, t) => {
                            const n = t.replace(".", "");
                            for (; (e = e.parentElement) && !e.classList.contains(n); );
                            return e;
                        },
                        getContentType: b,
                        escapeAttr: j,
                        escapeAttrs: (e) => {
                            for (const t in e) e.hasOwnProperty(t) && (e[t] = j(e[t]));
                            return e;
                        },
                        escapeHtml: (e) => {
                            const t = document.createElement("textarea");
                            return (t.textContent = e), t.innerHTML;
                        },
                        forceNumber: (e) => e.replace(/[^0-9]/g, ""),
                        forEach: k,
                        getScripts: S,
                        getStyles: A,
                        hyphenCase: h,
                        isCached: E,
                        markup: y,
                        merge: T,
                        mobileClass: () => {
                            let e = "";
                            var t;
                            return (
                                (t = navigator.userAgent || navigator.vendor || window.opera),
                                /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
                                    t
                                ) && (e = "formbuilder-mobile"),
                                e
                            );
                        },
                        nameAttr: g,
                        parseAttrs: v,
                        parsedHtml: O,
                        parseOptions: x,
                        parseUserData: w,
                        parseXML: q,
                        removeFromArray: (e, t) => {
                            const n = t.indexOf(e);
                            n > -1 && t.splice(n, 1);
                        },
                        safeAttr: p,
                        safeAttrName: f,
                        safename: (e) => e.replace(/\s/g, "-").replace(/[^a-zA-Z0-9[\]_-]/g, ""),
                        subtract: (e, t) =>
                            t.filter(function (e) {
                                return !~this.indexOf(e);
                            }, e),
                        trimObj: u,
                        unique: C,
                        validAttr: d,
                        titleCase: function (e) {
                            const t = ["a", "an", "and", "as", "at", "but", "by", "for", "for", "from", "in", "into", "near", "nor", "of", "on", "onto", "or", "the", "to", "with"].map((e) => `\\s${e}\\s`),
                                n = new RegExp(`(?!${t.join("|")})\\w\\S*`, "g");
                            return `${e}`.replace(n, (e) => e.charAt(0).toUpperCase() + e.substr(1).replace(/[A-Z]/g, (e) => ` ${e}`));
                        },
                        splitObject: (e, t) => {
                            const n = (e) => (t, n) => ((t[n] = e[n]), t);
                            return [
                                Object.keys(e)
                                    .filter((e) => t.includes(e))
                                    .reduce(n(e), {}),
                                Object.keys(e)
                                    .filter((e) => !t.includes(e))
                                    .reduce(n(e), {}),
                            ];
                        },
                    };
                e.fn.swapWith = function (t) {
                    var n = this,
                        r = e(t),
                        o = e("<div>");
                    return n.before(o), r.before(n), o.before(r).remove(), n;
                };
                var D = R;
                const N = function (e, t, n) {
                    void 0 === n && (n = !0);
                    const r = [];
                    let o = ["none", "block"];
                    n && (o = o.reverse());
                    for (let n = e.length - 1; n >= 0; n--) -1 !== e[n].textContent.toLowerCase().indexOf(t.toLowerCase()) ? ((e[n].style.display = o[0]), r.push(e[n])) : (e[n].style.display = o[1]);
                    return r;
                };
                function P(e) {
                    let t;
                    return "function" == typeof Event ? (t = new Event(e)) : ((t = document.createEvent("Event")), t.initEvent(e, !0, !0)), t;
                }
                new RegExp(`(${["select", "checkbox-group", "checkbox", "radio-group", "autocomplete"].join("|")})`);
                var F = {
                    loaded: P("loaded"),
                    viewData: P("viewData"),
                    userDeclined: P("userDeclined"),
                    modalClosed: P("modalClosed"),
                    modalOpened: P("modalOpened"),
                    formSaved: P("formSaved"),
                    fieldAdded: P("fieldAdded"),
                    fieldRemoved: P("fieldRemoved"),
                    fieldRendered: P("fieldRendered"),
                    fieldEditOpened: P("fieldEditOpened"),
                    fieldEditClosed: P("fieldEditClosed"),
                };
                const M = (e, t) => {
                    let n = e.id ? `formbuilder-${e.type} form-group field-${e.id}` : "";
                    if (e.className) {
                        const r = ((e) => e.split(" ").filter((e) => L.test(e) || e.startsWith("row-")))(e.className);
                        r && r.length > 0 && (n += ` ${r.join(" ")}`),
                            t.classList && t.classList.remove(...r),
                            Array.isArray(t) || (t = [t]),
                            t.forEach((e) =>
                                e.querySelectorAll("[class*=row-],[class*=col-]").forEach((e) => {
                                    e.classList && e.classList.remove(...r);
                                })
                            );
                    }
                    return n;
                };
                class B {
                    constructor(e, t, n) {
                        var r, o;
                        void 0 === t && (t = !1),
                            void 0 === n && (n = !1),
                            (this.preview = null !== (r = t) && void 0 !== r && r),
                            (this.disableHTMLLabels = null !== (o = n) && void 0 !== o && o),
                            (this.templates = {
                                label: null,
                                help: null,
                                default: (e, t, n, r) => (n && t.appendChild(n), this.markup("div", [t, e], { className: M(r, e) })),
                                noLabel: (e, t, n, r) => this.markup("div", e, { className: M(r, e) }),
                                hidden: (e) => e,
                            }),
                            e && (this.templates = jQuery.extend(this.templates, e)),
                            this.configure();
                    }
                    configure() {}
                    build(e, t, n) {
                        this.preview && (t.name ? (t.name = t.name + "-preview") : (t.name = D.nameAttr(t) + "-preview")), (t.id = t.name), (this.data = jQuery.extend({}, t));
                        const r = new e(t, this.preview);
                        let o = r.build();
                        ("object" == typeof o && o.field) || (o = { field: o });
                        const i = this.label(),
                            s = this.help();
                        let a;
                        a = n && this.isTemplate(n) ? n : this.isTemplate(o.layout) ? o.layout : "default";
                        const l = this.processTemplate(a, o.field, i, s);
                        return r.on("prerender")(l), l.addEventListener("fieldRendered", r.on("render")), l;
                    }
                    label() {
                        const e = this.data.label || "",
                            t = [this.disableHTMLLabels ? document.createTextNode(e) : D.parsedHtml(e)];
                        return (
                            this.data.required && t.push(this.markup("span", "*", { className: "formbuilder-required" })),
                            this.isTemplate("label") ? this.processTemplate("label", t) : this.markup("label", t, { for: this.data.id, className: `formbuilder-${this.data.type}-label` })
                        );
                    }
                    help() {
                        return this.data.description ? (this.isTemplate("help") ? this.processTemplate("help", this.data.description) : this.markup("span", "?", { className: "tooltip-element", tooltip: this.data.description })) : null;
                    }
                    isTemplate(e) {
                        return "function" == typeof this.templates[e];
                    }
                    processTemplate(e) {
                        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
                        let o = this.templates[e](...n, this.data);
                        return o.jquery && (o = o[0]), o;
                    }
                    markup(e, t, n) {
                        return void 0 === t && (t = ""), void 0 === n && (n = {}), D.markup(e, t, n);
                    }
                }
                const U = ["label", "type"];
                class z {
                    constructor(e, t) {
                        (this.rawConfig = jQuery.extend({}, e)), (e = jQuery.extend({}, e)), (this.preview = t), delete e.isPreview, this.preview && delete e.required;
                        const n = ["label", "description", "subtype", "required", "disabled"];
                        for (const t of n) (this[t] = e[t]), delete e[t];
                        e.id || (e.name ? (e.id = e.name) : (e.id = "control-" + Math.floor(1e7 * Math.random() + 1))),
                            (this.id = e.id),
                            (this.type = e.type),
                            this.description && (e.title = this.description),
                            z.controlConfig || (z.controlConfig = {});
                        const r = this.subtype ? this.type + "." + this.subtype : this.type;
                        (this.classConfig = jQuery.extend({}, z.controlConfig[r] || {})),
                            this.subtype && (e.type = this.subtype),
                            this.required && ((e.required = "required"), (e["aria-required"] = "true")),
                            this.disabled && (e.disabled = "disabled"),
                            (this.config = e),
                            this.configure();
                    }
                    static get definition() {
                        return {};
                    }
                    static register(e, t, n) {
                        const r = n ? n + "." : "";
                        z.classRegister || (z.classRegister = {}), Array.isArray(e) || (e = [e]);
                        for (const n of e) -1 === n.indexOf(".") ? (z.classRegister[r + n] = t) : z.error(`Ignoring type ${n}. Cannot use the character '.' in a type name.`);
                    }
                    static getRegistered(e) {
                        void 0 === e && (e = !1);
                        const t = Object.keys(z.classRegister);
                        return t.length ? t.filter((t) => (e ? t.indexOf(e + ".") > -1 : -1 == t.indexOf("."))) : t;
                    }
                    static getRegisteredSubtypes() {
                        const e = {};
                        for (const t in z.classRegister)
                            if (z.classRegister.hasOwnProperty(t)) {
                                const [n, r] = t.split(".");
                                if (!r) continue;
                                e[n] || (e[n] = []), e[n].push(r);
                            }
                        return e;
                    }
                    static getClass(e, t) {
                        const n = t ? e + "." + t : e;
                        return z.classRegister[n] || z.classRegister[e] || z.error("Invalid control type. (Type: " + e + ", Subtype: " + t + "). Please ensure you have registered it, and imported it correctly.");
                    }
                    static loadCustom(e) {
                        let t = [];
                        if ((e && (t = t.concat(e)), window.fbControls && (t = t.concat(window.fbControls)), !this.fbControlsLoaded)) {
                            for (const e of t) e(z, z.classRegister);
                            this.fbControlsLoaded = !0;
                        }
                    }
                    static mi18n(e, t) {
                        const r = this.definition;
                        let o = r.i18n || {};
                        o = o[n().locale] || o.default || o;
                        const i = this.camelCase(e),
                            s = "object" == typeof o ? o[i] || o[e] : o;
                        if (s) return s;
                        let a = r.mi18n;
                        return "object" == typeof a && (a = a[i] || a[e]), a || (a = i), n().get(a, t);
                    }
                    static active(e) {
                        return !Array.isArray(this.definition.inactive) || -1 == this.definition.inactive.indexOf(e);
                    }
                    static label(e) {
                        return this.mi18n(e);
                    }
                    static icon(e) {
                        const t = this.definition;
                        return t && "object" == typeof t.icon ? t.icon[e] : t.icon;
                    }
                    configure() {}
                    build() {
                        const e = this.config,
                            { label: t, type: n } = e,
                            r = (function (e, t) {
                                if (null == e) return {};
                                var n,
                                    r,
                                    o = (function (e, t) {
                                        if (null == e) return {};
                                        var n,
                                            r,
                                            o = {},
                                            i = Object.keys(e);
                                        for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                                        return o;
                                    })(e, t);
                                if (Object.getOwnPropertySymbols) {
                                    var i = Object.getOwnPropertySymbols(e);
                                    for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
                                }
                                return o;
                            })(e, U);
                        return this.markup(n, O(t), r);
                    }
                    on(e) {
                        const t = {
                            prerender: (e) => e,
                            render: (e) => {
                                const t = () => {
                                    this.onRender && this.onRender(e);
                                };
                                this.css && A(this.css), this.js && !E(this.js) ? S(this.js).done(t) : t();
                            },
                        };
                        return e ? t[e] : t;
                    }
                    static error(e) {
                        throw new Error(e);
                    }
                    markup(e, t, n) {
                        return void 0 === t && (t = ""), void 0 === n && (n = {}), (this.element = y(e, t, n)), this.element;
                    }
                    parsedHtml(e) {
                        return O(e);
                    }
                    static camelCase(e) {
                        return m(e);
                    }
                }
                const $ = ["values", "type"];
                z.register(
                    "autocomplete",
                    class extends z {
                        static get definition() {
                            return { mi18n: { requireValidOption: "requireValidOption" } };
                        }
                        build() {
                            const e = this.config,
                                { values: t, type: n } = e,
                                r = (function (e, t) {
                                    if (null == e) return {};
                                    var n,
                                        r,
                                        o = (function (e, t) {
                                            if (null == e) return {};
                                            var n,
                                                r,
                                                o = {},
                                                i = Object.keys(e);
                                            for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                                            return o;
                                        })(e, t);
                                    if (Object.getOwnPropertySymbols) {
                                        var i = Object.getOwnPropertySymbols(e);
                                        for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
                                    }
                                    return o;
                                })(e, $),
                                o = (e) => {
                                    const t = e.target.nextSibling.nextSibling,
                                        n = e.target.nextSibling,
                                        r = this.getActiveOption(t);
                                    let o = new Map([
                                        [
                                            38,
                                            () => {
                                                const e = this.getPreviousOption(r);
                                                e && this.selectOption(t, e);
                                            },
                                        ],
                                        [
                                            40,
                                            () => {
                                                const e = this.getNextOption(r);
                                                e && this.selectOption(t, e);
                                            },
                                        ],
                                        [
                                            13,
                                            () => {
                                                r
                                                    ? ((e.target.value = r.innerHTML), (n.value = r.getAttribute("value")), "none" === t.style.display ? this.showList(t, r) : this.hideList(t))
                                                    : this.config.requireValidOption && (this.isOptionValid(t, e.target.value) || ((e.target.value = ""), (e.target.nextSibling.value = ""))),
                                                    e.preventDefault();
                                            },
                                        ],
                                        [
                                            27,
                                            () => {
                                                this.hideList(t);
                                            },
                                        ],
                                    ]).get(e.keyCode);
                                    return o || (o = () => !1), o();
                                },
                                i = {
                                    focus: (e) => {
                                        const t = e.target.nextSibling.nextSibling,
                                            n = N(t.querySelectorAll("li"), e.target.value);
                                        if ((e.target.addEventListener("keydown", o), e.target.value.length > 0)) {
                                            const e = n.length > 0 ? n[n.length - 1] : null;
                                            this.showList(t, e);
                                        }
                                    },
                                    blur: (e) => {
                                        e.target.removeEventListener("keydown", o);
                                        const t = setTimeout(() => {
                                            (e.target.nextSibling.nextSibling.style.display = "none"), clearTimeout(t);
                                        }, 200);
                                        if (this.config.requireValidOption) {
                                            const t = e.target.nextSibling.nextSibling;
                                            this.isOptionValid(t, e.target.value) || ((e.target.value = ""), (e.target.nextSibling.value = ""));
                                        }
                                    },
                                    input: (e) => {
                                        const t = e.target.nextSibling.nextSibling;
                                        e.target.nextSibling.value = e.target.value;
                                        const n = N(t.querySelectorAll("li"), e.target.value);
                                        if (0 == n.length) this.hideList(t);
                                        else {
                                            let e = this.getActiveOption(t);
                                            e || (e = n[n.length - 1]), this.showList(t, e);
                                        }
                                    },
                                },
                                s = Object.assign({}, r, { id: `${r.id}-input`, autocomplete: "off", events: i }),
                                a = Object.assign({}, r, { type: "hidden" });
                            delete s.name;
                            const l = [this.markup("input", null, s), this.markup("input", null, a)],
                                c = t.map((e) => {
                                    const t = e.label,
                                        n = {
                                            events: {
                                                click: (t) => {
                                                    const n = t.target.parentElement,
                                                        r = n.previousSibling.previousSibling;
                                                    (r.value = e.label), (r.nextSibling.value = e.value), this.hideList(n);
                                                },
                                            },
                                            value: e.value,
                                        };
                                    return this.markup("li", t, n);
                                });
                            return l.push(this.markup("ul", c, { id: `${r.id}-list`, className: `formbuilder-${n}-list` })), l;
                        }
                        hideList(e) {
                            this.selectOption(e, null), (e.style.display = "none");
                        }
                        showList(e, t) {
                            this.selectOption(e, t), (e.style.display = "block"), (e.style.width = e.parentElement.offsetWidth + "px");
                        }
                        getActiveOption(e) {
                            const t = e.getElementsByClassName("active-option")[0];
                            return t && "none" !== t.style.display ? t : null;
                        }
                        getPreviousOption(e) {
                            let t = e;
                            do {
                                t = t ? t.previousSibling : null;
                            } while (null != t && "none" === t.style.display);
                            return t;
                        }
                        getNextOption(e) {
                            let t = e;
                            do {
                                t = t ? t.nextSibling : null;
                            } while (null != t && "none" === t.style.display);
                            return t;
                        }
                        selectOption(e, t) {
                            const n = e.querySelectorAll("li");
                            for (let e = 0; e < n.length; e++) n[e].classList.remove("active-option");
                            t && t.classList.add("active-option");
                        }
                        isOptionValid(e, t) {
                            const n = e.querySelectorAll("li");
                            let r = !1;
                            for (let e = 0; e < n.length; e++)
                                if (n[e].innerHTML === t) {
                                    r = !0;
                                    break;
                                }
                            return r;
                        }
                        onRender(t) {
                            if (this.config.userData) {
                                const t = e("#" + this.config.name),
                                    n = t.next(),
                                    r = this.config.userData[0];
                                let o = null;
                                if (
                                    (n.find("li").each(function () {
                                        e(this).attr("value") !== r || (o = e(this).get(0));
                                    }),
                                    null === o)
                                )
                                    return this.config.requireValidOption ? void 0 : void t.prev().val(this.config.userData[0]);
                                t.prev().val(o.innerHTML), t.val(o.getAttribute("value"));
                                const i = t.next().get(0);
                                "none" === i.style.display ? this.showList(i, o) : this.hideList(i);
                            }
                            return t;
                        }
                    }
                );
                class H extends z {
                    build() {
                        return { field: this.markup("button", this.label, this.config), layout: "noLabel" };
                    }
                }
                z.register("button", H), z.register(["button", "submit", "reset"], H, "button");
                class I extends z {
                    static register(e, t) {
                        void 0 === e && (e = {}), void 0 === t && (t = []), (I.customRegister = {}), I.def || (I.def = { icon: {}, i18n: {} }), (I.templates = e);
                        const r = n().locale;
                        I.def.i18n[r] || (I.def.i18n[r] = {}), z.register(Object.keys(e), I);
                        for (const n of t) {
                            let t = n.type;
                            if (((n.attrs = n.attrs || {}), !t)) {
                                if (!n.attrs.type) {
                                    this.error("Ignoring invalid custom field definition. Please specify a type property.");
                                    continue;
                                }
                                t = n.attrs.type;
                            }
                            let o = n.subtype || t;
                            if (!e[t]) {
                                const e = z.getClass(t, n.subtype);
                                if (!e) {
                                    this.error("Error while registering custom field: " + t + (n.subtype ? ":" + n.subtype : "") + ". Unable to find any existing defined control or template for rendering.");
                                    continue;
                                }
                                (o = n.datatype ? n.datatype : `${t}-${Math.floor(9e3 * Math.random() + 1e3)}`), (I.customRegister[o] = jQuery.extend(n, { type: t, class: e }));
                            }
                            (I.def.i18n[r][o] = n.label), (I.def.icon[o] = n.icon);
                        }
                    }
                    static getRegistered(e) {
                        return void 0 === e && (e = !1), e ? z.getRegistered(e) : Object.keys(I.customRegister);
                    }
                    static lookup(e) {
                        return I.customRegister[e];
                    }
                    static get definition() {
                        return I.def;
                    }
                    build() {
                        let e = I.templates[this.type];
                        if (!e) return this.error("Invalid custom control type. Please ensure you have registered it correctly as a template option.");
                        const t = Object.assign(this.config),
                            n = ["label", "description", "subtype", "id", "isPreview", "required", "title", "aria-required", "type"];
                        for (const e of n) t[e] = this.config[e] || this[e];
                        return (e = e.bind(this)), (e = e(t)), e.js && (this.js = e.js), e.css && (this.css = e.css), (this.onRender = e.onRender), { field: e.field, layout: e.layout };
                    }
                }
                I.customRegister = {};
                z.register(
                    "hidden",
                    class extends z {
                        build() {
                            return (this.field = this.markup("input", null, this.config)), { field: this.field, layout: "hidden" };
                        }
                        onRender() {
                            this.config.userData && e(this.field).val(this.config.userData[0]);
                        }
                    }
                );
                const V = ["type"];
                class _ extends z {
                    build() {
                        const e = this.config,
                            { type: t } = e,
                            n = (function (e, t) {
                                if (null == e) return {};
                                var n,
                                    r,
                                    o = (function (e, t) {
                                        if (null == e) return {};
                                        var n,
                                            r,
                                            o = {},
                                            i = Object.keys(e);
                                        for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                                        return o;
                                    })(e, t);
                                if (Object.getOwnPropertySymbols) {
                                    var i = Object.getOwnPropertySymbols(e);
                                    for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
                                }
                                return o;
                            })(e, V);
                        let r = t;
                        const o = { paragraph: "p", header: this.subtype };
                        return o[t] && (r = o[t]), { field: this.markup(r, D.parsedHtml(this.label), n), layout: "noLabel" };
                    }
                }
                z.register(["paragraph", "header"], _), z.register(["p", "address", "blockquote", "canvas", "output"], _, "paragraph"), z.register(["h1", "h2", "h3", "h4", "h5", "h6"], _, "header");
                const Q = ["values", "value", "placeholder", "type", "inline", "other", "toggle"],
                    X = ["label"];
                function W(e, t) {
                    if (null == e) return {};
                    var n,
                        r,
                        o = (function (e, t) {
                            if (null == e) return {};
                            var n,
                                r,
                                o = {},
                                i = Object.keys(e);
                            for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                            return o;
                        })(e, t);
                    if (Object.getOwnPropertySymbols) {
                        var i = Object.getOwnPropertySymbols(e);
                        for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
                    }
                    return o;
                }
                z.register(
                    ["select", "checkbox-group", "radio-group", "checkbox"],
                    class extends z {
                        static get definition() {
                            return { inactive: ["checkbox"], mi18n: { minSelectionRequired: "minSelectionRequired" } };
                        }
                        build() {
                            const e = [],
                                t = this.config,
                                { values: n, value: r, placeholder: o, type: i, inline: s, other: a, toggle: l } = t,
                                c = W(t, Q),
                                d = i.replace("-group", ""),
                                p = "select" === i;
                            if (((c.multiple || "checkbox-group" === i) && (c.name = c.name + "[]"), "checkbox-group" === i && c.required)) {
                                const e = this,
                                    t = this.onRender.bind(this);
                                this.onRender = function () {
                                    t(), e.groupRequired();
                                };
                            }
                            if ((delete c.title, n)) {
                                o && p && e.push(this.markup("option", o, { disabled: null, selected: null }));
                                for (let t = 0; t < n.length; t++) {
                                    let i = n[t];
                                    "string" == typeof i && (i = { label: i, value: i });
                                    const { label: a = "" } = i,
                                        u = W(i, X);
                                    if (((u.id = `${c.id}-${t}`), (u.selected && !o) || delete u.selected, void 0 !== r && u.value === r && (u.selected = !0), p)) {
                                        const t = this.markup("option", document.createTextNode(a), u);
                                        e.push(t);
                                    } else {
                                        const t = [a];
                                        let n = `formbuilder-${d}`;
                                        s && (n += "-inline"), (u.type = d), u.selected && ((u.checked = "checked"), delete u.selected);
                                        const r = this.markup("input", null, Object.assign({}, c, u)),
                                            o = { for: u.id };
                                        let i = [r, this.markup("label", t, o)];
                                        l && ((o.className = "kc-toggle"), t.unshift(r, this.markup("span")), (i = this.markup("label", t, o)));
                                        const p = this.markup("div", i, { className: n });
                                        e.push(p);
                                    }
                                }
                                if (!p && a) {
                                    var f;
                                    const t = { id: `${c.id}-other`, className: `${null !== (f = c.className) && void 0 !== f ? f : ""} other-option`, value: "" };
                                    let n = `formbuilder-${d}`;
                                    s && (n += "-inline");
                                    const r = Object.assign({}, c, t);
                                    r.type = d;
                                    const o = {
                                            type: "text",
                                            events: {
                                                input: (e) => {
                                                    const t = e.target;
                                                    t.parentElement.previousElementSibling.value = t.value;
                                                },
                                            },
                                            id: `${t.id}-value`,
                                            className: "other-val",
                                        },
                                        i = this.markup("input", null, r),
                                        a = [document.createTextNode(z.mi18n("other")), this.markup("input", null, o)],
                                        l = this.markup("label", a, { for: r.id }),
                                        u = this.markup("div", [i, l], { className: n });
                                    e.push(u);
                                }
                            }
                            return (this.dom = "select" == i ? this.markup(d, e, u(c, !0)) : this.markup("div", e, { className: i })), this.dom;
                        }
                        groupRequired() {
                            const e = this.element.getElementsByTagName("input"),
                                t = () => {
                                    const t = [].some.call(e, (e) => e.checked);
                                    ((e, t) => {
                                        [].forEach.call(e, (e) => {
                                            t ? e.removeAttribute("required") : e.setAttribute("required", "required"),
                                                ((e, t) => {
                                                    const n = z.mi18n("minSelectionRequired", 1);
                                                    t ? e.setCustomValidity("") : e.setCustomValidity(n);
                                                })(e, t);
                                        });
                                    })(e, t);
                                };
                            for (let n = e.length - 1; n >= 0; n--) e[n].addEventListener("change", t);
                            t();
                        }
                        onRender() {
                            if (this.config.userData) {
                                const t = this.config.userData.slice();
                                "select" === this.config.type
                                    ? e(this.dom).val(t).prop("selected", !0)
                                    : this.config.type.endsWith("-group") &&
                                      ("checkbox-group" === this.config.type &&
                                          this.dom.querySelectorAll("input[type=checkbox]").forEach((e) => {
                                              e.removeAttribute("checked");
                                          }),
                                      this.dom.querySelectorAll("input").forEach((e) => {
                                          if (!e.classList.contains("other-val")) {
                                              for (let n = 0; n < t.length; n++)
                                                  if (e.value === t[n]) {
                                                      e.setAttribute("checked", "checked"), t.splice(n, 1);
                                                      break;
                                                  }
                                              if (e.id.endsWith("-other")) {
                                                  const n = document.getElementById(`${e.id}-value`);
                                                  if (0 === t.length) return;
                                                  e.setAttribute("checked", "checked"), (n.value = e.value = t[0]), (n.style.display = "inline-block");
                                              }
                                          }
                                      }));
                            }
                        }
                    }
                );

                class kh extends z {
                    static get definition() {
                        return { mi18n: { separator: "Separator" }};
                    }
                    configure() {
                        (this.js = [
                            
                        ]),
                        (this.css = []),
                        ["js"].forEach((e) => delete this.classConfig[e]);
                        
                    }
                    build() {
                        let { name: e } = this.config;
                        e = this.config.multiple ? e + "[]" : e;
                        const t = Object.assign({}, this.config, { name: e }, {style: 'height:'+this.config.space+'px'});
    
                        return (this.dom = this.markup("div", null, t)), this.dom;
                    }
                    onRender() {
                        this.config.userData && e(this.dom).val(this.config.userData[0]);
                    }
                }
                z.register('separator', kh);

                class J extends z {
                    static get definition() {
                        return { mi18n: { date: "dateField", file: "fileUpload" } };
                    }
                    build() {
                        let { name: e } = this.config;
                        e = this.config.multiple ? `${e}[]` : e;
                        const t = Object.assign({}, this.config, { name: e });
                        return (this.dom = this.markup("input", null, t)), this.dom;
                    }
                    onRender() {
                        this.config.userData && e(this.dom).val(this.config.userData[0]);
                    }
                }
                z.register(["text", "file", "date", "number"], J), z.register(["text", "password", "email", "color", "tel"], J, "text");
                J.register("file", J, "file"),
                    J.register(
                        "fineuploader",
                        class extends J {
                            static get definition() {
                                return { i18n: { default: "Fine Uploader" } };
                            }
                            configure() {
                                (this.js = this.classConfig.js || owcpv_pluin_url.plugin_url+"assets/js/libs/jquery.fine-uploader.min.js"),
                                    (this.css = [
                                        this.classConfig.css || owcpv_pluin_url.plugin_url+"assets/css/libs/fine-uploader-gallery.min.css",
                                        {
                                            type: "inline",
                                            id: "fineuploader-inline",
                                            style:
                                                "\n          .qq-uploader .qq-error-message {\n            position: absolute;\n            left: 20%;\n            top: 20px;\n            width: 60%;\n            color: #a94442;\n            background: #f2dede;\n            border: solid 1px #ebccd1;\n            padding: 15px;\n            line-height: 1.5em;\n            text-align: center;\n            z-index: 99999;\n          }\n          .qq-uploader .qq-error-message span {\n            display: inline-block;\n            text-align: left;\n          }",
                                        },
                                    ]),
                                    (this.handler = this.classConfig.handler || "/upload"),
                                    ["js", "css", "handler"].forEach((e) => delete this.classConfig[e]);
                                const t =
                                    this.classConfig.template ||
                                    '\n      <div class="qq-uploader-selector qq-uploader qq-gallery" qq-drop-area-text="Drop files here">\n        <div class="qq-total-progress-bar-container-selector qq-total-progress-bar-container">\n          <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-total-progress-bar-selector qq-progress-bar qq-total-progress-bar"></div>\n        </div>\n        <div class="qq-upload-drop-area-selector qq-upload-drop-area" qq-hide-dropzone>\n          <span class="qq-upload-drop-area-text-selector"></span>\n        </div>\n        <div class="qq-upload-button-selector qq-upload-button">\n          <div>Upload file</div>\n        </div>\n        <span class="qq-drop-processing-selector qq-drop-processing">\n          <span>Processing dropped files...</span>\n          <span class="qq-drop-processing-spinner-selector qq-drop-processing-spinner"></span>\n        </span>\n        <ul class="qq-upload-list-selector qq-upload-list" role="region" aria-live="polite" aria-relevant="additions removals">\n          <li>\n            <span role="status" class="qq-upload-status-text-selector qq-upload-status-text"></span>\n            <div class="qq-progress-bar-container-selector qq-progress-bar-container">\n              <div role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" class="qq-progress-bar-selector qq-progress-bar"></div>\n            </div>\n            <span class="qq-upload-spinner-selector qq-upload-spinner"></span>\n            <div class="qq-thumbnail-wrapper">\n              <img class="qq-thumbnail-selector" qq-max-size="120" qq-server-scale>\n            </div>\n            <button type="button" class="qq-upload-cancel-selector qq-upload-cancel">X</button>\n            <button type="button" class="qq-upload-retry-selector qq-upload-retry">\n              <span class="qq-btn qq-retry-icon" aria-label="Retry"></span>\n              Retry\n            </button>\n            <div class="qq-file-info">\n              <div class="qq-file-name">\n                <span class="qq-upload-file-selector qq-upload-file"></span>\n                <span class="qq-edit-filename-icon-selector qq-btn qq-edit-filename-icon" aria-label="Edit filename"></span>\n              </div>\n              <input class="qq-edit-filename-selector qq-edit-filename" tabindex="0" type="text">\n              <span class="qq-upload-size-selector qq-upload-size"></span>\n              <button type="button" class="qq-btn qq-upload-delete-selector qq-upload-delete">\n                <span class="qq-btn qq-delete-icon" aria-label="Delete"></span>\n              </button>\n              <button type="button" class="qq-btn qq-upload-pause-selector qq-upload-pause">\n                <span class="qq-btn qq-pause-icon" aria-label="Pause"></span>\n              </button>\n              <button type="button" class="qq-btn qq-upload-continue-selector qq-upload-continue">\n                <span class="qq-btn qq-continue-icon" aria-label="Continue"></span>\n              </button>\n            </div>\n          </li>\n        </ul>\n      </div>';
                                this.fineTemplate = e("<div/>").attr("id", "qq-template").html(t);
                            }
                            build() {
                                return (
                                    (this.input = this.markup("input", null, { type: "hidden", name: this.config.name, id: this.config.name })),
                                    (this.wrapper = this.markup("div", "", { id: this.config.name + "-wrapper" })),
                                    [this.input, this.wrapper]
                                );
                            }
                            onRender() {
                                const t = e(this.wrapper),
                                    n = e(this.input),
                                    r = jQuery.extend(
                                        !0,
                                        {
                                            request: { endpoint: this.handler },
                                            deleteFile: { enabled: 1, endpoint: this.handler },
                                            chunking: { enabled: 0, concurrent: { enabled: !0 }, success: { endpoint: this.handler + (-1 == this.handler.indexOf("?") ? "?" : "&") + "done" } },
                                            resume: { enabled: !0 },
                                            retry: { enableAuto: !0, showButton: !0 },
                                            callbacks: {
                                                onError: (n, r, o) => {
                                                    "." != o.slice(-1) && (o += ".");
                                                    const i = e("<div />").addClass("qq-error-message").html(`<span>Error processing upload: <b>${r}</b>.<br />Reason: ${o}</span>`).prependTo(t.find(".qq-uploader")),
                                                        s = window.setTimeout(() => {
                                                            i.fadeOut(() => {
                                                                i.remove(), window.clearTimeout(s);
                                                            });
                                                        }, 6e3);
                                                    return n;
                                                },
                                                onStatusChange: (e, r, o) => {
                                                    const i = t.fineUploader("getUploads"),
                                                        s = [];
                                                    for (const e of i) "upload successful" == e.status && s.push(e.name);
                                                    return n.val(s.join(", ")), { id: e, oldStatus: r, newStatus: o };
                                                },
                                            },
                                            template: this.fineTemplate,
                                        },
                                        this.classConfig
                                    );
                                    console.log(r);
                                t.fineUploader(r);
                            }
                        },
                        "file"
                    );
                const G = ["value"];
                class Z extends z {
                    static get definition() {
                        return { mi18n: { textarea: "textArea" } };
                    }
                    build() {
                        const e = this.config,
                            { value: t = "" } = e,
                            n = (function (e, t) {
                                if (null == e) return {};
                                var n,
                                    r,
                                    o = (function (e, t) {
                                        if (null == e) return {};
                                        var n,
                                            r,
                                            o = {},
                                            i = Object.keys(e);
                                        for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                                        return o;
                                    })(e, t);
                                if (Object.getOwnPropertySymbols) {
                                    var i = Object.getOwnPropertySymbols(e);
                                    for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
                                }
                                return o;
                            })(e, G);
                        return delete n.type, (this.field = this.markup("textarea", this.parsedHtml(t), n)), this.field;
                    }
                    onRender() {
                        this.config.userData && e(this.field).val(this.config.userData[0]);
                    }
                    on(t) {
                        return "prerender" == t && this.preview
                            ? (t) => {
                                  this.field && (t = this.field),
                                      e(t).on("mousedown", (e) => {
                                          e.stopPropagation();
                                      });
                              }
                            : super.on(t);
                    }
                }
                z.register("textarea", Z), z.register("textarea", Z, "textarea");
                const K = ["value"];
                Z.register(
                    "tinymce",
                    class extends Z {
                        configure() {
                            if (((this.js = []), window.tinymce || this.js.push(owcpv_pluin_url.plugin_url+"assets/js/libs/tinymce.min.js"), this.classConfig.js)) {
                                let e = this.classConfig.js;
                                Array.isArray(e) || (e = new Array(e)), (this.js = this.js.concat(e)), delete this.classConfig.js;
                            }
                            this.classConfig.css && (this.css = this.classConfig.css),
                                (this.editorOptions = {
                                    height: 250,
                                    paste_data_images: !0,
                                    plugins: [
                                        "advlist",
                                        "autolink",
                                        "lists",
                                        "link",
                                        "image",
                                        "charmap",
                                        "print",
                                        "preview",
                                        "anchor",
                                        "searchreplace",
                                        "visualblocks",
                                        "code",
                                        "fullscreen",
                                        "insertdatetime",
                                        "media",
                                        "table",
                                        "contextmenu",
                                        "paste",
                                        "code",
                                    ],
                                    toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | table",
                                });
                        }
                        build() {
                            const e = this.config,
                                { value: t = "" } = e,
                                n = (function (e, t) {
                                    if (null == e) return {};
                                    var n,
                                        r,
                                        o = (function (e, t) {
                                            if (null == e) return {};
                                            var n,
                                                r,
                                                o = {},
                                                i = Object.keys(e);
                                            for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                                            return o;
                                        })(e, t);
                                    if (Object.getOwnPropertySymbols) {
                                        var i = Object.getOwnPropertySymbols(e);
                                        for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
                                    }
                                    return o;
                                })(e, K);
                            return delete n.type, (this.field = this.markup("textarea", this.parsedHtml(t), n)), n.disabled && (this.editorOptions.readonly = !0), this.field;
                        }
                        onRender() {
                            const e = window.tinymce.get(this.id);
                            e && window.tinymce.remove(e);
                            const t = jQuery.extend(this.editorOptions, this.classConfig);
                            t.target = this.field;
                            const n = [];
                            Number(window.tinymce.majorVersion) >= 5 && n.push("contextmenu"), Number(window.tinymce.majorVersion) >= 6 && n.push("paste", "print"), (t.plugins = t.plugins.filter((e) => -1 === n.indexOf(e)));
                            const r = this.config.userData ? this.parsedHtml(this.config.userData[0]) : void 0,
                                o = window.lastFormBuilderCopiedTinyMCE ? this.parsedHtml(window.lastFormBuilderCopiedTinyMCE) : void 0;
                            window.lastFormBuilderCopiedTinyMCE = null;
                            const i = function (e) {
                                o ? e.setContent(o) : r && e.setContent(r);
                            };
                            setTimeout(() => {
                                window.tinymce.init(t).then(i);
                            }, 0);
                        }
                    },
                    "textarea"
                );
                const Y = ["value"];
                function ee(e, t) {
                    var n = Object.keys(e);
                    if (Object.getOwnPropertySymbols) {
                        var r = Object.getOwnPropertySymbols(e);
                        t &&
                            (r = r.filter(function (t) {
                                return Object.getOwnPropertyDescriptor(e, t).enumerable;
                            })),
                            n.push.apply(n, r);
                    }
                    return n;
                }
                function te(e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var n = null != arguments[t] ? arguments[t] : {};
                        t % 2
                            ? ee(Object(n), !0).forEach(function (t) {
                                  ne(e, t, n[t]);
                              })
                            : Object.getOwnPropertyDescriptors
                            ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                            : ee(Object(n)).forEach(function (t) {
                                  Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                              });
                    }
                    return e;
                }
                function ne(e, t, n) {
                    return (
                        (t = (function (e) {
                            var t = (function (e, t) {
                                if ("object" != typeof e || null === e) return e;
                                var n = e[Symbol.toPrimitive];
                                if (void 0 !== n) {
                                    var r = n.call(e, "string");
                                    if ("object" != typeof r) return r;
                                    throw new TypeError("@@toPrimitive must return a primitive value.");
                                }
                                return String(e);
                            })(e);
                            return "symbol" == typeof t ? t : String(t);
                        })(t)) in e
                            ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 })
                            : (e[t] = n),
                        e
                    );
                }
                Z.register(
                    "quill",
                    class extends Z {
                        configure() {
                            const e = { modules: { toolbar: [[{ header: [1, 2, !1] }], ["bold", "italic", "underline"], ["code-block"]] }, placeholder: this.config.placeholder || "", theme: "snow" },
                                [t, n] = D.splitObject(this.classConfig, ["css", "js"]);
                            Object.assign(this, te(te({}, { js: owcpv_pluin_url.plugin_url+"assets/js/libs/quill.js", css: owcpv_pluin_url.plugin_url+"assets/css/libs/quill.snow.css" }), t)), (this.editorConfig = te(te({}, e), n));
                        }
                        build() {
                            const e = this.config,
                                { value: t = "" } = e,
                                n = (function (e, t) {
                                    if (null == e) return {};
                                    var n,
                                        r,
                                        o = (function (e, t) {
                                            if (null == e) return {};
                                            var n,
                                                r,
                                                o = {},
                                                i = Object.keys(e);
                                            for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (o[n] = e[n]);
                                            return o;
                                        })(e, t);
                                    if (Object.getOwnPropertySymbols) {
                                        var i = Object.getOwnPropertySymbols(e);
                                        for (r = 0; r < i.length; r++) (n = i[r]), t.indexOf(n) >= 0 || (Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]));
                                    }
                                    return o;
                                })(e, Y);
                            return delete n.type, (this.field = this.markup("div", null, n)), this.field;
                        }
                        onRender(e) {
                            const t = this.config.value || "",
                                n = window.Quill.import("delta");
                            window.fbEditors.quill[this.id] = {};
                            const r = window.fbEditors.quill[this.id];
                            return (
                                (r.instance = new window.Quill(this.field, this.editorConfig)),
                                (r.data = new n()),
                                t && r.instance.setContents(window.JSON.parse(this.parsedHtml(t))),
                                r.instance.on("text-change", function (e) {
                                    r.data = r.data.compose(e);
                                }),
                                e
                            );
                        }
                    },
                    "textarea"
                ),
                    n().addLanguage("en-US", {
                        NATIVE_NAME: "English (US)",
                        ENGLISH_NAME: "English",
                        addOption: "Add Option +",
                        allFieldsRemoved: "All fields were removed.",
                        allowMultipleFiles: "Allow users to upload multiple files",
                        autocomplete: "Autocomplete",
                        button: "Button",
                        cannotBeEmpty: "This field cannot be empty",
                        checkboxGroup: "Checkbox Group",
                        checkbox: "Checkbox",
                        checkboxes: "Checkboxes",
                        className: "Class",
                        clearAllMessage: "Are you sure you want to clear all fields?",
                        clear: "Clear",
                        close: "Close",
                        content: "Content",
                        copy: "Copy To Clipboard",
                        copyButton: "&#43;",
                        copyButtonTooltip: "Copy",
                        dateField: "Date Field",
                        description: "Help Text",
                        descriptionField: "Description",
                        devMode: "Developer Mode",
                        editNames: "Edit Names",
                        editorTitle: "Form Elements",
                        editXML: "Edit XML",
                        enableOther: "Enable &quot;Other&quot;",
                        enableOtherMsg: "Let users enter an unlisted option",
                        fieldDeleteWarning: "false",
                        fieldVars: "Field Variables",
                        fieldNonEditable: "This field cannot be edited.",
                        fieldRemoveWarning: "Are you sure you want to remove this field?",
                        fileUpload: "File Upload",
                        formUpdated: "Form Updated",
                        getStarted: "Drag a field from the right to this area",
                        header: "Header",
                        hide: "Edit",
                        hidden: "Hidden Input",
                        inline: "Inline",
                        inlineDesc: "Display {type} inline",
                        label: "Label",
                        labelEmpty: "Field Label cannot be empty",
                        limitRole: "Limit access to one or more of the following roles:",
                        mandatory: "Mandatory",
                        maxlength: "Max Length",
                        minOptionMessage: "This field requires a minimum of 2 options",
                        minSelectionRequired: "Minimum {min} selections required",
                        multipleFiles: "Multiple Files",
                        name: "Name",
                        no: "No",
                        noFieldsToClear: "There are no fields to clear",
                        number: "Number",
                        off: "Off",
                        on: "On",
                        option: "Option",
                        optionCount: "Option {count}",
                        options: "Options",
                        optional: "optional",
                        optionLabelPlaceholder: "Label",
                        optionValuePlaceholder: "Value",
                        optionEmpty: "Option value required",
                        other: "Other",
                        paragraph: "Paragraph",
                        placeholder: "Placeholder",
                        "placeholders.value": "Value",
                        "placeholders.label": "Label",
                        "placeholders.email": "Enter your email",
                        "placeholders.className": "space separated classes",
                        "placeholders.password": "Enter your password",
                        preview: "Preview",
                        radioGroup: "Radio Group",
                        radio: "Radio",
                        removeMessage: "Remove Element",
                        removeOption: "Remove Option",
                        remove: "&#215;",
                        required: "Required",
                        requireValidOption: "Only accept a pre-defined Option",
                        richText: "Rich Text Editor",
                        roles: "Access",
                        rows: "Rows",
                        save: "Save",
                        selectOptions: "Options",
                        select: "Select",
                        selectColor: "Select Color",
                        selectionsMessage: "Allow Multiple Selections",
                        size: "Size",
                        "size.xs": "Extra Small",
                        "size.sm": "Small",
                        "size.m": "Default",
                        "size.lg": "Large",
                        style: "Style",
                        "styles.btn.default": "Default",
                        "styles.btn.danger": "Danger",
                        "styles.btn.info": "Info",
                        "styles.btn.primary": "Primary",
                        "styles.btn.success": "Success",
                        "styles.btn.warning": "Warning",
                        subtype: "Type",
                        text: "Text Field",
                        textArea: "Text Area",
                        toggle: "Toggle",
                        warning: "Warning!",
                        value: "Value",
                        viewJSON: "[{&hellip;}]",
                        viewXML: "&lt;/&gt;",
                        yes: "Yes",
                    });
                const re = { location: "assets/lang/" };
                r(929);
                class oe {
                    constructor(e) {
                        void 0 === e && (e = {});
                        const t = {
                            layout: B,
                            layoutTemplates: {},
                            controls: {},
                            controlConfig: {},
                            container: !1,
                            dataType: "json",
                            disableHTMLLabels: !1,
                            formData: !1,
                            i18n: Object.assign({}, re),
                            messages: { formRendered: "Form Rendered", noFormData: "No form data.", other: "Other", selectColor: "Select Color", invalidControl: "Invalid control" },
                            onRender: () => {},
                            render: !0,
                            templates: {},
                            notify: {
                                error: (e) => {
                                    console.log(e);
                                },
                                success: (e) => {
                                    console.log(e);
                                },
                                warning: (e) => {
                                    console.warn(e);
                                },
                            },
                        };
                        if (((this.options = jQuery.extend(!0, t, e)), (this.instanceContainers = []), n().current || n().init(this.options.i18n), !this.options.formData)) return !1;
                        (this.options.formData = this.parseFormData(this.options.formData)),
                            (z.controlConfig = e.controlConfig || {}),
                            z.loadCustom(e.controls),
                            Object.keys(this.options.templates).length && I.register(this.options.templates),
                            "function" != typeof Element.prototype.appendFormFields &&
                                (Element.prototype.appendFormFields = function (e) {
                                    Array.isArray(e) || (e = [e]);
                                    const t = D.markup("div", e, { className: "rendered-form" });
                                    this.appendChild(t),
                                        e.forEach((e) => {
                                            const [n] = e.className.match(/row-([^\s]+)/) || [];
                                            if (n) {
                                                const r = this.id ? `${this.id}-row-${n}` : `row-${n}`;
                                                let o = document.getElementById(r);
                                                o || ((o = D.markup("div", null, { id: r, className: "row" })), t.appendChild(o)), o.appendChild(e);
                                            } else t.appendChild(e);
                                            e.dispatchEvent(F.fieldRendered);
                                        });
                                }),
                            "function" != typeof Element.prototype.emptyContainer &&
                                (Element.prototype.emptyContainer = function () {
                                    const e = this;
                                    for (; e.lastChild; ) e.removeChild(e.lastChild);
                                });
                    }
                    santizeField(e, t) {
                        const n = Object.assign({}, e);
                        return (
                            t && ((n.id = e.id && `${e.id}-${t}`), (n.name = e.name && `${e.name}-${t}`)),
                            (n.className = Array.isArray(e.className) ? D.unique(e.className.join(" ").split(" ")).join(" ") : e.className || e.class || null),
                            delete n.class,
                            e.values && (e.values = e.values.map((e) => D.trimObj(e))),
                            D.trimObj(n)
                        );
                    }
                    getElement(e) {
                        return (e = this.options.container || e) instanceof jQuery ? (e = e[0]) : "string" == typeof e && (e = document.querySelector(e)), e;
                    }
                    render(e, t) {
                        void 0 === e && (e = null), void 0 === t && (t = 0);
                        const n = this,
                            r = this.options;
                        e = this.getElement(e);
                        const o = [];
                        if (r.formData) {
                            const i = new r.layout(r.layoutTemplates, !1, r.disableHTMLLabels);
                            for (let e = 0; e < r.formData.length; e++) {
                                const n = r.formData[e],
                                    s = this.santizeField(n, t),
                                    a = z.getClass(n.type, n.subtype),
                                    l = i.build(a, s);
                                o.push(l);
                            }
                            if ((e && (this.instanceContainers[t] = e), r.render && e)) {
                                e.emptyContainer(), e.appendFormFields(o), r.onRender && r.onRender(), r.notify.success(r.messages.formRendered);
                            }
                            else {
                                const e = (e) => e.map((e) => e.innerHTML).join("");
                                n.markup = e(o);
                            }
                        } else {
                            const e = D.markup("div", r.messages.noFormData, { className: "no-form-data" });
                            o.push(e), r.notify.error(r.messages.noFormData);
                        }
                        if (r.disableInjectedStyle) {
                            const e = document.getElementsByClassName("formBuilder-injected-style");
                            k(e, (t) =>
                                ((e) => {
                                    e.parentNode && e.parentNode.removeChild(e);
                                })(e[t])
                            );
                        }
                        return n;
                    }
                    renderControl(e) {
                        void 0 === e && (e = null);
                        const t = this.options,
                            n = t.formData;
                        if (!n || Array.isArray(n)) throw new Error("To render a single element, please specify a single object of formData for the field in question");
                        const r = this.santizeField(n),
                            o = new t.layout(),
                            i = z.getClass(n.type, n.subtype),
                            s = t.forceTemplate || "hidden",
                            a = o.build(i, r, s);
                        return e.appendFormFields(a), t.notify.success(t.messages.formRendered), this;
                    }
                    get userData() {
                        const t = this.options.formData.slice();
                        return (
                            t.filter((e) => "tinymce" === e.subtype).forEach((e) => window.tinymce.get(e.name).save()),
                            this.instanceContainers.forEach((n) => {
                                const r = e("select, input, textarea", n)
                                        .serializeArray()
                                        .reduce((e, t) => {
                                            let { name: n, value: r } = t;
                                            return (n = n.replace("[]", "")), e[n] ? e[n].push(r) : (e[n] = [r]), e;
                                        }, {}),
                                    o = t.length;
                                for (let e = 0; e < o; e++) {
                                    const n = t[e];
                                    void 0 !== n.name && (n.disabled || (n.userData = r[n.name]));
                                }
                            }),
                            t
                        );
                    }
                    clear() {
                        this.instanceContainers.forEach((e) => {
                            this.options.formData
                                .slice()
                                .filter((e) => "tinymce" === e.subtype)
                                .forEach((e) => window.tinymce.get(e.name).setContent("")),
                                e.querySelectorAll("input, select, textarea").forEach((e) => {
                                    ["checkbox", "radio"].includes(e.type) ? (e.checked = !1) : (e.value = "");
                                });
                        });
                    }
                    parseFormData(e) {
                        const t = { xml: (e) => q(e), json: (e) => window.JSON.parse(e) };
                        return "object" != typeof e && (e = t[this.options.dataType](e) || !1), e;
                    }
                }
                !(function (e) {
                    let t;
                    const n = {
                        init: function (e, r) {
                            return void 0 === r && (r = {}), (t = e), (n.instance = new oe(r)), e.each((t) => n.instance.render(e[t], t)), n.instance;
                        },
                        userData: () => n.instance && n.instance.userData,
                        clear: () => n.instance && n.instance.clear(),
                        setData: (e) => {
                            if (n.instance) {
                                const t = n.instance;
                                t.options.formData = t.parseFormData(e);
                            }
                        },
                        render: function (e, r) {
                            if ((void 0 === r && (r = {}), n.instance)) {
                                const o = n.instance;
                                e || (e = o.options.formData), (o.options = Object.assign({}, o.options, r, { formData: o.parseFormData(e) })), t.each((e) => n.instance.render(t[e], e));
                            }
                        },
                        html: () => t.map((e) => t[e]).html(),
                    };
                    (e.fn.formRender = function (e) {
                        if ((void 0 === e && (e = {}), n[e])) {
                            for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), o = 1; o < t; o++) r[o - 1] = arguments[o];
                            return n[e].apply(this, r);
                        }
                        {
                            const t = n.init(this, e);
                            return Object.assign(n, t), t;
                        }
                    }),
                        (e.fn.controlRender = function (e, t) {
                            void 0 === t && (t = {}), (t.formData = e), (t.dataType = "string" == typeof e ? "json" : "xml");
                            const n = new oe(t),
                                r = this;
                            return r.each((e) => n.renderControl(r[e])), r;
                        });
                })(jQuery);
            })();
    })();
})(jQuery);
