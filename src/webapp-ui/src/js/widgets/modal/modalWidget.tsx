import { reactiveValue } from '@root/js/lib/reactive';
import styles from '@root/js/widgets/modal/modalWidget.module.css';

interface ModalPropsType {
  initialVisibility: boolean;
  onClose?: () => void;
  children?: HTMLElement;
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
  const visibility = new reactiveValue(props.initialVisibility);
  const modalContentRef = createRef();
  const modalContainerRef = createRef();

  const hideModal = () => {
    visibility.set(false);
    if (props.onClose) {
      props.onClose();
    }
  };

  modalContentRef.current = (
    <div class={styles.myModalContent}>
      <div class={styles.container}>
        {props.children}
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
    if (visibility.get()) {
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

  visibility.subscribe(toggleVisibility);
  toggleVisibility();
  return modalContainerRef.current;
};
