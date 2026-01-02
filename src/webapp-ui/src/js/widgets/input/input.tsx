import styles from './input.module.css';
import { type ReactiveValueType } from '@root/js/lib/reactive';
interface InputPropsType {
  name: string;
  type:
    | 'input'
    | 'checkbox'
    | 'button'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week';
  label?: string;
  disabled?: boolean;
  rows?: number;
  onInputHook?: any;
  value: ReactiveValueType<string | number>;
}

const Input = (props: InputPropsType): HTMLDivElement => {
  const onInput = (e: any) => {
    const val =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    props.value.set(val);

    if (props.onInputHook) {
      props.onInputHook(e);
    }
  };

  const input = (): HTMLElement => {
    if (props.type === 'text' && props.rows && props.rows > 0) {
      {
        /* Textarea */
      }
      return (
        <textarea
          rows={props.rows}
          className={props.disabled ? styles.readonly : styles.writeable}
          name={props.name}
          value={props.value.get()}
          onInput={onInput}
          {...(props.disabled ? { disabled: true } : {})}
        />
      );
    } else {
      return (
        <input
          className={props.disabled ? styles.readonly : styles.writeable}
          type={props.type}
          name={props.name}
          value={props.value.get()}
          onInput={onInput}
          {...(props.disabled ? { disabled: true } : {})}
        />
      );
    }
  };

  return (
    <div className={styles.field}>
      <label>
        {props.label}
        {props.label ? ':' : ''}
      </label>
      {input()}
    </div>
  );
};

export { Input };
