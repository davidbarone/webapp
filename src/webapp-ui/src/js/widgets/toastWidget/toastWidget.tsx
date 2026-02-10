import styles from '@root/js/widgets/toastWidget/toastWidget.module.css';

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
  const container = document.getElementById('toast-container');
  if (container === null) {
    throw new Error('No toast container found.');
  }

  // Create toast element
  const toast = document.createElement('div');
  const toastClassName = `${styles.toast} ${styles[type]}`;
  toast.className = toastClassName;
  toast.textContent = message;

  // Append to container
  container.appendChild(toast);

  // Remove after duration
  setTimeout(() => {
    const fadeOutStyle = styles['fadeOut'];
    toast.style.animation = `${fadeOutStyle} 0.5s ease forwards`;
    toast.addEventListener('animationend', () => {
      toast.remove();
    });
  }, duration);
};
