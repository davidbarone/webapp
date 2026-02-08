import { reactiveValue } from '@root/js/lib/reactive';
import { InputWidget } from '@root/js/widgets/inputWidget/inputWidget.tsx';

export type FormFieldType<T> = {
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
  value: (row: T) => number | string | Date | boolean;
};

type FormFieldDictionary<T> = {
  [key: string]: FormFieldType<T>;
};

type FormPropsType<T> = {
  data: T;
  fields: FormFieldDictionary<T>;
};

export function FormWidget<DataType>(
  props: FormPropsType<DataType>
): HTMLFormElement {
  const keys = Object.keys(props.fields);
  const inputs = keys.map((k) =>
    InputWidget({
      name: props.fields[k].name,
      label: props.fields[k].label,
      type: props.fields[k].type,
      rows: props.fields[k].rows,
      value: reactiveValue(props.data[k]),
    })
  );

  console.log(inputs);
  return <form>{inputs}</form>;
}
