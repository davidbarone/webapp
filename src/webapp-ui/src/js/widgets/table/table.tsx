import styles from '@root/js/widgets/table/table.module.css';
import { FormWidget } from '@root/js/widgets/form/formWidget';
import { ModalWidget } from '@root/js/widgets/modal/modalWidget';
import { reactiveValue } from '@root/js/lib/reactive';
import { Button } from '@root/js/widgets/button/button';
import { type FormFieldType } from '@root/js/widgets/form/formWidget';

/**
 * Defines a mapping dictionary. Each element consist of:
 * Key: becomes the column name
 * Value: Maps a row of type T, and outputs a React fragment
 */
interface MappingDictionary<T> {
  [Key: string]: (row: T) => HTMLElement;
}

type TablePropsType<T> = {
  data: Array<T>;
  visible: boolean;
  listMapping: MappingDictionary<T>;
  editMapping: { [Key: string]: FormFieldType<T> };
  onDelete: (row: T) => void;
};

/**
 * Generic version of table renderer. Note that the object being rendered MUST have an id property which is a unique number.
 * @param props
 * @returns
 */
export function TableWidget<DataType extends { id: number }>(
  props: TablePropsType<DataType>
): HTMLDivElement {
  console.log(styles);

  const modalVisibility = reactiveValue<boolean>(false);
  const modalContent = reactiveValue<HTMLElement>(<></>);

  const editRow = (data: DataType): void => {
    console.log(props.editMapping);
    modalContent.set(
      FormWidget<DataType>({
        data: data,
        fields: props.editMapping,
      })
    );
    modalVisibility.set(true);
  };

  return (
    <div style={{ display: props.visible ? 'block' : 'none' }}>
      {ModalWidget({
        visibility: modalVisibility,
        content: modalContent,
      })}

      <table class={styles.TableWidget}>
        <thead>
          <tr>
            {Object.keys(props.listMapping).map((k, i) => (
              <th key={i}>{k}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => (
            <tr key={row.id}>
              {Object.keys(props.listMapping).map((k, i) => (
                <td key={i}>{props.listMapping[k](row as DataType)}</td>
              ))}
              <td>
                {/* Add edit button */}
                {Button({
                  label: 'Edit',
                  click: () => {
                    editRow(row);
                  },
                })}
                {/* Add delete button */}
                {Button({
                  label: 'Delete',
                  click: () => {
                    props.onDelete(row);
                  },
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
