export function reactiveProxy(data) {
  const subscribers = new Set();

  const proxy = new Proxy(data, {
    get(target, prop) {
      return target[prop];
    },
    set(target, prop, value) {
      target[prop] = value;
      subscribers.forEach((fn) => fn(prop, value));
      return true;
    },
  });

  proxy.subscribe = (fn) => subscribers.add(fn);
  proxy.unsubscribe = (fn) => subscribers.delete(fn);

  return proxy;
}

//https://dev.to/arnavk-09/simplest-reactivity-in-web-pages-using-vanilla-javascript-5ekp
export function reactiveValue(initialValue) {
  let value = initialValue;
  const subscribers = [];

  this.get = function get() {
    return value;
  };

  this.set = function set(newValue) {
    if (value !== newValue) {
      value = newValue;
      subscribers.forEach((subscriber) => subscriber());
    }
  };

  this.subscribe = function subscribe(subscriber) {
    subscribers.push(subscriber);
  };

  //return { get, set, subscribe };
}

export function reactiveExpression(fn, ...values) {
  const result = fn(...values.map((value) => value.get()));
  const dependencies = values.filter(
    (value) =>
      (value instanceof reactiveValue) | (value instanceof reactiveExpression)
  );
  const rv = new reactiveValue(result);

  // subscribe to the dependencies, and update the expression
  // whenever one or more of them change.
  dependencies.forEach((dependency) => {
    let a = rv;
    dependency.subscribe(() => {
      // only set derived if all values are defined
      console.log(dependencies.map((v) => v.get()));
      if (!dependencies.some((item) => item.get() === undefined)) {
        a.set(fn(...dependencies.map((value) => value.get())));
      }
    });
  });

  this.get = rv.get;
  this.set = rv.set;
  this.subscribe = rv.subscribe;
  //return rv;
}
