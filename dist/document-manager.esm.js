function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var commonjsGlobal$1 = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function commonjsRequire (path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var runtime = {exports: {}};

(function (module) {
  var runtime = function (exports) {

    var Op = Object.prototype;
    var hasOwn = Op.hasOwnProperty;
    var undefined$1; // More compressible than void 0.

    var $Symbol = typeof Symbol === "function" ? Symbol : {};
    var iteratorSymbol = $Symbol.iterator || "@@iterator";
    var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
    var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

    function define(obj, key, value) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
      return obj[key];
    }

    try {
      // IE 8 has a broken Object.defineProperty that only works on DOM objects.
      define({}, "");
    } catch (err) {
      define = function define(obj, key, value) {
        return obj[key] = value;
      };
    }

    function wrap(innerFn, outerFn, self, tryLocsList) {
      // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
      var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
      var generator = Object.create(protoGenerator.prototype);
      var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
      // .throw, and .return methods.

      generator._invoke = makeInvokeMethod(innerFn, self, context);
      return generator;
    }

    exports.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
    // record like context.tryEntries[i].completion. This interface could
    // have been (and was previously) designed to take a closure to be
    // invoked without arguments, but in all the cases we care about we
    // already have an existing method we want to call, so there's no need
    // to create a new function object. We can even get away with assuming
    // the method takes exactly one argument, since that happens to be true
    // in every case, so we don't have to touch the arguments object. The
    // only additional allocation required is the completion record, which
    // has a stable shape and so hopefully should be cheap to allocate.

    function tryCatch(fn, obj, arg) {
      try {
        return {
          type: "normal",
          arg: fn.call(obj, arg)
        };
      } catch (err) {
        return {
          type: "throw",
          arg: err
        };
      }
    }

    var GenStateSuspendedStart = "suspendedStart";
    var GenStateSuspendedYield = "suspendedYield";
    var GenStateExecuting = "executing";
    var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
    // breaking out of the dispatch switch statement.

    var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
    // .constructor.prototype properties for functions that return Generator
    // objects. For full spec compliance, you may wish to configure your
    // minifier not to mangle the names of these two functions.

    function Generator() {}

    function GeneratorFunction() {}

    function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
    // don't natively support it.


    var IteratorPrototype = {};
    define(IteratorPrototype, iteratorSymbol, function () {
      return this;
    });
    var getProto = Object.getPrototypeOf;
    var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

    if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
      // This environment has a native %IteratorPrototype%; use it instead
      // of the polyfill.
      IteratorPrototype = NativeIteratorPrototype;
    }

    var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
    GeneratorFunction.prototype = GeneratorFunctionPrototype;
    define(Gp, "constructor", GeneratorFunctionPrototype);
    define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
    GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"); // Helper for defining the .next, .throw, and .return methods of the
    // Iterator interface in terms of a single ._invoke method.

    function defineIteratorMethods(prototype) {
      ["next", "throw", "return"].forEach(function (method) {
        define(prototype, method, function (arg) {
          return this._invoke(method, arg);
        });
      });
    }

    exports.isGeneratorFunction = function (genFun) {
      var ctor = typeof genFun === "function" && genFun.constructor;
      return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
      // do is to check its .name property.
      (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
    };

    exports.mark = function (genFun) {
      if (Object.setPrototypeOf) {
        Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
      } else {
        genFun.__proto__ = GeneratorFunctionPrototype;
        define(genFun, toStringTagSymbol, "GeneratorFunction");
      }

      genFun.prototype = Object.create(Gp);
      return genFun;
    }; // Within the body of any async function, `await x` is transformed to
    // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
    // `hasOwn.call(value, "__await")` to determine if the yielded value is
    // meant to be awaited.


    exports.awrap = function (arg) {
      return {
        __await: arg
      };
    };

    function AsyncIterator(generator, PromiseImpl) {
      function invoke(method, arg, resolve, reject) {
        var record = tryCatch(generator[method], generator, arg);

        if (record.type === "throw") {
          reject(record.arg);
        } else {
          var result = record.arg;
          var value = result.value;

          if (value && _typeof(value) === "object" && hasOwn.call(value, "__await")) {
            return PromiseImpl.resolve(value.__await).then(function (value) {
              invoke("next", value, resolve, reject);
            }, function (err) {
              invoke("throw", err, resolve, reject);
            });
          }

          return PromiseImpl.resolve(value).then(function (unwrapped) {
            // When a yielded Promise is resolved, its final value becomes
            // the .value of the Promise<{value,done}> result for the
            // current iteration.
            result.value = unwrapped;
            resolve(result);
          }, function (error) {
            // If a rejected Promise was yielded, throw the rejection back
            // into the async generator function so it can be handled there.
            return invoke("throw", error, resolve, reject);
          });
        }
      }

      var previousPromise;

      function enqueue(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }

        return previousPromise = // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
        // invocations of the iterator.
        callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      } // Define the unified helper method that is used to implement .next,
      // .throw, and .return (see defineIteratorMethods).


      this._invoke = enqueue;
    }

    defineIteratorMethods(AsyncIterator.prototype);
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    });
    exports.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
    // AsyncIterator objects; they just return a Promise for the value of
    // the final result produced by the iterator.

    exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
      if (PromiseImpl === void 0) PromiseImpl = Promise;
      var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
      return exports.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function (result) {
        return result.done ? result.value : iter.next();
      });
    };

    function makeInvokeMethod(innerFn, self, context) {
      var state = GenStateSuspendedStart;
      return function invoke(method, arg) {
        if (state === GenStateExecuting) {
          throw new Error("Generator is already running");
        }

        if (state === GenStateCompleted) {
          if (method === "throw") {
            throw arg;
          } // Be forgiving, per 25.3.3.3.3 of the spec:
          // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


          return doneResult();
        }

        context.method = method;
        context.arg = arg;

        while (true) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if (context.method === "next") {
            // Setting context._sent for legacy support of Babel's
            // function.sent implementation.
            context.sent = context._sent = context.arg;
          } else if (context.method === "throw") {
            if (state === GenStateSuspendedStart) {
              state = GenStateCompleted;
              throw context.arg;
            }

            context.dispatchException(context.arg);
          } else if (context.method === "return") {
            context.abrupt("return", context.arg);
          }

          state = GenStateExecuting;
          var record = tryCatch(innerFn, self, context);

          if (record.type === "normal") {
            // If an exception is thrown from innerFn, we leave state ===
            // GenStateExecuting and loop back for another invocation.
            state = context.done ? GenStateCompleted : GenStateSuspendedYield;

            if (record.arg === ContinueSentinel) {
              continue;
            }

            return {
              value: record.arg,
              done: context.done
            };
          } else if (record.type === "throw") {
            state = GenStateCompleted; // Dispatch the exception by looping back around to the
            // context.dispatchException(context.arg) call above.

            context.method = "throw";
            context.arg = record.arg;
          }
        }
      };
    } // Call delegate.iterator[context.method](context.arg) and handle the
    // result, either by returning a { value, done } result from the
    // delegate iterator, or by modifying context.method and context.arg,
    // setting context.delegate to null, and returning the ContinueSentinel.


    function maybeInvokeDelegate(delegate, context) {
      var method = delegate.iterator[context.method];

      if (method === undefined$1) {
        // A .throw or .return when the delegate iterator has no .throw
        // method always terminates the yield* loop.
        context.delegate = null;

        if (context.method === "throw") {
          // Note: ["return"] must be used for ES3 parsing compatibility.
          if (delegate.iterator["return"]) {
            // If the delegate iterator has a return method, give it a
            // chance to clean up.
            context.method = "return";
            context.arg = undefined$1;
            maybeInvokeDelegate(delegate, context);

            if (context.method === "throw") {
              // If maybeInvokeDelegate(context) changed context.method from
              // "return" to "throw", let that override the TypeError below.
              return ContinueSentinel;
            }
          }

          context.method = "throw";
          context.arg = new TypeError("The iterator does not provide a 'throw' method");
        }

        return ContinueSentinel;
      }

      var record = tryCatch(method, delegate.iterator, context.arg);

      if (record.type === "throw") {
        context.method = "throw";
        context.arg = record.arg;
        context.delegate = null;
        return ContinueSentinel;
      }

      var info = record.arg;

      if (!info) {
        context.method = "throw";
        context.arg = new TypeError("iterator result is not an object");
        context.delegate = null;
        return ContinueSentinel;
      }

      if (info.done) {
        // Assign the result of the finished delegate to the temporary
        // variable specified by delegate.resultName (see delegateYield).
        context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

        context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
        // exception, let the outer generator proceed normally. If
        // context.method was "next", forget context.arg since it has been
        // "consumed" by the delegate iterator. If context.method was
        // "return", allow the original .return call to continue in the
        // outer generator.

        if (context.method !== "return") {
          context.method = "next";
          context.arg = undefined$1;
        }
      } else {
        // Re-yield the result returned by the delegate method.
        return info;
      } // The delegate iterator is finished, so forget it and continue with
      // the outer generator.


      context.delegate = null;
      return ContinueSentinel;
    } // Define Generator.prototype.{next,throw,return} in terms of the
    // unified ._invoke helper method.


    defineIteratorMethods(Gp);
    define(Gp, toStringTagSymbol, "Generator"); // A Generator should always return itself as the iterator object when the
    // @@iterator function is called on it. Some browsers' implementations of the
    // iterator prototype chain incorrectly implement this, causing the Generator
    // object to not be returned from this call. This ensures that doesn't happen.
    // See https://github.com/facebook/regenerator/issues/274 for more details.

    define(Gp, iteratorSymbol, function () {
      return this;
    });
    define(Gp, "toString", function () {
      return "[object Generator]";
    });

    function pushTryEntry(locs) {
      var entry = {
        tryLoc: locs[0]
      };

      if (1 in locs) {
        entry.catchLoc = locs[1];
      }

      if (2 in locs) {
        entry.finallyLoc = locs[2];
        entry.afterLoc = locs[3];
      }

      this.tryEntries.push(entry);
    }

    function resetTryEntry(entry) {
      var record = entry.completion || {};
      record.type = "normal";
      delete record.arg;
      entry.completion = record;
    }

    function Context(tryLocsList) {
      // The root entry object (effectively a try statement without a catch
      // or a finally block) gives us a place to store values thrown from
      // locations where there is no enclosing try statement.
      this.tryEntries = [{
        tryLoc: "root"
      }];
      tryLocsList.forEach(pushTryEntry, this);
      this.reset(true);
    }

    exports.keys = function (object) {
      var keys = [];

      for (var key in object) {
        keys.push(key);
      }

      keys.reverse(); // Rather than returning an object with a next method, we keep
      // things simple and return the next function itself.

      return function next() {
        while (keys.length) {
          var key = keys.pop();

          if (key in object) {
            next.value = key;
            next.done = false;
            return next;
          }
        } // To avoid creating an additional object, we just hang the .value
        // and .done properties off the next function object itself. This
        // also ensures that the minifier will not anonymize the function.


        next.done = true;
        return next;
      };
    };

    function values(iterable) {
      if (iterable) {
        var iteratorMethod = iterable[iteratorSymbol];

        if (iteratorMethod) {
          return iteratorMethod.call(iterable);
        }

        if (typeof iterable.next === "function") {
          return iterable;
        }

        if (!isNaN(iterable.length)) {
          var i = -1,
              next = function next() {
            while (++i < iterable.length) {
              if (hasOwn.call(iterable, i)) {
                next.value = iterable[i];
                next.done = false;
                return next;
              }
            }

            next.value = undefined$1;
            next.done = true;
            return next;
          };

          return next.next = next;
        }
      } // Return an iterator with no values.


      return {
        next: doneResult
      };
    }

    exports.values = values;

    function doneResult() {
      return {
        value: undefined$1,
        done: true
      };
    }

    Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        this.prev = 0;
        this.next = 0; // Resetting context._sent for legacy support of Babel's
        // function.sent implementation.

        this.sent = this._sent = undefined$1;
        this.done = false;
        this.delegate = null;
        this.method = "next";
        this.arg = undefined$1;
        this.tryEntries.forEach(resetTryEntry);

        if (!skipTempReset) {
          for (var name in this) {
            // Not sure about the optimal order of these conditions:
            if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
              this[name] = undefined$1;
            }
          }
        }
      },
      stop: function stop() {
        this.done = true;
        var rootEntry = this.tryEntries[0];
        var rootRecord = rootEntry.completion;

        if (rootRecord.type === "throw") {
          throw rootRecord.arg;
        }

        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) {
          throw exception;
        }

        var context = this;

        function handle(loc, caught) {
          record.type = "throw";
          record.arg = exception;
          context.next = loc;

          if (caught) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            context.method = "next";
            context.arg = undefined$1;
          }

          return !!caught;
        }

        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          var record = entry.completion;

          if (entry.tryLoc === "root") {
            // Exception thrown outside of any try block that could handle
            // it, so set the completion value of the entire function to
            // throw the exception.
            return handle("end");
          }

          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc");
            var hasFinally = hasOwn.call(entry, "finallyLoc");

            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              } else if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) {
                return handle(entry.catchLoc, true);
              }
            } else if (hasFinally) {
              if (this.prev < entry.finallyLoc) {
                return handle(entry.finallyLoc);
              }
            } else {
              throw new Error("try statement without catch or finally");
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
            var finallyEntry = entry;
            break;
          }
        }

        if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
          // Ignore the finally entry if control is not jumping to a
          // location outside the try/catch block.
          finallyEntry = null;
        }

        var record = finallyEntry ? finallyEntry.completion : {};
        record.type = type;
        record.arg = arg;

        if (finallyEntry) {
          this.method = "next";
          this.next = finallyEntry.finallyLoc;
          return ContinueSentinel;
        }

        return this.complete(record);
      },
      complete: function complete(record, afterLoc) {
        if (record.type === "throw") {
          throw record.arg;
        }

        if (record.type === "break" || record.type === "continue") {
          this.next = record.arg;
        } else if (record.type === "return") {
          this.rval = this.arg = record.arg;
          this.method = "return";
          this.next = "end";
        } else if (record.type === "normal" && afterLoc) {
          this.next = afterLoc;
        }

        return ContinueSentinel;
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.finallyLoc === finallyLoc) {
            this.complete(entry.completion, entry.afterLoc);
            resetTryEntry(entry);
            return ContinueSentinel;
          }
        }
      },
      "catch": function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];

          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;

            if (record.type === "throw") {
              var thrown = record.arg;
              resetTryEntry(entry);
            }

            return thrown;
          }
        } // The context.catch method must only be called with a location
        // argument that corresponds to a known catch block.


        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        this.delegate = {
          iterator: values(iterable),
          resultName: resultName,
          nextLoc: nextLoc
        };

        if (this.method === "next") {
          // Deliberately forget the last sent value so that we don't
          // accidentally pass it on to the delegate.
          this.arg = undefined$1;
        }

        return ContinueSentinel;
      }
    }; // Regardless of whether this script is executing as a CommonJS module
    // or not, return the runtime object so that we can declare the variable
    // regeneratorRuntime in the outer scope, which allows this module to be
    // injected easily by `bin/regenerator --include-runtime script.js`.

    return exports;
  }( // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports );

  try {
    regeneratorRuntime = runtime;
  } catch (accidentalStrictMode) {
    // This module should not be running in strict mode, so the above
    // assignment should always work unless something is misconfigured. Just
    // in case runtime.js accidentally runs in strict mode, in modern engines
    // we can explicitly access globalThis. In older engines we can escape
    // strict mode using a global Function call. This could conceivably fail
    // if a Content Security Policy forbids using Function, but in that case
    // the proper solution is to fix the accidental strict mode problem. If
    // you've misconfigured your bundler to force strict mode and applied a
    // CSP to forbid Function, and you're not willing to fix either of those
    // problems, please detail your unique predicament in a GitHub issue.
    if ((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object") {
      globalThis.regeneratorRuntime = runtime;
    } else {
      Function("r", "regeneratorRuntime = r")(runtime);
    }
  }
})(runtime);

var regenerator = runtime.exports;

function _arrayLikeToArray$5(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$5(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$5(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$5(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$5(arr) || _nonIterableSpread();
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var Converter = /*#__PURE__*/function () {
  function Converter(srcBase, dstBase) {
    _classCallCheck(this, Converter);

    if (!srcBase || !dstBase || !srcBase.length || !dstBase.length) {
      throw new Error("Invalid base string!");
    }

    this.srcBase = srcBase;
    this.dstBase = dstBase;
  }

  _createClass(Converter, [{
    key: "run",
    value: function run(uuid) {
      if (this.srcBase === this.dstBase) return uuid;
      var inputLength = uuid.length;
      var newLength = 0,
          div = 0;
      var srcLength = this.srcBase.length;
      var dstLength = this.dstBase.length;
      var converted = "";
      var map = {};

      for (var i = 0; i < inputLength; i++) {
        map[i] = this.srcBase.indexOf(uuid[i]);
      }

      do {
        div = 0;
        newLength = 0;

        for (var _i = 0; _i < inputLength; _i++) {
          div = div * srcLength + map[_i];

          if (div >= dstLength) {
            map[newLength++] = parseInt((div / dstLength).toString(), 10);
            div = div % dstLength;
          } else {
            if (newLength > 0) map[newLength++] = 0;
          }
        }

        inputLength = newLength;
        converted = this.dstBase[div] + converted;
      } while (newLength != 0);

      return converted;
    }
  }]);

  return Converter;
}();

var ShortUuidV4 = /*#__PURE__*/function () {
  function ShortUuidV4() {
    _classCallCheck(this, ShortUuidV4);
  }

  _createClass(ShortUuidV4, [{
    key: "checkBase",
    value: function checkBase(base) {
      if (_toConsumableArray(new Set(Array.from(base))).length !== base.length) {
        throw new Error("The given base string has duplicate characters resulting in unreliable results.");
      }
    }
  }, {
    key: "uuidv4",
    value: function uuidv4() {
      var crypto = window.crypto || window.msCrypto;
      if (!crypto) return "";
      return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, function (c) {
        return (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
      });
    }
  }, {
    key: "new",
    value: function _new() {
      return this.generate(ShortUuidV4.BASE_DEF);
    }
  }, {
    key: "generate",
    value: function generate() {
      var base = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ShortUuidV4.BASE_DEF;
      // this.checkBase(base);
      return this.translate(this.uuidv4(), ShortUuidV4.BASE_HEX, base);
    }
  }, {
    key: "translate",
    value: function translate(uuid) {
      var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ShortUuidV4.BASE_DEF;
      var to = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ShortUuidV4.BASE_HEX;
      // this.checkBase(from);
      // this.checkBase(to);
      uuid = uuid.replace(/-/g, "");
      var length = Math.ceil(Math.log(Math.pow(2, 128)) / Math.log(to.length));
      return this.formatUuidV4(new Converter(from, to).run(uuid).padStart(length, to[0]));
    }
  }, {
    key: "formatUuidV4",
    value: function formatUuidV4(uuid) {
      var m = uuid.match(/(\w{8})(\w{4})(\w{4})(\w{4})(\w{12})/);
      return m ? [m[1], m[2], m[3], m[4], m[5]].join("-") : uuid;
    }
  }], [{
    key: "BASE_DEF",
    get: function get() {
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    }
  }, {
    key: "BASE_BIN",
    get: function get() {
      return "01";
    }
  }, {
    key: "BASE_OCT",
    get: function get() {
      return "01234567";
    }
  }, {
    key: "BASE_DEC",
    get: function get() {
      return "0123456789";
    }
  }, {
    key: "BASE_HEX",
    get: function get() {
      return "0123456789abcdef";
    }
  }]);

  return ShortUuidV4;
}();

var SearchQuery = function SearchQuery(query) {
  var _this = this;

  _classCallCheck(this, SearchQuery);

  _defineProperty(this, "queryType", "invalid");

  _defineProperty(this, "query", null);

  _defineProperty(this, "type", function () {
    return _this.queryType;
  });

  _defineProperty(this, "data", function () {
    return _this.query;
  });

  _defineProperty(this, "isValidOperator", function (op) {
    return ["<", "<=", "==", "!=", ">=", ">", "array-contains", "array-contains-any", "in", "not-in"].includes(op);
  });

  // Search documents by multiple conditions
  if (_typeof(query) === "object") {
    try {
      if (!Array.isArray(query) && Object.keys(query).length) this.queryType = "conditional";
    } catch (e) {}
  } // Search documents by string match
  else if (typeof query === "string") {
    if (query.length) this.queryType = "string";
  }

  if (this.queryType !== "invalid") this.query = query;
};

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$5(arr, i) || _nonIterableRest();
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
function t$1(t, i, e, n) {
  return new (e || (e = Promise))(function (a, s) {
    function c(t) {
      try {
        u(n.next(t));
      } catch (t) {
        s(t);
      }
    }

    function o(t) {
      try {
        u(n["throw"](t));
      } catch (t) {
        s(t);
      }
    }

    function u(t) {
      var i;
      t.done ? a(t.value) : (i = t.value, i instanceof e ? i : new e(function (t) {
        t(i);
      })).then(c, o);
    }

    u((n = n.apply(t, i || [])).next());
  });
}

var i = function i() {
  var _this = this;

  var _i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

  _classCallCheck(this, i);

  if (this._available = {}, this._queue = {}, this.lock = function (_i2) {
    return t$1(_this, void 0, void 0, /*#__PURE__*/regenerator.mark(function _callee() {
      var _this2 = this;

      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              (_i2 = _i2 || "_default") in this._available || (this._available[_i2] = this._concurrency, this._queue[_i2] = []);
              _context.t0 = this.isLocked(_i2);

              if (!_context.t0) {
                _context.next = 5;
                break;
              }

              _context.next = 5;
              return new Promise(function (t) {
                _this2._queue[_i2].push(t);
              });

            case 5:
              this._available[_i2] -= 1;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));
  }, this.unlock = function (t) {
    t = t || "_default", _this._available[t] < _this._concurrency && (_this._available[t] += 1);

    var _i3 = _this._queue[t].shift();

    _i3 && _i3();
  }, this.isLocked = function (t) {
    return t = t || "_default", 0 === _this._available[t];
  }, _i <= 0) throw new Error("Only positive number allowed!");
  this._concurrency = _i;
};

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

var SearchStrategy = /*#__PURE__*/function () {
  function SearchStrategy() {
    _classCallCheck(this, SearchStrategy);
  }

  _createClass(SearchStrategy, null, [{
    key: "Literal",
    value: function Literal(query, subject) {
      if (!subject) return false;
      query = query.toLowerCase();
      subject = subject.trim().toLowerCase();
      var tokens = new RegExp("\\s+$").test(query) ? [query] : query.trim().split(" ");
      return tokens.filter(function (token) {
        return subject.indexOf(token) >= 0;
      }).length === tokens.length;
    }
  }, {
    key: "Fuzzy",
    value: function Fuzzy(query, subject) {
      if (!subject) return false;
      if (query.length > subject.length) return false;
      query = query.toLowerCase();
      subject = subject.toLowerCase();
      if (query.length === subject.length) return query === subject;

      outer: for (var i = 0, j = 0; i < query.length; i++) {
        var ch = query.charCodeAt(i);

        while (j < subject.length) {
          if (subject.charCodeAt(j++) === ch) continue outer;
        }

        return false;
      }

      return true;
    }
  }]);

  return SearchStrategy;
}();

function _createForOfIteratorHelper$4(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var Collection = // General information of document collection
// Default search options
// TODO: Default data encryption options
function Collection(name, order, options) {
  var _this = this;

  _classCallCheck(this, Collection);

  _defineProperty(this, "_searchOptions", {
    fuzzy: false,
    limit: Number.MAX_SAFE_INTEGER
  });

  _defineProperty(this, "_encryptionOptions", {
    algorithm: "sha256"
  });

  _defineProperty(this, "_isValidConfig", function (config, necessaries) {
    if (!config) return false;
    var result = true;

    for (var i = 0; i < necessaries.length; i++) {
      if (!(necessaries[i] in config)) {
        result = false;
        break;
      }
    }

    return result;
  });

  _defineProperty(this, "_findStringMatches", function (query, docData, strategy, exclude) {
    for (var field in docData) {
      if (field[0] === "_") continue;
      var data = docData[field].toString();
      if (!_this._isExcluded(data, exclude) && strategy(query.data(), data)) return true;
    }

    return false;
  });

  _defineProperty(this, "_findConditionalMatches", function (query, docData) {
    for (var _i = 0, _Object$entries = Object.entries(query.data()); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          field = _Object$entries$_i[0],
          condition = _Object$entries$_i[1];

      if (!(field in docData)) return false;
      var data = docData[field]; // Query operators: ["<", "<=", "==", "!=", ">=", ">", "array-contains", "array-contains-any", "in", "not-in"]

      var operator = condition[0];
      var value = condition[1];

      if (_typeof(data) === _typeof(value)) {
        if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
          if (operator === "<") {
            if (!(data < value)) return false;
          } else if (operator === "<=") {
            if (!(data <= value)) return false;
          } else if (operator === "==") {
            if (!(data == value)) return false;
          } else if (operator === "!=") {
            if (!(data != value)) return false;
          } else if (operator === ">=") {
            if (!(data >= value)) return false;
          } else if (operator === ">") {
            if (!(data > value)) return false;
          } else return false;
        } else {
          // data(array) "array-contains-any" value(array)
          if (operator === "array-contains-any") {
            if (Array.isArray(data) && Array.isArray(value)) {
              var contains = false;

              var _iterator = _createForOfIteratorHelper$4(value),
                  _step;

              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var v = _step.value;

                  if (data.includes(v)) {
                    contains = true;
                    break;
                  }
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }

              if (!contains) return false;
            } else return false;
          } else return false;
        }
      } else {
        // data(array) "array-contains" value(string | number | boolean)
        if (operator === "array-contains") {
          if (Array.isArray(data)) {
            if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
              if (!data.includes(value)) return false;
            } else return false;
          } else return false;
        } // data(string | number | boolean) "in" value(array)
        else if (operator === "in") {
          if (Array.isArray(value)) {
            if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
              if (!value.includes(data)) return false;
            } else return false;
          } else return false;
        } // (data: string | number | boolean) "not-in" (value: array | value.toString(): string)
        else if (operator === "not-in") {
          if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
            if (Array.isArray(value)) {
              if (value.includes(data)) return false;
            } else if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
              if (!new RegExp(data.toString()).test(value.toString())) return false;
            } else return false;
          } else return false;
        } else return false;
      }
    }

    return true;
  });

  _defineProperty(this, "_isExcluded", function (docData, exclude) {
    for (var i = 0, len = exclude.length; i < len; i++) {
      if (new RegExp(exclude[i]).test(docData)) return true;
    }

    return false;
  });

  _defineProperty(this, "import", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(data) {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", true);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "export", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(range) {
      var allDocuments, jsonified;
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (range) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", {});

            case 2:
              _context3.next = 4;
              return Promise.all(range.map( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(docId) {
                  var singleDocument, docData;
                  return regenerator.wrap(function _callee2$(_context2) {
                    while (1) {
                      switch (_context2.prev = _context2.next) {
                        case 0:
                          singleDocument = {};
                          _context2.next = 3;
                          return _this.get(docId);

                        case 3:
                          docData = _context2.sent;
                          if (docData) singleDocument[docId] = docData;
                          return _context2.abrupt("return", singleDocument);

                        case 6:
                        case "end":
                          return _context2.stop();
                      }
                    }
                  }, _callee2);
                }));

                return function (_x3) {
                  return _ref3.apply(this, arguments);
                };
              }()));

            case 4:
              allDocuments = _context3.sent;
              jsonified = {};
              allDocuments.forEach(function (singleDocument) {
                Object.assign(jsonified, singleDocument);
              });
              return _context3.abrupt("return", jsonified);

            case 8:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  this._order = order;
  this._storageName = options.name;
  this._name = name;
  Object.assign(this._searchOptions, options.search); // TODO: Encryption options
};

function _createSuper$5(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$6(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$6() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CollectionJSON = /*#__PURE__*/function (_Collection) {
  _inherits(CollectionJSON, _Collection);

  var _super = _createSuper$5(CollectionJSON);

  function CollectionJSON(name, order, _options) {
    var _this;

    _classCallCheck(this, CollectionJSON);

    _this = _super.call(this, name, order, _options); // Object with JSON format

    _defineProperty(_assertThisInitialized(_this), "keys", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", Object.keys(_this._collection));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "get", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(docId) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (docId in _this._collection) {
                  _context2.next = 2;
                  break;
                }

                return _context2.abrupt("return", null);

              case 2:
                return _context2.abrupt("return", _this._collection[docId]);

              case 3:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "set", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(docId, docData) {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (docData) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", false);

              case 2:
                _context3.prev = 2;
                _this._collection[docId] = docData;
                return _context3.abrupt("return", true);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](2);
                return _context3.abrupt("return", false);

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 7]]);
      }));

      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "update", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(docId, updates) {
        var docData;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (updates) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", false);

              case 2:
                _context4.next = 4;
                return _this.get(docId);

              case 4:
                docData = _context4.sent;

                if (docData) {
                  _context4.next = 7;
                  break;
                }

                return _context4.abrupt("return", false);

              case 7:
                Object.keys(docData).forEach(function (fieldName) {
                  docData = docData;
                  if (fieldName in updates) docData[fieldName];
                });
                return _context4.abrupt("return", _this.set(docId, docData));

              case 9:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "sort", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(orderBy, range) {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this._order.sort(orderBy, range));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "search", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(query, options) {
        var isStringQuery, range, strategy, exclude, limit, rangeCopy, matches, _loop, i, _ret;

        return regenerator.wrap(function _callee6$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                // The given query type is either "string" or "conditional".
                isStringQuery = query.type() === "string"; // Search options

                range = options.range;
                strategy = options.fuzzy ? SearchStrategy.Fuzzy : SearchStrategy.Literal;
                exclude = options.exclude;
                limit = options.limit; // Necessary for stopping task when the search target is out of range.

                rangeCopy = _toConsumableArray(range);
                matches = [];
                _loop = /*#__PURE__*/regenerator.mark(function _loop(i) {
                  var docId, docData;
                  return regenerator.wrap(function _loop$(_context6) {
                    while (1) {
                      switch (_context6.prev = _context6.next) {
                        case 0:
                          docId = range[i];
                          _context6.next = 3;
                          return _this.get(docId);

                        case 3:
                          docData = _context6.sent;

                          if (docData) {
                            _context6.next = 6;
                            break;
                          }

                          return _context6.abrupt("return", "continue");

                        case 6:
                          if (!isStringQuery) {
                            _context6.next = 16;
                            break;
                          }

                          if (!_this._findStringMatches(query, docData, strategy, exclude)) {
                            _context6.next = 14;
                            break;
                          }

                          matches.push(docId);

                          if (!(matches.length >= limit)) {
                            _context6.next = 11;
                            break;
                          }

                          return _context6.abrupt("return", "break");

                        case 11:
                          rangeCopy = rangeCopy.filter(function (id) {
                            return id !== docId;
                          });

                          if (rangeCopy.length) {
                            _context6.next = 14;
                            break;
                          }

                          return _context6.abrupt("return", "break");

                        case 14:
                          _context6.next = 23;
                          break;

                        case 16:
                          if (!_this._findConditionalMatches(query, docData)) {
                            _context6.next = 23;
                            break;
                          }

                          matches.push(docId);

                          if (!(matches.length >= limit)) {
                            _context6.next = 20;
                            break;
                          }

                          return _context6.abrupt("return", "break");

                        case 20:
                          rangeCopy = rangeCopy.filter(function (id) {
                            return id !== docId;
                          });

                          if (rangeCopy.length) {
                            _context6.next = 23;
                            break;
                          }

                          return _context6.abrupt("return", "break");

                        case 23:
                        case "end":
                          return _context6.stop();
                      }
                    }
                  }, _loop);
                });
                i = 0;

              case 9:
                if (!(i < range.length)) {
                  _context7.next = 19;
                  break;
                }

                return _context7.delegateYield(_loop(i), "t0", 11);

              case 11:
                _ret = _context7.t0;

                if (!(_ret === "continue")) {
                  _context7.next = 14;
                  break;
                }

                return _context7.abrupt("continue", 16);

              case 14:
                if (!(_ret === "break")) {
                  _context7.next = 16;
                  break;
                }

                return _context7.abrupt("break", 19);

              case 16:
                i++;
                _context7.next = 9;
                break;

              case 19:
                return _context7.abrupt("return", matches);

              case 20:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x8, _x9) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "remove", /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(docId) {
        return regenerator.wrap(function _callee7$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                if (docId in _this._collection) {
                  _context8.next = 2;
                  break;
                }

                return _context8.abrupt("return", false);

              case 2:
                _context8.prev = 2;
                delete _this._collection[docId];
                return _context8.abrupt("return", true);

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](2);
                return _context8.abrupt("return", false);

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee7, null, [[2, 7]]);
      }));

      return function (_x10) {
        return _ref7.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "clear", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8() {
      var docId;
      return regenerator.wrap(function _callee8$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;

              for (docId in _this._collection) {
                delete _this._collection[docId];
              }

              return _context9.abrupt("return", true);

            case 5:
              _context9.prev = 5;
              _context9.t0 = _context9["catch"](0);
              return _context9.abrupt("return", false);

            case 8:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee8, null, [[0, 5]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "destroy", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9() {
      return regenerator.wrap(function _callee9$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              delete _this._collection;
              return _context10.abrupt("return", true);

            case 2:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee9);
    })));

    _this._collection = {};
    return _this;
  }

  return CollectionJSON;
}(Collection);

var localforage = {exports: {}};

(function (module, exports) {
  (function (f) {
    {
      module.exports = f();
    }
  })(function () {
    return function e(t, n, r) {
      function s(o, u) {
        if (!n[o]) {
          if (!t[o]) {
            var a = typeof commonjsRequire == "function" && commonjsRequire;
            if (!u && a) return a(o, !0);
            if (i) return i(o, !0);
            var f = new Error("Cannot find module '" + o + "'");
            throw f.code = "MODULE_NOT_FOUND", f;
          }

          var l = n[o] = {
            exports: {}
          };
          t[o][0].call(l.exports, function (e) {
            var n = t[o][1][e];
            return s(n ? n : e);
          }, l, l.exports, e, t, n, r);
        }

        return n[o].exports;
      }

      var i = typeof commonjsRequire == "function" && commonjsRequire;

      for (var o = 0; o < r.length; o++) {
        s(r[o]);
      }

      return s;
    }({
      1: [function (_dereq_, module, exports) {
        (function (global) {

          var Mutation = global.MutationObserver || global.WebKitMutationObserver;
          var scheduleDrain;
          {
            if (Mutation) {
              var called = 0;
              var observer = new Mutation(nextTick);
              var element = global.document.createTextNode('');
              observer.observe(element, {
                characterData: true
              });

              scheduleDrain = function scheduleDrain() {
                element.data = called = ++called % 2;
              };
            } else if (!global.setImmediate && typeof global.MessageChannel !== 'undefined') {
              var channel = new global.MessageChannel();
              channel.port1.onmessage = nextTick;

              scheduleDrain = function scheduleDrain() {
                channel.port2.postMessage(0);
              };
            } else if ('document' in global && 'onreadystatechange' in global.document.createElement('script')) {
              scheduleDrain = function scheduleDrain() {
                // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                var scriptEl = global.document.createElement('script');

                scriptEl.onreadystatechange = function () {
                  nextTick();
                  scriptEl.onreadystatechange = null;
                  scriptEl.parentNode.removeChild(scriptEl);
                  scriptEl = null;
                };

                global.document.documentElement.appendChild(scriptEl);
              };
            } else {
              scheduleDrain = function scheduleDrain() {
                setTimeout(nextTick, 0);
              };
            }
          }
          var draining;
          var queue = []; //named nextTick for less confusing stack traces

          function nextTick() {
            draining = true;
            var i, oldQueue;
            var len = queue.length;

            while (len) {
              oldQueue = queue;
              queue = [];
              i = -1;

              while (++i < len) {
                oldQueue[i]();
              }

              len = queue.length;
            }

            draining = false;
          }

          module.exports = immediate;

          function immediate(task) {
            if (queue.push(task) === 1 && !draining) {
              scheduleDrain();
            }
          }
        }).call(this, typeof commonjsGlobal$1 !== "undefined" ? commonjsGlobal$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {}],
      2: [function (_dereq_, module, exports) {

        var immediate = _dereq_(1);
        /* istanbul ignore next */


        function INTERNAL() {}

        var handlers = {};
        var REJECTED = ['REJECTED'];
        var FULFILLED = ['FULFILLED'];
        var PENDING = ['PENDING'];
        module.exports = Promise;

        function Promise(resolver) {
          if (typeof resolver !== 'function') {
            throw new TypeError('resolver must be a function');
          }

          this.state = PENDING;
          this.queue = [];
          this.outcome = void 0;

          if (resolver !== INTERNAL) {
            safelyResolveThenable(this, resolver);
          }
        }

        Promise.prototype["catch"] = function (onRejected) {
          return this.then(null, onRejected);
        };

        Promise.prototype.then = function (onFulfilled, onRejected) {
          if (typeof onFulfilled !== 'function' && this.state === FULFILLED || typeof onRejected !== 'function' && this.state === REJECTED) {
            return this;
          }

          var promise = new this.constructor(INTERNAL);

          if (this.state !== PENDING) {
            var resolver = this.state === FULFILLED ? onFulfilled : onRejected;
            unwrap(promise, resolver, this.outcome);
          } else {
            this.queue.push(new QueueItem(promise, onFulfilled, onRejected));
          }

          return promise;
        };

        function QueueItem(promise, onFulfilled, onRejected) {
          this.promise = promise;

          if (typeof onFulfilled === 'function') {
            this.onFulfilled = onFulfilled;
            this.callFulfilled = this.otherCallFulfilled;
          }

          if (typeof onRejected === 'function') {
            this.onRejected = onRejected;
            this.callRejected = this.otherCallRejected;
          }
        }

        QueueItem.prototype.callFulfilled = function (value) {
          handlers.resolve(this.promise, value);
        };

        QueueItem.prototype.otherCallFulfilled = function (value) {
          unwrap(this.promise, this.onFulfilled, value);
        };

        QueueItem.prototype.callRejected = function (value) {
          handlers.reject(this.promise, value);
        };

        QueueItem.prototype.otherCallRejected = function (value) {
          unwrap(this.promise, this.onRejected, value);
        };

        function unwrap(promise, func, value) {
          immediate(function () {
            var returnValue;

            try {
              returnValue = func(value);
            } catch (e) {
              return handlers.reject(promise, e);
            }

            if (returnValue === promise) {
              handlers.reject(promise, new TypeError('Cannot resolve promise with itself'));
            } else {
              handlers.resolve(promise, returnValue);
            }
          });
        }

        handlers.resolve = function (self, value) {
          var result = tryCatch(getThen, value);

          if (result.status === 'error') {
            return handlers.reject(self, result.value);
          }

          var thenable = result.value;

          if (thenable) {
            safelyResolveThenable(self, thenable);
          } else {
            self.state = FULFILLED;
            self.outcome = value;
            var i = -1;
            var len = self.queue.length;

            while (++i < len) {
              self.queue[i].callFulfilled(value);
            }
          }

          return self;
        };

        handlers.reject = function (self, error) {
          self.state = REJECTED;
          self.outcome = error;
          var i = -1;
          var len = self.queue.length;

          while (++i < len) {
            self.queue[i].callRejected(error);
          }

          return self;
        };

        function getThen(obj) {
          // Make sure we only access the accessor once as required by the spec
          var then = obj && obj.then;

          if (obj && (_typeof(obj) === 'object' || typeof obj === 'function') && typeof then === 'function') {
            return function appyThen() {
              then.apply(obj, arguments);
            };
          }
        }

        function safelyResolveThenable(self, thenable) {
          // Either fulfill, reject or reject with error
          var called = false;

          function onError(value) {
            if (called) {
              return;
            }

            called = true;
            handlers.reject(self, value);
          }

          function onSuccess(value) {
            if (called) {
              return;
            }

            called = true;
            handlers.resolve(self, value);
          }

          function tryToUnwrap() {
            thenable(onSuccess, onError);
          }

          var result = tryCatch(tryToUnwrap);

          if (result.status === 'error') {
            onError(result.value);
          }
        }

        function tryCatch(func, value) {
          var out = {};

          try {
            out.value = func(value);
            out.status = 'success';
          } catch (e) {
            out.status = 'error';
            out.value = e;
          }

          return out;
        }

        Promise.resolve = resolve;

        function resolve(value) {
          if (value instanceof this) {
            return value;
          }

          return handlers.resolve(new this(INTERNAL), value);
        }

        Promise.reject = reject;

        function reject(reason) {
          var promise = new this(INTERNAL);
          return handlers.reject(promise, reason);
        }

        Promise.all = all;

        function all(iterable) {
          var self = this;

          if (Object.prototype.toString.call(iterable) !== '[object Array]') {
            return this.reject(new TypeError('must be an array'));
          }

          var len = iterable.length;
          var called = false;

          if (!len) {
            return this.resolve([]);
          }

          var values = new Array(len);
          var resolved = 0;
          var i = -1;
          var promise = new this(INTERNAL);

          while (++i < len) {
            allResolver(iterable[i], i);
          }

          return promise;

          function allResolver(value, i) {
            self.resolve(value).then(resolveFromAll, function (error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });

            function resolveFromAll(outValue) {
              values[i] = outValue;

              if (++resolved === len && !called) {
                called = true;
                handlers.resolve(promise, values);
              }
            }
          }
        }

        Promise.race = race;

        function race(iterable) {
          var self = this;

          if (Object.prototype.toString.call(iterable) !== '[object Array]') {
            return this.reject(new TypeError('must be an array'));
          }

          var len = iterable.length;
          var called = false;

          if (!len) {
            return this.resolve([]);
          }

          var i = -1;
          var promise = new this(INTERNAL);

          while (++i < len) {
            resolver(iterable[i]);
          }

          return promise;

          function resolver(value) {
            self.resolve(value).then(function (response) {
              if (!called) {
                called = true;
                handlers.resolve(promise, response);
              }
            }, function (error) {
              if (!called) {
                called = true;
                handlers.reject(promise, error);
              }
            });
          }
        }
      }, {
        "1": 1
      }],
      3: [function (_dereq_, module, exports) {
        (function (global) {

          if (typeof global.Promise !== 'function') {
            global.Promise = _dereq_(2);
          }
        }).call(this, typeof commonjsGlobal$1 !== "undefined" ? commonjsGlobal$1 : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
      }, {
        "2": 2
      }],
      4: [function (_dereq_, module, exports) {

        var _typeof$1 = typeof Symbol === "function" && _typeof(Symbol.iterator) === "symbol" ? function (obj) {
          return _typeof(obj);
        } : function (obj) {
          return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof(obj);
        };

        function _classCallCheck(instance, Constructor) {
          if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
          }
        }

        function getIDB() {
          /* global indexedDB,webkitIndexedDB,mozIndexedDB,OIndexedDB,msIndexedDB */
          try {
            if (typeof indexedDB !== 'undefined') {
              return indexedDB;
            }

            if (typeof webkitIndexedDB !== 'undefined') {
              return webkitIndexedDB;
            }

            if (typeof mozIndexedDB !== 'undefined') {
              return mozIndexedDB;
            }

            if (typeof OIndexedDB !== 'undefined') {
              return OIndexedDB;
            }

            if (typeof msIndexedDB !== 'undefined') {
              return msIndexedDB;
            }
          } catch (e) {
            return;
          }
        }

        var idb = getIDB();

        function isIndexedDBValid() {
          try {
            // Initialize IndexedDB; fall back to vendor-prefixed versions
            // if needed.
            if (!idb || !idb.open) {
              return false;
            } // We mimic PouchDB here;
            //
            // We test for openDatabase because IE Mobile identifies itself
            // as Safari. Oh the lulz...


            var isSafari = typeof openDatabase !== 'undefined' && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform);
            var hasFetch = typeof fetch === 'function' && fetch.toString().indexOf('[native code') !== -1; // Safari <10.1 does not meet our requirements for IDB support
            // (see: https://github.com/pouchdb/pouchdb/issues/5572).
            // Safari 10.1 shipped with fetch, we can use that to detect it.
            // Note: this creates issues with `window.fetch` polyfills and
            // overrides; see:
            // https://github.com/localForage/localForage/issues/856

            return (!isSafari || hasFetch) && typeof indexedDB !== 'undefined' && // some outdated implementations of IDB that appear on Samsung
            // and HTC Android devices <4.4 are missing IDBKeyRange
            // See: https://github.com/mozilla/localForage/issues/128
            // See: https://github.com/mozilla/localForage/issues/272
            typeof IDBKeyRange !== 'undefined';
          } catch (e) {
            return false;
          }
        } // Abstracts constructing a Blob object, so it also works in older
        // browsers that don't support the native Blob constructor. (i.e.
        // old QtWebKit versions, at least).
        // Abstracts constructing a Blob object, so it also works in older
        // browsers that don't support the native Blob constructor. (i.e.
        // old QtWebKit versions, at least).


        function createBlob(parts, properties) {
          /* global BlobBuilder,MSBlobBuilder,MozBlobBuilder,WebKitBlobBuilder */
          parts = parts || [];
          properties = properties || {};

          try {
            return new Blob(parts, properties);
          } catch (e) {
            if (e.name !== 'TypeError') {
              throw e;
            }

            var Builder = typeof BlobBuilder !== 'undefined' ? BlobBuilder : typeof MSBlobBuilder !== 'undefined' ? MSBlobBuilder : typeof MozBlobBuilder !== 'undefined' ? MozBlobBuilder : WebKitBlobBuilder;
            var builder = new Builder();

            for (var i = 0; i < parts.length; i += 1) {
              builder.append(parts[i]);
            }

            return builder.getBlob(properties.type);
          }
        } // This is CommonJS because lie is an external dependency, so Rollup
        // can just ignore it.


        if (typeof Promise === 'undefined') {
          // In the "nopromises" build this will just throw if you don't have
          // a global promise object, but it would throw anyway later.
          _dereq_(3);
        }

        var Promise$1 = Promise;

        function executeCallback(promise, callback) {
          if (callback) {
            promise.then(function (result) {
              callback(null, result);
            }, function (error) {
              callback(error);
            });
          }
        }

        function executeTwoCallbacks(promise, callback, errorCallback) {
          if (typeof callback === 'function') {
            promise.then(callback);
          }

          if (typeof errorCallback === 'function') {
            promise["catch"](errorCallback);
          }
        }

        function normalizeKey(key) {
          // Cast the key to a string, as that's all we can set as a key.
          if (typeof key !== 'string') {
            console.warn(key + ' used as a key, but it is not a string.');
            key = String(key);
          }

          return key;
        }

        function getCallback() {
          if (arguments.length && typeof arguments[arguments.length - 1] === 'function') {
            return arguments[arguments.length - 1];
          }
        } // Some code originally from async_storage.js in
        // [Gaia](https://github.com/mozilla-b2g/gaia).


        var DETECT_BLOB_SUPPORT_STORE = 'local-forage-detect-blob-support';
        var supportsBlobs = void 0;
        var dbContexts = {};
        var toString = Object.prototype.toString; // Transaction Modes

        var READ_ONLY = 'readonly';
        var READ_WRITE = 'readwrite'; // Transform a binary string to an array buffer, because otherwise
        // weird stuff happens when you try to work with the binary string directly.
        // It is known.
        // From http://stackoverflow.com/questions/14967647/ (continues on next line)
        // encode-decode-image-with-base64-breaks-image (2013-04-21)

        function _binStringToArrayBuffer(bin) {
          var length = bin.length;
          var buf = new ArrayBuffer(length);
          var arr = new Uint8Array(buf);

          for (var i = 0; i < length; i++) {
            arr[i] = bin.charCodeAt(i);
          }

          return buf;
        } //
        // Blobs are not supported in all versions of IndexedDB, notably
        // Chrome <37 and Android <5. In those versions, storing a blob will throw.
        //
        // Various other blob bugs exist in Chrome v37-42 (inclusive).
        // Detecting them is expensive and confusing to users, and Chrome 37-42
        // is at very low usage worldwide, so we do a hacky userAgent check instead.
        //
        // content-type bug: https://code.google.com/p/chromium/issues/detail?id=408120
        // 404 bug: https://code.google.com/p/chromium/issues/detail?id=447916
        // FileReader bug: https://code.google.com/p/chromium/issues/detail?id=447836
        //
        // Code borrowed from PouchDB. See:
        // https://github.com/pouchdb/pouchdb/blob/master/packages/node_modules/pouchdb-adapter-idb/src/blobSupport.js
        //


        function _checkBlobSupportWithoutCaching(idb) {
          return new Promise$1(function (resolve) {
            var txn = idb.transaction(DETECT_BLOB_SUPPORT_STORE, READ_WRITE);
            var blob = createBlob(['']);
            txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, 'key');

            txn.onabort = function (e) {
              // If the transaction aborts now its due to not being able to
              // write to the database, likely due to the disk being full
              e.preventDefault();
              e.stopPropagation();
              resolve(false);
            };

            txn.oncomplete = function () {
              var matchedChrome = navigator.userAgent.match(/Chrome\/(\d+)/);
              var matchedEdge = navigator.userAgent.match(/Edge\//); // MS Edge pretends to be Chrome 42:
              // https://msdn.microsoft.com/en-us/library/hh869301%28v=vs.85%29.aspx

              resolve(matchedEdge || !matchedChrome || parseInt(matchedChrome[1], 10) >= 43);
            };
          })["catch"](function () {
            return false; // error, so assume unsupported
          });
        }

        function _checkBlobSupport(idb) {
          if (typeof supportsBlobs === 'boolean') {
            return Promise$1.resolve(supportsBlobs);
          }

          return _checkBlobSupportWithoutCaching(idb).then(function (value) {
            supportsBlobs = value;
            return supportsBlobs;
          });
        }

        function _deferReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name]; // Create a deferred object representing the current database operation.

          var deferredOperation = {};
          deferredOperation.promise = new Promise$1(function (resolve, reject) {
            deferredOperation.resolve = resolve;
            deferredOperation.reject = reject;
          }); // Enqueue the deferred operation.

          dbContext.deferredOperations.push(deferredOperation); // Chain its promise to the database readiness.

          if (!dbContext.dbReady) {
            dbContext.dbReady = deferredOperation.promise;
          } else {
            dbContext.dbReady = dbContext.dbReady.then(function () {
              return deferredOperation.promise;
            });
          }
        }

        function _advanceReadiness(dbInfo) {
          var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

          var deferredOperation = dbContext.deferredOperations.pop(); // Resolve its promise (which is part of the database readiness
          // chain of promises).

          if (deferredOperation) {
            deferredOperation.resolve();
            return deferredOperation.promise;
          }
        }

        function _rejectReadiness(dbInfo, err) {
          var dbContext = dbContexts[dbInfo.name]; // Dequeue a deferred operation.

          var deferredOperation = dbContext.deferredOperations.pop(); // Reject its promise (which is part of the database readiness
          // chain of promises).

          if (deferredOperation) {
            deferredOperation.reject(err);
            return deferredOperation.promise;
          }
        }

        function _getConnection(dbInfo, upgradeNeeded) {
          return new Promise$1(function (resolve, reject) {
            dbContexts[dbInfo.name] = dbContexts[dbInfo.name] || createDbContext();

            if (dbInfo.db) {
              if (upgradeNeeded) {
                _deferReadiness(dbInfo);

                dbInfo.db.close();
              } else {
                return resolve(dbInfo.db);
              }
            }

            var dbArgs = [dbInfo.name];

            if (upgradeNeeded) {
              dbArgs.push(dbInfo.version);
            }

            var openreq = idb.open.apply(idb, dbArgs);

            if (upgradeNeeded) {
              openreq.onupgradeneeded = function (e) {
                var db = openreq.result;

                try {
                  db.createObjectStore(dbInfo.storeName);

                  if (e.oldVersion <= 1) {
                    // Added when support for blob shims was added
                    db.createObjectStore(DETECT_BLOB_SUPPORT_STORE);
                  }
                } catch (ex) {
                  if (ex.name === 'ConstraintError') {
                    console.warn('The database "' + dbInfo.name + '"' + ' has been upgraded from version ' + e.oldVersion + ' to version ' + e.newVersion + ', but the storage "' + dbInfo.storeName + '" already exists.');
                  } else {
                    throw ex;
                  }
                }
              };
            }

            openreq.onerror = function (e) {
              e.preventDefault();
              reject(openreq.error);
            };

            openreq.onsuccess = function () {
              var db = openreq.result;

              db.onversionchange = function (e) {
                // Triggered when the database is modified (e.g. adding an objectStore) or
                // deleted (even when initiated by other sessions in different tabs).
                // Closing the connection here prevents those operations from being blocked.
                // If the database is accessed again later by this instance, the connection
                // will be reopened or the database recreated as needed.
                e.target.close();
              };

              resolve(db);

              _advanceReadiness(dbInfo);
            };
          });
        }

        function _getOriginalConnection(dbInfo) {
          return _getConnection(dbInfo, false);
        }

        function _getUpgradedConnection(dbInfo) {
          return _getConnection(dbInfo, true);
        }

        function _isUpgradeNeeded(dbInfo, defaultVersion) {
          if (!dbInfo.db) {
            return true;
          }

          var isNewStore = !dbInfo.db.objectStoreNames.contains(dbInfo.storeName);
          var isDowngrade = dbInfo.version < dbInfo.db.version;
          var isUpgrade = dbInfo.version > dbInfo.db.version;

          if (isDowngrade) {
            // If the version is not the default one
            // then warn for impossible downgrade.
            if (dbInfo.version !== defaultVersion) {
              console.warn('The database "' + dbInfo.name + '"' + " can't be downgraded from version " + dbInfo.db.version + ' to version ' + dbInfo.version + '.');
            } // Align the versions to prevent errors.


            dbInfo.version = dbInfo.db.version;
          }

          if (isUpgrade || isNewStore) {
            // If the store is new then increment the version (if needed).
            // This will trigger an "upgradeneeded" event which is required
            // for creating a store.
            if (isNewStore) {
              var incVersion = dbInfo.db.version + 1;

              if (incVersion > dbInfo.version) {
                dbInfo.version = incVersion;
              }
            }

            return true;
          }

          return false;
        } // encode a blob for indexeddb engines that don't support blobs


        function _encodeBlob(blob) {
          return new Promise$1(function (resolve, reject) {
            var reader = new FileReader();
            reader.onerror = reject;

            reader.onloadend = function (e) {
              var base64 = btoa(e.target.result || '');
              resolve({
                __local_forage_encoded_blob: true,
                data: base64,
                type: blob.type
              });
            };

            reader.readAsBinaryString(blob);
          });
        } // decode an encoded blob


        function _decodeBlob(encodedBlob) {
          var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));

          return createBlob([arrayBuff], {
            type: encodedBlob.type
          });
        } // is this one of our fancy encoded blobs?


        function _isEncodedBlob(value) {
          return value && value.__local_forage_encoded_blob;
        } // Specialize the default `ready()` function by making it dependent
        // on the current database operations. Thus, the driver will be actually
        // ready when it's been initialized (default) *and* there are no pending
        // operations on the database (initiated by some other instances).


        function _fullyReady(callback) {
          var self = this;

          var promise = self._initReady().then(function () {
            var dbContext = dbContexts[self._dbInfo.name];

            if (dbContext && dbContext.dbReady) {
              return dbContext.dbReady;
            }
          });

          executeTwoCallbacks(promise, callback, callback);
          return promise;
        } // Try to establish a new db connection to replace the
        // current one which is broken (i.e. experiencing
        // InvalidStateError while creating a transaction).


        function _tryReconnect(dbInfo) {
          _deferReadiness(dbInfo);

          var dbContext = dbContexts[dbInfo.name];
          var forages = dbContext.forages;

          for (var i = 0; i < forages.length; i++) {
            var forage = forages[i];

            if (forage._dbInfo.db) {
              forage._dbInfo.db.close();

              forage._dbInfo.db = null;
            }
          }

          dbInfo.db = null;
          return _getOriginalConnection(dbInfo).then(function (db) {
            dbInfo.db = db;

            if (_isUpgradeNeeded(dbInfo)) {
              // Reopen the database for upgrading.
              return _getUpgradedConnection(dbInfo);
            }

            return db;
          }).then(function (db) {
            // store the latest db reference
            // in case the db was upgraded
            dbInfo.db = dbContext.db = db;

            for (var i = 0; i < forages.length; i++) {
              forages[i]._dbInfo.db = db;
            }
          })["catch"](function (err) {
            _rejectReadiness(dbInfo, err);

            throw err;
          });
        } // FF doesn't like Promises (micro-tasks) and IDDB store operations,
        // so we have to do it with callbacks


        function createTransaction(dbInfo, mode, callback, retries) {
          if (retries === undefined) {
            retries = 1;
          }

          try {
            var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
            callback(null, tx);
          } catch (err) {
            if (retries > 0 && (!dbInfo.db || err.name === 'InvalidStateError' || err.name === 'NotFoundError')) {
              return Promise$1.resolve().then(function () {
                if (!dbInfo.db || err.name === 'NotFoundError' && !dbInfo.db.objectStoreNames.contains(dbInfo.storeName) && dbInfo.version <= dbInfo.db.version) {
                  // increase the db version, to create the new ObjectStore
                  if (dbInfo.db) {
                    dbInfo.version = dbInfo.db.version + 1;
                  } // Reopen the database for upgrading.


                  return _getUpgradedConnection(dbInfo);
                }
              }).then(function () {
                return _tryReconnect(dbInfo).then(function () {
                  createTransaction(dbInfo, mode, callback, retries - 1);
                });
              })["catch"](callback);
            }

            callback(err);
          }
        }

        function createDbContext() {
          return {
            // Running localForages sharing a database.
            forages: [],
            // Shared database.
            db: null,
            // Database readiness (promise).
            dbReady: null,
            // Deferred operations on the database.
            deferredOperations: []
          };
        } // Open the IndexedDB database (automatically creates one if one didn't
        // previously exist), using any options set in the config.


        function _initStorage(options) {
          var self = this;
          var dbInfo = {
            db: null
          };

          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          } // Get the current context of the database;


          var dbContext = dbContexts[dbInfo.name]; // ...or create a new context.

          if (!dbContext) {
            dbContext = createDbContext(); // Register the new context in the global container.

            dbContexts[dbInfo.name] = dbContext;
          } // Register itself as a running localForage in the current context.


          dbContext.forages.push(self); // Replace the default `ready()` function with the specialized one.

          if (!self._initReady) {
            self._initReady = self.ready;
            self.ready = _fullyReady;
          } // Create an array of initialization states of the related localForages.


          var initPromises = [];

          function ignoreErrors() {
            // Don't handle errors here,
            // just makes sure related localForages aren't pending.
            return Promise$1.resolve();
          }

          for (var j = 0; j < dbContext.forages.length; j++) {
            var forage = dbContext.forages[j];

            if (forage !== self) {
              // Don't wait for itself...
              initPromises.push(forage._initReady()["catch"](ignoreErrors));
            }
          } // Take a snapshot of the related localForages.


          var forages = dbContext.forages.slice(0); // Initialize the connection process only when
          // all the related localForages aren't pending.

          return Promise$1.all(initPromises).then(function () {
            dbInfo.db = dbContext.db; // Get the connection or open a new one without upgrade.

            return _getOriginalConnection(dbInfo);
          }).then(function (db) {
            dbInfo.db = db;

            if (_isUpgradeNeeded(dbInfo, self._defaultConfig.version)) {
              // Reopen the database for upgrading.
              return _getUpgradedConnection(dbInfo);
            }

            return db;
          }).then(function (db) {
            dbInfo.db = dbContext.db = db;
            self._dbInfo = dbInfo; // Share the final connection amongst related localForages.

            for (var k = 0; k < forages.length; k++) {
              var forage = forages[k];

              if (forage !== self) {
                // Self is already up-to-date.
                forage._dbInfo.db = dbInfo.db;
                forage._dbInfo.version = dbInfo.version;
              }
            }
          });
        }

        function getItem(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.get(key);

                  req.onsuccess = function () {
                    var value = req.result;

                    if (value === undefined) {
                      value = null;
                    }

                    if (_isEncodedBlob(value)) {
                      value = _decodeBlob(value);
                    }

                    resolve(value);
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // Iterate over all items stored in database.


        function iterate(iterator, callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.openCursor();
                  var iterationNumber = 1;

                  req.onsuccess = function () {
                    var cursor = req.result;

                    if (cursor) {
                      var value = cursor.value;

                      if (_isEncodedBlob(value)) {
                        value = _decodeBlob(value);
                      }

                      var result = iterator(value, cursor.key, iterationNumber++); // when the iterator callback returns any
                      // (non-`undefined`) value, then we stop
                      // the iteration immediately

                      if (result !== void 0) {
                        resolve(result);
                      } else {
                        cursor["continue"]();
                      }
                    } else {
                      resolve();
                    }
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function setItem(key, value, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            var dbInfo;
            self.ready().then(function () {
              dbInfo = self._dbInfo;

              if (toString.call(value) === '[object Blob]') {
                return _checkBlobSupport(dbInfo.db).then(function (blobSupport) {
                  if (blobSupport) {
                    return value;
                  }

                  return _encodeBlob(value);
                });
              }

              return value;
            }).then(function (value) {
              createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName); // The reason we don't _save_ null is because IE 10 does
                  // not support saving the `null` type in IndexedDB. How
                  // ironic, given the bug below!
                  // See: https://github.com/mozilla/localForage/issues/161

                  if (value === null) {
                    value = undefined;
                  }

                  var req = store.put(value, key);

                  transaction.oncomplete = function () {
                    // Cast to undefined so the value passed to
                    // callback/promise is the same as what one would get out
                    // of `getItem()` later. This leads to some weirdness
                    // (setItem('foo', undefined) will return `null`), but
                    // it's not my fault localStorage is our baseline and that
                    // it's weird.
                    if (value === undefined) {
                      value = null;
                    }

                    resolve(value);
                  };

                  transaction.onabort = transaction.onerror = function () {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function removeItem(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName); // We use a Grunt task to make this safe for IE and some
                  // versions of Android (including those used by Cordova).
                  // Normally IE won't like `.delete()` and will insist on
                  // using `['delete']()`, but we have a build step that
                  // fixes this for us now.

                  var req = store["delete"](key);

                  transaction.oncomplete = function () {
                    resolve();
                  };

                  transaction.onerror = function () {
                    reject(req.error);
                  }; // The request will be also be aborted if we've exceeded our storage
                  // space.


                  transaction.onabort = function () {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function clear(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_WRITE, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.clear();

                  transaction.oncomplete = function () {
                    resolve();
                  };

                  transaction.onabort = transaction.onerror = function () {
                    var err = req.error ? req.error : req.transaction.error;
                    reject(err);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function length(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.count();

                  req.onsuccess = function () {
                    resolve(req.result);
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function key(n, callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            if (n < 0) {
              resolve(null);
              return;
            }

            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var advanced = false;
                  var req = store.openKeyCursor();

                  req.onsuccess = function () {
                    var cursor = req.result;

                    if (!cursor) {
                      // this means there weren't enough keys
                      resolve(null);
                      return;
                    }

                    if (n === 0) {
                      // We have the first key, return it if that's what they
                      // wanted.
                      resolve(cursor.key);
                    } else {
                      if (!advanced) {
                        // Otherwise, ask the cursor to skip ahead n
                        // records.
                        advanced = true;
                        cursor.advance(n);
                      } else {
                        // When we get here, we've got the nth key.
                        resolve(cursor.key);
                      }
                    }
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function keys(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              createTransaction(self._dbInfo, READ_ONLY, function (err, transaction) {
                if (err) {
                  return reject(err);
                }

                try {
                  var store = transaction.objectStore(self._dbInfo.storeName);
                  var req = store.openKeyCursor();
                  var keys = [];

                  req.onsuccess = function () {
                    var cursor = req.result;

                    if (!cursor) {
                      resolve(keys);
                      return;
                    }

                    keys.push(cursor.key);
                    cursor["continue"]();
                  };

                  req.onerror = function () {
                    reject(req.error);
                  };
                } catch (e) {
                  reject(e);
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function dropInstance(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== 'function' && options || {};

          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }

          var self = this;
          var promise;

          if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
          } else {
            var isCurrentDb = options.name === currentConfig.name && self._dbInfo.db;
            var dbPromise = isCurrentDb ? Promise$1.resolve(self._dbInfo.db) : _getOriginalConnection(options).then(function (db) {
              var dbContext = dbContexts[options.name];
              var forages = dbContext.forages;
              dbContext.db = db;

              for (var i = 0; i < forages.length; i++) {
                forages[i]._dbInfo.db = db;
              }

              return db;
            });

            if (!options.storeName) {
              promise = dbPromise.then(function (db) {
                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();

                for (var i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db = null;
                }

                var dropDBPromise = new Promise$1(function (resolve, reject) {
                  var req = idb.deleteDatabase(options.name);

                  req.onerror = function () {
                    var db = req.result;

                    if (db) {
                      db.close();
                    }

                    reject(req.error);
                  };

                  req.onblocked = function () {
                    // Closing all open connections in onversionchange handler should prevent this situation, but if
                    // we do get here, it just means the request remains pending - eventually it will succeed or error
                    console.warn('dropInstance blocked for database "' + options.name + '" until all open connections are closed');
                  };

                  req.onsuccess = function () {
                    var db = req.result;

                    if (db) {
                      db.close();
                    }

                    resolve(db);
                  };
                });
                return dropDBPromise.then(function (db) {
                  dbContext.db = db;

                  for (var i = 0; i < forages.length; i++) {
                    var _forage = forages[i];

                    _advanceReadiness(_forage._dbInfo);
                  }
                })["catch"](function (err) {
                  (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                  throw err;
                });
              });
            } else {
              promise = dbPromise.then(function (db) {
                if (!db.objectStoreNames.contains(options.storeName)) {
                  return;
                }

                var newVersion = db.version + 1;

                _deferReadiness(options);

                var dbContext = dbContexts[options.name];
                var forages = dbContext.forages;
                db.close();

                for (var i = 0; i < forages.length; i++) {
                  var forage = forages[i];
                  forage._dbInfo.db = null;
                  forage._dbInfo.version = newVersion;
                }

                var dropObjectPromise = new Promise$1(function (resolve, reject) {
                  var req = idb.open(options.name, newVersion);

                  req.onerror = function (err) {
                    var db = req.result;
                    db.close();
                    reject(err);
                  };

                  req.onupgradeneeded = function () {
                    var db = req.result;
                    db.deleteObjectStore(options.storeName);
                  };

                  req.onsuccess = function () {
                    var db = req.result;
                    db.close();
                    resolve(db);
                  };
                });
                return dropObjectPromise.then(function (db) {
                  dbContext.db = db;

                  for (var j = 0; j < forages.length; j++) {
                    var _forage2 = forages[j];
                    _forage2._dbInfo.db = db;

                    _advanceReadiness(_forage2._dbInfo);
                  }
                })["catch"](function (err) {
                  (_rejectReadiness(options, err) || Promise$1.resolve())["catch"](function () {});
                  throw err;
                });
              });
            }
          }

          executeCallback(promise, callback);
          return promise;
        }

        var asyncStorage = {
          _driver: 'asyncStorage',
          _initStorage: _initStorage,
          _support: isIndexedDBValid(),
          iterate: iterate,
          getItem: getItem,
          setItem: setItem,
          removeItem: removeItem,
          clear: clear,
          length: length,
          key: key,
          keys: keys,
          dropInstance: dropInstance
        };

        function isWebSQLValid() {
          return typeof openDatabase === 'function';
        } // Sadly, the best way to save binary data in WebSQL/localStorage is serializing
        // it to Base64, so this is how we store it to prevent very strange errors with less
        // verbose ways of binary <-> string data storage.


        var BASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
        var BLOB_TYPE_PREFIX = '~~local_forage_type~';
        var BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/;
        var SERIALIZED_MARKER = '__lfsc__:';
        var SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length; // OMG the serializations!

        var TYPE_ARRAYBUFFER = 'arbf';
        var TYPE_BLOB = 'blob';
        var TYPE_INT8ARRAY = 'si08';
        var TYPE_UINT8ARRAY = 'ui08';
        var TYPE_UINT8CLAMPEDARRAY = 'uic8';
        var TYPE_INT16ARRAY = 'si16';
        var TYPE_INT32ARRAY = 'si32';
        var TYPE_UINT16ARRAY = 'ur16';
        var TYPE_UINT32ARRAY = 'ui32';
        var TYPE_FLOAT32ARRAY = 'fl32';
        var TYPE_FLOAT64ARRAY = 'fl64';
        var TYPE_SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length;
        var toString$1 = Object.prototype.toString;

        function stringToBuffer(serializedString) {
          // Fill the string into a ArrayBuffer.
          var bufferLength = serializedString.length * 0.75;
          var len = serializedString.length;
          var i;
          var p = 0;
          var encoded1, encoded2, encoded3, encoded4;

          if (serializedString[serializedString.length - 1] === '=') {
            bufferLength--;

            if (serializedString[serializedString.length - 2] === '=') {
              bufferLength--;
            }
          }

          var buffer = new ArrayBuffer(bufferLength);
          var bytes = new Uint8Array(buffer);

          for (i = 0; i < len; i += 4) {
            encoded1 = BASE_CHARS.indexOf(serializedString[i]);
            encoded2 = BASE_CHARS.indexOf(serializedString[i + 1]);
            encoded3 = BASE_CHARS.indexOf(serializedString[i + 2]);
            encoded4 = BASE_CHARS.indexOf(serializedString[i + 3]);
            /*jslint bitwise: true */

            bytes[p++] = encoded1 << 2 | encoded2 >> 4;
            bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
            bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
          }

          return buffer;
        } // Converts a buffer to a string to store, serialized, in the backend
        // storage library.


        function bufferToString(buffer) {
          // base64-arraybuffer
          var bytes = new Uint8Array(buffer);
          var base64String = '';
          var i;

          for (i = 0; i < bytes.length; i += 3) {
            /*jslint bitwise: true */
            base64String += BASE_CHARS[bytes[i] >> 2];
            base64String += BASE_CHARS[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
            base64String += BASE_CHARS[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
            base64String += BASE_CHARS[bytes[i + 2] & 63];
          }

          if (bytes.length % 3 === 2) {
            base64String = base64String.substring(0, base64String.length - 1) + '=';
          } else if (bytes.length % 3 === 1) {
            base64String = base64String.substring(0, base64String.length - 2) + '==';
          }

          return base64String;
        } // Serialize a value, afterwards executing a callback (which usually
        // instructs the `setItem()` callback/promise to be executed). This is how
        // we store binary data with localStorage.


        function serialize(value, callback) {
          var valueType = '';

          if (value) {
            valueType = toString$1.call(value);
          } // Cannot use `value instanceof ArrayBuffer` or such here, as these
          // checks fail when running the tests using casper.js...
          //
          // TODO: See why those tests fail and use a better solution.


          if (value && (valueType === '[object ArrayBuffer]' || value.buffer && toString$1.call(value.buffer) === '[object ArrayBuffer]')) {
            // Convert binary arrays to a string and prefix the string with
            // a special marker.
            var buffer;
            var marker = SERIALIZED_MARKER;

            if (value instanceof ArrayBuffer) {
              buffer = value;
              marker += TYPE_ARRAYBUFFER;
            } else {
              buffer = value.buffer;

              if (valueType === '[object Int8Array]') {
                marker += TYPE_INT8ARRAY;
              } else if (valueType === '[object Uint8Array]') {
                marker += TYPE_UINT8ARRAY;
              } else if (valueType === '[object Uint8ClampedArray]') {
                marker += TYPE_UINT8CLAMPEDARRAY;
              } else if (valueType === '[object Int16Array]') {
                marker += TYPE_INT16ARRAY;
              } else if (valueType === '[object Uint16Array]') {
                marker += TYPE_UINT16ARRAY;
              } else if (valueType === '[object Int32Array]') {
                marker += TYPE_INT32ARRAY;
              } else if (valueType === '[object Uint32Array]') {
                marker += TYPE_UINT32ARRAY;
              } else if (valueType === '[object Float32Array]') {
                marker += TYPE_FLOAT32ARRAY;
              } else if (valueType === '[object Float64Array]') {
                marker += TYPE_FLOAT64ARRAY;
              } else {
                callback(new Error('Failed to get type for BinaryArray'));
              }
            }

            callback(marker + bufferToString(buffer));
          } else if (valueType === '[object Blob]') {
            // Conver the blob to a binaryArray and then to a string.
            var fileReader = new FileReader();

            fileReader.onload = function () {
              // Backwards-compatible prefix for the blob type.
              var str = BLOB_TYPE_PREFIX + value.type + '~' + bufferToString(this.result);
              callback(SERIALIZED_MARKER + TYPE_BLOB + str);
            };

            fileReader.readAsArrayBuffer(value);
          } else {
            try {
              callback(JSON.stringify(value));
            } catch (e) {
              console.error("Couldn't convert value into a JSON string: ", value);
              callback(null, e);
            }
          }
        } // Deserialize data we've inserted into a value column/field. We place
        // special markers into our strings to mark them as encoded; this isn't
        // as nice as a meta field, but it's the only sane thing we can do whilst
        // keeping localStorage support intact.
        //
        // Oftentimes this will just deserialize JSON content, but if we have a
        // special marker (SERIALIZED_MARKER, defined above), we will extract
        // some kind of arraybuffer/binary data/typed array out of the string.


        function deserialize(value) {
          // If we haven't marked this string as being specially serialized (i.e.
          // something other than serialized JSON), we can just return it and be
          // done with it.
          if (value.substring(0, SERIALIZED_MARKER_LENGTH) !== SERIALIZED_MARKER) {
            return JSON.parse(value);
          } // The following code deals with deserializing some kind of Blob or
          // TypedArray. First we separate out the type of data we're dealing
          // with from the data itself.


          var serializedString = value.substring(TYPE_SERIALIZED_MARKER_LENGTH);
          var type = value.substring(SERIALIZED_MARKER_LENGTH, TYPE_SERIALIZED_MARKER_LENGTH);
          var blobType; // Backwards-compatible blob type serialization strategy.
          // DBs created with older versions of localForage will simply not have the blob type.

          if (type === TYPE_BLOB && BLOB_TYPE_PREFIX_REGEX.test(serializedString)) {
            var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
            blobType = matcher[1];
            serializedString = serializedString.substring(matcher[0].length);
          }

          var buffer = stringToBuffer(serializedString); // Return the right type based on the code/type set during
          // serialization.

          switch (type) {
            case TYPE_ARRAYBUFFER:
              return buffer;

            case TYPE_BLOB:
              return createBlob([buffer], {
                type: blobType
              });

            case TYPE_INT8ARRAY:
              return new Int8Array(buffer);

            case TYPE_UINT8ARRAY:
              return new Uint8Array(buffer);

            case TYPE_UINT8CLAMPEDARRAY:
              return new Uint8ClampedArray(buffer);

            case TYPE_INT16ARRAY:
              return new Int16Array(buffer);

            case TYPE_UINT16ARRAY:
              return new Uint16Array(buffer);

            case TYPE_INT32ARRAY:
              return new Int32Array(buffer);

            case TYPE_UINT32ARRAY:
              return new Uint32Array(buffer);

            case TYPE_FLOAT32ARRAY:
              return new Float32Array(buffer);

            case TYPE_FLOAT64ARRAY:
              return new Float64Array(buffer);

            default:
              throw new Error('Unkown type: ' + type);
          }
        }

        var localforageSerializer = {
          serialize: serialize,
          deserialize: deserialize,
          stringToBuffer: stringToBuffer,
          bufferToString: bufferToString
        };
        /*
         * Includes code from:
         *
         * base64-arraybuffer
         * https://github.com/niklasvh/base64-arraybuffer
         *
         * Copyright (c) 2012 Niklas von Hertzen
         * Licensed under the MIT license.
         */

        function createDbTable(t, dbInfo, callback, errorCallback) {
          t.executeSql('CREATE TABLE IF NOT EXISTS ' + dbInfo.storeName + ' ' + '(id INTEGER PRIMARY KEY, key unique, value)', [], callback, errorCallback);
        } // Open the WebSQL database (automatically creates one if one didn't
        // previously exist), using any options set in the config.


        function _initStorage$1(options) {
          var self = this;
          var dbInfo = {
            db: null
          };

          if (options) {
            for (var i in options) {
              dbInfo[i] = typeof options[i] !== 'string' ? options[i].toString() : options[i];
            }
          }

          var dbInfoPromise = new Promise$1(function (resolve, reject) {
            // Open the database; the openDatabase API will automatically
            // create it for us if it doesn't exist.
            try {
              dbInfo.db = openDatabase(dbInfo.name, String(dbInfo.version), dbInfo.description, dbInfo.size);
            } catch (e) {
              return reject(e);
            } // Create our key/value table if it doesn't exist.


            dbInfo.db.transaction(function (t) {
              createDbTable(t, dbInfo, function () {
                self._dbInfo = dbInfo;
                resolve();
              }, function (t, error) {
                reject(error);
              });
            }, reject);
          });
          dbInfo.serializer = localforageSerializer;
          return dbInfoPromise;
        }

        function tryExecuteSql(t, dbInfo, sqlStatement, args, callback, errorCallback) {
          t.executeSql(sqlStatement, args, callback, function (t, error) {
            if (error.code === error.SYNTAX_ERR) {
              t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name = ?", [dbInfo.storeName], function (t, results) {
                if (!results.rows.length) {
                  // if the table is missing (was deleted)
                  // re-create it table and retry
                  createDbTable(t, dbInfo, function () {
                    t.executeSql(sqlStatement, args, callback, errorCallback);
                  }, errorCallback);
                } else {
                  errorCallback(t, error);
                }
              }, errorCallback);
            } else {
              errorCallback(t, error);
            }
          }, errorCallback);
        }

        function getItem$1(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName + ' WHERE key = ? LIMIT 1', [key], function (t, results) {
                  var result = results.rows.length ? results.rows.item(0).value : null; // Check to see if this is serialized content we need to
                  // unpack.

                  if (result) {
                    result = dbInfo.serializer.deserialize(result);
                  }

                  resolve(result);
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function iterate$1(iterator, callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT * FROM ' + dbInfo.storeName, [], function (t, results) {
                  var rows = results.rows;
                  var length = rows.length;

                  for (var i = 0; i < length; i++) {
                    var item = rows.item(i);
                    var result = item.value; // Check to see if this is serialized content
                    // we need to unpack.

                    if (result) {
                      result = dbInfo.serializer.deserialize(result);
                    }

                    result = iterator(result, item.key, i + 1); // void(0) prevents problems with redefinition
                    // of `undefined`.

                    if (result !== void 0) {
                      resolve(result);
                      return;
                    }
                  }

                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function _setItem(key, value, callback, retriesLeft) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              // The localStorage API doesn't return undefined values in an
              // "expected" way, so undefined is always cast to null in all
              // drivers. See: https://github.com/mozilla/localForage/pull/42
              if (value === undefined) {
                value = null;
              } // Save the original value to pass to the callback.


              var originalValue = value;
              var dbInfo = self._dbInfo;
              dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                  reject(error);
                } else {
                  dbInfo.db.transaction(function (t) {
                    tryExecuteSql(t, dbInfo, 'INSERT OR REPLACE INTO ' + dbInfo.storeName + ' ' + '(key, value) VALUES (?, ?)', [key, value], function () {
                      resolve(originalValue);
                    }, function (t, error) {
                      reject(error);
                    });
                  }, function (sqlError) {
                    // The transaction failed; check
                    // to see if it's a quota error.
                    if (sqlError.code === sqlError.QUOTA_ERR) {
                      // We reject the callback outright for now, but
                      // it's worth trying to re-run the transaction.
                      // Even if the user accepts the prompt to use
                      // more storage on Safari, this error will
                      // be called.
                      //
                      // Try to re-run the transaction.
                      if (retriesLeft > 0) {
                        resolve(_setItem.apply(self, [key, originalValue, callback, retriesLeft - 1]));
                        return;
                      }

                      reject(sqlError);
                    }
                  });
                }
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function setItem$1(key, value, callback) {
          return _setItem.apply(this, [key, value, callback, 1]);
        }

        function removeItem$1(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName + ' WHERE key = ?', [key], function () {
                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // Deletes every item in the table.
        // TODO: Find out if this resets the AUTO_INCREMENT number.


        function clear$1(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'DELETE FROM ' + dbInfo.storeName, [], function () {
                  resolve();
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // Does a simple `COUNT(key)` to get the number of items stored in
        // localForage.


        function length$1(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                // Ahhh, SQL makes this one soooooo easy.
                tryExecuteSql(t, dbInfo, 'SELECT COUNT(key) as c FROM ' + dbInfo.storeName, [], function (t, results) {
                  var result = results.rows.item(0).c;
                  resolve(result);
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // Return the key located at key index X; essentially gets the key from a
        // `WHERE id = ?`. This is the most efficient way I can think to implement
        // this rarely-used (in my experience) part of the API, but it can seem
        // inconsistent, because we do `INSERT OR REPLACE INTO` on `setItem()`, so
        // the ID of each key will change every time it's updated. Perhaps a stored
        // procedure for the `setItem()` SQL would solve this problem?
        // TODO: Don't change ID on `setItem()`.


        function key$1(n, callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName + ' WHERE id = ? LIMIT 1', [n + 1], function (t, results) {
                  var result = results.rows.length ? results.rows.item(0).key : null;
                  resolve(result);
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        }

        function keys$1(callback) {
          var self = this;
          var promise = new Promise$1(function (resolve, reject) {
            self.ready().then(function () {
              var dbInfo = self._dbInfo;
              dbInfo.db.transaction(function (t) {
                tryExecuteSql(t, dbInfo, 'SELECT key FROM ' + dbInfo.storeName, [], function (t, results) {
                  var keys = [];

                  for (var i = 0; i < results.rows.length; i++) {
                    keys.push(results.rows.item(i).key);
                  }

                  resolve(keys);
                }, function (t, error) {
                  reject(error);
                });
              });
            })["catch"](reject);
          });
          executeCallback(promise, callback);
          return promise;
        } // https://www.w3.org/TR/webdatabase/#databases
        // > There is no way to enumerate or delete the databases available for an origin from this API.


        function getAllStoreNames(db) {
          return new Promise$1(function (resolve, reject) {
            db.transaction(function (t) {
              t.executeSql('SELECT name FROM sqlite_master ' + "WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], function (t, results) {
                var storeNames = [];

                for (var i = 0; i < results.rows.length; i++) {
                  storeNames.push(results.rows.item(i).name);
                }

                resolve({
                  db: db,
                  storeNames: storeNames
                });
              }, function (t, error) {
                reject(error);
              });
            }, function (sqlError) {
              reject(sqlError);
            });
          });
        }

        function dropInstance$1(options, callback) {
          callback = getCallback.apply(this, arguments);
          var currentConfig = this.config();
          options = typeof options !== 'function' && options || {};

          if (!options.name) {
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }

          var self = this;
          var promise;

          if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
          } else {
            promise = new Promise$1(function (resolve) {
              var db;

              if (options.name === currentConfig.name) {
                // use the db reference of the current instance
                db = self._dbInfo.db;
              } else {
                db = openDatabase(options.name, '', '', 0);
              }

              if (!options.storeName) {
                // drop all database tables
                resolve(getAllStoreNames(db));
              } else {
                resolve({
                  db: db,
                  storeNames: [options.storeName]
                });
              }
            }).then(function (operationInfo) {
              return new Promise$1(function (resolve, reject) {
                operationInfo.db.transaction(function (t) {
                  function dropTable(storeName) {
                    return new Promise$1(function (resolve, reject) {
                      t.executeSql('DROP TABLE IF EXISTS ' + storeName, [], function () {
                        resolve();
                      }, function (t, error) {
                        reject(error);
                      });
                    });
                  }

                  var operations = [];

                  for (var i = 0, len = operationInfo.storeNames.length; i < len; i++) {
                    operations.push(dropTable(operationInfo.storeNames[i]));
                  }

                  Promise$1.all(operations).then(function () {
                    resolve();
                  })["catch"](function (e) {
                    reject(e);
                  });
                }, function (sqlError) {
                  reject(sqlError);
                });
              });
            });
          }

          executeCallback(promise, callback);
          return promise;
        }

        var webSQLStorage = {
          _driver: 'webSQLStorage',
          _initStorage: _initStorage$1,
          _support: isWebSQLValid(),
          iterate: iterate$1,
          getItem: getItem$1,
          setItem: setItem$1,
          removeItem: removeItem$1,
          clear: clear$1,
          length: length$1,
          key: key$1,
          keys: keys$1,
          dropInstance: dropInstance$1
        };

        function isLocalStorageValid() {
          try {
            return typeof localStorage !== 'undefined' && 'setItem' in localStorage && // in IE8 typeof localStorage.setItem === 'object'
            !!localStorage.setItem;
          } catch (e) {
            return false;
          }
        }

        function _getKeyPrefix(options, defaultConfig) {
          var keyPrefix = options.name + '/';

          if (options.storeName !== defaultConfig.storeName) {
            keyPrefix += options.storeName + '/';
          }

          return keyPrefix;
        } // Check if localStorage throws when saving an item


        function checkIfLocalStorageThrows() {
          var localStorageTestKey = '_localforage_support_test';

          try {
            localStorage.setItem(localStorageTestKey, true);
            localStorage.removeItem(localStorageTestKey);
            return false;
          } catch (e) {
            return true;
          }
        } // Check if localStorage is usable and allows to save an item
        // This method checks if localStorage is usable in Safari Private Browsing
        // mode, or in any other case where the available quota for localStorage
        // is 0 and there wasn't any saved items yet.


        function _isLocalStorageUsable() {
          return !checkIfLocalStorageThrows() || localStorage.length > 0;
        } // Config the localStorage backend, using options set in the config.


        function _initStorage$2(options) {
          var self = this;
          var dbInfo = {};

          if (options) {
            for (var i in options) {
              dbInfo[i] = options[i];
            }
          }

          dbInfo.keyPrefix = _getKeyPrefix(options, self._defaultConfig);

          if (!_isLocalStorageUsable()) {
            return Promise$1.reject();
          }

          self._dbInfo = dbInfo;
          dbInfo.serializer = localforageSerializer;
          return Promise$1.resolve();
        } // Remove all keys from the datastore, effectively destroying all data in
        // the app's key/value store!


        function clear$2(callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var keyPrefix = self._dbInfo.keyPrefix;

            for (var i = localStorage.length - 1; i >= 0; i--) {
              var key = localStorage.key(i);

              if (key.indexOf(keyPrefix) === 0) {
                localStorage.removeItem(key);
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        } // Retrieve an item from the store. Unlike the original async_storage
        // library in Gaia, we don't modify return values at all. If a key's value
        // is `undefined`, we pass that value to the callback function.


        function getItem$2(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var result = localStorage.getItem(dbInfo.keyPrefix + key); // If a result was found, parse it from the serialized
            // string into a JS object. If result isn't truthy, the key
            // is likely undefined and we'll pass it straight to the
            // callback.

            if (result) {
              result = dbInfo.serializer.deserialize(result);
            }

            return result;
          });
          executeCallback(promise, callback);
          return promise;
        } // Iterate over all items in the store.


        function iterate$2(iterator, callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var keyPrefix = dbInfo.keyPrefix;
            var keyPrefixLength = keyPrefix.length;
            var length = localStorage.length; // We use a dedicated iterator instead of the `i` variable below
            // so other keys we fetch in localStorage aren't counted in
            // the `iterationNumber` argument passed to the `iterate()`
            // callback.
            //
            // See: github.com/mozilla/localForage/pull/435#discussion_r38061530

            var iterationNumber = 1;

            for (var i = 0; i < length; i++) {
              var key = localStorage.key(i);

              if (key.indexOf(keyPrefix) !== 0) {
                continue;
              }

              var value = localStorage.getItem(key); // If a result was found, parse it from the serialized
              // string into a JS object. If result isn't truthy, the
              // key is likely undefined and we'll pass it straight
              // to the iterator.

              if (value) {
                value = dbInfo.serializer.deserialize(value);
              }

              value = iterator(value, key.substring(keyPrefixLength), iterationNumber++);

              if (value !== void 0) {
                return value;
              }
            }
          });
          executeCallback(promise, callback);
          return promise;
        } // Same as localStorage's key() method, except takes a callback.


        function key$2(n, callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var result;

            try {
              result = localStorage.key(n);
            } catch (error) {
              result = null;
            } // Remove the prefix from the key, if a key is found.


            if (result) {
              result = result.substring(dbInfo.keyPrefix.length);
            }

            return result;
          });
          executeCallback(promise, callback);
          return promise;
        }

        function keys$2(callback) {
          var self = this;
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            var length = localStorage.length;
            var keys = [];

            for (var i = 0; i < length; i++) {
              var itemKey = localStorage.key(i);

              if (itemKey.indexOf(dbInfo.keyPrefix) === 0) {
                keys.push(itemKey.substring(dbInfo.keyPrefix.length));
              }
            }

            return keys;
          });
          executeCallback(promise, callback);
          return promise;
        } // Supply the number of keys in the datastore to the callback function.


        function length$2(callback) {
          var self = this;
          var promise = self.keys().then(function (keys) {
            return keys.length;
          });
          executeCallback(promise, callback);
          return promise;
        } // Remove an item from the store, nice and simple.


        function removeItem$2(key, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = self.ready().then(function () {
            var dbInfo = self._dbInfo;
            localStorage.removeItem(dbInfo.keyPrefix + key);
          });
          executeCallback(promise, callback);
          return promise;
        } // Set a key's value and run an optional callback once the value is set.
        // Unlike Gaia's implementation, the callback function is passed the value,
        // in case you want to operate on that value only after you're sure it
        // saved, or something like that.


        function setItem$2(key, value, callback) {
          var self = this;
          key = normalizeKey(key);
          var promise = self.ready().then(function () {
            // Convert undefined values to null.
            // https://github.com/mozilla/localForage/pull/42
            if (value === undefined) {
              value = null;
            } // Save the original value to pass to the callback.


            var originalValue = value;
            return new Promise$1(function (resolve, reject) {
              var dbInfo = self._dbInfo;
              dbInfo.serializer.serialize(value, function (value, error) {
                if (error) {
                  reject(error);
                } else {
                  try {
                    localStorage.setItem(dbInfo.keyPrefix + key, value);
                    resolve(originalValue);
                  } catch (e) {
                    // localStorage capacity exceeded.
                    // TODO: Make this a specific error/event.
                    if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                      reject(e);
                    }

                    reject(e);
                  }
                }
              });
            });
          });
          executeCallback(promise, callback);
          return promise;
        }

        function dropInstance$2(options, callback) {
          callback = getCallback.apply(this, arguments);
          options = typeof options !== 'function' && options || {};

          if (!options.name) {
            var currentConfig = this.config();
            options.name = options.name || currentConfig.name;
            options.storeName = options.storeName || currentConfig.storeName;
          }

          var self = this;
          var promise;

          if (!options.name) {
            promise = Promise$1.reject('Invalid arguments');
          } else {
            promise = new Promise$1(function (resolve) {
              if (!options.storeName) {
                resolve(options.name + '/');
              } else {
                resolve(_getKeyPrefix(options, self._defaultConfig));
              }
            }).then(function (keyPrefix) {
              for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);

                if (key.indexOf(keyPrefix) === 0) {
                  localStorage.removeItem(key);
                }
              }
            });
          }

          executeCallback(promise, callback);
          return promise;
        }

        var localStorageWrapper = {
          _driver: 'localStorageWrapper',
          _initStorage: _initStorage$2,
          _support: isLocalStorageValid(),
          iterate: iterate$2,
          getItem: getItem$2,
          setItem: setItem$2,
          removeItem: removeItem$2,
          clear: clear$2,
          length: length$2,
          key: key$2,
          keys: keys$2,
          dropInstance: dropInstance$2
        };

        var sameValue = function sameValue(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        };

        var includes = function includes(array, searchElement) {
          var len = array.length;
          var i = 0;

          while (i < len) {
            if (sameValue(array[i], searchElement)) {
              return true;
            }

            i++;
          }

          return false;
        };

        var isArray = Array.isArray || function (arg) {
          return Object.prototype.toString.call(arg) === '[object Array]';
        }; // Drivers are stored here when `defineDriver()` is called.
        // They are shared across all instances of localForage.


        var DefinedDrivers = {};
        var DriverSupport = {};
        var DefaultDrivers = {
          INDEXEDDB: asyncStorage,
          WEBSQL: webSQLStorage,
          LOCALSTORAGE: localStorageWrapper
        };
        var DefaultDriverOrder = [DefaultDrivers.INDEXEDDB._driver, DefaultDrivers.WEBSQL._driver, DefaultDrivers.LOCALSTORAGE._driver];
        var OptionalDriverMethods = ['dropInstance'];
        var LibraryMethods = ['clear', 'getItem', 'iterate', 'key', 'keys', 'length', 'removeItem', 'setItem'].concat(OptionalDriverMethods);
        var DefaultConfig = {
          description: '',
          driver: DefaultDriverOrder.slice(),
          name: 'localforage',
          // Default DB size is _JUST UNDER_ 5MB, as it's the highest size
          // we can use without a prompt.
          size: 4980736,
          storeName: 'keyvaluepairs',
          version: 1.0
        };

        function callWhenReady(localForageInstance, libraryMethod) {
          localForageInstance[libraryMethod] = function () {
            var _args = arguments;
            return localForageInstance.ready().then(function () {
              return localForageInstance[libraryMethod].apply(localForageInstance, _args);
            });
          };
        }

        function extend() {
          for (var i = 1; i < arguments.length; i++) {
            var arg = arguments[i];

            if (arg) {
              for (var _key in arg) {
                if (arg.hasOwnProperty(_key)) {
                  if (isArray(arg[_key])) {
                    arguments[0][_key] = arg[_key].slice();
                  } else {
                    arguments[0][_key] = arg[_key];
                  }
                }
              }
            }
          }

          return arguments[0];
        }

        var LocalForage = function () {
          function LocalForage(options) {
            _classCallCheck(this, LocalForage);

            for (var driverTypeKey in DefaultDrivers) {
              if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
                var driver = DefaultDrivers[driverTypeKey];
                var driverName = driver._driver;
                this[driverTypeKey] = driverName;

                if (!DefinedDrivers[driverName]) {
                  // we don't need to wait for the promise,
                  // since the default drivers can be defined
                  // in a blocking manner
                  this.defineDriver(driver);
                }
              }
            }

            this._defaultConfig = extend({}, DefaultConfig);
            this._config = extend({}, this._defaultConfig, options);
            this._driverSet = null;
            this._initDriver = null;
            this._ready = false;
            this._dbInfo = null;

            this._wrapLibraryMethodsWithReady();

            this.setDriver(this._config.driver)["catch"](function () {});
          } // Set any config values for localForage; can be called anytime before
          // the first API call (e.g. `getItem`, `setItem`).
          // We loop through options so we don't overwrite existing config
          // values.


          LocalForage.prototype.config = function config(options) {
            // If the options argument is an object, we use it to set values.
            // Otherwise, we return either a specified config value or all
            // config values.
            if ((typeof options === 'undefined' ? 'undefined' : _typeof$1(options)) === 'object') {
              // If localforage is ready and fully initialized, we can't set
              // any new configuration values. Instead, we return an error.
              if (this._ready) {
                return new Error("Can't call config() after localforage " + 'has been used.');
              }

              for (var i in options) {
                if (i === 'storeName') {
                  options[i] = options[i].replace(/\W/g, '_');
                }

                if (i === 'version' && typeof options[i] !== 'number') {
                  return new Error('Database version must be a number.');
                }

                this._config[i] = options[i];
              } // after all config options are set and
              // the driver option is used, try setting it


              if ('driver' in options && options.driver) {
                return this.setDriver(this._config.driver);
              }

              return true;
            } else if (typeof options === 'string') {
              return this._config[options];
            } else {
              return this._config;
            }
          }; // Used to define a custom driver, shared across all instances of
          // localForage.


          LocalForage.prototype.defineDriver = function defineDriver(driverObject, callback, errorCallback) {
            var promise = new Promise$1(function (resolve, reject) {
              try {
                var driverName = driverObject._driver;
                var complianceError = new Error('Custom driver not compliant; see ' + 'https://mozilla.github.io/localForage/#definedriver'); // A driver name should be defined and not overlap with the
                // library-defined, default drivers.

                if (!driverObject._driver) {
                  reject(complianceError);
                  return;
                }

                var driverMethods = LibraryMethods.concat('_initStorage');

                for (var i = 0, len = driverMethods.length; i < len; i++) {
                  var driverMethodName = driverMethods[i]; // when the property is there,
                  // it should be a method even when optional

                  var isRequired = !includes(OptionalDriverMethods, driverMethodName);

                  if ((isRequired || driverObject[driverMethodName]) && typeof driverObject[driverMethodName] !== 'function') {
                    reject(complianceError);
                    return;
                  }
                }

                var configureMissingMethods = function configureMissingMethods() {
                  var methodNotImplementedFactory = function methodNotImplementedFactory(methodName) {
                    return function () {
                      var error = new Error('Method ' + methodName + ' is not implemented by the current driver');
                      var promise = Promise$1.reject(error);
                      executeCallback(promise, arguments[arguments.length - 1]);
                      return promise;
                    };
                  };

                  for (var _i = 0, _len = OptionalDriverMethods.length; _i < _len; _i++) {
                    var optionalDriverMethod = OptionalDriverMethods[_i];

                    if (!driverObject[optionalDriverMethod]) {
                      driverObject[optionalDriverMethod] = methodNotImplementedFactory(optionalDriverMethod);
                    }
                  }
                };

                configureMissingMethods();

                var setDriverSupport = function setDriverSupport(support) {
                  if (DefinedDrivers[driverName]) {
                    console.info('Redefining LocalForage driver: ' + driverName);
                  }

                  DefinedDrivers[driverName] = driverObject;
                  DriverSupport[driverName] = support; // don't use a then, so that we can define
                  // drivers that have simple _support methods
                  // in a blocking manner

                  resolve();
                };

                if ('_support' in driverObject) {
                  if (driverObject._support && typeof driverObject._support === 'function') {
                    driverObject._support().then(setDriverSupport, reject);
                  } else {
                    setDriverSupport(!!driverObject._support);
                  }
                } else {
                  setDriverSupport(true);
                }
              } catch (e) {
                reject(e);
              }
            });
            executeTwoCallbacks(promise, callback, errorCallback);
            return promise;
          };

          LocalForage.prototype.driver = function driver() {
            return this._driver || null;
          };

          LocalForage.prototype.getDriver = function getDriver(driverName, callback, errorCallback) {
            var getDriverPromise = DefinedDrivers[driverName] ? Promise$1.resolve(DefinedDrivers[driverName]) : Promise$1.reject(new Error('Driver not found.'));
            executeTwoCallbacks(getDriverPromise, callback, errorCallback);
            return getDriverPromise;
          };

          LocalForage.prototype.getSerializer = function getSerializer(callback) {
            var serializerPromise = Promise$1.resolve(localforageSerializer);
            executeTwoCallbacks(serializerPromise, callback);
            return serializerPromise;
          };

          LocalForage.prototype.ready = function ready(callback) {
            var self = this;

            var promise = self._driverSet.then(function () {
              if (self._ready === null) {
                self._ready = self._initDriver();
              }

              return self._ready;
            });

            executeTwoCallbacks(promise, callback, callback);
            return promise;
          };

          LocalForage.prototype.setDriver = function setDriver(drivers, callback, errorCallback) {
            var self = this;

            if (!isArray(drivers)) {
              drivers = [drivers];
            }

            var supportedDrivers = this._getSupportedDrivers(drivers);

            function setDriverToConfig() {
              self._config.driver = self.driver();
            }

            function extendSelfWithDriver(driver) {
              self._extend(driver);

              setDriverToConfig();
              self._ready = self._initStorage(self._config);
              return self._ready;
            }

            function initDriver(supportedDrivers) {
              return function () {
                var currentDriverIndex = 0;

                function driverPromiseLoop() {
                  while (currentDriverIndex < supportedDrivers.length) {
                    var driverName = supportedDrivers[currentDriverIndex];
                    currentDriverIndex++;
                    self._dbInfo = null;
                    self._ready = null;
                    return self.getDriver(driverName).then(extendSelfWithDriver)["catch"](driverPromiseLoop);
                  }

                  setDriverToConfig();
                  var error = new Error('No available storage method found.');
                  self._driverSet = Promise$1.reject(error);
                  return self._driverSet;
                }

                return driverPromiseLoop();
              };
            } // There might be a driver initialization in progress
            // so wait for it to finish in order to avoid a possible
            // race condition to set _dbInfo


            var oldDriverSetDone = this._driverSet !== null ? this._driverSet["catch"](function () {
              return Promise$1.resolve();
            }) : Promise$1.resolve();
            this._driverSet = oldDriverSetDone.then(function () {
              var driverName = supportedDrivers[0];
              self._dbInfo = null;
              self._ready = null;
              return self.getDriver(driverName).then(function (driver) {
                self._driver = driver._driver;
                setDriverToConfig();

                self._wrapLibraryMethodsWithReady();

                self._initDriver = initDriver(supportedDrivers);
              });
            })["catch"](function () {
              setDriverToConfig();
              var error = new Error('No available storage method found.');
              self._driverSet = Promise$1.reject(error);
              return self._driverSet;
            });
            executeTwoCallbacks(this._driverSet, callback, errorCallback);
            return this._driverSet;
          };

          LocalForage.prototype.supports = function supports(driverName) {
            return !!DriverSupport[driverName];
          };

          LocalForage.prototype._extend = function _extend(libraryMethodsAndProperties) {
            extend(this, libraryMethodsAndProperties);
          };

          LocalForage.prototype._getSupportedDrivers = function _getSupportedDrivers(drivers) {
            var supportedDrivers = [];

            for (var i = 0, len = drivers.length; i < len; i++) {
              var driverName = drivers[i];

              if (this.supports(driverName)) {
                supportedDrivers.push(driverName);
              }
            }

            return supportedDrivers;
          };

          LocalForage.prototype._wrapLibraryMethodsWithReady = function _wrapLibraryMethodsWithReady() {
            // Add a stub for each driver API method that delays the call to the
            // corresponding driver method until localForage is ready. These stubs
            // will be replaced by the driver methods as soon as the driver is
            // loaded, so there is no performance impact.
            for (var i = 0, len = LibraryMethods.length; i < len; i++) {
              callWhenReady(this, LibraryMethods[i]);
            }
          };

          LocalForage.prototype.createInstance = function createInstance(options) {
            return new LocalForage(options);
          };

          return LocalForage;
        }(); // The actual localForage object that we expose as a module or via a
        // global. It's extended by pulling in one of our other libraries.


        var localforage_js = new LocalForage();
        module.exports = localforage_js;
      }, {
        "3": 3
      }]
    }, {}, [4])(4);
  });
})(localforage);

var localForage = localforage.exports;

function _createSuper$4(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$5(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$5() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CollectionIDB = /*#__PURE__*/function (_Collection) {
  _inherits(CollectionIDB, _Collection);

  var _super = _createSuper$4(CollectionIDB);

  function CollectionIDB(name, order, _options) {
    var _this;

    _classCallCheck(this, CollectionIDB);

    _this = _super.call(this, name, order, _options);

    _defineProperty(_assertThisInitialized(_this), "keys", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _this._collection.keys();

            case 3:
              return _context.abrupt("return", _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", []);

            case 9:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 6]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "get", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(docId) {
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _this._collection.getItem(docId);

              case 3:
                return _context2.abrupt("return", _context2.sent);

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", null);

              case 9:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 6]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "set", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(docId, docData) {
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new Promise(function (resolve, reject) {
                  _this._collection.setItem(docId, docData).then(function (docData) {
                    resolve(true);
                  })["catch"](function (err) {
                    resolve(false);
                  });
                }));

              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "update", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(docId, updates) {
        var docData;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return _this.get(docId);

              case 2:
                docData = _context4.sent;

                if (docData) {
                  _context4.next = 5;
                  break;
                }

                return _context4.abrupt("return", Promise.resolve(false));

              case 5:
                Object.keys(docData).forEach(function (fieldName) {
                  docData = docData;
                  if (fieldName in updates) docData[fieldName];
                });
                return _context4.abrupt("return", _this.set(docId, docData));

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "sort", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(orderBy, range) {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", _this._order.sort(orderBy, range));

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "search", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(query, options) {
        var isStringQuery, range, strategy, exclude, limit, rangeCopy, matches;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // The given query type is either "string" or "conditional".
                isStringQuery = query.type() === "string"; // Search options

                range = options.range;
                strategy = options.fuzzy ? SearchStrategy.Fuzzy : SearchStrategy.Literal;
                exclude = options.exclude;
                limit = options.limit; // Necessary for stopping task when the search target is out of range.

                rangeCopy = _toConsumableArray(range);
                matches = [];
                _context6.prev = 7;
                _context6.next = 10;
                return _this._collection.iterate(function (docData, docId) {
                  if (range.includes(docId)) {
                    if (isStringQuery) {
                      if (_this._findStringMatches(query, docData, strategy, exclude)) {
                        matches.push(docId);
                        if (matches.length >= limit) return;
                        rangeCopy = rangeCopy.filter(function (id) {
                          return id !== docId;
                        });
                        if (!rangeCopy.length) return;
                      }
                    } else {
                      if (_this._findConditionalMatches(query, docData)) {
                        matches.push(docId);
                        if (matches.length >= limit) return;
                        rangeCopy = rangeCopy.filter(function (id) {
                          return id !== docId;
                        });
                        if (!rangeCopy.length) return;
                      }
                    }
                  }
                });

              case 10:
                return _context6.abrupt("return", matches);

              case 13:
                _context6.prev = 13;
                _context6.t0 = _context6["catch"](7);
                return _context6.abrupt("return", []);

              case 16:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[7, 13]]);
      }));

      return function (_x8, _x9) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "remove", /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(docId) {
        return regenerator.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", new Promise(function (resolve, reject) {
                  _this._collection.removeItem(docId).then(function () {
                    resolve(true);
                  })["catch"](function (err) {
                    resolve(false);
                  });
                }));

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x10) {
        return _ref7.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "clear", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8() {
      return regenerator.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", new Promise(function (resolve, reject) {
                _this._collection.clear().then(function () {
                  resolve(true);
                })["catch"](function (err) {
                  resolve(false);
                });
              }));

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));

    _defineProperty(_assertThisInitialized(_this), "destroy", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9() {
      return regenerator.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              // TODO: destroy collection
              delete _this._collection;
              return _context9.abrupt("return", true);

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));

    try {
      // `LocalForage` instance
      _this._collection = localForage.createInstance({
        name: _this._storageName,
        storeName: _this._name
      });
    } catch (err) {
      throw new Error("Unable to create IndexedDB instance.");
    }

    return _this;
  }

  return CollectionIDB;
}(Collection);

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _isNativeReflectConstruct$4() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct$4()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _createSuper$3(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$3(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$3() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var Deferred = /*#__PURE__*/function () {
  function Deferred() {
    var _this = this;

    _classCallCheck(this, Deferred);

    this.reject = function () {};

    this.resolve = function () {};

    this.promise = new Promise(function (resolve, reject) {
      _this.resolve = resolve;
      _this.reject = reject;
    });
  }
  /**
   * Our API internals are not promiseified and cannot because our callback APIs have subtle expectations around
   * invoking promises inline, which Promises are forbidden to do. This method accepts an optional node-style callback
   * and returns a node-style callback which will resolve or reject the Deferred's promise.
   */


  _createClass(Deferred, [{
    key: "wrapCallback",
    value: function wrapCallback(callback) {
      var _this2 = this;

      return function (error, value) {
        if (error) {
          _this2.reject(error);
        } else {
          _this2.resolve(value);
        }

        if (typeof callback === 'function') {
          // Attaching noop handler just in case developer wasn't expecting
          // promises
          _this2.promise["catch"](function () {}); // Some of our callbacks don't expect a value and our own tests
          // assert that the parameter length is 1


          if (callback.length === 1) {
            callback(error);
          } else {
            callback(error, value);
          }
        }
      };
    }
  }]);

  return Deferred;
}();
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Returns navigator.userAgent string or '' if it's not defined.
 * @return user agent string
 */


function getUA() {
  if (typeof navigator !== 'undefined' && typeof navigator['userAgent'] === 'string') {
    return navigator['userAgent'];
  } else {
    return '';
  }
}
/**
 * Detect Cordova / PhoneGap / Ionic frameworks on a mobile device.
 *
 * Deliberately does not rely on checking `file://` URLs (as this fails PhoneGap
 * in the Ripple emulator) nor Cordova `onDeviceReady`, which would normally
 * wait for a callback.
 */


function isMobileCordova() {
  return typeof window !== 'undefined' && // @ts-ignore Setting up an broadly applicable index signature for Window
  // just to deal with this case would probably be a bad idea.
  !!(window['cordova'] || window['phonegap'] || window['PhoneGap']) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(getUA());
}

function isBrowserExtension() {
  var runtime = (typeof chrome === "undefined" ? "undefined" : _typeof(chrome)) === 'object' ? chrome.runtime : (typeof browser === "undefined" ? "undefined" : _typeof(browser)) === 'object' ? browser.runtime : undefined;
  return _typeof(runtime) === 'object' && runtime.id !== undefined;
}
/**
 * Detect React Native.
 *
 * @return true if ReactNative environment is detected.
 */


function isReactNative() {
  return (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === 'object' && navigator['product'] === 'ReactNative';
}
/** Detects Electron apps. */


function isElectron() {
  return getUA().indexOf('Electron/') >= 0;
}
/** Detects Internet Explorer. */


function isIE() {
  var ua = getUA();
  return ua.indexOf('MSIE ') >= 0 || ua.indexOf('Trident/') >= 0;
}
/** Detects Universal Windows Platform apps. */


function isUWP() {
  return getUA().indexOf('MSAppHost/') >= 0;
}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Standardized Firebase Error.
 *
 * Usage:
 *
 *   // Typescript string literals for type-safe codes
 *   type Err =
 *     'unknown' |
 *     'object-not-found'
 *     ;
 *
 *   // Closure enum for type-safe error codes
 *   // at-enum {string}
 *   var Err = {
 *     UNKNOWN: 'unknown',
 *     OBJECT_NOT_FOUND: 'object-not-found',
 *   }
 *
 *   let errors: Map<Err, string> = {
 *     'generic-error': "Unknown error",
 *     'file-not-found': "Could not find file: {$file}",
 *   };
 *
 *   // Type-safe function - must pass a valid error code as param.
 *   let error = new ErrorFactory<Err>('service', 'Service', errors);
 *
 *   ...
 *   throw error.create(Err.GENERIC);
 *   ...
 *   throw error.create(Err.FILE_NOT_FOUND, {'file': fileName});
 *   ...
 *   // Service: Could not file file: foo.txt (service/file-not-found).
 *
 *   catch (e) {
 *     assert(e.message === "Could not find file: foo.txt.");
 *     if (e.code === 'service/file-not-found') {
 *       console.log("Could not read file: " + e['file']);
 *     }
 *   }
 */


var ERROR_NAME = 'FirebaseError'; // Based on code from:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Custom_Error_Types

var FirebaseError = /*#__PURE__*/function (_Error) {
  _inherits(FirebaseError, _Error);

  var _super = _createSuper$3(FirebaseError);

  function FirebaseError(code, message, customData) {
    var _this3;

    _classCallCheck(this, FirebaseError);

    _this3 = _super.call(this, message);
    _this3.code = code;
    _this3.customData = customData;
    _this3.name = ERROR_NAME; // Fix For ES5
    // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md#extending-built-ins-like-error-array-and-map-may-no-longer-work

    Object.setPrototypeOf(_assertThisInitialized(_this3), FirebaseError.prototype); // Maintains proper stack trace for where our error was thrown.
    // Only available on V8.

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this3), ErrorFactory.prototype.create);
    }

    return _this3;
  }

  return FirebaseError;
}( /*#__PURE__*/_wrapNativeSuper(Error));

var ErrorFactory = /*#__PURE__*/function () {
  function ErrorFactory(service, serviceName, errors) {
    _classCallCheck(this, ErrorFactory);

    this.service = service;
    this.serviceName = serviceName;
    this.errors = errors;
  }

  _createClass(ErrorFactory, [{
    key: "create",
    value: function create(code) {
      var customData = (arguments.length <= 1 ? undefined : arguments[1]) || {};
      var fullCode = "".concat(this.service, "/").concat(code);
      var template = this.errors[code];
      var message = template ? replaceTemplate(template, customData) : 'Error'; // Service Name: Error message (service/code).

      var fullMessage = "".concat(this.serviceName, ": ").concat(message, " (").concat(fullCode, ").");
      var error = new FirebaseError(fullCode, fullMessage, customData);
      return error;
    }
  }]);

  return ErrorFactory;
}();

function replaceTemplate(template, data) {
  return template.replace(PATTERN, function (_, key) {
    var value = data[key];
    return value != null ? String(value) : "<".concat(key, "?>");
  });
}

var PATTERN = /\{\$([^}]+)}/g;
/**
 * Deep equal two objects. Support Arrays and Objects.
 */


function deepEqual(a, b) {
  if (a === b) {
    return true;
  }

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);

  for (var _i = 0, _aKeys = aKeys; _i < _aKeys.length; _i++) {
    var k = _aKeys[_i];

    if (!bKeys.includes(k)) {
      return false;
    }

    var aProp = a[k];
    var bProp = b[k];

    if (isObject(aProp) && isObject(bProp)) {
      if (!deepEqual(aProp, bProp)) {
        return false;
      }
    } else if (aProp !== bProp) {
      return false;
    }
  }

  for (var _i2 = 0, _bKeys = bKeys; _i2 < _bKeys.length; _i2++) {
    var _k = _bKeys[_i2];

    if (!aKeys.includes(_k)) {
      return false;
    }
  }

  return true;
}

function isObject(thing) {
  return thing !== null && _typeof(thing) === 'object';
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function getModularInstance(service) {
  if (service && service._delegate) {
    return service._delegate;
  } else {
    return service;
  }
}

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * Component for service name T, e.g. `auth`, `auth-internal`
 */

var Component = /*#__PURE__*/function () {
  /**
   *
   * @param name The public service name, e.g. app, auth, firestore, database
   * @param instanceFactory Service factory responsible for creating the public interface
   * @param type whether the service provided by the component is public or private
   */
  function Component(name, instanceFactory, type) {
    _classCallCheck(this, Component);

    this.name = name;
    this.instanceFactory = instanceFactory;
    this.type = type;
    this.multipleInstances = false;
    /**
     * Properties to be added to the service namespace
     */

    this.serviceProps = {};
    this.instantiationMode = "LAZY"
    /* LAZY */
    ;
    this.onInstanceCreated = null;
  }

  _createClass(Component, [{
    key: "setInstantiationMode",
    value: function setInstantiationMode(mode) {
      this.instantiationMode = mode;
      return this;
    }
  }, {
    key: "setMultipleInstances",
    value: function setMultipleInstances(multipleInstances) {
      this.multipleInstances = multipleInstances;
      return this;
    }
  }, {
    key: "setServiceProps",
    value: function setServiceProps(props) {
      this.serviceProps = props;
      return this;
    }
  }, {
    key: "setInstanceCreatedCallback",
    value: function setInstanceCreatedCallback(callback) {
      this.onInstanceCreated = callback;
      return this;
    }
  }]);

  return Component;
}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var DEFAULT_ENTRY_NAME$1 = '[DEFAULT]';
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Provider for instance for service name T, e.g. 'auth', 'auth-internal'
 * NameServiceMapping[T] is an alias for the type of the instance
 */

var Provider = /*#__PURE__*/function () {
  function Provider(name, container) {
    _classCallCheck(this, Provider);

    this.name = name;
    this.container = container;
    this.component = null;
    this.instances = new Map();
    this.instancesDeferred = new Map();
    this.instancesOptions = new Map();
    this.onInitCallbacks = new Map();
  }
  /**
   * @param identifier A provider can provide mulitple instances of a service
   * if this.component.multipleInstances is true.
   */


  _createClass(Provider, [{
    key: "get",
    value: function get(identifier) {
      // if multipleInstances is not supported, use the default name
      var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);

      if (!this.instancesDeferred.has(normalizedIdentifier)) {
        var deferred = new Deferred();
        this.instancesDeferred.set(normalizedIdentifier, deferred);

        if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
          // initialize the service if it can be auto-initialized
          try {
            var instance = this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });

            if (instance) {
              deferred.resolve(instance);
            }
          } catch (e) {// when the instance factory throws an exception during get(), it should not cause
            // a fatal error. We just return the unresolved promise in this case.
          }
        }
      }

      return this.instancesDeferred.get(normalizedIdentifier).promise;
    }
  }, {
    key: "getImmediate",
    value: function getImmediate(options) {
      var _a; // if multipleInstances is not supported, use the default name


      var normalizedIdentifier = this.normalizeInstanceIdentifier(options === null || options === void 0 ? void 0 : options.identifier);
      var optional = (_a = options === null || options === void 0 ? void 0 : options.optional) !== null && _a !== void 0 ? _a : false;

      if (this.isInitialized(normalizedIdentifier) || this.shouldAutoInitialize()) {
        try {
          return this.getOrInitializeService({
            instanceIdentifier: normalizedIdentifier
          });
        } catch (e) {
          if (optional) {
            return null;
          } else {
            throw e;
          }
        }
      } else {
        // In case a component is not initialized and should/can not be auto-initialized at the moment, return null if the optional flag is set, or throw
        if (optional) {
          return null;
        } else {
          throw Error("Service ".concat(this.name, " is not available"));
        }
      }
    }
  }, {
    key: "getComponent",
    value: function getComponent() {
      return this.component;
    }
  }, {
    key: "setComponent",
    value: function setComponent(component) {
      if (component.name !== this.name) {
        throw Error("Mismatching Component ".concat(component.name, " for Provider ").concat(this.name, "."));
      }

      if (this.component) {
        throw Error("Component for ".concat(this.name, " has already been provided"));
      }

      this.component = component; // return early without attempting to initialize the component if the component requires explicit initialization (calling `Provider.initialize()`)

      if (!this.shouldAutoInitialize()) {
        return;
      } // if the service is eager, initialize the default instance


      if (isComponentEager(component)) {
        try {
          this.getOrInitializeService({
            instanceIdentifier: DEFAULT_ENTRY_NAME$1
          });
        } catch (e) {// when the instance factory for an eager Component throws an exception during the eager
          // initialization, it should not cause a fatal error.
          // TODO: Investigate if we need to make it configurable, because some component may want to cause
          // a fatal error in this case?
        }
      } // Create service instances for the pending promises and resolve them
      // NOTE: if this.multipleInstances is false, only the default instance will be created
      // and all promises with resolve with it regardless of the identifier.


      var _iterator = _createForOfIteratorHelper$3(this.instancesDeferred.entries()),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _step$value = _slicedToArray(_step.value, 2),
              instanceIdentifier = _step$value[0],
              instanceDeferred = _step$value[1];

          var normalizedIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

          try {
            // `getOrInitializeService()` should always return a valid instance since a component is guaranteed. use ! to make typescript happy.
            var instance = this.getOrInitializeService({
              instanceIdentifier: normalizedIdentifier
            });
            instanceDeferred.resolve(instance);
          } catch (e) {// when the instance factory throws an exception, it should not cause
            // a fatal error. We just leave the promise unresolved.
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "clearInstance",
    value: function clearInstance() {
      var identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ENTRY_NAME$1;
      this.instancesDeferred["delete"](identifier);
      this.instancesOptions["delete"](identifier);
      this.instances["delete"](identifier);
    } // app.delete() will call this method on every provider to delete the services
    // TODO: should we mark the provider as deleted?

  }, {
    key: "delete",
    value: function () {
      var _delete2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
        var services;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                services = Array.from(this.instances.values());
                _context.next = 3;
                return Promise.all([].concat(_toConsumableArray(services.filter(function (service) {
                  return 'INTERNAL' in service;
                }) // legacy services
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map(function (service) {
                  return service.INTERNAL["delete"]();
                })), _toConsumableArray(services.filter(function (service) {
                  return '_delete' in service;
                }) // modularized services
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                .map(function (service) {
                  return service._delete();
                }))));

              case 3:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function _delete() {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "isComponentSet",
    value: function isComponentSet() {
      return this.component != null;
    }
  }, {
    key: "isInitialized",
    value: function isInitialized() {
      var identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ENTRY_NAME$1;
      return this.instances.has(identifier);
    }
  }, {
    key: "getOptions",
    value: function getOptions() {
      var identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ENTRY_NAME$1;
      return this.instancesOptions.get(identifier) || {};
    }
  }, {
    key: "initialize",
    value: function initialize() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var _opts$options = opts.options,
          options = _opts$options === void 0 ? {} : _opts$options;
      var normalizedIdentifier = this.normalizeInstanceIdentifier(opts.instanceIdentifier);

      if (this.isInitialized(normalizedIdentifier)) {
        throw Error("".concat(this.name, "(").concat(normalizedIdentifier, ") has already been initialized"));
      }

      if (!this.isComponentSet()) {
        throw Error("Component ".concat(this.name, " has not been registered yet"));
      }

      var instance = this.getOrInitializeService({
        instanceIdentifier: normalizedIdentifier,
        options: options
      }); // resolve any pending promise waiting for the service instance

      var _iterator2 = _createForOfIteratorHelper$3(this.instancesDeferred.entries()),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _step2$value = _slicedToArray(_step2.value, 2),
              instanceIdentifier = _step2$value[0],
              instanceDeferred = _step2$value[1];

          var normalizedDeferredIdentifier = this.normalizeInstanceIdentifier(instanceIdentifier);

          if (normalizedIdentifier === normalizedDeferredIdentifier) {
            instanceDeferred.resolve(instance);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      return instance;
    }
    /**
     *
     * @param callback - a function that will be invoked  after the provider has been initialized by calling provider.initialize().
     * The function is invoked SYNCHRONOUSLY, so it should not execute any longrunning tasks in order to not block the program.
     *
     * @param identifier An optional instance identifier
     * @returns a function to unregister the callback
     */

  }, {
    key: "onInit",
    value: function onInit(callback, identifier) {
      var _a;

      var normalizedIdentifier = this.normalizeInstanceIdentifier(identifier);
      var existingCallbacks = (_a = this.onInitCallbacks.get(normalizedIdentifier)) !== null && _a !== void 0 ? _a : new Set();
      existingCallbacks.add(callback);
      this.onInitCallbacks.set(normalizedIdentifier, existingCallbacks);
      var existingInstance = this.instances.get(normalizedIdentifier);

      if (existingInstance) {
        callback(existingInstance, normalizedIdentifier);
      }

      return function () {
        existingCallbacks["delete"](callback);
      };
    }
    /**
     * Invoke onInit callbacks synchronously
     * @param instance the service instance`
     */

  }, {
    key: "invokeOnInitCallbacks",
    value: function invokeOnInitCallbacks(instance, identifier) {
      var callbacks = this.onInitCallbacks.get(identifier);

      if (!callbacks) {
        return;
      }

      var _iterator3 = _createForOfIteratorHelper$3(callbacks),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var callback = _step3.value;

          try {
            callback(instance, identifier);
          } catch (_a) {// ignore errors in the onInit callback
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  }, {
    key: "getOrInitializeService",
    value: function getOrInitializeService(_ref) {
      var instanceIdentifier = _ref.instanceIdentifier,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options;
      var instance = this.instances.get(instanceIdentifier);

      if (!instance && this.component) {
        instance = this.component.instanceFactory(this.container, {
          instanceIdentifier: normalizeIdentifierForFactory(instanceIdentifier),
          options: options
        });
        this.instances.set(instanceIdentifier, instance);
        this.instancesOptions.set(instanceIdentifier, options);
        /**
         * Invoke onInit listeners.
         * Note this.component.onInstanceCreated is different, which is used by the component creator,
         * while onInit listeners are registered by consumers of the provider.
         */

        this.invokeOnInitCallbacks(instance, instanceIdentifier);
        /**
         * Order is important
         * onInstanceCreated() should be called after this.instances.set(instanceIdentifier, instance); which
         * makes `isInitialized()` return true.
         */

        if (this.component.onInstanceCreated) {
          try {
            this.component.onInstanceCreated(this.container, instanceIdentifier, instance);
          } catch (_a) {// ignore errors in the onInstanceCreatedCallback
          }
        }
      }

      return instance || null;
    }
  }, {
    key: "normalizeInstanceIdentifier",
    value: function normalizeInstanceIdentifier() {
      var identifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ENTRY_NAME$1;

      if (this.component) {
        return this.component.multipleInstances ? identifier : DEFAULT_ENTRY_NAME$1;
      } else {
        return identifier; // assume multiple instances are supported before the component is provided.
      }
    }
  }, {
    key: "shouldAutoInitialize",
    value: function shouldAutoInitialize() {
      return !!this.component && this.component.instantiationMode !== "EXPLICIT"
      /* EXPLICIT */
      ;
    }
  }]);

  return Provider;
}(); // undefined should be passed to the service factory for the default instance


function normalizeIdentifierForFactory(identifier) {
  return identifier === DEFAULT_ENTRY_NAME$1 ? undefined : identifier;
}

function isComponentEager(component) {
  return component.instantiationMode === "EAGER"
  /* EAGER */
  ;
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * ComponentContainer that provides Providers for service name T, e.g. `auth`, `auth-internal`
 */


var ComponentContainer = /*#__PURE__*/function () {
  function ComponentContainer(name) {
    _classCallCheck(this, ComponentContainer);

    this.name = name;
    this.providers = new Map();
  }
  /**
   *
   * @param component Component being added
   * @param overwrite When a component with the same name has already been registered,
   * if overwrite is true: overwrite the existing component with the new component and create a new
   * provider with the new component. It can be useful in tests where you want to use different mocks
   * for different tests.
   * if overwrite is false: throw an exception
   */


  _createClass(ComponentContainer, [{
    key: "addComponent",
    value: function addComponent(component) {
      var provider = this.getProvider(component.name);

      if (provider.isComponentSet()) {
        throw new Error("Component ".concat(component.name, " has already been registered with ").concat(this.name));
      }

      provider.setComponent(component);
    }
  }, {
    key: "addOrOverwriteComponent",
    value: function addOrOverwriteComponent(component) {
      var provider = this.getProvider(component.name);

      if (provider.isComponentSet()) {
        // delete the existing provider from the container, so we can register the new component
        this.providers["delete"](component.name);
      }

      this.addComponent(component);
    }
    /**
     * getProvider provides a type safe interface where it can only be called with a field name
     * present in NameServiceMapping interface.
     *
     * Firebase SDKs providing services should extend NameServiceMapping interface to register
     * themselves.
     */

  }, {
    key: "getProvider",
    value: function getProvider(name) {
      if (this.providers.has(name)) {
        return this.providers.get(name);
      } // create a Provider for a service that hasn't registered with Firebase


      var provider = new Provider(name, this);
      this.providers.set(name, provider);
      return provider;
    }
  }, {
    key: "getProviders",
    value: function getProviders() {
      return Array.from(this.providers.values());
    }
  }]);

  return ComponentContainer;
}();

var _ConsoleMethod;
/**
 * The JS SDK supports 5 log levels and also allows a user the ability to
 * silence the logs altogether.
 *
 * The order is a follows:
 * DEBUG < VERBOSE < INFO < WARN < ERROR
 *
 * All of the log types above the current log level will be captured (i.e. if
 * you set the log level to `INFO`, errors will still be logged, but `DEBUG` and
 * `VERBOSE` logs will not)
 */

var LogLevel;

(function (LogLevel) {
  LogLevel[LogLevel["DEBUG"] = 0] = "DEBUG";
  LogLevel[LogLevel["VERBOSE"] = 1] = "VERBOSE";
  LogLevel[LogLevel["INFO"] = 2] = "INFO";
  LogLevel[LogLevel["WARN"] = 3] = "WARN";
  LogLevel[LogLevel["ERROR"] = 4] = "ERROR";
  LogLevel[LogLevel["SILENT"] = 5] = "SILENT";
})(LogLevel || (LogLevel = {}));

var levelStringToEnum = {
  'debug': LogLevel.DEBUG,
  'verbose': LogLevel.VERBOSE,
  'info': LogLevel.INFO,
  'warn': LogLevel.WARN,
  'error': LogLevel.ERROR,
  'silent': LogLevel.SILENT
};
/**
 * The default log level
 */

var defaultLogLevel = LogLevel.INFO;
/**
 * By default, `console.debug` is not displayed in the developer console (in
 * chrome). To avoid forcing users to have to opt-in to these logs twice
 * (i.e. once for firebase, and once in the console), we are sending `DEBUG`
 * logs to the `console.log` function.
 */

var ConsoleMethod = (_ConsoleMethod = {}, _defineProperty(_ConsoleMethod, LogLevel.DEBUG, 'log'), _defineProperty(_ConsoleMethod, LogLevel.VERBOSE, 'log'), _defineProperty(_ConsoleMethod, LogLevel.INFO, 'info'), _defineProperty(_ConsoleMethod, LogLevel.WARN, 'warn'), _defineProperty(_ConsoleMethod, LogLevel.ERROR, 'error'), _ConsoleMethod);
/**
 * The default log handler will forward DEBUG, VERBOSE, INFO, WARN, and ERROR
 * messages on to their corresponding console counterparts (if the log method
 * is supported by the current log level)
 */

var defaultLogHandler = function defaultLogHandler(instance, logType) {
  if (logType < instance.logLevel) {
    return;
  }

  var now = new Date().toISOString();
  var method = ConsoleMethod[logType];

  if (method) {
    var _console;

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    (_console = console)[method].apply(_console, ["[".concat(now, "]  ").concat(instance.name, ":")].concat(args));
  } else {
    throw new Error("Attempted to log a message with an invalid logType (value: ".concat(logType, ")"));
  }
};

var Logger = /*#__PURE__*/function () {
  /**
   * Gives you an instance of a Logger to capture messages according to
   * Firebase's logging scheme.
   *
   * @param name The name that the logs will be associated with
   */
  function Logger(name) {
    _classCallCheck(this, Logger);

    this.name = name;
    /**
     * The log level of the given Logger instance.
     */

    this._logLevel = defaultLogLevel;
    /**
     * The main (internal) log handler for the Logger instance.
     * Can be set to a new function in internal package code but not by user.
     */

    this._logHandler = defaultLogHandler;
    /**
     * The optional, additional, user-defined log handler for the Logger instance.
     */

    this._userLogHandler = null;
  }

  _createClass(Logger, [{
    key: "logLevel",
    get: function get() {
      return this._logLevel;
    },
    set: function set(val) {
      if (!(val in LogLevel)) {
        throw new TypeError("Invalid value \"".concat(val, "\" assigned to `logLevel`"));
      }

      this._logLevel = val;
    } // Workaround for setter/getter having to be the same type.

  }, {
    key: "setLogLevel",
    value: function setLogLevel(val) {
      this._logLevel = typeof val === 'string' ? levelStringToEnum[val] : val;
    }
  }, {
    key: "logHandler",
    get: function get() {
      return this._logHandler;
    },
    set: function set(val) {
      if (typeof val !== 'function') {
        throw new TypeError('Value assigned to `logHandler` must be a function');
      }

      this._logHandler = val;
    }
  }, {
    key: "userLogHandler",
    get: function get() {
      return this._userLogHandler;
    },
    set: function set(val) {
      this._userLogHandler = val;
    }
    /**
     * The functions below are all based on the `console` interface
     */

  }, {
    key: "debug",
    value: function debug() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      this._userLogHandler && this._userLogHandler.apply(this, [this, LogLevel.DEBUG].concat(args));

      this._logHandler.apply(this, [this, LogLevel.DEBUG].concat(args));
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      this._userLogHandler && this._userLogHandler.apply(this, [this, LogLevel.VERBOSE].concat(args));

      this._logHandler.apply(this, [this, LogLevel.VERBOSE].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      this._userLogHandler && this._userLogHandler.apply(this, [this, LogLevel.INFO].concat(args));

      this._logHandler.apply(this, [this, LogLevel.INFO].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      this._userLogHandler && this._userLogHandler.apply(this, [this, LogLevel.WARN].concat(args));

      this._logHandler.apply(this, [this, LogLevel.WARN].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      this._userLogHandler && this._userLogHandler.apply(this, [this, LogLevel.ERROR].concat(args));

      this._logHandler.apply(this, [this, LogLevel.ERROR].concat(args));
    }
  }]);

  return Logger;
}();

var _PLATFORM_LOG_STRING, _ERRORS;

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var PlatformLoggerServiceImpl = /*#__PURE__*/function () {
  function PlatformLoggerServiceImpl(container) {
    _classCallCheck(this, PlatformLoggerServiceImpl);

    this.container = container;
  } // In initial implementation, this will be called by installations on
  // auth token refresh, and installations will send this string.


  _createClass(PlatformLoggerServiceImpl, [{
    key: "getPlatformInfoString",
    value: function getPlatformInfoString() {
      var providers = this.container.getProviders(); // Loop through providers and get library/version pairs from any that are
      // version components.

      return providers.map(function (provider) {
        if (isVersionServiceProvider(provider)) {
          var service = provider.getImmediate();
          return "".concat(service.library, "/").concat(service.version);
        } else {
          return null;
        }
      }).filter(function (logString) {
        return logString;
      }).join(' ');
    }
  }]);

  return PlatformLoggerServiceImpl;
}();
/**
 *
 * @param provider check if this provider provides a VersionService
 *
 * NOTE: Using Provider<'app-version'> is a hack to indicate that the provider
 * provides VersionService. The provider is not necessarily a 'app-version'
 * provider.
 */


function isVersionServiceProvider(provider) {
  var component = provider.getComponent();
  return (component === null || component === void 0 ? void 0 : component.type) === "VERSION"
  /* VERSION */
  ;
}

var name$o = "@firebase/app";
var version$1 = "0.7.6";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var logger = new Logger('@firebase/app');
var name$n = "@firebase/app-compat";
var name$m = "@firebase/analytics-compat";
var name$l = "@firebase/analytics";
var name$k = "@firebase/app-check-compat";
var name$j = "@firebase/app-check";
var name$i = "@firebase/auth";
var name$h = "@firebase/auth-compat";
var name$g = "@firebase/database";
var name$f = "@firebase/database-compat";
var name$e = "@firebase/functions";
var name$d = "@firebase/functions-compat";
var name$c = "@firebase/installations";
var name$b = "@firebase/installations-compat";
var name$a = "@firebase/messaging";
var name$9 = "@firebase/messaging-compat";
var name$8 = "@firebase/performance";
var name$7 = "@firebase/performance-compat";
var name$6 = "@firebase/remote-config";
var name$5 = "@firebase/remote-config-compat";
var name$4 = "@firebase/storage";
var name$3 = "@firebase/storage-compat";
var name$2 = "@firebase/firestore";
var name$1 = "@firebase/firestore-compat";
var name$p = "firebase";
var version$2 = "9.3.0";
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The default app name
 *
 * @internal
 */

var DEFAULT_ENTRY_NAME = '[DEFAULT]';
var PLATFORM_LOG_STRING = (_PLATFORM_LOG_STRING = {}, _defineProperty(_PLATFORM_LOG_STRING, name$o, 'fire-core'), _defineProperty(_PLATFORM_LOG_STRING, name$n, 'fire-core-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$l, 'fire-analytics'), _defineProperty(_PLATFORM_LOG_STRING, name$m, 'fire-analytics-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$j, 'fire-app-check'), _defineProperty(_PLATFORM_LOG_STRING, name$k, 'fire-app-check-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$i, 'fire-auth'), _defineProperty(_PLATFORM_LOG_STRING, name$h, 'fire-auth-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$g, 'fire-rtdb'), _defineProperty(_PLATFORM_LOG_STRING, name$f, 'fire-rtdb-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$e, 'fire-fn'), _defineProperty(_PLATFORM_LOG_STRING, name$d, 'fire-fn-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$c, 'fire-iid'), _defineProperty(_PLATFORM_LOG_STRING, name$b, 'fire-iid-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$a, 'fire-fcm'), _defineProperty(_PLATFORM_LOG_STRING, name$9, 'fire-fcm-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$8, 'fire-perf'), _defineProperty(_PLATFORM_LOG_STRING, name$7, 'fire-perf-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$6, 'fire-rc'), _defineProperty(_PLATFORM_LOG_STRING, name$5, 'fire-rc-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$4, 'fire-gcs'), _defineProperty(_PLATFORM_LOG_STRING, name$3, 'fire-gcs-compat'), _defineProperty(_PLATFORM_LOG_STRING, name$2, 'fire-fst'), _defineProperty(_PLATFORM_LOG_STRING, name$1, 'fire-fst-compat'), _defineProperty(_PLATFORM_LOG_STRING, 'fire-js', 'fire-js'), _defineProperty(_PLATFORM_LOG_STRING, name$p, 'fire-js-all'), _PLATFORM_LOG_STRING);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @internal
 */

var _apps = new Map();
/**
 * Registered components.
 *
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any


var _components = new Map();
/**
 * @param component - the component being added to this app's container
 *
 * @internal
 */


function _addComponent(app, component) {
  try {
    app.container.addComponent(component);
  } catch (e) {
    logger.debug("Component ".concat(component.name, " failed to register with FirebaseApp ").concat(app.name), e);
  }
}
/**
 *
 * @param component - the component to register
 * @returns whether or not the component is registered successfully
 *
 * @internal
 */


function _registerComponent(component) {
  var componentName = component.name;

  if (_components.has(componentName)) {
    logger.debug("There were multiple attempts to register component ".concat(componentName, "."));
    return false;
  }

  _components.set(componentName, component); // add the component to existing app instances


  var _iterator = _createForOfIteratorHelper$2(_apps.values()),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var app = _step.value;

      _addComponent(app, component);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return true;
}
/**
 *
 * @param app - FirebaseApp instance
 * @param name - service name
 *
 * @returns the provider for the service with the matching name
 *
 * @internal
 */


function _getProvider(app, name) {
  return app.container.getProvider(name);
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


var ERRORS = (_ERRORS = {}, _defineProperty(_ERRORS, "no-app"
/* NO_APP */
, "No Firebase App '{$appName}' has been created - " + 'call Firebase App.initializeApp()'), _defineProperty(_ERRORS, "bad-app-name"
/* BAD_APP_NAME */
, "Illegal App name: '{$appName}"), _defineProperty(_ERRORS, "duplicate-app"
/* DUPLICATE_APP */
, "Firebase App named '{$appName}' already exists with different options or config"), _defineProperty(_ERRORS, "app-deleted"
/* APP_DELETED */
, "Firebase App named '{$appName}' already deleted"), _defineProperty(_ERRORS, "invalid-app-argument"
/* INVALID_APP_ARGUMENT */
, 'firebase.{$appName}() takes either no argument or a ' + 'Firebase App instance.'), _defineProperty(_ERRORS, "invalid-log-argument"
/* INVALID_LOG_ARGUMENT */
, 'First argument to `onLog` must be null or a function.'), _ERRORS);
var ERROR_FACTORY = new ErrorFactory('app', 'Firebase', ERRORS);
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var FirebaseAppImpl = /*#__PURE__*/function () {
  function FirebaseAppImpl(options, config, container) {
    var _this = this;

    _classCallCheck(this, FirebaseAppImpl);

    this._isDeleted = false;
    this._options = Object.assign({}, options);
    this._config = Object.assign({}, config);
    this._name = config.name;
    this._automaticDataCollectionEnabled = config.automaticDataCollectionEnabled;
    this._container = container;
    this.container.addComponent(new Component('app', function () {
      return _this;
    }, "PUBLIC"
    /* PUBLIC */
    ));
  }

  _createClass(FirebaseAppImpl, [{
    key: "automaticDataCollectionEnabled",
    get: function get() {
      this.checkDestroyed();
      return this._automaticDataCollectionEnabled;
    },
    set: function set(val) {
      this.checkDestroyed();
      this._automaticDataCollectionEnabled = val;
    }
  }, {
    key: "name",
    get: function get() {
      this.checkDestroyed();
      return this._name;
    }
  }, {
    key: "options",
    get: function get() {
      this.checkDestroyed();
      return this._options;
    }
  }, {
    key: "config",
    get: function get() {
      this.checkDestroyed();
      return this._config;
    }
  }, {
    key: "container",
    get: function get() {
      return this._container;
    }
  }, {
    key: "isDeleted",
    get: function get() {
      return this._isDeleted;
    },
    set: function set(val) {
      this._isDeleted = val;
    }
    /**
     * This function will throw an Error if the App has already been deleted -
     * use before performing API actions on the App.
     */

  }, {
    key: "checkDestroyed",
    value: function checkDestroyed() {
      if (this.isDeleted) {
        throw ERROR_FACTORY.create("app-deleted"
        /* APP_DELETED */
        , {
          appName: this._name
        });
      }
    }
  }]);

  return FirebaseAppImpl;
}();
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * The current SDK version.
 *
 * @public
 */


var SDK_VERSION = version$2;

function initializeApp(options) {
  var rawConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_typeof(rawConfig) !== 'object') {
    var _name = rawConfig;
    rawConfig = {
      name: _name
    };
  }

  var config = Object.assign({
    name: DEFAULT_ENTRY_NAME,
    automaticDataCollectionEnabled: false
  }, rawConfig);
  var name = config.name;

  if (typeof name !== 'string' || !name) {
    throw ERROR_FACTORY.create("bad-app-name"
    /* BAD_APP_NAME */
    , {
      appName: String(name)
    });
  }

  var existingApp = _apps.get(name);

  if (existingApp) {
    // return the existing app if options and config deep equal the ones in the existing app.
    if (deepEqual(options, existingApp.options) && deepEqual(config, existingApp.config)) {
      return existingApp;
    } else {
      throw ERROR_FACTORY.create("duplicate-app"
      /* DUPLICATE_APP */
      , {
        appName: name
      });
    }
  }

  var container = new ComponentContainer(name);

  var _iterator2 = _createForOfIteratorHelper$2(_components.values()),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var component = _step2.value;
      container.addComponent(component);
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  var newApp = new FirebaseAppImpl(options, config, container);

  _apps.set(name, newApp);

  return newApp;
}
/**
 * Retrieves a {@link @firebase/app#FirebaseApp} instance.
 *
 * When called with no arguments, the default app is returned. When an app name
 * is provided, the app corresponding to that name is returned.
 *
 * An exception is thrown if the app being retrieved has not yet been
 * initialized.
 *
 * @example
 * ```javascript
 * // Return the default app
 * const app = getApp();
 * ```
 *
 * @example
 * ```javascript
 * // Return a named app
 * const otherApp = getApp("otherApp");
 * ```
 *
 * @param name - Optional name of the app to return. If no name is
 *   provided, the default is `"[DEFAULT]"`.
 *
 * @returns The app corresponding to the provided app name.
 *   If no app name is provided, the default app is returned.
 *
 * @public
 */


function getApp() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_ENTRY_NAME;

  var app = _apps.get(name);

  if (!app) {
    throw ERROR_FACTORY.create("no-app"
    /* NO_APP */
    , {
      appName: name
    });
  }

  return app;
}

function registerVersion(libraryKeyOrName, version, variant) {
  var _a; // TODO: We can use this check to whitelist strings when/if we set up
  // a good whitelist system.


  var library = (_a = PLATFORM_LOG_STRING[libraryKeyOrName]) !== null && _a !== void 0 ? _a : libraryKeyOrName;

  if (variant) {
    library += "-".concat(variant);
  }

  var libraryMismatch = library.match(/\s|\//);
  var versionMismatch = version.match(/\s|\//);

  if (libraryMismatch || versionMismatch) {
    var warning = ["Unable to register library \"".concat(library, "\" with version \"").concat(version, "\":")];

    if (libraryMismatch) {
      warning.push("library name \"".concat(library, "\" contains illegal characters (whitespace or \"/\")"));
    }

    if (libraryMismatch && versionMismatch) {
      warning.push('and');
    }

    if (versionMismatch) {
      warning.push("version name \"".concat(version, "\" contains illegal characters (whitespace or \"/\")"));
    }

    logger.warn(warning.join(' '));
    return;
  }

  _registerComponent(new Component("".concat(library, "-version"), function () {
    return {
      library: library,
      version: version
    };
  }, "VERSION"
  /* VERSION */
  ));
}
/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


function registerCoreComponents(variant) {
  _registerComponent(new Component('platform-logger', function (container) {
    return new PlatformLoggerServiceImpl(container);
  }, "PRIVATE"
  /* PRIVATE */
  )); // Register `app` package.


  registerVersion(name$o, version$1, variant); // BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation

  registerVersion(name$o, version$1, 'esm2017'); // Register platform SDK identifier (no version).

  registerVersion('fire-js', '');
}
/**
 * Firebase App
 *
 * @remarks This package coordinates the communication between the different Firebase components
 * @packageDocumentation
 */


registerCoreComponents('');

var name = "firebase";
var version = "9.3.0";
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

registerVersion(name, version, 'app');

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper$2(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct$2(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct$2() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
/*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/

var k,
    goog = goog || {},
    l = commonjsGlobal || self;

function aa() {}

function ba$1(a) {
  var b = _typeof(a);

  b = "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null";
  return "array" == b || "object" == b && "number" == typeof a.length;
}

function p(a) {
  var b = _typeof(a);

  return "object" == b && null != a || "function" == b;
}

function da$1(a) {
  return Object.prototype.hasOwnProperty.call(a, ea) && a[ea] || (a[ea] = ++fa$1);
}

var ea = "closure_uid_" + (1E9 * Math.random() >>> 0),
    fa$1 = 0;

function ha$1(a, b, c) {
  return a.call.apply(a.bind, arguments);
}

function ia$1(a, b, c) {
  if (!a) throw Error();

  if (2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function () {
      var e = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(e, d);
      return a.apply(b, e);
    };
  }

  return function () {
    return a.apply(b, arguments);
  };
}

function q$1(a, b, c) {
  Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? q$1 = ha$1 : q$1 = ia$1;
  return q$1.apply(null, arguments);
}

function ja(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function () {
    var d = c.slice();
    d.push.apply(d, arguments);
    return a.apply(this, d);
  };
}

function t(a, b) {
  function c() {}

  c.prototype = b.prototype;
  a.Z = b.prototype;
  a.prototype = new c();
  a.prototype.constructor = a;

  a.Vb = function (d, e, f) {
    for (var h = Array(arguments.length - 2), n = 2; n < arguments.length; n++) {
      h[n - 2] = arguments[n];
    }

    return b.prototype[e].apply(d, h);
  };
}

function v() {
  this.s = this.s;
  this.o = this.o;
}

var ka$1 = 0,
    la$1 = {};
v.prototype.s = !1;

v.prototype.na = function () {
  if (!this.s && (this.s = !0, this.M(), 0 != ka$1)) {
    var a = da$1(this);
    delete la$1[a];
  }
};

v.prototype.M = function () {
  if (this.o) for (; this.o.length;) {
    this.o.shift()();
  }
};

var ma$1 = Array.prototype.indexOf ? function (a, b) {
  return Array.prototype.indexOf.call(a, b, void 0);
} : function (a, b) {
  if ("string" === typeof a) return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, 0);

  for (var c = 0; c < a.length; c++) {
    if (c in a && a[c] === b) return c;
  }

  return -1;
},
    na$1 = Array.prototype.forEach ? function (a, b, c) {
  Array.prototype.forEach.call(a, b, c);
} : function (a, b, c) {
  var d = a.length,
      e = "string" === typeof a ? a.split("") : a;

  for (var f = 0; f < d; f++) {
    f in e && b.call(c, e[f], f, a);
  }
};

function oa(a) {
  a: {
    var b = pa$1;
    var c = a.length,
        d = "string" === typeof a ? a.split("") : a;

    for (var e = 0; e < c; e++) {
      if (e in d && b.call(void 0, d[e], e, a)) {
        b = e;
        break a;
      }
    }

    b = -1;
  }

  return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b];
}

function qa(a) {
  return Array.prototype.concat.apply([], arguments);
}

function ra(a) {
  var b = a.length;

  if (0 < b) {
    var c = Array(b);

    for (var d = 0; d < b; d++) {
      c[d] = a[d];
    }

    return c;
  }

  return [];
}

function sa(a) {
  return /^[\s\xa0]*$/.test(a);
}

var ta = String.prototype.trim ? function (a) {
  return a.trim();
} : function (a) {
  return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1];
};

function w(a, b) {
  return -1 != a.indexOf(b);
}

function ua$1(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

var x$1;

a: {
  var va$1 = l.navigator;

  if (va$1) {
    var wa$1 = va$1.userAgent;

    if (wa$1) {
      x$1 = wa$1;
      break a;
    }
  }

  x$1 = "";
}

function xa(a, b, c) {
  for (var d in a) {
    b.call(c, a[d], d, a);
  }
}

function ya(a) {
  var b = {};

  for (var c in a) {
    b[c] = a[c];
  }

  return b;
}

var za = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");

function Aa$1(a, b) {
  var c, d;

  for (var e = 1; e < arguments.length; e++) {
    d = arguments[e];

    for (c in d) {
      a[c] = d[c];
    }

    for (var f = 0; f < za.length; f++) {
      c = za[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
    }
  }
}

function Ca(a) {
  Ca[" "](a);
  return a;
}

Ca[" "] = aa;

function Fa$1(a) {
  var b = Ga;
  return Object.prototype.hasOwnProperty.call(b, 9) ? b[9] : b[9] = a(9);
}

var Ha = w(x$1, "Opera"),
    y = w(x$1, "Trident") || w(x$1, "MSIE"),
    Ia$1 = w(x$1, "Edge"),
    Ja$1 = Ia$1 || y,
    Ka = w(x$1, "Gecko") && !(w(x$1.toLowerCase(), "webkit") && !w(x$1, "Edge")) && !(w(x$1, "Trident") || w(x$1, "MSIE")) && !w(x$1, "Edge"),
    La = w(x$1.toLowerCase(), "webkit") && !w(x$1, "Edge");

function Ma$1() {
  var a = l.document;
  return a ? a.documentMode : void 0;
}

var Na;

a: {
  var Oa$1 = "",
      Pa = function () {
    var a = x$1;
    if (Ka) return /rv:([^\);]+)(\)|;)/.exec(a);
    if (Ia$1) return /Edge\/([\d\.]+)/.exec(a);
    if (y) return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
    if (La) return /WebKit\/(\S+)/.exec(a);
    if (Ha) return /(?:Version)[ \/]?(\S+)/.exec(a);
  }();

  Pa && (Oa$1 = Pa ? Pa[1] : "");

  if (y) {
    var Qa = Ma$1();

    if (null != Qa && Qa > parseFloat(Oa$1)) {
      Na = String(Qa);
      break a;
    }
  }

  Na = Oa$1;
}

var Ga = {};

function Ra$1() {
  return Fa$1(function () {
    var a = 0;
    var b = ta(String(Na)).split("."),
        c = ta("9").split("."),
        d = Math.max(b.length, c.length);

    for (var h = 0; 0 == a && h < d; h++) {
      var e = b[h] || "",
          f = c[h] || "";

      do {
        e = /(\d*)(\D*)(.*)/.exec(e) || ["", "", "", ""];
        f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
        if (0 == e[0].length && 0 == f[0].length) break;
        a = ua$1(0 == e[1].length ? 0 : parseInt(e[1], 10), 0 == f[1].length ? 0 : parseInt(f[1], 10)) || ua$1(0 == e[2].length, 0 == f[2].length) || ua$1(e[2], f[2]);
        e = e[3];
        f = f[3];
      } while (0 == a);
    }

    return 0 <= a;
  });
}

var Sa;

if (l.document && y) {
  var Ta$1 = Ma$1();
  Sa = Ta$1 ? Ta$1 : parseInt(Na, 10) || void 0;
} else Sa = void 0;

var Ua = Sa;

var Va = function () {
  if (!l.addEventListener || !Object.defineProperty) return !1;
  var a = !1,
      b = Object.defineProperty({}, "passive", {
    get: function get() {
      a = !0;
    }
  });

  try {
    l.addEventListener("test", aa, b), l.removeEventListener("test", aa, b);
  } catch (c) {}

  return a;
}();

function z(a, b) {
  this.type = a;
  this.g = this.target = b;
  this.defaultPrevented = !1;
}

z.prototype.h = function () {
  this.defaultPrevented = !0;
};

function A(a, b) {
  z.call(this, a ? a.type : "");
  this.relatedTarget = this.g = this.target = null;
  this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
  this.key = "";
  this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
  this.state = null;
  this.pointerId = 0;
  this.pointerType = "";
  this.i = null;

  if (a) {
    var c = this.type = a.type,
        d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
    this.target = a.target || a.srcElement;
    this.g = b;

    if (b = a.relatedTarget) {
      if (Ka) {
        a: {
          try {
            Ca(b.nodeName);
            var e = !0;
            break a;
          } catch (f) {}

          e = !1;
        }

        e || (b = null);
      }
    } else "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);

    this.relatedTarget = b;
    d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX, this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY, this.screenX = d.screenX || 0, this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX, this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY, this.screenX = a.screenX || 0, this.screenY = a.screenY || 0);
    this.button = a.button;
    this.key = a.key || "";
    this.ctrlKey = a.ctrlKey;
    this.altKey = a.altKey;
    this.shiftKey = a.shiftKey;
    this.metaKey = a.metaKey;
    this.pointerId = a.pointerId || 0;
    this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Wa[a.pointerType] || "";
    this.state = a.state;
    this.i = a;
    a.defaultPrevented && A.Z.h.call(this);
  }
}

t(A, z);
var Wa = {
  2: "touch",
  3: "pen",
  4: "mouse"
};

A.prototype.h = function () {
  A.Z.h.call(this);
  var a = this.i;
  a.preventDefault ? a.preventDefault() : a.returnValue = !1;
};

var B$1 = "closure_listenable_" + (1E6 * Math.random() | 0);
var Xa$1 = 0;

function Ya(a, b, c, d, e) {
  this.listener = a;
  this.proxy = null;
  this.src = b;
  this.type = c;
  this.capture = !!d;
  this.ia = e;
  this.key = ++Xa$1;
  this.ca = this.fa = !1;
}

function Za$1(a) {
  a.ca = !0;
  a.listener = null;
  a.proxy = null;
  a.src = null;
  a.ia = null;
}

function $a(a) {
  this.src = a;
  this.g = {};
  this.h = 0;
}

$a.prototype.add = function (a, b, c, d, e) {
  var f = a.toString();
  a = this.g[f];
  a || (a = this.g[f] = [], this.h++);
  var h = ab(a, b, d, e);
  -1 < h ? (b = a[h], c || (b.fa = !1)) : (b = new Ya(b, this.src, f, !!d, e), b.fa = c, a.push(b));
  return b;
};

function bb(a, b) {
  var c = b.type;

  if (c in a.g) {
    var d = a.g[c],
        e = ma$1(d, b),
        f;
    (f = 0 <= e) && Array.prototype.splice.call(d, e, 1);
    f && (Za$1(b), 0 == a.g[c].length && (delete a.g[c], a.h--));
  }
}

function ab(a, b, c, d) {
  for (var e = 0; e < a.length; ++e) {
    var f = a[e];
    if (!f.ca && f.listener == b && f.capture == !!c && f.ia == d) return e;
  }

  return -1;
}

var cb = "closure_lm_" + (1E6 * Math.random() | 0),
    db = {};

function fb(a, b, c, d, e) {
  if (d && d.once) return gb(a, b, c, d, e);

  if (Array.isArray(b)) {
    for (var f = 0; f < b.length; f++) {
      fb(a, b[f], c, d, e);
    }

    return null;
  }

  c = hb(c);
  return a && a[B$1] ? a.N(b, c, p(d) ? !!d.capture : !!d, e) : ib(a, b, c, !1, d, e);
}

function ib(a, b, c, d, e, f) {
  if (!b) throw Error("Invalid event type");
  var h = p(e) ? !!e.capture : !!e,
      n = jb(a);
  n || (a[cb] = n = new $a(a));
  c = n.add(b, c, d, h, f);
  if (c.proxy) return c;
  d = kb();
  c.proxy = d;
  d.src = a;
  d.listener = c;
  if (a.addEventListener) Va || (e = h), void 0 === e && (e = !1), a.addEventListener(b.toString(), d, e);else if (a.attachEvent) a.attachEvent(lb(b.toString()), d);else if (a.addListener && a.removeListener) a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");
  return c;
}

function kb() {
  function a(c) {
    return b.call(a.src, a.listener, c);
  }

  var b = mb;
  return a;
}

function gb(a, b, c, d, e) {
  if (Array.isArray(b)) {
    for (var f = 0; f < b.length; f++) {
      gb(a, b[f], c, d, e);
    }

    return null;
  }

  c = hb(c);
  return a && a[B$1] ? a.O(b, c, p(d) ? !!d.capture : !!d, e) : ib(a, b, c, !0, d, e);
}

function nb(a, b, c, d, e) {
  if (Array.isArray(b)) for (var f = 0; f < b.length; f++) {
    nb(a, b[f], c, d, e);
  } else (d = p(d) ? !!d.capture : !!d, c = hb(c), a && a[B$1]) ? (a = a.i, b = String(b).toString(), b in a.g && (f = a.g[b], c = ab(f, c, d, e), -1 < c && (Za$1(f[c]), Array.prototype.splice.call(f, c, 1), 0 == f.length && (delete a.g[b], a.h--)))) : a && (a = jb(a)) && (b = a.g[b.toString()], a = -1, b && (a = ab(b, c, d, e)), (c = -1 < a ? b[a] : null) && ob(c));
}

function ob(a) {
  if ("number" !== typeof a && a && !a.ca) {
    var b = a.src;
    if (b && b[B$1]) bb(b.i, a);else {
      var c = a.type,
          d = a.proxy;
      b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(lb(c), d) : b.addListener && b.removeListener && b.removeListener(d);
      (c = jb(b)) ? (bb(c, a), 0 == c.h && (c.src = null, b[cb] = null)) : Za$1(a);
    }
  }
}

function lb(a) {
  return a in db ? db[a] : db[a] = "on" + a;
}

function mb(a, b) {
  if (a.ca) a = !0;else {
    b = new A(b, this);
    var c = a.listener,
        d = a.ia || a.src;
    a.fa && ob(a);
    a = c.call(d, b);
  }
  return a;
}

function jb(a) {
  a = a[cb];
  return a instanceof $a ? a : null;
}

var pb = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);

function hb(a) {
  if ("function" === typeof a) return a;
  a[pb] || (a[pb] = function (b) {
    return a.handleEvent(b);
  });
  return a[pb];
}

function C$1() {
  v.call(this);
  this.i = new $a(this);
  this.P = this;
  this.I = null;
}

t(C$1, v);
C$1.prototype[B$1] = !0;

C$1.prototype.removeEventListener = function (a, b, c, d) {
  nb(this, a, b, c, d);
};

function D$1(a, b) {
  var c,
      d = a.I;
  if (d) for (c = []; d; d = d.I) {
    c.push(d);
  }
  a = a.P;
  d = b.type || b;
  if ("string" === typeof b) b = new z(b, a);else if (b instanceof z) b.target = b.target || a;else {
    var e = b;
    b = new z(d, a);
    Aa$1(b, e);
  }
  e = !0;
  if (c) for (var f = c.length - 1; 0 <= f; f--) {
    var h = b.g = c[f];
    e = qb(h, d, !0, b) && e;
  }
  h = b.g = a;
  e = qb(h, d, !0, b) && e;
  e = qb(h, d, !1, b) && e;
  if (c) for (f = 0; f < c.length; f++) {
    h = b.g = c[f], e = qb(h, d, !1, b) && e;
  }
}

C$1.prototype.M = function () {
  C$1.Z.M.call(this);

  if (this.i) {
    var a = this.i,
        c;

    for (c in a.g) {
      for (var d = a.g[c], e = 0; e < d.length; e++) {
        Za$1(d[e]);
      }

      delete a.g[c];
      a.h--;
    }
  }

  this.I = null;
};

C$1.prototype.N = function (a, b, c, d) {
  return this.i.add(String(a), b, !1, c, d);
};

C$1.prototype.O = function (a, b, c, d) {
  return this.i.add(String(a), b, !0, c, d);
};

function qb(a, b, c, d) {
  b = a.i.g[String(b)];
  if (!b) return !0;
  b = b.concat();

  for (var e = !0, f = 0; f < b.length; ++f) {
    var h = b[f];

    if (h && !h.ca && h.capture == c) {
      var n = h.listener,
          u = h.ia || h.src;
      h.fa && bb(a.i, h);
      e = !1 !== n.call(u, d) && e;
    }
  }

  return e && !d.defaultPrevented;
}

var rb = l.JSON.stringify;

function sb() {
  var a = tb;
  var b = null;
  a.g && (b = a.g, a.g = a.g.next, a.g || (a.h = null), b.next = null);
  return b;
}

var ub = /*#__PURE__*/function () {
  function ub() {
    _classCallCheck(this, ub);

    this.h = this.g = null;
  }

  _createClass(ub, [{
    key: "add",
    value: function add(a, b) {
      var c = vb.get();
      c.set(a, b);
      this.h ? this.h.next = c : this.g = c;
      this.h = c;
    }
  }]);

  return ub;
}();

var vb = new ( /*#__PURE__*/function () {
  function _class(a, b) {
    _classCallCheck(this, _class);

    this.i = a;
    this.j = b;
    this.h = 0;
    this.g = null;
  }

  _createClass(_class, [{
    key: "get",
    value: function get() {
      var a;
      0 < this.h ? (this.h--, a = this.g, this.g = a.next, a.next = null) : a = this.i();
      return a;
    }
  }]);

  return _class;
}())(function () {
  return new wb();
}, function (a) {
  return a.reset();
});

var wb = /*#__PURE__*/function () {
  function wb() {
    _classCallCheck(this, wb);

    this.next = this.g = this.h = null;
  }

  _createClass(wb, [{
    key: "set",
    value: function set(a, b) {
      this.h = a;
      this.g = b;
      this.next = null;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.next = this.g = this.h = null;
    }
  }]);

  return wb;
}();

function yb(a) {
  l.setTimeout(function () {
    throw a;
  }, 0);
}

function zb(a, b) {
  Ab || Bb();
  Cb || (Ab(), Cb = !0);
  tb.add(a, b);
}

var Ab;

function Bb() {
  var a = l.Promise.resolve(void 0);

  Ab = function Ab() {
    a.then(Db);
  };
}

var Cb = !1,
    tb = new ub();

function Db() {
  for (var a; a = sb();) {
    try {
      a.h.call(a.g);
    } catch (c) {
      yb(c);
    }

    var b = vb;
    b.j(a);
    100 > b.h && (b.h++, a.next = b.g, b.g = a);
  }

  Cb = !1;
}

function Eb(a, b) {
  C$1.call(this);
  this.h = a || 1;
  this.g = b || l;
  this.j = q$1(this.kb, this);
  this.l = Date.now();
}

t(Eb, C$1);
k = Eb.prototype;
k.da = !1;
k.S = null;

k.kb = function () {
  if (this.da) {
    var a = Date.now() - this.l;
    0 < a && a < .8 * this.h ? this.S = this.g.setTimeout(this.j, this.h - a) : (this.S && (this.g.clearTimeout(this.S), this.S = null), D$1(this, "tick"), this.da && (Fb(this), this.start()));
  }
};

k.start = function () {
  this.da = !0;
  this.S || (this.S = this.g.setTimeout(this.j, this.h), this.l = Date.now());
};

function Fb(a) {
  a.da = !1;
  a.S && (a.g.clearTimeout(a.S), a.S = null);
}

k.M = function () {
  Eb.Z.M.call(this);
  Fb(this);
  delete this.g;
};

function Gb(a, b, c) {
  if ("function" === typeof a) c && (a = q$1(a, c));else if (a && "function" == typeof a.handleEvent) a = q$1(a.handleEvent, a);else throw Error("Invalid listener argument");
  return 2147483647 < Number(b) ? -1 : l.setTimeout(a, b || 0);
}

function Hb(a) {
  a.g = Gb(function () {
    a.g = null;
    a.i && (a.i = !1, Hb(a));
  }, a.j);
  var b = a.h;
  a.h = null;
  a.m.apply(null, b);
}

var Ib = /*#__PURE__*/function (_v) {
  _inherits(Ib, _v);

  var _super = _createSuper$2(Ib);

  function Ib(a, b) {
    var _this;

    _classCallCheck(this, Ib);

    _this = _super.call(this);
    _this.m = a;
    _this.j = b;
    _this.h = null;
    _this.i = !1;
    _this.g = null;
    return _this;
  }

  _createClass(Ib, [{
    key: "l",
    value: function l(a) {
      this.h = arguments;
      this.g ? this.i = !0 : Hb(this);
    }
  }, {
    key: "M",
    value: function M() {
      _get(_getPrototypeOf(Ib.prototype), "M", this).call(this);

      this.g && (l.clearTimeout(this.g), this.g = null, this.i = !1, this.h = null);
    }
  }]);

  return Ib;
}(v);

function E(a) {
  v.call(this);
  this.h = a;
  this.g = {};
}

t(E, v);
var Jb = [];

function Kb(a, b, c, d) {
  Array.isArray(c) || (c && (Jb[0] = c.toString()), c = Jb);

  for (var e = 0; e < c.length; e++) {
    var f = fb(b, c[e], d || a.handleEvent, !1, a.h || a);
    if (!f) break;
    a.g[f.key] = f;
  }
}

function Lb(a) {
  xa(a.g, function (b, c) {
    this.g.hasOwnProperty(c) && ob(b);
  }, a);
  a.g = {};
}

E.prototype.M = function () {
  E.Z.M.call(this);
  Lb(this);
};

E.prototype.handleEvent = function () {
  throw Error("EventHandler.handleEvent not implemented");
};

function Mb() {
  this.g = !0;
}

Mb.prototype.Aa = function () {
  this.g = !1;
};

function Nb(a, b, c, d, e, f) {
  a.info(function () {
    if (a.g) {
      if (f) {
        var h = "";

        for (var n = f.split("&"), u = 0; u < n.length; u++) {
          var m = n[u].split("=");

          if (1 < m.length) {
            var r = m[0];
            m = m[1];
            var G = r.split("_");
            h = 2 <= G.length && "type" == G[1] ? h + (r + "=" + m + "&") : h + (r + "=redacted&");
          }
        }
      } else h = null;
    } else h = f;
    return "XMLHTTP REQ (" + d + ") [attempt " + e + "]: " + b + "\n" + c + "\n" + h;
  });
}

function Ob(a, b, c, d, e, f, h) {
  a.info(function () {
    return "XMLHTTP RESP (" + d + ") [ attempt " + e + "]: " + b + "\n" + c + "\n" + f + " " + h;
  });
}

function F$1(a, b, c, d) {
  a.info(function () {
    return "XMLHTTP TEXT (" + b + "): " + Pb(a, c) + (d ? " " + d : "");
  });
}

function Qb(a, b) {
  a.info(function () {
    return "TIMEOUT: " + b;
  });
}

Mb.prototype.info = function () {};

function Pb(a, b) {
  if (!a.g) return b;
  if (!b) return null;

  try {
    var c = JSON.parse(b);
    if (c) for (a = 0; a < c.length; a++) {
      if (Array.isArray(c[a])) {
        var d = c[a];

        if (!(2 > d.length)) {
          var e = d[1];

          if (Array.isArray(e) && !(1 > e.length)) {
            var f = e[0];
            if ("noop" != f && "stop" != f && "close" != f) for (var h = 1; h < e.length; h++) {
              e[h] = "";
            }
          }
        }
      }
    }
    return rb(c);
  } catch (n) {
    return b;
  }
}

var H$1 = {},
    Rb = null;

function Sb() {
  return Rb = Rb || new C$1();
}

H$1.Ma = "serverreachability";

function Tb(a) {
  z.call(this, H$1.Ma, a);
}

t(Tb, z);

function I(a) {
  var b = Sb();
  D$1(b, new Tb(b, a));
}

H$1.STAT_EVENT = "statevent";

function Ub(a, b) {
  z.call(this, H$1.STAT_EVENT, a);
  this.stat = b;
}

t(Ub, z);

function J$1(a) {
  var b = Sb();
  D$1(b, new Ub(b, a));
}

H$1.Na = "timingevent";

function Vb(a, b) {
  z.call(this, H$1.Na, a);
  this.size = b;
}

t(Vb, z);

function K$1(a, b) {
  if ("function" !== typeof a) throw Error("Fn must not be null and must be a function");
  return l.setTimeout(function () {
    a();
  }, b);
}

var Wb = {
  NO_ERROR: 0,
  lb: 1,
  yb: 2,
  xb: 3,
  sb: 4,
  wb: 5,
  zb: 6,
  Ja: 7,
  TIMEOUT: 8,
  Cb: 9
};
var Xb = {
  qb: "complete",
  Mb: "success",
  Ka: "error",
  Ja: "abort",
  Eb: "ready",
  Fb: "readystatechange",
  TIMEOUT: "timeout",
  Ab: "incrementaldata",
  Db: "progress",
  tb: "downloadprogress",
  Ub: "uploadprogress"
};

function Yb() {}

Yb.prototype.h = null;

function Zb(a) {
  return a.h || (a.h = a.i());
}

function $b() {}

var L$1 = {
  OPEN: "a",
  pb: "b",
  Ka: "c",
  Bb: "d"
};

function ac$1() {
  z.call(this, "d");
}

t(ac$1, z);

function bc() {
  z.call(this, "c");
}

t(bc, z);
var cc$1;

function dc$1() {}

t(dc$1, Yb);

dc$1.prototype.g = function () {
  return new XMLHttpRequest();
};

dc$1.prototype.i = function () {
  return {};
};

cc$1 = new dc$1();

function M$1(a, b, c, d) {
  this.l = a;
  this.j = b;
  this.m = c;
  this.X = d || 1;
  this.V = new E(this);
  this.P = ec$1;
  a = Ja$1 ? 125 : void 0;
  this.W = new Eb(a);
  this.H = null;
  this.i = !1;
  this.s = this.A = this.v = this.K = this.F = this.Y = this.B = null;
  this.D = [];
  this.g = null;
  this.C = 0;
  this.o = this.u = null;
  this.N = -1;
  this.I = !1;
  this.O = 0;
  this.L = null;
  this.aa = this.J = this.$ = this.U = !1;
  this.h = new fc$1();
}

function fc$1() {
  this.i = null;
  this.g = "";
  this.h = !1;
}

var ec$1 = 45E3,
    gc$1 = {},
    hc$1 = {};
k = M$1.prototype;

k.setTimeout = function (a) {
  this.P = a;
};

function ic$1(a, b, c) {
  a.K = 1;
  a.v = jc$1(N$1(b));
  a.s = c;
  a.U = !0;
  kc$1(a, null);
}

function kc$1(a, b) {
  a.F = Date.now();
  lc(a);
  a.A = N$1(a.v);
  var c = a.A,
      d = a.X;
  Array.isArray(d) || (d = [String(d)]);
  mc$1(c.h, "t", d);
  a.C = 0;
  c = a.l.H;
  a.h = new fc$1();
  a.g = nc$1(a.l, c ? b : null, !a.s);
  0 < a.O && (a.L = new Ib(q$1(a.Ia, a, a.g), a.O));
  Kb(a.V, a.g, "readystatechange", a.gb);
  b = a.H ? ya(a.H) : {};
  a.s ? (a.u || (a.u = "POST"), b["Content-Type"] = "application/x-www-form-urlencoded", a.g.ea(a.A, a.u, a.s, b)) : (a.u = "GET", a.g.ea(a.A, a.u, null, b));
  I(1);
  Nb(a.j, a.u, a.A, a.m, a.X, a.s);
}

k.gb = function (a) {
  a = a.target;
  var b = this.L;
  b && 3 == O$1(a) ? b.l() : this.Ia(a);
};

k.Ia = function (a) {
  try {
    if (a == this.g) a: {
      var r = O$1(this.g);
      var b = this.g.Da();
      var G = this.g.ba();

      if (!(3 > r) && (3 != r || Ja$1 || this.g && (this.h.h || this.g.ga() || oc$1(this.g)))) {
        this.I || 4 != r || 7 == b || (8 == b || 0 >= G ? I(3) : I(2));
        pc$1(this);
        var c = this.g.ba();
        this.N = c;

        b: if (qc(this)) {
          var d = oc$1(this.g);
          a = "";
          var e = d.length,
              f = 4 == O$1(this.g);

          if (!this.h.i) {
            if ("undefined" === typeof TextDecoder) {
              P(this);
              rc$1(this);
              var h = "";
              break b;
            }

            this.h.i = new l.TextDecoder();
          }

          for (b = 0; b < e; b++) {
            this.h.h = !0, a += this.h.i.decode(d[b], {
              stream: f && b == e - 1
            });
          }

          d.splice(0, e);
          this.h.g += a;
          this.C = 0;
          h = this.h.g;
        } else h = this.g.ga();

        this.i = 200 == c;
        Ob(this.j, this.u, this.A, this.m, this.X, r, c);

        if (this.i) {
          if (this.$ && !this.J) {
            b: {
              if (this.g) {
                var n,
                    u = this.g;

                if ((n = u.g ? u.g.getResponseHeader("X-HTTP-Initial-Response") : null) && !sa(n)) {
                  var m = n;
                  break b;
                }
              }

              m = null;
            }

            if (c = m) F$1(this.j, this.m, c, "Initial handshake response via X-HTTP-Initial-Response"), this.J = !0, sc$1(this, c);else {
              this.i = !1;
              this.o = 3;
              J$1(12);
              P(this);
              rc$1(this);
              break a;
            }
          }

          this.U ? (tc$1(this, r, h), Ja$1 && this.i && 3 == r && (Kb(this.V, this.W, "tick", this.fb), this.W.start())) : (F$1(this.j, this.m, h, null), sc$1(this, h));
          4 == r && P(this);
          this.i && !this.I && (4 == r ? uc$1(this.l, this) : (this.i = !1, lc(this)));
        } else 400 == c && 0 < h.indexOf("Unknown SID") ? (this.o = 3, J$1(12)) : (this.o = 0, J$1(13)), P(this), rc$1(this);
      }
    }
  } catch (r) {} finally {}
};

function qc(a) {
  return a.g ? "GET" == a.u && 2 != a.K && a.l.Ba : !1;
}

function tc$1(a, b, c) {
  var d = !0,
      e;

  for (; !a.I && a.C < c.length;) {
    if (e = vc(a, c), e == hc$1) {
      4 == b && (a.o = 4, J$1(14), d = !1);
      F$1(a.j, a.m, null, "[Incomplete Response]");
      break;
    } else if (e == gc$1) {
      a.o = 4;
      J$1(15);
      F$1(a.j, a.m, c, "[Invalid Chunk]");
      d = !1;
      break;
    } else F$1(a.j, a.m, e, null), sc$1(a, e);
  }

  qc(a) && e != hc$1 && e != gc$1 && (a.h.g = "", a.C = 0);
  4 != b || 0 != c.length || a.h.h || (a.o = 1, J$1(16), d = !1);
  a.i = a.i && d;
  d ? 0 < c.length && !a.aa && (a.aa = !0, b = a.l, b.g == a && b.$ && !b.L && (b.h.info("Great, no buffering proxy detected. Bytes received: " + c.length), wc$1(b), b.L = !0, J$1(11))) : (F$1(a.j, a.m, c, "[Invalid Chunked Response]"), P(a), rc$1(a));
}

k.fb = function () {
  if (this.g) {
    var a = O$1(this.g),
        b = this.g.ga();
    this.C < b.length && (pc$1(this), tc$1(this, a, b), this.i && 4 != a && lc(this));
  }
};

function vc(a, b) {
  var c = a.C,
      d = b.indexOf("\n", c);
  if (-1 == d) return hc$1;
  c = Number(b.substring(c, d));
  if (isNaN(c)) return gc$1;
  d += 1;
  if (d + c > b.length) return hc$1;
  b = b.substr(d, c);
  a.C = d + c;
  return b;
}

k.cancel = function () {
  this.I = !0;
  P(this);
};

function lc(a) {
  a.Y = Date.now() + a.P;
  xc(a, a.P);
}

function xc(a, b) {
  if (null != a.B) throw Error("WatchDog timer not null");
  a.B = K$1(q$1(a.eb, a), b);
}

function pc$1(a) {
  a.B && (l.clearTimeout(a.B), a.B = null);
}

k.eb = function () {
  this.B = null;
  var a = Date.now();
  0 <= a - this.Y ? (Qb(this.j, this.A), 2 != this.K && (I(3), J$1(17)), P(this), this.o = 2, rc$1(this)) : xc(this, this.Y - a);
};

function rc$1(a) {
  0 == a.l.G || a.I || uc$1(a.l, a);
}

function P(a) {
  pc$1(a);
  var b = a.L;
  b && "function" == typeof b.na && b.na();
  a.L = null;
  Fb(a.W);
  Lb(a.V);
  a.g && (b = a.g, a.g = null, b.abort(), b.na());
}

function sc$1(a, b) {
  try {
    var c = a.l;
    if (0 != c.G && (c.g == a || yc$1(c.i, a))) if (c.I = a.N, !a.J && yc$1(c.i, a) && 3 == c.G) {
      try {
        var d = c.Ca.g.parse(b);
      } catch (m) {
        d = null;
      }

      if (Array.isArray(d) && 3 == d.length) {
        var e = d;
        if (0 == e[0]) a: {
          if (!c.u) {
            if (c.g) if (c.g.F + 3E3 < a.F) zc(c), Ac(c);else break a;
            Bc(c);
            J$1(18);
          }
        } else c.ta = e[1], 0 < c.ta - c.U && 37500 > e[2] && c.N && 0 == c.A && !c.v && (c.v = K$1(q$1(c.ab, c), 6E3));

        if (1 >= Cc$1(c.i) && c.ka) {
          try {
            c.ka();
          } catch (m) {}

          c.ka = void 0;
        }
      } else Q$1(c, 11);
    } else if ((a.J || c.g == a) && zc(c), !sa(b)) for (e = c.Ca.g.parse(b), b = 0; b < e.length; b++) {
      var m = e[b];
      c.U = m[0];
      m = m[1];
      if (2 == c.G) {
        if ("c" == m[0]) {
          c.J = m[1];
          c.la = m[2];
          var r = m[3];
          null != r && (c.ma = r, c.h.info("VER=" + c.ma));
          var G = m[4];
          null != G && (c.za = G, c.h.info("SVER=" + c.za));
          var Da = m[5];
          null != Da && "number" === typeof Da && 0 < Da && (d = 1.5 * Da, c.K = d, c.h.info("backChannelRequestTimeoutMs_=" + d));
          d = c;
          var ca = a.g;

          if (ca) {
            var Ea = ca.g ? ca.g.getResponseHeader("X-Client-Wire-Protocol") : null;

            if (Ea) {
              var f = d.i;
              !f.g && (w(Ea, "spdy") || w(Ea, "quic") || w(Ea, "h2")) && (f.j = f.l, f.g = new Set(), f.h && (Dc(f, f.h), f.h = null));
            }

            if (d.D) {
              var xb = ca.g ? ca.g.getResponseHeader("X-HTTP-Session-Id") : null;
              xb && (d.sa = xb, R(d.F, d.D, xb));
            }
          }

          c.G = 3;
          c.j && c.j.xa();
          c.$ && (c.O = Date.now() - a.F, c.h.info("Handshake RTT: " + c.O + "ms"));
          d = c;
          var h = a;
          d.oa = Ec$1(d, d.H ? d.la : null, d.W);

          if (h.J) {
            Fc$1(d.i, h);
            var n = h,
                u = d.K;
            u && n.setTimeout(u);
            n.B && (pc$1(n), lc(n));
            d.g = h;
          } else Gc$1(d);

          0 < c.l.length && Hc(c);
        } else "stop" != m[0] && "close" != m[0] || Q$1(c, 7);
      } else 3 == c.G && ("stop" == m[0] || "close" == m[0] ? "stop" == m[0] ? Q$1(c, 7) : Ic(c) : "noop" != m[0] && c.j && c.j.wa(m), c.A = 0);
    }
    I(4);
  } catch (m) {}
}

function Jc(a) {
  if (a.R && "function" == typeof a.R) return a.R();
  if ("string" === typeof a) return a.split("");

  if (ba$1(a)) {
    for (var b = [], c = a.length, d = 0; d < c; d++) {
      b.push(a[d]);
    }

    return b;
  }

  b = [];
  c = 0;

  for (d in a) {
    b[c++] = a[d];
  }

  return b;
}

function Kc$1(a, b) {
  if (a.forEach && "function" == typeof a.forEach) a.forEach(b, void 0);else if (ba$1(a) || "string" === typeof a) na$1(a, b, void 0);else {
    if (a.T && "function" == typeof a.T) var c = a.T();else if (a.R && "function" == typeof a.R) c = void 0;else if (ba$1(a) || "string" === typeof a) {
      c = [];

      for (var d = a.length, e = 0; e < d; e++) {
        c.push(e);
      }
    } else for (e in c = [], d = 0, a) {
      c[d++] = e;
    }
    d = Jc(a);
    e = d.length;

    for (var f = 0; f < e; f++) {
      b.call(void 0, d[f], c && c[f], a);
    }
  }
}

function S$1(a, b) {
  this.h = {};
  this.g = [];
  this.i = 0;
  var c = arguments.length;

  if (1 < c) {
    if (c % 2) throw Error("Uneven number of arguments");

    for (var d = 0; d < c; d += 2) {
      this.set(arguments[d], arguments[d + 1]);
    }
  } else if (a) if (a instanceof S$1) for (c = a.T(), d = 0; d < c.length; d++) {
    this.set(c[d], a.get(c[d]));
  } else for (d in a) {
    this.set(d, a[d]);
  }
}

k = S$1.prototype;

k.R = function () {
  Lc$1(this);

  for (var a = [], b = 0; b < this.g.length; b++) {
    a.push(this.h[this.g[b]]);
  }

  return a;
};

k.T = function () {
  Lc$1(this);
  return this.g.concat();
};

function Lc$1(a) {
  if (a.i != a.g.length) {
    for (var b = 0, c = 0; b < a.g.length;) {
      var d = a.g[b];
      T(a.h, d) && (a.g[c++] = d);
      b++;
    }

    a.g.length = c;
  }

  if (a.i != a.g.length) {
    var e = {};

    for (c = b = 0; b < a.g.length;) {
      d = a.g[b], T(e, d) || (a.g[c++] = d, e[d] = 1), b++;
    }

    a.g.length = c;
  }
}

k.get = function (a, b) {
  return T(this.h, a) ? this.h[a] : b;
};

k.set = function (a, b) {
  T(this.h, a) || (this.i++, this.g.push(a));
  this.h[a] = b;
};

k.forEach = function (a, b) {
  for (var c = this.T(), d = 0; d < c.length; d++) {
    var e = c[d],
        f = this.get(e);
    a.call(b, f, e, this);
  }
};

function T(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b);
}

var Mc = /^(?:([^:/?#.]+):)?(?:\/\/(?:([^\\/?#]*)@)?([^\\/?#]*?)(?::([0-9]+))?(?=[\\/?#]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;

function Nc$1(a, b) {
  if (a) {
    a = a.split("&");

    for (var c = 0; c < a.length; c++) {
      var d = a[c].indexOf("="),
          e = null;

      if (0 <= d) {
        var f = a[c].substring(0, d);
        e = a[c].substring(d + 1);
      } else f = a[c];

      b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "");
    }
  }
}

function U(a, b) {
  this.i = this.s = this.j = "";
  this.m = null;
  this.o = this.l = "";
  this.g = !1;

  if (a instanceof U) {
    this.g = void 0 !== b ? b : a.g;
    Oc(this, a.j);
    this.s = a.s;
    Pc(this, a.i);
    Qc$1(this, a.m);
    this.l = a.l;
    b = a.h;
    var c = new Rc();
    c.i = b.i;
    b.g && (c.g = new S$1(b.g), c.h = b.h);
    Sc(this, c);
    this.o = a.o;
  } else a && (c = String(a).match(Mc)) ? (this.g = !!b, Oc(this, c[1] || "", !0), this.s = Tc$1(c[2] || ""), Pc(this, c[3] || "", !0), Qc$1(this, c[4]), this.l = Tc$1(c[5] || "", !0), Sc(this, c[6] || "", !0), this.o = Tc$1(c[7] || "")) : (this.g = !!b, this.h = new Rc(null, this.g));
}

U.prototype.toString = function () {
  var a = [],
      b = this.j;
  b && a.push(Uc(b, Vc, !0), ":");
  var c = this.i;
  if (c || "file" == b) a.push("//"), (b = this.s) && a.push(Uc(b, Vc, !0), "@"), a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")), c = this.m, null != c && a.push(":", String(c));
  if (c = this.l) this.i && "/" != c.charAt(0) && a.push("/"), a.push(Uc(c, "/" == c.charAt(0) ? Wc$1 : Xc$1, !0));
  (c = this.h.toString()) && a.push("?", c);
  (c = this.o) && a.push("#", Uc(c, Yc$1));
  return a.join("");
};

function N$1(a) {
  return new U(a);
}

function Oc(a, b, c) {
  a.j = c ? Tc$1(b, !0) : b;
  a.j && (a.j = a.j.replace(/:$/, ""));
}

function Pc(a, b, c) {
  a.i = c ? Tc$1(b, !0) : b;
}

function Qc$1(a, b) {
  if (b) {
    b = Number(b);
    if (isNaN(b) || 0 > b) throw Error("Bad port number " + b);
    a.m = b;
  } else a.m = null;
}

function Sc(a, b, c) {
  b instanceof Rc ? (a.h = b, Zc(a.h, a.g)) : (c || (b = Uc(b, $c)), a.h = new Rc(b, a.g));
}

function R(a, b, c) {
  a.h.set(b, c);
}

function jc$1(a) {
  R(a, "zx", Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ Date.now()).toString(36));
  return a;
}

function ad(a) {
  return a instanceof U ? N$1(a) : new U(a, void 0);
}

function bd(a, b, c, d) {
  var e = new U(null, void 0);
  a && Oc(e, a);
  b && Pc(e, b);
  c && Qc$1(e, c);
  d && (e.l = d);
  return e;
}

function Tc$1(a, b) {
  return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : "";
}

function Uc(a, b, c) {
  return "string" === typeof a ? (a = encodeURI(a).replace(b, cd), c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")), a) : null;
}

function cd(a) {
  a = a.charCodeAt(0);
  return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16);
}

var Vc = /[#\/\?@]/g,
    Xc$1 = /[#\?:]/g,
    Wc$1 = /[#\?]/g,
    $c = /[#\?@]/g,
    Yc$1 = /#/g;

function Rc(a, b) {
  this.h = this.g = null;
  this.i = a || null;
  this.j = !!b;
}

function V(a) {
  a.g || (a.g = new S$1(), a.h = 0, a.i && Nc$1(a.i, function (b, c) {
    a.add(decodeURIComponent(b.replace(/\+/g, " ")), c);
  }));
}

k = Rc.prototype;

k.add = function (a, b) {
  V(this);
  this.i = null;
  a = W$1(this, a);
  var c = this.g.get(a);
  c || this.g.set(a, c = []);
  c.push(b);
  this.h += 1;
  return this;
};

function dd(a, b) {
  V(a);
  b = W$1(a, b);
  T(a.g.h, b) && (a.i = null, a.h -= a.g.get(b).length, a = a.g, T(a.h, b) && (delete a.h[b], a.i--, a.g.length > 2 * a.i && Lc$1(a)));
}

function ed(a, b) {
  V(a);
  b = W$1(a, b);
  return T(a.g.h, b);
}

k.forEach = function (a, b) {
  V(this);
  this.g.forEach(function (c, d) {
    na$1(c, function (e) {
      a.call(b, e, d, this);
    }, this);
  }, this);
};

k.T = function () {
  V(this);

  for (var a = this.g.R(), b = this.g.T(), c = [], d = 0; d < b.length; d++) {
    for (var e = a[d], f = 0; f < e.length; f++) {
      c.push(b[d]);
    }
  }

  return c;
};

k.R = function (a) {
  V(this);
  var b = [];
  if ("string" === typeof a) ed(this, a) && (b = qa(b, this.g.get(W$1(this, a))));else {
    a = this.g.R();

    for (var c = 0; c < a.length; c++) {
      b = qa(b, a[c]);
    }
  }
  return b;
};

k.set = function (a, b) {
  V(this);
  this.i = null;
  a = W$1(this, a);
  ed(this, a) && (this.h -= this.g.get(a).length);
  this.g.set(a, [b]);
  this.h += 1;
  return this;
};

k.get = function (a, b) {
  if (!a) return b;
  a = this.R(a);
  return 0 < a.length ? String(a[0]) : b;
};

function mc$1(a, b, c) {
  dd(a, b);
  0 < c.length && (a.i = null, a.g.set(W$1(a, b), ra(c)), a.h += c.length);
}

k.toString = function () {
  if (this.i) return this.i;
  if (!this.g) return "";

  for (var a = [], b = this.g.T(), c = 0; c < b.length; c++) {
    var d = b[c],
        e = encodeURIComponent(String(d));
    d = this.R(d);

    for (var f = 0; f < d.length; f++) {
      var h = e;
      "" !== d[f] && (h += "=" + encodeURIComponent(String(d[f])));
      a.push(h);
    }
  }

  return this.i = a.join("&");
};

function W$1(a, b) {
  b = String(b);
  a.j && (b = b.toLowerCase());
  return b;
}

function Zc(a, b) {
  b && !a.j && (V(a), a.i = null, a.g.forEach(function (c, d) {
    var e = d.toLowerCase();
    d != e && (dd(this, d), mc$1(this, e, c));
  }, a));
  a.j = b;
}

var fd = function fd(a, b) {
  _classCallCheck(this, fd);

  this.h = a;
  this.g = b;
};

function gd(a) {
  this.l = a || hd;
  l.PerformanceNavigationTiming ? (a = l.performance.getEntriesByType("navigation"), a = 0 < a.length && ("hq" == a[0].nextHopProtocol || "h2" == a[0].nextHopProtocol)) : a = !!(l.g && l.g.Ea && l.g.Ea() && l.g.Ea().Zb);
  this.j = a ? this.l : 1;
  this.g = null;
  1 < this.j && (this.g = new Set());
  this.h = null;
  this.i = [];
}

var hd = 10;

function id(a) {
  return a.h ? !0 : a.g ? a.g.size >= a.j : !1;
}

function Cc$1(a) {
  return a.h ? 1 : a.g ? a.g.size : 0;
}

function yc$1(a, b) {
  return a.h ? a.h == b : a.g ? a.g.has(b) : !1;
}

function Dc(a, b) {
  a.g ? a.g.add(b) : a.h = b;
}

function Fc$1(a, b) {
  a.h && a.h == b ? a.h = null : a.g && a.g.has(b) && a.g["delete"](b);
}

gd.prototype.cancel = function () {
  this.i = jd(this);
  if (this.h) this.h.cancel(), this.h = null;else if (this.g && 0 !== this.g.size) {
    var _iterator = _createForOfIteratorHelper$1(this.g.values()),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var a = _step.value;
        a.cancel();
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    this.g.clear();
  }
};

function jd(a) {
  if (null != a.h) return a.i.concat(a.h.D);

  if (null != a.g && 0 !== a.g.size) {
    var b = a.i;

    var _iterator2 = _createForOfIteratorHelper$1(a.g.values()),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var c = _step2.value;
        b = b.concat(c.D);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return b;
  }

  return ra(a.i);
}

function kd() {}

kd.prototype.stringify = function (a) {
  return l.JSON.stringify(a, void 0);
};

kd.prototype.parse = function (a) {
  return l.JSON.parse(a, void 0);
};

function ld() {
  this.g = new kd();
}

function md(a, b, c) {
  var d = c || "";

  try {
    Kc$1(a, function (e, f) {
      var h = e;
      p(e) && (h = rb(e));
      b.push(d + f + "=" + encodeURIComponent(h));
    });
  } catch (e) {
    throw b.push(d + "type=" + encodeURIComponent("_badmap")), e;
  }
}

function nd(a, b) {
  var c = new Mb();

  if (l.Image) {
    var d = new Image();
    d.onload = ja(od, c, d, "TestLoadImage: loaded", !0, b);
    d.onerror = ja(od, c, d, "TestLoadImage: error", !1, b);
    d.onabort = ja(od, c, d, "TestLoadImage: abort", !1, b);
    d.ontimeout = ja(od, c, d, "TestLoadImage: timeout", !1, b);
    l.setTimeout(function () {
      if (d.ontimeout) d.ontimeout();
    }, 1E4);
    d.src = a;
  } else b(!1);
}

function od(a, b, c, d, e) {
  try {
    b.onload = null, b.onerror = null, b.onabort = null, b.ontimeout = null, e(d);
  } catch (f) {}
}

function pd(a) {
  this.l = a.$b || null;
  this.j = a.ib || !1;
}

t(pd, Yb);

pd.prototype.g = function () {
  return new qd(this.l, this.j);
};

pd.prototype.i = function (a) {
  return function () {
    return a;
  };
}({});

function qd(a, b) {
  C$1.call(this);
  this.D = a;
  this.u = b;
  this.m = void 0;
  this.readyState = rd;
  this.status = 0;
  this.responseType = this.responseText = this.response = this.statusText = "";
  this.onreadystatechange = null;
  this.v = new Headers();
  this.h = null;
  this.C = "GET";
  this.B = "";
  this.g = !1;
  this.A = this.j = this.l = null;
}

t(qd, C$1);
var rd = 0;
k = qd.prototype;

k.open = function (a, b) {
  if (this.readyState != rd) throw this.abort(), Error("Error reopening a connection");
  this.C = a;
  this.B = b;
  this.readyState = 1;
  sd(this);
};

k.send = function (a) {
  if (1 != this.readyState) throw this.abort(), Error("need to call open() first. ");
  this.g = !0;
  var b = {
    headers: this.v,
    method: this.C,
    credentials: this.m,
    cache: void 0
  };
  a && (b.body = a);
  (this.D || l).fetch(new Request(this.B, b)).then(this.Va.bind(this), this.ha.bind(this));
};

k.abort = function () {
  this.response = this.responseText = "";
  this.v = new Headers();
  this.status = 0;
  this.j && this.j.cancel("Request was aborted.");
  1 <= this.readyState && this.g && 4 != this.readyState && (this.g = !1, td(this));
  this.readyState = rd;
};

k.Va = function (a) {
  if (this.g && (this.l = a, this.h || (this.status = this.l.status, this.statusText = this.l.statusText, this.h = a.headers, this.readyState = 2, sd(this)), this.g && (this.readyState = 3, sd(this), this.g))) if ("arraybuffer" === this.responseType) a.arrayBuffer().then(this.Ta.bind(this), this.ha.bind(this));else if ("undefined" !== typeof l.ReadableStream && "body" in a) {
    this.j = a.body.getReader();

    if (this.u) {
      if (this.responseType) throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');
      this.response = [];
    } else this.response = this.responseText = "", this.A = new TextDecoder();

    ud(this);
  } else a.text().then(this.Ua.bind(this), this.ha.bind(this));
};

function ud(a) {
  a.j.read().then(a.Sa.bind(a))["catch"](a.ha.bind(a));
}

k.Sa = function (a) {
  if (this.g) {
    if (this.u && a.value) this.response.push(a.value);else if (!this.u) {
      var b = a.value ? a.value : new Uint8Array(0);
      if (b = this.A.decode(b, {
        stream: !a.done
      })) this.response = this.responseText += b;
    }
    a.done ? td(this) : sd(this);
    3 == this.readyState && ud(this);
  }
};

k.Ua = function (a) {
  this.g && (this.response = this.responseText = a, td(this));
};

k.Ta = function (a) {
  this.g && (this.response = a, td(this));
};

k.ha = function () {
  this.g && td(this);
};

function td(a) {
  a.readyState = 4;
  a.l = null;
  a.j = null;
  a.A = null;
  sd(a);
}

k.setRequestHeader = function (a, b) {
  this.v.append(a, b);
};

k.getResponseHeader = function (a) {
  return this.h ? this.h.get(a.toLowerCase()) || "" : "";
};

k.getAllResponseHeaders = function () {
  if (!this.h) return "";
  var a = [],
      b = this.h.entries();

  for (var c = b.next(); !c.done;) {
    c = c.value, a.push(c[0] + ": " + c[1]), c = b.next();
  }

  return a.join("\r\n");
};

function sd(a) {
  a.onreadystatechange && a.onreadystatechange.call(a);
}

Object.defineProperty(qd.prototype, "withCredentials", {
  get: function get() {
    return "include" === this.m;
  },
  set: function set(a) {
    this.m = a ? "include" : "same-origin";
  }
});
var vd = l.JSON.parse;

function X$1(a) {
  C$1.call(this);
  this.headers = new S$1();
  this.u = a || null;
  this.h = !1;
  this.C = this.g = null;
  this.H = "";
  this.m = 0;
  this.j = "";
  this.l = this.F = this.v = this.D = !1;
  this.B = 0;
  this.A = null;
  this.J = wd;
  this.K = this.L = !1;
}

t(X$1, C$1);
var wd = "",
    xd = /^https?$/i,
    yd = ["POST", "PUT"];
k = X$1.prototype;

k.ea = function (a, b, c, d) {
  if (this.g) throw Error("[goog.net.XhrIo] Object is active with another request=" + this.H + "; newUri=" + a);
  b = b ? b.toUpperCase() : "GET";
  this.H = a;
  this.j = "";
  this.m = 0;
  this.D = !1;
  this.h = !0;
  this.g = this.u ? this.u.g() : cc$1.g();
  this.C = this.u ? Zb(this.u) : Zb(cc$1);
  this.g.onreadystatechange = q$1(this.Fa, this);

  try {
    this.F = !0, this.g.open(b, String(a), !0), this.F = !1;
  } catch (f) {
    zd(this, f);
    return;
  }

  a = c || "";
  var e = new S$1(this.headers);
  d && Kc$1(d, function (f, h) {
    e.set(h, f);
  });
  d = oa(e.T());
  c = l.FormData && a instanceof l.FormData;
  !(0 <= ma$1(yd, b)) || d || c || e.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  e.forEach(function (f, h) {
    this.g.setRequestHeader(h, f);
  }, this);
  this.J && (this.g.responseType = this.J);
  "withCredentials" in this.g && this.g.withCredentials !== this.L && (this.g.withCredentials = this.L);

  try {
    Ad(this), 0 < this.B && ((this.K = Bd(this.g)) ? (this.g.timeout = this.B, this.g.ontimeout = q$1(this.pa, this)) : this.A = Gb(this.pa, this.B, this)), this.v = !0, this.g.send(a), this.v = !1;
  } catch (f) {
    zd(this, f);
  }
};

function Bd(a) {
  return y && Ra$1() && "number" === typeof a.timeout && void 0 !== a.ontimeout;
}

function pa$1(a) {
  return "content-type" == a.toLowerCase();
}

k.pa = function () {
  "undefined" != typeof goog && this.g && (this.j = "Timed out after " + this.B + "ms, aborting", this.m = 8, D$1(this, "timeout"), this.abort(8));
};

function zd(a, b) {
  a.h = !1;
  a.g && (a.l = !0, a.g.abort(), a.l = !1);
  a.j = b;
  a.m = 5;
  Cd(a);
  Dd(a);
}

function Cd(a) {
  a.D || (a.D = !0, D$1(a, "complete"), D$1(a, "error"));
}

k.abort = function (a) {
  this.g && this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1, this.m = a || 7, D$1(this, "complete"), D$1(this, "abort"), Dd(this));
};

k.M = function () {
  this.g && (this.h && (this.h = !1, this.l = !0, this.g.abort(), this.l = !1), Dd(this, !0));
  X$1.Z.M.call(this);
};

k.Fa = function () {
  this.s || (this.F || this.v || this.l ? Ed(this) : this.cb());
};

k.cb = function () {
  Ed(this);
};

function Ed(a) {
  if (a.h && "undefined" != typeof goog && (!a.C[1] || 4 != O$1(a) || 2 != a.ba())) if (a.v && 4 == O$1(a)) Gb(a.Fa, 0, a);else if (D$1(a, "readystatechange"), 4 == O$1(a)) {
    a.h = !1;

    try {
      var n = a.ba();

      a: switch (n) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
          var b = !0;
          break a;

        default:
          b = !1;
      }

      var c;

      if (!(c = b)) {
        var d;

        if (d = 0 === n) {
          var e = String(a.H).match(Mc)[1] || null;

          if (!e && l.self && l.self.location) {
            var f = l.self.location.protocol;
            e = f.substr(0, f.length - 1);
          }

          d = !xd.test(e ? e.toLowerCase() : "");
        }

        c = d;
      }

      if (c) D$1(a, "complete"), D$1(a, "success");else {
        a.m = 6;

        try {
          var h = 2 < O$1(a) ? a.g.statusText : "";
        } catch (u) {
          h = "";
        }

        a.j = h + " [" + a.ba() + "]";
        Cd(a);
      }
    } finally {
      Dd(a);
    }
  }
}

function Dd(a, b) {
  if (a.g) {
    Ad(a);
    var c = a.g,
        d = a.C[0] ? aa : null;
    a.g = null;
    a.C = null;
    b || D$1(a, "ready");

    try {
      c.onreadystatechange = d;
    } catch (e) {}
  }
}

function Ad(a) {
  a.g && a.K && (a.g.ontimeout = null);
  a.A && (l.clearTimeout(a.A), a.A = null);
}

function O$1(a) {
  return a.g ? a.g.readyState : 0;
}

k.ba = function () {
  try {
    return 2 < O$1(this) ? this.g.status : -1;
  } catch (a) {
    return -1;
  }
};

k.ga = function () {
  try {
    return this.g ? this.g.responseText : "";
  } catch (a) {
    return "";
  }
};

k.Qa = function (a) {
  if (this.g) {
    var b = this.g.responseText;
    a && 0 == b.indexOf(a) && (b = b.substring(a.length));
    return vd(b);
  }
};

function oc$1(a) {
  try {
    if (!a.g) return null;
    if ("response" in a.g) return a.g.response;

    switch (a.J) {
      case wd:
      case "text":
        return a.g.responseText;

      case "arraybuffer":
        if ("mozResponseArrayBuffer" in a.g) return a.g.mozResponseArrayBuffer;
    }

    return null;
  } catch (b) {
    return null;
  }
}

k.Da = function () {
  return this.m;
};

k.La = function () {
  return "string" === typeof this.j ? this.j : String(this.j);
};

function Fd(a) {
  var b = "";
  xa(a, function (c, d) {
    b += d;
    b += ":";
    b += c;
    b += "\r\n";
  });
  return b;
}

function Gd(a, b, c) {
  a: {
    for (d in c) {
      var d = !1;
      break a;
    }

    d = !0;
  }

  d || (c = Fd(c), "string" === typeof a ? null != c && encodeURIComponent(String(c)) : R(a, b, c));
}

function Hd(a, b, c) {
  return c && c.internalChannelParams ? c.internalChannelParams[a] || b : b;
}

function Id(a) {
  this.za = 0;
  this.l = [];
  this.h = new Mb();
  this.la = this.oa = this.F = this.W = this.g = this.sa = this.D = this.aa = this.o = this.P = this.s = null;
  this.Za = this.V = 0;
  this.Xa = Hd("failFast", !1, a);
  this.N = this.v = this.u = this.m = this.j = null;
  this.X = !0;
  this.I = this.ta = this.U = -1;
  this.Y = this.A = this.C = 0;
  this.Pa = Hd("baseRetryDelayMs", 5E3, a);
  this.$a = Hd("retryDelaySeedMs", 1E4, a);
  this.Ya = Hd("forwardChannelMaxRetries", 2, a);
  this.ra = Hd("forwardChannelRequestTimeoutMs", 2E4, a);
  this.qa = a && a.xmlHttpFactory || void 0;
  this.Ba = a && a.Yb || !1;
  this.K = void 0;
  this.H = a && a.supportsCrossDomainXhr || !1;
  this.J = "";
  this.i = new gd(a && a.concurrentRequestLimit);
  this.Ca = new ld();
  this.ja = a && a.fastHandshake || !1;
  this.Ra = a && a.Wb || !1;
  a && a.Aa && this.h.Aa();
  a && a.forceLongPolling && (this.X = !1);
  this.$ = !this.ja && this.X && a && a.detectBufferingProxy || !1;
  this.ka = void 0;
  this.O = 0;
  this.L = !1;
  this.B = null;
  this.Wa = !a || !1 !== a.Xb;
}

k = Id.prototype;
k.ma = 8;
k.G = 1;

function Ic(a) {
  Jd(a);

  if (3 == a.G) {
    var b = a.V++,
        c = N$1(a.F);
    R(c, "SID", a.J);
    R(c, "RID", b);
    R(c, "TYPE", "terminate");
    Kd(a, c);
    b = new M$1(a, a.h, b, void 0);
    b.K = 2;
    b.v = jc$1(N$1(c));
    c = !1;
    l.navigator && l.navigator.sendBeacon && (c = l.navigator.sendBeacon(b.v.toString(), ""));
    !c && l.Image && (new Image().src = b.v, c = !0);
    c || (b.g = nc$1(b.l, null), b.g.ea(b.v));
    b.F = Date.now();
    lc(b);
  }

  Ld(a);
}

k.hb = function (a) {
  try {
    this.h.info("Origin Trials invoked: " + a);
  } catch (b) {}
};

function Ac(a) {
  a.g && (wc$1(a), a.g.cancel(), a.g = null);
}

function Jd(a) {
  Ac(a);
  a.u && (l.clearTimeout(a.u), a.u = null);
  zc(a);
  a.i.cancel();
  a.m && ("number" === typeof a.m && l.clearTimeout(a.m), a.m = null);
}

function Md(a, b) {
  a.l.push(new fd(a.Za++, b));
  3 == a.G && Hc(a);
}

function Hc(a) {
  id(a.i) || a.m || (a.m = !0, zb(a.Ha, a), a.C = 0);
}

function Nd(a, b) {
  if (Cc$1(a.i) >= a.i.j - (a.m ? 1 : 0)) return !1;
  if (a.m) return a.l = b.D.concat(a.l), !0;
  if (1 == a.G || 2 == a.G || a.C >= (a.Xa ? 0 : a.Ya)) return !1;
  a.m = K$1(q$1(a.Ha, a, b), Od(a, a.C));
  a.C++;
  return !0;
}

k.Ha = function (a) {
  if (this.m) if (this.m = null, 1 == this.G) {
    if (!a) {
      this.V = Math.floor(1E5 * Math.random());
      a = this.V++;
      var e = new M$1(this, this.h, a, void 0);
      var f = this.s;
      this.P && (f ? (f = ya(f), Aa$1(f, this.P)) : f = this.P);
      null === this.o && (e.H = f);
      if (this.ja) a: {
        var b = 0;

        for (var c = 0; c < this.l.length; c++) {
          b: {
            var d = this.l[c];

            if ("__data__" in d.g && (d = d.g.__data__, "string" === typeof d)) {
              d = d.length;
              break b;
            }

            d = void 0;
          }

          if (void 0 === d) break;
          b += d;

          if (4096 < b) {
            b = c;
            break a;
          }

          if (4096 === b || c === this.l.length - 1) {
            b = c + 1;
            break a;
          }
        }

        b = 1E3;
      } else b = 1E3;
      b = Pd(this, e, b);
      c = N$1(this.F);
      R(c, "RID", a);
      R(c, "CVER", 22);
      this.D && R(c, "X-HTTP-Session-Id", this.D);
      Kd(this, c);
      this.o && f && Gd(c, this.o, f);
      Dc(this.i, e);
      this.Ra && R(c, "TYPE", "init");
      this.ja ? (R(c, "$req", b), R(c, "SID", "null"), e.$ = !0, ic$1(e, c, null)) : ic$1(e, c, b);
      this.G = 2;
    }
  } else 3 == this.G && (a ? Qd(this, a) : 0 == this.l.length || id(this.i) || Qd(this));
};

function Qd(a, b) {
  var c;
  b ? c = b.m : c = a.V++;
  var d = N$1(a.F);
  R(d, "SID", a.J);
  R(d, "RID", c);
  R(d, "AID", a.U);
  Kd(a, d);
  a.o && a.s && Gd(d, a.o, a.s);
  c = new M$1(a, a.h, c, a.C + 1);
  null === a.o && (c.H = a.s);
  b && (a.l = b.D.concat(a.l));
  b = Pd(a, c, 1E3);
  c.setTimeout(Math.round(.5 * a.ra) + Math.round(.5 * a.ra * Math.random()));
  Dc(a.i, c);
  ic$1(c, d, b);
}

function Kd(a, b) {
  a.j && Kc$1({}, function (c, d) {
    R(b, d, c);
  });
}

function Pd(a, b, c) {
  c = Math.min(a.l.length, c);
  var d = a.j ? q$1(a.j.Oa, a.j, a) : null;

  a: {
    var e = a.l;
    var f = -1;

    for (;;) {
      var h = ["count=" + c];
      -1 == f ? 0 < c ? (f = e[0].h, h.push("ofs=" + f)) : f = 0 : h.push("ofs=" + f);
      var n = !0;

      for (var u = 0; u < c; u++) {
        var m = e[u].h;
        var r = e[u].g;
        m -= f;
        if (0 > m) f = Math.max(0, e[u].h - 100), n = !1;else try {
          md(r, h, "req" + m + "_");
        } catch (G) {
          d && d(r);
        }
      }

      if (n) {
        d = h.join("&");
        break a;
      }
    }
  }

  a = a.l.splice(0, c);
  b.D = a;
  return d;
}

function Gc$1(a) {
  a.g || a.u || (a.Y = 1, zb(a.Ga, a), a.A = 0);
}

function Bc(a) {
  if (a.g || a.u || 3 <= a.A) return !1;
  a.Y++;
  a.u = K$1(q$1(a.Ga, a), Od(a, a.A));
  a.A++;
  return !0;
}

k.Ga = function () {
  this.u = null;
  Rd(this);

  if (this.$ && !(this.L || null == this.g || 0 >= this.O)) {
    var a = 2 * this.O;
    this.h.info("BP detection timer enabled: " + a);
    this.B = K$1(q$1(this.bb, this), a);
  }
};

k.bb = function () {
  this.B && (this.B = null, this.h.info("BP detection timeout reached."), this.h.info("Buffering proxy detected and switch to long-polling!"), this.N = !1, this.L = !0, J$1(10), Ac(this), Rd(this));
};

function wc$1(a) {
  null != a.B && (l.clearTimeout(a.B), a.B = null);
}

function Rd(a) {
  a.g = new M$1(a, a.h, "rpc", a.Y);
  null === a.o && (a.g.H = a.s);
  a.g.O = 0;
  var b = N$1(a.oa);
  R(b, "RID", "rpc");
  R(b, "SID", a.J);
  R(b, "CI", a.N ? "0" : "1");
  R(b, "AID", a.U);
  Kd(a, b);
  R(b, "TYPE", "xmlhttp");
  a.o && a.s && Gd(b, a.o, a.s);
  a.K && a.g.setTimeout(a.K);
  var c = a.g;
  a = a.la;
  c.K = 1;
  c.v = jc$1(N$1(b));
  c.s = null;
  c.U = !0;
  kc$1(c, a);
}

k.ab = function () {
  null != this.v && (this.v = null, Ac(this), Bc(this), J$1(19));
};

function zc(a) {
  null != a.v && (l.clearTimeout(a.v), a.v = null);
}

function uc$1(a, b) {
  var c = null;

  if (a.g == b) {
    zc(a);
    wc$1(a);
    a.g = null;
    var d = 2;
  } else if (yc$1(a.i, b)) c = b.D, Fc$1(a.i, b), d = 1;else return;

  a.I = b.N;
  if (0 != a.G) if (b.i) {
    if (1 == d) {
      c = b.s ? b.s.length : 0;
      b = Date.now() - b.F;
      var e = a.C;
      d = Sb();
      D$1(d, new Vb(d, c, b, e));
      Hc(a);
    } else Gc$1(a);
  } else if (e = b.o, 3 == e || 0 == e && 0 < a.I || !(1 == d && Nd(a, b) || 2 == d && Bc(a))) switch (c && 0 < c.length && (b = a.i, b.i = b.i.concat(c)), e) {
    case 1:
      Q$1(a, 5);
      break;

    case 4:
      Q$1(a, 10);
      break;

    case 3:
      Q$1(a, 6);
      break;

    default:
      Q$1(a, 2);
  }
}

function Od(a, b) {
  var c = a.Pa + Math.floor(Math.random() * a.$a);
  a.j || (c *= 2);
  return c * b;
}

function Q$1(a, b) {
  a.h.info("Error code " + b);

  if (2 == b) {
    var c = null;
    a.j && (c = null);
    var d = q$1(a.jb, a);
    c || (c = new U("//www.google.com/images/cleardot.gif"), l.location && "http" == l.location.protocol || Oc(c, "https"), jc$1(c));
    nd(c.toString(), d);
  } else J$1(2);

  a.G = 0;
  a.j && a.j.va(b);
  Ld(a);
  Jd(a);
}

k.jb = function (a) {
  a ? (this.h.info("Successfully pinged google.com"), J$1(2)) : (this.h.info("Failed to ping google.com"), J$1(1));
};

function Ld(a) {
  a.G = 0;
  a.I = -1;

  if (a.j) {
    if (0 != jd(a.i).length || 0 != a.l.length) a.i.i.length = 0, ra(a.l), a.l.length = 0;
    a.j.ua();
  }
}

function Ec$1(a, b, c) {
  var d = ad(c);
  if ("" != d.i) b && Pc(d, b + "." + d.i), Qc$1(d, d.m);else {
    var e = l.location;
    d = bd(e.protocol, b ? b + "." + e.hostname : e.hostname, +e.port, c);
  }
  a.aa && xa(a.aa, function (e, f) {
    R(d, f, e);
  });
  b = a.D;
  c = a.sa;
  b && c && R(d, b, c);
  R(d, "VER", a.ma);
  Kd(a, d);
  return d;
}

function nc$1(a, b, c) {
  if (b && !a.H) throw Error("Can't create secondary domain capable XhrIo object.");
  b = c && a.Ba && !a.qa ? new X$1(new pd({
    ib: !0
  })) : new X$1(a.qa);
  b.L = a.H;
  return b;
}

function Sd() {}

k = Sd.prototype;

k.xa = function () {};

k.wa = function () {};

k.va = function () {};

k.ua = function () {};

k.Oa = function () {};

function Td() {
  if (y && !(10 <= Number(Ua))) throw Error("Environmental error: no available transport.");
}

Td.prototype.g = function (a, b) {
  return new Y$1(a, b);
};

function Y$1(a, b) {
  C$1.call(this);
  this.g = new Id(b);
  this.l = a;
  this.h = b && b.messageUrlParams || null;
  a = b && b.messageHeaders || null;
  b && b.clientProtocolHeaderRequired && (a ? a["X-Client-Protocol"] = "webchannel" : a = {
    "X-Client-Protocol": "webchannel"
  });
  this.g.s = a;
  a = b && b.initMessageHeaders || null;
  b && b.messageContentType && (a ? a["X-WebChannel-Content-Type"] = b.messageContentType : a = {
    "X-WebChannel-Content-Type": b.messageContentType
  });
  b && b.ya && (a ? a["X-WebChannel-Client-Profile"] = b.ya : a = {
    "X-WebChannel-Client-Profile": b.ya
  });
  this.g.P = a;
  (a = b && b.httpHeadersOverwriteParam) && !sa(a) && (this.g.o = a);
  this.A = b && b.supportsCrossDomainXhr || !1;
  this.v = b && b.sendRawJson || !1;
  (b = b && b.httpSessionIdParam) && !sa(b) && (this.g.D = b, a = this.h, null !== a && b in a && (a = this.h, b in a && delete a[b]));
  this.j = new Z$1(this);
}

t(Y$1, C$1);

Y$1.prototype.m = function () {
  this.g.j = this.j;
  this.A && (this.g.H = !0);
  var a = this.g,
      b = this.l,
      c = this.h || void 0;
  a.Wa && (a.h.info("Origin Trials enabled."), zb(q$1(a.hb, a, b)));
  J$1(0);
  a.W = b;
  a.aa = c || {};
  a.N = a.X;
  a.F = Ec$1(a, null, a.W);
  Hc(a);
};

Y$1.prototype.close = function () {
  Ic(this.g);
};

Y$1.prototype.u = function (a) {
  if ("string" === typeof a) {
    var b = {};
    b.__data__ = a;
    Md(this.g, b);
  } else this.v ? (b = {}, b.__data__ = rb(a), Md(this.g, b)) : Md(this.g, a);
};

Y$1.prototype.M = function () {
  this.g.j = null;
  delete this.j;
  Ic(this.g);
  delete this.g;
  Y$1.Z.M.call(this);
};

function Ud(a) {
  ac$1.call(this);
  var b = a.__sm__;

  if (b) {
    a: {
      for (var c in b) {
        a = c;
        break a;
      }

      a = void 0;
    }

    if (this.i = a) a = this.i, b = null !== b && a in b ? b[a] : void 0;
    this.data = b;
  } else this.data = a;
}

t(Ud, ac$1);

function Vd() {
  bc.call(this);
  this.status = 1;
}

t(Vd, bc);

function Z$1(a) {
  this.g = a;
}

t(Z$1, Sd);

Z$1.prototype.xa = function () {
  D$1(this.g, "a");
};

Z$1.prototype.wa = function (a) {
  D$1(this.g, new Ud(a));
};

Z$1.prototype.va = function (a) {
  D$1(this.g, new Vd(a));
};

Z$1.prototype.ua = function () {
  D$1(this.g, "b");
};
/*
Copyright 2017 Google LLC
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at
http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/


Td.prototype.createWebChannel = Td.prototype.g;
Y$1.prototype.send = Y$1.prototype.u;
Y$1.prototype.open = Y$1.prototype.m;
Y$1.prototype.close = Y$1.prototype.close;
Wb.NO_ERROR = 0;
Wb.TIMEOUT = 8;
Wb.HTTP_ERROR = 6;
Xb.COMPLETE = "complete";
$b.EventType = L$1;
L$1.OPEN = "a";
L$1.CLOSE = "b";
L$1.ERROR = "c";
L$1.MESSAGE = "d";
C$1.prototype.listen = C$1.prototype.N;
X$1.prototype.listenOnce = X$1.prototype.O;
X$1.prototype.getLastError = X$1.prototype.La;
X$1.prototype.getLastErrorCode = X$1.prototype.Da;
X$1.prototype.getStatus = X$1.prototype.ba;
X$1.prototype.getResponseJson = X$1.prototype.Qa;
X$1.prototype.getResponseText = X$1.prototype.ga;
X$1.prototype.send = X$1.prototype.ea;

var createWebChannelTransport = function () {
  return new Td();
};

var getStatEventTarget = function () {
  return Sb();
};

var ErrorCode = Wb;
var EventType = Xb;
var Event = H$1;
var Stat = {
  rb: 0,
  ub: 1,
  vb: 2,
  Ob: 3,
  Tb: 4,
  Qb: 5,
  Rb: 6,
  Pb: 7,
  Nb: 8,
  Sb: 9,
  PROXY: 10,
  NOPROXY: 11,
  Lb: 12,
  Hb: 13,
  Ib: 14,
  Gb: 15,
  Jb: 16,
  Kb: 17,
  nb: 18,
  mb: 19,
  ob: 20
};
var FetchXmlHttpFactory = pd;
var WebChannel = $b;
var XhrIo = X$1;

function _createForOfIteratorHelper(o,allowArrayLike){var it=typeof Symbol!=="undefined"&&o[Symbol.iterator]||o["@@iterator"];if(!it){if(Array.isArray(o)||(it=_unsupportedIterableToArray(o))||allowArrayLike&&o&&typeof o.length==="number"){if(it)o=it;var i=0;var F=function F(){};return {s:F,n:function n(){if(i>=o.length)return {done:true};return {done:false,value:o[i++]};},e:function e(_e56){throw _e56;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var normalCompletion=true,didErr=false,err;return {s:function s(){it=it.call(o);},n:function n(){var step=it.next();normalCompletion=step.done;return step;},e:function e(_e57){didErr=true;err=_e57;},f:function f(){try{if(!normalCompletion&&it["return"]!=null)it["return"]();}finally{if(didErr)throw err;}}};}function _unsupportedIterableToArray(o,minLen){if(!o)return;if(typeof o==="string")return _arrayLikeToArray(o,minLen);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(o);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return _arrayLikeToArray(o,minLen);}function _arrayLikeToArray(arr,len){if(len==null||len>arr.length)len=arr.length;for(var i=0,arr2=new Array(len);i<len;i++){arr2[i]=arr[i];}return arr2;}function _createSuper$1(Derived){var hasNativeReflectConstruct=_isNativeReflectConstruct$1();return function _createSuperInternal(){var Super=_getPrototypeOf(Derived),result;if(hasNativeReflectConstruct){var NewTarget=_getPrototypeOf(this).constructor;result=Reflect.construct(Super,arguments,NewTarget);}else {result=Super.apply(this,arguments);}return _possibleConstructorReturn(this,result);};}function _isNativeReflectConstruct$1(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}));return true;}catch(e){return false;}}var S="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Simple wrapper around a nullable UID. Mostly exists to make code more
 * readable.
 */var D=/*#__PURE__*/function(){function D(t){_classCallCheck(this,D);this.uid=t;}_createClass(D,[{key:"isAuthenticated",value:function isAuthenticated(){return null!=this.uid;}/**
     * Returns a key representing this user, suitable for inclusion in a
     * dictionary.
     */},{key:"toKey",value:function toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user";}},{key:"isEqual",value:function isEqual(t){return t.uid===this.uid;}}]);return D;}();/** A user with a null UID. */D.UNAUTHENTICATED=new D(null),// TODO(mikelehen): Look into getting a proper uid-equivalent for
// non-FirebaseAuth providers.
D.GOOGLE_CREDENTIALS=new D("google-credentials-uid"),D.FIRST_PARTY=new D("first-party-uid"),D.MOCK_USER=new D("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var C="9.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var N=new Logger("@firebase/firestore");// Helper methods are needed because variables can't be exported as read/write
function x(){return N.logLevel;}function $(t){if(N.logLevel<=LogLevel.DEBUG){for(var _len=arguments.length,e=new Array(_len>1?_len-1:0),_key=1;_key<_len;_key++){e[_key-1]=arguments[_key];}var n=e.map(M);N.debug.apply(N,["Firestore (".concat(C,"): ").concat(t)].concat(_toConsumableArray(n)));}}function O(t){if(N.logLevel<=LogLevel.ERROR){for(var _len2=arguments.length,e=new Array(_len2>1?_len2-1:0),_key2=1;_key2<_len2;_key2++){e[_key2-1]=arguments[_key2];}var n=e.map(M);N.error.apply(N,["Firestore (".concat(C,"): ").concat(t)].concat(_toConsumableArray(n)));}}/**
 * @internal
 */function F(t){if(N.logLevel<=LogLevel.WARN){for(var _len3=arguments.length,e=new Array(_len3>1?_len3-1:0),_key3=1;_key3<_len3;_key3++){e[_key3-1]=arguments[_key3];}var n=e.map(M);N.warn.apply(N,["Firestore (".concat(C,"): ").concat(t)].concat(_toConsumableArray(n)));}}/**
 * Converts an additional log parameter to a string representation.
 */function M(t){if("string"==typeof t)return t;try{return e=t,JSON.stringify(e);}catch(e){// Converting to JSON failed, just log the object directly
return t;}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Formats an object as a JSON string, suitable for logging. */var e;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Unconditionally fails, throwing an Error with the given message.
 * Messages are stripped in production builds.
 *
 * Returns `never` and can be used in expressions:
 * @example
 * let futureVar = fail('not implemented yet');
 */function L(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"Unexpected state";// Log the failure in addition to throw an exception, just in case the
// exception is swallowed.
var e="FIRESTORE (".concat(C,") INTERNAL ASSERTION FAILED: ")+t;// NOTE: We don't use FirestoreError here because these are internal failures
// that cannot be handled by the user. (Also it would create a circular
// dependency between the error and assert modules which doesn't work.)
throw O(e),new Error(e);}/**
 * Fails if the given assertion condition is false, throwing an Error with the
 * given message if it did.
 *
 * Messages are stripped in production builds.
 */function B(t,e){t||L();}/**
 * Casts `obj` to `T`. In non-production builds, verifies that `obj` is an
 * instance of `T` before casting.
 */function q(t,// eslint-disable-next-line @typescript-eslint/no-explicit-any
e){return t;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var K={// Causes are copied from:
// https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
/** Not an error; returned on success. */OK:"ok",/** The operation was cancelled (typically by the caller). */CANCELLED:"cancelled",/** Unknown error or an error from a different error domain. */UNKNOWN:"unknown",/**
     * Client specified an invalid argument. Note that this differs from
     * FAILED_PRECONDITION. INVALID_ARGUMENT indicates arguments that are
     * problematic regardless of the state of the system (e.g., a malformed file
     * name).
     */INVALID_ARGUMENT:"invalid-argument",/**
     * Deadline expired before operation could complete. For operations that
     * change the state of the system, this error may be returned even if the
     * operation has completed successfully. For example, a successful response
     * from a server could have been delayed long enough for the deadline to
     * expire.
     */DEADLINE_EXCEEDED:"deadline-exceeded",/** Some requested entity (e.g., file or directory) was not found. */NOT_FOUND:"not-found",/**
     * Some entity that we attempted to create (e.g., file or directory) already
     * exists.
     */ALREADY_EXISTS:"already-exists",/**
     * The caller does not have permission to execute the specified operation.
     * PERMISSION_DENIED must not be used for rejections caused by exhausting
     * some resource (use RESOURCE_EXHAUSTED instead for those errors).
     * PERMISSION_DENIED must not be used if the caller can not be identified
     * (use UNAUTHENTICATED instead for those errors).
     */PERMISSION_DENIED:"permission-denied",/**
     * The request does not have valid authentication credentials for the
     * operation.
     */UNAUTHENTICATED:"unauthenticated",/**
     * Some resource has been exhausted, perhaps a per-user quota, or perhaps the
     * entire file system is out of space.
     */RESOURCE_EXHAUSTED:"resource-exhausted",/**
     * Operation was rejected because the system is not in a state required for
     * the operation's execution. For example, directory to be deleted may be
     * non-empty, an rmdir operation is applied to a non-directory, etc.
     *
     * A litmus test that may help a service implementor in deciding
     * between FAILED_PRECONDITION, ABORTED, and UNAVAILABLE:
     *  (a) Use UNAVAILABLE if the client can retry just the failing call.
     *  (b) Use ABORTED if the client should retry at a higher-level
     *      (e.g., restarting a read-modify-write sequence).
     *  (c) Use FAILED_PRECONDITION if the client should not retry until
     *      the system state has been explicitly fixed. E.g., if an "rmdir"
     *      fails because the directory is non-empty, FAILED_PRECONDITION
     *      should be returned since the client should not retry unless
     *      they have first fixed up the directory by deleting files from it.
     *  (d) Use FAILED_PRECONDITION if the client performs conditional
     *      REST Get/Update/Delete on a resource and the resource on the
     *      server does not match the condition. E.g., conflicting
     *      read-modify-write on the same resource.
     */FAILED_PRECONDITION:"failed-precondition",/**
     * The operation was aborted, typically due to a concurrency issue like
     * sequencer check failures, transaction aborts, etc.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */ABORTED:"aborted",/**
     * Operation was attempted past the valid range. E.g., seeking or reading
     * past end of file.
     *
     * Unlike INVALID_ARGUMENT, this error indicates a problem that may be fixed
     * if the system state changes. For example, a 32-bit file system will
     * generate INVALID_ARGUMENT if asked to read at an offset that is not in the
     * range [0,2^32-1], but it will generate OUT_OF_RANGE if asked to read from
     * an offset past the current file size.
     *
     * There is a fair bit of overlap between FAILED_PRECONDITION and
     * OUT_OF_RANGE. We recommend using OUT_OF_RANGE (the more specific error)
     * when it applies so that callers who are iterating through a space can
     * easily look for an OUT_OF_RANGE error to detect when they are done.
     */OUT_OF_RANGE:"out-of-range",/** Operation is not implemented or not supported/enabled in this service. */UNIMPLEMENTED:"unimplemented",/**
     * Internal errors. Means some invariants expected by underlying System has
     * been broken. If you see one of these errors, Something is very broken.
     */INTERNAL:"internal",/**
     * The service is currently unavailable. This is a most likely a transient
     * condition and may be corrected by retrying with a backoff.
     *
     * See litmus test above for deciding between FAILED_PRECONDITION, ABORTED,
     * and UNAVAILABLE.
     */UNAVAILABLE:"unavailable",/** Unrecoverable data loss or corruption. */DATA_LOSS:"data-loss"};/** An error returned by a Firestore operation. */var j=/*#__PURE__*/function(_Error){_inherits(j,_Error);var _super=_createSuper$1(j);/** @hideconstructor */function j(/**
     * The backend error code associated with this error.
     */t,/**
     * A custom error description.
     */e){var _this;_classCallCheck(this,j);_this=_super.call(this,e),_this.code=t,_this.message=e,/** The custom name for all FirestoreErrors. */_this.name="FirebaseError",// HACK: We write a toString property directly because Error is not a real
// class and so inheritance does not work correctly. We could alternatively
// do the same "back-door inheritance" trick that FirebaseError does.
_this.toString=function(){return "".concat(_this.name,": [code=").concat(_this.code,"]: ").concat(_this.message);};return _this;}return j;}(/*#__PURE__*/_wrapNativeSuper(Error));/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Q=function Q(){var _this2=this;_classCallCheck(this,Q);this.promise=new Promise(function(t,e){_this2.resolve=t,_this2.reject=e;});};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W=function W(t,e){_classCallCheck(this,W);this.user=e,this.type="OAuth",this.authHeaders={},// Set the headers using Object Literal notation to avoid minification
this.authHeaders.Authorization="Bearer ".concat(t);};/**
 * A CredentialsProvider that always yields an empty token.
 * @internal
 */var G=/*#__PURE__*/function(){function G(){_classCallCheck(this,G);}_createClass(G,[{key:"getToken",value:function getToken(){return Promise.resolve(null);}},{key:"invalidateToken",value:function invalidateToken(){}},{key:"start",value:function start(t,e){// Fire with initial user.
t.enqueueRetryable(function(){return e(D.UNAUTHENTICATED);});}},{key:"shutdown",value:function shutdown(){}}]);return G;}();var H=/*#__PURE__*/function(){function H(t){_classCallCheck(this,H);this.t=t,/** Tracks the current User. */this.currentUser=D.UNAUTHENTICATED,/**
         * Counter used to detect if the token changed while a getToken request was
         * outstanding.
         */this.i=0,this.forceRefresh=!1,this.auth=null;}_createClass(H,[{key:"start",value:function start(t,e){var _this4=this;var n=this.i;// A change listener that prevents double-firing for the same token change.
var s=function s(t){return _this4.i!==n?(n=_this4.i,e(t)):Promise.resolve();};// A promise that can be waited on to block on the next token change.
// This promise is re-created after each change.
var i=new Q();this.o=function(){_this4.i++,_this4.currentUser=_this4.u(),i.resolve(),i=new Q(),t.enqueueRetryable(function(){return s(_this4.currentUser);});};var r=function r(){var e=i;t.enqueueRetryable(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee(){return regenerator.wrap(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return e.promise;case 2:_context.next=4;return s(_this4.currentUser);case 4:case"end":return _context.stop();}}},_callee);})));},o=function o(t){$("FirebaseCredentialsProvider","Auth detected"),_this4.auth=t,_this4.auth.addAuthTokenListener(_this4.o),r();};this.t.onInit(function(t){return o(t);}),// Our users can initialize Auth right after Firestore, so we give it
// a chance to register itself with the component framework before we
// determine whether to start up in unauthenticated mode.
setTimeout(function(){if(!_this4.auth){var _t2=_this4.t.getImmediate({optional:!0});_t2?o(_t2):(// If auth is still not available, proceed with `null` user
$("FirebaseCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Q());}},0),r();}},{key:"getToken",value:function getToken(){var _this5=this;// Take note of the current value of the tokenCounter so that this method
// can fail (with an ABORTED error) if there is a token change while the
// request is outstanding.
var t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(function(e){return(// Cancel the request since the token changed while the request was
// outstanding so the response is potentially for a previous user (which
// user, we can't be sure).
_this5.i!==t?($("FirebaseCredentialsProvider","getToken aborted due to token change."),_this5.getToken()):e?(B("string"==typeof e.accessToken),new W(e.accessToken,_this5.currentUser)):null);}):Promise.resolve(null);}},{key:"invalidateToken",value:function invalidateToken(){this.forceRefresh=!0;}},{key:"shutdown",value:function shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o);}// Auth.getUid() can return null even with a user logged in. It is because
// getUid() is synchronous, but the auth code populating Uid is asynchronous.
// This method should only be called in the AuthTokenListener callback
// to guarantee to get the actual user.
},{key:"u",value:function u(){var t=this.auth&&this.auth.getUid();return B(null===t||"string"==typeof t),new D(t);}}]);return H;}();/*
 * FirstPartyToken provides a fresh token each time its value
 * is requested, because if the token is too old, requests will be rejected.
 * Technically this may no longer be necessary since the SDK should gracefully
 * recover from unauthenticated errors (see b/33147818 for context), but it's
 * safer to keep the implementation as-is.
 */var J=/*#__PURE__*/function(){function J(t,e,n){_classCallCheck(this,J);this.h=t,this.l=e,this.m=n,this.type="FirstParty",this.user=D.FIRST_PARTY;}_createClass(J,[{key:"authHeaders",get:function get(){var t={"X-Goog-AuthUser":this.l},e=this.h.auth.getAuthHeaderValueForFirstParty([]);// Use array notation to prevent minification
return e&&(t.Authorization=e),this.m&&(t["X-Goog-Iam-Authorization-Token"]=this.m),t;}}]);return J;}();/*
 * Provides user credentials required for the Firestore JavaScript SDK
 * to authenticate the user, using technique that is only available
 * to applications hosted by Google.
 */var Y=/*#__PURE__*/function(){function Y(t,e,n){_classCallCheck(this,Y);this.h=t,this.l=e,this.m=n;}_createClass(Y,[{key:"getToken",value:function getToken(){return Promise.resolve(new J(this.h,this.l,this.m));}},{key:"start",value:function start(t,e){// Fire with initial uid.
t.enqueueRetryable(function(){return e(D.FIRST_PARTY);});}},{key:"shutdown",value:function shutdown(){}},{key:"invalidateToken",value:function invalidateToken(){}}]);return Y;}();/**
 * Builds a CredentialsProvider depending on the type of
 * the credentials passed in.
 */ /**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * `ListenSequence` is a monotonic sequence. It is initialized with a minimum value to
 * exceed. All subsequent calls to next will return increasing values. If provided with a
 * `SequenceNumberSyncer`, it will additionally bump its next value when told of a new value, as
 * well as write out sequence numbers that it produces via `next()`.
 */var X=/*#__PURE__*/function(){function X(t,e){var _this6=this;_classCallCheck(this,X);this.previousValue=t,e&&(e.sequenceNumberHandler=function(t){return _this6.g(t);},this.p=function(t){return e.writeSequenceNumber(t);});}_createClass(X,[{key:"g",value:function g(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue;}},{key:"next",value:function next(){var t=++this.previousValue;return this.p&&this.p(t),t;}}]);return X;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Generates `nBytes` of random bytes.
 *
 * If `nBytes < 0` , an error will be thrown.
 */function Z(t){// Polyfills for IE and WebWorker by using `self` and `msCrypto` when `crypto` is not available.
var e=// eslint-disable-next-line @typescript-eslint/no-explicit-any
"undefined"!=typeof self&&(self.crypto||self.msCrypto),n=new Uint8Array(t);if(e&&"function"==typeof e.getRandomValues)e.getRandomValues(n);else// Falls back to Math.random
for(var _e2=0;_e2<t;_e2++){n[_e2]=Math.floor(256*Math.random());}return n;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */X.T=-1;var tt=/*#__PURE__*/function(){function tt(){_classCallCheck(this,tt);}_createClass(tt,null,[{key:"I",value:function I(){// Alphanumeric characters
var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;// The largest byte value that is a multiple of `char.length`.
var n="";for(;n.length<20;){var s=Z(40);for(var i=0;i<s.length;++i){// Only accept values that are [0, maxMultiple), this ensures they can
// be evenly mapped to indices of `chars` via a modulo operation.
n.length<20&&s[i]<e&&(n+=t.charAt(s[i]%t.length));}}return n;}}]);return tt;}();function et(t,e){return t<e?-1:t>e?1:0;}/** Helper to compare arrays using isEqual(). */function nt(t,e,n){return t.length===e.length&&t.every(function(t,s){return n(t,e[s]);});}/**
 * A `Timestamp` represents a point in time independent of any time zone or
 * calendar, represented as seconds and fractions of seconds at nanosecond
 * resolution in UTC Epoch time.
 *
 * It is encoded using the Proleptic Gregorian Calendar which extends the
 * Gregorian calendar backwards to year one. It is encoded assuming all minutes
 * are 60 seconds long, i.e. leap seconds are "smeared" so that no leap second
 * table is needed for interpretation. Range is from 0001-01-01T00:00:00Z to
 * 9999-12-31T23:59:59.999999999Z.
 *
 * For examples and further specifications, refer to the
 * {@link https://github.com/google/protobuf/blob/master/src/google/protobuf/timestamp.proto | Timestamp definition}.
 */var it=/*#__PURE__*/function(){/**
     * Creates a new timestamp.
     *
     * @param seconds - The number of seconds of UTC time since Unix epoch
     *     1970-01-01T00:00:00Z. Must be from 0001-01-01T00:00:00Z to
     *     9999-12-31T23:59:59Z inclusive.
     * @param nanoseconds - The non-negative fractions of a second at nanosecond
     *     resolution. Negative second values with fractions must still have
     *     non-negative nanoseconds values that count forward in time. Must be
     *     from 0 to 999,999,999 inclusive.
     */function it(/**
     * The number of seconds of UTC time since Unix epoch 1970-01-01T00:00:00Z.
     */t,/**
     * The fractions of a second at nanosecond resolution.*
     */e){_classCallCheck(this,it);if(this.seconds=t,this.nanoseconds=e,e<0)throw new j(K.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new j(K.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new j(K.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);// This will break in the year 10,000.
if(t>=253402300800)throw new j(K.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);}/**
     * Creates a new timestamp with the current date, with millisecond precision.
     *
     * @returns a new timestamp representing the current date.
     */_createClass(it,[{key:"toDate",value:/**
     * Converts a `Timestamp` to a JavaScript `Date` object. This conversion
     * causes a loss of precision since `Date` objects only support millisecond
     * precision.
     *
     * @returns JavaScript `Date` object representing the same point in time as
     *     this `Timestamp`, with millisecond precision.
     */function toDate(){return new Date(this.toMillis());}/**
     * Converts a `Timestamp` to a numeric timestamp (in milliseconds since
     * epoch). This operation causes a loss of precision.
     *
     * @returns The point in time corresponding to this timestamp, represented as
     *     the number of milliseconds since Unix epoch 1970-01-01T00:00:00Z.
     */},{key:"toMillis",value:function toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6;}},{key:"_compareTo",value:function _compareTo(t){return this.seconds===t.seconds?et(this.nanoseconds,t.nanoseconds):et(this.seconds,t.seconds);}/**
     * Returns true if this `Timestamp` is equal to the provided one.
     *
     * @param other - The `Timestamp` to compare against.
     * @returns true if this `Timestamp` is equal to the provided one.
     */},{key:"isEqual",value:function isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds;}/** Returns a textual representation of this `Timestamp`. */},{key:"toString",value:function toString(){return "Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")";}/** Returns a JSON-serializable representation of this `Timestamp`. */},{key:"toJSON",value:function toJSON(){return {seconds:this.seconds,nanoseconds:this.nanoseconds};}/**
     * Converts this object to a primitive string, which allows `Timestamp` objects
     * to be compared using the `>`, `<=`, `>=` and `>` operators.
     */},{key:"valueOf",value:function valueOf(){// This method returns a string of the form <seconds>.<nanoseconds> where
// <seconds> is translated to have a non-negative value and both <seconds>
// and <nanoseconds> are left-padded with zeroes to be a consistent length.
// Strings with this format then have a lexiographical ordering that matches
// the expected ordering. The <seconds> translation is done to avoid having
// a leading negative sign (i.e. a leading '-' character) in its string
// representation, which would affect its lexiographical ordering.
var t=this.seconds- -62135596800;// Note: Up to 12 decimal digits are required to represent all valid
// 'seconds' values.
return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0");}}],[{key:"now",value:function now(){return it.fromMillis(Date.now());}/**
     * Creates a new timestamp from the given date.
     *
     * @param date - The date to initialize the `Timestamp` from.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     date.
     */},{key:"fromDate",value:function fromDate(t){return it.fromMillis(t.getTime());}/**
     * Creates a new timestamp from the given number of milliseconds.
     *
     * @param milliseconds - Number of milliseconds since Unix epoch
     *     1970-01-01T00:00:00Z.
     * @returns A new `Timestamp` representing the same point in time as the given
     *     number of milliseconds.
     */},{key:"fromMillis",value:function fromMillis(t){var e=Math.floor(t/1e3),n=Math.floor(1e6*(t-1e3*e));return new it(e,n);}}]);return it;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A version of a document in Firestore. This corresponds to the version
 * timestamp, such as update_time or read_time.
 */var rt=/*#__PURE__*/function(){function rt(t){_classCallCheck(this,rt);this.timestamp=t;}_createClass(rt,[{key:"compareTo",value:function compareTo(t){return this.timestamp._compareTo(t.timestamp);}},{key:"isEqual",value:function isEqual(t){return this.timestamp.isEqual(t.timestamp);}/** Returns a number representation of the version for use in spec tests. */},{key:"toMicroseconds",value:function toMicroseconds(){// Convert to microseconds.
return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3;}},{key:"toString",value:function toString(){return "SnapshotVersion("+this.timestamp.toString()+")";}},{key:"toTimestamp",value:function toTimestamp(){return this.timestamp;}}],[{key:"fromTimestamp",value:function fromTimestamp(t){return new rt(t);}},{key:"min",value:function min(){return new rt(new it(0,0));}}]);return rt;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ot(t){var e=0;for(var n in t){Object.prototype.hasOwnProperty.call(t,n)&&e++;}return e;}function ct(t,e){for(var n in t){Object.prototype.hasOwnProperty.call(t,n)&&e(n,t[n]);}}function at(t){for(var e in t){if(Object.prototype.hasOwnProperty.call(t,e))return !1;}return !0;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Path represents an ordered sequence of string segments.
 */var ut=/*#__PURE__*/function(){function ut(t,e,n){_classCallCheck(this,ut);void 0===e?e=0:e>t.length&&L(),void 0===n?n=t.length-e:n>t.length-e&&L(),this.segments=t,this.offset=e,this.len=n;}_createClass(ut,[{key:"length",get:function get(){return this.len;}},{key:"isEqual",value:function isEqual(t){return 0===ut.comparator(this,t);}},{key:"child",value:function child(t){var e=this.segments.slice(this.offset,this.limit());return t instanceof ut?t.forEach(function(t){e.push(t);}):e.push(t),this.construct(e);}/** The index of one past the last segment of the path. */},{key:"limit",value:function limit(){return this.offset+this.length;}},{key:"popFirst",value:function popFirst(t){return t=void 0===t?1:t,this.construct(this.segments,this.offset+t,this.length-t);}},{key:"popLast",value:function popLast(){return this.construct(this.segments,this.offset,this.length-1);}},{key:"firstSegment",value:function firstSegment(){return this.segments[this.offset];}},{key:"lastSegment",value:function lastSegment(){return this.get(this.length-1);}},{key:"get",value:function get(t){return this.segments[this.offset+t];}},{key:"isEmpty",value:function isEmpty(){return 0===this.length;}},{key:"isPrefixOf",value:function isPrefixOf(t){if(t.length<this.length)return !1;for(var e=0;e<this.length;e++){if(this.get(e)!==t.get(e))return !1;}return !0;}},{key:"isImmediateParentOf",value:function isImmediateParentOf(t){if(this.length+1!==t.length)return !1;for(var e=0;e<this.length;e++){if(this.get(e)!==t.get(e))return !1;}return !0;}},{key:"forEach",value:function forEach(t){for(var e=this.offset,n=this.limit();e<n;e++){t(this.segments[e]);}}},{key:"toArray",value:function toArray(){return this.segments.slice(this.offset,this.limit());}}],[{key:"comparator",value:function comparator(t,e){var n=Math.min(t.length,e.length);for(var s=0;s<n;s++){var _n2=t.get(s),i=e.get(s);if(_n2<i)return -1;if(_n2>i)return 1;}return t.length<e.length?-1:t.length>e.length?1:0;}}]);return ut;}();/**
 * A slash-separated path for navigating resources (documents and collections)
 * within Firestore.
 *
 * @internal
 */var ht=/*#__PURE__*/function(_ut){_inherits(ht,_ut);var _super2=_createSuper$1(ht);function ht(){_classCallCheck(this,ht);return _super2.apply(this,arguments);}_createClass(ht,[{key:"construct",value:function construct(t,e,n){return new ht(t,e,n);}},{key:"canonicalString",value:function canonicalString(){// NOTE: The client is ignorant of any path segments containing escape
// sequences (e.g. __id123__) and just passes them through raw (they exist
// for legacy reasons and should not be used frequently).
return this.toArray().join("/");}},{key:"toString",value:function toString(){return this.canonicalString();}/**
     * Creates a resource path from the given slash-delimited string. If multiple
     * arguments are provided, all components are combined. Leading and trailing
     * slashes from all components are ignored.
     */}],[{key:"fromString",value:function fromString(){// NOTE: The client is ignorant of any path segments containing escape
// sequences (e.g. __id123__) and just passes them through raw (they exist
// for legacy reasons and should not be used frequently).
var e=[];for(var _len4=arguments.length,t=new Array(_len4),_key4=0;_key4<_len4;_key4++){t[_key4]=arguments[_key4];}for(var _i2=0,_t3=t;_i2<_t3.length;_i2++){var n=_t3[_i2];if(n.indexOf("//")>=0)throw new j(K.INVALID_ARGUMENT,"Invalid segment (".concat(n,"). Paths must not contain // in them."));// Strip leading and traling slashed.
e.push.apply(e,_toConsumableArray(n.split("/").filter(function(t){return t.length>0;})));}return new ht(e);}},{key:"emptyPath",value:function emptyPath(){return new ht([]);}}]);return ht;}(ut);var lt=/^[_a-zA-Z][_a-zA-Z0-9]*$/;/**
 * A dot-separated path for navigating sub-objects within a document.
 * @internal
 */var ft=/*#__PURE__*/function(_ut2){_inherits(ft,_ut2);var _super3=_createSuper$1(ft);function ft(){_classCallCheck(this,ft);return _super3.apply(this,arguments);}_createClass(ft,[{key:"construct",value:function construct(t,e,n){return new ft(t,e,n);}/**
     * Returns true if the string could be used as a segment in a field path
     * without escaping.
     */},{key:"canonicalString",value:function canonicalString(){return this.toArray().map(function(t){return t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ft.isValidIdentifier(t)||(t="`"+t+"`"),t;}).join(".");}},{key:"toString",value:function toString(){return this.canonicalString();}/**
     * Returns true if this field references the key of a document.
     */},{key:"isKeyField",value:function isKeyField(){return 1===this.length&&"__name__"===this.get(0);}/**
     * The field designating the key of a document.
     */}],[{key:"isValidIdentifier",value:function isValidIdentifier(t){return lt.test(t);}},{key:"keyField",value:function keyField(){return new ft(["__name__"]);}/**
     * Parses a field string from the given server-formatted string.
     *
     * - Splitting the empty string is not allowed (for now at least).
     * - Empty segments within the string (e.g. if there are two consecutive
     *   separators) are not allowed.
     *
     * TODO(b/37244157): we should make this more strict. Right now, it allows
     * non-identifier path components, even if they aren't escaped.
     */},{key:"fromServerFormat",value:function fromServerFormat(t){var e=[];var n="",s=0;var i=function i(){if(0===n.length)throw new j(K.INVALID_ARGUMENT,"Invalid field path (".concat(t,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"));e.push(n),n="";};var r=!1;for(;s<t.length;){var _e3=t[s];if("\\"===_e3){if(s+1===t.length)throw new j(K.INVALID_ARGUMENT,"Path has trailing escape character: "+t);var _e4=t[s+1];if("\\"!==_e4&&"."!==_e4&&"`"!==_e4)throw new j(K.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);n+=_e4,s+=2;}else "`"===_e3?(r=!r,s++):"."!==_e3||r?(n+=_e3,s++):(i(),s++);}if(i(),r)throw new j(K.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new ft(e);}},{key:"emptyPath",value:function emptyPath(){return new ft([]);}}]);return ft;}(ut);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Provides a set of fields that can be used to partially patch a document.
 * FieldMask is used in conjunction with ObjectValue.
 * Examples:
 *   foo - Overwrites foo entirely with the provided value. If foo is not
 *         present in the companion ObjectValue, the field is deleted.
 *   foo.bar - Overwrites only the field bar of the object foo.
 *             If foo is not an object, foo is replaced with an object
 *             containing foo
 */var dt=/*#__PURE__*/function(){function dt(t){_classCallCheck(this,dt);this.fields=t,// TODO(dimond): validation of FieldMask
// Sort the field mask to support `FieldMask.isEqual()` and assert below.
t.sort(ft.comparator);}/**
     * Verifies that `fieldPath` is included by at least one field in this field
     * mask.
     *
     * This is an O(n) operation, where `n` is the size of the field mask.
     */_createClass(dt,[{key:"covers",value:function covers(t){var _iterator=_createForOfIteratorHelper(this.fields),_step;try{for(_iterator.s();!(_step=_iterator.n()).done;){var e=_step.value;if(e.isPrefixOf(t))return !0;}}catch(err){_iterator.e(err);}finally{_iterator.f();}return !1;}},{key:"isEqual",value:function isEqual(t){return nt(this.fields,t.fields,function(t,e){return t.isEqual(e);});}}]);return dt;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Immutable class that represents a "proto" byte string.
 *
 * Proto byte strings can either be Base64-encoded strings or Uint8Arrays when
 * sent on the wire. This class abstracts away this differentiation by holding
 * the proto byte string in a common class that must be converted into a string
 * before being sent as a proto.
 * @internal
 */var _t=/*#__PURE__*/function(){function _t(t){_classCallCheck(this,_t);this.binaryString=t;}_createClass(_t,[{key:"toBase64",value:function toBase64(){return t=this.binaryString,btoa(t);/** Converts a binary string to a Base64 encoded string. */var t;}},{key:"toUint8Array",value:function toUint8Array(){return function(t){var e=new Uint8Array(t.length);for(var n=0;n<t.length;n++){e[n]=t.charCodeAt(n);}return e;}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // A RegExp matching ISO 8601 UTC timestamps with optional fraction.
(this.binaryString);}},{key:"approximateByteSize",value:function approximateByteSize(){return 2*this.binaryString.length;}},{key:"compareTo",value:function compareTo(t){return et(this.binaryString,t.binaryString);}},{key:"isEqual",value:function isEqual(t){return this.binaryString===t.binaryString;}}],[{key:"fromBase64String",value:function fromBase64String(t){var e=atob(t);return new _t(e);}},{key:"fromUint8Array",value:function fromUint8Array(t){var e=/**
 * Helper function to convert an Uint8array to a binary string.
 */function(t){var e="";for(var n=0;n<t.length;++n){e+=String.fromCharCode(t[n]);}return e;}/**
 * Helper function to convert a binary string to an Uint8Array.
 */(t);return new _t(e);}}]);return _t;}();_t.EMPTY_BYTE_STRING=new _t("");var mt=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);/**
 * Converts the possible Proto values for a timestamp value into a "seconds and
 * nanos" representation.
 */function gt(t){// The json interface (for the browser) will return an iso timestamp string,
// while the proto js library (for node) will return a
// google.protobuf.Timestamp instance.
if(B(!!t),"string"==typeof t){// The date string can have higher precision (nanos) than the Date class
// (millis), so we do some custom parsing here.
// Parse the nanos right out of the string.
var e=0;var n=mt.exec(t);if(B(!!n),n[1]){// Pad the fraction out to 9 digits (nanos).
var _t4=n[1];_t4=(_t4+"000000000").substr(0,9),e=Number(_t4);}// Parse the date to get the seconds.
var s=new Date(t);return {seconds:Math.floor(s.getTime()/1e3),nanos:e};}return {seconds:yt(t.seconds),nanos:yt(t.nanos)};}/**
 * Converts the possible Proto types for numbers into a JavaScript number.
 * Returns 0 if the value is not numeric.
 */function yt(t){// TODO(bjornick): Handle int64 greater than 53 bits.
return "number"==typeof t?t:"string"==typeof t?Number(t):0;}/** Converts the possible Proto types for Blobs into a ByteString. */function pt(t){return "string"==typeof t?_t.fromBase64String(t):_t.fromUint8Array(t);}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Represents a locally-applied ServerTimestamp.
 *
 * Server Timestamps are backed by MapValues that contain an internal field
 * `__type__` with a value of `server_timestamp`. The previous value and local
 * write time are stored in its `__previous_value__` and `__local_write_time__`
 * fields respectively.
 *
 * Notes:
 * - ServerTimestampValue instances are created as the result of applying a
 *   transform. They can only exist in the local view of a document. Therefore
 *   they do not need to be parsed or serialized.
 * - When evaluated locally (e.g. for snapshot.data()), they by default
 *   evaluate to `null`. This behavior can be configured by passing custom
 *   FieldValueOptions to value().
 * - With respect to other ServerTimestampValues, they sort by their
 *   localWriteTime.
 */function Tt(t){var e,n;return "server_timestamp"===(null===(n=((null===(e=null==t?void 0:t.mapValue)||void 0===e?void 0:e.fields)||{}).__type__)||void 0===n?void 0:n.stringValue);}/**
 * Creates a new ServerTimestamp proto value (using the internal format).
 */ /**
 * Returns the value of the field before this ServerTimestamp was set.
 *
 * Preserving the previous values allows the user to display the last resoled
 * value until the backend responds with the timestamp.
 */function Et(t){var e=t.mapValue.fields.__previous_value__;return Tt(e)?Et(e):e;}/**
 * Returns the local time at which this timestamp was first set.
 */function It(t){var e=gt(t.mapValue.fields.__local_write_time__.timestampValue);return new it(e.seconds,e.nanos);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Sentinel value that sorts before any Mutation Batch ID. */ /**
 * Returns whether a variable is either undefined or null.
 */function At(t){return null==t;}/** Returns whether the value represents -0. */function Rt(t){// Detect if the value is -0.0. Based on polyfill from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
return 0===t&&1/t==-1/0;}/**
 * Returns whether a value is an integer and in the safe integer range
 * @param value - The value to test for being an integer and in the safe range
 */function bt(t){return "number"==typeof t&&Number.isInteger(t)&&!Rt(t)&&t<=Number.MAX_SAFE_INTEGER&&t>=Number.MIN_SAFE_INTEGER;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @internal
 */var Pt=/*#__PURE__*/function(){function Pt(t){_classCallCheck(this,Pt);this.path=t;}_createClass(Pt,[{key:"hasCollectionId",value:/** Returns true if the document is in the specified collectionId. */function hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t;}},{key:"isEqual",value:function isEqual(t){return null!==t&&0===ht.comparator(this.path,t.path);}},{key:"toString",value:function toString(){return this.path.toString();}}],[{key:"fromPath",value:function fromPath(t){return new Pt(ht.fromString(t));}},{key:"fromName",value:function fromName(t){return new Pt(ht.fromString(t).popFirst(5));}},{key:"comparator",value:function comparator(t,e){return ht.comparator(t.path,e.path);}},{key:"isDocumentKey",value:function isDocumentKey(t){return t.length%2==0;}/**
     * Creates and returns a new document key with the given segments.
     *
     * @param segments - The segments of the path to the document
     * @returns A new instance of DocumentKey
     */},{key:"fromSegments",value:function fromSegments(t){return new Pt(new ht(t.slice()));}}]);return Pt;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Extracts the backend's type order for the provided value. */function vt(t){return "nullValue"in t?0/* NullValue */:"booleanValue"in t?1/* BooleanValue */:"integerValue"in t||"doubleValue"in t?2/* NumberValue */:"timestampValue"in t?3/* TimestampValue */:"stringValue"in t?5/* StringValue */:"bytesValue"in t?6/* BlobValue */:"referenceValue"in t?7/* RefValue */:"geoPointValue"in t?8/* GeoPointValue */:"arrayValue"in t?9/* ArrayValue */:"mapValue"in t?Tt(t)?4/* ServerTimestampValue */:10/* ObjectValue */:L();}/** Tests `left` and `right` for equality based on the backend semantics. */function Vt(t,e){var n=vt(t);if(n!==vt(e))return !1;switch(n){case 0/* NullValue */:return !0;case 1/* BooleanValue */:return t.booleanValue===e.booleanValue;case 4/* ServerTimestampValue */:return It(t).isEqual(It(e));case 3/* TimestampValue */:return function(t,e){if("string"==typeof t.timestampValue&&"string"==typeof e.timestampValue&&t.timestampValue.length===e.timestampValue.length)// Use string equality for ISO 8601 timestamps
return t.timestampValue===e.timestampValue;var n=gt(t.timestampValue),s=gt(e.timestampValue);return n.seconds===s.seconds&&n.nanos===s.nanos;}(t,e);case 5/* StringValue */:return t.stringValue===e.stringValue;case 6/* BlobValue */:return function(t,e){return pt(t.bytesValue).isEqual(pt(e.bytesValue));}(t,e);case 7/* RefValue */:return t.referenceValue===e.referenceValue;case 8/* GeoPointValue */:return function(t,e){return yt(t.geoPointValue.latitude)===yt(e.geoPointValue.latitude)&&yt(t.geoPointValue.longitude)===yt(e.geoPointValue.longitude);}(t,e);case 2/* NumberValue */:return function(t,e){if("integerValue"in t&&"integerValue"in e)return yt(t.integerValue)===yt(e.integerValue);if("doubleValue"in t&&"doubleValue"in e){var _n3=yt(t.doubleValue),s=yt(e.doubleValue);return _n3===s?Rt(_n3)===Rt(s):isNaN(_n3)&&isNaN(s);}return !1;}(t,e);case 9/* ArrayValue */:return nt(t.arrayValue.values||[],e.arrayValue.values||[],Vt);case 10/* ObjectValue */:return function(t,e){var n=t.mapValue.fields||{},s=e.mapValue.fields||{};if(ot(n)!==ot(s))return !1;for(var _t5 in n){if(n.hasOwnProperty(_t5)&&(void 0===s[_t5]||!Vt(n[_t5],s[_t5])))return !1;}return !0;}/** Returns true if the ArrayValue contains the specified element. */(t,e);default:return L();}}function St(t,e){return void 0!==(t.values||[]).find(function(t){return Vt(t,e);});}function Dt(t,e){var n=vt(t),s=vt(e);if(n!==s)return et(n,s);switch(n){case 0/* NullValue */:return 0;case 1/* BooleanValue */:return et(t.booleanValue,e.booleanValue);case 2/* NumberValue */:return function(t,e){var n=yt(t.integerValue||t.doubleValue),s=yt(e.integerValue||e.doubleValue);return n<s?-1:n>s?1:n===s?0:// one or both are NaN.
isNaN(n)?isNaN(s)?0:-1:1;}(t,e);case 3/* TimestampValue */:return Ct(t.timestampValue,e.timestampValue);case 4/* ServerTimestampValue */:return Ct(It(t),It(e));case 5/* StringValue */:return et(t.stringValue,e.stringValue);case 6/* BlobValue */:return function(t,e){var n=pt(t),s=pt(e);return n.compareTo(s);}(t.bytesValue,e.bytesValue);case 7/* RefValue */:return function(t,e){var n=t.split("/"),s=e.split("/");for(var _t6=0;_t6<n.length&&_t6<s.length;_t6++){var _e5=et(n[_t6],s[_t6]);if(0!==_e5)return _e5;}return et(n.length,s.length);}(t.referenceValue,e.referenceValue);case 8/* GeoPointValue */:return function(t,e){var n=et(yt(t.latitude),yt(e.latitude));if(0!==n)return n;return et(yt(t.longitude),yt(e.longitude));}(t.geoPointValue,e.geoPointValue);case 9/* ArrayValue */:return function(t,e){var n=t.values||[],s=e.values||[];for(var _t7=0;_t7<n.length&&_t7<s.length;++_t7){var _e6=Dt(n[_t7],s[_t7]);if(_e6)return _e6;}return et(n.length,s.length);}(t.arrayValue,e.arrayValue);case 10/* ObjectValue */:return function(t,e){var n=t.fields||{},s=Object.keys(n),i=e.fields||{},r=Object.keys(i);// Even though MapValues are likely sorted correctly based on their insertion
// order (e.g. when received from the backend), local modifications can bring
// elements out of order. We need to re-sort the elements to ensure that
// canonical IDs are independent of insertion order.
s.sort(),r.sort();for(var _t8=0;_t8<s.length&&_t8<r.length;++_t8){var _e7=et(s[_t8],r[_t8]);if(0!==_e7)return _e7;var o=Dt(n[s[_t8]],i[r[_t8]]);if(0!==o)return o;}return et(s.length,r.length);}/**
 * Generates the canonical ID for the provided field value (as used in Target
 * serialization).
 */(t.mapValue,e.mapValue);default:throw L();}}function Ct(t,e){if("string"==typeof t&&"string"==typeof e&&t.length===e.length)return et(t,e);var n=gt(t),s=gt(e),i=et(n.seconds,s.seconds);return 0!==i?i:et(n.nanos,s.nanos);}function Nt(t){return xt(t);}function xt(t){return "nullValue"in t?"null":"booleanValue"in t?""+t.booleanValue:"integerValue"in t?""+t.integerValue:"doubleValue"in t?""+t.doubleValue:"timestampValue"in t?function(t){var e=gt(t);return "time(".concat(e.seconds,",").concat(e.nanos,")");}(t.timestampValue):"stringValue"in t?t.stringValue:"bytesValue"in t?pt(t.bytesValue).toBase64():"referenceValue"in t?(n=t.referenceValue,Pt.fromName(n).toString()):"geoPointValue"in t?"geo(".concat((e=t.geoPointValue).latitude,",").concat(e.longitude,")"):"arrayValue"in t?function(t){var e="[",n=!0;var _iterator2=_createForOfIteratorHelper(t.values||[]),_step2;try{for(_iterator2.s();!(_step2=_iterator2.n()).done;){var s=_step2.value;n?n=!1:e+=",",e+=xt(s);}}catch(err){_iterator2.e(err);}finally{_iterator2.f();}return e+"]";}/** Returns a reference value for the provided database and key. */(t.arrayValue):"mapValue"in t?function(t){// Iteration order in JavaScript is not guaranteed. To ensure that we generate
// matching canonical IDs for identical maps, we need to sort the keys.
var e=Object.keys(t.fields||{}).sort();var n="{",s=!0;var _iterator3=_createForOfIteratorHelper(e),_step3;try{for(_iterator3.s();!(_step3=_iterator3.n()).done;){var i=_step3.value;s?s=!1:n+=",",n+="".concat(i,":").concat(xt(t.fields[i]));}}catch(err){_iterator3.e(err);}finally{_iterator3.f();}return n+"}";}(t.mapValue):L();var e,n;}/** Returns true if `value` is an IntegerValue . */function $t(t){return !!t&&"integerValue"in t;}/** Returns true if `value` is a DoubleValue. */ /** Returns true if `value` is an ArrayValue. */function Ot(t){return !!t&&"arrayValue"in t;}/** Returns true if `value` is a NullValue. */function Ft(t){return !!t&&"nullValue"in t;}/** Returns true if `value` is NaN. */function Mt(t){return !!t&&"doubleValue"in t&&isNaN(Number(t.doubleValue));}/** Returns true if `value` is a MapValue. */function Lt(t){return !!t&&"mapValue"in t;}/** Creates a deep copy of `source`. */function Bt(t){if(t.geoPointValue)return {geoPointValue:Object.assign({},t.geoPointValue)};if(t.timestampValue&&"object"==_typeof(t.timestampValue))return {timestampValue:Object.assign({},t.timestampValue)};if(t.mapValue){var e={mapValue:{fields:{}}};return ct(t.mapValue.fields,function(t,n){return e.mapValue.fields[t]=Bt(n);}),e;}if(t.arrayValue){var _e8={arrayValue:{values:[]}};for(var n=0;n<(t.arrayValue.values||[]).length;++n){_e8.arrayValue.values[n]=Bt(t.arrayValue.values[n]);}return _e8;}return Object.assign({},t);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An ObjectValue represents a MapValue in the Firestore Proto and offers the
 * ability to add and remove fields (via the ObjectValueBuilder).
 */var Ut=/*#__PURE__*/function(){function Ut(t){_classCallCheck(this,Ut);this.value=t;}_createClass(Ut,[{key:"field",value:/**
     * Returns the value at the given path or null.
     *
     * @param path - the path to search
     * @returns The value at the path or null if the path is not set.
     */function field(t){if(t.isEmpty())return this.value;{var e=this.value;for(var n=0;n<t.length-1;++n){if(e=(e.mapValue.fields||{})[t.get(n)],!Lt(e))return null;}return e=(e.mapValue.fields||{})[t.lastSegment()],e||null;}}/**
     * Sets the field to the provided value.
     *
     * @param path - The field path to set.
     * @param value - The value to set.
     */},{key:"set",value:function set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Bt(e);}/**
     * Sets the provided fields to the provided values.
     *
     * @param data - A map of fields to values (or null for deletes).
     */},{key:"setAll",value:function setAll(t){var _this7=this;var e=ft.emptyPath(),n={},s=[];t.forEach(function(t,i){if(!e.isImmediateParentOf(i)){// Insert the accumulated changes at this parent location
var _t9=_this7.getFieldsMap(e);_this7.applyChanges(_t9,n,s),n={},s=[],e=i.popLast();}t?n[i.lastSegment()]=Bt(t):s.push(i.lastSegment());});var i=this.getFieldsMap(e);this.applyChanges(i,n,s);}/**
     * Removes the field at the specified path. If there is no field at the
     * specified path, nothing is changed.
     *
     * @param path - The field path to remove.
     */},{key:"delete",value:function _delete(t){var e=this.field(t.popLast());Lt(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()];}},{key:"isEqual",value:function isEqual(t){return Vt(this.value,t.value);}/**
     * Returns the map that contains the leaf element of `path`. If the parent
     * entry does not yet exist, or if it is not a map, a new map will be created.
     */},{key:"getFieldsMap",value:function getFieldsMap(t){var e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(var n=0;n<t.length;++n){var s=e.mapValue.fields[t.get(n)];Lt(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(n)]=s),e=s;}return e.mapValue.fields;}/**
     * Modifies `fieldsMap` by adding, replacing or deleting the specified
     * entries.
     */},{key:"applyChanges",value:function applyChanges(t,e,n){ct(e,function(e,n){return t[e]=n;});var _iterator4=_createForOfIteratorHelper(n),_step4;try{for(_iterator4.s();!(_step4=_iterator4.n()).done;){var _e9=_step4.value;delete t[_e9];}}catch(err){_iterator4.e(err);}finally{_iterator4.f();}}},{key:"clone",value:function clone(){return new Ut(Bt(this.value));}}],[{key:"empty",value:function empty(){return new Ut({mapValue:{}});}}]);return Ut;}();/**
 * Returns a FieldMask built from all fields in a MapValue.
 */function qt(t){var e=[];return ct(t.fields,function(t,n){var s=new ft([t]);if(Lt(n)){var _t10=qt(n.mapValue).fields;if(0===_t10.length)// Preserve the empty map by adding it to the FieldMask.
e.push(s);else {// For nested and non-empty ObjectValues, add the FieldPath of the
// leaf nodes.
var _iterator5=_createForOfIteratorHelper(_t10),_step5;try{for(_iterator5.s();!(_step5=_iterator5.n()).done;){var _n4=_step5.value;e.push(s.child(_n4));}}catch(err){_iterator5.e(err);}finally{_iterator5.f();}}}else// For nested and non-empty ObjectValues, add the FieldPath of the leaf
// nodes.
e.push(s);}),new dt(e);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Represents a document in Firestore with a key, version, data and whether it
 * has local mutations applied to it.
 *
 * Documents can transition between states via `convertToFoundDocument()`,
 * `convertToNoDocument()` and `convertToUnknownDocument()`. If a document does
 * not transition to one of these states even after all mutations have been
 * applied, `isValidDocument()` returns false and the document should be removed
 * from all views.
 */var Kt=/*#__PURE__*/function(){function Kt(t,e,n,s,i){_classCallCheck(this,Kt);this.key=t,this.documentType=e,this.version=n,this.data=s,this.documentState=i;}/**
     * Creates a document with no known version or data, but which can serve as
     * base document for mutations.
     */_createClass(Kt,[{key:"convertToFoundDocument",value:/**
     * Changes the document type to indicate that it exists and that its version
     * and data are known.
     */function convertToFoundDocument(t,e){return this.version=t,this.documentType=1/* FOUND_DOCUMENT */,this.data=e,this.documentState=0/* SYNCED */,this;}/**
     * Changes the document type to indicate that it doesn't exist at the given
     * version.
     */},{key:"convertToNoDocument",value:function convertToNoDocument(t){return this.version=t,this.documentType=2/* NO_DOCUMENT */,this.data=Ut.empty(),this.documentState=0/* SYNCED */,this;}/**
     * Changes the document type to indicate that it exists at a given version but
     * that its data is not known (e.g. a document that was updated without a known
     * base document).
     */},{key:"convertToUnknownDocument",value:function convertToUnknownDocument(t){return this.version=t,this.documentType=3/* UNKNOWN_DOCUMENT */,this.data=Ut.empty(),this.documentState=2/* HAS_COMMITTED_MUTATIONS */,this;}},{key:"setHasCommittedMutations",value:function setHasCommittedMutations(){return this.documentState=2/* HAS_COMMITTED_MUTATIONS */,this;}},{key:"setHasLocalMutations",value:function setHasLocalMutations(){return this.documentState=1/* HAS_LOCAL_MUTATIONS */,this;}},{key:"hasLocalMutations",get:function get(){return 1/* HAS_LOCAL_MUTATIONS */===this.documentState;}},{key:"hasCommittedMutations",get:function get(){return 2/* HAS_COMMITTED_MUTATIONS */===this.documentState;}},{key:"hasPendingWrites",get:function get(){return this.hasLocalMutations||this.hasCommittedMutations;}},{key:"isValidDocument",value:function isValidDocument(){return 0/* INVALID */!==this.documentType;}},{key:"isFoundDocument",value:function isFoundDocument(){return 1/* FOUND_DOCUMENT */===this.documentType;}},{key:"isNoDocument",value:function isNoDocument(){return 2/* NO_DOCUMENT */===this.documentType;}},{key:"isUnknownDocument",value:function isUnknownDocument(){return 3/* UNKNOWN_DOCUMENT */===this.documentType;}},{key:"isEqual",value:function isEqual(t){return t instanceof Kt&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data);}},{key:"clone",value:function clone(){return new Kt(this.key,this.documentType,this.version,this.data.clone(),this.documentState);}},{key:"toString",value:function toString(){return "Document(".concat(this.key,", ").concat(this.version,", ").concat(JSON.stringify(this.data.value),", {documentType: ").concat(this.documentType,"}), {documentState: ").concat(this.documentState,"})");}}],[{key:"newInvalidDocument",value:function newInvalidDocument(t){return new Kt(t,0/* INVALID */,rt.min(),Ut.empty(),0/* SYNCED */);}/**
     * Creates a new document that is known to exist with the given data at the
     * given version.
     */},{key:"newFoundDocument",value:function newFoundDocument(t,e,n){return new Kt(t,1/* FOUND_DOCUMENT */,e,n,0/* SYNCED */);}/** Creates a new document that is known to not exist at the given version. */},{key:"newNoDocument",value:function newNoDocument(t,e){return new Kt(t,2/* NO_DOCUMENT */,e,Ut.empty(),0/* SYNCED */);}/**
     * Creates a new document that is known to exist at the given version but
     * whose data is not known (e.g. a document that was updated without a known
     * base document).
     */},{key:"newUnknownDocument",value:function newUnknownDocument(t,e){return new Kt(t,3/* UNKNOWN_DOCUMENT */,e,Ut.empty(),2/* HAS_COMMITTED_MUTATIONS */);}}]);return Kt;}();/**
 * Compares the value for field `field` in the provided documents. Throws if
 * the field does not exist in both documents.
 */ /**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // Visible for testing
var jt=function jt(t){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var s=arguments.length>3&&arguments[3]!==undefined?arguments[3]:[];var i=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;var r=arguments.length>5&&arguments[5]!==undefined?arguments[5]:null;var o=arguments.length>6&&arguments[6]!==undefined?arguments[6]:null;_classCallCheck(this,jt);this.path=t,this.collectionGroup=e,this.orderBy=n,this.filters=s,this.limit=i,this.startAt=r,this.endAt=o,this.A=null;};/**
 * Initializes a Target with a path and optional additional query constraints.
 * Path must currently be empty if this is a collection group query.
 *
 * NOTE: you should always construct `Target` from `Query.toTarget` instead of
 * using this factory method, because `Query` provides an implicit `orderBy`
 * property.
 */function Qt(t){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var s=arguments.length>3&&arguments[3]!==undefined?arguments[3]:[];var i=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;var r=arguments.length>5&&arguments[5]!==undefined?arguments[5]:null;var o=arguments.length>6&&arguments[6]!==undefined?arguments[6]:null;return new jt(t,e,n,s,i,r,o);}function Wt(t){var e=q(t);if(null===e.A){var _t11=e.path.canonicalString();null!==e.collectionGroup&&(_t11+="|cg:"+e.collectionGroup),_t11+="|f:",_t11+=e.filters.map(function(t){return Yt(t);}).join(","),_t11+="|ob:",_t11+=e.orderBy.map(function(t){return function(t){// TODO(b/29183165): Make this collision robust.
return t.field.canonicalString()+t.dir;}(t);}).join(","),At(e.limit)||(_t11+="|l:",_t11+=e.limit),e.startAt&&(_t11+="|lb:",_t11+=ce(e.startAt)),e.endAt&&(_t11+="|ub:",_t11+=ce(e.endAt)),e.A=_t11;}return e.A;}function Gt(t){var e=t.path.canonicalString();return null!==t.collectionGroup&&(e+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(e+=", filters: [".concat(t.filters.map(function(t){return "".concat((e=t).field.canonicalString()," ").concat(e.op," ").concat(Nt(e.value));/** Returns a debug description for `filter`. */var e;/** Filter that matches on key fields (i.e. '__name__'). */}).join(", "),"]")),At(t.limit)||(e+=", limit: "+t.limit),t.orderBy.length>0&&(e+=", orderBy: [".concat(t.orderBy.map(function(t){return function(t){return "".concat(t.field.canonicalString()," (").concat(t.dir,")");}(t);}).join(", "),"]")),t.startAt&&(e+=", startAt: "+ce(t.startAt)),t.endAt&&(e+=", endAt: "+ce(t.endAt)),"Target(".concat(e,")");}function zt(t,e){if(t.limit!==e.limit)return !1;if(t.orderBy.length!==e.orderBy.length)return !1;for(var _n5=0;_n5<t.orderBy.length;_n5++){if(!ue(t.orderBy[_n5],e.orderBy[_n5]))return !1;}if(t.filters.length!==e.filters.length)return !1;for(var i=0;i<t.filters.length;i++){if(n=t.filters[i],s=e.filters[i],n.op!==s.op||!n.field.isEqual(s.field)||!Vt(n.value,s.value))return !1;}var n,s;return t.collectionGroup===e.collectionGroup&&!!t.path.isEqual(e.path)&&!!le(t.startAt,e.startAt)&&le(t.endAt,e.endAt);}function Ht(t){return Pt.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length;}var Jt=/*#__PURE__*/function(_ref2){_inherits(Jt,_ref2);var _super4=_createSuper$1(Jt);function Jt(t,e,n){var _this8;_classCallCheck(this,Jt);_this8=_super4.call(this),_this8.field=t,_this8.op=e,_this8.value=n;return _this8;}/**
     * Creates a filter based on the provided arguments.
     */_createClass(Jt,[{key:"matches",value:function matches(t){var e=t.data.field(this.field);// Types do not have to match in NOT_EQUAL filters.
return "!="/* NOT_EQUAL */===this.op?null!==e&&this.P(Dt(e,this.value)):null!==e&&vt(this.value)===vt(e)&&this.P(Dt(e,this.value));// Only compare types with matching backend order (such as double and int).
}},{key:"P",value:function P(t){switch(this.op){case"<"/* LESS_THAN */:return t<0;case"<="/* LESS_THAN_OR_EQUAL */:return t<=0;case"=="/* EQUAL */:return 0===t;case"!="/* NOT_EQUAL */:return 0!==t;case">"/* GREATER_THAN */:return t>0;case">="/* GREATER_THAN_OR_EQUAL */:return t>=0;default:return L();}}},{key:"v",value:function v(){return ["<"/* LESS_THAN */,"<="/* LESS_THAN_OR_EQUAL */,">"/* GREATER_THAN */,">="/* GREATER_THAN_OR_EQUAL */,"!="/* NOT_EQUAL */,"not-in"/* NOT_IN */].indexOf(this.op)>=0;}}],[{key:"create",value:function create(t,e,n){return t.isKeyField()?"in"/* IN */===e||"not-in"/* NOT_IN */===e?this.R(t,e,n):new Xt(t,e,n):"array-contains"/* ARRAY_CONTAINS */===e?new ne(t,n):"in"/* IN */===e?new se(t,n):"not-in"/* NOT_IN */===e?new ie(t,n):"array-contains-any"/* ARRAY_CONTAINS_ANY */===e?new re(t,n):new Jt(t,e,n);}},{key:"R",value:function R(t,e,n){return "in"/* IN */===e?new Zt(t,n):new te(t,n);}}]);return Jt;}(/*#__PURE__*/function(){function _class(){_classCallCheck(this,_class);}return _class;}());function Yt(t){// TODO(b/29183165): Technically, this won't be unique if two values have
// the same description, such as the int 3 and the string "3". So we should
// add the types in here somehow, too.
return t.field.canonicalString()+t.op.toString()+Nt(t.value);}var Xt=/*#__PURE__*/function(_Jt){_inherits(Xt,_Jt);var _super5=_createSuper$1(Xt);function Xt(t,e,n){var _this9;_classCallCheck(this,Xt);_this9=_super5.call(this,t,e,n),_this9.key=Pt.fromName(n.referenceValue);return _this9;}_createClass(Xt,[{key:"matches",value:function matches(t){var e=Pt.comparator(t.key,this.key);return this.P(e);}}]);return Xt;}(Jt);/** Filter that matches on key fields within an array. */var Zt=/*#__PURE__*/function(_Jt2){_inherits(Zt,_Jt2);var _super6=_createSuper$1(Zt);function Zt(t,e){var _this10;_classCallCheck(this,Zt);_this10=_super6.call(this,t,"in"/* IN */,e),_this10.keys=ee("in"/* IN */,e);return _this10;}_createClass(Zt,[{key:"matches",value:function matches(t){return this.keys.some(function(e){return e.isEqual(t.key);});}}]);return Zt;}(Jt);/** Filter that matches on key fields not present within an array. */var te=/*#__PURE__*/function(_Jt3){_inherits(te,_Jt3);var _super7=_createSuper$1(te);function te(t,e){var _this11;_classCallCheck(this,te);_this11=_super7.call(this,t,"not-in"/* NOT_IN */,e),_this11.keys=ee("not-in"/* NOT_IN */,e);return _this11;}_createClass(te,[{key:"matches",value:function matches(t){return !this.keys.some(function(e){return e.isEqual(t.key);});}}]);return te;}(Jt);function ee(t,e){var n;return ((null===(n=e.arrayValue)||void 0===n?void 0:n.values)||[]).map(function(t){return Pt.fromName(t.referenceValue);});}/** A Filter that implements the array-contains operator. */var ne=/*#__PURE__*/function(_Jt4){_inherits(ne,_Jt4);var _super8=_createSuper$1(ne);function ne(t,e){_classCallCheck(this,ne);return _super8.call(this,t,"array-contains"/* ARRAY_CONTAINS */,e);}_createClass(ne,[{key:"matches",value:function matches(t){var e=t.data.field(this.field);return Ot(e)&&St(e.arrayValue,this.value);}}]);return ne;}(Jt);/** A Filter that implements the IN operator. */var se=/*#__PURE__*/function(_Jt5){_inherits(se,_Jt5);var _super9=_createSuper$1(se);function se(t,e){_classCallCheck(this,se);return _super9.call(this,t,"in"/* IN */,e);}_createClass(se,[{key:"matches",value:function matches(t){var e=t.data.field(this.field);return null!==e&&St(this.value.arrayValue,e);}}]);return se;}(Jt);/** A Filter that implements the not-in operator. */var ie=/*#__PURE__*/function(_Jt6){_inherits(ie,_Jt6);var _super10=_createSuper$1(ie);function ie(t,e){_classCallCheck(this,ie);return _super10.call(this,t,"not-in"/* NOT_IN */,e);}_createClass(ie,[{key:"matches",value:function matches(t){if(St(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return !1;var e=t.data.field(this.field);return null!==e&&!St(this.value.arrayValue,e);}}]);return ie;}(Jt);/** A Filter that implements the array-contains-any operator. */var re=/*#__PURE__*/function(_Jt7){_inherits(re,_Jt7);var _super11=_createSuper$1(re);function re(t,e){_classCallCheck(this,re);return _super11.call(this,t,"array-contains-any"/* ARRAY_CONTAINS_ANY */,e);}_createClass(re,[{key:"matches",value:function matches(t){var _this12=this;var e=t.data.field(this.field);return !(!Ot(e)||!e.arrayValue.values)&&e.arrayValue.values.some(function(t){return St(_this12.value.arrayValue,t);});}}]);return re;}(Jt);/**
 * Represents a bound of a query.
 *
 * The bound is specified with the given components representing a position and
 * whether it's just before or just after the position (relative to whatever the
 * query order is).
 *
 * The position represents a logical index position for a query. It's a prefix
 * of values for the (potentially implicit) order by clauses of a query.
 *
 * Bound provides a function to determine whether a document comes before or
 * after a bound. This is influenced by whether the position is just before or
 * just after the provided values.
 */var oe=function oe(t,e){_classCallCheck(this,oe);this.position=t,this.before=e;};function ce(t){// TODO(b/29183165): Make this collision robust.
return "".concat(t.before?"b":"a",":").concat(t.position.map(function(t){return Nt(t);}).join(","));}/**
 * An ordering on a field, in some Direction. Direction defaults to ASCENDING.
 */var ae=function ae(t){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"asc";_classCallCheck(this,ae);this.field=t,this.dir=e;};function ue(t,e){return t.dir===e.dir&&t.field.isEqual(e.field);}/**
 * Returns true if a document sorts before a bound using the provided sort
 * order.
 */function he(t,e,n){var s=0;for(var i=0;i<t.position.length;i++){var r=e[i],o=t.position[i];if(r.field.isKeyField())s=Pt.comparator(Pt.fromName(o.referenceValue),n.key);else {s=Dt(o,n.data.field(r.field));}if("desc"/* DESCENDING */===r.dir&&(s*=-1),0!==s)break;}return t.before?s<=0:s<0;}function le(t,e){if(null===t)return null===e;if(null===e)return !1;if(t.before!==e.before||t.position.length!==e.position.length)return !1;for(var n=0;n<t.position.length;n++){if(!Vt(t.position[n],e.position[n]))return !1;}return !0;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Query encapsulates all the query attributes we support in the SDK. It can
 * be run against the LocalStore, as well as be converted to a `Target` to
 * query the RemoteStore results.
 *
 * Visible for testing.
 */var fe=/**
     * Initializes a Query with a path and optional additional query constraints.
     * Path must currently be empty if this is a collection group query.
     */function fe(t){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var s=arguments.length>3&&arguments[3]!==undefined?arguments[3]:[];var i=arguments.length>4&&arguments[4]!==undefined?arguments[4]:null;var r=arguments.length>5&&arguments[5]!==undefined?arguments[5]:"F";var o=arguments.length>6&&arguments[6]!==undefined?arguments[6]:null;var c=arguments.length>7&&arguments[7]!==undefined?arguments[7]:null;_classCallCheck(this,fe);this.path=t,this.collectionGroup=e,this.explicitOrderBy=n,this.filters=s,this.limit=i,this.limitType=r,this.startAt=o,this.endAt=c,this.V=null,// The corresponding `Target` of this `Query` instance.
this.S=null,this.startAt,this.endAt;};/** Creates a new Query instance with the options provided. */function de(t,e,n,s,i,r,o,c){return new fe(t,e,n,s,i,r,o,c);}/** Creates a new Query for a query that matches all documents at `path` */function we(t){return new fe(t);}/**
 * Helper to convert a collection group query into a collection query at a
 * specific path. This is used when executing collection group queries, since
 * we have to split the query into a set of collection queries at multiple
 * paths.
 */function _e(t){return !At(t.limit)&&"F"/* First */===t.limitType;}function me(t){return !At(t.limit)&&"L"/* Last */===t.limitType;}function ge(t){return t.explicitOrderBy.length>0?t.explicitOrderBy[0].field:null;}function ye(t){var _iterator6=_createForOfIteratorHelper(t.filters),_step6;try{for(_iterator6.s();!(_step6=_iterator6.n()).done;){var e=_step6.value;if(e.v())return e.field;}}catch(err){_iterator6.e(err);}finally{_iterator6.f();}return null;}/**
 * Checks if any of the provided Operators are included in the query and
 * returns the first one that is, or null if none are.
 */ /**
 * Returns whether the query matches a collection group rather than a specific
 * collection.
 */function pe(t){return null!==t.collectionGroup;}/**
 * Returns the implicit order by constraint that is used to execute the Query,
 * which can be different from the order by constraints the user provided (e.g.
 * the SDK and backend always orders by `__name__`).
 */function Te(t){var e=q(t);if(null===e.V){e.V=[];var _t12=ye(e),n=ge(e);if(null!==_t12&&null===n)// In order to implicitly add key ordering, we must also add the
// inequality filter field for it to be a valid query.
// Note that the default inequality field and key ordering is ascending.
_t12.isKeyField()||e.V.push(new ae(_t12)),e.V.push(new ae(ft.keyField(),"asc"/* ASCENDING */));else {var _t13=!1;var _iterator7=_createForOfIteratorHelper(e.explicitOrderBy),_step7;try{for(_iterator7.s();!(_step7=_iterator7.n()).done;){var _n6=_step7.value;e.V.push(_n6),_n6.field.isKeyField()&&(_t13=!0);}}catch(err){_iterator7.e(err);}finally{_iterator7.f();}if(!_t13){// The order of the implicit key ordering always matches the last
// explicit order by
var _t14=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc"/* ASCENDING */;e.V.push(new ae(ft.keyField(),_t14));}}}return e.V;}/**
 * Converts this `Query` instance to it's corresponding `Target` representation.
 */function Ee(t){var e=q(t);if(!e.S)if("F"/* First */===e.limitType)e.S=Qt(e.path,e.collectionGroup,Te(e),e.filters,e.limit,e.startAt,e.endAt);else {// Flip the orderBy directions since we want the last results
var _t15=[];var _iterator8=_createForOfIteratorHelper(Te(e)),_step8;try{for(_iterator8.s();!(_step8=_iterator8.n()).done;){var _n7=_step8.value;var _e10="desc"/* DESCENDING */===_n7.dir?"asc"/* ASCENDING */:"desc"/* DESCENDING */;_t15.push(new ae(_n7.field,_e10));}// We need to swap the cursors to match the now-flipped query ordering.
}catch(err){_iterator8.e(err);}finally{_iterator8.f();}var n=e.endAt?new oe(e.endAt.position,!e.endAt.before):null,s=e.startAt?new oe(e.startAt.position,!e.startAt.before):null;// Now return as a LimitType.First query.
e.S=Qt(e.path,e.collectionGroup,_t15,e.filters,e.limit,n,s);}return e.S;}function Ie(t,e,n){return new fe(t.path,t.collectionGroup,t.explicitOrderBy.slice(),t.filters.slice(),e,n,t.startAt,t.endAt);}function Ae(t,e){return zt(Ee(t),Ee(e))&&t.limitType===e.limitType;}// TODO(b/29183165): This is used to get a unique string from a query to, for
// example, use as a dictionary key, but the implementation is subject to
// collisions. Make it collision-free.
function Re(t){return "".concat(Wt(Ee(t)),"|lt:").concat(t.limitType);}function be(t){return "Query(target=".concat(Gt(Ee(t)),"; limitType=").concat(t.limitType,")");}/** Returns whether `doc` matches the constraints of `query`. */function Pe(t,e){return e.isFoundDocument()&&function(t,e){var n=e.key.path;return null!==t.collectionGroup?e.key.hasCollectionId(t.collectionGroup)&&t.path.isPrefixOf(n):Pt.isDocumentKey(t.path)?t.path.isEqual(n):t.path.isImmediateParentOf(n);}/**
 * A document must have a value for every ordering clause in order to show up
 * in the results.
 */(t,e)&&function(t,e){var _iterator9=_createForOfIteratorHelper(t.explicitOrderBy),_step9;try{for(_iterator9.s();!(_step9=_iterator9.n()).done;){var n=_step9.value;// order by key always matches
if(!n.field.isKeyField()&&null===e.data.field(n.field))return !1;}}catch(err){_iterator9.e(err);}finally{_iterator9.f();}return !0;}(t,e)&&function(t,e){var _iterator10=_createForOfIteratorHelper(t.filters),_step10;try{for(_iterator10.s();!(_step10=_iterator10.n()).done;){var n=_step10.value;if(!n.matches(e))return !1;}}catch(err){_iterator10.e(err);}finally{_iterator10.f();}return !0;}/** Makes sure a document is within the bounds, if provided. */(t,e)&&function(t,e){if(t.startAt&&!he(t.startAt,Te(t),e))return !1;if(t.endAt&&he(t.endAt,Te(t),e))return !1;return !0;}/**
 * Returns a new comparator function that can be used to compare two documents
 * based on the Query's ordering constraint.
 */(t,e);}function ve(t){return function(e,n){var s=!1;var _iterator11=_createForOfIteratorHelper(Te(t)),_step11;try{for(_iterator11.s();!(_step11=_iterator11.n()).done;){var i=_step11.value;var _t16=Ve(i,e,n);if(0!==_t16)return _t16;s=s||i.field.isKeyField();}}catch(err){_iterator11.e(err);}finally{_iterator11.f();}return 0;};}function Ve(t,e,n){var s=t.field.isKeyField()?Pt.comparator(e.key,n.key):function(t,e,n){var s=e.data.field(t),i=n.data.field(t);return null!==s&&null!==i?Dt(s,i):L();}(t.field,e,n);switch(t.dir){case"asc"/* ASCENDING */:return s;case"desc"/* DESCENDING */:return -1*s;default:return L();}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Returns an DoubleValue for `value` that is encoded based the serializer's
 * `useProto3Json` setting.
 */function Se(t,e){if(t.D){if(isNaN(e))return {doubleValue:"NaN"};if(e===1/0)return {doubleValue:"Infinity"};if(e===-1/0)return {doubleValue:"-Infinity"};}return {doubleValue:Rt(e)?"-0":e};}/**
 * Returns an IntegerValue for `value`.
 */function De(t){return {integerValue:""+t};}/**
 * Returns a value for a number that's appropriate to put into a proto.
 * The return value is an IntegerValue if it can safely represent the value,
 * otherwise a DoubleValue is returned.
 */function Ce(t,e){return bt(e)?De(e):Se(t,e);}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Used to represent a field transform on a mutation. */var Ne=function Ne(){_classCallCheck(this,Ne);// Make sure that the structural type of `TransformOperation` is unique.
// See https://github.com/microsoft/TypeScript/issues/5451
this._=void 0;};/**
 * Computes the local transform result against the provided `previousValue`,
 * optionally using the provided localWriteTime.
 */function xe(t,e,n){return t instanceof Oe?function(t,e){var n={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:t.seconds,nanos:t.nanoseconds}}}};return e&&(n.fields.__previous_value__=e),{mapValue:n};}(n,e):t instanceof Fe?Me(t,e):t instanceof Le?Be(t,e):function(t,e){// PORTING NOTE: Since JavaScript's integer arithmetic is limited to 53 bit
// precision and resolves overflows by reducing precision, we do not
// manually cap overflows at 2^63.
var n=$e(t,e),s=qe(n)+qe(t.C);return $t(n)&&$t(t.C)?De(s):Se(t.N,s);}(t,e);}/**
 * Computes a final transform result after the transform has been acknowledged
 * by the server, potentially using the server-provided transformResult.
 */function ke(t,e,n){// The server just sends null as the transform result for array operations,
// so we have to calculate a result the same as we do for local
// applications.
return t instanceof Fe?Me(t,e):t instanceof Le?Be(t,e):n;}/**
 * If this transform operation is not idempotent, returns the base value to
 * persist for this transform. If a base value is returned, the transform
 * operation is always applied to this base value, even if document has
 * already been updated.
 *
 * Base values provide consistent behavior for non-idempotent transforms and
 * allow us to return the same latency-compensated value even if the backend
 * has already applied the transform operation. The base value is null for
 * idempotent transforms, as they can be re-played even if the backend has
 * already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent transforms.
 */function $e(t,e){return t instanceof Ue?$t(n=e)||function(t){return !!t&&"doubleValue"in t;}/** Returns true if `value` is either an IntegerValue or a DoubleValue. */(n)?e:{integerValue:0}:null;var n;}/** Transforms a value into a server-generated timestamp. */var Oe=/*#__PURE__*/function(_Ne){_inherits(Oe,_Ne);var _super12=_createSuper$1(Oe);function Oe(){_classCallCheck(this,Oe);return _super12.apply(this,arguments);}return Oe;}(Ne);/** Transforms an array value via a union operation. */var Fe=/*#__PURE__*/function(_Ne2){_inherits(Fe,_Ne2);var _super13=_createSuper$1(Fe);function Fe(t){var _this13;_classCallCheck(this,Fe);_this13=_super13.call(this),_this13.elements=t;return _this13;}return Fe;}(Ne);function Me(t,e){var n=Ke(e);var _iterator12=_createForOfIteratorHelper(t.elements),_step12;try{var _loop=function _loop(){var e=_step12.value;n.some(function(t){return Vt(t,e);})||n.push(e);};for(_iterator12.s();!(_step12=_iterator12.n()).done;){_loop();}}catch(err){_iterator12.e(err);}finally{_iterator12.f();}return {arrayValue:{values:n}};}/** Transforms an array value via a remove operation. */var Le=/*#__PURE__*/function(_Ne3){_inherits(Le,_Ne3);var _super14=_createSuper$1(Le);function Le(t){var _this14;_classCallCheck(this,Le);_this14=_super14.call(this),_this14.elements=t;return _this14;}return Le;}(Ne);function Be(t,e){var n=Ke(e);var _iterator13=_createForOfIteratorHelper(t.elements),_step13;try{var _loop2=function _loop2(){var e=_step13.value;n=n.filter(function(t){return !Vt(t,e);});};for(_iterator13.s();!(_step13=_iterator13.n()).done;){_loop2();}}catch(err){_iterator13.e(err);}finally{_iterator13.f();}return {arrayValue:{values:n}};}/**
 * Implements the backend semantics for locally computed NUMERIC_ADD (increment)
 * transforms. Converts all field values to integers or doubles, but unlike the
 * backend does not cap integer values at 2^63. Instead, JavaScript number
 * arithmetic is used and precision loss can occur for values greater than 2^53.
 */var Ue=/*#__PURE__*/function(_Ne4){_inherits(Ue,_Ne4);var _super15=_createSuper$1(Ue);function Ue(t,e){var _this15;_classCallCheck(this,Ue);_this15=_super15.call(this),_this15.N=t,_this15.C=e;return _this15;}return Ue;}(Ne);function qe(t){return yt(t.integerValue||t.doubleValue);}function Ke(t){return Ot(t)&&t.arrayValue.values?t.arrayValue.values.slice():[];}function Qe(t,e){return t.field.isEqual(e.field)&&function(t,e){return t instanceof Fe&&e instanceof Fe||t instanceof Le&&e instanceof Le?nt(t.elements,e.elements,Vt):t instanceof Ue&&e instanceof Ue?Vt(t.C,e.C):t instanceof Oe&&e instanceof Oe;}(t.transform,e.transform);}/** The result of successfully applying a mutation to the backend. */var We=function We(/**
     * The version at which the mutation was committed:
     *
     * - For most operations, this is the updateTime in the WriteResult.
     * - For deletes, the commitTime of the WriteResponse (because deletes are
     *   not stored and have no updateTime).
     *
     * Note that these versions can be different: No-op writes will not change
     * the updateTime even though the commitTime advances.
     */t,/**
     * The resulting fields returned from the backend after a mutation
     * containing field transforms has been committed. Contains one FieldValue
     * for each FieldTransform that was in the mutation.
     *
     * Will be empty if the mutation did not contain any field transforms.
     */e){_classCallCheck(this,We);this.version=t,this.transformResults=e;};/**
 * Encodes a precondition for a mutation. This follows the model that the
 * backend accepts with the special case of an explicit "empty" precondition
 * (meaning no precondition).
 */var Ge=/*#__PURE__*/function(){function Ge(t,e){_classCallCheck(this,Ge);this.updateTime=t,this.exists=e;}/** Creates a new empty Precondition. */_createClass(Ge,[{key:"isNone",get:/** Returns whether this Precondition is empty. */function get(){return void 0===this.updateTime&&void 0===this.exists;}},{key:"isEqual",value:function isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime);}}],[{key:"none",value:function none(){return new Ge();}/** Creates a new Precondition with an exists flag. */},{key:"exists",value:function exists(t){return new Ge(void 0,t);}/** Creates a new Precondition based on a version a document exists at. */},{key:"updateTime",value:function updateTime(t){return new Ge(t);}}]);return Ge;}();/** Returns true if the preconditions is valid for the given document. */function ze(t,e){return void 0!==t.updateTime?e.isFoundDocument()&&e.version.isEqual(t.updateTime):void 0===t.exists||t.exists===e.isFoundDocument();}/**
 * A mutation describes a self-contained change to a document. Mutations can
 * create, replace, delete, and update subsets of documents.
 *
 * Mutations not only act on the value of the document but also its version.
 *
 * For local mutations (mutations that haven't been committed yet), we preserve
 * the existing version for Set and Patch mutations. For Delete mutations, we
 * reset the version to 0.
 *
 * Here's the expected transition table.
 *
 * MUTATION           APPLIED TO            RESULTS IN
 *
 * SetMutation        Document(v3)          Document(v3)
 * SetMutation        NoDocument(v3)        Document(v0)
 * SetMutation        InvalidDocument(v0)   Document(v0)
 * PatchMutation      Document(v3)          Document(v3)
 * PatchMutation      NoDocument(v3)        NoDocument(v3)
 * PatchMutation      InvalidDocument(v0)   UnknownDocument(v3)
 * DeleteMutation     Document(v3)          NoDocument(v0)
 * DeleteMutation     NoDocument(v3)        NoDocument(v0)
 * DeleteMutation     InvalidDocument(v0)   NoDocument(v0)
 *
 * For acknowledged mutations, we use the updateTime of the WriteResponse as
 * the resulting version for Set and Patch mutations. As deletes have no
 * explicit update time, we use the commitTime of the WriteResponse for
 * Delete mutations.
 *
 * If a mutation is acknowledged by the backend but fails the precondition check
 * locally, we transition to an `UnknownDocument` and rely on Watch to send us
 * the updated version.
 *
 * Field transforms are used only with Patch and Set Mutations. We use the
 * `updateTransforms` message to store transforms, rather than the `transforms`s
 * messages.
 *
 * ## Subclassing Notes
 *
 * Every type of mutation needs to implement its own applyToRemoteDocument() and
 * applyToLocalView() to implement the actual behavior of applying the mutation
 * to some source document (see `setMutationApplyToRemoteDocument()` for an
 * example).
 */var He=function He(){_classCallCheck(this,He);};/**
 * Applies this mutation to the given document for the purposes of computing a
 * new remote document. If the input document doesn't match the expected state
 * (e.g. it is invalid or outdated), the document type may transition to
 * unknown.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param mutationResult - The result of applying the mutation from the backend.
 */function Je(t,e,n){t instanceof en?function(t,e,n){// Unlike setMutationApplyToLocalView, if we're applying a mutation to a
// remote document the server has accepted the mutation so the precondition
// must have held.
var s=t.value.clone(),i=rn(t.fieldTransforms,e,n.transformResults);s.setAll(i),e.convertToFoundDocument(n.version,s).setHasCommittedMutations();}(t,e,n):t instanceof nn?function(t,e,n){if(!ze(t.precondition,e))// Since the mutation was not rejected, we know that the precondition
// matched on the backend. We therefore must not have the expected version
// of the document in our cache and convert to an UnknownDocument with a
// known updateTime.
return void e.convertToUnknownDocument(n.version);var s=rn(t.fieldTransforms,e,n.transformResults),i=e.data;i.setAll(sn(t)),i.setAll(s),e.convertToFoundDocument(n.version,i).setHasCommittedMutations();}(t,e,n):function(t,e,n){// Unlike applyToLocalView, if we're applying a mutation to a remote
// document the server has accepted the mutation so the precondition must
// have held.
e.convertToNoDocument(n.version).setHasCommittedMutations();}(0,e,n);}/**
 * Applies this mutation to the given document for the purposes of computing
 * the new local view of a document. If the input document doesn't match the
 * expected state, the document is not modified.
 *
 * @param mutation - The mutation to apply.
 * @param document - The document to mutate. The input document can be an
 *     invalid document if the client has no knowledge of the pre-mutation state
 *     of the document.
 * @param localWriteTime - A timestamp indicating the local write time of the
 *     batch this mutation is a part of.
 */function Ye(t,e,n){t instanceof en?function(t,e,n){if(!ze(t.precondition,e))// The mutation failed to apply (e.g. a document ID created with add()
// caused a name collision).
return;var s=t.value.clone(),i=on(t.fieldTransforms,n,e);s.setAll(i),e.convertToFoundDocument(tn(e),s).setHasLocalMutations();}/**
 * A mutation that modifies fields of the document at the given key with the
 * given values. The values are applied through a field mask:
 *
 *  * When a field is in both the mask and the values, the corresponding field
 *    is updated.
 *  * When a field is in neither the mask nor the values, the corresponding
 *    field is unmodified.
 *  * When a field is in the mask but not in the values, the corresponding field
 *    is deleted.
 *  * When a field is not in the mask but is in the values, the values map is
 *    ignored.
 */(t,e,n):t instanceof nn?function(t,e,n){if(!ze(t.precondition,e))return;var s=on(t.fieldTransforms,n,e),i=e.data;i.setAll(sn(t)),i.setAll(s),e.convertToFoundDocument(tn(e),i).setHasLocalMutations();}/**
 * Returns a FieldPath/Value map with the content of the PatchMutation.
 */(t,e,n):function(t,e){ze(t.precondition,e)&&// We don't call `setHasLocalMutations()` since we want to be backwards
// compatible with the existing SDK behavior.
e.convertToNoDocument(rt.min());}/**
 * A mutation that verifies the existence of the document at the given key with
 * the provided precondition.
 *
 * The `verify` operation is only used in Transactions, and this class serves
 * primarily to facilitate serialization into protos.
 */(t,e);}/**
 * If this mutation is not idempotent, returns the base value to persist with
 * this mutation. If a base value is returned, the mutation is always applied
 * to this base value, even if document has already been updated.
 *
 * The base value is a sparse object that consists of only the document
 * fields for which this mutation contains a non-idempotent transformation
 * (e.g. a numeric increment). The provided value guarantees consistent
 * behavior for non-idempotent transforms and allow us to return the same
 * latency-compensated value even if the backend has already applied the
 * mutation. The base value is null for idempotent mutations, as they can be
 * re-played even if the backend has already applied them.
 *
 * @returns a base value to store along with the mutation, or null for
 * idempotent mutations.
 */function Xe(t,e){var n=null;var _iterator14=_createForOfIteratorHelper(t.fieldTransforms),_step14;try{for(_iterator14.s();!(_step14=_iterator14.n()).done;){var s=_step14.value;var _t17=e.data.field(s.field),i=$e(s.transform,_t17||null);null!=i&&(null==n&&(n=Ut.empty()),n.set(s.field,i));}}catch(err){_iterator14.e(err);}finally{_iterator14.f();}return n||null;}function Ze(t,e){return t.type===e.type&&!!t.key.isEqual(e.key)&&!!t.precondition.isEqual(e.precondition)&&!!function(t,e){return void 0===t&&void 0===e||!(!t||!e)&&nt(t,e,function(t,e){return Qe(t,e);});}(t.fieldTransforms,e.fieldTransforms)&&(0/* Set */===t.type?t.value.isEqual(e.value):1/* Patch */!==t.type||t.data.isEqual(e.data)&&t.fieldMask.isEqual(e.fieldMask));}/**
 * Returns the version from the given document for use as the result of a
 * mutation. Mutations are defined to return the version of the base document
 * only if it is an existing document. Deleted and unknown documents have a
 * post-mutation version of SnapshotVersion.min().
 */function tn(t){return t.isFoundDocument()?t.version:rt.min();}/**
 * A mutation that creates or replaces the document at the given key with the
 * object value contents.
 */var en=/*#__PURE__*/function(_He){_inherits(en,_He);var _super16=_createSuper$1(en);function en(t,e,n){var _this16;var s=arguments.length>3&&arguments[3]!==undefined?arguments[3]:[];_classCallCheck(this,en);_this16=_super16.call(this),_this16.key=t,_this16.value=e,_this16.precondition=n,_this16.fieldTransforms=s,_this16.type=0/* Set */;return _this16;}return en;}(He);var nn=/*#__PURE__*/function(_He2){_inherits(nn,_He2);var _super17=_createSuper$1(nn);function nn(t,e,n,s){var _this17;var i=arguments.length>4&&arguments[4]!==undefined?arguments[4]:[];_classCallCheck(this,nn);_this17=_super17.call(this),_this17.key=t,_this17.data=e,_this17.fieldMask=n,_this17.precondition=s,_this17.fieldTransforms=i,_this17.type=1/* Patch */;return _this17;}return nn;}(He);function sn(t){var e=new Map();return t.fieldMask.fields.forEach(function(n){if(!n.isEmpty()){var s=t.data.field(n);e.set(n,s);}}),e;}/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use after a mutation
 * containing transforms has been acknowledged by the server.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param mutableDocument - The current state of the document after applying all
 * previous mutations.
 * @param serverTransformResults - The transform results received by the server.
 * @returns The transform results list.
 */function rn(t,e,n){var s=new Map();B(t.length===n.length);for(var i=0;i<n.length;i++){var r=t[i],o=r.transform,c=e.data.field(r.field);s.set(r.field,ke(o,c,n[i]));}return s;}/**
 * Creates a list of "transform results" (a transform result is a field value
 * representing the result of applying a transform) for use when applying a
 * transform locally.
 *
 * @param fieldTransforms - The field transforms to apply the result to.
 * @param localWriteTime - The local time of the mutation (used to
 *     generate ServerTimestampValues).
 * @param mutableDocument - The current state of the document after applying all
 *     previous mutations.
 * @returns The transform results list.
 */function on(t,e,n){var s=new Map();var _iterator15=_createForOfIteratorHelper(t),_step15;try{for(_iterator15.s();!(_step15=_iterator15.n()).done;){var i=_step15.value;var _t18=i.transform,r=n.data.field(i.field);s.set(i.field,xe(_t18,r,e));}}catch(err){_iterator15.e(err);}finally{_iterator15.f();}return s;}/** A mutation that deletes the document at the given key. */var cn=/*#__PURE__*/function(_He3){_inherits(cn,_He3);var _super18=_createSuper$1(cn);function cn(t,e){var _this18;_classCallCheck(this,cn);_this18=_super18.call(this),_this18.key=t,_this18.precondition=e,_this18.type=2/* Delete */,_this18.fieldTransforms=[];return _this18;}return cn;}(He);var an=/*#__PURE__*/function(_He4){_inherits(an,_He4);var _super19=_createSuper$1(an);function an(t,e){var _this19;_classCallCheck(this,an);_this19=_super19.call(this),_this19.key=t,_this19.precondition=e,_this19.type=3/* Verify */,_this19.fieldTransforms=[];return _this19;}return an;}(He);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var un=// TODO(b/33078163): just use simplest form of existence filter for now
function un(t){_classCallCheck(this,un);this.count=t;};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Error Codes describing the different ways GRPC can fail. These are copied
 * directly from GRPC's sources here:
 *
 * https://github.com/grpc/grpc/blob/bceec94ea4fc5f0085d81235d8e1c06798dc341a/include/grpc%2B%2B/impl/codegen/status_code_enum.h
 *
 * Important! The names of these identifiers matter because the string forms
 * are used for reverse lookups from the webchannel stream. Do NOT change the
 * names of these identifiers or change this into a const enum.
 */var hn,ln;/**
 * Determines whether an error code represents a permanent error when received
 * in response to a non-write operation.
 *
 * See isPermanentWriteError for classifying write errors.
 */function fn(t){switch(t){default:return L();case K.CANCELLED:case K.UNKNOWN:case K.DEADLINE_EXCEEDED:case K.RESOURCE_EXHAUSTED:case K.INTERNAL:case K.UNAVAILABLE:// Unauthenticated means something went wrong with our token and we need
// to retry with new credentials which will happen automatically.
case K.UNAUTHENTICATED:return !1;case K.INVALID_ARGUMENT:case K.NOT_FOUND:case K.ALREADY_EXISTS:case K.PERMISSION_DENIED:case K.FAILED_PRECONDITION:// Aborted might be retried in some scenarios, but that is dependant on
// the context and should handled individually by the calling code.
// See https://cloud.google.com/apis/design/errors.
case K.ABORTED:case K.OUT_OF_RANGE:case K.UNIMPLEMENTED:case K.DATA_LOSS:return !0;}}/**
 * Determines whether an error code represents a permanent error when received
 * in response to a write operation.
 *
 * Write operations must be handled specially because as of b/119437764, ABORTED
 * errors on the write stream should be retried too (even though ABORTED errors
 * are not generally retryable).
 *
 * Note that during the initial handshake on the write stream an ABORTED error
 * signals that we should discard our stream token (i.e. it is permanent). This
 * means a handshake error should be classified with isPermanentError, above.
 */ /**
 * Maps an error Code from GRPC status code number, like 0, 1, or 14. These
 * are not the same as HTTP status codes.
 *
 * @returns The Code equivalent to the given GRPC status code. Fails if there
 *     is no match.
 */function dn(t){if(void 0===t)// This shouldn't normally happen, but in certain error cases (like trying
// to send invalid proto messages) we may get an error with no GRPC code.
return O("GRPC error has no .code"),K.UNKNOWN;switch(t){case hn.OK:return K.OK;case hn.CANCELLED:return K.CANCELLED;case hn.UNKNOWN:return K.UNKNOWN;case hn.DEADLINE_EXCEEDED:return K.DEADLINE_EXCEEDED;case hn.RESOURCE_EXHAUSTED:return K.RESOURCE_EXHAUSTED;case hn.INTERNAL:return K.INTERNAL;case hn.UNAVAILABLE:return K.UNAVAILABLE;case hn.UNAUTHENTICATED:return K.UNAUTHENTICATED;case hn.INVALID_ARGUMENT:return K.INVALID_ARGUMENT;case hn.NOT_FOUND:return K.NOT_FOUND;case hn.ALREADY_EXISTS:return K.ALREADY_EXISTS;case hn.PERMISSION_DENIED:return K.PERMISSION_DENIED;case hn.FAILED_PRECONDITION:return K.FAILED_PRECONDITION;case hn.ABORTED:return K.ABORTED;case hn.OUT_OF_RANGE:return K.OUT_OF_RANGE;case hn.UNIMPLEMENTED:return K.UNIMPLEMENTED;case hn.DATA_LOSS:return K.DATA_LOSS;default:return L();}}/**
 * Converts an HTTP response's error status to the equivalent error code.
 *
 * @param status - An HTTP error response status ("FAILED_PRECONDITION",
 * "UNKNOWN", etc.)
 * @returns The equivalent Code. Non-matching responses are mapped to
 *     Code.UNKNOWN.
 */(ln=hn||(hn={}))[ln.OK=0]="OK",ln[ln.CANCELLED=1]="CANCELLED",ln[ln.UNKNOWN=2]="UNKNOWN",ln[ln.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",ln[ln.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",ln[ln.NOT_FOUND=5]="NOT_FOUND",ln[ln.ALREADY_EXISTS=6]="ALREADY_EXISTS",ln[ln.PERMISSION_DENIED=7]="PERMISSION_DENIED",ln[ln.UNAUTHENTICATED=16]="UNAUTHENTICATED",ln[ln.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",ln[ln.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",ln[ln.ABORTED=10]="ABORTED",ln[ln.OUT_OF_RANGE=11]="OUT_OF_RANGE",ln[ln.UNIMPLEMENTED=12]="UNIMPLEMENTED",ln[ln.INTERNAL=13]="INTERNAL",ln[ln.UNAVAILABLE=14]="UNAVAILABLE",ln[ln.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // An immutable sorted map implementation, based on a Left-leaning Red-Black
// tree.
var wn=/*#__PURE__*/function(){function wn(t,e){_classCallCheck(this,wn);this.comparator=t,this.root=e||mn.EMPTY;}// Returns a copy of the map, with the specified key/value added or replaced.
_createClass(wn,[{key:"insert",value:function insert(t,e){return new wn(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,mn.BLACK,null,null));}// Returns a copy of the map, with the specified key removed.
},{key:"remove",value:function remove(t){return new wn(this.comparator,this.root.remove(t,this.comparator).copy(null,null,mn.BLACK,null,null));}// Returns the value of the node with the given key, or null.
},{key:"get",value:function get(t){var e=this.root;for(;!e.isEmpty();){var n=this.comparator(t,e.key);if(0===n)return e.value;n<0?e=e.left:n>0&&(e=e.right);}return null;}// Returns the index of the element in this sorted map, or -1 if it doesn't
// exist.
},{key:"indexOf",value:function indexOf(t){// Number of nodes that were pruned when descending right
var e=0,n=this.root;for(;!n.isEmpty();){var s=this.comparator(t,n.key);if(0===s)return e+n.left.size;s<0?n=n.left:(// Count all nodes left of the node plus the node itself
e+=n.left.size+1,n=n.right);}// Node not found
return -1;}},{key:"isEmpty",value:function isEmpty(){return this.root.isEmpty();}// Returns the total number of nodes in the map.
},{key:"size",get:function get(){return this.root.size;}// Returns the minimum key in the map.
},{key:"minKey",value:function minKey(){return this.root.minKey();}// Returns the maximum key in the map.
},{key:"maxKey",value:function maxKey(){return this.root.maxKey();}// Traverses the map in key order and calls the specified action function
// for each key/value pair. If action returns true, traversal is aborted.
// Returns the first truthy value returned by action, or the last falsey
// value returned by action.
},{key:"inorderTraversal",value:function inorderTraversal(t){return this.root.inorderTraversal(t);}},{key:"forEach",value:function forEach(t){this.inorderTraversal(function(e,n){return t(e,n),!1;});}},{key:"toString",value:function toString(){var t=[];return this.inorderTraversal(function(e,n){return t.push("".concat(e,":").concat(n)),!1;}),"{".concat(t.join(", "),"}");}// Traverses the map in reverse key order and calls the specified action
// function for each key/value pair. If action returns true, traversal is
// aborted.
// Returns the first truthy value returned by action, or the last falsey
// value returned by action.
},{key:"reverseTraversal",value:function reverseTraversal(t){return this.root.reverseTraversal(t);}// Returns an iterator over the SortedMap.
},{key:"getIterator",value:function getIterator(){return new _n(this.root,null,this.comparator,!1);}},{key:"getIteratorFrom",value:function getIteratorFrom(t){return new _n(this.root,t,this.comparator,!1);}},{key:"getReverseIterator",value:function getReverseIterator(){return new _n(this.root,null,this.comparator,!0);}},{key:"getReverseIteratorFrom",value:function getReverseIteratorFrom(t){return new _n(this.root,t,this.comparator,!0);}}]);return wn;}();// end SortedMap
// An iterator over an LLRBNode.
var _n=/*#__PURE__*/function(){function _n(t,e,n,s){_classCallCheck(this,_n);this.isReverse=s,this.nodeStack=[];var i=1;for(;!t.isEmpty();){if(i=e?n(t.key,e):1,// flip the comparison if we're going in reverse
s&&(i*=-1),i<0)// This node is less than our start key. ignore it
t=this.isReverse?t.left:t.right;else {if(0===i){// This node is exactly equal to our start key. Push it on the stack,
// but stop iterating;
this.nodeStack.push(t);break;}// This node is greater than our start key, add it to the stack and move
// to the next one
this.nodeStack.push(t),t=this.isReverse?t.right:t.left;}}}_createClass(_n,[{key:"getNext",value:function getNext(){var t=this.nodeStack.pop();var e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();){this.nodeStack.push(t),t=t.right;}else for(t=t.right;!t.isEmpty();){this.nodeStack.push(t),t=t.left;}return e;}},{key:"hasNext",value:function hasNext(){return this.nodeStack.length>0;}},{key:"peek",value:function peek(){if(0===this.nodeStack.length)return null;var t=this.nodeStack[this.nodeStack.length-1];return {key:t.key,value:t.value};}}]);return _n;}();// end SortedMapIterator
// Represents a node in a Left-leaning Red-Black tree.
var mn=/*#__PURE__*/function(){function mn(t,e,n,s,i){_classCallCheck(this,mn);this.key=t,this.value=e,this.color=null!=n?n:mn.RED,this.left=null!=s?s:mn.EMPTY,this.right=null!=i?i:mn.EMPTY,this.size=this.left.size+1+this.right.size;}// Returns a copy of the current node, optionally replacing pieces of it.
_createClass(mn,[{key:"copy",value:function copy(t,e,n,s,i){return new mn(null!=t?t:this.key,null!=e?e:this.value,null!=n?n:this.color,null!=s?s:this.left,null!=i?i:this.right);}},{key:"isEmpty",value:function isEmpty(){return !1;}// Traverses the tree in key order and calls the specified action function
// for each node. If action returns true, traversal is aborted.
// Returns the first truthy value returned by action, or the last falsey
// value returned by action.
},{key:"inorderTraversal",value:function inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t);}// Traverses the tree in reverse key order and calls the specified action
// function for each node. If action returns true, traversal is aborted.
// Returns the first truthy value returned by action, or the last falsey
// value returned by action.
},{key:"reverseTraversal",value:function reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t);}// Returns the minimum node in the tree.
},{key:"min",value:function min(){return this.left.isEmpty()?this:this.left.min();}// Returns the maximum key in the tree.
},{key:"minKey",value:function minKey(){return this.min().key;}// Returns the maximum key in the tree.
},{key:"maxKey",value:function maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey();}// Returns new tree, with the key/value added.
},{key:"insert",value:function insert(t,e,n){var s=this;var i=n(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,n),null):0===i?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,n)),s.fixUp();}},{key:"removeMin",value:function removeMin(){if(this.left.isEmpty())return mn.EMPTY;var t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp();}// Returns new tree, with the specified item removed.
},{key:"remove",value:function remove(t,e){var n,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else {if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),0===e(t,s.key)){if(s.right.isEmpty())return mn.EMPTY;n=s.right.min(),s=s.copy(n.key,n.value,null,null,s.right.removeMin());}s=s.copy(null,null,null,null,s.right.remove(t,e));}return s.fixUp();}},{key:"isRed",value:function isRed(){return this.color;}// Returns new tree after performing any needed rotations.
},{key:"fixUp",value:function fixUp(){var t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t;}},{key:"moveRedLeft",value:function moveRedLeft(){var t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t;}},{key:"moveRedRight",value:function moveRedRight(){var t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t;}},{key:"rotateLeft",value:function rotateLeft(){var t=this.copy(null,null,mn.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null);}},{key:"rotateRight",value:function rotateRight(){var t=this.copy(null,null,mn.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t);}},{key:"colorFlip",value:function colorFlip(){var t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e);}// For testing.
},{key:"checkMaxDepth",value:function checkMaxDepth(){var t=this.check();return Math.pow(2,t)<=this.size+1;}// In a balanced RB tree, the black-depth (number of black nodes) from root to
// leaves is equal on both sides.  This function verifies that or asserts.
},{key:"check",value:function check(){if(this.isRed()&&this.left.isRed())throw L();if(this.right.isRed())throw L();var t=this.left.check();if(t!==this.right.check())throw L();return t+(this.isRed()?0:1);}}]);return mn;}();// end LLRBNode
// Empty node is shared between all LLRB trees.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
mn.EMPTY=null,mn.RED=!0,mn.BLACK=!1;// end LLRBEmptyNode
mn.EMPTY=new(/*#__PURE__*/ // Represents an empty node (a leaf node in the Red-Black Tree).
function(){function _class2(){_classCallCheck(this,_class2);this.size=0;}_createClass(_class2,[{key:"key",get:function get(){throw L();}},{key:"value",get:function get(){throw L();}},{key:"color",get:function get(){throw L();}},{key:"left",get:function get(){throw L();}},{key:"right",get:function get(){throw L();}// Returns a copy of the current node.
},{key:"copy",value:function copy(t,e,n,s,i){return this;}// Returns a copy of the tree, with the specified key/value added.
},{key:"insert",value:function insert(t,e,n){return new mn(t,e);}// Returns a copy of the tree, with the specified key removed.
},{key:"remove",value:function remove(t,e){return this;}},{key:"isEmpty",value:function isEmpty(){return !0;}},{key:"inorderTraversal",value:function inorderTraversal(t){return !1;}},{key:"reverseTraversal",value:function reverseTraversal(t){return !1;}},{key:"minKey",value:function minKey(){return null;}},{key:"maxKey",value:function maxKey(){return null;}},{key:"isRed",value:function isRed(){return !1;}// For testing.
},{key:"checkMaxDepth",value:function checkMaxDepth(){return !0;}},{key:"check",value:function check(){return 0;}}]);return _class2;}())();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * SortedSet is an immutable (copy-on-write) collection that holds elements
 * in order specified by the provided comparator.
 *
 * NOTE: if provided comparator returns 0 for two elements, we consider them to
 * be equal!
 */var gn=/*#__PURE__*/function(){function gn(t){_classCallCheck(this,gn);this.comparator=t,this.data=new wn(this.comparator);}_createClass(gn,[{key:"has",value:function has(t){return null!==this.data.get(t);}},{key:"first",value:function first(){return this.data.minKey();}},{key:"last",value:function last(){return this.data.maxKey();}},{key:"size",get:function get(){return this.data.size;}},{key:"indexOf",value:function indexOf(t){return this.data.indexOf(t);}/** Iterates elements in order defined by "comparator" */},{key:"forEach",value:function forEach(t){this.data.inorderTraversal(function(e,n){return t(e),!1;});}/** Iterates over `elem`s such that: range[0] &lt;= elem &lt; range[1]. */},{key:"forEachInRange",value:function forEachInRange(t,e){var n=this.data.getIteratorFrom(t[0]);for(;n.hasNext();){var s=n.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key);}}/**
     * Iterates over `elem`s such that: start &lt;= elem until false is returned.
     */},{key:"forEachWhile",value:function forEachWhile(t,e){var n;for(n=void 0!==e?this.data.getIteratorFrom(e):this.data.getIterator();n.hasNext();){if(!t(n.getNext().key))return;}}/** Finds the least element greater than or equal to `elem`. */},{key:"firstAfterOrEqual",value:function firstAfterOrEqual(t){var e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null;}},{key:"getIterator",value:function getIterator(){return new yn(this.data.getIterator());}},{key:"getIteratorFrom",value:function getIteratorFrom(t){return new yn(this.data.getIteratorFrom(t));}/** Inserts or updates an element */},{key:"add",value:function add(t){return this.copy(this.data.remove(t).insert(t,!0));}/** Deletes an element */},{key:"delete",value:function _delete(t){return this.has(t)?this.copy(this.data.remove(t)):this;}},{key:"isEmpty",value:function isEmpty(){return this.data.isEmpty();}},{key:"unionWith",value:function unionWith(t){var e=this;// Make sure `result` always refers to the larger one of the two sets.
return e.size<t.size&&(e=t,t=this),t.forEach(function(t){e=e.add(t);}),e;}},{key:"isEqual",value:function isEqual(t){if(!(t instanceof gn))return !1;if(this.size!==t.size)return !1;var e=this.data.getIterator(),n=t.data.getIterator();for(;e.hasNext();){var _t19=e.getNext().key,s=n.getNext().key;if(0!==this.comparator(_t19,s))return !1;}return !0;}},{key:"toArray",value:function toArray(){var t=[];return this.forEach(function(e){t.push(e);}),t;}},{key:"toString",value:function toString(){var t=[];return this.forEach(function(e){return t.push(e);}),"SortedSet("+t.toString()+")";}},{key:"copy",value:function copy(t){var e=new gn(this.comparator);return e.data=t,e;}}]);return gn;}();var yn=/*#__PURE__*/function(){function yn(t){_classCallCheck(this,yn);this.iter=t;}_createClass(yn,[{key:"getNext",value:function getNext(){return this.iter.getNext().key;}},{key:"hasNext",value:function hasNext(){return this.iter.hasNext();}}]);return yn;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var pn=new wn(Pt.comparator);function Tn(){return pn;}var En=new wn(Pt.comparator);function In(){return En;}var An=new wn(Pt.comparator);function Rn(){return An;}var bn=new gn(Pt.comparator);function Pn(){var e=bn;for(var _len5=arguments.length,t=new Array(_len5),_key5=0;_key5<_len5;_key5++){t[_key5]=arguments[_key5];}for(var _i3=0,_t20=t;_i3<_t20.length;_i3++){var n=_t20[_i3];e=e.add(n);}return e;}var vn=new gn(et);function Vn(){return vn;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An event from the RemoteStore. It is split into targetChanges (changes to the
 * state or the set of documents in our watched targets) and documentUpdates
 * (changes to the actual documents).
 */var Sn=/*#__PURE__*/function(){function Sn(/**
     * The snapshot version this event brings us up to, or MIN if not set.
     */t,/**
     * A map from target to changes to the target. See TargetChange.
     */e,/**
     * A set of targets that is known to be inconsistent. Listens for these
     * targets should be re-established without resume tokens.
     */n,/**
     * A set of which documents have changed or been deleted, along with the
     * doc's new values (if not deleted).
     */s,/**
     * A set of which document updates are due only to limbo resolution targets.
     */i){_classCallCheck(this,Sn);this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=n,this.documentUpdates=s,this.resolvedLimboDocuments=i;}/**
     * HACK: Views require RemoteEvents in order to determine whether the view is
     * CURRENT, but secondary tabs don't receive remote events. So this method is
     * used to create a synthesized RemoteEvent that can be used to apply a
     * CURRENT status change to a View, for queries executed in a different tab.
     */ // PORTING NOTE: Multi-tab only
_createClass(Sn,null,[{key:"createSynthesizedRemoteEventForCurrentChange",value:function createSynthesizedRemoteEventForCurrentChange(t,e){var n=new Map();return n.set(t,Dn.createSynthesizedTargetChangeForCurrentChange(t,e)),new Sn(rt.min(),n,Vn(),Tn(),Pn());}}]);return Sn;}();/**
 * A TargetChange specifies the set of changes for a specific target as part of
 * a RemoteEvent. These changes track which documents are added, modified or
 * removed, as well as the target's resume token and whether the target is
 * marked CURRENT.
 * The actual changes *to* documents are not part of the TargetChange since
 * documents may be part of multiple targets.
 */var Dn=/*#__PURE__*/function(){function Dn(/**
     * An opaque, server-assigned token that allows watching a query to be resumed
     * after disconnecting without retransmitting all the data that matches the
     * query. The resume token essentially identifies a point in time from which
     * the server should resume sending results.
     */t,/**
     * The "current" (synced) status of this target. Note that "current"
     * has special meaning in the RPC protocol that implies that a target is
     * both up-to-date and consistent with the rest of the watch stream.
     */e,/**
     * The set of documents that were newly assigned to this target as part of
     * this remote event.
     */n,/**
     * The set of documents that were already assigned to this target but received
     * an update during this remote event.
     */s,/**
     * The set of documents that were removed from this target as part of this
     * remote event.
     */i){_classCallCheck(this,Dn);this.resumeToken=t,this.current=e,this.addedDocuments=n,this.modifiedDocuments=s,this.removedDocuments=i;}/**
     * This method is used to create a synthesized TargetChanges that can be used to
     * apply a CURRENT status change to a View (for queries executed in a different
     * tab) or for new queries (to raise snapshots with correct CURRENT status).
     */_createClass(Dn,null,[{key:"createSynthesizedTargetChangeForCurrentChange",value:function createSynthesizedTargetChangeForCurrentChange(t,e){return new Dn(_t.EMPTY_BYTE_STRING,e,Pn(),Pn(),Pn());}}]);return Dn;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Represents a changed document and a list of target ids to which this change
 * applies.
 *
 * If document has been deleted NoDocument will be provided.
 */var Cn=function Cn(/** The new document applies to all of these targets. */t,/** The new document is removed from all of these targets. */e,/** The key of the document for this change. */n,/**
     * The new document or NoDocument if it was deleted. Is null if the
     * document went out of view without the server sending a new document.
     */s){_classCallCheck(this,Cn);this.k=t,this.removedTargetIds=e,this.key=n,this.$=s;};var Nn=function Nn(t,e){_classCallCheck(this,Nn);this.targetId=t,this.O=e;};var xn=function xn(/** What kind of change occurred to the watch target. */t,/** The target IDs that were added/removed/set. */e){var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:_t.EMPTY_BYTE_STRING;var s=arguments.length>3&&arguments[3]!==undefined?arguments[3]:null;_classCallCheck(this,xn);this.state=t,this.targetIds=e,this.resumeToken=n,this.cause=s;};/** Tracks the internal state of a Watch target. */var kn=/*#__PURE__*/function(){function kn(){_classCallCheck(this,kn);/**
         * The number of pending responses (adds or removes) that we are waiting on.
         * We only consider targets active that have no pending responses.
         */this.F=0,/**
         * Keeps track of the document changes since the last raised snapshot.
         *
         * These changes are continuously updated as we receive document updates and
         * always reflect the current set of changes against the last issued snapshot.
         */this.M=Fn(),/** See public getters for explanations of these fields. */this.L=_t.EMPTY_BYTE_STRING,this.B=!1,/**
         * Whether this target state should be included in the next snapshot. We
         * initialize to true so that newly-added targets are included in the next
         * RemoteEvent.
         */this.U=!0;}/**
     * Whether this target has been marked 'current'.
     *
     * 'Current' has special meaning in the RPC protocol: It implies that the
     * Watch backend has sent us all changes up to the point at which the target
     * was added and that the target is consistent with the rest of the watch
     * stream.
     */_createClass(kn,[{key:"current",get:function get(){return this.B;}/** The last resume token sent to us for this target. */},{key:"resumeToken",get:function get(){return this.L;}/** Whether this target has pending target adds or target removes. */},{key:"q",get:function get(){return 0!==this.F;}/** Whether we have modified any state that should trigger a snapshot. */},{key:"K",get:function get(){return this.U;}/**
     * Applies the resume token to the TargetChange, but only when it has a new
     * value. Empty resumeTokens are discarded.
     */},{key:"j",value:function j(t){t.approximateByteSize()>0&&(this.U=!0,this.L=t);}/**
     * Creates a target change from the current set of changes.
     *
     * To reset the document changes after raising this snapshot, call
     * `clearPendingChanges()`.
     */},{key:"W",value:function W(){var t=Pn(),e=Pn(),n=Pn();return this.M.forEach(function(s,i){switch(i){case 0/* Added */:t=t.add(s);break;case 2/* Modified */:e=e.add(s);break;case 1/* Removed */:n=n.add(s);break;default:L();}}),new Dn(this.L,this.B,t,e,n);}/**
     * Resets the document changes and sets `hasPendingChanges` to false.
     */},{key:"G",value:function G(){this.U=!1,this.M=Fn();}},{key:"H",value:function H(t,e){this.U=!0,this.M=this.M.insert(t,e);}},{key:"J",value:function J(t){this.U=!0,this.M=this.M.remove(t);}},{key:"Y",value:function Y(){this.F+=1;}},{key:"X",value:function X(){this.F-=1;}},{key:"Z",value:function Z(){this.U=!0,this.B=!0;}}]);return kn;}();/**
 * A helper class to accumulate watch changes into a RemoteEvent.
 */var $n=/*#__PURE__*/function(){function $n(t){_classCallCheck(this,$n);this.tt=t,/** The internal state of all tracked targets. */this.et=new Map(),/** Keeps track of the documents to update since the last raised snapshot. */this.nt=Tn(),/** A mapping of document keys to their set of target IDs. */this.st=On(),/**
         * A list of targets with existence filter mismatches. These targets are
         * known to be inconsistent and their listens needs to be re-established by
         * RemoteStore.
         */this.it=new gn(et);}/**
     * Processes and adds the DocumentWatchChange to the current set of changes.
     */_createClass($n,[{key:"rt",value:function rt(t){var _iterator16=_createForOfIteratorHelper(t.k),_step16;try{for(_iterator16.s();!(_step16=_iterator16.n()).done;){var e=_step16.value;t.$&&t.$.isFoundDocument()?this.ot(e,t.$):this.ct(e,t.key,t.$);}}catch(err){_iterator16.e(err);}finally{_iterator16.f();}var _iterator17=_createForOfIteratorHelper(t.removedTargetIds),_step17;try{for(_iterator17.s();!(_step17=_iterator17.n()).done;){var _e11=_step17.value;this.ct(_e11,t.key,t.$);}}catch(err){_iterator17.e(err);}finally{_iterator17.f();}}/** Processes and adds the WatchTargetChange to the current set of changes. */},{key:"at",value:function at(t){var _this20=this;this.forEachTarget(t,function(e){var n=_this20.ut(e);switch(t.state){case 0/* NoChange */:_this20.ht(e)&&n.j(t.resumeToken);break;case 1/* Added */:// We need to decrement the number of pending acks needed from watch
// for this targetId.
n.X(),n.q||// We have a freshly added target, so we need to reset any state
// that we had previously. This can happen e.g. when remove and add
// back a target for existence filter mismatches.
n.G(),n.j(t.resumeToken);break;case 2/* Removed */:// We need to keep track of removed targets to we can post-filter and
// remove any target changes.
// We need to decrement the number of pending acks needed from watch
// for this targetId.
n.X(),n.q||_this20.removeTarget(e);break;case 3/* Current */:_this20.ht(e)&&(n.Z(),n.j(t.resumeToken));break;case 4/* Reset */:_this20.ht(e)&&(// Reset the target and synthesizes removes for all existing
// documents. The backend will re-add any documents that still
// match the target before it sends the next global snapshot.
_this20.lt(e),n.j(t.resumeToken));break;default:L();}});}/**
     * Iterates over all targetIds that the watch change applies to: either the
     * targetIds explicitly listed in the change or the targetIds of all currently
     * active targets.
     */},{key:"forEachTarget",value:function forEachTarget(t,e){var _this21=this;t.targetIds.length>0?t.targetIds.forEach(e):this.et.forEach(function(t,n){_this21.ht(n)&&e(n);});}/**
     * Handles existence filters and synthesizes deletes for filter mismatches.
     * Targets that are invalidated by filter mismatches are added to
     * `pendingTargetResets`.
     */},{key:"ft",value:function ft(t){var e=t.targetId,n=t.O.count,s=this.dt(e);if(s){var _t21=s.target;if(Ht(_t21)){if(0===n){// The existence filter told us the document does not exist. We deduce
// that this document does not exist and apply a deleted document to
// our updates. Without applying this deleted document there might be
// another query that will raise this document as part of a snapshot
// until it is resolved, essentially exposing inconsistency between
// queries.
var _n8=new Pt(_t21.path);this.ct(e,_n8,Kt.newNoDocument(_n8,rt.min()));}else B(1===n);}else {this.wt(e)!==n&&(// Existence filter mismatch: We reset the mapping and raise a new
// snapshot with `isFromCache:true`.
this.lt(e),this.it=this.it.add(e));}}}/**
     * Converts the currently accumulated state into a remote event at the
     * provided snapshot version. Resets the accumulated changes before returning.
     */},{key:"_t",value:function _t(t){var _this22=this;var e=new Map();this.et.forEach(function(n,s){var i=_this22.dt(s);if(i){if(n.current&&Ht(i.target)){// Document queries for document that don't exist can produce an empty
// result set. To update our local cache, we synthesize a document
// delete if we have not previously received the document. This
// resolves the limbo state of the document, removing it from
// limboDocumentRefs.
// TODO(dimond): Ideally we would have an explicit lookup target
// instead resulting in an explicit delete message and we could
// remove this special logic.
var _e12=new Pt(i.target.path);null!==_this22.nt.get(_e12)||_this22.gt(s,_e12)||_this22.ct(s,_e12,Kt.newNoDocument(_e12,t));}n.K&&(e.set(s,n.W()),n.G());}});var n=Pn();// We extract the set of limbo-only document updates as the GC logic
// special-cases documents that do not appear in the target cache.
// TODO(gsoltis): Expand on this comment once GC is available in the JS
// client.
this.st.forEach(function(t,e){var s=!0;e.forEachWhile(function(t){var e=_this22.dt(t);return !e||2/* LimboResolution */===e.purpose||(s=!1,!1);}),s&&(n=n.add(t));});var s=new Sn(t,e,this.it,this.nt,n);return this.nt=Tn(),this.st=On(),this.it=new gn(et),s;}/**
     * Adds the provided document to the internal list of document updates and
     * its document key to the given target's mapping.
     */ // Visible for testing.
},{key:"ot",value:function ot(t,e){if(!this.ht(t))return;var n=this.gt(t,e.key)?2/* Modified */:0/* Added */;this.ut(t).H(e.key,n),this.nt=this.nt.insert(e.key,e),this.st=this.st.insert(e.key,this.yt(e.key).add(t));}/**
     * Removes the provided document from the target mapping. If the
     * document no longer matches the target, but the document's state is still
     * known (e.g. we know that the document was deleted or we received the change
     * that caused the filter mismatch), the new document can be provided
     * to update the remote document cache.
     */ // Visible for testing.
},{key:"ct",value:function ct(t,e,n){if(!this.ht(t))return;var s=this.ut(t);this.gt(t,e)?s.H(e,1/* Removed */):// The document may have entered and left the target before we raised a
// snapshot, so we can just ignore the change.
s.J(e),this.st=this.st.insert(e,this.yt(e)["delete"](t)),n&&(this.nt=this.nt.insert(e,n));}},{key:"removeTarget",value:function removeTarget(t){this.et["delete"](t);}/**
     * Returns the current count of documents in the target. This includes both
     * the number of documents that the LocalStore considers to be part of the
     * target as well as any accumulated changes.
     */},{key:"wt",value:function wt(t){var e=this.ut(t).W();return this.tt.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size;}/**
     * Increment the number of acks needed from watch before we can consider the
     * server to be 'in-sync' with the client's active targets.
     */},{key:"Y",value:function Y(t){this.ut(t).Y();}},{key:"ut",value:function ut(t){var e=this.et.get(t);return e||(e=new kn(),this.et.set(t,e)),e;}},{key:"yt",value:function yt(t){var e=this.st.get(t);return e||(e=new gn(et),this.st=this.st.insert(t,e)),e;}/**
     * Verifies that the user is still interested in this target (by calling
     * `getTargetDataForTarget()`) and that we are not waiting for pending ADDs
     * from watch.
     */},{key:"ht",value:function ht(t){var e=null!==this.dt(t);return e||$("WatchChangeAggregator","Detected inactive target",t),e;}/**
     * Returns the TargetData for an active target (i.e. a target that the user
     * is still interested in that has no outstanding target change requests).
     */},{key:"dt",value:function dt(t){var e=this.et.get(t);return e&&e.q?null:this.tt.Tt(t);}/**
     * Resets the state of a Watch target to its initial state (e.g. sets
     * 'current' to false, clears the resume token and removes its target mapping
     * from all documents).
     */},{key:"lt",value:function lt(t){var _this23=this;this.et.set(t,new kn());this.tt.getRemoteKeysForTarget(t).forEach(function(e){_this23.ct(t,e,/*updatedDocument=*/null);});}/**
     * Returns whether the LocalStore considers the document to be part of the
     * specified target.
     */},{key:"gt",value:function gt(t,e){return this.tt.getRemoteKeysForTarget(t).has(e);}}]);return $n;}();function On(){return new wn(Pt.comparator);}function Fn(){return new wn(Pt.comparator);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Mn=function(){var t={asc:"ASCENDING",desc:"DESCENDING"};return t;}(),Ln=function(){var t={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS","in":"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"};return t;}();/**
 * This class generates JsonObject values for the Datastore API suitable for
 * sending to either GRPC stub methods or via the JSON/HTTP REST API.
 *
 * The serializer supports both Protobuf.js and Proto3 JSON formats. By
 * setting `useProto3Json` to true, the serializer will use the Proto3 JSON
 * format.
 *
 * For a description of the Proto3 JSON format check
 * https://developers.google.com/protocol-buffers/docs/proto3#json
 *
 * TODO(klimt): We can remove the databaseId argument if we keep the full
 * resource name in documents.
 */var Bn=function Bn(t,e){_classCallCheck(this,Bn);this.databaseId=t,this.D=e;};/**
 * Returns a value for a Date that's appropriate to put into a proto.
 */function Un(t,e){if(t.D){return "".concat(new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z",""),".").concat(("000000000"+e.nanoseconds).slice(-9),"Z");}return {seconds:""+e.seconds,nanos:e.nanoseconds};}/**
 * Returns a value for bytes that's appropriate to put in a proto.
 *
 * Visible for testing.
 */function qn(t,e){return t.D?e.toBase64():e.toUint8Array();}/**
 * Returns a ByteString based on the proto string value.
 */function Kn(t,e){return Un(t,e.toTimestamp());}function jn(t){return B(!!t),rt.fromTimestamp(function(t){var e=gt(t);return new it(e.seconds,e.nanos);}(t));}function Qn(t,e){return function(t){return new ht(["projects",t.projectId,"databases",t.database]);}(t).child("documents").child(e).canonicalString();}function Wn(t){var e=ht.fromString(t);return B(Ts(e)),e;}function Gn(t,e){return Qn(t.databaseId,e.path);}function _zn(t,e){var n=Wn(e);if(n.get(1)!==t.databaseId.projectId)throw new j(K.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+n.get(1)+" vs "+t.databaseId.projectId);if(n.get(3)!==t.databaseId.database)throw new j(K.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+n.get(3)+" vs "+t.databaseId.database);return new Pt(Xn(n));}function Hn(t,e){return Qn(t.databaseId,e);}function Jn(t){var e=Wn(t);// In v1beta1 queries for collections at the root did not have a trailing
// "/documents". In v1 all resource paths contain "/documents". Preserve the
// ability to read the v1beta1 form for compatibility with queries persisted
// in the local target cache.
return 4===e.length?ht.emptyPath():Xn(e);}function Yn(t){return new ht(["projects",t.databaseId.projectId,"databases",t.databaseId.database]).canonicalString();}function Xn(t){return B(t.length>4&&"documents"===t.get(4)),t.popFirst(5);}/** Creates a Document proto from key and fields (but no create/update time) */function Zn(t,e,n){return {name:Gn(t,e),fields:n.value.mapValue.fields};}function ns(t,e){var n;if("targetChange"in e){e.targetChange;// proto3 default value is unset in JSON (undefined), so use 'NO_CHANGE'
// if unset
var s=function(t){return "NO_CHANGE"===t?0/* NoChange */:"ADD"===t?1/* Added */:"REMOVE"===t?2/* Removed */:"CURRENT"===t?3/* Current */:"RESET"===t?4/* Reset */:L();}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],r=function(t,e){return t.D?(B(void 0===e||"string"==typeof e),_t.fromBase64String(e||"")):(B(void 0===e||e instanceof Uint8Array),_t.fromUint8Array(e||new Uint8Array()));}(t,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&function(t){var e=void 0===t.code?K.UNKNOWN:dn(t.code);return new j(e,t.message||"");}/**
 * Returns a value for a number (or null) that's appropriate to put into
 * a google.protobuf.Int32Value proto.
 * DO NOT USE THIS FOR ANYTHING ELSE.
 * This method cheats. It's typed as returning "number" because that's what
 * our generated proto interfaces say Int32Value must be. But GRPC actually
 * expects a { value: <number> } struct.
 */(o);n=new xn(s,i,r,c||null);}else if("documentChange"in e){e.documentChange;var _s2=e.documentChange;_s2.document,_s2.document.name,_s2.document.updateTime;var _i4=_zn(t,_s2.document.name),_r2=jn(_s2.document.updateTime),_o2=new Ut({mapValue:{fields:_s2.document.fields}}),_c2=Kt.newFoundDocument(_i4,_r2,_o2),a=_s2.targetIds||[],u=_s2.removedTargetIds||[];n=new Cn(a,u,_c2.key,_c2);}else if("documentDelete"in e){e.documentDelete;var _s3=e.documentDelete;_s3.document;var _i5=_zn(t,_s3.document),_r3=_s3.readTime?jn(_s3.readTime):rt.min(),_o3=Kt.newNoDocument(_i5,_r3),_c3=_s3.removedTargetIds||[];n=new Cn([],_c3,_o3.key,_o3);}else if("documentRemove"in e){e.documentRemove;var _s4=e.documentRemove;_s4.document;var _i6=_zn(t,_s4.document),_r4=_s4.removedTargetIds||[];n=new Cn([],_r4,_i6,null);}else {if(!("filter"in e))return L();{e.filter;var _t22=e.filter;_t22.targetId;var _s5=_t22.count||0,_i7=new un(_s5),_r5=_t22.targetId;n=new Nn(_r5,_i7);}}return n;}function ss(t,e){var n;if(e instanceof en)n={update:Zn(t,e.key,e.value)};else if(e instanceof cn)n={"delete":Gn(t,e.key)};else if(e instanceof nn)n={update:Zn(t,e.key,e.data),updateMask:ps(e.fieldMask)};else {if(!(e instanceof an))return L();n={verify:Gn(t,e.key)};}return e.fieldTransforms.length>0&&(n.updateTransforms=e.fieldTransforms.map(function(t){return function(t,e){var n=e.transform;if(n instanceof Oe)return {fieldPath:e.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(n instanceof Fe)return {fieldPath:e.field.canonicalString(),appendMissingElements:{values:n.elements}};if(n instanceof Le)return {fieldPath:e.field.canonicalString(),removeAllFromArray:{values:n.elements}};if(n instanceof Ue)return {fieldPath:e.field.canonicalString(),increment:n.C};throw L();}(0,t);})),e.precondition.isNone||(n.currentDocument=function(t,e){return void 0!==e.updateTime?{updateTime:Kn(t,e.updateTime)}:void 0!==e.exists?{exists:e.exists}:L();}(t,e.precondition)),n;}function rs(t,e){return t&&t.length>0?(B(void 0!==e),t.map(function(t){return function(t,e){// NOTE: Deletes don't have an updateTime.
var n=t.updateTime?jn(t.updateTime):jn(e);return n.isEqual(rt.min())&&(// The Firestore Emulator currently returns an update time of 0 for
// deletes of non-existing documents (rather than null). This breaks the
// test "get deleted doc while offline with source=cache" as NoDocuments
// with version 0 are filtered by IndexedDb's RemoteDocumentCache.
// TODO(#2149): Remove this when Emulator is fixed
n=jn(e)),new We(n,t.transformResults||[]);}(t,e);})):[];}function os(t,e){return {documents:[Hn(t,e.path)]};}function cs(t,e){// Dissect the path into parent, collectionId, and optional key filter.
var n={structuredQuery:{}},s=e.path;null!==e.collectionGroup?(n.parent=Hn(t,s),n.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(n.parent=Hn(t,s.popLast()),n.structuredQuery.from=[{collectionId:s.lastSegment()}]);var i=function(t){if(0===t.length)return;var e=t.map(function(t){return(// visible for testing
function(t){if("=="/* EQUAL */===t.op){if(Mt(t.value))return {unaryFilter:{field:_s(t.field),op:"IS_NAN"}};if(Ft(t.value))return {unaryFilter:{field:_s(t.field),op:"IS_NULL"}};}else if("!="/* NOT_EQUAL */===t.op){if(Mt(t.value))return {unaryFilter:{field:_s(t.field),op:"IS_NOT_NAN"}};if(Ft(t.value))return {unaryFilter:{field:_s(t.field),op:"IS_NOT_NULL"}};}return {fieldFilter:{field:_s(t.field),op:ws(t.op),value:t.value}};}(t));});if(1===e.length)return e[0];return {compositeFilter:{op:"AND",filters:e}};}(e.filters);i&&(n.structuredQuery.where=i);var r=function(t){if(0===t.length)return;return t.map(function(t){return(// visible for testing
function(t){return {field:_s(t.field),direction:ds(t.dir)};}(t));});}(e.orderBy);r&&(n.structuredQuery.orderBy=r);var o=function(t,e){return t.D||At(e)?e:{value:e};}/**
 * Returns a number (or null) from a google.protobuf.Int32Value proto.
 */(t,e.limit);return null!==o&&(n.structuredQuery.limit=o),e.startAt&&(n.structuredQuery.startAt=ls(e.startAt)),e.endAt&&(n.structuredQuery.endAt=ls(e.endAt)),n;}function as(t){var e=Jn(t.parent);var n=t.structuredQuery,s=n.from?n.from.length:0;var i=null;if(s>0){B(1===s);var _t26=n.from[0];_t26.allDescendants?i=_t26.collectionId:e=e.child(_t26.collectionId);}var r=[];n.where&&(r=hs(n.where));var o=[];n.orderBy&&(o=n.orderBy.map(function(t){return function(t){return new ae(ms(t.field),// visible for testing
function(t){switch(t){case"ASCENDING":return "asc"/* ASCENDING */;case"DESCENDING":return "desc"/* DESCENDING */;default:return;}}// visible for testing
(t.direction));}(t);}));var c=null;n.limit&&(c=function(t){var e;return e="object"==_typeof(t)?t.value:t,At(e)?null:e;}(n.limit));var a=null;n.startAt&&(a=fs(n.startAt));var u=null;return n.endAt&&(u=fs(n.endAt)),de(e,i,o,r,c,"F"/* First */,a,u);}function us(t,e){var n=function(t,e){switch(e){case 0/* Listen */:return null;case 1/* ExistenceFilterMismatch */:return "existence-filter-mismatch";case 2/* LimboResolution */:return "limbo-document";default:return L();}}(0,e.purpose);return null==n?null:{"goog-listen-tags":n};}function hs(t){return t?void 0!==t.unaryFilter?[ys(t)]:void 0!==t.fieldFilter?[gs(t)]:void 0!==t.compositeFilter?t.compositeFilter.filters.map(function(t){return hs(t);}).reduce(function(t,e){return t.concat(e);}):L():[];}function ls(t){return {before:t.before,values:t.position};}function fs(t){var e=!!t.before,n=t.values||[];return new oe(n,e);}// visible for testing
function ds(t){return Mn[t];}function ws(t){return Ln[t];}function _s(t){return {fieldPath:t.canonicalString()};}function ms(t){return ft.fromServerFormat(t.fieldPath);}function gs(t){return Jt.create(ms(t.fieldFilter.field),function(t){switch(t){case"EQUAL":return "=="/* EQUAL */;case"NOT_EQUAL":return "!="/* NOT_EQUAL */;case"GREATER_THAN":return ">"/* GREATER_THAN */;case"GREATER_THAN_OR_EQUAL":return ">="/* GREATER_THAN_OR_EQUAL */;case"LESS_THAN":return "<"/* LESS_THAN */;case"LESS_THAN_OR_EQUAL":return "<="/* LESS_THAN_OR_EQUAL */;case"ARRAY_CONTAINS":return "array-contains"/* ARRAY_CONTAINS */;case"IN":return "in"/* IN */;case"NOT_IN":return "not-in"/* NOT_IN */;case"ARRAY_CONTAINS_ANY":return "array-contains-any"/* ARRAY_CONTAINS_ANY */;default:return L();}}(t.fieldFilter.op),t.fieldFilter.value);}function ys(t){switch(t.unaryFilter.op){case"IS_NAN":var e=ms(t.unaryFilter.field);return Jt.create(e,"=="/* EQUAL */,{doubleValue:NaN});case"IS_NULL":var n=ms(t.unaryFilter.field);return Jt.create(n,"=="/* EQUAL */,{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":var s=ms(t.unaryFilter.field);return Jt.create(s,"!="/* NOT_EQUAL */,{doubleValue:NaN});case"IS_NOT_NULL":var i=ms(t.unaryFilter.field);return Jt.create(i,"!="/* NOT_EQUAL */,{nullValue:"NULL_VALUE"});default:return L();}}function ps(t){var e=[];return t.fields.forEach(function(t){return e.push(t.canonicalString());}),{fieldPaths:e};}function Ts(t){// Resource names have at least 4 components (project ID, database ID)
return t.length>=4&&"projects"===t.get(0)&&"databases"===t.get(2);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Encodes a resource path into a IndexedDb-compatible string form.
 */function Es(t){var e="";for(var n=0;n<t.length;n++){e.length>0&&(e=As(e)),e=Is(t.get(n),e);}return As(e);}/** Encodes a single segment of a resource path into the given result */function Is(t,e){var n=e;var s=t.length;for(var _e13=0;_e13<s;_e13++){var _s8=t.charAt(_e13);switch(_s8){case"\0":n+="";break;case"":n+="";break;default:n+=_s8;}}return n;}/** Encodes a path separator into the given result */function As(t){return t+"";}/**
 * An object to be stored in the 'documentMutations' store in IndexedDb.
 *
 * A manually maintained index of all the mutation batches that affect a given
 * document key. The rows in this table are references based on the contents of
 * DbMutationBatch.mutations.
 */var Ss=/*#__PURE__*/function(){function Ss(){_classCallCheck(this,Ss);}/**
     * Creates a [userId] key for use in the DbDocumentMutations index to iterate
     * over all of a user's document mutations.
     */_createClass(Ss,null,[{key:"prefixForUser",value:function prefixForUser(t){return [t];}/**
     * Creates a [userId, encodedPath] key for use in the DbDocumentMutations
     * index to iterate over all at document mutations for a given path or lower.
     */},{key:"prefixForPath",value:function prefixForPath(t,e){return [t,Es(e)];}/**
     * Creates a full index key of [userId, encodedPath, batchId] for inserting
     * and deleting into the DbDocumentMutations index.
     */},{key:"key",value:function key(t,e,n){return [t,Es(e),n];}}]);return Ss;}();Ss.store="documentMutations",/**
 * Because we store all the useful information for this store in the key,
 * there is no useful information to store as the value. The raw (unencoded)
 * path cannot be stored because IndexedDb doesn't store prototype
 * information.
 */Ss.PLACEHOLDER=new Ss();var qs="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";// V2 is no longer usable (see comment at top of file)
// Visible for testing
/**
 * A base class representing a persistence transaction, encapsulating both the
 * transaction's sequence numbers as well as a list of onCommitted listeners.
 *
 * When you call Persistence.runTransaction(), it will create a transaction and
 * pass it to your callback. You then pass it to any method that operates
 * on persistence.
 */var Ks=/*#__PURE__*/function(){function Ks(){_classCallCheck(this,Ks);this.onCommittedListeners=[];}_createClass(Ks,[{key:"addOnCommittedListener",value:function addOnCommittedListener(t){this.onCommittedListeners.push(t);}},{key:"raiseOnCommittedEvent",value:function raiseOnCommittedEvent(){this.onCommittedListeners.forEach(function(t){return t();});}}]);return Ks;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * PersistencePromise is essentially a re-implementation of Promise except
 * it has a .next() method instead of .then() and .next() and .catch() callbacks
 * are executed synchronously when a PersistencePromise resolves rather than
 * asynchronously (Promise implementations use setImmediate() or similar).
 *
 * This is necessary to interoperate with IndexedDB which will automatically
 * commit transactions if control is returned to the event loop without
 * synchronously initiating another operation on the transaction.
 *
 * NOTE: .then() and .catch() only allow a single consumer, unlike normal
 * Promises.
 */var js=/*#__PURE__*/function(){function js(t){var _this24=this;_classCallCheck(this,js);// NOTE: next/catchCallback will always point to our own wrapper functions,
// not the user's raw next() or catch() callbacks.
this.nextCallback=null,this.catchCallback=null,// When the operation resolves, we'll set result or error and mark isDone.
this.result=void 0,this.error=void 0,this.isDone=!1,// Set to true when .then() or .catch() are called and prevents additional
// chaining.
this.callbackAttached=!1,t(function(t){_this24.isDone=!0,_this24.result=t,_this24.nextCallback&&// value should be defined unless T is Void, but we can't express
// that in the type system.
_this24.nextCallback(t);},function(t){_this24.isDone=!0,_this24.error=t,_this24.catchCallback&&_this24.catchCallback(t);});}_createClass(js,[{key:"catch",value:function _catch(t){return this.next(void 0,t);}},{key:"next",value:function next(t,e){var _this25=this;return this.callbackAttached&&L(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new js(function(n,s){_this25.nextCallback=function(e){_this25.wrapSuccess(t,e).next(n,s);},_this25.catchCallback=function(t){_this25.wrapFailure(e,t).next(n,s);};});}},{key:"toPromise",value:function toPromise(){var _this26=this;return new Promise(function(t,e){_this26.next(t,e);});}},{key:"wrapUserFunction",value:function wrapUserFunction(t){try{var e=t();return e instanceof js?e:js.resolve(e);}catch(t){return js.reject(t);}}},{key:"wrapSuccess",value:function wrapSuccess(t,e){return t?this.wrapUserFunction(function(){return t(e);}):js.resolve(e);}},{key:"wrapFailure",value:function wrapFailure(t,e){return t?this.wrapUserFunction(function(){return t(e);}):js.reject(e);}}],[{key:"resolve",value:function resolve(t){return new js(function(e,n){e(t);});}},{key:"reject",value:function reject(t){return new js(function(e,n){n(t);});}},{key:"waitFor",value:function waitFor(// Accept all Promise types in waitFor().
// eslint-disable-next-line @typescript-eslint/no-explicit-any
t){return new js(function(e,n){var s=0,i=0,r=!1;t.forEach(function(t){++s,t.next(function(){++i,r&&i===s&&e();},function(t){return n(t);});}),r=!0,i===s&&e();});}/**
     * Given an array of predicate functions that asynchronously evaluate to a
     * boolean, implements a short-circuiting `or` between the results. Predicates
     * will be evaluated until one of them returns `true`, then stop. The final
     * result will be whether any of them returned `true`.
     */},{key:"or",value:function or(t){var e=js.resolve(!1);var _iterator18=_createForOfIteratorHelper(t),_step18;try{var _loop3=function _loop3(){var n=_step18.value;e=e.next(function(t){return t?js.resolve(t):n();});};for(_iterator18.s();!(_step18=_iterator18.n()).done;){_loop3();}}catch(err){_iterator18.e(err);}finally{_iterator18.f();}return e;}},{key:"forEach",value:function forEach(t,e){var _this27=this;var n=[];return t.forEach(function(t,s){n.push(e.call(_this27,t,s));}),this.waitFor(n);}}]);return js;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // References to `window` are guarded by SimpleDb.isAvailable()
/** Verifies whether `e` is an IndexedDbTransactionError. */function Hs(t){// Use name equality, as instanceof checks on errors don't work with errors
// that wrap other errors.
return "IndexedDbTransactionError"===t.name;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A batch of mutations that will be sent as one unit to the backend.
 */var ni=/*#__PURE__*/function(){/**
     * @param batchId - The unique ID of this mutation batch.
     * @param localWriteTime - The original write time of this mutation.
     * @param baseMutations - Mutations that are used to populate the base
     * values when this mutation is applied locally. This can be used to locally
     * overwrite values that are persisted in the remote document cache. Base
     * mutations are never sent to the backend.
     * @param mutations - The user-provided mutations in this mutation batch.
     * User-provided mutations are applied both locally and remotely on the
     * backend.
     */function ni(t,e,n,s){_classCallCheck(this,ni);this.batchId=t,this.localWriteTime=e,this.baseMutations=n,this.mutations=s;}/**
     * Applies all the mutations in this MutationBatch to the specified document
     * to compute the state of the remote document
     *
     * @param document - The document to apply mutations to.
     * @param batchResult - The result of applying the MutationBatch to the
     * backend.
     */_createClass(ni,[{key:"applyToRemoteDocument",value:function applyToRemoteDocument(t,e){var n=e.mutationResults;for(var _e17=0;_e17<this.mutations.length;_e17++){var s=this.mutations[_e17];if(s.key.isEqual(t.key)){Je(s,t,n[_e17]);}}}/**
     * Computes the local view of a document given all the mutations in this
     * batch.
     *
     * @param document - The document to apply mutations to.
     */},{key:"applyToLocalView",value:function applyToLocalView(t){// First, apply the base state. This allows us to apply non-idempotent
// transform against a consistent set of values.
var _iterator19=_createForOfIteratorHelper(this.baseMutations),_step19;try{for(_iterator19.s();!(_step19=_iterator19.n()).done;){var e=_step19.value;e.key.isEqual(t.key)&&Ye(e,t,this.localWriteTime);}// Second, apply all user-provided mutations.
}catch(err){_iterator19.e(err);}finally{_iterator19.f();}var _iterator20=_createForOfIteratorHelper(this.mutations),_step20;try{for(_iterator20.s();!(_step20=_iterator20.n()).done;){var _e18=_step20.value;_e18.key.isEqual(t.key)&&Ye(_e18,t,this.localWriteTime);}}catch(err){_iterator20.e(err);}finally{_iterator20.f();}}/**
     * Computes the local view for all provided documents given the mutations in
     * this batch.
     */},{key:"applyToLocalDocumentSet",value:function applyToLocalDocumentSet(t){var _this34=this;// TODO(mrschmidt): This implementation is O(n^2). If we apply the mutations
// directly (as done in `applyToLocalView()`), we can reduce the complexity
// to O(n).
this.mutations.forEach(function(e){var n=t.get(e.key),s=n;// TODO(mutabledocuments): This method should take a MutableDocumentMap
// and we should remove this cast.
_this34.applyToLocalView(s),n.isValidDocument()||s.convertToNoDocument(rt.min());});}},{key:"keys",value:function keys(){return this.mutations.reduce(function(t,e){return t.add(e.key);},Pn());}},{key:"isEqual",value:function isEqual(t){return this.batchId===t.batchId&&nt(this.mutations,t.mutations,function(t,e){return Ze(t,e);})&&nt(this.baseMutations,t.baseMutations,function(t,e){return Ze(t,e);});}}]);return ni;}();/** The result of applying a mutation batch to the backend. */var si=/*#__PURE__*/function(){function si(t,e,n,/**
     * A pre-computed mapping from each mutated document to the resulting
     * version.
     */s){_classCallCheck(this,si);this.batch=t,this.commitVersion=e,this.mutationResults=n,this.docVersions=s;}/**
     * Creates a new MutationBatchResult for the given batch and results. There
     * must be one result for each mutation in the batch. This static factory
     * caches a document=&gt;version mapping (docVersions).
     */_createClass(si,null,[{key:"from",value:function from(t,e,n){B(t.mutations.length===n.length);var s=Rn();var i=t.mutations;for(var _t29=0;_t29<i.length;_t29++){s=s.insert(i[_t29].key,n[_t29].version);}return new si(t,e,n,s);}}]);return si;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An immutable set of metadata that the local store tracks for each target.
 */var ii=/*#__PURE__*/function(){function ii(/** The target being listened to. */t,/**
     * The target ID to which the target corresponds; Assigned by the
     * LocalStore for user listens and by the SyncEngine for limbo watches.
     */e,/** The purpose of the target. */n,/**
     * The sequence number of the last transaction during which this target data
     * was modified.
     */s){var i=arguments.length>4&&arguments[4]!==undefined?arguments[4]:rt.min();var r=arguments.length>5&&arguments[5]!==undefined?arguments[5]:rt.min();var o=arguments.length>6&&arguments[6]!==undefined?arguments[6]:_t.EMPTY_BYTE_STRING;_classCallCheck(this,ii);this.target=t,this.targetId=e,this.purpose=n,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=r,this.resumeToken=o;}/** Creates a new target data instance with an updated sequence number. */_createClass(ii,[{key:"withSequenceNumber",value:function withSequenceNumber(t){return new ii(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken);}/**
     * Creates a new target data instance with an updated resume token and
     * snapshot version.
     */},{key:"withResumeToken",value:function withResumeToken(t,e){return new ii(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t);}/**
     * Creates a new target data instance with an updated last limbo free
     * snapshot version number.
     */},{key:"withLastLimboFreeSnapshotVersion",value:function withLastLimboFreeSnapshotVersion(t){return new ii(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken);}}]);return ii;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Serializer for values stored in the LocalStore. */var ri=function ri(t){_classCallCheck(this,ri);this.Wt=t;};/**
 * A helper function for figuring out what kind of query has been stored.
 */ /**
 * Encodes a `BundledQuery` from bundle proto to a Query object.
 *
 * This reconstructs the original query used to build the bundle being loaded,
 * including features exists only in SDKs (for example: limit-to-last).
 */function _i(t){var e=as({parent:t.parent,structuredQuery:t.structuredQuery});return "LAST"===t.limitType?Ie(e,e.limit,"L"/* Last */):e;}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An in-memory implementation of IndexManager.
 */var pi=/*#__PURE__*/function(){function pi(){_classCallCheck(this,pi);this.Gt=new Ti();}_createClass(pi,[{key:"addToCollectionParentIndex",value:function addToCollectionParentIndex(t,e){return this.Gt.add(e),js.resolve();}},{key:"getCollectionParents",value:function getCollectionParents(t,e){return js.resolve(this.Gt.getEntries(e));}}]);return pi;}();/**
 * Internal implementation of the collection-parent index exposed by MemoryIndexManager.
 * Also used for in-memory caching by IndexedDbIndexManager and initial index population
 * in indexeddb_schema.ts
 */var Ti=/*#__PURE__*/function(){function Ti(){_classCallCheck(this,Ti);this.index={};}// Returns false if the entry already existed.
_createClass(Ti,[{key:"add",value:function add(t){var e=t.lastSegment(),n=t.popLast(),s=this.index[e]||new gn(ht.comparator),i=!s.has(n);return this.index[e]=s.add(n),i;}},{key:"has",value:function has(t){var e=t.lastSegment(),n=t.popLast(),s=this.index[e];return s&&s.has(n);}},{key:"getEntries",value:function getEntries(t){return (this.index[t]||new gn(ht.comparator)).toArray();}}]);return Ti;}();var Ri=/*#__PURE__*/function(){function Ri(// When we attempt to collect, we will only do so if the cache size is greater than this
// threshold. Passing `COLLECTION_DISABLED` here will cause collection to always be skipped.
t,// The percentage of sequence numbers that we will attempt to collect
e,// A cap on the total number of sequence numbers that will be collected. This prevents
// us from collecting a huge number of sequence numbers if the cache has grown very large.
n){_classCallCheck(this,Ri);this.cacheSizeCollectionThreshold=t,this.percentileToCollect=e,this.maximumSequenceNumbersToCollect=n;}_createClass(Ri,null,[{key:"withCacheSize",value:function withCacheSize(t){return new Ri(t,Ri.DEFAULT_COLLECTION_PERCENTILE,Ri.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT);}}]);return Ri;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** A mutation queue for a specific user, backed by IndexedDB. */Ri.DEFAULT_COLLECTION_PERCENTILE=10,Ri.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Ri.DEFAULT=new Ri(41943040,Ri.DEFAULT_COLLECTION_PERCENTILE,Ri.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Ri.DISABLED=new Ri(-1,0,0);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /** Offset to ensure non-overlapping target ids. */ /**
 * Generates monotonically increasing target IDs for sending targets to the
 * watch stream.
 *
 * The client constructs two generators, one for the target cache, and one for
 * for the sync engine (to generate limbo documents targets). These
 * generators produce non-overlapping IDs (by using even and odd IDs
 * respectively).
 *
 * By separating the target ID space, the query cache can generate target IDs
 * that persist across client restarts, while sync engine can independently
 * generate in-memory target IDs that are transient and can be reused after a
 * restart.
 */var Ni=/*#__PURE__*/function(){function Ni(t){_classCallCheck(this,Ni);this.ne=t;}_createClass(Ni,[{key:"next",value:function next(){return this.ne+=2,this.ne;}}],[{key:"se",value:function se(){// The target cache generator must return '2' in its first call to `next()`
// as there is no differentiation in the protocol layer between an unset
// number and the number '0'. If we were to sent a target with target ID
// '0', the backend would consider it unset and replace it with its own ID.
return new Ni(0);}},{key:"ie",value:function ie(){// Sync engine assigns target IDs for limbo document detection.
return new Ni(-1);}}]);return Ni;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Verifies the error thrown by a LocalStore operation. If a LocalStore
 * operation fails because the primary lease has been taken by another client,
 * we ignore the error (the persistence layer will immediately call
 * `applyPrimaryLease` to propagate the primary state change). All other errors
 * are re-thrown.
 *
 * @param err - An error returned by a LocalStore operation.
 * @returns A Promise that resolves after we recovered, or the original error.
 */function Fi(_x6){return _Fi.apply(this,arguments);}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _Fi(){_Fi=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee70(t){return regenerator.wrap(function _callee70$(_context70){while(1){switch(_context70.prev=_context70.next){case 0:if(!(t.code!==K.FAILED_PRECONDITION||t.message!==qs)){_context70.next=2;break;}throw t;case 2:$("LocalStore","Unexpectedly lost primary lease");case 3:case"end":return _context70.stop();}}},_callee70);}));return _Fi.apply(this,arguments);}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A map implementation that uses objects as keys. Objects must have an
 * associated equals function and must be immutable. Entries in the map are
 * stored together with the key being produced from the mapKeyFn. This map
 * automatically handles collisions of keys.
 */var ji=/*#__PURE__*/function(){function ji(t,e){_classCallCheck(this,ji);this.mapKeyFn=t,this.equalsFn=e,/**
         * The inner map for a key/value pair. Due to the possibility of collisions we
         * keep a list of entries that we do a linear search through to find an actual
         * match. Note that collisions should be rare, so we still expect near
         * constant time lookups in practice.
         */this.inner={};}/** Get a value for this key, or undefined if it does not exist. */_createClass(ji,[{key:"get",value:function get(t){var e=this.mapKeyFn(t),n=this.inner[e];if(void 0!==n){var _iterator24=_createForOfIteratorHelper(n),_step24;try{for(_iterator24.s();!(_step24=_iterator24.n()).done;){var _step24$value=_slicedToArray(_step24.value,2),_e22=_step24$value[0],s=_step24$value[1];if(this.equalsFn(_e22,t))return s;}}catch(err){_iterator24.e(err);}finally{_iterator24.f();}}}},{key:"has",value:function has(t){return void 0!==this.get(t);}/** Put this key and value in the map. */},{key:"set",value:function set(t,e){var n=this.mapKeyFn(t),s=this.inner[n];if(void 0!==s){for(var _n16=0;_n16<s.length;_n16++){if(this.equalsFn(s[_n16][0],t))return void(s[_n16]=[t,e]);}s.push([t,e]);}else this.inner[n]=[[t,e]];}/**
     * Remove this key from the map. Returns a boolean if anything was deleted.
     */},{key:"delete",value:function _delete(t){var e=this.mapKeyFn(t),n=this.inner[e];if(void 0===n)return !1;for(var s=0;s<n.length;s++){if(this.equalsFn(n[s][0],t))return 1===n.length?delete this.inner[e]:n.splice(s,1),!0;}return !1;}},{key:"forEach",value:function forEach(t){ct(this.inner,function(e,n){var _iterator25=_createForOfIteratorHelper(n),_step25;try{for(_iterator25.s();!(_step25=_iterator25.n()).done;){var _step25$value=_slicedToArray(_step25.value,2),_e23=_step25$value[0],s=_step25$value[1];t(_e23,s);}}catch(err){_iterator25.e(err);}finally{_iterator25.f();}});}},{key:"isEmpty",value:function isEmpty(){return at(this.inner);}}]);return ji;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An in-memory buffer of entries to be written to a RemoteDocumentCache.
 * It can be used to batch up a set of changes to be written to the cache, but
 * additionally supports reading entries back with the `getEntry()` method,
 * falling back to the underlying RemoteDocumentCache if no entry is
 * buffered.
 *
 * Entries added to the cache *must* be read first. This is to facilitate
 * calculating the size delta of the pending changes.
 *
 * PORTING NOTE: This class was implemented then removed from other platforms.
 * If byte-counting ends up being needed on the other platforms, consider
 * porting this class as part of that implementation work.
 */var Qi=/*#__PURE__*/function(){function Qi(){_classCallCheck(this,Qi);// A mapping of document key to the new cache entry that should be written (or null if any
// existing cache entry should be removed).
this.changes=new ji(function(t){return t.toString();},function(t,e){return t.isEqual(e);}),this.changesApplied=!1;}_createClass(Qi,[{key:"getReadTime",value:function getReadTime(t){var e=this.changes.get(t);return e?e.readTime:rt.min();}/**
     * Buffers a `RemoteDocumentCache.addEntry()` call.
     *
     * You can only modify documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */},{key:"addEntry",value:function addEntry(t,e){this.assertNotApplied(),this.changes.set(t.key,{document:t,readTime:e});}/**
     * Buffers a `RemoteDocumentCache.removeEntry()` call.
     *
     * You can only remove documents that have already been retrieved via
     * `getEntry()/getEntries()` (enforced via IndexedDbs `apply()`).
     */},{key:"removeEntry",value:function removeEntry(t){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;this.assertNotApplied(),this.changes.set(t,{document:Kt.newInvalidDocument(t),readTime:e});}/**
     * Looks up an entry in the cache. The buffered changes will first be checked,
     * and if no buffered change applies, this will forward to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKey - The key of the entry to look up.
     * @returns The cached document or an invalid document if we have nothing
     * cached.
     */},{key:"getEntry",value:function getEntry(t,e){this.assertNotApplied();var n=this.changes.get(e);return void 0!==n?js.resolve(n.document):this.getFromCache(t,e);}/**
     * Looks up several entries in the cache, forwarding to
     * `RemoteDocumentCache.getEntry()`.
     *
     * @param transaction - The transaction in which to perform any persistence
     *     operations.
     * @param documentKeys - The keys of the entries to look up.
     * @returns A map of cached documents, indexed by key. If an entry cannot be
     *     found, the corresponding key will be mapped to an invalid document.
     */},{key:"getEntries",value:function getEntries(t,e){return this.getAllFromCache(t,e);}/**
     * Applies buffered changes to the underlying RemoteDocumentCache, using
     * the provided transaction.
     */},{key:"apply",value:function apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t);}/** Helper to assert this.changes is not null  */},{key:"assertNotApplied",value:function assertNotApplied(){}}]);return Qi;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A readonly view of the local state of all documents we're tracking (i.e. we
 * have a cached version in remoteDocumentCache or local mutations for the
 * document). The view is computed by applying the mutations in the
 * MutationQueue to the RemoteDocumentCache.
 */var rr=/*#__PURE__*/function(){function rr(t,e,n){_classCallCheck(this,rr);this.He=t,this.In=e,this.Ht=n;}/**
     * Get the local view of the document identified by `key`.
     *
     * @returns Local view of the document or null if we don't have any cached
     * state for it.
     */_createClass(rr,[{key:"An",value:function An(t,e){var _this89=this;return this.In.getAllMutationBatchesAffectingDocumentKey(t,e).next(function(n){return _this89.Rn(t,e,n);});}/** Internal version of `getDocument` that allows reusing batches. */},{key:"Rn",value:function Rn(t,e,n){return this.He.getEntry(t,e).next(function(t){var _iterator27=_createForOfIteratorHelper(n),_step27;try{for(_iterator27.s();!(_step27=_iterator27.n()).done;){var _e26=_step27.value;_e26.applyToLocalView(t);}}catch(err){_iterator27.e(err);}finally{_iterator27.f();}return t;});}// Returns the view of the given `docs` as they would appear after applying
// all mutations in the given `batches`.
},{key:"bn",value:function bn(t,e){t.forEach(function(t,n){var _iterator28=_createForOfIteratorHelper(e),_step28;try{for(_iterator28.s();!(_step28=_iterator28.n()).done;){var _t44=_step28.value;_t44.applyToLocalView(n);}}catch(err){_iterator28.e(err);}finally{_iterator28.f();}});}/**
     * Gets the local view of the documents identified by `keys`.
     *
     * If we don't have cached state for a document in `keys`, a NoDocument will
     * be stored for that key in the resulting set.
     */},{key:"Pn",value:function Pn(t,e){var _this90=this;return this.He.getEntries(t,e).next(function(e){return _this90.vn(t,e).next(function(){return e;});});}/**
     * Applies the local view the given `baseDocs` without retrieving documents
     * from the local store.
     */},{key:"vn",value:function vn(t,e){var _this91=this;return this.In.getAllMutationBatchesAffectingDocumentKeys(t,e).next(function(t){return _this91.bn(e,t);});}/**
     * Performs a query against the local view of all documents.
     *
     * @param transaction - The persistence transaction.
     * @param query - The query to match documents against.
     * @param sinceReadTime - If not set to SnapshotVersion.min(), return only
     *     documents that have been read since this snapshot version (exclusive).
     */},{key:"getDocumentsMatchingQuery",value:function getDocumentsMatchingQuery(t,e,n){/**
 * Returns whether the query matches a single document by path (rather than a
 * collection).
 */return function(t){return Pt.isDocumentKey(t.path)&&null===t.collectionGroup&&0===t.filters.length;}(e)?this.Vn(t,e.path):pe(e)?this.Sn(t,e,n):this.Dn(t,e,n);}},{key:"Vn",value:function Vn(t,e){// Just do a simple document lookup.
return this.An(t,new Pt(e)).next(function(t){var e=In();return t.isFoundDocument()&&(e=e.insert(t.key,t)),e;});}},{key:"Sn",value:function Sn(t,e,n){var _this92=this;var s=e.collectionGroup;var i=In();return this.Ht.getCollectionParents(t,s).next(function(r){return js.forEach(r,function(r){var o=function(t,e){return new fe(e,/*collectionGroup=*/null,t.explicitOrderBy.slice(),t.filters.slice(),t.limit,t.limitType,t.startAt,t.endAt);}/**
 * Returns true if this query does not specify any query constraints that
 * could remove results.
 */(e,r.child(s));return _this92.Dn(t,o,n).next(function(t){t.forEach(function(t,e){i=i.insert(t,e);});});}).next(function(){return i;});});}},{key:"Dn",value:function Dn(t,e,n){var _this93=this;// Query the remote documents and overlay mutations.
var s,i;return this.He.getDocumentsMatchingQuery(t,e,n).next(function(n){return s=n,_this93.In.getAllMutationBatchesAffectingQuery(t,e);}).next(function(e){return i=e,_this93.Cn(t,i,s).next(function(t){s=t;var _iterator29=_createForOfIteratorHelper(i),_step29;try{for(_iterator29.s();!(_step29=_iterator29.n()).done;){var _t45=_step29.value;var _iterator30=_createForOfIteratorHelper(_t45.mutations),_step30;try{for(_iterator30.s();!(_step30=_iterator30.n()).done;){var _e27=_step30.value;var _n18=_e27.key;var _i8=s.get(_n18);null==_i8&&(// Create invalid document to apply mutations on top of
_i8=Kt.newInvalidDocument(_n18),s=s.insert(_n18,_i8)),Ye(_e27,_i8,_t45.localWriteTime),_i8.isFoundDocument()||(s=s.remove(_n18));}}catch(err){_iterator30.e(err);}finally{_iterator30.f();}}}catch(err){_iterator29.e(err);}finally{_iterator29.f();}});}).next(function(){return(// Finally, filter out any documents that don't actually match
// the query.
s.forEach(function(t,n){Pe(e,n)||(s=s.remove(t));}),s);});}},{key:"Cn",value:function Cn(t,e,n){var s=Pn();var _iterator31=_createForOfIteratorHelper(e),_step31;try{for(_iterator31.s();!(_step31=_iterator31.n()).done;){var _t46=_step31.value;var _iterator32=_createForOfIteratorHelper(_t46.mutations),_step32;try{for(_iterator32.s();!(_step32=_iterator32.n()).done;){var _e28=_step32.value;_e28 instanceof nn&&null===n.get(_e28.key)&&(s=s.add(_e28.key));}}catch(err){_iterator32.e(err);}finally{_iterator32.f();}}}catch(err){_iterator31.e(err);}finally{_iterator31.f();}var i=n;return this.He.getEntries(t,s).next(function(t){return t.forEach(function(t,e){e.isFoundDocument()&&(i=i.insert(t,e));}),i;});}}]);return rr;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A set of changes to what documents are currently in view and out of view for
 * a given query. These changes are sent to the LocalStore by the View (via
 * the SyncEngine) and are used to pin / unpin documents as appropriate.
 */var or=/*#__PURE__*/function(){function or(t,e,n,s){_classCallCheck(this,or);this.targetId=t,this.fromCache=e,this.Nn=n,this.xn=s;}_createClass(or,null,[{key:"kn",value:function kn(t,e){var n=Pn(),s=Pn();var _iterator33=_createForOfIteratorHelper(e.docChanges),_step33;try{for(_iterator33.s();!(_step33=_iterator33.n()).done;){var _t47=_step33.value;switch(_t47.type){case 0/* Added */:n=n.add(_t47.doc.key);break;case 1/* Removed */:s=s.add(_t47.doc.key);// do nothing
}}}catch(err){_iterator33.e(err);}finally{_iterator33.f();}return new or(t,e.fromCache,n,s);}}]);return or;}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A query engine that takes advantage of the target document mapping in the
 * QueryCache. Query execution is optimized by only reading the documents that
 * previously matched a query plus any documents that were edited after the
 * query was last listened to.
 *
 * There are some cases when this optimization is not guaranteed to produce
 * the same results as full collection scans. In these cases, query
 * processing falls back to full scans. These cases are:
 *
 * - Limit queries where a document that matched the query previously no longer
 *   matches the query.
 *
 * - Limit queries where a document edit may cause the document to sort below
 *   another document that is in the local cache.
 *
 * - Queries that have never been CURRENT or free of limbo documents.
 */var cr=/*#__PURE__*/function(){function cr(){_classCallCheck(this,cr);}_createClass(cr,[{key:"$n",value:/** Sets the document view to query against. */function $n(t){this.On=t;}/** Returns all local documents matching the specified query. */},{key:"getDocumentsMatchingQuery",value:function getDocumentsMatchingQuery(t,e,n,s){var _this94=this;// Queries that match all documents don't benefit from using
// key-based lookups. It is more efficient to scan all documents in a
// collection, rather than to perform individual lookups.
return function(t){return 0===t.filters.length&&null===t.limit&&null==t.startAt&&null==t.endAt&&(0===t.explicitOrderBy.length||1===t.explicitOrderBy.length&&t.explicitOrderBy[0].field.isKeyField());}(e)||n.isEqual(rt.min())?this.Fn(t,e):this.On.Pn(t,s).next(function(i){var r=_this94.Mn(e,i);return (_e(e)||me(e))&&_this94.Ln(e.limitType,r,s,n)?_this94.Fn(t,e):(x()<=LogLevel.DEBUG&&$("QueryEngine","Re-using previous result from %s to execute query: %s",n.toString(),be(e)),_this94.On.getDocumentsMatchingQuery(t,e,n).next(function(t){return(// We merge `previousResults` into `updateResults`, since
// `updateResults` is already a DocumentMap. If a document is
// contained in both lists, then its contents are the same.
r.forEach(function(e){t=t.insert(e.key,e);}),t);}));});// Queries that have never seen a snapshot without limbo free documents
// should also be run as a full collection scan.
}/** Applies the query filter and sorting to the provided documents.  */},{key:"Mn",value:function Mn(t,e){// Sort the documents and re-apply the query filter since previously
// matching documents do not necessarily still match the query.
var n=new gn(ve(t));return e.forEach(function(e,s){Pe(t,s)&&(n=n.add(s));}),n;}/**
     * Determines if a limit query needs to be refilled from cache, making it
     * ineligible for index-free execution.
     *
     * @param sortedPreviousResults - The documents that matched the query when it
     * was last synchronized, sorted by the query's comparator.
     * @param remoteKeys - The document keys that matched the query at the last
     * snapshot.
     * @param limboFreeSnapshotVersion - The version of the snapshot when the
     * query was last synchronized.
     */},{key:"Ln",value:function Ln(t,e,n,s){// The query needs to be refilled if a previously matching document no
// longer matches.
if(n.size!==e.size)return !0;// Limit queries are not eligible for index-free query execution if there is
// a potential that an older document from cache now sorts before a document
// that was previously part of the limit. This, however, can only happen if
// the document at the edge of the limit goes out of limit.
// If a document that is not the limit boundary sorts differently,
// the boundary of the limit itself did not change and documents from cache
// will continue to be "rejected" by this boundary. Therefore, we can ignore
// any modifications that don't affect the last document.
var i="F"/* First */===t?e.last():e.first();return !!i&&(i.hasPendingWrites||i.version.compareTo(s)>0);}},{key:"Fn",value:function Fn(t,e){return x()<=LogLevel.DEBUG&&$("QueryEngine","Using full collection scan to execute query:",be(e)),this.On.getDocumentsMatchingQuery(t,e,rt.min());}}]);return cr;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Implements `LocalStore` interface.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */var ar=/*#__PURE__*/function(){function ar(/** Manages our in-memory or durable persistence. */t,e,n,s){_classCallCheck(this,ar);this.persistence=t,this.Bn=e,this.N=s,/**
         * Maps a targetID to data about its target.
         *
         * PORTING NOTE: We are using an immutable data structure on Web to make re-runs
         * of `applyRemoteEvent()` idempotent.
         */this.Un=new wn(et),/** Maps a target to its targetID. */ // TODO(wuandy): Evaluate if TargetId can be part of Target.
this.qn=new ji(function(t){return Wt(t);},zt),/**
         * The read time of the last entry processed by `getNewDocumentChanges()`.
         *
         * PORTING NOTE: This is only used for multi-tab synchronization.
         */this.Kn=rt.min(),this.In=t.getMutationQueue(n),this.jn=t.getRemoteDocumentCache(),this.ze=t.getTargetCache(),this.Qn=new rr(this.jn,this.In,this.persistence.getIndexManager()),this.Je=t.getBundleCache(),this.Bn.$n(this.Qn);}_createClass(ar,[{key:"collectGarbage",value:function collectGarbage(t){var _this95=this;return this.persistence.runTransaction("Collect garbage","readwrite-primary",function(e){return t.collect(e,_this95.Un);});}}]);return ar;}();function ur(/** Manages our in-memory or durable persistence. */t,e,n,s){return new ar(t,e,n,s);}/**
 * Tells the LocalStore that the currently authenticated user has changed.
 *
 * In response the local store switches the mutation queue to the new user and
 * returns any resulting document changes.
 */ // PORTING NOTE: Android and iOS only return the documents affected by the
// change.
function hr(_x9,_x10){return _hr.apply(this,arguments);}/* Accepts locally generated Mutations and commit them to storage. */ /**
 * Acknowledges the given batch.
 *
 * On the happy path when a batch is acknowledged, the local store will
 *
 *  + remove the batch from the mutation queue;
 *  + apply the changes to the remote document cache;
 *  + recalculate the latency compensated view implied by those changes (there
 *    may be mutations in the queue that affect the documents but haven't been
 *    acknowledged yet); and
 *  + give the changed documents back the sync engine
 *
 * @returns The resulting (modified) documents.
 */function _hr(){_hr=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee71(t,e){var n,s,i,r;return regenerator.wrap(function _callee71$(_context71){while(1){switch(_context71.prev=_context71.next){case 0:n=q(t);s=n.In,i=n.Qn;_context71.next=4;return n.persistence.runTransaction("Handle user change","readonly",function(t){// Swap out the mutation queue, grabbing the pending mutation batches
// before and after.
var r;return n.In.getAllMutationBatches(t).next(function(o){return r=o,s=n.persistence.getMutationQueue(e),// Recreate our LocalDocumentsView using the new
// MutationQueue.
i=new rr(n.jn,s,n.persistence.getIndexManager()),s.getAllMutationBatches(t);}).next(function(e){var n=[],s=[];// Union the old/new changed keys.
// Union the old/new changed keys.
var o=Pn();var _iterator58=_createForOfIteratorHelper(r),_step58;try{for(_iterator58.s();!(_step58=_iterator58.n()).done;){var _t85=_step58.value;n.push(_t85.batchId);var _iterator60=_createForOfIteratorHelper(_t85.mutations),_step60;try{for(_iterator60.s();!(_step60=_iterator60.n()).done;){var _e44=_step60.value;o=o.add(_e44.key);}}catch(err){_iterator60.e(err);}finally{_iterator60.f();}}}catch(err){_iterator58.e(err);}finally{_iterator58.f();}var _iterator59=_createForOfIteratorHelper(e),_step59;try{for(_iterator59.s();!(_step59=_iterator59.n()).done;){var _t86=_step59.value;s.push(_t86.batchId);var _iterator61=_createForOfIteratorHelper(_t86.mutations),_step61;try{for(_iterator61.s();!(_step61=_iterator61.n()).done;){var _e45=_step61.value;o=o.add(_e45.key);}}catch(err){_iterator61.e(err);}finally{_iterator61.f();}}// Return the set of all (potentially) changed documents and the list
// of mutation batch IDs that were affected by change.
}catch(err){_iterator59.e(err);}finally{_iterator59.f();}// Return the set of all (potentially) changed documents and the list
// of mutation batch IDs that were affected by change.
// Return the set of all (potentially) changed documents and the list
// of mutation batch IDs that were affected by change.
return i.Pn(t,o).next(function(t){return {Wn:t,removedBatchIds:n,addedBatchIds:s};});});});case 4:r=_context71.sent;return _context71.abrupt("return",(n.In=s,n.Qn=i,n.Bn.$n(n.Qn),r));case 6:case"end":return _context71.stop();}}},_callee71);}));return _hr.apply(this,arguments);}function lr(t,e){var n=q(t);return n.persistence.runTransaction("Acknowledge batch","readwrite-primary",function(t){var s=e.batch.keys(),i=n.jn.newChangeBuffer({trackRemovals:!0});return function(t,e,n,s){var i=n.batch,r=i.keys();var o=js.resolve();return r.forEach(function(t){o=o.next(function(){return s.getEntry(e,t);}).next(function(e){var r=n.docVersions.get(t);B(null!==r),e.version.compareTo(r)<0&&(i.applyToRemoteDocument(e,n),e.isValidDocument()&&// We use the commitVersion as the readTime rather than the
// document's updateTime since the updateTime is not advanced
// for updates that do not modify the underlying document.
s.addEntry(e,n.commitVersion));});}),o.next(function(){return t.In.removeMutationBatch(e,i);});}/** Returns the local view of the documents affected by a mutation batch. */ // PORTING NOTE: Multi-Tab only.
(n,t,e,i).next(function(){return i.apply(t);}).next(function(){return n.In.performConsistencyCheck(t);}).next(function(){return n.Qn.Pn(t,s);});});}/**
 * Removes mutations from the MutationQueue for the specified batch;
 * LocalDocuments will be recalculated.
 *
 * @returns The resulting modified documents.
 */ /**
 * Returns the last consistent snapshot processed (used by the RemoteStore to
 * determine whether to buffer incoming snapshots from the backend).
 */function fr(t){var e=q(t);return e.persistence.runTransaction("Get last remote snapshot version","readonly",function(t){return e.ze.getLastRemoteSnapshotVersion(t);});}/**
 * Updates the "ground-state" (remote) documents. We assume that the remote
 * event reflects any write batches that have been acknowledged or rejected
 * (i.e. we do not re-apply local mutations to updates from this event).
 *
 * LocalDocuments are re-calculated if there are remaining mutations in the
 * queue.
 */function dr(t,e){var n=q(t),s=e.snapshotVersion;var i=n.Un;return n.persistence.runTransaction("Apply remote event","readwrite-primary",function(t){var r=n.jn.newChangeBuffer({trackRemovals:!0});// Reset newTargetDataByTargetMap in case this transaction gets re-run.
i=n.Un;var o=[];e.targetChanges.forEach(function(e,r){var c=i.get(r);if(!c)return;// Only update the remote keys if the target is still active. This
// ensures that we can persist the updated target data along with
// the updated assignment.
o.push(n.ze.removeMatchingKeys(t,e.removedDocuments,r).next(function(){return n.ze.addMatchingKeys(t,e.addedDocuments,r);}));var a=e.resumeToken;// Update the resume token if the change includes one.
if(a.approximateByteSize()>0){var u=c.withResumeToken(a,s).withSequenceNumber(t.currentSequenceNumber);i=i.insert(r,u),// Update the target data if there are target changes (or if
// sufficient time has passed since the last update).
/**
 * Returns true if the newTargetData should be persisted during an update of
 * an active target. TargetData should always be persisted when a target is
 * being released and should not call this function.
 *
 * While the target is active, TargetData updates can be omitted when nothing
 * about the target has changed except metadata like the resume token or
 * snapshot version. Occasionally it's worth the extra write to prevent these
 * values from getting too stale after a crash, but this doesn't have to be
 * too frequent.
 */function(t,e,n){// Always persist target data if we don't already have a resume token.
if(B(e.resumeToken.approximateByteSize()>0),0===t.resumeToken.approximateByteSize())return !0;// Don't allow resume token changes to be buffered indefinitely. This
// allows us to be reasonably up-to-date after a crash and avoids needing
// to loop over all active queries on shutdown. Especially in the browser
// we may not get time to do anything interesting while the current tab is
// closing.
if(e.snapshotVersion.toMicroseconds()-t.snapshotVersion.toMicroseconds()>=3e8)return !0;// Otherwise if the only thing that has changed about a target is its resume
// token it's not worth persisting. Note that the RemoteStore keeps an
// in-memory view of the currently active targets which includes the current
// resume token, so stream failure or user changes will still use an
// up-to-date resume token regardless of what we do here.
return n.addedDocuments.size+n.modifiedDocuments.size+n.removedDocuments.size>0;}/**
 * Notifies local store of the changed views to locally pin documents.
 */(c,u,e)&&o.push(n.ze.updateTargetData(t,u));}});var c=Tn();// HACK: The only reason we allow a null snapshot version is so that we
// can synthesize remote events when we get permission denied errors while
// trying to resolve the state of a locally cached document that is in
// limbo.
if(e.documentUpdates.forEach(function(s,i){e.resolvedLimboDocuments.has(s)&&o.push(n.persistence.referenceDelegate.updateLimboDocument(t,s));}),// Each loop iteration only affects its "own" doc, so it's safe to get all the remote
// documents in advance in a single call.
o.push(wr(t,r,e.documentUpdates,s,void 0).next(function(t){c=t;})),!s.isEqual(rt.min())){var _e29=n.ze.getLastRemoteSnapshotVersion(t).next(function(e){return n.ze.setTargetsMetadata(t,t.currentSequenceNumber,s);});o.push(_e29);}return js.waitFor(o).next(function(){return r.apply(t);}).next(function(){return n.Qn.vn(t,c);}).next(function(){return c;});}).then(function(t){return n.Un=i,t;});}/**
 * Populates document change buffer with documents from backend or a bundle.
 * Returns the document changes resulting from applying those documents.
 *
 * @param txn - Transaction to use to read existing documents from storage.
 * @param documentBuffer - Document buffer to collect the resulted changes to be
 *        applied to storage.
 * @param documents - Documents to be applied.
 * @param globalVersion - A `SnapshotVersion` representing the read time if all
 *        documents have the same read time.
 * @param documentVersions - A DocumentKey-to-SnapshotVersion map if documents
 *        have their own read time.
 *
 * Note: this function will use `documentVersions` if it is defined;
 * when it is not defined, resorts to `globalVersion`.
 */function wr(t,e,n,s,// TODO(wuandy): We could add `readTime` to MaybeDocument instead to remove
// this parameter.
i){var r=Pn();return n.forEach(function(t){return r=r.add(t);}),e.getEntries(t,r).next(function(t){var r=Tn();return n.forEach(function(n,o){var c=t.get(n),a=(null==i?void 0:i.get(n))||s;// Note: The order of the steps below is important, since we want
// to ensure that rejected limbo resolutions (which fabricate
// NoDocuments with SnapshotVersion.min()) never add documents to
// cache.
o.isNoDocument()&&o.version.isEqual(rt.min())?(// NoDocuments with SnapshotVersion.min() are used in manufactured
// events. We remove these documents from cache since we lost
// access.
e.removeEntry(n,a),r=r.insert(n,o)):!c.isValidDocument()||o.version.compareTo(c.version)>0||0===o.version.compareTo(c.version)&&c.hasPendingWrites?(e.addEntry(o,a),r=r.insert(n,o)):$("LocalStore","Ignoring outdated watch update for ",n,". Current version:",c.version," Watch version:",o.version);}),r;});}/**
 * Gets the mutation batch after the passed in batchId in the mutation queue
 * or null if empty.
 * @param afterBatchId - If provided, the batch to search after.
 * @returns The next mutation or null if there wasn't one.
 */function _r(t,e){var n=q(t);return n.persistence.runTransaction("Get next mutation batch","readonly",function(t){return void 0===e&&(e=-1),n.In.getNextMutationBatchAfterBatchId(t,e);});}/**
 * Reads the current value of a Document with a given key or null if not
 * found - used for testing.
 */ /**
 * Assigns the given target an internal ID so that its results can be pinned so
 * they don't get GC'd. A target must be allocated in the local store before
 * the store can be used to manage its view.
 *
 * Allocating an already allocated `Target` will return the existing `TargetData`
 * for that `Target`.
 */function mr(t,e){var n=q(t);return n.persistence.runTransaction("Allocate target","readwrite",function(t){var s;return n.ze.getTargetData(t,e).next(function(i){return i?(// This target has been listened to previously, so reuse the
// previous targetID.
// TODO(mcg): freshen last accessed date?
s=i,js.resolve(s)):n.ze.allocateTargetId(t).next(function(i){return s=new ii(e,i,0/* Listen */,t.currentSequenceNumber),n.ze.addTargetData(t,s).next(function(){return s;});});});}).then(function(t){// If Multi-Tab is enabled, the existing target data may be newer than
// the in-memory data
var s=n.Un.get(t.targetId);return (null===s||t.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(n.Un=n.Un.insert(t.targetId,t),n.qn.set(e,t.targetId)),t;});}/**
 * Returns the TargetData as seen by the LocalStore, including updates that may
 * have not yet been persisted to the TargetCache.
 */ // Visible for testing.
/**
 * Unpins all the documents associated with the given target. If
 * `keepPersistedTargetData` is set to false and Eager GC enabled, the method
 * directly removes the associated target data from the target cache.
 *
 * Releasing a non-existing `Target` is a no-op.
 */ // PORTING NOTE: `keepPersistedTargetData` is multi-tab only.
function gr(_x11,_x12,_x13){return _gr.apply(this,arguments);}/**
 * Runs the specified query against the local store and returns the results,
 * potentially taking advantage of query data from previous executions (such
 * as the set of remote keys).
 *
 * @param usePreviousResults - Whether results from previous executions can
 * be used to optimize this query execution.
 */function _gr(){_gr=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee72(t,e,n){var s,i,r;return regenerator.wrap(function _callee72$(_context72){while(1){switch(_context72.prev=_context72.next){case 0:s=q(t),i=s.Un.get(e),r=n?"readwrite":"readwrite-primary";_context72.prev=1;_context72.t0=n;if(_context72.t0){_context72.next=6;break;}_context72.next=6;return s.persistence.runTransaction("Release target",r,function(t){return s.persistence.referenceDelegate.removeTarget(t,i);});case 6:_context72.next=13;break;case 8:_context72.prev=8;_context72.t1=_context72["catch"](1);if(Hs(_context72.t1)){_context72.next=12;break;}throw _context72.t1;case 12:// All `releaseTarget` does is record the final metadata state for the
// target, but we've been recording this periodically during target
// activity. If we lose this write this could cause a very slight
// difference in the order of target deletion during GC, but we
// don't define exact LRU semantics so this is acceptable.
$("LocalStore","Failed to update sequence numbers for target ".concat(e,": ").concat(_context72.t1));case 13:s.Un=s.Un.remove(e),s.qn["delete"](i.target);case 14:case"end":return _context72.stop();}}},_callee72,null,[[1,8]]);}));return _gr.apply(this,arguments);}function yr(t,e,n){var s=q(t);var i=rt.min(),r=Pn();return s.persistence.runTransaction("Execute query","readonly",function(t){return function(t,e,n){var s=q(t),i=s.qn.get(n);return void 0!==i?js.resolve(s.Un.get(i)):s.ze.getTargetData(e,n);}(s,t,Ee(e)).next(function(e){if(e)return i=e.lastLimboFreeSnapshotVersion,s.ze.getMatchingKeysForTargetId(t,e.targetId).next(function(t){r=t;});}).next(function(){return s.Bn.getDocumentsMatchingQuery(t,e,n?i:rt.min(),n?r:Pn());}).next(function(t){return {documents:t,Gn:r};});});}// PORTING NOTE: Multi-Tab only.
var Rr=/*#__PURE__*/function(){function Rr(t){_classCallCheck(this,Rr);this.N=t,this.Yn=new Map(),this.Xn=new Map();}_createClass(Rr,[{key:"getBundleMetadata",value:function getBundleMetadata(t,e){return js.resolve(this.Yn.get(e));}},{key:"saveBundleMetadata",value:function saveBundleMetadata(t,e){/** Decodes a BundleMetadata proto into a BundleMetadata object. */var n;return this.Yn.set(e.id,{id:(n=e).id,version:n.version,createTime:jn(n.createTime)}),js.resolve();}},{key:"getNamedQuery",value:function getNamedQuery(t,e){return js.resolve(this.Xn.get(e));}},{key:"saveNamedQuery",value:function saveNamedQuery(t,e){return this.Xn.set(e.name,function(t){return {name:t.name,query:_i(t.bundledQuery),readTime:jn(t.readTime)};}(e)),js.resolve();}}]);return Rr;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A collection of references to a document from some kind of numbered entity
 * (either a target ID or batch ID). As references are added to or removed from
 * the set corresponding events are emitted to a registered garbage collector.
 *
 * Each reference is represented by a DocumentReference object. Each of them
 * contains enough information to uniquely identify the reference. They are all
 * stored primarily in a set sorted by key. A document is considered garbage if
 * there's no references in that set (this can be efficiently checked thanks to
 * sorting by key).
 *
 * ReferenceSet also keeps a secondary set that contains references sorted by
 * IDs. This one is used to efficiently implement removal of all references by
 * some target ID.
 */var br=/*#__PURE__*/function(){function br(){_classCallCheck(this,br);// A set of outstanding references to a document sorted by key.
this.Zn=new gn(Pr.ts),// A set of outstanding references to a document sorted by target id.
this.es=new gn(Pr.ns);}/** Returns true if the reference set contains no references. */_createClass(br,[{key:"isEmpty",value:function isEmpty(){return this.Zn.isEmpty();}/** Adds a reference to the given document key for the given ID. */},{key:"addReference",value:function addReference(t,e){var n=new Pr(t,e);this.Zn=this.Zn.add(n),this.es=this.es.add(n);}/** Add references to the given document keys for the given ID. */},{key:"ss",value:function ss(t,e){var _this96=this;t.forEach(function(t){return _this96.addReference(t,e);});}/**
     * Removes a reference to the given document key for the given
     * ID.
     */},{key:"removeReference",value:function removeReference(t,e){this.rs(new Pr(t,e));}},{key:"os",value:function os(t,e){var _this97=this;t.forEach(function(t){return _this97.removeReference(t,e);});}/**
     * Clears all references with a given ID. Calls removeRef() for each key
     * removed.
     */},{key:"cs",value:function cs(t){var _this98=this;var e=new Pt(new ht([])),n=new Pr(e,t),s=new Pr(e,t+1),i=[];return this.es.forEachInRange([n,s],function(t){_this98.rs(t),i.push(t.key);}),i;}},{key:"us",value:function us(){var _this99=this;this.Zn.forEach(function(t){return _this99.rs(t);});}},{key:"rs",value:function rs(t){this.Zn=this.Zn["delete"](t),this.es=this.es["delete"](t);}},{key:"hs",value:function hs(t){var e=new Pt(new ht([])),n=new Pr(e,t),s=new Pr(e,t+1);var i=Pn();return this.es.forEachInRange([n,s],function(t){i=i.add(t.key);}),i;}},{key:"containsKey",value:function containsKey(t){var e=new Pr(t,0),n=this.Zn.firstAfterOrEqual(e);return null!==n&&t.isEqual(n.key);}}]);return br;}();var Pr=/*#__PURE__*/function(){function Pr(t,e){_classCallCheck(this,Pr);this.key=t,this.ls=e;}/** Compare by key then by ID */_createClass(Pr,null,[{key:"ts",value:function ts(t,e){return Pt.comparator(t.key,e.key)||et(t.ls,e.ls);}/** Compare by ID then by key */},{key:"ns",value:function ns(t,e){return et(t.ls,e.ls)||Pt.comparator(t.key,e.key);}}]);return Pr;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var vr=/*#__PURE__*/function(){function vr(t,e){_classCallCheck(this,vr);this.Ht=t,this.referenceDelegate=e,/**
         * The set of all mutations that have been sent but not yet been applied to
         * the backend.
         */this.In=[],/** Next value to use when assigning sequential IDs to each mutation batch. */this.fs=1,/** An ordered mapping between documents and the mutations batch IDs. */this.ds=new gn(Pr.ts);}_createClass(vr,[{key:"checkEmpty",value:function checkEmpty(t){return js.resolve(0===this.In.length);}},{key:"addMutationBatch",value:function addMutationBatch(t,e,n,s){var i=this.fs;this.fs++,this.In.length>0&&this.In[this.In.length-1];var r=new ni(i,e,n,s);this.In.push(r);// Track references by document key and index collection parents.
var _iterator34=_createForOfIteratorHelper(s),_step34;try{for(_iterator34.s();!(_step34=_iterator34.n()).done;){var _e30=_step34.value;this.ds=this.ds.add(new Pr(_e30.key,i)),this.Ht.addToCollectionParentIndex(t,_e30.key.path.popLast());}}catch(err){_iterator34.e(err);}finally{_iterator34.f();}return js.resolve(r);}},{key:"lookupMutationBatch",value:function lookupMutationBatch(t,e){return js.resolve(this.ws(e));}},{key:"getNextMutationBatchAfterBatchId",value:function getNextMutationBatchAfterBatchId(t,e){var n=e+1,s=this._s(n),i=s<0?0:s;// The requested batchId may still be out of range so normalize it to the
// start of the queue.
return js.resolve(this.In.length>i?this.In[i]:null);}},{key:"getHighestUnacknowledgedBatchId",value:function getHighestUnacknowledgedBatchId(){return js.resolve(0===this.In.length?-1:this.fs-1);}},{key:"getAllMutationBatches",value:function getAllMutationBatches(t){return js.resolve(this.In.slice());}},{key:"getAllMutationBatchesAffectingDocumentKey",value:function getAllMutationBatchesAffectingDocumentKey(t,e){var _this100=this;var n=new Pr(e,0),s=new Pr(e,Number.POSITIVE_INFINITY),i=[];return this.ds.forEachInRange([n,s],function(t){var e=_this100.ws(t.ls);i.push(e);}),js.resolve(i);}},{key:"getAllMutationBatchesAffectingDocumentKeys",value:function getAllMutationBatchesAffectingDocumentKeys(t,e){var _this101=this;var n=new gn(et);return e.forEach(function(t){var e=new Pr(t,0),s=new Pr(t,Number.POSITIVE_INFINITY);_this101.ds.forEachInRange([e,s],function(t){n=n.add(t.ls);});}),js.resolve(this.gs(n));}},{key:"getAllMutationBatchesAffectingQuery",value:function getAllMutationBatchesAffectingQuery(t,e){// Use the query path as a prefix for testing if a document matches the
// query.
var n=e.path,s=n.length+1;// Construct a document reference for actually scanning the index. Unlike
// the prefix the document key in this reference must have an even number of
// segments. The empty segment can be used a suffix of the query path
// because it precedes all other segments in an ordered traversal.
var i=n;Pt.isDocumentKey(i)||(i=i.child(""));var r=new Pr(new Pt(i),0);// Find unique batchIDs referenced by all documents potentially matching the
// query.
var o=new gn(et);return this.ds.forEachWhile(function(t){var e=t.key.path;return !!n.isPrefixOf(e)&&(// Rows with document keys more than one segment longer than the query
// path can't be matches. For example, a query on 'rooms' can't match
// the document /rooms/abc/messages/xyx.
// TODO(mcg): we'll need a different scanner when we implement
// ancestor queries.
e.length===s&&(o=o.add(t.ls)),!0);},r),js.resolve(this.gs(o));}},{key:"gs",value:function gs(t){var _this102=this;// Construct an array of matching batches, sorted by batchID to ensure that
// multiple mutations affecting the same document key are applied in order.
var e=[];return t.forEach(function(t){var n=_this102.ws(t);null!==n&&e.push(n);}),e;}},{key:"removeMutationBatch",value:function removeMutationBatch(t,e){var _this103=this;B(0===this.ys(e.batchId,"removed")),this.In.shift();var n=this.ds;return js.forEach(e.mutations,function(s){var i=new Pr(s.key,e.batchId);return n=n["delete"](i),_this103.referenceDelegate.markPotentiallyOrphaned(t,s.key);}).next(function(){_this103.ds=n;});}},{key:"te",value:function te(t){// No-op since the memory mutation queue does not maintain a separate cache.
}},{key:"containsKey",value:function containsKey(t,e){var n=new Pr(e,0),s=this.ds.firstAfterOrEqual(n);return js.resolve(e.isEqual(s&&s.key));}},{key:"performConsistencyCheck",value:function performConsistencyCheck(t){return this.In.length,js.resolve();}/**
     * Finds the index of the given batchId in the mutation queue and asserts that
     * the resulting index is within the bounds of the queue.
     *
     * @param batchId - The batchId to search for
     * @param action - A description of what the caller is doing, phrased in passive
     * form (e.g. "acknowledged" in a routine that acknowledges batches).
     */},{key:"ys",value:function ys(t,e){return this._s(t);}/**
     * Finds the index of the given batchId in the mutation queue. This operation
     * is O(1).
     *
     * @returns The computed index of the batch with the given batchId, based on
     * the state of the queue. Note this index can be negative if the requested
     * batchId has already been remvoed from the queue or past the end of the
     * queue if the batchId is larger than the last added batch.
     */},{key:"_s",value:function _s(t){if(0===this.In.length)// As an index this is past the end of the queue
return 0;// Examine the front of the queue to figure out the difference between the
// batchId and indexes in the array. Note that since the queue is ordered
// by batchId, if the first batch has a larger batchId then the requested
// batchId doesn't exist in the queue.
return t-this.In[0].batchId;}/**
     * A version of lookupMutationBatch that doesn't return a promise, this makes
     * other functions that uses this code easier to read and more efficent.
     */},{key:"ws",value:function ws(t){var e=this._s(t);if(e<0||e>=this.In.length)return null;return this.In[e];}}]);return vr;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * The memory-only RemoteDocumentCache for IndexedDb. To construct, invoke
 * `newMemoryRemoteDocumentCache()`.
 */var Vr=/*#__PURE__*/function(){/**
     * @param sizer - Used to assess the size of a document. For eager GC, this is
     * expected to just return 0 to avoid unnecessarily doing the work of
     * calculating the size.
     */function Vr(t,e){_classCallCheck(this,Vr);this.Ht=t,this.ps=e,/** Underlying cache of documents and their read times. */this.docs=new wn(Pt.comparator),/** Size of all cached documents. */this.size=0;}/**
     * Adds the supplied entry to the cache and updates the cache size as appropriate.
     *
     * All calls of `addEntry`  are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */_createClass(Vr,[{key:"addEntry",value:function addEntry(t,e,n){var s=e.key,i=this.docs.get(s),r=i?i.size:0,o=this.ps(e);return this.docs=this.docs.insert(s,{document:e.clone(),size:o,readTime:n}),this.size+=o-r,this.Ht.addToCollectionParentIndex(t,s.path.popLast());}/**
     * Removes the specified entry from the cache and updates the cache size as appropriate.
     *
     * All calls of `removeEntry` are required to go through the RemoteDocumentChangeBuffer
     * returned by `newChangeBuffer()`.
     */},{key:"removeEntry",value:function removeEntry(t){var e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size);}},{key:"getEntry",value:function getEntry(t,e){var n=this.docs.get(e);return js.resolve(n?n.document.clone():Kt.newInvalidDocument(e));}},{key:"getEntries",value:function getEntries(t,e){var _this104=this;var n=Tn();return e.forEach(function(t){var e=_this104.docs.get(t);n=n.insert(t,e?e.document.clone():Kt.newInvalidDocument(t));}),js.resolve(n);}},{key:"getDocumentsMatchingQuery",value:function getDocumentsMatchingQuery(t,e,n){var s=Tn();// Documents are ordered by key, so we can use a prefix scan to narrow down
// the documents we need to match the query against.
var i=new Pt(e.path.child("")),r=this.docs.getIteratorFrom(i);for(;r.hasNext();){var _r$getNext=r.getNext(),_t48=_r$getNext.key,_r$getNext$value=_r$getNext.value,_i9=_r$getNext$value.document,o=_r$getNext$value.readTime;if(!e.path.isPrefixOf(_t48.path))break;o.compareTo(n)<=0||Pe(e,_i9)&&(s=s.insert(_i9.key,_i9.clone()));}return js.resolve(s);}},{key:"Ts",value:function Ts(t,e){return js.forEach(this.docs,function(t){return e(t);});}},{key:"newChangeBuffer",value:function newChangeBuffer(t){// `trackRemovals` is ignores since the MemoryRemoteDocumentCache keeps
// a separate changelog and does not need special handling for removals.
return new Sr(this);}},{key:"getSize",value:function getSize(t){return js.resolve(this.size);}}]);return Vr;}();/**
 * Creates a new memory-only RemoteDocumentCache.
 *
 * @param indexManager - A class that manages collection group indices.
 * @param sizer - Used to assess the size of a document. For eager GC, this is
 * expected to just return 0 to avoid unnecessarily doing the work of
 * calculating the size.
 */ /**
 * Handles the details of adding and updating documents in the MemoryRemoteDocumentCache.
 */var Sr=/*#__PURE__*/function(_Qi2){_inherits(Sr,_Qi2);var _super23=_createSuper$1(Sr);function Sr(t){var _this105;_classCallCheck(this,Sr);_this105=_super23.call(this),_this105.Se=t;return _this105;}_createClass(Sr,[{key:"applyChanges",value:function applyChanges(t){var _this106=this;var e=[];return this.changes.forEach(function(n,s){s.document.isValidDocument()?e.push(_this106.Se.addEntry(t,s.document,_this106.getReadTime(n))):_this106.Se.removeEntry(n);}),js.waitFor(e);}},{key:"getFromCache",value:function getFromCache(t,e){return this.Se.getEntry(t,e);}},{key:"getAllFromCache",value:function getAllFromCache(t,e){return this.Se.getEntries(t,e);}}]);return Sr;}(Qi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Dr=/*#__PURE__*/function(){function Dr(t){_classCallCheck(this,Dr);this.persistence=t,/**
         * Maps a target to the data about that target
         */this.Es=new ji(function(t){return Wt(t);},zt),/** The last received snapshot version. */this.lastRemoteSnapshotVersion=rt.min(),/** The highest numbered target ID encountered. */this.highestTargetId=0,/** The highest sequence number encountered. */this.Is=0,/**
         * A ordered bidirectional mapping between documents and the remote target
         * IDs.
         */this.As=new br(),this.targetCount=0,this.Rs=Ni.se();}_createClass(Dr,[{key:"forEachTarget",value:function forEachTarget(t,e){return this.Es.forEach(function(t,n){return e(n);}),js.resolve();}},{key:"getLastRemoteSnapshotVersion",value:function getLastRemoteSnapshotVersion(t){return js.resolve(this.lastRemoteSnapshotVersion);}},{key:"getHighestSequenceNumber",value:function getHighestSequenceNumber(t){return js.resolve(this.Is);}},{key:"allocateTargetId",value:function allocateTargetId(t){return this.highestTargetId=this.Rs.next(),js.resolve(this.highestTargetId);}},{key:"setTargetsMetadata",value:function setTargetsMetadata(t,e,n){return n&&(this.lastRemoteSnapshotVersion=n),e>this.Is&&(this.Is=e),js.resolve();}},{key:"ce",value:function ce(t){this.Es.set(t.target,t);var e=t.targetId;e>this.highestTargetId&&(this.Rs=new Ni(e),this.highestTargetId=e),t.sequenceNumber>this.Is&&(this.Is=t.sequenceNumber);}},{key:"addTargetData",value:function addTargetData(t,e){return this.ce(e),this.targetCount+=1,js.resolve();}},{key:"updateTargetData",value:function updateTargetData(t,e){return this.ce(e),js.resolve();}},{key:"removeTargetData",value:function removeTargetData(t,e){return this.Es["delete"](e.target),this.As.cs(e.targetId),this.targetCount-=1,js.resolve();}},{key:"removeTargets",value:function removeTargets(t,e,n){var _this107=this;var s=0;var i=[];return this.Es.forEach(function(r,o){o.sequenceNumber<=e&&null===n.get(o.targetId)&&(_this107.Es["delete"](r),i.push(_this107.removeMatchingKeysForTargetId(t,o.targetId)),s++);}),js.waitFor(i).next(function(){return s;});}},{key:"getTargetCount",value:function getTargetCount(t){return js.resolve(this.targetCount);}},{key:"getTargetData",value:function getTargetData(t,e){var n=this.Es.get(e)||null;return js.resolve(n);}},{key:"addMatchingKeys",value:function addMatchingKeys(t,e,n){return this.As.ss(e,n),js.resolve();}},{key:"removeMatchingKeys",value:function removeMatchingKeys(t,e,n){this.As.os(e,n);var s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(function(e){i.push(s.markPotentiallyOrphaned(t,e));}),js.waitFor(i);}},{key:"removeMatchingKeysForTargetId",value:function removeMatchingKeysForTargetId(t,e){return this.As.cs(e),js.resolve();}},{key:"getMatchingKeysForTargetId",value:function getMatchingKeysForTargetId(t,e){var n=this.As.hs(e);return js.resolve(n);}},{key:"containsKey",value:function containsKey(t,e){return js.resolve(this.As.containsKey(e));}}]);return Dr;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A memory-backed instance of Persistence. Data is stored only in RAM and
 * not persisted across sessions.
 */var Cr=/*#__PURE__*/function(){/**
     * The constructor accepts a factory for creating a reference delegate. This
     * allows both the delegate and this instance to have strong references to
     * each other without having nullable fields that would then need to be
     * checked or asserted on every access.
     */function Cr(t,e){var _this108=this;_classCallCheck(this,Cr);this.bs={},this.Le=new X(0),this.Be=!1,this.Be=!0,this.referenceDelegate=t(this),this.ze=new Dr(this);this.Ht=new pi(),this.He=function(t,e){return new Vr(t,e);}(this.Ht,function(t){return _this108.referenceDelegate.Ps(t);}),this.N=new ri(e),this.Je=new Rr(this.N);}_createClass(Cr,[{key:"start",value:function start(){return Promise.resolve();}},{key:"shutdown",value:function shutdown(){// No durable state to ensure is closed on shutdown.
return this.Be=!1,Promise.resolve();}},{key:"started",get:function get(){return this.Be;}},{key:"setDatabaseDeletedListener",value:function setDatabaseDeletedListener(){// No op.
}},{key:"setNetworkEnabled",value:function setNetworkEnabled(){// No op.
}},{key:"getIndexManager",value:function getIndexManager(){return this.Ht;}},{key:"getMutationQueue",value:function getMutationQueue(t){var e=this.bs[t.toKey()];return e||(e=new vr(this.Ht,this.referenceDelegate),this.bs[t.toKey()]=e),e;}},{key:"getTargetCache",value:function getTargetCache(){return this.ze;}},{key:"getRemoteDocumentCache",value:function getRemoteDocumentCache(){return this.He;}},{key:"getBundleCache",value:function getBundleCache(){return this.Je;}},{key:"runTransaction",value:function runTransaction(t,e,n){var _this109=this;$("MemoryPersistence","Starting transaction:",t);var s=new Nr(this.Le.next());return this.referenceDelegate.vs(),n(s).next(function(t){return _this109.referenceDelegate.Vs(s).next(function(){return t;});}).toPromise().then(function(t){return s.raiseOnCommittedEvent(),t;});}},{key:"Ss",value:function Ss(t,e){return js.or(Object.values(this.bs).map(function(n){return function(){return n.containsKey(t,e);};}));}}]);return Cr;}();/**
 * Memory persistence is not actually transactional, but future implementations
 * may have transaction-scoped state.
 */var Nr=/*#__PURE__*/function(_Ks2){_inherits(Nr,_Ks2);var _super24=_createSuper$1(Nr);function Nr(t){var _this110;_classCallCheck(this,Nr);_this110=_super24.call(this),_this110.currentSequenceNumber=t;return _this110;}return Nr;}(Ks);var xr=/*#__PURE__*/function(){function xr(t){_classCallCheck(this,xr);this.persistence=t,/** Tracks all documents that are active in Query views. */this.Ds=new br(),/** The list of documents that are potentially GCed after each transaction. */this.Cs=null;}_createClass(xr,[{key:"xs",get:function get(){if(this.Cs)return this.Cs;throw L();}},{key:"addReference",value:function addReference(t,e,n){return this.Ds.addReference(n,e),this.xs["delete"](n.toString()),js.resolve();}},{key:"removeReference",value:function removeReference(t,e,n){return this.Ds.removeReference(n,e),this.xs.add(n.toString()),js.resolve();}},{key:"markPotentiallyOrphaned",value:function markPotentiallyOrphaned(t,e){return this.xs.add(e.toString()),js.resolve();}},{key:"removeTarget",value:function removeTarget(t,e){var _this111=this;this.Ds.cs(e.targetId).forEach(function(t){return _this111.xs.add(t.toString());});var n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(t,e.targetId).next(function(t){t.forEach(function(t){return _this111.xs.add(t.toString());});}).next(function(){return n.removeTargetData(t,e);});}},{key:"vs",value:function vs(){this.Cs=new Set();}},{key:"Vs",value:function Vs(t){var _this112=this;// Remove newly orphaned documents.
var e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return js.forEach(this.xs,function(n){var s=Pt.fromPath(n);return _this112.ks(t,s).next(function(t){t||e.removeEntry(s);});}).next(function(){return _this112.Cs=null,e.apply(t);});}},{key:"updateLimboDocument",value:function updateLimboDocument(t,e){var _this113=this;return this.ks(t,e).next(function(t){t?_this113.xs["delete"](e.toString()):_this113.xs.add(e.toString());});}},{key:"Ps",value:function Ps(t){// For eager GC, we don't care about the document size, there are no size thresholds.
return 0;}},{key:"ks",value:function ks(t,e){var _this114=this;return js.or([function(){return js.resolve(_this114.Ds.containsKey(e));},function(){return _this114.persistence.getTargetCache().containsKey(t,e);},function(){return _this114.persistence.Ss(t,e);}]);}}],[{key:"Ns",value:function Ns(t){return new xr(t);}}]);return xr;}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // The format of the LocalStorage key that stores the client state is:
var Ur=/*#__PURE__*/function(){function Ur(){_classCallCheck(this,Ur);this.activeTargetIds=Vn();}_createClass(Ur,[{key:"Fs",value:function Fs(t){this.activeTargetIds=this.activeTargetIds.add(t);}},{key:"Ms",value:function Ms(t){this.activeTargetIds=this.activeTargetIds["delete"](t);}/**
     * Converts this entry into a JSON-encoded format we can use for WebStorage.
     * Does not encode `clientId` as it is part of the key in WebStorage.
     */},{key:"Os",value:function Os(){var t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t);}}]);return Ur;}();var Kr=/*#__PURE__*/function(){function Kr(){_classCallCheck(this,Kr);this.yi=new Ur(),this.pi={},this.onlineStateHandler=null,this.sequenceNumberHandler=null;}_createClass(Kr,[{key:"addPendingMutation",value:function addPendingMutation(t){// No op.
}},{key:"updateMutationState",value:function updateMutationState(t,e,n){// No op.
}},{key:"addLocalQueryTarget",value:function addLocalQueryTarget(t){return this.yi.Fs(t),this.pi[t]||"not-current";}},{key:"updateQueryState",value:function updateQueryState(t,e,n){this.pi[t]=e;}},{key:"removeLocalQueryTarget",value:function removeLocalQueryTarget(t){this.yi.Ms(t);}},{key:"isLocalQueryTarget",value:function isLocalQueryTarget(t){return this.yi.activeTargetIds.has(t);}},{key:"clearQueryState",value:function clearQueryState(t){delete this.pi[t];}},{key:"getAllActiveQueryTargets",value:function getAllActiveQueryTargets(){return this.yi.activeTargetIds;}},{key:"isActiveQueryTarget",value:function isActiveQueryTarget(t){return this.yi.activeTargetIds.has(t);}},{key:"start",value:function start(){return this.yi=new Ur(),Promise.resolve();}},{key:"handleUserChange",value:function handleUserChange(t,e,n){// No op.
}},{key:"setOnlineState",value:function setOnlineState(t){// No op.
}},{key:"shutdown",value:function shutdown(){}},{key:"writeSequenceNumber",value:function writeSequenceNumber(t){}},{key:"notifyBundleLoaded",value:function notifyBundleLoaded(){// No op.
}}]);return Kr;}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var jr=/*#__PURE__*/function(){function jr(){_classCallCheck(this,jr);}_createClass(jr,[{key:"Ti",value:function Ti(t){// No-op.
}},{key:"shutdown",value:function shutdown(){// No-op.
}}]);return jr;}();/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ // References to `window` are guarded by BrowserConnectivityMonitor.isAvailable()
/* eslint-disable no-restricted-globals */ /**
 * Browser implementation of ConnectivityMonitor.
 */var Qr=/*#__PURE__*/function(){function Qr(){var _this119=this;_classCallCheck(this,Qr);this.Ei=function(){return _this119.Ii();},this.Ai=function(){return _this119.Ri();},this.bi=[],this.Pi();}_createClass(Qr,[{key:"Ti",value:function Ti(t){this.bi.push(t);}},{key:"shutdown",value:function shutdown(){window.removeEventListener("online",this.Ei),window.removeEventListener("offline",this.Ai);}},{key:"Pi",value:function Pi(){window.addEventListener("online",this.Ei),window.addEventListener("offline",this.Ai);}},{key:"Ii",value:function Ii(){$("ConnectivityMonitor","Network connectivity changed: AVAILABLE");var _iterator37=_createForOfIteratorHelper(this.bi),_step37;try{for(_iterator37.s();!(_step37=_iterator37.n()).done;){var t=_step37.value;t(0/* AVAILABLE */);}}catch(err){_iterator37.e(err);}finally{_iterator37.f();}}},{key:"Ri",value:function Ri(){$("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");var _iterator38=_createForOfIteratorHelper(this.bi),_step38;try{for(_iterator38.s();!(_step38=_iterator38.n()).done;){var t=_step38.value;t(1/* UNAVAILABLE */);}}catch(err){_iterator38.e(err);}finally{_iterator38.f();}}// TODO(chenbrian): Consider passing in window either into this component or
// here for testing via FakeWindow.
/** Checks that all used attributes of window are available. */}],[{key:"bt",value:function bt(){return "undefined"!=typeof window&&void 0!==window.addEventListener&&void 0!==window.removeEventListener;}}]);return Qr;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Wr={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery"};/**
 * Maps RPC names to the corresponding REST endpoint name.
 *
 * We use array notation to avoid mangling.
 */ /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Provides a simple helper class that implements the Stream interface to
 * bridge to other implementations that are streams but do not implement the
 * interface. The stream callbacks are invoked with the callOn... methods.
 */var Gr=/*#__PURE__*/function(){function Gr(t){_classCallCheck(this,Gr);this.vi=t.vi,this.Vi=t.Vi;}_createClass(Gr,[{key:"Si",value:function Si(t){this.Di=t;}},{key:"Ci",value:function Ci(t){this.Ni=t;}},{key:"onMessage",value:function onMessage(t){this.xi=t;}},{key:"close",value:function close(){this.Vi();}},{key:"send",value:function send(t){this.vi(t);}},{key:"ki",value:function ki(){this.Di();}},{key:"$i",value:function $i(t){this.Ni(t);}},{key:"Oi",value:function Oi(t){this.xi(t);}}]);return Gr;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var zr=/*#__PURE__*/function(_ref21){_inherits(zr,_ref21);var _super25=_createSuper$1(zr);function zr(t){var _this120;_classCallCheck(this,zr);_this120=_super25.call(this,t),_this120.forceLongPolling=t.forceLongPolling,_this120.autoDetectLongPolling=t.autoDetectLongPolling,_this120.useFetchStreams=t.useFetchStreams;return _this120;}_createClass(zr,[{key:"qi",value:function qi(t,e,n,s){return new Promise(function(i,r){var o=new XhrIo();o.listenOnce(EventType.COMPLETE,function(){try{switch(o.getLastErrorCode()){case ErrorCode.NO_ERROR:var _e32=o.getResponseJson();$("Connection","XHR received:",JSON.stringify(_e32)),i(_e32);break;case ErrorCode.TIMEOUT:$("Connection",'RPC "'+t+'" timed out'),r(new j(K.DEADLINE_EXCEEDED,"Request time out"));break;case ErrorCode.HTTP_ERROR:var _n19=o.getStatus();if($("Connection",'RPC "'+t+'" failed with status:',_n19,"response text:",o.getResponseText()),_n19>0){var _t59=o.getResponseJson().error;if(_t59&&_t59.status&&_t59.message){var _e33=function(t){var e=t.toLowerCase().replace(/_/g,"-");return Object.values(K).indexOf(e)>=0?e:K.UNKNOWN;}(_t59.status);r(new j(_e33,_t59.message));}else r(new j(K.UNKNOWN,"Server responded with status "+o.getStatus()));}else// If we received an HTTP_ERROR but there's no status code,
// it's most probably a connection issue
r(new j(K.UNAVAILABLE,"Connection failed."));break;default:L();}}finally{$("Connection",'RPC "'+t+'" completed.');}});var c=JSON.stringify(s);o.send(e,"POST",c,n,15);});}},{key:"ji",value:function ji(t,e){var n=[this.Fi,"/","google.firestore.v1.Firestore","/",t,"/channel"],s=createWebChannelTransport(),i=getStatEventTarget(),r={// Required for backend stickiness, routing behavior is based on this
// parameter.
httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{// This param is used to improve routing and project isolation by the
// backend and must be included in every request.
database:"projects/".concat(this.databaseId.projectId,"/databases/").concat(this.databaseId.database)},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{// Override the default timeout (randomized between 10-20 seconds) since
// a large write batch on a slow internet connection may take a long
// time to send to the backend. Rather than have WebChannel impose a
// tight timeout which could lead to infinite timeouts and retries, we
// set it very large (5-10 minutes) and rely on the browser's builtin
// timeouts to kick in if the request isn't working.
forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling};this.useFetchStreams&&(r.xmlHttpFactory=new FetchXmlHttpFactory({})),this.Ui(r.initMessageHeaders,e),// Sending the custom headers we just added to request.initMessageHeaders
// (Authorization, etc.) will trigger the browser to make a CORS preflight
// request because the XHR will no longer meet the criteria for a "simple"
// CORS request:
// https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#Simple_requests
// Therefore to avoid the CORS preflight request (an extra network
// roundtrip), we use the httpHeadersOverwriteParam option to specify that
// the headers should instead be encoded into a special "$httpHeaders" query
// parameter, which is recognized by the webchannel backend. This is
// formally defined here:
// https://github.com/google/closure-library/blob/b0e1815b13fb92a46d7c9b3c30de5d6a396a3245/closure/goog/net/rpc/httpcors.js#L32
// TODO(b/145624756): There is a backend bug where $httpHeaders isn't respected if the request
// doesn't have an Origin header. So we have to exclude a few browser environments that are
// known to (sometimes) not include an Origin. See
// https://github.com/firebase/firebase-js-sdk/issues/1491.
isMobileCordova()||isReactNative()||isElectron()||isIE()||isUWP()||isBrowserExtension()||(r.httpHeadersOverwriteParam="$httpHeaders");var o=n.join("");$("Connection","Creating WebChannel: "+o,r);var c=s.createWebChannel(o,r);// WebChannel supports sending the first message with the handshake - saving
// a network round trip. However, it will have to call send in the same
// JS event loop as open. In order to enforce this, we delay actually
// opening the WebChannel until send is called. Whether we have called
// open is tracked with this variable.
var a=!1,u=!1;// A flag to determine whether the stream was closed (by us or through an
// error/close event) to avoid delivering multiple close events or sending
// on a closed stream
var h=new Gr({vi:function vi(t){u?$("Connection","Not sending because WebChannel is closed:",t):(a||($("Connection","Opening WebChannel transport."),c.open(),a=!0),$("Connection","WebChannel sending:",t),c.send(t));},Vi:function Vi(){return c.close();}}),g=function g(t,e,n){// TODO(dimond): closure typing seems broken because WebChannel does
// not implement goog.events.Listenable
t.listen(e,function(t){try{n(t);}catch(t){setTimeout(function(){throw t;},0);}});};// Closure events are guarded and exceptions are swallowed, so catch any
// exception and rethrow using a setTimeout so they become visible again.
// Note that eventually this function could go away if we are confident
// enough the code is exception free.
return g(c,WebChannel.EventType.OPEN,function(){u||$("Connection","WebChannel transport opened.");}),g(c,WebChannel.EventType.CLOSE,function(){u||(u=!0,$("Connection","WebChannel transport closed"),h.$i());}),g(c,WebChannel.EventType.ERROR,function(t){u||(u=!0,F("Connection","WebChannel transport errored:",t),h.$i(new j(K.UNAVAILABLE,"The operation could not be completed")));}),g(c,WebChannel.EventType.MESSAGE,function(t){var e;if(!u){var _n20=t.data[0];B(!!_n20);// TODO(b/35143891): There is a bug in One Platform that caused errors
// (and only errors) to be wrapped in an extra array. To be forward
// compatible with the bug we need to check either condition. The latter
// can be removed once the fix has been rolled out.
// Use any because msgData.error is not typed.
var _s14=_n20,_i10=_s14.error||(null===(e=_s14[0])||void 0===e?void 0:e.error);if(_i10){$("Connection","WebChannel received error:",_i10);// error.status will be a string like 'OK' or 'NOT_FOUND'.
var _t60=_i10.status;var _e34=/**
 * Maps an error Code from a GRPC status identifier like 'NOT_FOUND'.
 *
 * @returns The Code equivalent to the given status string or undefined if
 *     there is no match.
 */function(t){// lookup by string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var e=hn[t];if(void 0!==e)return dn(e);}(_t60),_n21=_i10.message;void 0===_e34&&(_e34=K.INTERNAL,_n21="Unknown error status: "+_t60+" with message "+_i10.message),// Mark closed so no further events are propagated
u=!0,h.$i(new j(_e34,_n21)),c.close();}else $("Connection","WebChannel received:",_n20),h.Oi(_n20);}}),g(i,Event.STAT_EVENT,function(t){t.stat===Stat.PROXY?$("Connection","Detected buffering proxy"):t.stat===Stat.NOPROXY&&$("Connection","Detected no buffering proxy");}),setTimeout(function(){// Technically we could/should wait for the WebChannel opened event,
// but because we want to send the first message with the WebChannel
// handshake we pretend the channel opened here (asynchronously), and
// then delay the actual open until the first message is sent.
h.ki();},0),h;}}]);return zr;}(/*#__PURE__*/ /**
 * Base class for all Rest-based connections to the backend (WebChannel and
 * HTTP).
 */function(){function _class3(t){_classCallCheck(this,_class3);this.databaseInfo=t,this.databaseId=t.databaseId;var e=t.ssl?"https":"http";this.Fi=e+"://"+t.host,this.Mi="projects/"+this.databaseId.projectId+"/databases/"+this.databaseId.database+"/documents";}_createClass(_class3,[{key:"Li",value:function Li(t,e,n,s){var i=this.Bi(t,e);$("RestConnection","Sending: ",i,n);var r={};return this.Ui(r,s),this.qi(t,i,r,n).then(function(t){return $("RestConnection","Received: ",t),t;},function(e){throw F("RestConnection","".concat(t," failed with error: "),e,"url: ",i,"request:",n),e;});}},{key:"Ki",value:function Ki(t,e,n,s){// The REST API automatically aggregates all of the streamed results, so we
// can just use the normal invoke() method.
return this.Li(t,e,n,s);}/**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */},{key:"Ui",value:/**
     * Modifies the headers for a request, adding any authorization token if
     * present and any additional headers for the request.
     */function Ui(t,e){if(t["X-Goog-Api-Client"]="gl-js/ fire/"+C,// Content-Type: text/plain will avoid preflight requests which might
// mess with CORS and redirects by proxies. If we add custom headers
// we will need to change this code to potentially use the $httpOverwrite
// parameter supported by ESF to avoid triggering preflight requests.
t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),e)for(var n in e.authHeaders){e.authHeaders.hasOwnProperty(n)&&(t[n]=e.authHeaders[n]);}}},{key:"Bi",value:function Bi(t,e){var n=Wr[t];return "".concat(this.Fi,"/v1/").concat(e,":").concat(n);}}]);return _class3;}());/** The Platform's 'document' implementation or null if not available. */function Jr(){// `document` is not always available, e.g. in ReactNative and WebWorkers.
// eslint-disable-next-line no-restricted-globals
return "undefined"!=typeof document?document:null;}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yr(t){return new Bn(t,/* useProto3Json= */!0);}/**
 * An instance of the Platform's 'TextEncoder' implementation.
 */ /**
 * A helper for running delayed tasks following an exponential backoff curve
 * between attempts.
 *
 * Each delay is made up of a "base" delay which follows the exponential
 * backoff curve, and a +/- 50% "jitter" that is calculated and added to the
 * base delay. This prevents clients from accidentally synchronizing their
 * delays causing spikes of load to the backend.
 */var Xr=/*#__PURE__*/function(){function Xr(/**
     * The AsyncQueue to run backoff operations on.
     */t,/**
     * The ID to use when scheduling backoff operations on the AsyncQueue.
     */e){var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:1e3;var s=arguments.length>3&&arguments[3]!==undefined?arguments[3]:1.5;var i=arguments.length>4&&arguments[4]!==undefined?arguments[4]:6e4;_classCallCheck(this,Xr);this.Oe=t,this.timerId=e,this.Qi=n,this.Wi=s,this.Gi=i,this.zi=0,this.Hi=null,/** The last backoff attempt, as epoch milliseconds. */this.Ji=Date.now(),this.reset();}/**
     * Resets the backoff delay.
     *
     * The very next backoffAndWait() will have no delay. If it is called again
     * (i.e. due to an error), initialDelayMs (plus jitter) will be used, and
     * subsequent ones will increase according to the backoffFactor.
     */_createClass(Xr,[{key:"reset",value:function reset(){this.zi=0;}/**
     * Resets the backoff delay to the maximum delay (e.g. for use after a
     * RESOURCE_EXHAUSTED error).
     */},{key:"Yi",value:function Yi(){this.zi=this.Gi;}/**
     * Returns a promise that resolves after currentDelayMs, and increases the
     * delay for any subsequent attempts. If there was a pending backoff operation
     * already, it will be canceled.
     */},{key:"Xi",value:function Xi(t){var _this121=this;// Cancel any pending backoff operation.
this.cancel();// First schedule using the current base (which may be 0 and should be
// honored as such).
var e=Math.floor(this.zi+this.Zi()),n=Math.max(0,Date.now()-this.Ji),s=Math.max(0,e-n);// Guard against lastAttemptTime being in the future due to a clock change.
s>0&&$("ExponentialBackoff","Backing off for ".concat(s," ms (base delay: ").concat(this.zi," ms, delay with jitter: ").concat(e," ms, last attempt: ").concat(n," ms ago)")),this.Hi=this.Oe.enqueueAfterDelay(this.timerId,s,function(){return _this121.Ji=Date.now(),t();}),// Apply backoff factor to determine next delay and ensure it is within
// bounds.
this.zi*=this.Wi,this.zi<this.Qi&&(this.zi=this.Qi),this.zi>this.Gi&&(this.zi=this.Gi);}},{key:"tr",value:function tr(){null!==this.Hi&&(this.Hi.skipDelay(),this.Hi=null);}},{key:"cancel",value:function cancel(){null!==this.Hi&&(this.Hi.cancel(),this.Hi=null);}/** Returns a random value in the range [-currentBaseMs/2, currentBaseMs/2] */},{key:"Zi",value:function Zi(){return (Math.random()-.5)*this.zi;}}]);return Xr;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A PersistentStream is an abstract base class that represents a streaming RPC
 * to the Firestore backend. It's built on top of the connections own support
 * for streaming RPCs, and adds several critical features for our clients:
 *
 *   - Exponential backoff on failure
 *   - Authentication via CredentialsProvider
 *   - Dispatching all callbacks into the shared worker queue
 *   - Closing idle streams after 60 seconds of inactivity
 *
 * Subclasses of PersistentStream implement serialization of models to and
 * from the JSON representation of the protocol buffers for a specific
 * streaming RPC.
 *
 * ## Starting and Stopping
 *
 * Streaming RPCs are stateful and need to be start()ed before messages can
 * be sent and received. The PersistentStream will call the onOpen() function
 * of the listener once the stream is ready to accept requests.
 *
 * Should a start() fail, PersistentStream will call the registered onClose()
 * listener with a FirestoreError indicating what went wrong.
 *
 * A PersistentStream can be started and stopped repeatedly.
 *
 * Generic types:
 *  SendType: The type of the outgoing message of the underlying
 *    connection stream
 *  ReceiveType: The type of the incoming message of the underlying
 *    connection stream
 *  ListenerType: The type of the listener that will be used for callbacks
 */var Zr=/*#__PURE__*/function(){function Zr(t,e,n,s,i,r,o){_classCallCheck(this,Zr);this.Oe=t,this.er=n,this.nr=s,this.sr=i,this.credentialsProvider=r,this.listener=o,this.state=0/* Initial */,/**
         * A close count that's incremented every time the stream is closed; used by
         * getCloseGuardedDispatcher() to invalidate callbacks that happen after
         * close.
         */this.ir=0,this.rr=null,this.cr=null,this.stream=null,this.ar=new Xr(t,e);}/**
     * Returns true if start() has been called and no error has occurred. True
     * indicates the stream is open or in the process of opening (which
     * encompasses respecting backoff, getting auth tokens, and starting the
     * actual RPC). Use isOpen() to determine if the stream is open and ready for
     * outbound requests.
     */_createClass(Zr,[{key:"ur",value:function ur(){return 1/* Starting */===this.state||5/* Backoff */===this.state||this.hr();}/**
     * Returns true if the underlying RPC is open (the onOpen() listener has been
     * called) and the stream is ready for outbound requests.
     */},{key:"hr",value:function hr(){return 2/* Open */===this.state||3/* Healthy */===this.state;}/**
     * Starts the RPC. Only allowed if isStarted() returns false. The stream is
     * not immediately ready for use: onOpen() will be invoked when the RPC is
     * ready for outbound requests, at which point isOpen() will return true.
     *
     * When start returns, isStarted() will return true.
     */},{key:"start",value:function start(){4/* Error */!==this.state?this.auth():this.lr();}/**
     * Stops the RPC. This call is idempotent and allowed regardless of the
     * current isStarted() state.
     *
     * When stop returns, isStarted() and isOpen() will both return false.
     */},{key:"stop",value:function(){var _stop=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee14(){return regenerator.wrap(function _callee14$(_context14){while(1){switch(_context14.prev=_context14.next){case 0:_context14.t0=this.ur();if(!_context14.t0){_context14.next=4;break;}_context14.next=4;return this.close(0/* Initial */);case 4:case"end":return _context14.stop();}}},_callee14,this);}));function stop(){return _stop.apply(this,arguments);}return stop;}()/**
     * After an error the stream will usually back off on the next attempt to
     * start it. If the error warrants an immediate restart of the stream, the
     * sender can use this to indicate that the receiver should not back off.
     *
     * Each error will call the onClose() listener. That function can decide to
     * inhibit backoff if required.
     */},{key:"dr",value:function dr(){this.state=0/* Initial */,this.ar.reset();}/**
     * Marks this stream as idle. If no further actions are performed on the
     * stream for one minute, the stream will automatically close itself and
     * notify the stream's onClose() handler with Status.OK. The stream will then
     * be in a !isStarted() state, requiring the caller to start the stream again
     * before further use.
     *
     * Only streams that are in state 'Open' can be marked idle, as all other
     * states imply pending network operations.
     */},{key:"wr",value:function wr(){var _this122=this;// Starts the idle time if we are in state 'Open' and are not yet already
// running a timer (in which case the previous idle timeout still applies).
this.hr()&&null===this.rr&&(this.rr=this.Oe.enqueueAfterDelay(this.er,6e4,function(){return _this122._r();}));}/** Sends a message to the underlying stream. */},{key:"mr",value:function mr(t){this.gr(),this.stream.send(t);}/** Called by the idle timer when the stream should close due to inactivity. */},{key:"_r",value:function(){var _r7=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee15(){return regenerator.wrap(function _callee15$(_context15){while(1){switch(_context15.prev=_context15.next){case 0:if(!this.hr()){_context15.next=2;break;}return _context15.abrupt("return",this.close(0/* Initial */));case 2:case"end":return _context15.stop();}}},_callee15,this);}));function _r(){return _r7.apply(this,arguments);}return _r;}()/** Marks the stream as active again. */},{key:"gr",value:function gr(){this.rr&&(this.rr.cancel(),this.rr=null);}/** Cancels the health check delayed operation. */},{key:"yr",value:function yr(){this.cr&&(this.cr.cancel(),this.cr=null);}/**
     * Closes the stream and cleans up as necessary:
     *
     * * closes the underlying GRPC stream;
     * * calls the onClose handler with the given 'error';
     * * sets internal stream state to 'finalState';
     * * adjusts the backoff timer based on the error
     *
     * A new stream can be opened by calling start().
     *
     * @param finalState - the intended state of the stream after closing.
     * @param error - the error the connection was closed with.
     */},{key:"close",value:function(){var _close=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee16(t,e){return regenerator.wrap(function _callee16$(_context16){while(1){switch(_context16.prev=_context16.next){case 0:this.gr();this.yr();this.ar.cancel();// Invalidates any stream-related callbacks (e.g. from auth or the
// underlying stream), guaranteeing they won't execute.
this.ir++;4/* Error */!==t?// If this is an intentional close ensure we don't delay our next connection attempt.
this.ar.reset():e&&e.code===K.RESOURCE_EXHAUSTED?(// Log the error. (Probably either 'quota exceeded' or 'max queue length reached'.)
O(e.toString()),O("Using maximum backoff delay to prevent overloading the backend."),this.ar.Yi()):e&&e.code===K.UNAUTHENTICATED&&3/* Healthy */!==this.state&&// "unauthenticated" error means the token was rejected. This should rarely
// happen since both Auth and AppCheck ensure a sufficient TTL when we
// request a token. If a user manually resets their system clock this can
// fail, however. In this case, we should get a Code.UNAUTHENTICATED error
// before we received the first message and we need to invalidate the token
// to ensure that we fetch a new token.
this.credentialsProvider.invalidateToken();// Clean up the underlying stream because we are no longer interested in events.
null!==this.stream&&(this.pr(),this.stream.close(),this.stream=null);// This state must be assigned before calling onClose() to allow the callback to
// inhibit backoff or otherwise manipulate the state in its non-started state.
this.state=t;_context16.next=9;return this.listener.Ci(e);case 9:case"end":return _context16.stop();}}},_callee16,this);}));function close(_x22,_x23){return _close.apply(this,arguments);}return close;}()/**
     * Can be overridden to perform additional cleanup before the stream is closed.
     * Calling super.tearDown() is not required.
     */},{key:"pr",value:function pr(){}},{key:"auth",value:function auth(){var _this123=this;this.state=1/* Starting */;var t=this.Tr(this.ir),e=this.ir;// TODO(mikelehen): Just use dispatchIfNotClosed, but see TODO below.
this.credentialsProvider.getToken().then(function(t){// Stream can be stopped while waiting for authentication.
// TODO(mikelehen): We really should just use dispatchIfNotClosed
// and let this dispatch onto the queue, but that opened a spec test can
// of worms that I don't want to deal with in this PR.
_this123.ir===e&&// Normally we'd have to schedule the callback on the AsyncQueue.
// However, the following calls are safe to be called outside the
// AsyncQueue since they don't chain asynchronous calls
_this123.Er(t);},function(e){t(function(){var t=new j(K.UNKNOWN,"Fetching auth token failed: "+e.message);return _this123.Ir(t);});});}},{key:"Er",value:function Er(t){var _this124=this;var e=this.Tr(this.ir);this.stream=this.Ar(t),this.stream.Si(function(){e(function(){return _this124.state=2/* Open */,_this124.cr=_this124.Oe.enqueueAfterDelay(_this124.nr,1e4,function(){return _this124.hr()&&(_this124.state=3/* Healthy */),Promise.resolve();}),_this124.listener.Si();});}),this.stream.Ci(function(t){e(function(){return _this124.Ir(t);});}),this.stream.onMessage(function(t){e(function(){return _this124.onMessage(t);});});}},{key:"lr",value:function lr(){var _this125=this;this.state=5/* Backoff */,this.ar.Xi(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee17(){return regenerator.wrap(function _callee17$(_context17){while(1){switch(_context17.prev=_context17.next){case 0:_this125.state=0/* Initial */,_this125.start();case 1:case"end":return _context17.stop();}}},_callee17);})));}// Visible for tests
},{key:"Ir",value:function Ir(t){// In theory the stream could close cleanly, however, in our current model
// we never expect this to happen because if we stop a stream ourselves,
// this callback will never be called. To prevent cases where we retry
// without a backoff accidentally, we set the stream to error in all cases.
return $("PersistentStream","close with error: ".concat(t)),this.stream=null,this.close(4/* Error */,t);}/**
     * Returns a "dispatcher" function that dispatches operations onto the
     * AsyncQueue but only runs them if closeCount remains unchanged. This allows
     * us to turn auth / stream callbacks into no-ops if the stream is closed /
     * re-opened, etc.
     */},{key:"Tr",value:function Tr(t){var _this126=this;return function(e){_this126.Oe.enqueueAndForget(function(){return _this126.ir===t?e():($("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve());});};}}]);return Zr;}();/**
 * A PersistentStream that implements the Listen RPC.
 *
 * Once the Listen stream has called the onOpen() listener, any number of
 * listen() and unlisten() calls can be made to control what changes will be
 * sent from the server for ListenResponses.
 */var to=/*#__PURE__*/function(_Zr){_inherits(to,_Zr);var _super26=_createSuper$1(to);function to(t,e,n,s,i){var _this127;_classCallCheck(this,to);_this127=_super26.call(this,t,"listen_stream_connection_backoff"/* ListenStreamConnectionBackoff */,"listen_stream_idle"/* ListenStreamIdle */,"health_check_timeout"/* HealthCheckTimeout */,e,n,i),_this127.N=s;return _this127;}_createClass(to,[{key:"Ar",value:function Ar(t){return this.sr.ji("Listen",t);}},{key:"onMessage",value:function onMessage(t){// A successful response means the stream is healthy
this.ar.reset();var e=ns(this.N,t),n=function(t){// We have only reached a consistent snapshot for the entire stream if there
// is a read_time set and it applies to all targets (i.e. the list of
// targets is empty). The backend is guaranteed to send such responses.
if(!("targetChange"in t))return rt.min();var e=t.targetChange;return e.targetIds&&e.targetIds.length?rt.min():e.readTime?jn(e.readTime):rt.min();}(t);return this.listener.Rr(e,n);}/**
     * Registers interest in the results of the given target. If the target
     * includes a resumeToken it will be included in the request. Results that
     * affect the target will be streamed back as WatchChange messages that
     * reference the targetId.
     */},{key:"br",value:function br(t){var e={};e.database=Yn(this.N),e.addTarget=function(t,e){var n;var s=e.target;return n=Ht(s)?{documents:os(t,s)}:{query:cs(t,s)},n.targetId=e.targetId,e.resumeToken.approximateByteSize()>0?n.resumeToken=qn(t,e.resumeToken):e.snapshotVersion.compareTo(rt.min())>0&&(// TODO(wuandy): Consider removing above check because it is most likely true.
// Right now, many tests depend on this behaviour though (leaving min() out
// of serialization).
n.readTime=Un(t,e.snapshotVersion.toTimestamp())),n;}(this.N,t);var n=us(this.N,t);n&&(e.labels=n),this.mr(e);}/**
     * Unregisters interest in the results of the target associated with the
     * given targetId.
     */},{key:"Pr",value:function Pr(t){var e={};e.database=Yn(this.N),e.removeTarget=t,this.mr(e);}}]);return to;}(Zr);/**
 * A Stream that implements the Write RPC.
 *
 * The Write RPC requires the caller to maintain special streamToken
 * state in between calls, to help the server understand which responses the
 * client has processed by the time the next request is made. Every response
 * will contain a streamToken; this value must be passed to the next
 * request.
 *
 * After calling start() on this stream, the next request must be a handshake,
 * containing whatever streamToken is on hand. Once a response to this
 * request is received, all pending mutations may be submitted. When
 * submitting multiple batches of mutations at the same time, it's
 * okay to use the same streamToken for the calls to writeMutations.
 *
 * TODO(b/33271235): Use proto types
 */var eo=/*#__PURE__*/function(_Zr2){_inherits(eo,_Zr2);var _super27=_createSuper$1(eo);function eo(t,e,n,s,i){var _this128;_classCallCheck(this,eo);_this128=_super27.call(this,t,"write_stream_connection_backoff"/* WriteStreamConnectionBackoff */,"write_stream_idle"/* WriteStreamIdle */,"health_check_timeout"/* HealthCheckTimeout */,e,n,i),_this128.N=s,_this128.vr=!1;return _this128;}/**
     * Tracks whether or not a handshake has been successfully exchanged and
     * the stream is ready to accept mutations.
     */_createClass(eo,[{key:"Vr",get:function get(){return this.vr;}// Override of PersistentStream.start
},{key:"start",value:function start(){this.vr=!1,this.lastStreamToken=void 0,_get(_getPrototypeOf(eo.prototype),"start",this).call(this);}},{key:"pr",value:function pr(){this.vr&&this.Sr([]);}},{key:"Ar",value:function Ar(t){return this.sr.ji("Write",t);}},{key:"onMessage",value:function onMessage(t){if(// Always capture the last stream token.
B(!!t.streamToken),this.lastStreamToken=t.streamToken,this.vr){// A successful first write response means the stream is healthy,
// Note, that we could consider a successful handshake healthy, however,
// the write itself might be causing an error we want to back off from.
this.ar.reset();var e=rs(t.writeResults,t.commitTime),n=jn(t.commitTime);return this.listener.Dr(n,e);}// The first response is always the handshake response
return B(!t.writeResults||0===t.writeResults.length),this.vr=!0,this.listener.Cr();}/**
     * Sends an initial streamToken to the server, performing the handshake
     * required to make the StreamingWrite RPC work. Subsequent
     * calls should wait until onHandshakeComplete was called.
     */},{key:"Nr",value:function Nr(){// TODO(dimond): Support stream resumption. We intentionally do not set the
// stream token on the handshake, ignoring any stream token we might have.
var t={};t.database=Yn(this.N),this.mr(t);}/** Sends a group of mutations to the Firestore backend to apply. */},{key:"Sr",value:function Sr(t){var _this129=this;var e={streamToken:this.lastStreamToken,writes:t.map(function(t){return ss(_this129.N,t);})};this.mr(e);}}]);return eo;}(Zr);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Datastore and its related methods are a wrapper around the external Google
 * Cloud Datastore grpc API, which provides an interface that is more convenient
 * for the rest of the client SDK architecture to consume.
 */ /**
 * An implementation of Datastore that exposes additional state for internal
 * consumption.
 */var no=/*#__PURE__*/function(_ref23){_inherits(no,_ref23);var _super28=_createSuper$1(no);function no(t,e,n){var _this130;_classCallCheck(this,no);_this130=_super28.call(this),_this130.credentials=t,_this130.sr=e,_this130.N=n,_this130.kr=!1;return _this130;}_createClass(no,[{key:"$r",value:function $r(){if(this.kr)throw new j(K.FAILED_PRECONDITION,"The client has already been terminated.");}/** Gets an auth token and invokes the provided RPC. */},{key:"Li",value:function Li(t,e,n){var _this131=this;return this.$r(),this.credentials.getToken().then(function(s){return _this131.sr.Li(t,e,n,s);})["catch"](function(t){throw "FirebaseError"===t.name?(t.code===K.UNAUTHENTICATED&&_this131.credentials.invalidateToken(),t):new j(K.UNKNOWN,t.toString());});}/** Gets an auth token and invokes the provided RPC with streamed results. */},{key:"Ki",value:function Ki(t,e,n){var _this132=this;return this.$r(),this.credentials.getToken().then(function(s){return _this132.sr.Ki(t,e,n,s);})["catch"](function(t){throw "FirebaseError"===t.name?(t.code===K.UNAUTHENTICATED&&_this132.credentials.invalidateToken(),t):new j(K.UNKNOWN,t.toString());});}},{key:"terminate",value:function terminate(){this.kr=!0;}}]);return no;}(/*#__PURE__*/function(){function _class4(){_classCallCheck(this,_class4);}return _class4;}());// TODO(firestorexp): Make sure there is only one Datastore instance per
// firestore-exp client.
/**
 * A component used by the RemoteStore to track the OnlineState (that is,
 * whether or not the client as a whole should be considered to be online or
 * offline), implementing the appropriate heuristics.
 *
 * In particular, when the client is trying to connect to the backend, we
 * allow up to MAX_WATCH_STREAM_FAILURES within ONLINE_STATE_TIMEOUT_MS for
 * a connection to succeed. If we have too many failures or the timeout elapses,
 * then we set the OnlineState to Offline, and the client will behave as if
 * it is offline (get()s will return cached data, etc.).
 */var so=/*#__PURE__*/function(){function so(t,e){_classCallCheck(this,so);this.asyncQueue=t,this.onlineStateHandler=e,/** The current OnlineState. */this.state="Unknown"/* Unknown */,/**
         * A count of consecutive failures to open the stream. If it reaches the
         * maximum defined by MAX_WATCH_STREAM_FAILURES, we'll set the OnlineState to
         * Offline.
         */this.Or=0,/**
         * A timer that elapses after ONLINE_STATE_TIMEOUT_MS, at which point we
         * transition from OnlineState.Unknown to OnlineState.Offline without waiting
         * for the stream to actually fail (MAX_WATCH_STREAM_FAILURES times).
         */this.Fr=null,/**
         * Whether the client should log a warning message if it fails to connect to
         * the backend (initially true, cleared after a successful stream, or if we've
         * logged the message already).
         */this.Mr=!0;}/**
     * Called by RemoteStore when a watch stream is started (including on each
     * backoff attempt).
     *
     * If this is the first attempt, it sets the OnlineState to Unknown and starts
     * the onlineStateTimer.
     */_createClass(so,[{key:"Lr",value:function Lr(){var _this133=this;0===this.Or&&(this.Br("Unknown"/* Unknown */),this.Fr=this.asyncQueue.enqueueAfterDelay("online_state_timeout"/* OnlineStateTimeout */,1e4,function(){return _this133.Fr=null,_this133.Ur("Backend didn't respond within 10 seconds."),_this133.Br("Offline"/* Offline */),Promise.resolve();}));}/**
     * Updates our OnlineState as appropriate after the watch stream reports a
     * failure. The first failure moves us to the 'Unknown' state. We then may
     * allow multiple failures (based on MAX_WATCH_STREAM_FAILURES) before we
     * actually transition to the 'Offline' state.
     */},{key:"qr",value:function qr(t){"Online"/* Online */===this.state?this.Br("Unknown"/* Unknown */):(this.Or++,this.Or>=1&&(this.Kr(),this.Ur("Connection failed 1 times. Most recent error: ".concat(t.toString())),this.Br("Offline"/* Offline */)));}/**
     * Explicitly sets the OnlineState to the specified state.
     *
     * Note that this resets our timers / failure counters, etc. used by our
     * Offline heuristics, so must not be used in place of
     * handleWatchStreamStart() and handleWatchStreamFailure().
     */},{key:"set",value:function set(t){this.Kr(),this.Or=0,"Online"/* Online */===t&&(// We've connected to watch at least once. Don't warn the developer
// about being offline going forward.
this.Mr=!1),this.Br(t);}},{key:"Br",value:function Br(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t));}},{key:"Ur",value:function Ur(t){var e="Could not reach Cloud Firestore backend. ".concat(t,"\nThis typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.");this.Mr?(O(e),this.Mr=!1):$("OnlineStateTracker",e);}},{key:"Kr",value:function Kr(){null!==this.Fr&&(this.Fr.cancel(),this.Fr=null);}}]);return so;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var io=function io(/**
     * The local store, used to fill the write pipeline with outbound mutations.
     */t,/** The client-side proxy for interacting with the backend. */e,n,s,i){var _this134=this;_classCallCheck(this,io);this.localStore=t,this.datastore=e,this.asyncQueue=n,this.remoteSyncer={},/**
         * A list of up to MAX_PENDING_WRITES writes that we have fetched from the
         * LocalStore via fillWritePipeline() and have or will send to the write
         * stream.
         *
         * Whenever writePipeline.length > 0 the RemoteStore will attempt to start or
         * restart the write stream. When the stream is established the writes in the
         * pipeline will be sent in order.
         *
         * Writes remain in writePipeline until they are acknowledged by the backend
         * and thus will automatically be re-sent if the stream is interrupted /
         * restarted before they're acknowledged.
         *
         * Write responses from the backend are linked to their originating request
         * purely based on order, and so we can just shift() writes from the front of
         * the writePipeline as we receive responses.
         */this.jr=[],/**
         * A mapping of watched targets that the client cares about tracking and the
         * user has explicitly called a 'listen' for this target.
         *
         * These targets may or may not have been sent to or acknowledged by the
         * server. On re-establishing the listen stream, these targets should be sent
         * to the server. The targets removed with unlistens are removed eagerly
         * without waiting for confirmation from the listen stream.
         */this.Qr=new Map(),/**
         * A set of reasons for why the RemoteStore may be offline. If empty, the
         * RemoteStore may start its network connections.
         */this.Wr=new Set(),/**
         * Event handlers that get called when the network is disabled or enabled.
         *
         * PORTING NOTE: These functions are used on the Web client to create the
         * underlying streams (to support tree-shakeable streams). On Android and iOS,
         * the streams are created during construction of RemoteStore.
         */this.Gr=[],this.zr=i,this.zr.Ti(function(t){n.enqueueAndForget(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee19(){return regenerator.wrap(function _callee19$(_context19){while(1){switch(_context19.prev=_context19.next){case 0:_context19.t0=wo(_this134);if(!_context19.t0){_context19.next=5;break;}$("RemoteStore","Restarting streams for network reachability change.");_context19.next=5;return function(){var _ref25=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee18(t){var e;return regenerator.wrap(function _callee18$(_context18){while(1){switch(_context18.prev=_context18.next){case 0:e=q(t);e.Wr.add(4/* ConnectivityChange */);_context18.next=4;return oo(e);case 4:e.Hr.set("Unknown"/* Unknown */);e.Wr["delete"](4/* ConnectivityChange */);_context18.next=8;return ro(e);case 8:case"end":return _context18.stop();}}},_callee18);}));return function(_x24){return _ref25.apply(this,arguments);};}()(_this134);case 5:case"end":return _context19.stop();}}},_callee19);})));}),this.Hr=new so(n,s);};function ro(_x25){return _ro.apply(this,arguments);}/**
 * Temporarily disables the network. The network can be re-enabled using
 * enableNetwork().
 */function _ro(){_ro=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee76(t){var _iterator63,_step63,e;return regenerator.wrap(function _callee76$(_context76){while(1){switch(_context76.prev=_context76.next){case 0:if(!wo(t)){_context76.next=18;break;}_iterator63=_createForOfIteratorHelper(t.Gr);_context76.prev=2;_iterator63.s();case 4:if((_step63=_iterator63.n()).done){_context76.next=10;break;}e=_step63.value;_context76.next=8;return e(/* enabled= */!0);case 8:_context76.next=4;break;case 10:_context76.next=15;break;case 12:_context76.prev=12;_context76.t0=_context76["catch"](2);_iterator63.e(_context76.t0);case 15:_context76.prev=15;_iterator63.f();return _context76.finish(15);case 18:case"end":return _context76.stop();}}},_callee76,null,[[2,12,15,18]]);}));return _ro.apply(this,arguments);}function oo(_x26){return _oo.apply(this,arguments);}/**
 * Starts new listen for the given target. Uses resume token if provided. It
 * is a no-op if the target of given `TargetData` is already being listened to.
 */function _oo(){_oo=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee77(t){var _iterator64,_step64,e;return regenerator.wrap(function _callee77$(_context77){while(1){switch(_context77.prev=_context77.next){case 0:_iterator64=_createForOfIteratorHelper(t.Gr);_context77.prev=1;_iterator64.s();case 3:if((_step64=_iterator64.n()).done){_context77.next=9;break;}e=_step64.value;_context77.next=7;return e(/* enabled= */!1);case 7:_context77.next=3;break;case 9:_context77.next=14;break;case 11:_context77.prev=11;_context77.t0=_context77["catch"](1);_iterator64.e(_context77.t0);case 14:_context77.prev=14;_iterator64.f();return _context77.finish(14);case 17:case"end":return _context77.stop();}}},_callee77,null,[[1,11,14,17]]);}));return _oo.apply(this,arguments);}function co(t,e){var n=q(t);n.Qr.has(e.targetId)||(// Mark this as something the client is currently listening for.
n.Qr.set(e.targetId,e),fo(n)?// The listen will be sent in onWatchStreamOpen
lo(n):Co(n).hr()&&uo(n,e));}/**
 * Removes the listen from server. It is a no-op if the given target id is
 * not being listened to.
 */function ao(t,e){var n=q(t),s=Co(n);n.Qr["delete"](e),s.hr()&&ho(n,e),0===n.Qr.size&&(s.hr()?s.wr():wo(n)&&// Revert to OnlineState.Unknown if the watch stream is not open and we
// have no listeners, since without any listens to send we cannot
// confirm if the stream is healthy and upgrade to OnlineState.Online.
n.Hr.set("Unknown"/* Unknown */));}/**
 * We need to increment the the expected number of pending responses we're due
 * from watch so we wait for the ack to process any messages from this target.
 */function uo(t,e){t.Jr.Y(e.targetId),Co(t).br(e);}/**
 * We need to increment the expected number of pending responses we're due
 * from watch so we wait for the removal on the server before we process any
 * messages from this target.
 */function ho(t,e){t.Jr.Y(e),Co(t).Pr(e);}function lo(t){t.Jr=new $n({getRemoteKeysForTarget:function getRemoteKeysForTarget(e){return t.remoteSyncer.getRemoteKeysForTarget(e);},Tt:function Tt(e){return t.Qr.get(e)||null;}}),Co(t).start(),t.Hr.Lr();}/**
 * Returns whether the watch stream should be started because it's necessary
 * and has not yet been started.
 */function fo(t){return wo(t)&&!Co(t).ur()&&t.Qr.size>0;}function wo(t){return 0===q(t).Wr.size;}function _o(t){t.Jr=void 0;}function mo(_x27){return _mo.apply(this,arguments);}function _mo(){_mo=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee78(t){return regenerator.wrap(function _callee78$(_context78){while(1){switch(_context78.prev=_context78.next){case 0:t.Qr.forEach(function(e,n){uo(t,e);});case 1:case"end":return _context78.stop();}}},_callee78);}));return _mo.apply(this,arguments);}function go(_x28,_x29){return _go.apply(this,arguments);}function _go(){_go=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee79(t,e){return regenerator.wrap(function _callee79$(_context79){while(1){switch(_context79.prev=_context79.next){case 0:_o(t),// If we still need the watch stream, retry the connection.
fo(t)?(t.Hr.qr(e),lo(t)):// No need to restart watch stream because there are no active targets.
// The online state is set to unknown because there is no active attempt
// at establishing a connection
t.Hr.set("Unknown"/* Unknown */);case 1:case"end":return _context79.stop();}}},_callee79);}));return _go.apply(this,arguments);}function yo(_x30,_x31,_x32){return _yo.apply(this,arguments);}/**
 * Recovery logic for IndexedDB errors that takes the network offline until
 * `op` succeeds. Retries are scheduled with backoff using
 * `enqueueRetryable()`. If `op()` is not provided, IndexedDB access is
 * validated via a generic operation.
 *
 * The returned Promise is resolved once the network is disabled and before
 * any retry attempt.
 */function _yo(){_yo=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee81(t,e,n){var _e46;return regenerator.wrap(function _callee81$(_context81){while(1){switch(_context81.prev=_context81.next){case 0:if(!(// Mark the client as online since we got a message from the server
t.Hr.set("Online"/* Online */),e instanceof xn&&2/* Removed */===e.state&&e.cause)){_context81.next=13;break;}_context81.prev=1;_context81.next=4;return(/** Handles an error on a target */function(){var _ref59=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee80(t,e){var n,_iterator65,_step65,s;return regenerator.wrap(function _callee80$(_context80){while(1){switch(_context80.prev=_context80.next){case 0:n=e.cause;_iterator65=_createForOfIteratorHelper(e.targetIds);_context80.prev=2;_iterator65.s();case 4:if((_step65=_iterator65.n()).done){_context80.next=14;break;}s=_step65.value;_context80.t0=t.Qr.has(s);if(!_context80.t0){_context80.next=12;break;}_context80.next=10;return t.remoteSyncer.rejectListen(s,n);case 10:t.Qr["delete"](s);t.Jr.removeTarget(s);case 12:_context80.next=4;break;case 14:_context80.next=19;break;case 16:_context80.prev=16;_context80.t1=_context80["catch"](2);_iterator65.e(_context80.t1);case 19:_context80.prev=19;_iterator65.f();return _context80.finish(19);case 22:case"end":return _context80.stop();}}},_callee80,null,[[2,16,19,22]]);}));return function(_x131,_x132){return _ref59.apply(this,arguments);};}()/**
 * Attempts to fill our write pipeline with writes from the LocalStore.
 *
 * Called internally to bootstrap or refill the write pipeline and by
 * SyncEngine whenever there are new mutations to process.
 *
 * Starts the write stream if necessary.
 */(t,e));case 4:_context81.next=11;break;case 6:_context81.prev=6;_context81.t0=_context81["catch"](1);$("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),_context81.t0);_context81.next=11;return po(t,_context81.t0);case 11:_context81.next=29;break;case 13:if(!(e instanceof Cn?t.Jr.rt(e):e instanceof Nn?t.Jr.ft(e):t.Jr.at(e),!n.isEqual(rt.min()))){_context81.next=29;break;}_context81.prev=14;_context81.next=17;return fr(t.localStore);case 17:_e46=_context81.sent;_context81.t1=n.compareTo(_e46)>=0;if(!_context81.t1){_context81.next=22;break;}_context81.next=22;return(/**
 * Takes a batch of changes from the Datastore, repackages them as a
 * RemoteEvent, and passes that on to the listener, which is typically the
 * SyncEngine.
 */function(t,e){var n=t.Jr._t(e);// Update in-memory resume tokens. LocalStore will update the
// persistent view of these when applying the completed RemoteEvent.
// Update in-memory resume tokens. LocalStore will update the
// persistent view of these when applying the completed RemoteEvent.
return n.targetChanges.forEach(function(n,s){if(n.resumeToken.approximateByteSize()>0){var i=t.Qr.get(s);// A watched target might have been removed already.
// A watched target might have been removed already.
i&&t.Qr.set(s,i.withResumeToken(n.resumeToken,e));}}),// Re-establish listens for the targets that have been invalidated by
// existence filter mismatches.
n.targetMismatches.forEach(function(e){var n=t.Qr.get(e);if(!n)// A watched target might have been removed already.
return;// Clear the resume token for the target, since we're in a known mismatch
// state.
// Clear the resume token for the target, since we're in a known mismatch
// state.
t.Qr.set(e,n.withResumeToken(_t.EMPTY_BYTE_STRING,n.snapshotVersion)),// Cause a hard reset by unwatching and rewatching immediately, but
// deliberately don't send a resume token so that we get a full update.
ho(t,e);// Mark the target we send as being on behalf of an existence filter
// mismatch, but don't actually retain that in listenTargets. This ensures
// that we flag the first re-listen this way without impacting future
// listens of this target (that might happen e.g. on reconnect).
// Mark the target we send as being on behalf of an existence filter
// mismatch, but don't actually retain that in listenTargets. This ensures
// that we flag the first re-listen this way without impacting future
// listens of this target (that might happen e.g. on reconnect).
var s=new ii(n.target,e,1/* ExistenceFilterMismatch */,n.sequenceNumber);uo(t,s);}),t.remoteSyncer.applyRemoteEvent(n);}(t,n));case 22:_context81.next=29;break;case 24:_context81.prev=24;_context81.t2=_context81["catch"](14);$("RemoteStore","Failed to raise snapshot:",_context81.t2);_context81.next=29;return po(t,_context81.t2);case 29:case"end":return _context81.stop();}}},_callee81,null,[[1,6],[14,24]]);}));return _yo.apply(this,arguments);}function po(_x33,_x34,_x35){return _po.apply(this,arguments);}/**
 * Executes `op`. If `op` fails, takes the network offline until `op`
 * succeeds. Returns after the first attempt.
 */function _po(){_po=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee83(t,e,n){return regenerator.wrap(function _callee83$(_context83){while(1){switch(_context83.prev=_context83.next){case 0:if(Hs(e)){_context83.next=2;break;}throw e;case 2:t.Wr.add(1/* IndexedDbFailed */);_context83.next=5;return oo(t);case 5:t.Hr.set("Offline"/* Offline */);n||(// Use a simple read operation to determine if IndexedDB recovered.
// Ideally, we would expose a health check directly on SimpleDb, but
// RemoteStore only has access to persistence through LocalStore.
n=function n(){return fr(t.localStore);});// Probe IndexedDB periodically and re-enable network
t.asyncQueue.enqueueRetryable(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee82(){return regenerator.wrap(function _callee82$(_context82){while(1){switch(_context82.prev=_context82.next){case 0:$("RemoteStore","Retrying IndexedDB access");_context82.next=3;return n();case 3:t.Wr["delete"](1/* IndexedDbFailed */);_context82.next=6;return ro(t);case 6:case"end":return _context82.stop();}}},_callee82);})));case 8:case"end":return _context83.stop();}}},_callee83);}));return _po.apply(this,arguments);}function To(t,e){return e()["catch"](function(n){return po(t,n,e);});}function Eo(_x36){return _Eo.apply(this,arguments);}/**
 * Returns true if we can add to the write pipeline (i.e. the network is
 * enabled and the write pipeline is not full).
 */function _Eo(){_Eo=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee84(t){var e,n,s,_t88;return regenerator.wrap(function _callee84$(_context84){while(1){switch(_context84.prev=_context84.next){case 0:e=q(t),n=No(e);s=e.jr.length>0?e.jr[e.jr.length-1].batchId:-1;case 2:if(!Io(e)){_context84.next=19;break;}_context84.prev=3;_context84.next=6;return _r(e.localStore,s);case 6:_t88=_context84.sent;if(!(null===_t88)){_context84.next=10;break;}0===e.jr.length&&n.wr();return _context84.abrupt("break",19);case 10:s=_t88.batchId,Ao(e,_t88);_context84.next=17;break;case 13:_context84.prev=13;_context84.t0=_context84["catch"](3);_context84.next=17;return po(e,_context84.t0);case 17:_context84.next=2;break;case 19:Ro(e)&&bo(e);case 20:case"end":return _context84.stop();}}},_callee84,null,[[3,13]]);}));return _Eo.apply(this,arguments);}function Io(t){return wo(t)&&t.jr.length<10;}/**
 * Queues additional writes to be sent to the write stream, sending them
 * immediately if the write stream is established.
 */function Ao(t,e){t.jr.push(e);var n=No(t);n.hr()&&n.Vr&&n.Sr(e.mutations);}function Ro(t){return wo(t)&&!No(t).ur()&&t.jr.length>0;}function bo(t){No(t).start();}function Po(_x37){return _Po.apply(this,arguments);}function _Po(){_Po=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee85(t){return regenerator.wrap(function _callee85$(_context85){while(1){switch(_context85.prev=_context85.next){case 0:No(t).Nr();case 1:case"end":return _context85.stop();}}},_callee85);}));return _Po.apply(this,arguments);}function vo(_x38){return _vo.apply(this,arguments);}function _vo(){_vo=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee86(t){var e,_iterator66,_step66,n;return regenerator.wrap(function _callee86$(_context86){while(1){switch(_context86.prev=_context86.next){case 0:e=No(t);// Send the write pipeline now that the stream is established.
_iterator66=_createForOfIteratorHelper(t.jr);try{for(_iterator66.s();!(_step66=_iterator66.n()).done;){n=_step66.value;e.Sr(n.mutations);}}catch(err){_iterator66.e(err);}finally{_iterator66.f();}case 3:case"end":return _context86.stop();}}},_callee86);}));return _vo.apply(this,arguments);}function Vo(_x39,_x40,_x41){return _Vo.apply(this,arguments);}function _Vo(){_Vo=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee87(t,e,n){var s,i;return regenerator.wrap(function _callee87$(_context87){while(1){switch(_context87.prev=_context87.next){case 0:s=t.jr.shift(),i=si.from(s,e,n);_context87.next=3;return To(t,function(){return t.remoteSyncer.applySuccessfulWrite(i);});case 3:_context87.next=5;return Eo(t);case 5:case"end":return _context87.stop();}}},_callee87);}));return _Vo.apply(this,arguments);}function So(_x42,_x43){return _So.apply(this,arguments);}/**
 * Toggles the network state when the client gains or loses its primary lease.
 */function _So(){_So=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee89(t,e){return regenerator.wrap(function _callee89$(_context89){while(1){switch(_context89.prev=_context89.next){case 0:_context89.t0=e&&No(t).Vr;if(!_context89.t0){_context89.next=4;break;}_context89.next=4;return function(){var _ref61=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee88(t,e){var _n35,n;return regenerator.wrap(function _callee88$(_context88){while(1){switch(_context88.prev=_context88.next){case 0:if(!(n=e.code,fn(n)&&n!==K.ABORTED)){_context88.next=7;break;}// This was a permanent error, the request itself was the problem
// so it's not going to succeed if we resend it.
_n35=t.jr.shift();// In this case it's also unlikely that the server itself is melting
// down -- this was just a bad request so inhibit backoff on the next
// restart.
No(t).dr();_context88.next=5;return To(t,function(){return t.remoteSyncer.rejectFailedWrite(_n35.batchId,e);});case 5:_context88.next=7;return Eo(t);case 7:case"end":return _context88.stop();}}},_callee88);}));return function(_x133,_x134){return _ref61.apply(this,arguments);};}()(t,e);case 4:// The write stream might have been started by refilling the write
// pipeline for failed writes
Ro(t)&&bo(t);case 5:case"end":return _context89.stop();}}},_callee89);}));return _So.apply(this,arguments);}function Do(_x44,_x45){return _Do.apply(this,arguments);}/**
 * If not yet initialized, registers the WatchStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WatchStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */function _Do(){_Do=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee90(t,e){var n;return regenerator.wrap(function _callee90$(_context90){while(1){switch(_context90.prev=_context90.next){case 0:n=q(t);if(!e){_context90.next=7;break;}n.Wr["delete"](2/* IsSecondary */);_context90.next=5;return ro(n);case 5:_context90.next=13;break;case 7:_context90.t0=e;if(_context90.t0){_context90.next=13;break;}n.Wr.add(2/* IsSecondary */);_context90.next=12;return oo(n);case 12:n.Hr.set("Unknown"/* Unknown */);case 13:case"end":return _context90.stop();}}},_callee90);}));return _Do.apply(this,arguments);}function Co(t){return t.Yr||(// Create stream (but note that it is not started yet).
t.Yr=function(t,e,n){var s=q(t);return s.$r(),new to(e,s.sr,s.credentials,s.N,n);}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t.datastore,t.asyncQueue,{Si:mo.bind(null,t),Ci:go.bind(null,t),Rr:yo.bind(null,t)}),t.Gr.push(/*#__PURE__*/function(){var _ref26=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee20(e){return regenerator.wrap(function _callee20$(_context20){while(1){switch(_context20.prev=_context20.next){case 0:if(!e){_context20.next=4;break;}t.Yr.dr(),fo(t)?lo(t):t.Hr.set("Unknown"/* Unknown */);_context20.next=7;break;case 4:_context20.next=6;return t.Yr.stop();case 6:_o(t);case 7:case"end":return _context20.stop();}}},_callee20);}));return function(_x46){return _ref26.apply(this,arguments);};}())),t.Yr;}/**
 * If not yet initialized, registers the WriteStream and its network state
 * callback with `remoteStoreImpl`. Returns the existing stream if one is
 * already available.
 *
 * PORTING NOTE: On iOS and Android, the WriteStream gets registered on startup.
 * This is not done on Web to allow it to be tree-shaken.
 */function No(t){return t.Xr||(// Create stream (but note that it is not started yet).
t.Xr=function(t,e,n){var s=q(t);return s.$r(),new eo(e,s.sr,s.credentials,s.N,n);}(t.datastore,t.asyncQueue,{Si:Po.bind(null,t),Ci:So.bind(null,t),Cr:vo.bind(null,t),Dr:Vo.bind(null,t)}),t.Gr.push(/*#__PURE__*/function(){var _ref27=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee21(e){return regenerator.wrap(function _callee21$(_context21){while(1){switch(_context21.prev=_context21.next){case 0:if(!e){_context21.next=6;break;}t.Xr.dr();_context21.next=4;return Eo(t);case 4:_context21.next=9;break;case 6:_context21.next=8;return t.Xr.stop();case 8:t.jr.length>0&&($("RemoteStore","Stopping write stream with ".concat(t.jr.length," pending writes")),t.jr=[]);case 9:case"end":return _context21.stop();}}},_callee21);}));return function(_x47){return _ref27.apply(this,arguments);};}())),t.Xr;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Represents an operation scheduled to be run in the future on an AsyncQueue.
 *
 * It is created via DelayedOperation.createAndSchedule().
 *
 * Supports cancellation (via cancel()) and early execution (via skipDelay()).
 *
 * Note: We implement `PromiseLike` instead of `Promise`, as the `Promise` type
 * in newer versions of TypeScript defines `finally`, which is not available in
 * IE.
 */var xo=/*#__PURE__*/function(){function xo(t,e,n,s,i){_classCallCheck(this,xo);this.asyncQueue=t,this.timerId=e,this.targetTimeMs=n,this.op=s,this.removalCallback=i,this.deferred=new Q(),this.then=this.deferred.promise.then.bind(this.deferred.promise),// It's normal for the deferred promise to be canceled (due to cancellation)
// and so we attach a dummy catch callback to avoid
// 'UnhandledPromiseRejectionWarning' log spam.
this.deferred.promise["catch"](function(t){});}/**
     * Creates and returns a DelayedOperation that has been scheduled to be
     * executed on the provided asyncQueue after the provided delayMs.
     *
     * @param asyncQueue - The queue to schedule the operation on.
     * @param id - A Timer ID identifying the type of operation this is.
     * @param delayMs - The delay (ms) before the operation should be scheduled.
     * @param op - The operation to run.
     * @param removalCallback - A callback to be called synchronously once the
     *   operation is executed or canceled, notifying the AsyncQueue to remove it
     *   from its delayedOperations list.
     *   PORTING NOTE: This exists to prevent making removeDelayedOperation() and
     *   the DelayedOperation class public.
     */_createClass(xo,[{key:"start",value:/**
     * Starts the timer. This is called immediately after construction by
     * createAndSchedule().
     */function start(t){var _this135=this;this.timerHandle=setTimeout(function(){return _this135.handleDelayElapsed();},t);}/**
     * Queues the operation to run immediately (if it hasn't already been run or
     * canceled).
     */},{key:"skipDelay",value:function skipDelay(){return this.handleDelayElapsed();}/**
     * Cancels the operation if it hasn't already been executed or canceled. The
     * promise will be rejected.
     *
     * As long as the operation has not yet been run, calling cancel() provides a
     * guarantee that the operation will not be run.
     */},{key:"cancel",value:function cancel(t){null!==this.timerHandle&&(this.clearTimeout(),this.deferred.reject(new j(K.CANCELLED,"Operation cancelled"+(t?": "+t:""))));}},{key:"handleDelayElapsed",value:function handleDelayElapsed(){var _this136=this;this.asyncQueue.enqueueAndForget(function(){return null!==_this136.timerHandle?(_this136.clearTimeout(),_this136.op().then(function(t){return _this136.deferred.resolve(t);})):Promise.resolve();});}},{key:"clearTimeout",value:function(_clearTimeout){function clearTimeout(){return _clearTimeout.apply(this,arguments);}clearTimeout.toString=function(){return _clearTimeout.toString();};return clearTimeout;}(function(){null!==this.timerHandle&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null);})}],[{key:"createAndSchedule",value:function createAndSchedule(t,e,n,s,i){var r=Date.now()+n,o=new xo(t,e,r,s,i);return o.start(n),o;}}]);return xo;}();/**
 * Returns a FirestoreError that can be surfaced to the user if the provided
 * error is an IndexedDbTransactionError. Re-throws the error otherwise.
 */function ko(t,e){if(O("AsyncQueue","".concat(e,": ").concat(t)),Hs(t))return new j(K.UNAVAILABLE,"".concat(e,": ").concat(t));throw t;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * DocumentSet is an immutable (copy-on-write) collection that holds documents
 * in order specified by the provided comparator. We always add a document key
 * comparator on top of what is provided to guarantee document equality based on
 * the key.
 */var $o=/*#__PURE__*/function(){/** The default ordering is by key if the comparator is omitted */function $o(t){_classCallCheck(this,$o);// We are adding document key comparator to the end as it's the only
// guaranteed unique property of a document.
this.comparator=t?function(e,n){return t(e,n)||Pt.comparator(e.key,n.key);}:function(t,e){return Pt.comparator(t.key,e.key);},this.keyedMap=In(),this.sortedSet=new wn(this.comparator);}/**
     * Returns an empty copy of the existing DocumentSet, using the same
     * comparator.
     */_createClass($o,[{key:"has",value:function has(t){return null!=this.keyedMap.get(t);}},{key:"get",value:function get(t){return this.keyedMap.get(t);}},{key:"first",value:function first(){return this.sortedSet.minKey();}},{key:"last",value:function last(){return this.sortedSet.maxKey();}},{key:"isEmpty",value:function isEmpty(){return this.sortedSet.isEmpty();}/**
     * Returns the index of the provided key in the document set, or -1 if the
     * document key is not present in the set;
     */},{key:"indexOf",value:function indexOf(t){var e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1;}},{key:"size",get:function get(){return this.sortedSet.size;}/** Iterates documents in order defined by "comparator" */},{key:"forEach",value:function forEach(t){this.sortedSet.inorderTraversal(function(e,n){return t(e),!1;});}/** Inserts or updates a document with the same key */},{key:"add",value:function add(t){// First remove the element if we have it.
var e=this["delete"](t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null));}/** Deletes a document with a given key */},{key:"delete",value:function _delete(t){var e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this;}},{key:"isEqual",value:function isEqual(t){if(!(t instanceof $o))return !1;if(this.size!==t.size)return !1;var e=this.sortedSet.getIterator(),n=t.sortedSet.getIterator();for(;e.hasNext();){var _t61=e.getNext().key,s=n.getNext().key;if(!_t61.isEqual(s))return !1;}return !0;}},{key:"toString",value:function toString(){var t=[];return this.forEach(function(e){t.push(e.toString());}),0===t.length?"DocumentSet ()":"DocumentSet (\n  "+t.join("  \n")+"\n)";}},{key:"copy",value:function copy(t,e){var n=new $o();return n.comparator=this.comparator,n.keyedMap=t,n.sortedSet=e,n;}}],[{key:"emptySet",value:function emptySet(t){return new $o(t.comparator);}}]);return $o;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * DocumentChangeSet keeps track of a set of changes to docs in a query, merging
 * duplicate events for the same doc.
 */var Oo=/*#__PURE__*/function(){function Oo(){_classCallCheck(this,Oo);this.Zr=new wn(Pt.comparator);}_createClass(Oo,[{key:"track",value:function track(t){var e=t.doc.key,n=this.Zr.get(e);n?// Merge the new change with the existing change.
0/* Added */!==t.type&&3/* Metadata */===n.type?this.Zr=this.Zr.insert(e,t):3/* Metadata */===t.type&&1/* Removed */!==n.type?this.Zr=this.Zr.insert(e,{type:n.type,doc:t.doc}):2/* Modified */===t.type&&2/* Modified */===n.type?this.Zr=this.Zr.insert(e,{type:2/* Modified */,doc:t.doc}):2/* Modified */===t.type&&0/* Added */===n.type?this.Zr=this.Zr.insert(e,{type:0/* Added */,doc:t.doc}):1/* Removed */===t.type&&0/* Added */===n.type?this.Zr=this.Zr.remove(e):1/* Removed */===t.type&&2/* Modified */===n.type?this.Zr=this.Zr.insert(e,{type:1/* Removed */,doc:n.doc}):0/* Added */===t.type&&1/* Removed */===n.type?this.Zr=this.Zr.insert(e,{type:2/* Modified */,doc:t.doc}):// This includes these cases, which don't make sense:
// Added->Added
// Removed->Removed
// Modified->Added
// Removed->Modified
// Metadata->Added
// Removed->Metadata
L():this.Zr=this.Zr.insert(e,t);}},{key:"eo",value:function eo(){var t=[];return this.Zr.inorderTraversal(function(e,n){t.push(n);}),t;}}]);return Oo;}();var Fo=/*#__PURE__*/function(){function Fo(t,e,n,s,i,r,o,c){_classCallCheck(this,Fo);this.query=t,this.docs=e,this.oldDocs=n,this.docChanges=s,this.mutatedKeys=i,this.fromCache=r,this.syncStateChanged=o,this.excludesMetadataChanges=c;}/** Returns a view snapshot as if all documents in the snapshot were added. */_createClass(Fo,[{key:"hasPendingWrites",get:function get(){return !this.mutatedKeys.isEmpty();}},{key:"isEqual",value:function isEqual(t){if(!(this.fromCache===t.fromCache&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&Ae(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return !1;var e=this.docChanges,n=t.docChanges;if(e.length!==n.length)return !1;for(var _t62=0;_t62<e.length;_t62++){if(e[_t62].type!==n[_t62].type||!e[_t62].doc.isEqual(n[_t62].doc))return !1;}return !0;}}],[{key:"fromInitialDocuments",value:function fromInitialDocuments(t,e,n,s){var i=[];return e.forEach(function(t){i.push({type:0/* Added */,doc:t});}),new Fo(t,e,$o.emptySet(e),i,n,s,/* syncStateChanged= */!0,/* excludesMetadataChanges= */!1);}}]);return Fo;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Holds the listeners and the last received ViewSnapshot for a query being
 * tracked by EventManager.
 */var Mo=function Mo(){_classCallCheck(this,Mo);this.no=void 0,this.listeners=[];};var Lo=function Lo(){_classCallCheck(this,Lo);this.queries=new ji(function(t){return Re(t);},Ae),this.onlineState="Unknown"/* Unknown */,this.so=new Set();};function Bo(_x48,_x49){return _Bo.apply(this,arguments);}function _Bo(){_Bo=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee91(t,e){var n,s,i,r,_n36;return regenerator.wrap(function _callee91$(_context91){while(1){switch(_context91.prev=_context91.next){case 0:n=q(t),s=e.query;i=!1,r=n.queries.get(s);if(!(r||(i=!0,r=new Mo()),i)){_context91.next=13;break;}_context91.prev=3;_context91.next=6;return n.onListen(s);case 6:r.no=_context91.sent;_context91.next=13;break;case 9:_context91.prev=9;_context91.t0=_context91["catch"](3);_n36=ko(_context91.t0,"Initialization of query '".concat(be(e.query),"' failed"));return _context91.abrupt("return",void e.onError(_n36));case 13:if(n.queries.set(s,r),r.listeners.push(e),// Run global snapshot listeners if a consistent snapshot has been emitted.
e.io(n.onlineState),r.no){e.ro(r.no)&&jo(n);}case 14:case"end":return _context91.stop();}}},_callee91,null,[[3,9]]);}));return _Bo.apply(this,arguments);}function Uo(_x50,_x51){return _Uo.apply(this,arguments);}function _Uo(){_Uo=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee92(t,e){var n,s,i,r,_t89;return regenerator.wrap(function _callee92$(_context92){while(1){switch(_context92.prev=_context92.next){case 0:n=q(t),s=e.query;i=!1;r=n.queries.get(s);if(r){_t89=r.listeners.indexOf(e);_t89>=0&&(r.listeners.splice(_t89,1),i=0===r.listeners.length);}if(!i){_context92.next=6;break;}return _context92.abrupt("return",(n.queries["delete"](s),n.onUnlisten(s)));case 6:case"end":return _context92.stop();}}},_callee92);}));return _Uo.apply(this,arguments);}function qo(t,e){var n=q(t);var s=!1;var _iterator39=_createForOfIteratorHelper(e),_step39;try{for(_iterator39.s();!(_step39=_iterator39.n()).done;){var _t63=_step39.value;var _e35=_t63.query,i=n.queries.get(_e35);if(i){var _iterator40=_createForOfIteratorHelper(i.listeners),_step40;try{for(_iterator40.s();!(_step40=_iterator40.n()).done;){var _e36=_step40.value;_e36.ro(_t63)&&(s=!0);}}catch(err){_iterator40.e(err);}finally{_iterator40.f();}i.no=_t63;}}}catch(err){_iterator39.e(err);}finally{_iterator39.f();}s&&jo(n);}function Ko(t,e,n){var s=q(t),i=s.queries.get(e);if(i){var _iterator41=_createForOfIteratorHelper(i.listeners),_step41;try{for(_iterator41.s();!(_step41=_iterator41.n()).done;){var _t64=_step41.value;_t64.onError(n);}}catch(err){_iterator41.e(err);}finally{_iterator41.f();}}// Remove all listeners. NOTE: We don't need to call syncEngine.unlisten()
// after an error.
s.queries["delete"](e);}// Call all global snapshot listeners that have been set.
function jo(t){t.so.forEach(function(t){t.next();});}/**
 * QueryListener takes a series of internal view snapshots and determines
 * when to raise the event.
 *
 * It uses an Observer to dispatch events.
 */var Qo=/*#__PURE__*/function(){function Qo(t,e,n){_classCallCheck(this,Qo);this.query=t,this.oo=e,/**
         * Initial snapshots (e.g. from cache) may not be propagated to the wrapped
         * observer. This flag is set to true once we've actually raised an event.
         */this.co=!1,this.ao=null,this.onlineState="Unknown"/* Unknown */,this.options=n||{};}/**
     * Applies the new ViewSnapshot to this listener, raising a user-facing event
     * if applicable (depending on what changed, whether the user has opted into
     * metadata-only changes, etc.). Returns true if a user-facing event was
     * indeed raised.
     */_createClass(Qo,[{key:"ro",value:function ro(t){if(!this.options.includeMetadataChanges){// Remove the metadata only changes.
var _e37=[];var _iterator42=_createForOfIteratorHelper(t.docChanges),_step42;try{for(_iterator42.s();!(_step42=_iterator42.n()).done;){var n=_step42.value;3/* Metadata */!==n.type&&_e37.push(n);}}catch(err){_iterator42.e(err);}finally{_iterator42.f();}t=new Fo(t.query,t.docs,t.oldDocs,_e37,t.mutatedKeys,t.fromCache,t.syncStateChanged,/* excludesMetadataChanges= */!0);}var e=!1;return this.co?this.uo(t)&&(this.oo.next(t),e=!0):this.ho(t,this.onlineState)&&(this.lo(t),e=!0),this.ao=t,e;}},{key:"onError",value:function onError(t){this.oo.error(t);}/** Returns whether a snapshot was raised. */},{key:"io",value:function io(t){this.onlineState=t;var e=!1;return this.ao&&!this.co&&this.ho(this.ao,t)&&(this.lo(this.ao),e=!0),e;}},{key:"ho",value:function ho(t,e){// Always raise the first event when we're synced
if(!t.fromCache)return !0;// NOTE: We consider OnlineState.Unknown as online (it should become Offline
// or Online if we wait long enough).
var n="Offline"/* Offline */!==e;// Don't raise the event if we're online, aren't synced yet (checked
// above) and are waiting for a sync.
return (!this.options.fo||!n)&&(!t.docs.isEmpty()||"Offline"/* Offline */===e);// Raise data from cache if we have any documents or we are offline
}},{key:"uo",value:function uo(t){// We don't need to handle includeDocumentMetadataChanges here because
// the Metadata only changes have already been stripped out if needed.
// At this point the only changes we will see are the ones we should
// propagate.
if(t.docChanges.length>0)return !0;var e=this.ao&&this.ao.hasPendingWrites!==t.hasPendingWrites;return !(!t.syncStateChanged&&!e)&&!0===this.options.includeMetadataChanges;// Generally we should have hit one of the cases above, but it's possible
// to get here if there were only metadata docChanges and they got
// stripped out.
}},{key:"lo",value:function lo(t){t=Fo.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache),this.co=!0,this.oo.next(t);}}]);return Qo;}();/**
 * Returns a `LoadBundleTaskProgress` representing the progress that the loading
 * has succeeded.
 */ /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Jo=function Jo(t){_classCallCheck(this,Jo);this.key=t;};var Yo=function Yo(t){_classCallCheck(this,Yo);this.key=t;};/**
 * View is responsible for computing the final merged truth of what docs are in
 * a query. It gets notified of local and remote changes to docs, and applies
 * the query filters and limits to determine the most correct possible results.
 */var Xo=/*#__PURE__*/function(){function Xo(t,/** Documents included in the remote target */e){_classCallCheck(this,Xo);this.query=t,this.po=e,this.To=null,/**
         * A flag whether the view is current with the backend. A view is considered
         * current after it has seen the current flag from the backend and did not
         * lose consistency within the watch stream (e.g. because of an existence
         * filter mismatch).
         */this.current=!1,/** Documents in the view but not in the remote target */this.Eo=Pn(),/** Document Keys that have local changes */this.mutatedKeys=Pn(),this.Io=ve(t),this.Ao=new $o(this.Io);}/**
     * The set of remote documents that the server has told us belongs to the target associated with
     * this view.
     */_createClass(Xo,[{key:"Ro",get:function get(){return this.po;}/**
     * Iterates over a set of doc changes, applies the query limit, and computes
     * what the new results should be, what the changes were, and whether we may
     * need to go back to the local cache for more results. Does not make any
     * changes to the view.
     * @param docChanges - The doc changes to apply to this view.
     * @param previousChanges - If this is being called with a refill, then start
     *        with this set of docs and changes instead of the current view.
     * @returns a new set of docs, changes, and refill flag.
     */},{key:"bo",value:function bo(t,e){var _this137=this;var n=e?e.Po:new Oo(),s=e?e.Ao:this.Ao;var i=e?e.mutatedKeys:this.mutatedKeys,r=s,o=!1;// Track the last doc in a (full) limit. This is necessary, because some
// update (a delete, or an update moving a doc past the old limit) might
// mean there is some other document in the local cache that either should
// come (1) between the old last limit doc and the new last document, in the
// case of updates, or (2) after the new last document, in the case of
// deletes. So we keep this doc at the old limit to compare the updates to.
// Note that this should never get used in a refill (when previousChanges is
// set), because there will only be adds -- no deletes or updates.
var c=_e(this.query)&&s.size===this.query.limit?s.last():null,a=me(this.query)&&s.size===this.query.limit?s.first():null;// Drop documents out to meet limit/limitToLast requirement.
if(t.inorderTraversal(function(t,e){var u=s.get(t),h=Pe(_this137.query,e)?e:null,l=!!u&&_this137.mutatedKeys.has(u.key),f=!!h&&(h.hasLocalMutations||// We only consider committed mutations for documents that were
// mutated during the lifetime of the view.
_this137.mutatedKeys.has(h.key)&&h.hasCommittedMutations);var d=!1;// Calculate change
if(u&&h){u.data.isEqual(h.data)?l!==f&&(n.track({type:3/* Metadata */,doc:h}),d=!0):_this137.vo(u,h)||(n.track({type:2/* Modified */,doc:h}),d=!0,(c&&_this137.Io(h,c)>0||a&&_this137.Io(h,a)<0)&&(// This doc moved from inside the limit to outside the limit.
// That means there may be some other doc in the local cache
// that should be included instead.
o=!0));}else !u&&h?(n.track({type:0/* Added */,doc:h}),d=!0):u&&!h&&(n.track({type:1/* Removed */,doc:u}),d=!0,(c||a)&&(// A doc was removed from a full limit query. We'll need to
// requery from the local cache to see if we know about some other
// doc that should be in the results.
o=!0));d&&(h?(r=r.add(h),i=f?i.add(t):i["delete"](t)):(r=r["delete"](t),i=i["delete"](t)));}),_e(this.query)||me(this.query))for(;r.size>this.query.limit;){var _t67=_e(this.query)?r.last():r.first();r=r["delete"](_t67.key),i=i["delete"](_t67.key),n.track({type:1/* Removed */,doc:_t67});}return {Ao:r,Po:n,Ln:o,mutatedKeys:i};}},{key:"vo",value:function vo(t,e){// We suppress the initial change event for documents that were modified as
// part of a write acknowledgment (e.g. when the value of a server transform
// is applied) as Watch will send us the same document again.
// By suppressing the event, we only raise two user visible events (one with
// `hasPendingWrites` and the final state of the document) instead of three
// (one with `hasPendingWrites`, the modified document with
// `hasPendingWrites` and the final state of the document).
return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations;}/**
     * Updates the view with the given ViewDocumentChanges and optionally updates
     * limbo docs and sync state from the provided target change.
     * @param docChanges - The set of changes to make to the view's docs.
     * @param updateLimboDocuments - Whether to update limbo documents based on
     *        this change.
     * @param targetChange - A target change to apply for computing limbo docs and
     *        sync state.
     * @returns A new ViewChange with the given docs, changes, and sync state.
     */ // PORTING NOTE: The iOS/Android clients always compute limbo document changes.
},{key:"applyChanges",value:function applyChanges(t,e,n){var _this138=this;var s=this.Ao;this.Ao=t.Ao,this.mutatedKeys=t.mutatedKeys;// Sort changes based on type and query comparator
var i=t.Po.eo();i.sort(function(t,e){return function(t,e){var n=function n(t){switch(t){case 0/* Added */:return 1;case 2/* Modified */:case 3/* Metadata */:// A metadata change is converted to a modified change at the public
// api layer.  Since we sort by document key and then change type,
// metadata and modified changes must be sorted equivalently.
return 2;case 1/* Removed */:return 0;default:return L();}};return n(t)-n(e);}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t.type,e.type)||_this138.Io(t.doc,e.doc);}),this.Vo(n);var r=e?this.So():[],o=0===this.Eo.size&&this.current?1/* Synced */:0/* Local */,c=o!==this.To;if(this.To=o,0!==i.length||c){return {snapshot:new Fo(this.query,t.Ao,s,i,t.mutatedKeys,0/* Local */===o,c,/* excludesMetadataChanges= */!1),Do:r};}// no changes
return {Do:r};}/**
     * Applies an OnlineState change to the view, potentially generating a
     * ViewChange if the view's syncState changes as a result.
     */},{key:"io",value:function io(t){return this.current&&"Offline"/* Offline */===t?(// If we're offline, set `current` to false and then call applyChanges()
// to refresh our syncState and generate a ViewChange as appropriate. We
// are guaranteed to get a new TargetChange that sets `current` back to
// true once the client is back online.
this.current=!1,this.applyChanges({Ao:this.Ao,Po:new Oo(),mutatedKeys:this.mutatedKeys,Ln:!1},/* updateLimboDocuments= */!1)):{Do:[]};}/**
     * Returns whether the doc for the given key should be in limbo.
     */},{key:"Co",value:function Co(t){// If the remote end says it's part of this query, it's not in limbo.
return !this.po.has(t)&&// The local store doesn't think it's a result, so it shouldn't be in limbo.
!!this.Ao.has(t)&&!this.Ao.get(t).hasLocalMutations;}/**
     * Updates syncedDocuments, current, and limbo docs based on the given change.
     * Returns the list of changes to which docs are in limbo.
     */},{key:"Vo",value:function Vo(t){var _this139=this;t&&(t.addedDocuments.forEach(function(t){return _this139.po=_this139.po.add(t);}),t.modifiedDocuments.forEach(function(t){}),t.removedDocuments.forEach(function(t){return _this139.po=_this139.po["delete"](t);}),this.current=t.current);}},{key:"So",value:function So(){var _this140=this;// We can only determine limbo documents when we're in-sync with the server.
if(!this.current)return [];// TODO(klimt): Do this incrementally so that it's not quadratic when
// updating many documents.
var t=this.Eo;this.Eo=Pn(),this.Ao.forEach(function(t){_this140.Co(t.key)&&(_this140.Eo=_this140.Eo.add(t.key));});// Diff the new limbo docs with the old limbo docs.
var e=[];return t.forEach(function(t){_this140.Eo.has(t)||e.push(new Yo(t));}),this.Eo.forEach(function(n){t.has(n)||e.push(new Jo(n));}),e;}/**
     * Update the in-memory state of the current view with the state read from
     * persistence.
     *
     * We update the query view whenever a client's primary status changes:
     * - When a client transitions from primary to secondary, it can miss
     *   LocalStorage updates and its query views may temporarily not be
     *   synchronized with the state on disk.
     * - For secondary to primary transitions, the client needs to update the list
     *   of `syncedDocuments` since secondary clients update their query views
     *   based purely on synthesized RemoteEvents.
     *
     * @param queryResult.documents - The documents that match the query according
     * to the LocalStore.
     * @param queryResult.remoteKeys - The keys of the documents that match the
     * query according to the backend.
     *
     * @returns The ViewChange that resulted from this synchronization.
     */ // PORTING NOTE: Multi-tab only.
},{key:"No",value:function No(t){this.po=t.Gn,this.Eo=Pn();var e=this.bo(t.documents);return this.applyChanges(e,/*updateLimboDocuments=*/!0);}/**
     * Returns a view snapshot as if this query was just listened to. Contains
     * a document add for every existing document and the `fromCache` and
     * `hasPendingWrites` status of the already established view.
     */ // PORTING NOTE: Multi-tab only.
},{key:"xo",value:function xo(){return Fo.fromInitialDocuments(this.query,this.Ao,this.mutatedKeys,0/* Local */===this.To);}}]);return Xo;}();/**
 * QueryView contains all of the data that SyncEngine needs to keep track of for
 * a particular query.
 */var Zo=function Zo(/**
     * The query itself.
     */t,/**
     * The target number created by the client that is used in the watch
     * stream to identify this query.
     */e,/**
     * The view is responsible for computing the final merged truth of what
     * docs are in the query. It gets notified of local and remote changes,
     * and applies the query filters and limits to determine the most correct
     * possible results.
     */n){_classCallCheck(this,Zo);this.query=t,this.targetId=e,this.view=n;};/** Tracks a limbo resolution. */var tc=function tc(t){_classCallCheck(this,tc);this.key=t,/**
         * Set to true once we've received a document. This is used in
         * getRemoteKeysForTarget() and ultimately used by WatchChangeAggregator to
         * decide whether it needs to manufacture a delete event for the target once
         * the target is CURRENT.
         */this.ko=!1;};/**
 * An implementation of `SyncEngine` coordinating with other parts of SDK.
 *
 * The parts of SyncEngine that act as a callback to RemoteStore need to be
 * registered individually. This is done in `syncEngineWrite()` and
 * `syncEngineListen()` (as well as `applyPrimaryState()`) as these methods
 * serve as entry points to RemoteStore's functionality.
 *
 * Note: some field defined in this class might have public access level, but
 * the class is not exported so they are only accessible from this module.
 * This is useful to implement optional features (like bundles) in free
 * functions, such that they are tree-shakeable.
 */var ec=/*#__PURE__*/function(){function ec(t,e,n,// PORTING NOTE: Manages state synchronization in multi-tab environments.
s,i,r){_classCallCheck(this,ec);this.localStore=t,this.remoteStore=e,this.eventManager=n,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=r,this.$o={},this.Oo=new ji(function(t){return Re(t);},Ae),this.Fo=new Map(),/**
         * The keys of documents that are in limbo for which we haven't yet started a
         * limbo resolution query. The strings in this set are the result of calling
         * `key.path.canonicalString()` where `key` is a `DocumentKey` object.
         *
         * The `Set` type was chosen because it provides efficient lookup and removal
         * of arbitrary elements and it also maintains insertion order, providing the
         * desired queue-like FIFO semantics.
         */this.Mo=new Set(),/**
         * Keeps track of the target ID for each document that is in limbo with an
         * active target.
         */this.Lo=new wn(Pt.comparator),/**
         * Keeps track of the information about an active limbo resolution for each
         * active target ID that was started for the purpose of limbo resolution.
         */this.Bo=new Map(),this.Uo=new br(),/** Stores user completion handlers, indexed by User and BatchId. */this.qo={},/** Stores user callbacks waiting for all pending writes to be acknowledged. */this.Ko=new Map(),this.jo=Ni.ie(),this.onlineState="Unknown"/* Unknown */,// The primary state is set to `true` or `false` immediately after Firestore
// startup. In the interim, a client should only be considered primary if
// `isPrimary` is true.
this.Qo=void 0;}_createClass(ec,[{key:"isPrimaryClient",get:function get(){return !0===this.Qo;}}]);return ec;}();/**
 * Initiates the new listen, resolves promise when listen enqueued to the
 * server. All the subsequent view snapshots or errors are sent to the
 * subscribed handlers. Returns the initial snapshot.
 */function nc(_x52,_x53){return _nc.apply(this,arguments);}/**
 * Registers a view for a previously unknown query and computes its initial
 * snapshot.
 */function _nc(){_nc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee93(t,e){var n,s,i,r,_t90,_r10;return regenerator.wrap(function _callee93$(_context93){while(1){switch(_context93.prev=_context93.next){case 0:n=Cc(t);r=n.Oo.get(e);if(!r){_context93.next=6;break;}// PORTING NOTE: With Multi-Tab Web, it is possible that a query view
// already exists when EventManager calls us for the first time. This
// happens when the primary tab is already listening to this query on
// behalf of another tab and the user of the primary also starts listening
// to the query. EventManager will not have an assigned target ID in this
// case and calls `listen` to obtain this ID.
s=r.targetId,n.sharedClientState.addLocalQueryTarget(s),i=r.view.xo();_context93.next=15;break;case 6:_context93.next=8;return mr(n.localStore,Ee(e));case 8:_t90=_context93.sent;_r10=n.sharedClientState.addLocalQueryTarget(_t90.targetId);s=_t90.targetId;_context93.next=13;return sc(n,e,s,"current"===_r10);case 13:i=_context93.sent;n.isPrimaryClient&&co(n.remoteStore,_t90);case 15:return _context93.abrupt("return",i);case 16:case"end":return _context93.stop();}}},_callee93);}));return _nc.apply(this,arguments);}function sc(_x54,_x55,_x56,_x57){return _sc.apply(this,arguments);}/** Stops listening to the query. */function _sc(){_sc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee95(t,e,n,s){var i,r,o,c,a,u;return regenerator.wrap(function _callee95$(_context95){while(1){switch(_context95.prev=_context95.next){case 0:// PORTING NOTE: On Web only, we inject the code that registers new Limbo
// targets based on view changes. This allows us to only depend on Limbo
// changes when user code includes queries.
t.Wo=function(e,n,s){return function(){var _ref62=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee94(t,e,n,s){var i,r,o;return regenerator.wrap(function _callee94$(_context94){while(1){switch(_context94.prev=_context94.next){case 0:i=e.view.bo(n);_context94.t0=i.Ln;if(!_context94.t0){_context94.next=6;break;}_context94.next=5;return yr(t.localStore,e.query,/* usePreviousResults= */!1).then(function(_ref63){var t=_ref63.documents;return e.view.bo(t,i);});case 5:i=_context94.sent;case 6:r=s&&s.targetChanges.get(e.targetId),o=e.view.applyChanges(i,/* updateLimboDocuments= */t.isPrimaryClient,r);return _context94.abrupt("return",(mc(t,e.targetId,o.Do),o.snapshot));case 8:case"end":return _context94.stop();}}},_callee94);}));return function(_x135,_x136,_x137,_x138){return _ref62.apply(this,arguments);};}()(t,e,n,s);};_context95.next=3;return yr(t.localStore,e,/* usePreviousResults= */!0);case 3:i=_context95.sent;r=new Xo(e,i.Gn);o=r.bo(i.documents);c=Dn.createSynthesizedTargetChangeForCurrentChange(n,s&&"Offline"/* Offline */!==t.onlineState);a=r.applyChanges(o,/* updateLimboDocuments= */t.isPrimaryClient,c);mc(t,n,a.Do);u=new Zo(e,n,r);return _context95.abrupt("return",(t.Oo.set(e,u),t.Fo.has(n)?t.Fo.get(n).push(e):t.Fo.set(n,[e]),a.snapshot));case 11:case"end":return _context95.stop();}}},_callee95);}));return _sc.apply(this,arguments);}function ic(_x58,_x59){return _ic.apply(this,arguments);}/**
 * Initiates the write of local mutation batch which involves adding the
 * writes to the mutation queue, notifying the remote store about new
 * mutations and raising events for any changes this write caused.
 *
 * The promise returned by this call is resolved when the above steps
 * have completed, *not* when the write was acked by the backend. The
 * userCallback is resolved once the write was acked/rejected by the
 * backend (or failed locally for any other reason).
 */function _ic(){_ic=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee96(t,e){var n,s,i;return regenerator.wrap(function _callee96$(_context96){while(1){switch(_context96.prev=_context96.next){case 0:n=q(t),s=n.Oo.get(e),i=n.Fo.get(s.targetId);if(!(i.length>1)){_context96.next=3;break;}return _context96.abrupt("return",(n.Fo.set(s.targetId,i.filter(function(t){return !Ae(t,e);})),void n.Oo["delete"](e)));case 3:if(!n.isPrimaryClient){_context96.next=11;break;}// We need to remove the local query target first to allow us to verify
// whether any other client is still interested in this target.
n.sharedClientState.removeLocalQueryTarget(s.targetId);_context96.t0=n.sharedClientState.isActiveQueryTarget(s.targetId);if(_context96.t0){_context96.next=9;break;}_context96.next=9;return gr(n.localStore,s.targetId,/*keepPersistedTargetData=*/!1).then(function(){n.sharedClientState.clearQueryState(s.targetId),ao(n.remoteStore,s.targetId),wc(n,s.targetId);})["catch"](Fi);case 9:_context96.next=14;break;case 11:wc(n,s.targetId);_context96.next=14;return gr(n.localStore,s.targetId,/*keepPersistedTargetData=*/!0);case 14:case"end":return _context96.stop();}}},_callee96);}));return _ic.apply(this,arguments);}function rc(_x60,_x61,_x62){return _rc.apply(this,arguments);}/**
 * Applies one remote event to the sync engine, notifying any views of the
 * changes, and releasing any pending mutation batches that would become
 * visible because of the snapshot version the remote event contains.
 */function _rc(){_rc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee97(t,e,n){var s,_t91,_e48;return regenerator.wrap(function _callee97$(_context97){while(1){switch(_context97.prev=_context97.next){case 0:s=Nc(t);_context97.prev=1;_context97.next=4;return function(t,e){var n=q(t),s=it.now(),i=e.reduce(function(t,e){return t.add(e.key);},Pn());var r;return n.persistence.runTransaction("Locally write mutations","readwrite",function(t){return n.Qn.Pn(t,i).next(function(i){r=i;// For non-idempotent mutations (such as `FieldValue.increment()`),
// we record the base state in a separate patch mutation. This is
// later used to guarantee consistent values and prevents flicker
// even if the backend sends us an update that already includes our
// transform.
// For non-idempotent mutations (such as `FieldValue.increment()`),
// we record the base state in a separate patch mutation. This is
// later used to guarantee consistent values and prevents flicker
// even if the backend sends us an update that already includes our
// transform.
var o=[];var _iterator67=_createForOfIteratorHelper(e),_step67;try{for(_iterator67.s();!(_step67=_iterator67.n()).done;){var _t92=_step67.value;var _e47=Xe(_t92,r.get(_t92.key));null!=_e47&&// NOTE: The base state should only be applied if there's some
// existing document to override, so use a Precondition of
// exists=true
o.push(new nn(_t92.key,_e47,qt(_e47.value.mapValue),Ge.exists(!0)));}}catch(err){_iterator67.e(err);}finally{_iterator67.f();}return n.In.addMutationBatch(t,s,o,e);});}).then(function(t){return t.applyToLocalDocumentSet(r),{batchId:t.batchId,changes:r};});}(s.localStore,e);case 4:_t91=_context97.sent;s.sharedClientState.addPendingMutation(_t91.batchId);(function(t,e,n){var s=t.qo[t.currentUser.toKey()];s||(s=new wn(et));s=s.insert(e,n),t.qo[t.currentUser.toKey()]=s;}/**
 * Resolves or rejects the user callback for the given batch and then discards
 * it.
 */)(s,_t91.batchId,n);_context97.next=9;return pc(s,_t91.changes);case 9:_context97.next=11;return Eo(s.remoteStore);case 11:_context97.next=17;break;case 13:_context97.prev=13;_context97.t0=_context97["catch"](1);// If we can't persist the mutation, we reject the user callback and
// don't send the mutation. The user can then retry the write.
_e48=ko(_context97.t0,"Failed to persist write");n.reject(_e48);case 17:case"end":return _context97.stop();}}},_callee97,null,[[1,13]]);}));return _rc.apply(this,arguments);}function oc(_x63,_x64){return _oc.apply(this,arguments);}/**
 * Applies an OnlineState change to the sync engine and notifies any views of
 * the change.
 */function _oc(){_oc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee98(t,e){var n,_t93;return regenerator.wrap(function _callee98$(_context98){while(1){switch(_context98.prev=_context98.next){case 0:n=q(t);_context98.prev=1;_context98.next=4;return dr(n.localStore,e);case 4:_t93=_context98.sent;e.targetChanges.forEach(function(t,e){var s=n.Bo.get(e);s&&(// Since this is a limbo resolution lookup, it's for a single document
// and it could be added, modified, or removed, but not a combination.
B(t.addedDocuments.size+t.modifiedDocuments.size+t.removedDocuments.size<=1),t.addedDocuments.size>0?s.ko=!0:t.modifiedDocuments.size>0?B(s.ko):t.removedDocuments.size>0&&(B(s.ko),s.ko=!1));});_context98.next=8;return pc(n,_t93,e);case 8:_context98.next=14;break;case 10:_context98.prev=10;_context98.t0=_context98["catch"](1);_context98.next=14;return Fi(_context98.t0);case 14:case"end":return _context98.stop();}}},_callee98,null,[[1,10]]);}));return _oc.apply(this,arguments);}function cc(t,e,n){var s=q(t);// If we are the secondary client, we explicitly ignore the remote store's
// online state (the local client may go offline, even though the primary
// tab remains online) and only apply the primary tab's online state from
// SharedClientState.
if(s.isPrimaryClient&&0/* RemoteStore */===n||!s.isPrimaryClient&&1/* SharedClientState */===n){var _t68=[];s.Oo.forEach(function(n,s){var i=s.view.io(e);i.snapshot&&_t68.push(i.snapshot);}),function(t,e){var n=q(t);n.onlineState=e;var s=!1;n.queries.forEach(function(t,n){var _iterator46=_createForOfIteratorHelper(n.listeners),_step46;try{for(_iterator46.s();!(_step46=_iterator46.n()).done;){var _t69=_step46.value;// Run global snapshot listeners if a consistent snapshot has been emitted.
_t69.io(e)&&(s=!0);}}catch(err){_iterator46.e(err);}finally{_iterator46.f();}}),s&&jo(n);}(s.eventManager,e),_t68.length&&s.$o.Rr(_t68),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e);}}/**
 * Rejects the listen for the given targetID. This can be triggered by the
 * backend for any active target.
 *
 * @param syncEngine - The sync engine implementation.
 * @param targetId - The targetID corresponds to one previously initiated by the
 * user as part of TargetData passed to listen() on RemoteStore.
 * @param err - A description of the condition that has forced the rejection.
 * Nearly always this will be an indication that the user is no longer
 * authorized to see the data matching the target.
 */function ac(_x65,_x66,_x67){return _ac.apply(this,arguments);}function _ac(){_ac=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee99(t,e,n){var s,i,r,_t94,_n37,_i14;return regenerator.wrap(function _callee99$(_context99){while(1){switch(_context99.prev=_context99.next){case 0:s=q(t);// PORTING NOTE: Multi-tab only.
s.sharedClientState.updateQueryState(e,"rejected",n);i=s.Bo.get(e),r=i&&i.key;if(!r){_context99.next=14;break;}// TODO(klimt): We really only should do the following on permission
// denied errors, but we don't have the cause code here.
// It's a limbo doc. Create a synthetic event saying it was deleted.
// This is kind of a hack. Ideally, we would have a method in the local
// store to purge a document. However, it would be tricky to keep all of
// the local store's invariants with another method.
_t94=new wn(Pt.comparator);_t94=_t94.insert(r,Kt.newNoDocument(r,rt.min()));_n37=Pn().add(r),_i14=new Sn(rt.min(),/* targetChanges= */new Map(),/* targetMismatches= */new gn(et),_t94,_n37);_context99.next=9;return oc(s,_i14);case 9:// Since this query failed, we won't want to manually unlisten to it.
// We only remove it from bookkeeping after we successfully applied the
// RemoteEvent. If `applyRemoteEvent()` throws, we want to re-listen to
// this query when the RemoteStore restarts the Watch stream, which should
// re-trigger the target failure.
s.Lo=s.Lo.remove(r);s.Bo["delete"](e);yc(s);_context99.next=16;break;case 14:_context99.next=16;return gr(s.localStore,e,/* keepPersistedTargetData */!1).then(function(){return wc(s,e,n);})["catch"](Fi);case 16:case"end":return _context99.stop();}}},_callee99);}));return _ac.apply(this,arguments);}function uc(_x68,_x69){return _uc.apply(this,arguments);}function _uc(){_uc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee100(t,e){var n,s,_t95;return regenerator.wrap(function _callee100$(_context100){while(1){switch(_context100.prev=_context100.next){case 0:n=q(t),s=e.batch.batchId;_context100.prev=1;_context100.next=4;return lr(n.localStore,e);case 4:_t95=_context100.sent;dc(n,s,/*error=*/null);fc(n,s);n.sharedClientState.updateMutationState(s,"acknowledged");_context100.next=10;return pc(n,_t95);case 10:_context100.next=16;break;case 12:_context100.prev=12;_context100.t0=_context100["catch"](1);_context100.next=16;return Fi(_context100.t0);case 16:case"end":return _context100.stop();}}},_callee100,null,[[1,12]]);}));return _uc.apply(this,arguments);}function hc(_x70,_x71,_x72){return _hc.apply(this,arguments);}/**
 * Registers a user callback that resolves when all pending mutations at the moment of calling
 * are acknowledged .
 */function _hc(){_hc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee101(t,e,n){var s,_t96;return regenerator.wrap(function _callee101$(_context101){while(1){switch(_context101.prev=_context101.next){case 0:s=q(t);_context101.prev=1;_context101.next=4;return function(t,e){var n=q(t);return n.persistence.runTransaction("Reject batch","readwrite-primary",function(t){var s;return n.In.lookupMutationBatch(t,e).next(function(e){return B(null!==e),s=e.keys(),n.In.removeMutationBatch(t,e);}).next(function(){return n.In.performConsistencyCheck(t);}).next(function(){return n.Qn.Pn(t,s);});});}/**
 * Returns the largest (latest) batch id in mutation queue that is pending
 * server response.
 *
 * Returns `BATCHID_UNKNOWN` if the queue is empty.
 */(s.localStore,e);case 4:_t96=_context101.sent;dc(s,e,n);fc(s,e);s.sharedClientState.updateMutationState(e,"rejected",n);_context101.next=10;return pc(s,_t96);case 10:_context101.next=16;break;case 12:_context101.prev=12;_context101.t0=_context101["catch"](1);_context101.next=16;return Fi(_context101.t0);case 16:case"end":return _context101.stop();}}},_callee101,null,[[1,12]]);}));return _hc.apply(this,arguments);}function fc(t,e){(t.Ko.get(e)||[]).forEach(function(t){t.resolve();}),t.Ko["delete"](e);}/** Reject all outstanding callbacks waiting for pending writes to complete. */function dc(t,e,n){var s=q(t);var i=s.qo[s.currentUser.toKey()];// NOTE: Mutations restored from persistence won't have callbacks, so it's
// okay for there to be no callback for this ID.
if(i){var _t70=i.get(e);_t70&&(n?_t70.reject(n):_t70.resolve(),i=i.remove(e)),s.qo[s.currentUser.toKey()]=i;}}function wc(t,e){var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:null;t.sharedClientState.removeLocalQueryTarget(e);var _iterator47=_createForOfIteratorHelper(t.Fo.get(e)),_step47;try{for(_iterator47.s();!(_step47=_iterator47.n()).done;){var s=_step47.value;t.Oo["delete"](s),n&&t.$o.Go(s,n);}}catch(err){_iterator47.e(err);}finally{_iterator47.f();}if(t.Fo["delete"](e),t.isPrimaryClient){t.Uo.cs(e).forEach(function(e){t.Uo.containsKey(e)||// We removed the last reference for this key
_c(t,e);});}}function _c(t,e){t.Mo["delete"](e.path.canonicalString());// It's possible that the target already got removed because the query failed. In that case,
// the key won't exist in `limboTargetsByKey`. Only do the cleanup if we still have the target.
var n=t.Lo.get(e);null!==n&&(ao(t.remoteStore,n),t.Lo=t.Lo.remove(e),t.Bo["delete"](n),yc(t));}function mc(t,e,n){var _iterator48=_createForOfIteratorHelper(n),_step48;try{for(_iterator48.s();!(_step48=_iterator48.n()).done;){var s=_step48.value;if(s instanceof Jo)t.Uo.addReference(s.key,e),gc(t,s);else if(s instanceof Yo){$("SyncEngine","Document no longer in limbo: "+s.key),t.Uo.removeReference(s.key,e);t.Uo.containsKey(s.key)||// We removed the last reference for this key
_c(t,s.key);}else L();}}catch(err){_iterator48.e(err);}finally{_iterator48.f();}}function gc(t,e){var n=e.key,s=n.path.canonicalString();t.Lo.get(n)||t.Mo.has(s)||($("SyncEngine","New document in limbo: "+n),t.Mo.add(s),yc(t));}/**
 * Starts listens for documents in limbo that are enqueued for resolution,
 * subject to a maximum number of concurrent resolutions.
 *
 * Without bounding the number of concurrent resolutions, the server can fail
 * with "resource exhausted" errors which can lead to pathological client
 * behavior as seen in https://github.com/firebase/firebase-js-sdk/issues/2683.
 */function yc(t){for(;t.Mo.size>0&&t.Lo.size<t.maxConcurrentLimboResolutions;){var e=t.Mo.values().next().value;t.Mo["delete"](e);var n=new Pt(ht.fromString(e)),s=t.jo.next();t.Bo.set(s,new tc(n)),t.Lo=t.Lo.insert(n,s),co(t.remoteStore,new ii(Ee(we(n.path)),s,2/* LimboResolution */,X.T));}}function pc(_x75,_x76,_x77){return _pc.apply(this,arguments);}function _pc(){_pc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee104(t,e,n){var s,i,r,o;return regenerator.wrap(function _callee104$(_context104){while(1){switch(_context104.prev=_context104.next){case 0:s=q(t),i=[],r=[],o=[];_context104.t0=s.Oo.isEmpty();if(_context104.t0){_context104.next=9;break;}s.Oo.forEach(function(t,c){o.push(s.Wo(c,e,n).then(function(t){if(t){s.isPrimaryClient&&s.sharedClientState.updateQueryState(c.targetId,t.fromCache?"not-current":"current"),i.push(t);var _e49=or.kn(c.targetId,t);r.push(_e49);}}));});_context104.next=6;return Promise.all(o);case 6:s.$o.Rr(i);_context104.next=9;return function(){var _ref64=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee103(t,e){var n,_iterator68,_step68,_t98,_e50,_t99,_s27,_i15;return regenerator.wrap(function _callee103$(_context103){while(1){switch(_context103.prev=_context103.next){case 0:n=q(t);_context103.prev=1;_context103.next=4;return n.persistence.runTransaction("notifyLocalViewChanges","readwrite",function(t){return js.forEach(e,function(e){return js.forEach(e.Nn,function(s){return n.persistence.referenceDelegate.addReference(t,e.targetId,s);}).next(function(){return js.forEach(e.xn,function(s){return n.persistence.referenceDelegate.removeReference(t,e.targetId,s);});});});});case 4:_context103.next=11;break;case 6:_context103.prev=6;_context103.t0=_context103["catch"](1);if(Hs(_context103.t0)){_context103.next=10;break;}throw _context103.t0;case 10:// If `notifyLocalViewChanges` fails, we did not advance the sequence
// number for the documents that were included in this transaction.
// This might trigger them to be deleted earlier than they otherwise
// would have, but it should not invalidate the integrity of the data.
$("LocalStore","Failed to update sequence numbers: "+_context103.t0);case 11:_iterator68=_createForOfIteratorHelper(e);try{for(_iterator68.s();!(_step68=_iterator68.n()).done;){_t98=_step68.value;_e50=_t98.targetId;if(!_t98.fromCache){_t99=n.Un.get(_e50),_s27=_t99.snapshotVersion,_i15=_t99.withLastLimboFreeSnapshotVersion(_s27);// Advance the last limbo free snapshot version
// Advance the last limbo free snapshot version
n.Un=n.Un.insert(_e50,_i15);}}}catch(err){_iterator68.e(err);}finally{_iterator68.f();}case 13:case"end":return _context103.stop();}}},_callee103,null,[[1,6]]);}));return function(_x139,_x140){return _ref64.apply(this,arguments);};}()(s.localStore,r);case 9:case"end":return _context104.stop();}}},_callee104);}));return _pc.apply(this,arguments);}function Tc(_x78,_x79){return _Tc.apply(this,arguments);}function _Tc(){_Tc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee105(t,e){var n,_t100;return regenerator.wrap(function _callee105$(_context105){while(1){switch(_context105.prev=_context105.next){case 0:n=q(t);if(n.currentUser.isEqual(e)){_context105.next=11;break;}$("SyncEngine","User change. New user:",e.toKey());_context105.next=5;return hr(n.localStore,e);case 5:_t100=_context105.sent;n.currentUser=e;// Fails tasks waiting for pending writes requested by previous user.
(function(t,e){t.Ko.forEach(function(t){t.forEach(function(t){t.reject(new j(K.CANCELLED,e));});}),t.Ko.clear();})(n,"'waitForPendingWrites' promise is rejected due to a user change.");// TODO(b/114226417): Consider calling this only in the primary tab.
n.sharedClientState.handleUserChange(e,_t100.removedBatchIds,_t100.addedBatchIds);_context105.next=11;return pc(n,_t100.Wn);case 11:case"end":return _context105.stop();}}},_callee105);}));return _Tc.apply(this,arguments);}function Ec(t,e){var n=q(t),s=n.Bo.get(e);if(s&&s.ko)return Pn().add(s.key);{var _t71=Pn();var _s16=n.Fo.get(e);if(!_s16)return _t71;var _iterator49=_createForOfIteratorHelper(_s16),_step49;try{for(_iterator49.s();!(_step49=_iterator49.n()).done;){var _e38=_step49.value;var _s17=n.Oo.get(_e38);_t71=_t71.unionWith(_s17.view.Ro);}}catch(err){_iterator49.e(err);}finally{_iterator49.f();}return _t71;}}function Cc(t){var e=q(t);return e.remoteStore.remoteSyncer.applyRemoteEvent=oc.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=Ec.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ac.bind(null,e),e.$o.Rr=qo.bind(null,e.eventManager),e.$o.Go=Ko.bind(null,e.eventManager),e;}function Nc(t){var e=q(t);return e.remoteStore.remoteSyncer.applySuccessfulWrite=uc.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=hc.bind(null,e),e;}var kc=/*#__PURE__*/function(){function kc(){_classCallCheck(this,kc);this.synchronizeTabs=!1;}_createClass(kc,[{key:"initialize",value:function(){var _initialize=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee24(t){return regenerator.wrap(function _callee24$(_context24){while(1){switch(_context24.prev=_context24.next){case 0:this.N=Yr(t.databaseInfo.databaseId);this.sharedClientState=this.Ho(t);this.persistence=this.Jo(t);_context24.next=5;return this.persistence.start();case 5:this.gcScheduler=this.Yo(t);this.localStore=this.Xo(t);case 7:case"end":return _context24.stop();}}},_callee24,this);}));function initialize(_x102){return _initialize.apply(this,arguments);}return initialize;}()},{key:"Yo",value:function Yo(t){return null;}},{key:"Xo",value:function Xo(t){return ur(this.persistence,new cr(),t.initialUser,this.N);}},{key:"Jo",value:function Jo(t){return new Cr(xr.Ns,this.N);}},{key:"Ho",value:function Ho(t){return new Kr();}},{key:"terminate",value:function(){var _terminate=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee25(){return regenerator.wrap(function _callee25$(_context25){while(1){switch(_context25.prev=_context25.next){case 0:this.gcScheduler&&this.gcScheduler.stop();_context25.next=3;return this.sharedClientState.shutdown();case 3:_context25.next=5;return this.persistence.shutdown();case 5:case"end":return _context25.stop();}}},_callee25,this);}));function terminate(){return _terminate.apply(this,arguments);}return terminate;}()}]);return kc;}();/**
 * Initializes and wires the components that are needed to interface with the
 * network.
 */var Fc=/*#__PURE__*/function(){function Fc(){_classCallCheck(this,Fc);}_createClass(Fc,[{key:"initialize",value:function(){var _initialize4=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee29(t,e){var _this145=this;return regenerator.wrap(function _callee29$(_context29){while(1){switch(_context29.prev=_context29.next){case 0:_context29.t0=this.localStore;if(_context29.t0){_context29.next=12;break;}this.localStore=t.localStore;this.sharedClientState=t.sharedClientState;this.datastore=this.createDatastore(e);this.remoteStore=this.createRemoteStore(e);this.eventManager=this.createEventManager(e);this.syncEngine=this.createSyncEngine(e,/* startAsPrimary=*/!t.synchronizeTabs);this.sharedClientState.onlineStateHandler=function(t){return cc(_this145.syncEngine,t,1/* SharedClientState */);};this.remoteStore.remoteSyncer.handleCredentialChange=Tc.bind(null,this.syncEngine);_context29.next=12;return Do(this.remoteStore,this.syncEngine.isPrimaryClient);case 12:case"end":return _context29.stop();}}},_callee29,this);}));function initialize(_x106,_x107){return _initialize4.apply(this,arguments);}return initialize;}()},{key:"createEventManager",value:function createEventManager(t){return new Lo();}},{key:"createDatastore",value:function createDatastore(t){var e=Yr(t.databaseInfo.databaseId),n=(s=t.databaseInfo,new zr(s));var s;/** Return the Platform-specific connectivity monitor. */return function(t,e,n){return new no(t,e,n);}(t.credentials,n,e);}},{key:"createRemoteStore",value:function createRemoteStore(t){var _this146=this;return e=this.localStore,n=this.datastore,s=t.asyncQueue,i=function i(t){return cc(_this146.syncEngine,t,0/* RemoteStore */);},r=Qr.bt()?new Qr():new jr(),new io(e,n,s,i,r);var e,n,s,i,r;/** Re-enables the network. Idempotent. */}},{key:"createSyncEngine",value:function createSyncEngine(t,e){return function(t,e,n,// PORTING NOTE: Manages state synchronization in multi-tab environments.
s,i,r,o){var c=new ec(t,e,n,s,i,r);return o&&(c.Qo=!0),c;}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e);}},{key:"terminate",value:function terminate(){return function(){var _ref30=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee30(t){var e;return regenerator.wrap(function _callee30$(_context30){while(1){switch(_context30.prev=_context30.next){case 0:e=q(t);$("RemoteStore","RemoteStore shutting down.");e.Wr.add(5/* Shutdown */);_context30.next=5;return oo(e);case 5:e.zr.shutdown();// Set the OnlineState to Unknown (rather than Offline) to avoid potentially
// triggering spurious listener events with cached data, etc.
e.Hr.set("Unknown"/* Unknown */);case 7:case"end":return _context30.stop();}}},_callee30);}));return function(_x108){return _ref30.apply(this,arguments);};}()(this.remoteStore);}}]);return Fc;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * On web, a `ReadableStream` is wrapped around by a `ByteStreamReader`.
 */ /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /*
 * A wrapper implementation of Observer<T> that will dispatch events
 * asynchronously. To allow immediate silencing, a mute call is added which
 * causes events scheduled to no longer be raised.
 */var Lc=/*#__PURE__*/function(){function Lc(t){_classCallCheck(this,Lc);this.observer=t,/**
         * When set to true, will not raise future events. Necessary to deal with
         * async detachment of listener.
         */this.muted=!1;}_createClass(Lc,[{key:"next",value:function next(t){this.observer.next&&this.tc(this.observer.next,t);}},{key:"error",value:function error(t){this.observer.error?this.tc(this.observer.error,t):console.error("Uncaught Error in snapshot listener:",t);}},{key:"ec",value:function ec(){this.muted=!0;}},{key:"tc",value:function tc(t,e){var _this147=this;this.muted||setTimeout(function(){_this147.muted||t(e);},0);}}]);return Lc;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * FirestoreClient is a top-level class that constructs and owns all of the
 * pieces of the client SDK architecture. It is responsible for creating the
 * async queue that is shared by all of the other components in the system.
 */var Kc=/*#__PURE__*/function(){function Kc(t,/**
     * Asynchronous queue responsible for all of our internal processing. When
     * we get incoming work from the user (via public API) or the network
     * (incoming GRPC messages), we should always schedule onto this queue.
     * This ensures all of our work is properly serialized (e.g. we don't
     * start processing a new operation while the previous one is waiting for
     * an async I/O to complete).
     */e,n){var _this153=this;_classCallCheck(this,Kc);this.credentials=t,this.asyncQueue=e,this.databaseInfo=n,this.user=D.UNAUTHENTICATED,this.clientId=tt.I(),this.credentialListener=function(){return Promise.resolve();},this.credentials.start(e,/*#__PURE__*/function(){var _ref34=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee44(t){return regenerator.wrap(function _callee44$(_context44){while(1){switch(_context44.prev=_context44.next){case 0:$("FirestoreClient","Received user=",t.uid);_context44.next=3;return _this153.credentialListener(t);case 3:_this153.user=t;case 4:case"end":return _context44.stop();}}},_callee44);}));return function(_x115){return _ref34.apply(this,arguments);};}());}_createClass(Kc,[{key:"getConfiguration",value:function(){var _getConfiguration=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee45(){return regenerator.wrap(function _callee45$(_context45){while(1){switch(_context45.prev=_context45.next){case 0:return _context45.abrupt("return",{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,credentials:this.credentials,initialUser:this.user,maxConcurrentLimboResolutions:100});case 1:case"end":return _context45.stop();}}},_callee45,this);}));function getConfiguration(){return _getConfiguration.apply(this,arguments);}return getConfiguration;}()},{key:"setCredentialChangeListener",value:function setCredentialChangeListener(t){this.credentialListener=t;}/**
     * Checks that the client has not been terminated. Ensures that other methods on
     * this class cannot be called after the client is terminated.
     */},{key:"verifyNotTerminated",value:function verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new j(K.FAILED_PRECONDITION,"The client has already been terminated.");}},{key:"terminate",value:function terminate(){var _this154=this;this.asyncQueue.enterRestrictedMode();var t=new Q();return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee46(){var n;return regenerator.wrap(function _callee46$(_context46){while(1){switch(_context46.prev=_context46.next){case 0:_context46.prev=0;_context46.t0=_this154.onlineComponents;if(!_context46.t0){_context46.next=5;break;}_context46.next=5;return _this154.onlineComponents.terminate();case 5:_context46.t1=_this154.offlineComponents;if(!_context46.t1){_context46.next=9;break;}_context46.next=9;return _this154.offlineComponents.terminate();case 9:// The credentials provider must be terminated after shutting down the
// RemoteStore as it will prevent the RemoteStore from retrieving auth
// tokens.
_this154.credentials.shutdown();t.resolve();_context46.next=17;break;case 13:_context46.prev=13;_context46.t2=_context46["catch"](0);n=ko(_context46.t2,"Failed to shutdown persistence");t.reject(n);case 17:case"end":return _context46.stop();}}},_callee46,null,[[0,13]]);}))),t.promise;}}]);return Kc;}();function jc(_x116,_x117){return _jc.apply(this,arguments);}function _jc(){_jc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee114(t,e){var n,s;return regenerator.wrap(function _callee114$(_context115){while(1){switch(_context115.prev=_context115.next){case 0:t.asyncQueue.verifyOperationInProgress(),$("FirestoreClient","Initializing OfflineComponentProvider");_context115.next=3;return t.getConfiguration();case 3:n=_context115.sent;_context115.next=6;return e.initialize(n);case 6:s=n.initialUser;t.setCredentialChangeListener(/*#__PURE__*/function(){var _ref65=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee113(t){return regenerator.wrap(function _callee113$(_context114){while(1){switch(_context114.prev=_context114.next){case 0:_context114.t0=s.isEqual(t);if(_context114.t0){_context114.next=5;break;}_context114.next=4;return hr(e.localStore,t);case 4:s=t;case 5:case"end":return _context114.stop();}}},_callee113);}));return function(_x141){return _ref65.apply(this,arguments);};}()),// When a user calls clearPersistence() in one client, all other clients
// need to be terminated to allow the delete to succeed.
e.persistence.setDatabaseDeletedListener(function(){return t.terminate();}),t.offlineComponents=e;case 8:case"end":return _context115.stop();}}},_callee114);}));return _jc.apply(this,arguments);}function Qc(_x118,_x119){return _Qc.apply(this,arguments);}function _Qc(){_Qc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee116(t,e){var n,s;return regenerator.wrap(function _callee116$(_context117){while(1){switch(_context117.prev=_context117.next){case 0:t.asyncQueue.verifyOperationInProgress();_context117.next=3;return Wc(t);case 3:n=_context117.sent;$("FirestoreClient","Initializing OnlineComponentProvider");_context117.next=7;return t.getConfiguration();case 7:s=_context117.sent;_context117.next=10;return e.initialize(n,s);case 10:// The CredentialChangeListener of the online component provider takes
// precedence over the offline component provider.
t.setCredentialChangeListener(function(t){return function(){var _ref66=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee115(t,e){var n,s;return regenerator.wrap(function _callee115$(_context116){while(1){switch(_context116.prev=_context116.next){case 0:n=q(t);n.asyncQueue.verifyOperationInProgress(),$("RemoteStore","RemoteStore received new credentials");s=wo(n);// Tear down and re-create our network streams. This will ensure we get a
// fresh auth token for the new user and re-fill the write pipeline with
// new mutations from the LocalStore (since mutations are per-user).
n.Wr.add(3/* CredentialChange */);_context116.next=6;return oo(n);case 6:s&&// Don't set the network status to Unknown if we are offline.
n.Hr.set("Unknown"/* Unknown */);_context116.next=9;return n.remoteSyncer.handleCredentialChange(e);case 9:n.Wr["delete"](3/* CredentialChange */);_context116.next=12;return ro(n);case 12:case"end":return _context116.stop();}}},_callee115);}));return function(_x142,_x143){return _ref66.apply(this,arguments);};}()(e.remoteStore,t);});t.onlineComponents=e;case 12:case"end":return _context117.stop();}}},_callee116);}));return _Qc.apply(this,arguments);}function Wc(_x120){return _Wc.apply(this,arguments);}function _Wc(){_Wc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee117(t){return regenerator.wrap(function _callee117$(_context118){while(1){switch(_context118.prev=_context118.next){case 0:_context118.t0=t.offlineComponents;if(_context118.t0){_context118.next=5;break;}$("FirestoreClient","Using default OfflineComponentProvider");_context118.next=5;return jc(t,new kc());case 5:return _context118.abrupt("return",t.offlineComponents);case 6:case"end":return _context118.stop();}}},_callee117);}));return _Wc.apply(this,arguments);}function Gc(_x121){return _Gc.apply(this,arguments);}function _Gc(){_Gc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee118(t){return regenerator.wrap(function _callee118$(_context119){while(1){switch(_context119.prev=_context119.next){case 0:_context119.t0=t.onlineComponents;if(_context119.t0){_context119.next=5;break;}$("FirestoreClient","Using default OnlineComponentProvider");_context119.next=5;return Qc(t,new Fc());case 5:return _context119.abrupt("return",t.onlineComponents);case 6:case"end":return _context119.stop();}}},_callee118);}));return _Gc.apply(this,arguments);}function Yc(t){return Gc(t).then(function(t){return t.syncEngine;});}function Xc(_x122){return _Xc.apply(this,arguments);}/** Enables the network connection and re-enqueues all pending operations. */function _Xc(){_Xc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee119(t){var e,n;return regenerator.wrap(function _callee119$(_context120){while(1){switch(_context120.prev=_context120.next){case 0:_context120.next=2;return Gc(t);case 2:e=_context120.sent;n=e.eventManager;return _context120.abrupt("return",(n.onListen=nc.bind(null,e.syncEngine),n.onUnlisten=ic.bind(null,e.syncEngine),n));case 5:case"end":return _context120.stop();}}},_callee119);}));return _Xc.apply(this,arguments);}function na(t,e){var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var s=new Q();return t.asyncQueue.enqueueAndForget(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee52(){return regenerator.wrap(function _callee52$(_context52){while(1){switch(_context52.prev=_context52.next){case 0:_context52.t0=function(t,e,n,s,i){var r=new Lc({next:function next(r){// Remove query first before passing event to user to avoid
// user actions affecting the now stale query.
e.enqueueAndForget(function(){return Uo(t,o);});var c=r.docs.has(n);!c&&r.fromCache?// TODO(dimond): If we're online and the document doesn't
// exist then we resolve with a doc.exists set to false. If
// we're offline however, we reject the Promise in this
// case. Two options: 1) Cache the negative response from
// the server so we can deliver that even when you're
// offline 2) Actually reject the Promise in the online case
// if the document doesn't exist.
i.reject(new j(K.UNAVAILABLE,"Failed to get document because the client is offline.")):c&&r.fromCache&&s&&"server"===s.source?i.reject(new j(K.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):i.resolve(r);},error:function error(t){return i.reject(t);}}),o=new Qo(we(n.path),r,{includeMetadataChanges:!0,fo:!0});return Bo(t,o);};_context52.next=3;return Xc(t);case 3:_context52.t1=_context52.sent;_context52.t2=t.asyncQueue;_context52.t3=e;_context52.t4=n;_context52.t5=s;return _context52.abrupt("return",(0, _context52.t0)(_context52.t1,_context52.t2,_context52.t3,_context52.t4,_context52.t5));case 9:case"end":return _context52.stop();}}},_callee52);}))),s.promise;}function ia(t,e){var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:{};var s=new Q();return t.asyncQueue.enqueueAndForget(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee55(){return regenerator.wrap(function _callee55$(_context55){while(1){switch(_context55.prev=_context55.next){case 0:_context55.t0=function(t,e,n,s,i){var r=new Lc({next:function next(n){// Remove query first before passing event to user to avoid
// user actions affecting the now stale query.
e.enqueueAndForget(function(){return Uo(t,o);}),n.fromCache&&"server"===s.source?i.reject(new j(K.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):i.resolve(n);},error:function error(t){return i.reject(t);}}),o=new Qo(n,r,{includeMetadataChanges:!0,fo:!0});return Bo(t,o);};_context55.next=3;return Xc(t);case 3:_context55.t1=_context55.sent;_context55.t2=t.asyncQueue;_context55.t3=e;_context55.t4=n;_context55.t5=s;return _context55.abrupt("return",(0, _context55.t0)(_context55.t1,_context55.t2,_context55.t3,_context55.t4,_context55.t5));case 9:case"end":return _context55.stop();}}},_callee55);}))),s.promise;}var ua=/**
     * Constructs a DatabaseInfo using the provided host, databaseId and
     * persistenceKey.
     *
     * @param databaseId - The database to use.
     * @param appId - The Firebase App Id.
     * @param persistenceKey - A unique identifier for this Firestore's local
     * storage (used in conjunction with the databaseId).
     * @param host - The Firestore backend host to connect to.
     * @param ssl - Whether to use SSL when connecting.
     * @param forceLongPolling - Whether to use the forceLongPolling option
     * when using WebChannel as the network transport.
     * @param autoDetectLongPolling - Whether to use the detectBufferingProxy
     * option when using WebChannel as the network transport.
     * @param useFetchStreams Whether to use the Fetch API instead of
     * XMLHTTPRequest
     */function ua(t,e,n,s,i,r,o,c){_classCallCheck(this,ua);this.databaseId=t,this.appId=e,this.persistenceKey=n,this.host=s,this.ssl=i,this.forceLongPolling=r,this.autoDetectLongPolling=o,this.useFetchStreams=c;};/** The default database name for a project. */ /**
 * Represents the database ID a Firestore client is associated with.
 * @internal
 */var ha=/*#__PURE__*/function(){function ha(t,e){_classCallCheck(this,ha);this.projectId=t,this.database=e||"(default)";}_createClass(ha,[{key:"isDefaultDatabase",get:function get(){return "(default)"===this.database;}},{key:"isEqual",value:function isEqual(t){return t instanceof ha&&t.projectId===this.projectId&&t.database===this.database;}}]);return ha;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var la=new Map();/**
 * An instance map that ensures only one Datastore exists per Firestore
 * instance.
 */ /**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fa(t,e,n){if(!n)throw new j(K.INVALID_ARGUMENT,"Function ".concat(t,"() cannot be called with an empty ").concat(e,"."));}/**
 * Validates that two boolean options are not set at the same time.
 * @internal
 */function da(t,e,n,s){if(!0===e&&!0===s)throw new j(K.INVALID_ARGUMENT,"".concat(t," and ").concat(n," cannot be used together."));}/**
 * Validates that `path` refers to a document (indicated by the fact it contains
 * an even numbers of segments).
 */function wa(t){if(!Pt.isDocumentKey(t))throw new j(K.INVALID_ARGUMENT,"Invalid document reference. Document references must have an even number of segments, but ".concat(t," has ").concat(t.length,"."));}/**
 * Validates that `path` refers to a collection (indicated by the fact it
 * contains an odd numbers of segments).
 */function _a(t){if(Pt.isDocumentKey(t))throw new j(K.INVALID_ARGUMENT,"Invalid collection reference. Collection references must have an odd number of segments, but ".concat(t," has ").concat(t.length,"."));}/**
 * Returns true if it's a non-null object without a custom prototype
 * (i.e. excludes Array, Date, etc.).
 */ /** Returns a string describing the type / value of the provided input. */function ma(t){if(void 0===t)return "undefined";if(null===t)return "null";if("string"==typeof t)return t.length>20&&(t="".concat(t.substring(0,20),"...")),JSON.stringify(t);if("number"==typeof t||"boolean"==typeof t)return ""+t;if("object"==_typeof(t)){if(t instanceof Array)return "an array";{var e=/** try to get the constructor name for an object. */function(t){if(t.constructor)return t.constructor.name;return null;}/**
 * Casts `obj` to `T`, optionally unwrapping Compat types to expose the
 * underlying instance. Throws if  `obj` is not an instance of `T`.
 *
 * This cast is used in the Lite and Full SDK to verify instance types for
 * arguments passed to the public API.
 * @internal
 */(t);return e?"a custom ".concat(e," object"):"an object";}}return "function"==typeof t?"a function":L();}function ga(t,// eslint-disable-next-line @typescript-eslint/no-explicit-any
e){if("_delegate"in t&&(// Unwrap Compat types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
t=t._delegate),!(t instanceof e)){if(e.name===t.constructor.name)throw new j(K.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{var n=ma(t);throw new j(K.INVALID_ARGUMENT,"Expected type '".concat(e.name,"', but it was: ").concat(n));}}return t;}/**
 * A concrete type describing all the values that can be applied via a
 * user-supplied `FirestoreSettings` object. This is a separate type so that
 * defaults can be supplied and the value can be checked for equality.
 */var pa=/*#__PURE__*/function(){function pa(t){_classCallCheck(this,pa);var e;if(void 0===t.host){if(void 0!==t.ssl)throw new j(K.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=true;}else this.host=t.host,this.ssl=null===(e=t.ssl)||void 0===e||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,void 0===t.cacheSizeBytes)this.cacheSizeBytes=41943040;else {if(-1!==t.cacheSizeBytes&&t.cacheSizeBytes<1048576)throw new j(K.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes;}this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.useFetchStreams=!!t.useFetchStreams,da("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling);}_createClass(pa,[{key:"isEqual",value:function isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams;}}]);return pa;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */var Ta=/*#__PURE__*/function(){/** @hideconstructor */function Ta(t,e){_classCallCheck(this,Ta);this._credentials=e,/**
         * Whether it's a Firestore or Firestore Lite instance.
         */this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new pa({}),this._settingsFrozen=!1,t instanceof ha?this._databaseId=t:(this._app=t,this._databaseId=function(t){if(!Object.prototype.hasOwnProperty.apply(t.options,["projectId"]))throw new j(K.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new ha(t.options.projectId);}/**
 * Modify this instance to communicate with the Cloud Firestore emulator.
 *
 * Note: This must be called before this instance has been used to do any
 * operations.
 *
 * @param firestore - The `Firestore` instance to configure to connect to the
 * emulator.
 * @param host - the emulator host (ex: localhost).
 * @param port - the emulator port (ex: 9000).
 * @param options.mockUserToken - the mock auth token to use for unit testing
 * Security Rules.
 */(t));}/**
     * The {@link @firebase/app#FirebaseApp} associated with this `Firestore` service
     * instance.
     */_createClass(Ta,[{key:"app",get:function get(){if(!this._app)throw new j(K.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app;}},{key:"_initialized",get:function get(){return this._settingsFrozen;}},{key:"_terminated",get:function get(){return void 0!==this._terminateTask;}},{key:"_setSettings",value:function _setSettings(t){if(this._settingsFrozen)throw new j(K.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new pa(t),void 0!==t.credentials&&(this._credentials=function(t){if(!t)return new G();switch(t.type){case"gapi":var e=t.client;// Make sure this really is a Gapi client.
return B(!("object"!=_typeof(e)||null===e||!e.auth||!e.auth.getAuthHeaderValueForFirstParty)),new Y(e,t.sessionIndex||"0",t.iamToken||null);case"provider":return t.client;default:throw new j(K.INVALID_ARGUMENT,"makeCredentialsProvider failed due to invalid credential type");}}(t.credentials));}},{key:"_getSettings",value:function _getSettings(){return this._settings;}},{key:"_freezeSettings",value:function _freezeSettings(){return this._settingsFrozen=!0,this._settings;}},{key:"_delete",value:function _delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask;}/** Returns a JSON-serializable representation of this `Firestore` instance. */},{key:"toJSON",value:function toJSON(){return {app:this._app,databaseId:this._databaseId,settings:this._settings};}/**
     * Terminates all components used by this client. Subclasses can override
     * this method to clean up their own dependencies, but must also call this
     * method.
     *
     * Only ever called once.
     */},{key:"_terminate",value:function _terminate(){/**
 * Removes all components associated with the provided instance. Must be called
 * when the `Firestore` instance is terminated.
 */return function(t){var e=la.get(t);e&&($("ComponentProvider","Removing Datastore"),la["delete"](t),e.terminate());}(this),Promise.resolve();}}]);return Ta;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A `DocumentReference` refers to a document location in a Firestore database
 * and can be used to write, read, or listen to the location. The document at
 * the referenced location may or may not exist.
 */var Ia=/*#__PURE__*/function(){/** @hideconstructor */function Ia(t,/**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */e,n){_classCallCheck(this,Ia);this.converter=e,this._key=n,/** The type of this Firestore reference. */this.type="document",this.firestore=t;}_createClass(Ia,[{key:"_path",get:function get(){return this._key.path;}/**
     * The document's identifier within its collection.
     */},{key:"id",get:function get(){return this._key.path.lastSegment();}/**
     * A string representing the path of the referenced document (relative
     * to the root of the database).
     */},{key:"path",get:function get(){return this._key.path.canonicalString();}/**
     * The collection this `DocumentReference` belongs to.
     */},{key:"parent",get:function get(){return new Ra(this.firestore,this.converter,this._key.path.popLast());}},{key:"withConverter",value:function withConverter(t){return new Ia(this.firestore,t,this._key);}}]);return Ia;}();/**
 * A `Query` refers to a query which you can read or listen to. You can also
 * construct refined `Query` objects by adding filters and ordering.
 */var Aa=/*#__PURE__*/function(){// This is the lite version of the Query class in the main SDK.
/** @hideconstructor protected */function Aa(t,/**
     * If provided, the `FirestoreDataConverter` associated with this instance.
     */e,n){_classCallCheck(this,Aa);this.converter=e,this._query=n,/** The type of this Firestore reference. */this.type="query",this.firestore=t;}_createClass(Aa,[{key:"withConverter",value:function withConverter(t){return new Aa(this.firestore,t,this._query);}}]);return Aa;}();/**
 * A `CollectionReference` object can be used for adding documents, getting
 * document references, and querying for documents (using {@link query}).
 */var Ra=/*#__PURE__*/function(_Aa){_inherits(Ra,_Aa);var _super31=_createSuper$1(Ra);/** @hideconstructor */function Ra(t,e,n){var _this155;_classCallCheck(this,Ra);_this155=_super31.call(this,t,e,we(n)),_this155._path=n,/** The type of this Firestore reference. */_this155.type="collection";return _this155;}/** The collection's identifier. */_createClass(Ra,[{key:"id",get:function get(){return this._query.path.lastSegment();}/**
     * A string representing the path of the referenced collection (relative
     * to the root of the database).
     */},{key:"path",get:function get(){return this._query.path.canonicalString();}/**
     * A reference to the containing `DocumentReference` if this is a
     * subcollection. If this isn't a subcollection, the reference is null.
     */},{key:"parent",get:function get(){var t=this._path.popLast();return t.isEmpty()?null:new Ia(this.firestore,/* converter= */null,new Pt(t));}},{key:"withConverter",value:function withConverter(t){return new Ra(this.firestore,t,this._path);}}]);return Ra;}(Aa);function ba(t,e){for(var _len6=arguments.length,n=new Array(_len6>2?_len6-2:0),_key6=2;_key6<_len6;_key6++){n[_key6-2]=arguments[_key6];}if(t=getModularInstance(t),fa("collection","path",e),t instanceof Ta){var s=ht.fromString.apply(ht,[e].concat(n));return _a(s),new Ra(t,/* converter= */null,s);}{if(!(t instanceof Ia||t instanceof Ra))throw new j(K.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");var _s21=t._path.child(ht.fromString.apply(ht,[e].concat(n)));return _a(_s21),new Ra(t.firestore,/* converter= */null,_s21);}}// TODO(firestorelite): Consider using ErrorFactory -
function va(t,e){for(var _len7=arguments.length,n=new Array(_len7>2?_len7-2:0),_key7=2;_key7<_len7;_key7++){n[_key7-2]=arguments[_key7];}if(t=getModularInstance(t),// We allow omission of 'pathString' but explicitly prohibit passing in both
// 'undefined' and 'null'.
1===arguments.length&&(e=tt.I()),fa("doc","path",e),t instanceof Ta){var s=ht.fromString.apply(ht,[e].concat(n));return wa(s),new Ia(t,/* converter= */null,new Pt(s));}{if(!(t instanceof Ia||t instanceof Ra))throw new j(K.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");var _s22=t._path.child(ht.fromString.apply(ht,[e].concat(n)));return wa(_s22),new Ia(t.firestore,t instanceof Ra?t.converter:null,new Pt(_s22));}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Da=/*#__PURE__*/function(){function Da(){var _this156=this;_classCallCheck(this,Da);// The last promise in the queue.
this._c=Promise.resolve(),// A list of retryable operations. Retryable operations are run in order and
// retried with backoff.
this.mc=[],// Is this AsyncQueue being shut down? Once it is set to true, it will not
// be changed again.
this.gc=!1,// Operations scheduled to be queued in the future. Operations are
// automatically removed after they are run or canceled.
this.yc=[],// visible for testing
this.Tc=null,// Flag set while there's an outstanding AsyncQueue operation, used for
// assertion sanity-checks.
this.Ec=!1,// Enabled during shutdown on Safari to prevent future access to IndexedDB.
this.Ic=!1,// List of TimerIds to fast-forward delays for.
this.Ac=[],// Backoff timer used to schedule retries for retryable operations
this.ar=new Xr(this,"async_queue_retry"/* AsyncQueueRetry */),// Visibility handler that triggers an immediate retry of all retryable
// operations. Meant to speed up recovery when we regain file system access
// after page comes into foreground.
this.Rc=function(){var t=Jr();t&&$("AsyncQueue","Visibility state changed to "+t.visibilityState),_this156.ar.tr();};var t=Jr();t&&"function"==typeof t.addEventListener&&t.addEventListener("visibilitychange",this.Rc);}_createClass(Da,[{key:"isShuttingDown",get:function get(){return this.gc;}/**
     * Adds a new operation to the queue without waiting for it to complete (i.e.
     * we ignore the Promise result).
     */},{key:"enqueueAndForget",value:function enqueueAndForget(t){// eslint-disable-next-line @typescript-eslint/no-floating-promises
this.enqueue(t);}},{key:"enqueueAndForgetEvenWhileRestricted",value:function enqueueAndForgetEvenWhileRestricted(t){this.bc(),// eslint-disable-next-line @typescript-eslint/no-floating-promises
this.Pc(t);}},{key:"enterRestrictedMode",value:function enterRestrictedMode(t){if(!this.gc){this.gc=!0,this.Ic=t||!1;var e=Jr();e&&"function"==typeof e.removeEventListener&&e.removeEventListener("visibilitychange",this.Rc);}}},{key:"enqueue",value:function enqueue(t){var _this157=this;if(this.bc(),this.gc)// Return a Promise which never resolves.
return new Promise(function(){});// Create a deferred Promise that we can return to the callee. This
// allows us to return a "hanging Promise" only to the callee and still
// advance the queue even when the operation is not run.
var e=new Q();return this.Pc(function(){return _this157.gc&&_this157.Ic?Promise.resolve():(t().then(e.resolve,e.reject),e.promise);}).then(function(){return e.promise;});}},{key:"enqueueRetryable",value:function enqueueRetryable(t){var _this158=this;this.enqueueAndForget(function(){return _this158.mc.push(t),_this158.vc();});}/**
     * Runs the next operation from the retryable queue. If the operation fails,
     * reschedules with backoff.
     */},{key:"vc",value:function(){var _vc=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee61(){var _this159=this;return regenerator.wrap(function _callee61$(_context61){while(1){switch(_context61.prev=_context61.next){case 0:if(!(0!==this.mc.length)){_context61.next=14;break;}_context61.prev=1;_context61.next=4;return this.mc[0]();case 4:this.mc.shift();this.ar.reset();_context61.next=13;break;case 8:_context61.prev=8;_context61.t0=_context61["catch"](1);if(Hs(_context61.t0)){_context61.next=12;break;}throw _context61.t0;case 12:// Failure will be handled by AsyncQueue
$("AsyncQueue","Operation failed with retryable error: "+_context61.t0);case 13:this.mc.length>0&&// If there are additional operations, we re-schedule `retryNextOp()`.
// This is necessary to run retryable operations that failed during
// their initial attempt since we don't know whether they are already
// enqueued. If, for example, `op1`, `op2`, `op3` are enqueued and `op1`
// needs to  be re-run, we will run `op1`, `op1`, `op2` using the
// already enqueued calls to `retryNextOp()`. `op3()` will then run in the
// call scheduled here.
// Since `backoffAndRun()` cancels an existing backoff and schedules a
// new backoff on every call, there is only ever a single additional
// operation in the queue.
this.ar.Xi(function(){return _this159.vc();});case 14:case"end":return _context61.stop();}}},_callee61,this,[[1,8]]);}));function vc(){return _vc.apply(this,arguments);}return vc;}()},{key:"Pc",value:function Pc(t){var _this160=this;var e=this._c.then(function(){return _this160.Ec=!0,t()["catch"](function(t){_this160.Tc=t,_this160.Ec=!1;var e=/**
 * Chrome includes Error.message in Error.stack. Other browsers do not.
 * This returns expected output of message + stack when available.
 * @param error - Error or FirestoreError
 */function(t){var e=t.message||"";t.stack&&(e=t.stack.includes(t.message)?t.stack:t.message+"\n"+t.stack);return e;}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(t);// Re-throw the error so that this.tail becomes a rejected Promise and
// all further attempts to chain (via .then) will just short-circuit
// and return the rejected Promise.
throw O("INTERNAL UNHANDLED ERROR: ",e),t;}).then(function(t){return _this160.Ec=!1,t;});});return this._c=e,e;}},{key:"enqueueAfterDelay",value:function enqueueAfterDelay(t,e,n){var _this161=this;this.bc(),// Fast-forward delays for timerIds that have been overriden.
this.Ac.indexOf(t)>-1&&(e=0);var s=xo.createAndSchedule(this,t,e,n,function(t){return _this161.Vc(t);});return this.yc.push(s),s;}},{key:"bc",value:function bc(){this.Tc&&L();}},{key:"verifyOperationInProgress",value:function verifyOperationInProgress(){}/**
     * Waits until all currently queued tasks are finished executing. Delayed
     * operations are not run.
     */},{key:"Sc",value:function(){var _Sc2=_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee62(){var t;return regenerator.wrap(function _callee62$(_context62){while(1){switch(_context62.prev=_context62.next){case 0:t=this._c;_context62.next=3;return t;case 3:if(t!==this._c){_context62.next=0;break;}case 4:case"end":return _context62.stop();}}},_callee62,this);}));function Sc(){return _Sc2.apply(this,arguments);}return Sc;}()/**
     * For Tests: Determine if a delayed operation with a particular TimerId
     * exists.
     */},{key:"Dc",value:function Dc(t){var _iterator50=_createForOfIteratorHelper(this.yc),_step50;try{for(_iterator50.s();!(_step50=_iterator50.n()).done;){var e=_step50.value;if(e.timerId===t)return !0;}}catch(err){_iterator50.e(err);}finally{_iterator50.f();}return !1;}/**
     * For Tests: Runs some or all delayed operations early.
     *
     * @param lastTimerId - Delayed operations up to and including this TimerId
     * will be drained. Pass TimerId.All to run all delayed operations.
     * @returns a Promise that resolves once all operations have been run.
     */},{key:"Cc",value:function Cc(t){var _this162=this;// Note that draining may generate more delayed ops, so we do that first.
return this.Sc().then(function(){// Run ops in the same order they'd run if they ran naturally.
_this162.yc.sort(function(t,e){return t.targetTimeMs-e.targetTimeMs;});var _iterator51=_createForOfIteratorHelper(_this162.yc),_step51;try{for(_iterator51.s();!(_step51=_iterator51.n()).done;){var e=_step51.value;if(e.skipDelay(),"all"/* All */!==t&&e.timerId===t)break;}}catch(err){_iterator51.e(err);}finally{_iterator51.f();}return _this162.Sc();});}/**
     * For Tests: Skip all subsequent delays for a timer id.
     */},{key:"Nc",value:function Nc(t){this.Ac.push(t);}/** Called once a DelayedOperation is run or canceled. */},{key:"Vc",value:function Vc(t){// NOTE: indexOf / slice are O(n), but delayedOperations is expected to be small.
var e=this.yc.indexOf(t);this.yc.splice(e,1);}}]);return Da;}();/**
 * The Cloud Firestore service interface.
 *
 * Do not call this constructor directly. Instead, use {@link getFirestore}.
 */var ka=/*#__PURE__*/function(_Ta){_inherits(ka,_Ta);var _super32=_createSuper$1(ka);/** @hideconstructor */function ka(t,e){var _this163;_classCallCheck(this,ka);_this163=_super32.call(this,t,e),/**
         * Whether it's a {@link Firestore} or Firestore Lite instance.
         */_this163.type="firestore",_this163._queue=new Da(),_this163._persistenceKey="name"in t?t.name:"[DEFAULT]";return _this163;}_createClass(ka,[{key:"_terminate",value:function _terminate(){return this._firestoreClient||// The client must be initialized to ensure that all subsequent API
// usage throws an exception.
Ma(this),this._firestoreClient.terminate();}}]);return ka;}(Ta);/**
 * Returns the existing {@link Firestore} instance that is associated with the
 * provided {@link @firebase/app#FirebaseApp}. If no instance exists, initializes a new
 * instance with default settings.
 *
 * @param app - The {@link @firebase/app#FirebaseApp} instance that the returned {@link Firestore}
 * instance is associated with.
 * @returns The {@link Firestore} instance of the provided app.
 */function Oa(){var e=arguments.length>0&&arguments[0]!==undefined?arguments[0]:getApp();return _getProvider(e,"firestore").getImmediate();}/**
 * @internal
 */function Fa(t){return t._firestoreClient||Ma(t),t._firestoreClient.verifyNotTerminated(),t._firestoreClient;}function Ma(t){var e;var n=t._freezeSettings(),s=function(t,e,n,s){return new ua(t,e,n,s.host,s.ssl,s.experimentalForceLongPolling,s.experimentalAutoDetectLongPolling,s.useFetchStreams);}(t._databaseId,(null===(e=t._app)||void 0===e?void 0:e.options.appId)||"",t._persistenceKey,n);t._firestoreClient=new Kc(t._credentials,t._queue,s);}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A `FieldPath` refers to a field in a document. The path may consist of a
 * single field name (referring to a top-level field in the document), or a
 * list of field names (referring to a nested field in the document).
 *
 * Create a `FieldPath` by providing field names. If more than one field
 * name is provided, the path will point to a nested field in a document.
 */var Ja=/*#__PURE__*/function(){/**
     * Creates a `FieldPath` from the provided field names. If more than one field
     * name is provided, the path will point to a nested field in a document.
     *
     * @param fieldNames - A list of field names.
     */function Ja(){_classCallCheck(this,Ja);for(var _len8=arguments.length,t=new Array(_len8),_key8=0;_key8<_len8;_key8++){t[_key8]=arguments[_key8];}for(var e=0;e<t.length;++e){if(0===t[e].length)throw new j(K.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");}this._internalPath=new ft(t);}/**
     * Returns true if this `FieldPath` is equal to the provided one.
     *
     * @param other - The `FieldPath` to compare against.
     * @returns true if this `FieldPath` is equal to the provided one.
     */_createClass(Ja,[{key:"isEqual",value:function isEqual(t){return this._internalPath.isEqual(t._internalPath);}}]);return Ja;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An immutable object representing an array of bytes.
 */var Xa=/*#__PURE__*/function(){/** @hideconstructor */function Xa(t){_classCallCheck(this,Xa);this._byteString=t;}/**
     * Creates a new `Bytes` object from the given Base64 string, converting it to
     * bytes.
     *
     * @param base64 - The Base64 string used to create the `Bytes` object.
     */_createClass(Xa,[{key:"toBase64",value:/**
     * Returns the underlying bytes as a Base64-encoded string.
     *
     * @returns The Base64-encoded string created from the `Bytes` object.
     */function toBase64(){return this._byteString.toBase64();}/**
     * Returns the underlying bytes in a new `Uint8Array`.
     *
     * @returns The Uint8Array created from the `Bytes` object.
     */},{key:"toUint8Array",value:function toUint8Array(){return this._byteString.toUint8Array();}/**
     * Returns a string representation of the `Bytes` object.
     *
     * @returns A string representation of the `Bytes` object.
     */},{key:"toString",value:function toString(){return "Bytes(base64: "+this.toBase64()+")";}/**
     * Returns true if this `Bytes` object is equal to the provided one.
     *
     * @param other - The `Bytes` object to compare against.
     * @returns true if this `Bytes` object is equal to the provided one.
     */},{key:"isEqual",value:function isEqual(t){return this._byteString.isEqual(t._byteString);}}],[{key:"fromBase64String",value:function fromBase64String(t){try{return new Xa(_t.fromBase64String(t));}catch(t){throw new j(K.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t);}}/**
     * Creates a new `Bytes` object from the given Uint8Array.
     *
     * @param array - The Uint8Array used to create the `Bytes` object.
     */},{key:"fromUint8Array",value:function fromUint8Array(t){return new Xa(_t.fromUint8Array(t));}}]);return Xa;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Sentinel values that can be used when writing document fields with `set()`
 * or `update()`.
 */var Za=/**
     * @param _methodName - The public API endpoint that returns this class.
     * @hideconstructor
     */function Za(t){_classCallCheck(this,Za);this._methodName=t;};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * An immutable object representing a geographic location in Firestore. The
 * location is represented as latitude/longitude pair.
 *
 * Latitude values are in the range of [-90, 90].
 * Longitude values are in the range of [-180, 180].
 */var tu=/*#__PURE__*/function(){/**
     * Creates a new immutable `GeoPoint` object with the provided latitude and
     * longitude values.
     * @param latitude - The latitude as number between -90 and 90.
     * @param longitude - The longitude as number between -180 and 180.
     */function tu(t,e){_classCallCheck(this,tu);if(!isFinite(t)||t<-90||t>90)throw new j(K.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new j(K.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e;}/**
     * The latitude of this `GeoPoint` instance.
     */_createClass(tu,[{key:"latitude",get:function get(){return this._lat;}/**
     * The longitude of this `GeoPoint` instance.
     */},{key:"longitude",get:function get(){return this._long;}/**
     * Returns true if this `GeoPoint` is equal to the provided one.
     *
     * @param other - The `GeoPoint` to compare against.
     * @returns true if this `GeoPoint` is equal to the provided one.
     */},{key:"isEqual",value:function isEqual(t){return this._lat===t._lat&&this._long===t._long;}/** Returns a JSON-serializable representation of this GeoPoint. */},{key:"toJSON",value:function toJSON(){return {latitude:this._lat,longitude:this._long};}/**
     * Actually private to JS consumers of our API, so this function is prefixed
     * with an underscore.
     */},{key:"_compareTo",value:function _compareTo(t){return et(this._lat,t._lat)||et(this._long,t._long);}}]);return tu;}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var eu=/^__.*__$/;/** The result of parsing document data (e.g. for a setData call). */var nu=/*#__PURE__*/function(){function nu(t,e,n){_classCallCheck(this,nu);this.data=t,this.fieldMask=e,this.fieldTransforms=n;}_createClass(nu,[{key:"toMutation",value:function toMutation(t,e){return null!==this.fieldMask?new nn(t,this.data,this.fieldMask,e,this.fieldTransforms):new en(t,this.data,e,this.fieldTransforms);}}]);return nu;}();/** The result of parsing "update" data (i.e. for an updateData call). */var su=/*#__PURE__*/function(){function su(t,// The fieldMask does not include document transforms.
e,n){_classCallCheck(this,su);this.data=t,this.fieldMask=e,this.fieldTransforms=n;}_createClass(su,[{key:"toMutation",value:function toMutation(t,e){return new nn(t,this.data,this.fieldMask,e,this.fieldTransforms);}}]);return su;}();function iu(t){switch(t){case 0/* Set */:// fall through
case 2/* MergeSet */:// fall through
case 1/* Update */:return !0;case 3/* Argument */:case 4/* ArrayArgument */:return !1;default:throw L();}}/** A "context" object passed around while parsing user data. */var ru=/*#__PURE__*/function(){/**
     * Initializes a ParseContext with the given source and path.
     *
     * @param settings - The settings for the parser.
     * @param databaseId - The database ID of the Firestore instance.
     * @param serializer - The serializer to use to generate the Value proto.
     * @param ignoreUndefinedProperties - Whether to ignore undefined properties
     * rather than throw.
     * @param fieldTransforms - A mutable list of field transforms encountered
     * while parsing the data.
     * @param fieldMask - A mutable list of field paths encountered while parsing
     * the data.
     *
     * TODO(b/34871131): We don't support array paths right now, so path can be
     * null to indicate the context represents any location within an array (in
     * which case certain features will not work and errors will be somewhat
     * compromised).
     */function ru(t,e,n,s,i,r){_classCallCheck(this,ru);this.settings=t,this.databaseId=e,this.N=n,this.ignoreUndefinedProperties=s,// Minor hack: If fieldTransforms is undefined, we assume this is an
// external call and we need to validate the entire path.
void 0===i&&this.xc(),this.fieldTransforms=i||[],this.fieldMask=r||[];}_createClass(ru,[{key:"path",get:function get(){return this.settings.path;}},{key:"kc",get:function get(){return this.settings.kc;}/** Returns a new context with the specified settings overwritten. */},{key:"$c",value:function $c(t){return new ru(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.N,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask);}},{key:"Oc",value:function Oc(t){var e;var n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.$c({path:n,Fc:!1});return s.Mc(t),s;}},{key:"Lc",value:function Lc(t){var e;var n=null===(e=this.path)||void 0===e?void 0:e.child(t),s=this.$c({path:n,Fc:!1});return s.xc(),s;}},{key:"Bc",value:function Bc(t){// TODO(b/34871131): We don't support array paths right now; so make path
// undefined.
return this.$c({path:void 0,Fc:!0});}},{key:"Uc",value:function Uc(t){return bu(t,this.settings.methodName,this.settings.qc||!1,this.path,this.settings.Kc);}/** Returns 'true' if 'fieldPath' was traversed when creating this context. */},{key:"contains",value:function contains(t){return void 0!==this.fieldMask.find(function(e){return t.isPrefixOf(e);})||void 0!==this.fieldTransforms.find(function(e){return t.isPrefixOf(e.field);});}},{key:"xc",value:function xc(){// TODO(b/34871131): Remove null check once we have proper paths for fields
// within arrays.
if(this.path)for(var t=0;t<this.path.length;t++){this.Mc(this.path.get(t));}}},{key:"Mc",value:function Mc(t){if(0===t.length)throw this.Uc("Document fields must not be empty");if(iu(this.kc)&&eu.test(t))throw this.Uc('Document fields cannot begin and end with "__"');}}]);return ru;}();/**
 * Helper for parsing raw user input (provided via the API) into internal model
 * classes.
 */var ou=/*#__PURE__*/function(){function ou(t,e,n){_classCallCheck(this,ou);this.databaseId=t,this.ignoreUndefinedProperties=e,this.N=n||Yr(t);}/** Creates a new top-level parse context. */_createClass(ou,[{key:"jc",value:function jc(t,e,n){var s=arguments.length>3&&arguments[3]!==undefined?arguments[3]:!1;return new ru({kc:t,methodName:e,Kc:n,path:ft.emptyPath(),Fc:!1,qc:s},this.databaseId,this.N,this.ignoreUndefinedProperties);}}]);return ou;}();function cu(t){var e=t._freezeSettings(),n=Yr(t._databaseId);return new ou(t._databaseId,!!e.ignoreUndefinedProperties,n);}/** Parse document data from a set() call. */function au(t,e,n,s,i){var r=arguments.length>5&&arguments[5]!==undefined?arguments[5]:{};var o=t.jc(r.merge||r.mergeFields?2/* MergeSet */:0/* Set */,e,n,i);Eu("Data must be an object, but it was:",o,s);var c=pu(s,o);var a,u;if(r.merge)a=new dt(o.fieldMask),u=o.fieldTransforms;else if(r.mergeFields){var _t75=[];var _iterator53=_createForOfIteratorHelper(r.mergeFields),_step53;try{for(_iterator53.s();!(_step53=_iterator53.n()).done;){var _s23=_step53.value;var _i11=Iu(e,_s23,n);if(!o.contains(_i11))throw new j(K.INVALID_ARGUMENT,"Field '".concat(_i11,"' is specified in your field mask but missing from your input data."));Pu(_t75,_i11)||_t75.push(_i11);}}catch(err){_iterator53.e(err);}finally{_iterator53.f();}a=new dt(_t75),u=o.fieldTransforms.filter(function(t){return a.covers(t.field);});}else a=null,u=o.fieldTransforms;return new nu(new Ut(c),a,u);}var uu=/*#__PURE__*/function(_Za){_inherits(uu,_Za);var _super33=_createSuper$1(uu);function uu(){_classCallCheck(this,uu);return _super33.apply(this,arguments);}_createClass(uu,[{key:"_toFieldTransform",value:function _toFieldTransform(t){if(2/* MergeSet */!==t.kc)throw 1/* Update */===t.kc?t.Uc("".concat(this._methodName,"() can only appear at the top level of your update data")):t.Uc("".concat(this._methodName,"() cannot be used with set() unless you pass {merge:true}"));// No transform to add for a delete, but we need to add it to our
// fieldMask so it gets deleted.
return t.fieldMask.push(t.path),null;}},{key:"isEqual",value:function isEqual(t){return t instanceof uu;}}]);return uu;}(Za);/** Parse update data from an update() call. */function _u(t,e,n,s){var i=t.jc(1/* Update */,e,n);Eu("Data must be an object, but it was:",i,s);var r=[],o=Ut.empty();ct(s,function(t,s){var c=Ru(e,t,n);// For Compat types, we have to "extract" the underlying types before
// performing validation.
s=getModularInstance(s);var a=i.Lc(c);if(s instanceof uu)// Add it to the field mask, but don't add anything to updateData.
r.push(c);else {var _t76=yu(s,a);null!=_t76&&(r.push(c),o.set(c,_t76));}});var c=new dt(r);return new su(o,c,i.fieldTransforms);}/** Parse update data from a list of field/value arguments. */function mu(t,e,n,s,i,r){var o=t.jc(1/* Update */,e,n),c=[Iu(e,s,n)],a=[i];if(r.length%2!=0)throw new j(K.INVALID_ARGUMENT,"Function ".concat(e,"() needs to be called with an even number of arguments that alternate between field names and values."));for(var _t77=0;_t77<r.length;_t77+=2){c.push(Iu(e,r[_t77])),a.push(r[_t77+1]);}var u=[],h=Ut.empty();// We iterate in reverse order to pick the last value for a field if the
// user specified the field multiple times.
for(var _t78=c.length-1;_t78>=0;--_t78){if(!Pu(u,c[_t78])){var _e40=c[_t78];var _n24=a[_t78];// For Compat types, we have to "extract" the underlying types before
// performing validation.
_n24=getModularInstance(_n24);var _s24=o.Lc(_e40);if(_n24 instanceof uu)// Add it to the field mask, but don't add anything to updateData.
u.push(_e40);else {var _t79=yu(_n24,_s24);null!=_t79&&(u.push(_e40),h.set(_e40,_t79));}}}var l=new dt(u);return new su(h,l,o.fieldTransforms);}/**
 * Parses user data to Protobuf Values.
 *
 * @param input - Data to be parsed.
 * @param context - A context object representing the current path being parsed,
 * the source of the data being parsed, etc.
 * @returns The parsed value, or null if the value was a FieldValue sentinel
 * that should not be included in the resulting parsed data.
 */function yu(t,e){if(Tu(// Unwrap the API type from the Compat SDK. This will return the API type
// from firestore-exp.
t=getModularInstance(t)))return Eu("Unsupported field value:",e,t),pu(t,e);if(t instanceof Za)// FieldValues usually parse into transforms (except FieldValue.delete())
// in which case we do not want to include this field in our parsed data
// (as doing so will overwrite the field directly prior to the transform
// trying to transform it). So we don't add this location to
// context.fieldMask and we return null as our parsing result.
/**
 * "Parses" the provided FieldValueImpl, adding any necessary transforms to
 * context.fieldTransforms.
 */return function(t,e){// Sentinels are only supported with writes, and not within arrays.
if(!iu(e.kc))throw e.Uc("".concat(t._methodName,"() can only be used with update() and set()"));if(!e.path)throw e.Uc("".concat(t._methodName,"() is not currently supported inside arrays"));var n=t._toFieldTransform(e);n&&e.fieldTransforms.push(n);}/**
 * Helper to parse a scalar value (i.e. not an Object, Array, or FieldValue)
 *
 * @returns The parsed value
 */(t,e),null;if(void 0===t&&e.ignoreUndefinedProperties)// If the input is undefined it can never participate in the fieldMask, so
// don't handle this below. If `ignoreUndefinedProperties` is false,
// `parseScalarValue` will reject an undefined value.
return null;if(// If context.path is null we are inside an array and we don't support
// field mask paths more granular than the top-level array.
e.path&&e.fieldMask.push(e.path),t instanceof Array){// TODO(b/34871131): Include the path containing the array in the error
// message.
// In the case of IN queries, the parsed data is an array (representing
// the set of values to be included for the IN query) that may directly
// contain additional arrays (each representing an individual field
// value), so we disable this validation.
if(e.settings.Fc&&4/* ArrayArgument */!==e.kc)throw e.Uc("Nested arrays are not supported");return function(t,e){var n=[];var s=0;var _iterator54=_createForOfIteratorHelper(t),_step54;try{for(_iterator54.s();!(_step54=_iterator54.n()).done;){var i=_step54.value;var _t80=yu(i,e.Bc(s));null==_t80&&(// Just include nulls in the array for fields being replaced with a
// sentinel.
_t80={nullValue:"NULL_VALUE"}),n.push(_t80),s++;}}catch(err){_iterator54.e(err);}finally{_iterator54.f();}return {arrayValue:{values:n}};}(t,e);}return function(t,e){if(null===(t=getModularInstance(t)))return {nullValue:"NULL_VALUE"};if("number"==typeof t)return Ce(e.N,t);if("boolean"==typeof t)return {booleanValue:t};if("string"==typeof t)return {stringValue:t};if(t instanceof Date){var n=it.fromDate(t);return {timestampValue:Un(e.N,n)};}if(t instanceof it){// Firestore backend truncates precision down to microseconds. To ensure
// offline mode works the same with regards to truncation, perform the
// truncation immediately without waiting for the backend to do that.
var _n25=new it(t.seconds,1e3*Math.floor(t.nanoseconds/1e3));return {timestampValue:Un(e.N,_n25)};}if(t instanceof tu)return {geoPointValue:{latitude:t.latitude,longitude:t.longitude}};if(t instanceof Xa)return {bytesValue:qn(e.N,t._byteString)};if(t instanceof Ia){var _n26=e.databaseId,s=t.firestore._databaseId;if(!s.isEqual(_n26))throw e.Uc("Document reference is for database ".concat(s.projectId,"/").concat(s.database," but should be for database ").concat(_n26.projectId,"/").concat(_n26.database));return {referenceValue:Qn(t.firestore._databaseId||e.databaseId,t._key.path)};}throw e.Uc("Unsupported field value: ".concat(ma(t)));}/**
 * Checks whether an object looks like a JSON object that should be converted
 * into a struct. Normal class/prototype instances are considered to look like
 * JSON objects since they should be converted to a struct value. Arrays, Dates,
 * GeoPoints, etc. are not considered to look like JSON objects since they map
 * to specific FieldValue types other than ObjectValue.
 */(t,e);}function pu(t,e){var n={};return at(t)?// If we encounter an empty object, we explicitly add it to the update
// mask to ensure that the server creates a map entry.
e.path&&e.path.length>0&&e.fieldMask.push(e.path):ct(t,function(t,s){var i=yu(s,e.Oc(t));null!=i&&(n[t]=i);}),{mapValue:{fields:n}};}function Tu(t){return !("object"!=_typeof(t)||null===t||t instanceof Array||t instanceof Date||t instanceof it||t instanceof tu||t instanceof Xa||t instanceof Ia||t instanceof Za);}function Eu(t,e,n){if(!Tu(n)||!function(t){return "object"==_typeof(t)&&null!==t&&(Object.getPrototypeOf(t)===Object.prototype||null===Object.getPrototypeOf(t));}(n)){var s=ma(n);throw "an object"===s?e.Uc(t+" a custom object"):e.Uc(t+" "+s);}}/**
 * Helper that calls fromDotSeparatedString() but wraps any error thrown.
 */function Iu(t,e,n){if((// If required, replace the FieldPath Compat class with with the firestore-exp
// FieldPath.
e=getModularInstance(e))instanceof Ja)return e._internalPath;if("string"==typeof e)return Ru(t,e);throw bu("Field path arguments must be of type string or FieldPath.",t,/* hasConverter= */!1,/* path= */void 0,n);}/**
 * Matches any characters in a field path string that are reserved.
 */var Au=new RegExp("[~\\*/\\[\\]]");/**
 * Wraps fromDotSeparatedString with an error message about the method that
 * was thrown.
 * @param methodName - The publicly visible method name
 * @param path - The dot-separated string form of a field path which will be
 * split on dots.
 * @param targetDoc - The document against which the field path will be
 * evaluated.
 */function Ru(t,e,n){if(e.search(Au)>=0)throw bu("Invalid field path (".concat(e,"). Paths must not contain '~', '*', '/', '[', or ']'"),t,/* hasConverter= */!1,/* path= */void 0,n);try{return _construct(Ja,_toConsumableArray(e.split(".")))._internalPath;}catch(s){throw bu("Invalid field path (".concat(e,"). Paths must not be empty, begin with '.', end with '.', or contain '..'"),t,/* hasConverter= */!1,/* path= */void 0,n);}}function bu(t,e,n,s,i){var r=s&&!s.isEmpty(),o=void 0!==i;var c="Function ".concat(e,"() called with invalid data");n&&(c+=" (via `toFirestore()`)"),c+=". ";var a="";return (r||o)&&(a+=" (found",r&&(a+=" in field ".concat(s)),o&&(a+=" in document ".concat(i)),a+=")"),new j(K.INVALID_ARGUMENT,c+t+a);}/** Checks `haystack` if FieldPath `needle` is present. Runs in O(n). */function Pu(t,e){return t.some(function(t){return t.isEqual(e);});}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */var vu=/*#__PURE__*/function(){// Note: This class is stripped down version of the DocumentSnapshot in
// the legacy SDK. The changes are:
// - No support for SnapshotMetadata.
// - No support for SnapshotOptions.
/** @hideconstructor protected */function vu(t,e,n,s,i){_classCallCheck(this,vu);this._firestore=t,this._userDataWriter=e,this._key=n,this._document=s,this._converter=i;}/** Property of the `DocumentSnapshot` that provides the document's ID. */_createClass(vu,[{key:"id",get:function get(){return this._key.path.lastSegment();}/**
     * The `DocumentReference` for the document included in the `DocumentSnapshot`.
     */},{key:"ref",get:function get(){return new Ia(this._firestore,this._converter,this._key);}/**
     * Signals whether or not the document at the snapshot's location exists.
     *
     * @returns true if the document exists.
     */},{key:"exists",value:function exists(){return null!==this._document;}/**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * @returns An `Object` containing all fields in the document or `undefined`
     * if the document doesn't exist.
     */},{key:"data",value:function data(){if(this._document){if(this._converter){// We only want to use the converter and create a new DocumentSnapshot
// if a converter has been provided.
var t=new Vu(this._firestore,this._userDataWriter,this._key,this._document,/* converter= */null);return this._converter.fromFirestore(t);}return this._userDataWriter.convertValue(this._document.data.value);}}/**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */ // We are using `any` here to avoid an explicit cast by our users.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
},{key:"get",value:function get(t){if(this._document){var e=this._document.data.field(Su("DocumentSnapshot.get",t));if(null!==e)return this._userDataWriter.convertValue(e);}}}]);return vu;}();/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */var Vu=/*#__PURE__*/function(_vu){_inherits(Vu,_vu);var _super38=_createSuper$1(Vu);function Vu(){_classCallCheck(this,Vu);return _super38.apply(this,arguments);}_createClass(Vu,[{key:"data",value:/**
     * Retrieves all fields in the document as an `Object`.
     *
     * @override
     * @returns An `Object` containing all fields in the document.
     */function data(){return _get(_getPrototypeOf(Vu.prototype),"data",this).call(this);}}]);return Vu;}(vu);/**
 * Helper that calls `fromDotSeparatedString()` but wraps any error thrown.
 */function Su(t,e){return "string"==typeof e?Ru(t,e):e instanceof Ja?e._internalPath:e._delegate._internalPath;}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Metadata about a snapshot, describing the state of the snapshot.
 */var Du=/*#__PURE__*/function(){/** @hideconstructor */function Du(t,e){_classCallCheck(this,Du);this.hasPendingWrites=t,this.fromCache=e;}/**
     * Returns true if this `SnapshotMetadata` is equal to the provided one.
     *
     * @param other - The `SnapshotMetadata` to compare against.
     * @returns true if this `SnapshotMetadata` is equal to the provided one.
     */_createClass(Du,[{key:"isEqual",value:function isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache;}}]);return Du;}();/**
 * A `DocumentSnapshot` contains data read from a document in your Firestore
 * database. The data can be extracted with `.data()` or `.get(<field>)` to
 * get a specific field.
 *
 * For a `DocumentSnapshot` that points to a non-existing document, any data
 * access will return 'undefined'. You can use the `exists()` method to
 * explicitly verify a document's existence.
 */var Cu=/*#__PURE__*/function(_vu2){_inherits(Cu,_vu2);var _super39=_createSuper$1(Cu);/** @hideconstructor protected */function Cu(t,e,n,s,i,r){var _this167;_classCallCheck(this,Cu);_this167=_super39.call(this,t,e,n,s,r),_this167._firestore=t,_this167._firestoreImpl=t,_this167.metadata=i;return _this167;}/**
     * Property of the `DocumentSnapshot` that signals whether or not the data
     * exists. True if the document exists.
     */_createClass(Cu,[{key:"exists",value:function exists(){return _get(_getPrototypeOf(Cu.prototype),"exists",this).call(this);}/**
     * Retrieves all fields in the document as an `Object`. Returns `undefined` if
     * the document doesn't exist.
     *
     * By default, `FieldValue.serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document or `undefined` if
     * the document doesn't exist.
     */},{key:"data",value:function data(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};if(this._document){if(this._converter){// We only want to use the converter and create a new DocumentSnapshot
// if a converter has been provided.
var e=new Nu(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,/* converter= */null);return this._converter.fromFirestore(e,t);}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps);}}/**
     * Retrieves the field specified by `fieldPath`. Returns `undefined` if the
     * document or field doesn't exist.
     *
     * By default, a `FieldValue.serverTimestamp()` that has not yet been set to
     * its final value will be returned as `null`. You can override this by
     * passing an options object.
     *
     * @param fieldPath - The path (for example 'foo' or 'foo.bar') to a specific
     * field.
     * @param options - An options object to configure how the field is retrieved
     * from the snapshot (for example the desired behavior for server timestamps
     * that have not yet been set to their final value).
     * @returns The data at the specified field location or undefined if no such
     * field exists in the document.
     */ // We are using `any` here to avoid an explicit cast by our users.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
},{key:"get",value:function get(t){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};if(this._document){var n=this._document.data.field(Su("DocumentSnapshot.get",t));if(null!==n)return this._userDataWriter.convertValue(n,e.serverTimestamps);}}}]);return Cu;}(vu);/**
 * A `QueryDocumentSnapshot` contains data read from a document in your
 * Firestore database as part of a query. The document is guaranteed to exist
 * and its data can be extracted with `.data()` or `.get(<field>)` to get a
 * specific field.
 *
 * A `QueryDocumentSnapshot` offers the same API surface as a
 * `DocumentSnapshot`. Since query results contain only existing documents, the
 * `exists` property will always be true and `data()` will never return
 * 'undefined'.
 */var Nu=/*#__PURE__*/function(_Cu){_inherits(Nu,_Cu);var _super40=_createSuper$1(Nu);function Nu(){_classCallCheck(this,Nu);return _super40.apply(this,arguments);}_createClass(Nu,[{key:"data",value:/**
     * Retrieves all fields in the document as an `Object`.
     *
     * By default, `FieldValue.serverTimestamp()` values that have not yet been
     * set to their final value will be returned as `null`. You can override
     * this by passing an options object.
     *
     * @override
     * @param options - An options object to configure how data is retrieved from
     * the snapshot (for example the desired behavior for server timestamps that
     * have not yet been set to their final value).
     * @returns An `Object` containing all fields in the document.
     */function data(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};return _get(_getPrototypeOf(Nu.prototype),"data",this).call(this,t);}}]);return Nu;}(Cu);/**
 * A `QuerySnapshot` contains zero or more `DocumentSnapshot` objects
 * representing the results of a query. The documents can be accessed as an
 * array via the `docs` property or enumerated using the `forEach` method. The
 * number of documents can be determined via the `empty` and `size`
 * properties.
 */var xu=/*#__PURE__*/function(){/** @hideconstructor */function xu(t,e,n,s){_classCallCheck(this,xu);this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Du(s.hasPendingWrites,s.fromCache),this.query=n;}/** An array of all the documents in the `QuerySnapshot`. */_createClass(xu,[{key:"docs",get:function get(){var t=[];return this.forEach(function(e){return t.push(e);}),t;}/** The number of documents in the `QuerySnapshot`. */},{key:"size",get:function get(){return this._snapshot.docs.size;}/** True if there are no documents in the `QuerySnapshot`. */},{key:"empty",get:function get(){return 0===this.size;}/**
     * Enumerates all of the documents in the `QuerySnapshot`.
     *
     * @param callback - A callback to be called with a `QueryDocumentSnapshot` for
     * each document in the snapshot.
     * @param thisArg - The `this` binding for the callback.
     */},{key:"forEach",value:function forEach(t,e){var _this168=this;this._snapshot.docs.forEach(function(n){t.call(e,new Nu(_this168._firestore,_this168._userDataWriter,n.key,n,new Du(_this168._snapshot.mutatedKeys.has(n.key),_this168._snapshot.fromCache),_this168.query.converter));});}/**
     * Returns an array of the documents changes since the last snapshot. If this
     * is the first snapshot, all documents will be in the list as 'added'
     * changes.
     *
     * @param options - `SnapshotListenOptions` that control whether metadata-only
     * changes (i.e. only `DocumentSnapshot.metadata` changed) should trigger
     * snapshot events.
     */},{key:"docChanges",value:function docChanges(){var t=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new j(K.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=/** Calculates the array of `DocumentChange`s for a given `ViewSnapshot`. */function(t,e){if(t._snapshot.oldDocs.isEmpty()){var _e41=0;return t._snapshot.docChanges.map(function(n){return {type:"added",doc:new Nu(t._firestore,t._userDataWriter,n.doc.key,n.doc,new Du(t._snapshot.mutatedKeys.has(n.doc.key),t._snapshot.fromCache),t.query.converter),oldIndex:-1,newIndex:_e41++};});}{// A `DocumentSet` that is updated incrementally as changes are applied to use
// to lookup the index of a document.
var n=t._snapshot.oldDocs;return t._snapshot.docChanges.filter(function(t){return e||3/* Metadata */!==t.type;}).map(function(e){var s=new Nu(t._firestore,t._userDataWriter,e.doc.key,e.doc,new Du(t._snapshot.mutatedKeys.has(e.doc.key),t._snapshot.fromCache),t.query.converter);var i=-1,r=-1;return 0/* Added */!==e.type&&(i=n.indexOf(e.doc.key),n=n["delete"](e.doc.key)),1/* Removed */!==e.type&&(n=n.add(e.doc),r=n.indexOf(e.doc.key)),{type:ku(e.type),doc:s,oldIndex:i,newIndex:r};});}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges;}}]);return xu;}();function ku(t){switch(t){case 0/* Added */:return "added";case 2/* Modified */:case 3/* Metadata */:return "modified";case 1/* Removed */:return "removed";default:return L();}}// TODO(firestoreexp): Add tests for snapshotEqual with different snapshot
/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ou(t){if(me(t)&&0===t.explicitOrderBy.length)throw new j(K.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause");}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Converts Firestore's internal types to the JavaScript types that we expose
 * to the user.
 *
 * @internal
 */var nh=/*#__PURE__*/function(){function nh(){_classCallCheck(this,nh);}_createClass(nh,[{key:"convertValue",value:function convertValue(t){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"none";switch(vt(t)){case 0/* NullValue */:return null;case 1/* BooleanValue */:return t.booleanValue;case 2/* NumberValue */:return yt(t.integerValue||t.doubleValue);case 3/* TimestampValue */:return this.convertTimestamp(t.timestampValue);case 4/* ServerTimestampValue */:return this.convertServerTimestamp(t,e);case 5/* StringValue */:return t.stringValue;case 6/* BlobValue */:return this.convertBytes(pt(t.bytesValue));case 7/* RefValue */:return this.convertReference(t.referenceValue);case 8/* GeoPointValue */:return this.convertGeoPoint(t.geoPointValue);case 9/* ArrayValue */:return this.convertArray(t.arrayValue,e);case 10/* ObjectValue */:return this.convertObject(t.mapValue,e);default:throw L();}}},{key:"convertObject",value:function convertObject(t,e){var _this174=this;var n={};return ct(t.fields,function(t,s){n[t]=_this174.convertValue(s,e);}),n;}},{key:"convertGeoPoint",value:function convertGeoPoint(t){return new tu(yt(t.latitude),yt(t.longitude));}},{key:"convertArray",value:function convertArray(t,e){var _this175=this;return (t.values||[]).map(function(t){return _this175.convertValue(t,e);});}},{key:"convertServerTimestamp",value:function convertServerTimestamp(t,e){switch(e){case"previous":var n=Et(t);return null==n?null:this.convertValue(n,e);case"estimate":return this.convertTimestamp(It(t));default:return null;}}},{key:"convertTimestamp",value:function convertTimestamp(t){var e=gt(t);return new it(e.seconds,e.nanos);}},{key:"convertDocumentKey",value:function convertDocumentKey(t,e){var n=ht.fromString(t);B(Ts(n));var s=new ha(n.get(1),n.get(3)),i=new Pt(n.popFirst(5));return s.isEqual(e)||// TODO(b/64130202): Somehow support foreign references.
O("Document ".concat(i," contains a document reference within a different database (").concat(s.projectId,"/").concat(s.database,") which is not supported. It will be treated as a reference in the current database (").concat(e.projectId,"/").concat(e.database,") instead.")),i;}}]);return nh;}();/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Converts custom model object of type T into `DocumentData` by applying the
 * converter if it exists.
 *
 * This function is used when converting user objects to `DocumentData`
 * because we want to provide the user with a more specific error message if
 * their `set()` or fails due to invalid data originating from a `toFirestore()`
 * call.
 */function sh(t,e,n){var s;// Cast to `any` in order to satisfy the union type constraint on
// toFirestore().
// eslint-disable-next-line @typescript-eslint/no-explicit-any
return s=t?n&&(n.merge||n.mergeFields)?t.toFirestore(e,n):t.toFirestore(e):e,s;}// legacy SDK.
/**
 * A reference to a transaction.
 *
 * The `Transaction` object passed to a transaction's `updateFunction` provides
 * the methods to read and write data within the transaction context. See
 * {@link runTransaction}.
 */ /**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ /**
 * Reads the document referred to by this `DocumentReference`.
 *
 * Note: `getDoc()` attempts to provide up-to-date data when possible by waiting
 * for data from the server, but it may return cached data or fail if you are
 * offline and the server cannot be reached. To specify this behavior, invoke
 * {@link getDocFromCache} or {@link getDocFromServer}.
 *
 * @param reference - The reference of the document to fetch.
 * @returns A Promise resolved with a `DocumentSnapshot` containing the
 * current document contents.
 */function ch(t){t=ga(t,Ia);var e=ga(t.firestore,ka);return na(Fa(e),t._key).then(function(n){return Eh(e,t,n);});}var ah=/*#__PURE__*/function(_nh2){_inherits(ah,_nh2);var _super47=_createSuper$1(ah);function ah(t){var _this177;_classCallCheck(this,ah);_this177=_super47.call(this),_this177.firestore=t;return _this177;}_createClass(ah,[{key:"convertBytes",value:function convertBytes(t){return new Xa(t);}},{key:"convertReference",value:function convertReference(t){var e=this.convertDocumentKey(t,this.firestore._databaseId);return new Ia(this.firestore,/* converter= */null,e);}}]);return ah;}(nh);/**
 * Executes the query and returns the results as a `QuerySnapshot`.
 *
 * Note: `getDocs()` attempts to provide up-to-date data when possible by
 * waiting for data from the server, but it may return cached data or fail if
 * you are offline and the server cannot be reached. To specify this behavior,
 * invoke {@link getDocsFromCache} or {@link getDocsFromServer}.
 *
 * @returns A `Promise` that will be resolved with the results of the query.
 */function lh(t){t=ga(t,Aa);var e=ga(t.firestore,ka),n=Fa(e),s=new ah(e);return Ou(t._query),ia(n,t._query).then(function(n){return new xu(e,s,t,n);});}function wh(t,e,n){t=ga(t,Ia);var s=ga(t.firestore,ka),i=sh(t.converter,e,n);return Th(s,[au(cu(s),"setDoc",t._key,i,null!==t.converter,n).toMutation(t._key,Ge.none())]);}function _h(t,e,n){t=ga(t,Ia);var i=ga(t.firestore,ka),r=cu(i);var o;for(var _len15=arguments.length,s=new Array(_len15>3?_len15-3:0),_key15=3;_key15<_len15;_key15++){s[_key15-3]=arguments[_key15];}o="string"==typeof(// For Compat types, we have to "extract" the underlying types before
// performing validation.
e=getModularInstance(e))||e instanceof Ja?mu(r,"updateDoc",t._key,e,n,s):_u(r,"updateDoc",t._key,e);return Th(i,[o.toMutation(t._key,Ge.exists(!0))]);}/**
 * Locally writes `mutations` on the async queue.
 * @internal
 */function Th(t,e){return function(t,e){var n=new Q();return t.asyncQueue.enqueueAndForget(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/regenerator.mark(function _callee69(){return regenerator.wrap(function _callee69$(_context69){while(1){switch(_context69.prev=_context69.next){case 0:_context69.t0=rc;_context69.next=3;return Yc(t);case 3:_context69.t1=_context69.sent;_context69.t2=e;_context69.t3=n;return _context69.abrupt("return",(0, _context69.t0)(_context69.t1,_context69.t2,_context69.t3));case 7:case"end":return _context69.stop();}}},_callee69);}))),n.promise;}(Fa(t),e);}/**
 * Converts a {@link ViewSnapshot} that contains the single document specified by `ref`
 * to a {@link DocumentSnapshot}.
 */function Eh(t,e,n){var s=n.docs.get(e._key),i=new ah(t);return new Cu(t,i,e._key,s,new Du(n.hasPendingWrites,n.fromCache),e.converter);}/**
 * Cloud Firestore
 *
 * @packageDocumentation
 */!function(t){var e=arguments.length>1&&arguments[1]!==undefined?arguments[1]:!0;!function(t){C=t;}(SDK_VERSION),_registerComponent(new Component("firestore",function(t,_ref58){var n=_ref58.options;var s=t.getProvider("app").getImmediate(),i=new ka(s,new H(t.getProvider("auth-internal")));return n=Object.assign({useFetchStreams:e},n),i._setSettings(n),i;},"PUBLIC"/* PUBLIC */)),registerVersion(S,"3.2.1",t),// BUILD_TARGET will be replaced by values like esm5, esm2017, cjs5, etc during the compilation
registerVersion(S,"3.2.1","esm2017");}();

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var CollectionFirestore = /*#__PURE__*/function (_Collection) {
  _inherits(CollectionFirestore, _Collection);

  var _super = _createSuper(CollectionFirestore);

  function CollectionFirestore(name, order, _options) {
    var _this;

    _classCallCheck(this, CollectionFirestore);

    _this = _super.call(this, name, order, _options); // Configuration data test

    _defineProperty(_assertThisInitialized(_this), "keys", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
      var docIds, querySnap;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              docIds = [];
              _context.prev = 1;
              _context.next = 4;
              return lh(_this._collection);

            case 4:
              querySnap = _context.sent;
              querySnap.forEach(function (doc) {
                docIds.push(doc.id);
              });
              return _context.abrupt("return", docIds);

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](1);
              return _context.abrupt("return", []);

            case 12:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[1, 9]]);
    })));

    _defineProperty(_assertThisInitialized(_this), "get", /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(docId) {
        var docRef, docSnap;
        return regenerator.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                docRef = va(_this._firestore, _this._name, docId);
                _context2.next = 4;
                return ch(docRef);

              case 4:
                docSnap = _context2.sent;

                if (!docSnap.exists()) {
                  _context2.next = 9;
                  break;
                }

                return _context2.abrupt("return", docSnap.data());

              case 9:
                return _context2.abrupt("return", null);

              case 10:
                _context2.next = 15;
                break;

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](0);
                return _context2.abrupt("return", null);

              case 15:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 12]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "set", /*#__PURE__*/function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(docId, docData) {
        var docRef;
        return regenerator.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (docData) {
                  _context3.next = 2;
                  break;
                }

                return _context3.abrupt("return", false);

              case 2:
                _context3.prev = 2;
                docRef = va(_this._firestore, _this._name, docId);
                _context3.next = 6;
                return wh(docRef, docData);

              case 6:
                return _context3.abrupt("return", true);

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](2);
                return _context3.abrupt("return", false);

              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[2, 9]]);
      }));

      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "update", /*#__PURE__*/function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(docId, updates) {
        var docRef;
        return regenerator.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (updates) {
                  _context4.next = 2;
                  break;
                }

                return _context4.abrupt("return", false);

              case 2:
                _context4.prev = 2;
                docRef = va(_this._firestore, _this._name, docId);
                _context4.next = 6;
                return _h(docRef, updates);

              case 6:
                return _context4.abrupt("return", true);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", false);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[2, 9]]);
      }));

      return function (_x4, _x5) {
        return _ref4.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "sort", /*#__PURE__*/function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(orderBy, range) {
        return regenerator.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                return _context5.abrupt("return", range);

              case 1:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5);
      }));

      return function (_x6, _x7) {
        return _ref5.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "search", /*#__PURE__*/function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(query, options) {
        var range;
        return regenerator.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                // The given query type is either "string" or "conditional".
                query.type() === "string"; // Search options

                range = options.range;
                options.fuzzy ? SearchStrategy.Fuzzy : SearchStrategy.Literal;

                _toConsumableArray(range); // TODO:

                return _context6.abrupt("return", []);

              case 7:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6);
      }));

      return function (_x8, _x9) {
        return _ref6.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "remove", /*#__PURE__*/function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(docId) {
        return regenerator.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                return _context7.abrupt("return", false);

              case 1:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7);
      }));

      return function (_x10) {
        return _ref7.apply(this, arguments);
      };
    }());

    _defineProperty(_assertThisInitialized(_this), "clear", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8() {
      return regenerator.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              return _context8.abrupt("return", false);

            case 1:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    })));

    _defineProperty(_assertThisInitialized(_this), "destroy", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9() {
      return regenerator.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              // TODO: destroy collection
              delete _this._collection;
              return _context9.abrupt("return", true);

            case 2:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9);
    })));

    if (!_this._isValidConfig(_options.config, ["apiKey", "authDomain", "projectId"])) {
      throw new Error("Invalid configuration: ".concat(_options.config));
    } // Create firebase app


    _this._firebaseApp = initializeApp({
      apiKey: _options.config.apiKey,
      authDomain: _options.config.authDomain,
      projectId: _options.config.projectId
    }); // Get firestore instance

    _this._firestore = Oa(_this._firebaseApp); // `CollectionReference` of Firestore

    _this._collection = ba(_this._firestore, _this._name);
    return _this;
  }

  return CollectionFirestore;
}(Collection);

var orderCollectionName = "_orders";

var DocumentOrder = // Order data
// Mutex
function DocumentOrder(docCollection, options) {
  var _this = this;

  _classCallCheck(this, DocumentOrder);

  _defineProperty(this, "_overall", []);

  _defineProperty(this, "_foreach", {});

  _defineProperty(this, "_mutex", new i(1));

  _defineProperty(this, "load", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    var range, orderData, _this$_options, _this$_options$search, orderBy;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this._docCollection.keys();

          case 2:
            range = _context.sent;
            _this._overall = range; // Load document orders for each field

            _context.next = 6;
            return _this._orderCollection.get(_this._docCollection.name());

          case 6:
            orderData = _context.sent;

            if (!orderData) {
              _context.next = 16;
              break;
            }

            _this._foreach = orderData; // Sort the comprehensive documents if ordering options are given.

            orderBy = (_this$_options = _this._options) === null || _this$_options === void 0 ? void 0 : (_this$_options$search = _this$_options.search) === null || _this$_options$search === void 0 ? void 0 : _this$_options$search.orderBy;

            if (!orderBy) {
              _context.next = 14;
              break;
            }

            _context.next = 13;
            return _this.sort(orderBy, range);

          case 13:
            _this._overall = _context.sent;

          case 14:
            _context.next = 19;
            break;

          case 16:
            _this._foreach = {};
            _context.next = 19;
            return _this._orderCollection.set(_this._docCollection.name(), _this._foreach);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  _defineProperty(this, "order", function () {
    return _this._overall;
  });

  _defineProperty(this, "get", function (docId, fields) {
    var indexes = {};
    fields.forEach(function (field) {
      if (field in _this._foreach) indexes[field] = _this._foreach[field].indexOf(docId);
    });
    return indexes;
  });

  _defineProperty(this, "set", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(docData) {
      var tasks, indexes, _field, _i, _Object$entries, _Object$entries$_i, _field2, index, result;

      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (docData) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", false);

            case 2:
              tasks = [];
              indexes = {};
              _context2.next = 6;
              return _this._mutex.lock();

            case 6:
              _context2.t0 = regenerator.keys(docData);

            case 7:
              if ((_context2.t1 = _context2.t0()).done) {
                _context2.next = 14;
                break;
              }

              _field = _context2.t1.value;

              if (!(_field[0] === "_")) {
                _context2.next = 11;
                break;
              }

              return _context2.abrupt("continue", 7);

            case 11:
              if (typeof docData[_field] === "string" || typeof docData[_field] === "number") {
                if (!(_field in _this._foreach)) _this._foreach[_field] = [];
                tasks.push(_this._findIdx(_field, docData, 0, _this._foreach[_field].length).then(function (result) {
                  Object.assign(indexes, result);
                }));
              }

              _context2.next = 7;
              break;

            case 14:
              _context2.next = 16;
              return Promise.all(tasks);

            case 16:
              // Insert indexes
              for (_i = 0, _Object$entries = Object.entries(indexes); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2), _field2 = _Object$entries$_i[0], index = _Object$entries$_i[1];
                if (!_this._foreach[_field2].includes(docData._id)) _this._foreach[_field2].splice(index, 0, docData._id);
              }

              _context2.next = 19;
              return _this._orderCollection.set(_this._docCollection.name(), _this._foreach);

            case 19:
              result = _context2.sent;

              _this._mutex.unlock();

              return _context2.abrupt("return", result);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "_findIdx", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(field, newData, start, length) {
      var result, newValue, pivot, pivotData, pivotValue, _pivot, _pivotData, _pivotValue;

      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              result = {};
              newValue = newData[field];

              if (!(length === 0)) {
                _context3.next = 11;
                break;
              }

              if (!(typeof newValue === "number" || typeof newValue === "string")) {
                _context3.next = 8;
                break;
              }

              result[field] = 0;
              return _context3.abrupt("return", result);

            case 8:
              return _context3.abrupt("return", {});

            case 9:
              _context3.next = 70;
              break;

            case 11:
              if (!(length === 1)) {
                _context3.next = 34;
                break;
              }

              pivot = start;
              _context3.next = 15;
              return _this._docCollection.get(_this._foreach[field][pivot]);

            case 15:
              pivotData = _context3.sent;

              if (!pivotData) {
                _context3.next = 31;
                break;
              }

              pivotValue = pivotData[field];
              _context3.prev = 18;

              if (!(typeof newValue === "number")) {
                _context3.next = 24;
                break;
              }

              result[field] = newValue <= pivotValue ? pivot : pivot + 1;
              return _context3.abrupt("return", result);

            case 24:
              if (!(typeof newValue === "string")) {
                _context3.next = 27;
                break;
              }

              result[field] = newValue <= pivotValue ? pivot : pivot + 1;
              return _context3.abrupt("return", result);

            case 27:
              _context3.next = 31;
              break;

            case 29:
              _context3.prev = 29;
              _context3.t0 = _context3["catch"](18);

            case 31:
              return _context3.abrupt("return", {});

            case 34:
              // O(log_2) time complexity
              _pivot = start + ~~((length - 1) / 2);
              _context3.next = 37;
              return _this._docCollection.get(_this._foreach[field][_pivot]);

            case 37:
              _pivotData = _context3.sent;

              if (!_pivotData) {
                _context3.next = 69;
                break;
              }

              _pivotValue = _pivotData[field];
              _context3.prev = 40;

              if (!(typeof newValue === "number")) {
                _context3.next = 54;
                break;
              }

              if (!(newValue <= _pivotValue)) {
                _context3.next = 48;
                break;
              }

              _context3.next = 45;
              return _this._findIdx(field, newData, start, _pivot + 1 - start);

            case 45:
              _context3.t1 = _context3.sent;
              _context3.next = 51;
              break;

            case 48:
              _context3.next = 50;
              return _this._findIdx(field, newData, _pivot + 1, start + length - 1 - _pivot);

            case 50:
              _context3.t1 = _context3.sent;

            case 51:
              return _context3.abrupt("return", _context3.t1);

            case 54:
              if (!(typeof newValue === "string")) {
                _context3.next = 65;
                break;
              }

              if (!(newValue <= _pivotValue)) {
                _context3.next = 61;
                break;
              }

              _context3.next = 58;
              return _this._findIdx(field, newData, start, _pivot + 1 - start);

            case 58:
              _context3.t2 = _context3.sent;
              _context3.next = 64;
              break;

            case 61:
              _context3.next = 63;
              return _this._findIdx(field, newData, _pivot + 1, start + length - 1 - _pivot);

            case 63:
              _context3.t2 = _context3.sent;

            case 64:
              return _context3.abrupt("return", _context3.t2);

            case 65:
              _context3.next = 69;
              break;

            case 67:
              _context3.prev = 67;
              _context3.t3 = _context3["catch"](40);

            case 69:
              return _context3.abrupt("return", {});

            case 70:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[18, 29], [40, 67]]);
    }));

    return function (_x2, _x3, _x4, _x5) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "reset", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4() {
    var _field3;

    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            for (_field3 in _this._foreach) {
              _this._foreach[_field3] = [];
            }

            _context4.next = 3;
            return _this._orderCollection.set(_this._docCollection.name(), _this._foreach);

          case 3:
            return _context4.abrupt("return", _context4.sent);

          case 4:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  })));

  _defineProperty(this, "sort", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(orderBy, range) {
      var compare;
      return regenerator.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              compare = function compare(orderBy) {
                if (!orderBy) {
                  return function (a, b) {
                    return 0;
                  };
                }

                var directions = [];
                var fields = orderBy.map(function (field, i) {
                  if (field[0] === "-") {
                    directions[i] = -1;
                    field = field.substring(1);
                  } else directions[i] = 1;

                  return field;
                });
                return function (a, b) {
                  if (fields) {
                    var ordersA = _this.get(a, fields);

                    var ordersB = _this.get(b, fields);

                    for (var i = 0; i < fields.length; i++) {
                      var _field4 = fields[i];
                      if (ordersA[_field4] > ordersB[_field4]) return directions[i];
                      if (ordersA[_field4] < ordersB[_field4]) return -directions[i];
                    }
                  }

                  return 0;
                };
              };

              return _context5.abrupt("return", range.sort(compare(orderBy)));

            case 2:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5);
    }));

    return function (_x6, _x7) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "remove", /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(docId) {
      var _field5;

      return regenerator.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              for (_field5 in _this._foreach) {
                _this._foreach[_field5] = _this._foreach[_field5].filter(function (id) {
                  return id !== docId;
                });
              }

              _context6.next = 3;
              return _this._orderCollection.set(_this._docCollection.name(), _this._foreach);

            case 3:
              return _context6.abrupt("return", _context6.sent);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x8) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "destroy", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7() {
    return regenerator.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return _this._orderCollection.remove(_this._docCollection.name());

          case 2:
            return _context7.abrupt("return", _context7.sent);

          case 3:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  })));

  this._docCollection = docCollection;
  this._options = options; // `options.storage` is always existing.

  var storage = options.storage.toLowerCase();

  if (storage === "json") {
    this._orderCollection = new CollectionJSON(orderCollectionName, this, options);
  } else if (storage === "indexeddb") {
    this._orderCollection = new CollectionIDB(orderCollectionName, this, options);
  } else if (storage === "firestore") {
    this._orderCollection = new CollectionFirestore(orderCollectionName, this, options);
  } else {
    throw new Error("Invalid storage: ".concat(options.storage));
  }
}
/**
 * Load all order data from the storage.
 */
;

var CollectionWrapper = function CollectionWrapper(name, _options) {
  var _this = this;

  _classCallCheck(this, CollectionWrapper);

  _defineProperty(this, "init", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee() {
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _this._order.load();

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));

  _defineProperty(this, "name", function () {
    return _this._name;
  });

  _defineProperty(this, "keys", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2() {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            return _context2.abrupt("return", _this._collection.keys());

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));

  _defineProperty(this, "get", /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee3(docId) {
      return regenerator.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (docId) {
                _context3.next = 2;
                break;
              }

              return _context3.abrupt("return", null);

            case 2:
              _context3.next = 4;
              return _this._collection.get(docId);

            case 4:
              return _context3.abrupt("return", _context3.sent);

            case 5:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }());

  _defineProperty(this, "set", /*#__PURE__*/function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee4(docId, docData) {
      var result;
      return regenerator.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (docData) {
                _context4.next = 2;
                break;
              }

              return _context4.abrupt("return", false);

            case 2:
              _context4.prev = 2;
              if (typeof docData === "string") docData = JSON.parse(docData);

              if (!(_typeof(docData) === "object" && Array.isArray(docData) === false)) {
                _context4.next = 15;
                break;
              }

              // Generate new random UUID
              docId = docId ? docId : new ShortUuidV4()["new"](); // Set metadata

              Object.assign(docData, {
                _id: docId,
                _date: new Date().getTime()
              });
              _context4.next = 9;
              return _this._collection.set(docId, docData);

            case 9:
              result = _context4.sent;

              if (!result) {
                _context4.next = 14;
                break;
              }

              _context4.next = 13;
              return _this._order.set(docData);

            case 13:
              return _context4.abrupt("return", _context4.sent);

            case 14:
              return _context4.abrupt("return", result);

            case 15:
              _context4.next = 19;
              break;

            case 17:
              _context4.prev = 17;
              _context4.t0 = _context4["catch"](2);

            case 19:
              return _context4.abrupt("return", false);

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[2, 17]]);
    }));

    return function (_x2, _x3) {
      return _ref4.apply(this, arguments);
    };
  }());

  _defineProperty(this, "update", /*#__PURE__*/function () {
    var _ref5 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee5(docId, updtData) {
      return regenerator.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (!(!docId || !updtData)) {
                _context5.next = 2;
                break;
              }

              return _context5.abrupt("return", false);

            case 2:
              _context5.prev = 2;

              if (!(typeof updtData === "string")) {
                _context5.next = 9;
                break;
              }

              _context5.next = 6;
              return _this._collection.update(docId, JSON.parse(updtData));

            case 6:
              return _context5.abrupt("return", _context5.sent);

            case 9:
              if (!(_typeof(updtData) === "object")) {
                _context5.next = 13;
                break;
              }

              _context5.next = 12;
              return _this._collection.update(docId, updtData);

            case 12:
              return _context5.abrupt("return", _context5.sent);

            case 13:
              _context5.next = 17;
              break;

            case 15:
              _context5.prev = 15;
              _context5.t0 = _context5["catch"](2);

            case 17:
              return _context5.abrupt("return", false);

            case 18:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[2, 15]]);
    }));

    return function (_x4, _x5) {
      return _ref5.apply(this, arguments);
    };
  }());

  _defineProperty(this, "sort", /*#__PURE__*/function () {
    var _ref6 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee6(orderBy, range) {
      return regenerator.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (!(range && Array.isArray(range))) {
                _context6.next = 4;
                break;
              }

              _context6.t0 = range;
              _context6.next = 12;
              break;

            case 4:
              if (!("range" in _this._options.search)) {
                _context6.next = 8;
                break;
              }

              _context6.t1 = _this._options.search.range;
              _context6.next = 11;
              break;

            case 8:
              _context6.next = 10;
              return _this.keys();

            case 10:
              _context6.t1 = _context6.sent;

            case 11:
              _context6.t0 = _context6.t1;

            case 12:
              range = _context6.t0;
              orderBy = orderBy && Array.isArray(orderBy) ? orderBy : "orderBy" in _this._options.search ? _this._options.search.orderBy : [];

              if (!(!range.length || !orderBy.length)) {
                _context6.next = 16;
                break;
              }

              return _context6.abrupt("return", range);

            case 16:
              return _context6.abrupt("return", _this._collection.sort(orderBy, range));

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6);
    }));

    return function (_x6, _x7) {
      return _ref6.apply(this, arguments);
    };
  }());

  _defineProperty(this, "search", /*#__PURE__*/function () {
    var _ref7 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee7(query, options) {
      var searchQuery, baseOptions, limited, sliced;
      return regenerator.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              searchQuery = new SearchQuery(query); // The base options have properties: "fuzzy", "limit".

              baseOptions = Object.assign({}, _this._options.search);
              options = options ? Object.assign(baseOptions, options) : baseOptions; // `options.range`

              if (!("range" in options && Array.isArray(options.range))) {
                _context7.next = 7;
                break;
              }

              _context7.t0 = options.range;
              _context7.next = 10;
              break;

            case 7:
              _context7.next = 9;
              return _this.keys();

            case 9:
              _context7.t0 = _context7.sent;

            case 10:
              options.range = _context7.t0;

              if (options.range.length) {
                _context7.next = 13;
                break;
              }

              return _context7.abrupt("return", []);

            case 13:
              // `options.orderBy`
              options.orderBy = "orderBy" in options && Array.isArray(options.orderBy) ? options.orderBy : []; // `options.fuzzy`

              options.fuzzy = "fuzzy" in options && typeof options.fuzzy === "boolean" ? options.fuzzy : baseOptions.fuzzy; // `options.limit`

              options.limit = "limit" in options && typeof options.limit === "number" ? options.limit : baseOptions.limit; // `options.exclude`

              options.exclude = "exclude" in options && Array.isArray(options.exclude) ? options.exclude : [];

              if (!(searchQuery && searchQuery.type() !== "invalid")) {
                _context7.next = 26;
                break;
              }

              _context7.next = 20;
              return _this._collection.search(searchQuery, options);

            case 20:
              limited = _context7.sent;

              if (!options.orderBy.length) {
                _context7.next = 23;
                break;
              }

              return _context7.abrupt("return", _this.sort(options.orderBy, limited));

            case 23:
              return _context7.abrupt("return", limited);

            case 26:
              // In case that the query is invalid.
              sliced = options.range.slice(0, options.limit);

              if (!options.orderBy.length) {
                _context7.next = 29;
                break;
              }

              return _context7.abrupt("return", _this.sort(options.orderBy, sliced));

            case 29:
              return _context7.abrupt("return", sliced);

            case 30:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7);
    }));

    return function (_x8, _x9) {
      return _ref7.apply(this, arguments);
    };
  }());

  _defineProperty(this, "remove", /*#__PURE__*/function () {
    var _ref8 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee8(docId) {
      var result;
      return regenerator.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (docId) {
                _context8.next = 2;
                break;
              }

              return _context8.abrupt("return", false);

            case 2:
              _context8.next = 4;
              return _this._collection.remove(docId);

            case 4:
              result = _context8.sent;
              if (result) _this._order.remove(docId);
              return _context8.abrupt("return", result);

            case 7:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8);
    }));

    return function (_x10) {
      return _ref8.apply(this, arguments);
    };
  }());

  _defineProperty(this, "clear", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee9() {
    var result;
    return regenerator.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return _this._collection.clear();

          case 2:
            result = _context9.sent;
            if (result) _this._order.reset();
            return _context9.abrupt("return", result);

          case 5:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9);
  })));

  _defineProperty(this, "destory", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee10() {
    var result;
    return regenerator.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _context10.next = 2;
            return _this._collection.destroy();

          case 2:
            result = _context10.sent;
            if (result) _this._order.destroy();
            return _context10.abrupt("return", result);

          case 5:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10);
  })));

  _defineProperty(this, "import", /*#__PURE__*/function () {
    var _ref11 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee11(data) {
      return regenerator.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (data) {
                _context11.next = 2;
                break;
              }

              return _context11.abrupt("return", false);

            case 2:
              _context11.next = 4;
              return _this._collection["import"](data);

            case 4:
              return _context11.abrupt("return", _context11.sent);

            case 5:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11);
    }));

    return function (_x11) {
      return _ref11.apply(this, arguments);
    };
  }());

  _defineProperty(this, "export", /*#__PURE__*/function () {
    var _ref12 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee12(range) {
      return regenerator.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (!range) range = _this._order.order();
              _context12.next = 3;
              return _this._collection["export"](range);

            case 3:
              return _context12.abrupt("return", _context12.sent);

            case 4:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12);
    }));

    return function (_x12) {
      return _ref12.apply(this, arguments);
    };
  }());

  this._name = name;
  this._options = _options;
  this._order = new DocumentOrder(this, _options); // `this._options.storage` is always existing.

  var storage = this._options.storage.toLowerCase();

  if (storage === "json") {
    this._collection = new CollectionJSON(name, this._order, this._options);
  } else if (storage === "indexeddb") {
    this._collection = new CollectionIDB(name, this._order, this._options);
  } else if (storage === "firestore") {
    this._collection = new CollectionFirestore(name, this._order, this._options);
  } else {
    throw new Error("Invalid storage: ".concat(this._options.storage));
  }
}
/**
 * Perform initialization task.
 */
;

/**
 * Main class
 */

var DocumentManager = // Default options
// Collection instances
function DocumentManager(options) {
  var _this = this;

  _classCallCheck(this, DocumentManager);

  _defineProperty(this, "_options", {
    storage: "indexeddb",
    name: "document-manager",
    search: {
      fuzzy: false,
      limit: Number.MAX_SAFE_INTEGER
    }
  });

  _defineProperty(this, "_collections", {});

  _defineProperty(this, "randomId", function () {
    return new ShortUuidV4()["new"]();
  });

  _defineProperty(this, "getCollectionNames", function () {
    return Object.keys(_this._collections);
  });

  _defineProperty(this, "collection", /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee(name, another) {
      var instance;
      return regenerator.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              name = name ? name.toLowerCase() : "";

              if (!(!name.length || name === orderCollectionName)) {
                _context.next = 3;
                break;
              }

              return _context.abrupt("return", null);

            case 3:
              if (!(name in _this._collections)) {
                _context.next = 9;
                break;
              }

              if (!_this._collections[name]) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", _this._collections[name]);

            case 8:
              delete _this._collections[name];

            case 9:
              // Newly create collection instance
              instance = new CollectionWrapper(name.toLowerCase(), _this._options);

              if (!instance) {
                _context.next = 24;
                break;
              }

              if (!another) {
                _context.next = 18;
                break;
              }

              _context.t0 = instance;
              _context.next = 15;
              return another["export"]();

            case 15:
              _context.t1 = _context.sent;
              _context.next = 18;
              return _context.t0["import"].call(_context.t0, _context.t1);

            case 18:
              _context.next = 20;
              return instance.init();

            case 20:
              // Register collection instance
              _this._collections[name] = instance;
              return _context.abrupt("return", instance);

            case 24:
              return _context.abrupt("return", null);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }());

  _defineProperty(this, "removeCollection", /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regenerator.mark(function _callee2(name) {
      var result;
      return regenerator.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (!(!name || !name.length)) {
                _context2.next = 2;
                break;
              }

              return _context2.abrupt("return", false);

            case 2:
              if (!(name in _this._collections)) {
                _context2.next = 10;
                break;
              }

              _context2.next = 5;
              return _this._collections[name].destory();

            case 5:
              result = _context2.sent;
              if (result) delete _this._collections[name];
              return _context2.abrupt("return", result);

            case 10:
              return _context2.abrupt("return", false);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function (_x3) {
      return _ref2.apply(this, arguments);
    };
  }());

  _defineProperty(this, "removeStorage", function () {
    for (var name in _this._collections) {
      if (_this._collections[name]) _this.removeCollection(name);
    } // TODO: remove database itself

  });

  // Merge the given options with the default
  Object.assign(this._options, options);
};

export { DocumentManager as default };
