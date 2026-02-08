import styles from '@root/js/widgets/tableWidget/tableWidget.module.css';
import { FormWidget } from '@root/js/widgets/formWidget/formWidget';
import { ModalWidget } from '@root/js/widgets/modalWidget/modalWidget';
import { reactiveValue } from '@root/js/lib/reactive';
import { ButtonWidget } from '@root/js/widgets/buttonWidget/buttonWidget';
import { type FormFieldType } from '@root/js/widgets/formWidget/formWidget';

/**
 * Defines a mapping dictionary. Each element consist of:
 * Key: becomes the column name
 * Value: Maps a row of type T, and outputs a React fragment
 */
interface MappingDictionary<T> {
  [Key: string]: (row: T) => HTMLElement;
}

type TableWidgetPropsType<T> = {
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
  props: TableWidgetPropsType<DataType>
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
                {ButtonWidget({
                  label: 'Edit',
                  click: () => {
                    editRow(row);
                  },
                })}
                {/* Add delete button */}
                {ButtonWidget({
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
