import { reactiveValue } from '@root/js/lib/reactive';
import styles from '@root/js/widgets/modal/modalWidget.module.css';

interface ModalPropsType {
  visibility: reactiveValue;
  onClose?: () => void;
  children?: reactiveValue; // HTMLElement;
}

/**
 * Simple useRef-like implementation in vanilla JS
 * Returns an object with a `.current` property
 * that persists across function calls.
 */
function createRef(initialValue: HTMLElement | null = null) {
  return { current: initialValue };
}

export const ModalWidget = (props: ModalPropsType) => {
  const modalContentRef = createRef();
  const modalContainerRef = createRef();

  const hideModal = () => {
    props.visibility.set(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  modalContentRef.current = (
    <div class={styles.myModalContent}>
      <div class={styles.container}>
        {props.children?.get()}
        <button
          class={styles.closeButton}
          onClick={() => {
            hideModal();
          }}
        >
          X
        </button>
      </div>
    </div>
  );

  modalContainerRef.current = (
    <div class={styles.myModal}>{modalContentRef.current}</div>
  );

  const toggleVisibility = () => {
    if (props.visibility.get()) {
      if (modalContentRef.current) {
        modalContentRef.current.classList.add(styles.slideIn);
        modalContentRef.current.classList.remove(styles.slideOut);
      }
      if (modalContainerRef.current) {
        modalContainerRef.current.classList.add(styles.fadeIn);
        modalContainerRef.current.classList.remove(styles.fadeOut);
      }
    } else {
      if (modalContentRef.current) {
        modalContentRef.current.classList.add(styles.slideOut);
        modalContentRef.current.classList.remove(styles.slideIn);
      }
      if (modalContainerRef.current) {
        if (modalContainerRef.current.classList.contains(styles.fadeIn)) {
          modalContainerRef.current.classList.add(styles.fadeOut);
          modalContainerRef.current.classList.remove(styles.fadeIn);
        }
      }
    }
  };

  const updateContent = () => {
    console.log('updatecontent');
    modalContentRef.current = (
      <div class={styles.myModalContent}>
        <div class={styles.container}>
          {props.children?.get()}
          <button
            class={styles.closeButton}
            onClick={() => {
              hideModal();
            }}
          >
            X
          </button>
        </div>
      </div>
    );

    (modalContainerRef.current as HTMLElement).innerHTML = '';
    (modalContainerRef.current as HTMLElement).appendChild(
      modalContentRef.current as HTMLElement
    );
    toggleVisibility();
  };

  props.visibility.subscribe(toggleVisibility);
  props.children?.subscribe(updateContent);

  toggleVisibility();
  return modalContainerRef.current;
};
