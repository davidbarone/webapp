import styles from './buttonWidget.module.css';

interface ButtonWidgetPropsType {
  title?: string;
  label: string | undefined;
  visible?: boolean;
  click?: ((MouseEvent) => void) | undefined;
  href?: string | undefined;
}

const ButtonWidget = (props: ButtonWidgetPropsType): HTMLButtonElement => {
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

export { ButtonWidget };
