import { reactiveValue } from '@root/js/lib/reactive';
import styles from './input.module.css';

interface InputPropsType {
  name?: string;
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
  value: reactiveValue;
}

const Input = (props: InputPropsType) => {
  const onInput = (e: any) => {
    const val =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    props.value.set(val);

    if (props.onInputHook) {
      props.onInputHook(e);
    }
  };

  const input = () => {
    if (props.type === 'text' && props.rows && props.rows > 0) {
      {
        /* Textarea */
      }
      return (
        <textarea
          rows={props.rows}
          disabled={props.disabled}
          className={props.disabled ? styles.readonly : styles.writeable}
          name={props.name}
          value={props.value.get()}
          onInput={onInput}
        />
      );
    } else {
      return (
        <input
          disabled={props.disabled}
          className={props.disabled ? styles.readonly : styles.writeable}
          type={props.type}
          name={props.name}
          value={props.value.get()}
          onInput={onInput}
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
