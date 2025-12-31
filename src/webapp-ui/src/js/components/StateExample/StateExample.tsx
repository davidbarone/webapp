import { Component } from '@root/js/lib/component';

class StateExample extends Component {
  constructor() {
    super();
  }

  a;
  b;
  sum;

  onLoad = () => {
    this.a = this.getReactiveValue(parseInt(this.getAttribute('a') ?? '0'));
    this.b = this.getReactiveValue(1);

    console.log(`onLoad: a: ${this.a.get()}`);
    console.log(`onLoad: b: ${this.b.get()}`);

    this.sum = this.getReactiveExpression((a, b) => a + b, this.a, this.b);
  };

  propNames: string[] = StateExample.observedAttributes;

  static get observedAttributes(): string[] {
    return ['a'];
  }

  incrementB = () => {
    this.b.set(this.b.get() + 1);
  };

  render(): any {
    return (
      <>
        <h1>This is a StateExample Component</h1>
        <div>
          <div>a: {`${this.a.get()}`} </div>

          <button onClick={this.incrementB}>
            {`Value of b: ${this.b.get()} (click to increment by 1)`}
          </button>
          <div>sum(a + b): {`${this.sum.get()}`} </div>
        </div>
      </>
    );
  }
}

customElements.define('state-example', StateExample);
