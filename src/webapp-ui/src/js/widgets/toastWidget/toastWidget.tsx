import styles from '@root/js/widgets/toastWidget/toastWidget.module.css';

/**
 * Simple useRef-like implementation in vanilla JS
 * Returns an object with a `.current` property
 * that persists across function calls.
 */
function createRef(initialValue: HTMLElement | null = null) {
  return { current: initialValue };
}

export const ToastWidget = () => {
  return (
    <>
      <div class={styles.toastContainer} id="toast-container"></div>
    </>
  );
};

interface showToastPropsType {
  message: string;
  type: 'info' | 'error' | 'success';
  duration?: number;
}

export const showToast = ({
  message,
  type,
  duration = 3000,
}: showToastPropsType) => {
  // Create ref to toast:
  const toastRef = createRef();

  const container = document.getElementById('toast-container');
  if (container === null) {
    throw new Error('No toast container found.');
  }

  // Create toast element
  toastRef.current = document.createElement('div');
  const toastClassName = `${styles.toast} ${styles[type]}`;
  toastRef.current.className = toastClassName;
  toastRef.current.textContent = message;

  // Append to container
  container.appendChild(toastRef.current);

  // Remove after duration
  setTimeout(() => {
    const fadeOutStyle = styles['fadeOut'];
    toastRef.current!.style.animation = `${fadeOutStyle} 0.5s ease forwards`;
    toastRef.current!.addEventListener('animationend', () => {
      toastRef.current!.remove();
    });
  }, duration);
};
