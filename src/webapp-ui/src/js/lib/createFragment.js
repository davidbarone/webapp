// fragment.ts
export function createFragment({ children }) {
  console.log(children);
  const frag = document.createDocumentFragment();
  for (const child of children.flat()) {
    if (Array.isArray(child)) {
      child.forEach((c) =>
        frag.append(c instanceof Node ? c : document.createTextNode(String(c)))
      );
    } else {
      frag.append(
        child instanceof Node ? child : document.createTextNode(String(child))
      );
    }
  }
  return frag;
}

// Register on window object
window.createFragment = createFragment;
