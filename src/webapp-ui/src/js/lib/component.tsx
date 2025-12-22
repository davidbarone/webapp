import { reactiveValue, reactiveExpression } from '../lib/reactive';

export class Component extends HTMLElement {
  #props: Array<string> = [];

  constructor() {
    super();

    // Attach a shadow DOM
    this.attachShadow({ mode: 'open' });
  }

  get props(): Record<string, any> {
    return this.#props;
  }

  propNames: string[] = Component.observedAttributes;

  static get observedAttributes(): string[] {
    return [];
  }

  attributeChangedCallback(name: string): void {
    // update the props object
    const value = this.getAttribute(name);

    // if name does not exist, create a new reactiveValue
    // otherwise, set the value.
    if (!(name in this.#props)) {
      this.#props[name] = new reactiveValue(null); // Assign a default value (e.g., null)
      this.#props[name].subscribe(this.renderInternal.bind(this));
    }
    this.#props[name].set(value);
    this.renderInternal();
  }

  connectedCallback() {
    this.onLoad();

    // Render content when the element is connected to the DOM
    this.renderInternal();
  }

  onLoad = () => {};

  renderInternal() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
      this.shadowRoot.appendChild(this.render());
    }
  }

  render(): any {
    return null;
  }

  getReactiveValue(value): reactiveValue {
    const r = new reactiveValue(value);
    r.subscribe(this.renderInternal.bind(this));
    return r;
  }

  getReactiveExpression(fn, ...values): reactiveExpression {
    const r = new reactiveExpression(fn, ...values);
    r.subscribe(this.renderInternal.bind(this));
    return r;
  }
}
