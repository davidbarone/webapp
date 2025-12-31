import styles from '@root/js/widgets/table/table.module.css';
import { FormWidget } from '@root/js/widgets/form/formWidget';

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
  mapping: MappingDictionary<T>;
};

/**
 * Generic version of table renderer. Note that the object being rendered MUST have an id property which is a unique number.
 * @param props
 * @returns
 */
export function TableWidget<DataType extends { id: number }>(
  props: TablePropsType<DataType>
) {
  console.log(styles);

  //  const displayForm = (r) => {};

  return (
    <div style={{ display: props.visible ? 'block' : 'none' }}>
      <table class={styles.TableWidget}>
        <thead>
          <tr>
            {Object.keys(props.mapping).map((k, i) => (
              <th key={i}>{k}</th>
            ))}
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => (
            <tr key={row.id}>
              {Object.keys(props.mapping).map((k, i) => (
                <td key={i}>{props.mapping[k](row as DataType)}</td>
              ))}
              <td>
                {FormWidget({
                  data: row,
                  fields: {
                    slug: {
                      name: 'slug',
                      label: 'slug',
                      type: 'text',
                      value: (r) => r['slug'],
                    },
                    teaser: {
                      name: 'teaser',
                      label: 'teaser',
                      type: 'text',
                      value: (r) => r['teaser'],
                    },
                    content: {
                      name: 'content',
                      label: 'content',
                      type: 'text',
                      value: (r) => r['content'],
                    },
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
