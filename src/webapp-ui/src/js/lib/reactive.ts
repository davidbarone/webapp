export type ReactiveValueType<T> = {
  get: () => T;
  set: (value: T) => void;
  subscribe: (subscriber: (value?: T) => void) => void;
};

export type ReactiveExpressionType<T> = {
  get: () => T;
  subscribe: (subscriber: (value?: T) => void) => void;
};

//https://dev.to/arnavk-09/simplest-reactivity-in-web-pages-using-vanilla-javascript-5ekp
export function reactiveValue<T>(initialValue): ReactiveValueType<T> {
  let value = initialValue;
  const subscribers: Array<(subscriber?: T) => void> = [];

  const get = function get<T>(): T {
    return value as T;
  };

  const set = function set(newValue: T) {
    if (value !== newValue) {
      value = newValue;
      subscribers.forEach((subscriber) => subscriber());
    }
  };

  const subscribe = function subscribe(subscriber) {
    subscribers.push(subscriber);
  };

  return { get, set, subscribe };
}

export function reactiveExpression<T>(
  fn: (...params: any[]) => T,
  ...values: (ReactiveValueType<any> | ReactiveExpressionType<any>)[]
): ReactiveExpressionType<T> {
  const result = fn(...values.map((value) => value.get()));
  const dependencies = values;
  const rv = reactiveValue<T>(result);

  // subscribe to the dependencies, and update the expression
  // whenever one or more of them change.
  dependencies.forEach((dependency) => {
    const a = rv;
    dependency.subscribe(() => {
      // only set derived if all values are defined
      console.log(dependencies.map((v) => v.get()));
      if (!dependencies.some((item) => item.get() === undefined)) {
        a.set(fn(...dependencies.map((value) => value.get())));
      }
    });
  });

  //this.get = rv.get;
  //this.set = rv.set;
  //this.subscribe = rv.subscribe;
  return {
    get: rv.get,
    subscribe: rv.subscribe,
  };
}
