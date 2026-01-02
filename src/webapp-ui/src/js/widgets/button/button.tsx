import styles from './button.module.css';

interface ButtonPropsType {
  title?: string;
  label: string | undefined;
  visible?: boolean;
  click?: ((MouseEvent) => void) | undefined;
  href?: string | undefined;
}

const Button = (props: ButtonPropsType): HTMLButtonElement => {
  const doClick = (e: MouseEvent): void => {
    if (props.href) {
      window.location.href = props.href;
    } else if (props.click) {
      props.click(e);
    }
  };

  return (
    <button
      className={styles.ButtonWidget}
      title={props.title}
      style={props.visible ? { display: 'inline' } : { display: 'inline' }}
      onClick={doClick}
    >
      {props.label}
    </button>
  );
};

export { Button };
