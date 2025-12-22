// Polished tiny reactivity system
// https://medium.com/@kamresh485/building-a-tiny-reactive-signal-system-in-javascript-a0702d44f109
const contexts = [];

function getCurrentContext() {
  return contexts[contexts.length - 1];
}

function subscribe(subscriptions) {
  const context = getCurrentContext();
  if (context) {
    subscriptions.add(context);
    context.subscriptions.add(subscriptions);
  }
}

function Signal(initial) {
  let value = initial;
  const subscriptions = new Set();

  function get() {
    subscribe(subscriptions);
    return value;
  }

  function set(newVal) {
    if (Object.is(value, newVal)) return; // avoid redundant updates
    value = newVal;
    // iterate over a snapshot to avoid mutation-while-iterating
    for (let ctx of Array.from(subscriptions)) {
      ctx.runner();
    }
  }

  return [get, set];
}

function cleanup(context) {
  for (let subs of context.subscriptions) {
    subs.delete(context);
  }
  context.subscriptions.clear();
}

function Effect(cb) {
  const context = {
    runner: null,
    subscriptions: new Set(),
  };

  const runner = () => {
    cleanup(context);
    contexts.push(context);
    cb();
    contexts.pop();
  };

  context.runner = runner;
  // run initially
  runner();
}

// Demo
const [val, setVal] = Signal(20);
Effect(() => {
  console.log('val updated', val());
});

setVal(val() + 30); // logs: val updated, 50
setVal(val() + 30); // logs: val updated, 60
